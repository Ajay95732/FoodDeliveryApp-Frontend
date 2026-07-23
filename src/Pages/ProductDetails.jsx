  import React, { useEffect, useState } from "react";
  import { useParams, Link } from "react-router-dom";
  import { getProductById } from "../services/productService"; 
  import { useNavigate } from "react-router-dom";
  // Change path if needed

  export default function ProductDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const [wishlisted,setWishlisted] = useState(false);
  const addToWishlist = () => {

      let wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];


      const exists = wishlist.find(
        (item)=>item.id === food.id
      );


      if(!exists){

        wishlist.push(food);

        localStorage.setItem(
          "wishlist",
          JSON.stringify(wishlist)
        );

        setWishlisted(true);

        alert("Added to Wishlist ❤️");

      }
      else{

        alert("Already in Wishlist");

      }

    };


    useEffect(() => {

    const fetchProduct = async () => {

      try {

        const data = await getProductById(id);

  setFood(data);


        const wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];


        const exists = wishlist.find(
          (item)=>item.id === data.id
        );


        setWishlisted(!!exists);


      }
      catch(err){

        console.log(err);

      }
      finally{

        setLoading(false);

      }

    };


    fetchProduct();

  }, [id]);
    const addToCart = () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItem = cart.find((item) => item.id === food.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...food,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`${food.name} added to cart`);
    };

  const buyNow = () => {


  const cartItem = [
  {
  ...food,
  quantity:1
  }
  ];


  localStorage.setItem(
  "cart",
  JSON.stringify(cartItem)
  );


  navigate("/checkout");


  };
    if (loading) {
      return (
        <div className="text-center mt-5">
          <h2>Loading...</h2>
        </div>
      );
    }

    if (!food) {
      return (
        <div className="text-center mt-5">
          <h2>Product Not Found</h2>
        </div>
      );
    }

    return (
      <div className="container py-5">
        <Link
          to="/products"
          className="btn btn-secondary mb-4"
        >
          ← Back to Products
        </Link>

        <div className="card shadow-lg border-0">

          <img
            src={food.imageUrl}
            alt={food.name}
            className="card-img-top"
            style={{
              height: "400px",
              objectFit: "cover",
            }}
          />

          <div className="card-body">

            <h2 className="fw-bold">
              {food.name}
            </h2>

            <h3 className="text-success">
              ₹{food.price}
            </h3>

            <hr />

            <p>
  <strong>Category:</strong> {food.category?.name}
  </p>

            <p>
              <strong>Description:</strong>
            </p>

            <p>{food.description}</p>

            <div className="d-flex gap-3">


  <button
  className="btn btn-success"
  onClick={addToCart}
  >
  🛒 Add To Cart
  </button>



  <button
  className="btn btn-warning"
  onClick={buyNow}
  >
  💳 Buy Now
  </button>



  <button
  className="btn btn-light border rounded-circle"
  style={{
  width:"45px",
  height:"45px",
  fontSize:"22px"
  }}
  onClick={addToWishlist}
  >
  {wishlisted ? "❤️" : "♡"}
  </button>


  </div>

          </div>
        </div>
      </div>
    );
  }