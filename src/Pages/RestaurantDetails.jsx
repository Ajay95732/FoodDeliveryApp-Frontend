import { useParams } from "react-router-dom";

const restaurants = [
  {
    id: 1,
    name: "Pizza Hut",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      
    rating: 4.5,
    time: "30 mins",
    address: "Madhapur, Hyderabad",
    cuisine: "Italian • Pizza",
     menu: [
  {
    id: 101,
    name: "Margherita Pizza",
    price: 299,
    rating: 4.6,
    veg: true,
    bestSeller: true,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    id: 102,
    name: "Veg Supreme",
    price: 399,
    rating: 4.7,
    veg: true,
    bestSeller: false,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    id: 103,
    name: "Garlic Bread",
    price: 149,
    rating: 4.5,
    veg: true,
    bestSeller: true,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
  },
  {
    id: 104,
    name: "Chicken Pizza",
    price: 499,
    rating: 4.8,
    veg: false,
    bestSeller: true,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    id: 105,
    name: "Pepsi",
    price: 60,
    rating: 4.4,
    veg: true,
    bestSeller: false,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97",
  },
],
  },

  {
    id: 2,
    name: "Burger King",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    rating: 4.4,
    time: "25 mins",
    address: "Kukatpally, Hyderabad",
    cuisine: "Burger • Fast Food",
    menu: [
  {
    id: 201,
    name: "Whopper",
    price: 249,
    rating: 4.7,
    veg: false,
    bestSeller: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: 202,
    name: "Chicken Burger",
    price: 199,
    rating: 4.6,
    veg: false,
    bestSeller: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: 203,
    name: "Veg Burger",
    price: 179,
    rating: 4.5,
    veg: true,
    bestSeller: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: 204,
    name: "French Fries",
    price: 119,
    rating: 4.4,
    veg: true,
    bestSeller: true,
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f",
  },
  {
    id: 205,
    name: "Coke",
    price: 60,
    rating: 4.3,
    veg: true,
    bestSeller: false,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97",
  },
],
  },

  {
    id: 3,
    name: "Biryani House",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTtWQFgd3t1sPPSxlnk-0TT5KOM6GnliFxVKqudAMSTA&s=10",
    rating: 4.8,
    time: "35 mins",
    address: "Hitech City, Hyderabad",
    cuisine: "Indian • Biryani",
    menu: [
  {
    id: 301,
    name: "Chicken Biryani",
    price: 299,
    rating: 4.8,
    veg: false,
    bestSeller: true,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTtWQFgd3t1sPPSxlnk-0TT5KOM6GnliFxVKqudAMSTA&s=10",
  },
  {
    id: 302,
    name: "Mutton Biryani",
    price: 399,
    rating: 4.9,
    veg: false,
    bestSeller: true,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTtWQFgd3t1sPPSxlnk-0TT5KOM6GnliFxVKqudAMSTA&s=10",
  },
  {
    id: 303,
    name: "Veg Biryani",
    price: 249,
    rating: 4.5,
    veg: true,
    bestSeller: false,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTtWQFgd3t1sPPSxlnk-0TT5KOM6GnliFxVKqudAMSTA&s=10",
  },
  {
    id: 304,
    name: "Double Ka Meetha",
    price: 99,
    rating: 4.4,
    veg: true,
    bestSeller: true,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTtWQFgd3t1sPPSxlnk-0TT5KOM6GnliFxVKqudAMSTA&s=10",
  },
  {
    id: 305,
    name: "Soft Drink",
    price: 50,
    rating: 4.3,
    veg: true,
    bestSeller: false,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97",
  },
],
  },
];

export default function RestaurantDetails() {
  const { id } = useParams();

  const restaurant = restaurants.find(
    (item) => item.id === Number(id)
  );

  if (!restaurant) {
    return (
      <div className="container mt-5">
        <h2>Restaurant Not Found</h2>
      </div>
    );
  }

  // ==========================
  // Add Menu Item To Cart
  // ==========================
  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    // Refresh Navbar Count
    window.dispatchEvent(new Event("storage"));

    alert(`${item.name} added to cart 🛒`);
  };

 return (

<div className="container py-5">


{/* Restaurant Header */}

<div className="
card
border-0
shadow
rounded-4
overflow-hidden
mb-5
">


<img

src={restaurant.image}

alt={restaurant.name}

className="
card-img-top
"

style={{

height:"350px",

objectFit:"cover"

}}

/>



<div className="card-body p-4">



<div className="
d-flex
justify-content-between
align-items-center
flex-wrap
">


<div>


<h1 className="fw-bold">

{restaurant.name}

</h1>



<p className="text-muted fs-5">

{restaurant.cuisine}

</p>


</div>



<span className="
badge
bg-success
fs-6
px-3
py-2
">

⭐ {restaurant.rating}

</span>



</div>





<div className="
row
mt-4
text-center
">


<div className="col-md-4">


<div className="
card
border-0
bg-light
rounded-4
p-3
">


<h5>

🚚 Delivery

</h5>


<p className="mb-0">

{restaurant.time}

</p>


</div>


</div>





<div className="col-md-4">


<div className="
card
border-0
bg-light
rounded-4
p-3
">


<h5>

📍 Location

</h5>


<p className="mb-0">

{restaurant.address}

</p>


</div>


</div>





<div className="col-md-4">


<div className="
card
border-0
bg-light
rounded-4
p-3
">


<h5>

🍽 Cuisine

</h5>


<p className="mb-0">

{restaurant.cuisine}

</p>


</div>


</div>



</div>


</div>


</div>







{/* Menu */}



<h2 className="fw-bold mb-4">

🍽 Recommended Menu

</h2>





<div className="row">


{
restaurant.menu.map((item)=>(


<div

className="
col-lg-6
mb-4
"

key={item.id}

>


<div className="
card
border-0
shadow-sm
rounded-4
h-100
">


<div className="
row
g-0
align-items-center
">


<div className="
col-7
">


<div className="card-body">


<h5 className="fw-bold">

{item.name}

</h5>



<div>


<span className="
text-warning
fw-bold
">

⭐ {item.rating}

</span>




{
item.bestSeller &&

<span className="
badge
bg-danger
ms-2
">

🔥 Bestseller

</span>

}



</div>





<h5 className="
text-success
fw-bold
mt-2
">

₹{item.price}

</h5>






{

item.veg ?

<span className="
badge
bg-success
">

🟢 Veg

</span>

:

<span className="
badge
bg-danger
">

🔴 Non Veg

</span>


}





<button

className="
btn
btn-warning
rounded-pill
w-100
mt-3
fw-bold
"


onClick={()=>addToCart(item)}

>


<i className="bi bi-cart-plus"></i>

ADD


</button>



</div>


</div>







<div className="
col-5
p-2
">


<img

src={item.image}

alt={item.name}

className="
img-fluid
rounded-4
"

style={{

height:"150px",

width:"100%",

objectFit:"cover"

}}


/>


</div>




</div>


</div>


</div>



))


}



</div>



</div>

);
}