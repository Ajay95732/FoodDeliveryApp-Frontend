import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== id
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  const moveToCart = (item) => {
    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(
      (cartItem) => cartItem.id === item.id
    );

    if (!exists) {
      cart.push({
        ...item,
        quantity: 1,
      });

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );
    }

    removeFromWishlist(item.id);

    alert("Added to Cart 🛒");
  };

  if (wishlist.length === 0) {
    return (
      <div className="container text-center py-5">
        <h2>❤️ Wishlist is Empty</h2>

        <p className="text-muted">
          Save your favorite foods here.
        </p>

        <Link
          to="/products"
          className="btn btn-warning"
        >
          Browse Foods
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <h2 className="fw-bold mb-4">
        ❤️ My Wishlist
      </h2>

      <div className="row">

        {wishlist.map((item) => (
          <div
            key={item.id}
            className="col-lg-3 col-md-4 col-sm-6 mb-4"
          >
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >

              <img
                src={item.image}
                alt={item.name}
                className="card-img-top"
                style={{
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">

                <h5 className="fw-bold">
                  {item.name}
                </h5>

                <p className="text-muted">
                  ⭐ {item.rating}
                </p>

                <h5 className="text-success">
                  ₹{item.price}
                </h5>

                <div className="d-grid gap-2 mt-3">

                  <button
                    className="btn btn-success"
                    onClick={() =>
                      moveToCart(item)
                    }
                  >
                    🛒 Move To Cart
                  </button>

                  <button
                    className="btn btn-outline-danger"
                    onClick={() =>
                      removeFromWishlist(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}