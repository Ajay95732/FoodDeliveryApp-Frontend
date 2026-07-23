import { Link } from "react-router-dom";
import foodVideo from "../assets/food-video.mp4";
import { useEffect } from "react";

const categories = [
{
icon:"🍕",
name:"Pizza"
},
{
icon:"🍔",
name:"Burger"
},
{
icon:"🍗",
name:"Chicken"
},
{
icon:"🍛",
name:"Biryani"
},
{
icon:"🍜",
name:"Chinese"
},
{
icon:"🥤",
name:"Drinks"
}
];



const restaurants=[

{
id:1,
name:"Pizza Hut",
cuisine:"Pizza • Italian",
rating:"4.5",
time:"30 mins",
image:"https://images.unsplash.com/photo-1513104890138-7c749659a591"
},


{
id:2,
name:"Burger King",
cuisine:"Burger • Fast Food",
rating:"4.4",
time:"25 mins",
image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
},


{
id:3,
name:"Biryani House",
cuisine:"Indian • Biryani",
rating:"4.8",
time:"35 mins",
image:"https://images.unsplash.com/photo-1701579231346-fbf4a50f0df3"
}

];




export default function Home(){
    const user = JSON.parse(
    localStorage.getItem("user") || "null"
);



if(user)
{
return <LoggedInHome user={user}/>;
}

return(

<>


{/* HERO */}

<section
style={{
height:"90vh",
position:"relative",
overflow:"hidden"
}}
>


<video
autoPlay
loop
muted
playsInline
style={{
position:"absolute",
width:"100%",
height:"100%",
objectFit:"cover"
}}
>

<source
src={foodVideo}
type="video/mp4"
/>

</video>



{/* Dark overlay */}

<div
style={{
position:"absolute",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.45)"
}}
>

</div>



<div
className="
container
h-100
d-flex
justify-content-center
align-items-center
text-center
text-white
"
style={{
position:"relative"
}}
>


<div>


<h1
className="
display-1
fw-bold
"
>

FoodExpress

</h1>



<h2
className="
fw-bold
"
>

India's Favourite
<br/>
Food Delivery App

</h2>



<p
className="
fs-4
"
>

Order delicious food from your favourite restaurants

</p>



<div
className="
input-group
mx-auto
mt-4
"
style={{
maxWidth:"600px"
}}
>


<input

className="
form-control
py-3
"

placeholder="
Search restaurants and dishes
"

/>


<button

className="
btn
px-5
fw-bold
"

style={{
background:"#FF6B35",
color:"white"
}}

>

Search

</button>


</div>



<Link

to="/products"

className="
btn
rounded-pill
px-5
py-3
mt-4
fw-bold
"

style={{
background:"#FF6B35",
color:"white"
}}

>

Explore Food 🍔

</Link>



</div>


</div>


</section>


{/* CATEGORIES */}



<section className="container py-5">


<h2 className="
text-center
fw-bold
mb-5
">

Popular Categories

</h2>



<div className="row">


{
categories.map((item,index)=>(


<div
key={index}
className="
col-lg-2
col-md-4
col-6
mb-4
"
>


<div

className="
card
border-0
shadow-sm
rounded-4
text-center
h-100
"
style={{
transition:"0.3s",
cursor:"pointer"
}}
>


<div className="card-body">


<h1>

{item.icon}

</h1>


<h6 className="fw-bold">

{item.name}

</h6>


</div>


</div>



</div>


))
}



</div>


</section>









{/* OFFERS */}


<section className="bg-dark text-white py-5">


<div className="container">


<div className="row text-center g-4">


<div className="col-md-4">


<div className="p-4 rounded-4 bg-warning text-dark">

<h3>

50% OFF

</h3>

<p>
First Order Offer
</p>


</div>


</div>




<div className="col-md-4">


<div className="p-4 rounded-4 bg-success">

<h3>

Free Delivery

</h3>


<p>
Above ₹299
</p>


</div>


</div>





<div className="col-md-4">


<div className="p-4 rounded-4 bg-danger">


<h3>

Fast Delivery

</h3>


<p>
30 minutes
</p>


</div>


</div>



</div>


</div>


</section>









{/* RESTAURANTS */}



<section className="container py-5">


<h2 className="
text-center
fw-bold
mb-5
">

Top Restaurants Near You

</h2>



<div className="row g-4">



{
restaurants.map(item=>(


<div
className="
col-lg-4
col-md-6
"
key={item.id}
>


<Link

to={`/restaurant/${item.id}`}

className="
text-decoration-none
text-dark
"

>



<div className="
card
border-0
shadow-lg
rounded-5
overflow-hidden
h-100
">


<img

src={item.image}

className="
card-img-top
"

style={{
height:"250px",
objectFit:"cover"
}}

alt={item.name}

/>



<div className="card-body">


<h5 className="fw-bold">

{item.name}

</h5>



<p className="text-muted">

{item.cuisine}

</p>



<div className="
d-flex
justify-content-between
">


<span className="
badge
bg-success
">

⭐ {item.rating}

</span>


<span>

<i className="bi bi-clock"></i>

{item.time}

</span>



</div>


</div>


</div>


</Link>


</div>


))
}



</div>



</section>









{/* CTA */}


<section className="
bg-warning
py-5
text-center
">


<div className="container">


<h2 className="fw-bold">

Hungry? Order Now

</h2>


<p>

Discover amazing food around you.

</p>



<Link

to="/products"

className="
btn
btn-dark
rounded-pill
px-5
"

>

View Menu

</Link>



</div>


</section>


</>

);

}



function LoggedInHome({user}){

return(

<section
className="py-5"
style={{
background:"#FFF3E8",
minHeight:"80vh"
}}
>


<div className="container">


<h1 className="fw-bold">

Welcome {user.name} 👋

</h1>


<p className="fs-4">

What would you like to eat today?

</p>



<div className="row mt-5">


<div className="col-md-4">

<div className="card shadow rounded-4 p-4">

<h3>
🍔 Recommended
</h3>

<p>
Your favourite food
</p>

</div>

</div>




<div className="col-md-4">

<div className="card shadow rounded-4 p-4">

<h3>
📦 My Orders
</h3>

<p>
Track your orders
</p>

</div>

</div>




<div className="col-md-4">

<div className="card shadow rounded-4 p-4">

<h3>
❤️ Wishlist
</h3>

<p>
Saved items
</p>

</div>

</div>


</div>


</div>


</section>

);

}