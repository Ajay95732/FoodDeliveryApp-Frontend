import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../services/orderService";
import axios from "axios";
export default function Checkout() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
const [cart, setCart] = useState([]);
useEffect(() => {

    const data = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    setCart(data);

}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const itemTotal = cart.reduce(
    (sum,item)=>sum + item.price * item.quantity,
    0
);

const deliveryFee = 40;
const gst = 20;

const totalAmount = itemTotal + deliveryFee + gst;

  const placeOrder = async (e) => {

    e.preventDefault();
    


    if(
formData.name === "" ||
formData.phone === "" ||
formData.address === ""
)
{
 alert("Please fill all details");
 return;
}
if(cart.length === 0)
{
    alert("Your cart is empty!");
    return;
}

    try {
         setLoading(true);

        // 1. Create Razorpay Order

        const response =
        await axios.post(
            "https://localhost:7249/api/Payment/create-order",
            {
                amount: totalAmount
            }
        );


        const razorOrder = response.data;



        const options = {

            key:
            "rzp_test_TFixQhkoksdGGf",


            amount:
            razorOrder.amount,


            currency:
            "INR",


            name:
            "Food Delivery",


            description:
            "Food Order Payment",


            order_id:
            razorOrder.id,



            handler: async function(paymentResponse){
            console.log(paymentResponse);

                // 2. Verify Payment

                const verify =
                await axios.post(
                    "https://localhost:7249/api/Payment/verify",
                    {

                    razorpayOrderId:
                    paymentResponse.razorpay_order_id,


                    razorpayPaymentId:
                    paymentResponse.razorpay_payment_id,


                    razorpaySignature:
                    paymentResponse.razorpay_signature

                    }
                );



                if(verify.status === 200)
                {


                    // 3. Save Order

                    const order = {

                        customerName:
                        formData.name,


                        phone:
                        formData.phone,


                        address:
                        `${formData.address}, ${formData.city} - ${formData.pincode}`,


                        totalAmount:
                        totalAmount,
                        paymentId:
paymentResponse.razorpay_payment_id,

paymentStatus:
"Paid",


                        items:
                        cart.map(item => ({

                            productId:item.id,

                            productName:item.name,

                            price:item.price,

                            quantity:item.quantity

                        }))

                    };


                    await addOrder(order);



                    localStorage.setItem(
                        "customerPhone",
                        formData.phone
                    );

                    localStorage.setItem(
    "customerName",
    formData.name
);


                    localStorage.removeItem("cart");


                    window.dispatchEvent(
                        new Event("cartUpdated")
                    );


                    alert(
                        "Payment Successful 🎉"
                    );


                    navigate("/orders");

                }


            },


            theme:{
                color:"#28a745"
            }

        };



        const razorpay =
    new window.Razorpay(options);


razorpay.on(
    "payment.failed",
    function(response){

        console.log(response.error);

        setLoading(false);

        alert("Payment Failed ❌");

    }
);

razorpay.open();




    }
    catch(error)
{

    console.log(error);

    alert("Payment Failed");

}
finally
{
    setLoading(false);
}

};

    

  return (

<div className="container py-5">


<h1 className="
fw-bold
text-center
mb-5
">

Checkout 💳

</h1>



<div className="row g-4">



{/* DELIVERY DETAILS */}


<div className="col-lg-7">


<div className="
card
border-0
shadow-sm
rounded-4
">


<div className="card-body p-4">


<h4 className="fw-bold mb-4">

<i className="bi bi-geo-alt text-warning"></i>

Delivery Address

</h4>



<form onSubmit={placeOrder}>


<input

type="text"

name="name"

placeholder="Full Name"

className="
form-control
form-control-lg
mb-3
"

value={formData.name}

onChange={handleChange}

required

/>





<input

type="tel"

name="phone"

placeholder="Phone Number"

className="
form-control
form-control-lg
mb-3
"

value={formData.phone}

onChange={handleChange}

required

/>






<textarea

name="address"

placeholder="Complete Address"

className="
form-control
form-control-lg
mb-3
"

rows="3"

value={formData.address}

onChange={handleChange}

required

/>







<div className="row">


<div className="col-md-6">


<input

type="text"

name="city"

placeholder="City"

className="
form-control
form-control-lg
mb-3
"

value={formData.city}

onChange={handleChange}

required

/>


</div>





<div className="col-md-6">


<input

type="text"

name="pincode"

placeholder="Pincode"

className="
form-control
form-control-lg
mb-3
"

value={formData.pincode}

onChange={handleChange}

required

/>


</div>


</div>




<button

type="submit"

disabled={loading}

className="
btn
btn-warning
rounded-pill
w-100
py-3
fw-bold
fs-5
"

>


{
loading
?
"Processing Payment..."
:
"Pay Now ₹"+totalAmount
}


</button>




</form>


</div>


</div>


</div>








{/* ORDER SUMMARY */}


<div className="col-lg-5">


<div className="
card
border-0
shadow
rounded-4
sticky-top
"

style={{
top:"90px"
}}

>


<div className="card-body p-4">


<h4 className="fw-bold">

Order Summary 🛒

</h4>


<hr/>





{
cart.map(item=>(


<div
key={item.id}
className="
d-flex
justify-content-between
mb-3
"
>


<div>


<h6 className="mb-0">

{item.name}

</h6>


<small className="text-muted">

{item.quantity} × ₹{item.price}

</small>


</div>



<strong>

₹{item.price*item.quantity}

</strong>



</div>



))
}




<hr/>





<div className="
d-flex
justify-content-between
mb-2
">

<span>

Items Total

</span>


<span>

₹{itemTotal.toFixed(2)}

</span>


</div>





<div className="
d-flex
justify-content-between
mb-2
">

<span>

Delivery Fee

</span>


<span>

₹40

</span>


</div>





<div className="
d-flex
justify-content-between
mb-3
">

<span>

GST

</span>


<span>

₹20

</span>


</div>




<hr/>





<div className="
d-flex
justify-content-between
fs-5
">


<strong>

Total

</strong>


<strong className="text-success">

₹{totalAmount.toFixed(2)}

</strong>


</div>




<div className="
alert
alert-success
mt-4
mb-0
">


<i className="bi bi-shield-check"></i>

Secure Razorpay Payment


</div>



</div>


</div>


</div>



</div>


</div>

);
}