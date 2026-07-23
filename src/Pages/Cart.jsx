import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartItems =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(cartItems);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    // Update Navbar Count
    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    updateCart(updatedCart);
  };

  const decreaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max(
              1,
              item.quantity - 1
            ),
          }
        : item
    );

    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);
  };

  const itemTotal = cart.reduce(
    (total, item) =>
        total + item.price * item.quantity,
    0
);

const totalAmount = itemTotal + 60;
const payNow = async () => {

  try {

    // Create Razorpay Order

    const response = await axios.post(
      "https://localhost:7249/api/Payment/create-order",
      {
        amount: totalAmount
      }
    );


    const order = response.data;


    const options = {

      key: "rzp_test_TFixQhkoksdGGf",

      amount: order.amount,

      currency: "INR",

      name: "Food Delivery",

      description: "Food Order Payment",

      order_id: order.id,


      handler: async function(paymentResponse){

    const verifyResponse =
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


    if(verifyResponse.status === 200)
    {
        alert("Payment Successful 🎉");

        localStorage.removeItem("cart");

        window.dispatchEvent(
          new Event("cartUpdated")
        );

        setCart([]);
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

    alert("Payment Failed");

  }
);


razorpay.open();


  }
  catch(error){

    console.log(error);

    alert("Payment Failed");

  }

};

  if (cart.length === 0) {
    return (
      <div className="container text-center py-5">
        <h2>Your Cart is Empty 🛒</h2>

        <Link
          to="/products"
          className="btn btn-warning mt-3"
        >
          Browse Foods
        </Link>
      </div>
    );
  }

  return (

<div className="container py-5">


<h1 className="
fw-bold
mb-5
">

🛒 Your Cart

</h1>



<div className="row g-4">



{/* CART ITEMS */}


<div className="
col-lg-8
">


<h4 className="fw-bold mb-4">

Your Food Items

</h4>



{
cart.map(item=>(


<div
key={item.id}
className="
card
border-0
shadow-sm
rounded-4
mb-3
"
style={{
transition:"0.3s"
}}
>


<div className="row g-0 align-items-center">


<div className="col-md-3">


<img

src={item.image}

className="
img-fluid
rounded-start-4
"

style={{

height:"150px",

width:"100%",

objectFit:"cover"

}}

alt={item.name}

/>


</div>





<div className="col-md-9">


<div className="card-body">


<div className="
d-flex
justify-content-between
">


<h5 className="fw-bold">

{item.name}

</h5>



<button

className="
btn
btn-outline-danger
btn-sm
rounded-pill
"

onClick={()=>removeItem(item.id)}

>

<i className="bi bi-trash"></i>

</button>


</div>





<p className="text-muted">

₹{item.price} each

</p>




<div className="
d-flex
align-items-center
gap-3
">


<button

className="
btn
btn-warning
rounded-circle
"

onClick={()=>decreaseQty(item.id)}

>

-

</button>




<h5>

{item.quantity}

</h5>




<button

className="
btn
btn-warning
rounded-circle
"

onClick={()=>increaseQty(item.id)}

>

+

</button>


</div>





<h5 className="
text-success
mt-3
fw-bold
">

₹
{item.price * item.quantity}

</h5>



</div>


</div>


</div>


</div>


))

}



</div>






{/* BILL */}


<div className="
col-lg-4
">


<div className="
card
border-0
shadow
rounded-4
p-4
sticky-top
"
style={{
top:"90px"
}}
>


<h4 className="fw-bold">

Bill Details

</h4>


<hr/>





<div className="
d-flex
justify-content-between
mb-3
">

<span>
Item Total
</span>

<strong>
₹{itemTotal.toFixed(2)}
</strong>

</div>





<div className="
d-flex
justify-content-between
mb-3
">

<span>
Delivery Fee
</span>

<strong>
₹40
</strong>

</div>





<div className="
d-flex
justify-content-between
mb-3
">

<span>
GST
</span>

<strong>
₹20
</strong>

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




<Link

to="/checkout"

className="
btn
btn-warning
rounded-pill
w-100
mt-4
fw-bold
py-3
"

>


<i className="bi bi-bag-check"></i>

Proceed To Checkout


</Link>



</div>


</div>




</div>


</div>


);
}