import { useEffect, useState } from "react";
import { getCustomerOrders } from "../services/orderService";


export default function Orders(){

const [orders,setOrders] = useState([]);
const [loading,setLoading] = useState(true);


useEffect(()=>{

loadOrders();

},[]);



const loadOrders = async()=>{

try{

setLoading(true);

const phone = localStorage.getItem("customerPhone");

console.log("PHONE FROM STORAGE:", phone);


const data = await getCustomerOrders(phone);

console.log("API RESPONSE:", data);


setOrders(data);


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}

};



const getStatusClass = (status)=>{

switch(status){

case "Delivered":
return "bg-success";

case "Preparing":
return "bg-info text-dark";

case "Out for Delivery":
return "bg-primary";

case "Cancelled":
return "bg-danger";

default:
return "bg-warning text-dark";

}

};

return(

<div
className="container-fluid py-5"
style={{
background:"#FFF7F0"
}}
>


<h1 className="text-center fw-bold mb-5">

My Orders 🛒

</h1>



<div className="text-end mb-4">

<button

className="btn btn-warning rounded-pill px-4"

onClick={loadOrders}

>

<i className="bi bi-arrow-clockwise me-2"></i>

Refresh Orders

</button>

</div>




{
loading ?


<div className="text-center py-5">

<div className="spinner-border text-warning"></div>

</div>



:


orders.length===0 ?


<div className="text-center py-5">


<h3>
No Orders Found 😔
</h3>


<p className="text-muted">

Start ordering your favourite food

</p>


</div>



:



orders.map(order=>(


<div

key={order.id}

className="
card
border-0
shadow
rounded-4
mb-4
"


>


<div className="card-body p-4">



<div className="d-flex justify-content-between align-items-center">


<div>

<h4 className="fw-bold">

🍔 FoodExpress Order #{order.id}

</h4>


<small className="text-muted">

<i className="bi bi-calendar"></i>

{" "}

{
new Date(order.orderDate)
.toLocaleDateString()
}

</small>

</div>



<span

className={`badge rounded-pill px-3 py-2 ${getStatusClass(order.status)}`}

>

{order.status}

</span>



</div>



<hr/>





<div className="row g-4">


<div className="col-md-6">


<h5 className="fw-bold">

Delivery Details

</h5>


<p>

<i className="bi bi-geo-alt text-warning"></i>

{" "}

{order.address}

</p>



<h5 className="fw-bold">

Payment

</h5>


<p className="text-success">

<i className="bi bi-check-circle"></i>

Paid

</p>



<h3 className="text-success fw-bold">

₹{order.totalAmount}

</h3>



</div>





<div className="col-md-6">


<h5 className="fw-bold mb-4">

Order Tracking

</h5>



<div className="d-flex justify-content-between text-center">



<div>

<div className="bg-success text-white rounded-circle p-3">

✅

</div>

<small>
Placed
</small>

</div>





<div>

<div className={`
rounded-circle
p-3
text-white

${
["Preparing",
"Out for Delivery",
"Delivered"]
.includes(order.status)
?
"bg-success"
:
"bg-secondary"

}

`}>

🍳

</div>

<small>
Preparing
</small>

</div>





<div>

<div className={`
rounded-circle
p-3
text-white

${
["Out for Delivery",
"Delivered"]
.includes(order.status)
?
"bg-success"
:
"bg-secondary"

}

`}>

🚚

</div>

<small>
Delivery
</small>

</div>





<div>

<div className={`
rounded-circle
p-3
text-white

${
order.status==="Delivered"
?
"bg-success"
:
"bg-secondary"

}

`}>

🏠

</div>


<small>
Delivered
</small>


</div>



</div>


</div>


</div>




<hr/>





<h5 className="fw-bold">

Items

</h5>



{
order.orderItems?.map(item=>(


<div

key={item.id}

className="
d-flex
justify-content-between
border-bottom
py-2
"


>


<span>

{item.productName}

</span>


<span className="fw-semibold">

{item.quantity} × ₹{item.price}

</span>


</div>


))

}




<div className="text-end mt-3">


<h5 className="fw-bold">

Total Paid :

<span className="text-success">

₹{order.totalAmount}

</span>


</h5>


</div>



</div>


</div>


))


}



</div>


);
}