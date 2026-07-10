import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="container text-center py-5">
        <h2>📦 No Orders Yet</h2>

        <p className="text-muted">
          Start ordering your favorite foods.
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
        📦 My Orders
      </h2>

      {orders.map((order) => {
        const total = order.items.reduce(
          (sum, item) =>
            sum + item.price * item.quantity,
          0
        );

        return (
          <div
            key={order.id}
            className="card shadow-sm border-0 mb-4"
          >
            <div className="card-body">

              <div className="d-flex justify-content-between">
                <h5>Order #{order.id}</h5>
                <span className="badge bg-success">
                  Delivered
                </span>
              </div>

              <p className="text-muted">
                {order.date}
              </p>

              <hr />

              <h6>Customer Details</h6>

              <p>
                <strong>Name:</strong>{" "}
                {order.customer.name}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {order.customer.phone}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {order.customer.address},{" "}
                {order.customer.city} -
                {order.customer.pincode}
              </p>

              <hr />

              <h6>Ordered Items</h6>

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between mb-2"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span>
                    ₹
                    {item.price * item.quantity}
                  </span>
                </div>
              ))}

              <hr />

              <h5 className="text-success">
                Total: ₹{total}
              </h5>

            </div>
          </div>
        );
      })}

    </div>
  );
}