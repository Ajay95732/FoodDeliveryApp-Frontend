import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function OrderStatusChart({
    pending,
    preparing,
    outForDelivery,
    delivered,
    cancelled
}) {

    const data = {
        labels: [
            "Pending",
            "Preparing",
            "Out for Delivery",
            "Delivered",
            "Cancelled"
        ],
        datasets: [
            {
                data: [
                    pending,
                    preparing,
                    outForDelivery,
                    delivered,
                    cancelled
                ],
                backgroundColor: [
                    "#ffc107",
                    "#0dcaf0",
                    "#0d6efd",
                    "#198754",
                    "#dc3545"
                ]
            }
        ]
    };

    return (
        <div className="card shadow border-0">
            <div className="card-body">
                <h5 className="fw-bold mb-3">
                    Order Status
                </h5>

                <Pie data={data} />
            </div>
        </div>
    );
}