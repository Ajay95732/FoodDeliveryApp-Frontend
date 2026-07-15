import { useEffect, useState } from "react";
import { getOrders } from "../services/orderService";

export default function MyOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        }
        catch (error) {
            console.error(error);
            alert("Failed to load orders");
        }
    };

    // Status Badge Colors
    const badgeColor = (status) => {
        switch (status) {
            case "Pending":
                return "warning";

            case "Preparing":
                return "info";

            case "Out for Delivery":
                return "primary";

            case "Delivered":
                return "success";

            case "Cancelled":
                return "danger";

            default:
                return "secondary";
        }
    };

    return (
        <div className="container py-5">

            <h2 className="fw-bold mb-4">
                🍽 My Orders
            </h2>

            {orders.length === 0 ? (

                <div className="alert alert-info">
                    No Orders Found
                </div>

            ) : (

                orders.map((order) => (

                    <div
                        key={order.id}
                        className="card shadow-sm border-0 mb-4"
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-start">

                                <div>

                                    <h5 className="fw-bold">
                                        Order #{order.id}
                                    </h5>

                                    <p className="mb-2">
                                        <strong>Status:</strong>{" "}
                                        <span className={`badge bg-${badgeColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </p>

                                    <p className="mb-2">
                                        <strong>Date:</strong>{" "}
                                        {new Date(order.orderDate).toLocaleString()}
                                    </p>

                                    <p className="mb-2">
                                        <strong>Address:</strong>{" "}
                                        {order.address}
                                    </p>

                                </div>

                                <div className="text-end">

                                    <h4 className="text-success fw-bold">
                                        ₹{order.totalAmount}
                                    </h4>

                                </div>

                            </div>

                            <hr />

                            <h6 className="fw-bold mb-3">
                                Ordered Items
                            </h6>

                            {order.orderItems && order.orderItems.length > 0 ? (

                                order.orderItems.map((item, index) => (

                                    <div
                                        key={index}
                                        className="d-flex justify-content-between align-items-center border rounded p-3 mb-2"
                                    >

                                        <div>

                                            <h6 className="mb-1 fw-bold">
                                                {item.productName}
                                            </h6>

                                            <small className="text-muted">
                                                Qty : {item.quantity}
                                            </small>

                                        </div>

                                        <div className="text-end">

                                            <div>
                                                ₹{item.price}
                                            </div>

                                            <strong>
                                                ₹{item.price * item.quantity}
                                            </strong>

                                        </div>

                                    </div>

                                ))

                            ) : (

                                <p className="text-muted">
                                    No Items Found
                                </p>

                            )}

                        </div>

                    </div>

                ))

            )}

        </div>
    );
}