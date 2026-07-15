import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardData } from "../../services/dashboardService";
import AdminLayout from "../../components/admin/AdminLayout";
import RevenueChart from "../../components/admin/RevenueChart";
import OrderStatusChart from "../../components/admin/OrderStatusChart";
export default function Dashboard() {

  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    pending: 0,
    preparing: 0,
    delivered: 0,
    cancelled: 0,
    outForDelivery: 0,
    recentOrders: []
});

useEffect(() => {
    loadDashboard();
}, []);

const loadDashboard = async () => {
    try {
        const data = await getDashboardData();
        setDashboard(data);
    }
    catch (error) {
        console.error(error);
        alert("Failed to load dashboard.");
    }
};

  return (
    <AdminLayout>

      {/* Heading */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold">
            Dashboard
          </h2>

          <p className="text-muted mb-0">
            Welcome back, Admin 👋
          </p>
        </div>


        {/* Top Add Product Button */}

        <button
          className="btn btn-warning"
          onClick={() => navigate("/admin/add-product")}
        >

          <i className="bi bi-plus-circle me-2"></i>
          Add Product

        </button>


      </div>


      {/* Statistics */}

      <div className="row g-4">

        <div className="col-lg-3 col-md-6">
          <div className="card shadow border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>
                  <h6 className="text-muted">
                    Products
                  </h6>

                  <h2 className="fw-bold">
                    {dashboard.products}
                  </h2>
                </div>


                <div className="bg-warning rounded-circle p-3">

                  <i className="bi bi-bag-fill fs-3 text-white"></i>

                </div>

              </div>

            </div>

          </div>
        </div>


        <div className="col-lg-3 col-md-6">
          <div className="card shadow border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>
                  <h6 className="text-muted">
                    Orders
                  </h6>

                  <h2 className="fw-bold">
                    {dashboard.orders}
                  </h2>
                </div>


                <div className="bg-success rounded-circle p-3">

                  <i className="bi bi-receipt fs-3 text-white"></i>

                </div>

              </div>

            </div>

          </div>
        </div>


        <div className="col-lg-3 col-md-6">
          <div className="card shadow border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>
                  <h6 className="text-muted">
                    Pending Orders
                  </h6>

                  <h2 className="fw-bold">
                    {dashboard.pending}
                  </h2>
                </div>


                <div className="bg-primary rounded-circle p-3">

                  <i className="bi bi-clock-history fs-3 text-white"></i>

                </div>

              </div>

            </div>

          </div>
        </div>


        <div className="col-lg-3 col-md-6">
          <div className="card shadow border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>
                  <h6 className="text-muted">
                    Revenue
                  </h6>

                  <h2 className="fw-bold">
                    ₹{dashboard.revenue}
                  </h2>
                </div>


                <div className="bg-danger rounded-circle p-3">

                  <i className="bi bi-currency-rupee fs-3 text-white"></i>

                </div>

              </div>

            </div>

          </div>
        </div>
        <div className="col-lg-3 col-md-6">
    <div className="card shadow border-0">

        <div className="card-body">

            <div className="d-flex justify-content-between">

                <div>

                    <h6 className="text-muted">
                        Preparing
                    </h6>

                    <h2 className="fw-bold">
                        {dashboard.preparing}
                    </h2>

                </div>

                <div className="bg-info rounded-circle p-3">

                    <i className="bi bi-fire fs-3 text-white"></i>

                </div>

            </div>

        </div>

    </div>
</div>
<div className="col-lg-3 col-md-6">
    <div className="card shadow border-0">

        <div className="card-body">

            <div className="d-flex justify-content-between">

                <div>

                    <h6 className="text-muted">
                        Out for Delivery
                    </h6>

                    <h2 className="fw-bold">
                        {dashboard.outForDelivery}
                    </h2>

                </div>

                <div className="bg-primary rounded-circle p-3">

                    <i className="bi bi-truck fs-3 text-white"></i>

                </div>

            </div>

        </div>

    </div>
</div>
<div className="col-lg-3 col-md-6">
    <div className="card shadow border-0">

        <div className="card-body">

            <div className="d-flex justify-content-between">

                <div>

                    <h6 className="text-muted">
                        Delivered
                    </h6>

                    <h2 className="fw-bold">
                        {dashboard.delivered}
                    </h2>

                </div>

                <div className="bg-success rounded-circle p-3">

                    <i className="bi bi-check-circle fs-3 text-white"></i>

                </div>

            </div>

        </div>

    </div>
</div>
<div className="col-lg-3 col-md-6">
    <div className="card shadow border-0">

        <div className="card-body">

            <div className="d-flex justify-content-between">

                <div>

                    <h6 className="text-muted">
                        Cancelled
                    </h6>

                    <h2 className="fw-bold">
                        {dashboard.cancelled}
                    </h2>

                </div>

                <div className="bg-danger rounded-circle p-3">

                    <i className="bi bi-x-circle fs-3 text-white"></i>

                </div>

            </div>

        </div>

    </div>
</div>


      </div>



      {/* Recent Orders */}

      <div className="card shadow border-0 mt-5">

        <div className="card-header bg-white">

          <h5 className="fw-bold mb-0">
            Recent Orders
          </h5>

        </div>


        <div className="card-body p-0">

          <table className="table table-hover mb-0">


            <thead className="table-light">

              <tr>
                <th>Order Id</th>
                <th>Customer</th>
                <th>Food</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>

            </thead>


            <tbody>

    {dashboard.recentOrders.map((order) => (

        <tr key={order.id}>

            <td>#{order.id}</td>

            <td>{order.customerName}</td>

            <td>
                {order.orderItems?.length > 0
                    ? order.orderItems[0].productName
                    : "-"}
            </td>

            <td>₹{order.totalAmount}</td>

            <td>

                <span
                    className={`badge bg-${
                        order.status === "Pending"
                            ? "warning"
                            : order.status === "Preparing"
                            ? "primary"
                            : order.status === "Delivered"
                            ? "success"
                            : order.status === "Cancelled"
                            ? "danger"
                            : "secondary"
                    }`}
                >
                    {order.status}
                </span>

            </td>

        </tr>

    ))}

</tbody>


          </table>


        </div>


      </div>


<div className="row mt-4">

    <div className="col-lg-6">
        <RevenueChart revenue={dashboard.revenue} />
    </div>

    <div className="col-lg-6">
        <OrderStatusChart
            pending={dashboard.pending}
            preparing={dashboard.preparing}
            outForDelivery={dashboard.outForDelivery}
            delivered={dashboard.delivered}
            cancelled={dashboard.cancelled}
        />
    </div>

</div>

      {/* Quick Actions */}

      <div className="row mt-5">


        <div className="col-lg-3">

          <button
            className="btn btn-warning w-100 py-3"
            onClick={() => navigate("/admin/add-product")}
          >

            <i className="bi bi-plus-circle me-2"></i>

            Add Product

          </button>

        </div>



        <div className="col-lg-3">

          <button className="btn btn-success w-100 py-3">

            <i className="bi bi-grid me-2"></i>

            Categories

          </button>

        </div>



        <div className="col-lg-3">

          <button className="btn btn-primary w-100 py-3">

            <i className="bi bi-people me-2"></i>

            Users

          </button>

        </div>



        <div className="col-lg-3">

          <button className="btn btn-danger w-100 py-3">

            <i className="bi bi-receipt me-2"></i>

            Orders

          </button>

        </div>


      </div>


    </AdminLayout>
  );
}