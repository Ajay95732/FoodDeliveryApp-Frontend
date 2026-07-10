import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  const totalAmount = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

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

      <h2 className="fw-bold mb-4">
        🛒 Your Cart
      </h2>

      <div className="row">

        {/* Cart Items */}
        <div className="col-lg-8">

          {cart.map((item) => (
            <div
              key={item.id}
              className="card border-0 shadow-sm mb-3"
            >
              <div className="row g-0">

                <div className="col-md-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid rounded-start"
                    style={{
                      height: "150px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="col-md-9">

                  <div className="card-body">

                    <h5 className="fw-bold">
                      {item.name}
                    </h5>

                    <h6 className="text-success">
                      ₹{item.price}
                    </h6>

                    <div className="d-flex align-items-center gap-2 my-3">

                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          decreaseQty(item.id)
                        }
                      >
                        -
                      </button>

                      <span className="fw-bold">
                        {item.quantity}
                      </span>

                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          increaseQty(item.id)
                        }
                      >
                        +
                      </button>

                    </div>

                    <p className="fw-bold">
                      Total: ₹
                      {item.price *
                        item.quantity}
                    </p>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        removeItem(item.id)
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

        {/* Bill Details */}
        <div className="col-lg-4">

          <div className="card border-0 shadow-sm p-4">

            <h4 className="fw-bold">
              Bill Details
            </h4>

            <hr />

            <div className="d-flex justify-content-between mb-2">
              <span>Items Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Delivery Fee</span>
              <span>₹40</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>GST</span>
              <span>₹20</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between">
              <strong>Grand Total</strong>
              <strong>
                ₹{totalAmount + 60}
              </strong>
            </div>

            <Link
              to="/checkout"
              className="btn btn-success mt-4"
            >
              Proceed To Checkout
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}