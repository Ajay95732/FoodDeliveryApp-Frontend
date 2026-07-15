import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../services/orderService";

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

  const placeOrder = async (e) => {
    e.preventDefault();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const order = {
        customerName: formData.name,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
        totalAmount: totalAmount,

        items: cart.map((item) => ({
            productId: item.id,
            productName: item.name,
            price: item.price,
            quantity: item.quantity
        }))
    };

    try {

        await addOrder(order);

        localStorage.removeItem("cart");

        alert("Order Placed Successfully 🎉");

        navigate("/orders");

    }
    catch (error) {
    console.error("Full Error:", error);

    if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        alert(JSON.stringify(error.response.data));
    } else {
        alert(error.message);
    }
}
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
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="form-control mb-3"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                <textarea
                  name="address"
                  placeholder="Delivery Address"
                  className="form-control mb-3"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="form-control mb-3"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  className="form-control mb-4"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
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