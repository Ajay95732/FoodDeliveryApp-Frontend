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

      <div className="row justify-content-center">

        <div className="col-md-8">

          <div className="card shadow border-0">

            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                💳 Checkout
              </h2>

              <form onSubmit={placeOrder}>

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="form-control mb-3"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="form-control mb-3"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                <textarea
                  name="address"
                  placeholder="Delivery Address"
                  className="form-control mb-3"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="form-control mb-3"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  className="form-control mb-4"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
                <div className="card bg-light mb-4">

<div className="card-body">

<h5 className="fw-bold">
Order Summary
</h5>

<hr/>

<p>
Items Total:
₹{itemTotal.toFixed(2)}
</p>

<p>
Delivery Fee:
₹40
</p>

<p>
GST:
₹20
</p>

<hr/>

<h5>
Grand Total:
₹{totalAmount.toFixed(2)}
</h5>

</div>

</div>

                <button
type="submit"
className="btn btn-success w-100"
disabled={loading}
>

{
loading
?
"Processing Payment..."
:
"Pay Now"
}

</button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}