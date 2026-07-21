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
return "bg-info";

case "Out for Delivery":
return "bg-primary";

case "Cancelled":
return "bg-danger";

default:
return "bg-warning";

}

};



return(

<div className="container py-5">


<div className="d-flex justify-content-between align-items-center mb-4">

<h2 className="fw-bold">
My Orders 🛒
</h2>


<button 
className="btn btn-warning"
onClick={loadOrders}
>
🔄 Refresh
</button>


</div>




{
loading ?

<div className="text-center">
<div className="spinner-border text-warning"></div>
</div>


:

orders.length === 0 ?

<div className="text-center mt-5">

<h4>
No Orders Found 😔
</h4>

<p>
Start ordering your favourite food
</p>

</div>


:


orders.map(order=>(


<div 
key={order.id}
className="card shadow border-0 mb-4"
>


<div className="card-body">


<div className="d-flex justify-content-between">


<h5 className="fw-bold">
Order #{order.id}
</h5>


<span 
className={`badge ${getStatusClass(order.status)}`}
>

{order.status}

</span>


</div>



<hr/>


<div className="row">


<div className="col-md-6">


<p>
<b>Amount:</b> ₹{order.totalAmount}
</p>


<p>
<b>Address:</b> {order.address}
</p>



<p>

<b>Date:</b>{" "}

{
new Date(order.orderDate)
.toLocaleDateString()
}

</p>


</div>


<div className="col-md-6">


<h6 className="fw-bold">
Order Tracking
</h6>


<p className={
order.status
? "text-success"
:""
}>
✅ Order Placed
</p>


<p className={
["Preparing",
"Out for Delivery",
"Delivered"]
.includes(order.status)
?
"text-success"
:
"text-muted"
}>
🍳 Preparing Food
</p>


<p className={
["Out for Delivery",
"Delivered"]
.includes(order.status)
?
"text-success"
:
"text-muted"
}>
🚚 Out for Delivery
</p>



<p className={
order.status==="Delivered"
?
"text-success"
:
"text-muted"
}>
🏠 Delivered
</p>



</div>


</div>



<hr/>


<h6 className="fw-bold">
Items
</h6>



{
order.orderItems?.map(item=>(


<div 
key={item.id}
className="d-flex justify-content-between border-bottom py-2"
>


<span>
{item.productName}
</span>


<span>
{item.quantity} x ₹{item.price}
</span>


</div>


))
}



<div className="text-end mt-3">


<h5 className="fw-bold">

Total Paid : ₹{order.totalAmount}

</h5>


</div>



</div>


</div>


))


}



</div>


);

}