import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const navigate = useNavigate();


if(!product)
return null;



const addToCart = ()=>{
let cart =
JSON.parse(localStorage.getItem("cart")) || [];



const existing =
cart.find(
item=>item.id===product.id
);



if(existing){

existing.quantity +=1;

}
else{

cart.push({

...product,

quantity:1

});

}



localStorage.setItem(
"cart",
JSON.stringify(cart)
);


window.dispatchEvent(
new Event("cartUpdated")
);


alert(
`${product.name} added to cart`
);


};
const buyNow = ()=>{


const cartItem = [
{
...product,
quantity:1
}
];


localStorage.setItem(
"cart",
JSON.stringify(cartItem)
);


window.dispatchEvent(
new Event("cartUpdated")
);


navigate("/checkout");


};







const addToWishlist = ()=>{


let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];



const exists =
wishlist.find(
item=>item.id===product.id
);



if(exists){

alert("Already in wishlist ❤️");
return;

}



wishlist.push(product);



localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);



window.dispatchEvent(
new Event("wishlistUpdated")
);



alert(
`${product.name} added to wishlist`
);


};





return(


<div className="
col-lg-3
col-md-4
col-sm-6
mb-4
">


<div className="
card
border-0
shadow
rounded-4
overflow-hidden
h-100
">



<Link

to={`/product/${product.id}`}

className="
text-decoration-none
text-dark
"

>



<div className="position-relative">


<img

src={product.imageUrl}

alt={product.name}

className="
card-img-top
"

style={{

height:"220px",

objectFit:"cover"

}}


/>


<span

className="
position-absolute
top-0
end-0
m-3
badge
bg-success
"

>

⭐ 4.5

</span>



</div>





<div className="card-body">


<h5 className="fw-bold">

{product.name}

</h5>




<p className="text-muted small mb-1">

<i className="bi bi-tag"></i>

{" "}

{product.category?.name}

</p>





<p className="
text-secondary
small
"
>

{product.description?.slice(0,70)}

...

</p>






<h4 className="text-warning fw-bold">

₹{product.price}

</h4>




</div>


</Link>





<div className="card-footer bg-white border-0 p-3">


<div className="d-flex gap-2">


<button
className="
btn
btn-warning
rounded-pill
flex-grow-1
fw-bold
"

onClick={addToCart}

>

<i className="bi bi-cart-plus"></i>

Add

</button>



<button
className="
btn
btn-success
rounded-pill
fw-bold
"

onClick={buyNow}

>

💳 Buy

</button>



<button

className="
btn
btn-outline-danger
rounded-circle
"

style={{
 width:"38px",
 height:"38px"
}}

onClick={addToWishlist}

>

❤️

</button>


</div>

</div>




</div>


</div>


);


}