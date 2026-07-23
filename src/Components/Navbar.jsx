import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Navbar(){

const [cartCount,setCartCount] = useState(0);
const [wishlistCount,setWishlistCount] = useState(0);
const [user,setUser] = useState(null);



useEffect(()=>{


const updateCounts=()=>{


const cart =
JSON.parse(localStorage.getItem("cart")) || [];


const wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];



setCartCount(
cart.reduce(
(sum,item)=>sum+item.quantity,
0
)
);



setWishlistCount(
wishlist.length
);


};



updateCounts();
const updateUser = () => {

  const loginUser =
  JSON.parse(localStorage.getItem("user"));

  setUser(loginUser);

};


updateUser();


window.addEventListener(
"userChanged",
updateUser
);



window.addEventListener(
"cartUpdated",
updateCounts
);


window.addEventListener(
"wishlistUpdated",
updateCounts
);



return()=>{


window.removeEventListener(
"cartUpdated",
updateCounts
);


window.removeEventListener(
"wishlistUpdated",
updateCounts
);


};


},[]);



return (

<nav
className="
navbar
navbar-expand-lg
py-3
sticky-top
shadow-sm
"
style={{
background:"#1F2937"
}}
>

<div className="container-fluid px-5">


{/* Logo */}

<Link
to="/"
className="
navbar-brand
fw-bold
fs-3
text-white
"
>

🍔 FoodExpress

</Link>





<button
className="navbar-toggler"
data-bs-toggle="collapse"
data-bs-target="#navbarMenu"
>

<span className="navbar-toggler-icon"></span>

</button>




<div
className="
collapse
navbar-collapse
"
id="navbarMenu"
>



<ul
className="
navbar-nav
ms-auto
align-items-center
gap-4
"
>



<li>

<Link
to="/"
className="
nav-link
text-white
fw-semibold
"
>

🏠 Home

</Link>

</li>



<li>

<Link
to="/products"
className="
nav-link
text-white
fw-semibold
"
>

🍽 Foods

</Link>

</li>




<li>

<Link
to="/wishlist"
className="
nav-link
text-white
fw-semibold
"
>

❤️ Wishlist

<span
className="
badge
bg-danger
rounded-pill
"
>

{wishlistCount}

</span>


</Link>


</li>




<li>

<Link
to="/cart"
className="
nav-link
text-white
fw-semibold
"
>

🛒 Cart

<span
className="
badge
bg-warning
text-dark
rounded-pill
"
>

{cartCount}

</span>


</Link>


</li>




<li>

<Link
to="/orders"
className="
nav-link
text-white
fw-semibold
"
>

📦 Orders

</Link>


</li>





<li>

{
user ?

<div className="dropdown">

<button
className="
btn
btn-light
rounded-pill
dropdown-toggle
fw-bold
"
data-bs-toggle="dropdown"
>

👤 {user.name}

</button>


<ul className="dropdown-menu dropdown-menu-end shadow">


<li>

<Link
className="dropdown-item"
to="/profile"
>

👤 My Profile

</Link>

</li>


<li>

<Link
className="dropdown-item"
to="/my-orders"
>

🛒 My Orders

</Link>

</li>


<li>

<Link
className="dropdown-item"
to="/wishlist"
>

❤️ Wishlist

</Link>

</li>


<li>
<hr className="dropdown-divider"/>
</li>


<li>

<button

className="
dropdown-item
text-danger
"

onClick={()=>{

localStorage.removeItem("user");

setUser(null);

window.dispatchEvent(
new Event("userChanged")
);

}}

>

🚪 Logout

</button>

</li>


</ul>


</div>


:

<Link
to="/login"
className="
btn
rounded-pill
px-4
fw-bold
"
style={{

background:"#FF6B35",

color:"white"

}}
>

👤 Login

</Link>

}


</li>




</ul>



</div>



</div>


</nav>

);

}