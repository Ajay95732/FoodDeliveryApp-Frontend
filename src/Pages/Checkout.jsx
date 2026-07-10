import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = (e) => {
    e.preventDefault();

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      customer: formData,
      items: cart,
      date: new Date().toLocaleString(),
    };

    orders.push(newOrder);

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    localStorage.removeItem("cart");

    alert("Order Placed Successfully 🎉");

    navigate("/orders");
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-8">

          <div className="card shadow border-0">

            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                💳 Checkout
              </h2>

              <form onSubmit={placeOrder}>

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="form-control mb-3"
                  required
                  onChange={handleChange}
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="form-control mb-3"
                  required
                  onChange={handleChange}
                />

                <textarea
                  name="address"
                  placeholder="Delivery Address"
                  className="form-control mb-3"
                  rows="3"
                  required
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="form-control mb-3"
                  required
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  className="form-control mb-4"
                  required
                  onChange={handleChange}
                />

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Place Order
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}