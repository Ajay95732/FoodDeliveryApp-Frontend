import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: "bi-speedometer2",
      path: "/admin/dashboard",
    },
    {
      name: "Products",
      icon: "bi-bag-fill",
      path: "/admin/products",
    },
    {
      name: "Add Product",
      icon: "bi-plus-circle-fill",
      path: "/admin/add-product",
    },
    {
      name: "Orders",
      icon: "bi-receipt",
      path: "/admin/orders",
    },
    {
      name: "Users",
      icon: "bi-people-fill",
      path: "/admin/users",
    },
    {
      name: "Categories",
      icon: "bi-grid-fill",
      path: "/admin/categories",
    },
  ];

  return (
    <div
      className="bg-dark text-white d-flex flex-column shadow-lg"
      style={{ width: "260px", minHeight: "100vh" }}
    >
      <div className="text-center py-4 border-bottom">
        <h3 className="fw-bold text-warning mb-0">
          🍔 FoodExpress
        </h3>
        <small className="text-light">
          Admin Panel
        </small>
      </div>

      <div className="list-group list-group-flush mt-3">

        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`list-group-item list-group-item-action border-0 ${
              location.pathname === item.path
                ? "active"
                : "bg-dark text-white"
            }`}
          >
            <i className={`bi ${item.icon} me-2`}></i>
            {item.name}
          </Link>
        ))}

      </div>

      <div className="mt-auto p-3 border-top">
        <div className="d-flex align-items-center">

          <div
            className="bg-warning rounded-circle d-flex justify-content-center align-items-center"
            style={{ width: 45, height: 45 }}
          >
            <i className="bi bi-person-fill text-dark"></i>
          </div>

          <div className="ms-3">
            <h6 className="mb-0">Admin</h6>
            <small className="text-light">
              Food Delivery
            </small>
          </div>

        </div>
      </div>
    </div>
  );
}