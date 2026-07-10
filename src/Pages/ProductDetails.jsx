import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../services/productService"; // Change path if needed

export default function ProductDetails() {
  const { id } = useParams();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setFood(data);
      } catch (err) {
        console.log(err);
      } finally {
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
            <strong>Category:</strong> {food.category}
          </p>

          <p>
            <strong>Description:</strong>
          </p>

          <p>{food.description}</p>

          <button
            className="btn btn-success me-2"
            onClick={addToCart}
          >
            Add To Cart
          </button>

          <button className="btn btn-warning">
            Buy Now
          </button>

        </div>
      </div>
    </div>
  );
}