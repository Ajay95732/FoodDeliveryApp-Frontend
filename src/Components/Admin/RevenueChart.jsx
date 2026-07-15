import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function RevenueChart({ revenue }) {

    const data = {
        labels: ["Revenue"],
        datasets: [
            {
                label: "Revenue",
                data: [revenue],
                backgroundColor: "#198754",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
    <div className="card shadow border-0 mt-4">
        <div className="card-body">

            <h5 className="fw-bold mb-3">
                Revenue Overview
            </h5>

            <div
                style={{
                    maxWidth: "700px",
                    height: "350px",
                    margin: "auto"
                }}
            >
                <Bar data={data} options={options} />
            </div>

        </div>
    </div>
);
}