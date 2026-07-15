import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">

      <div className="container-fluid">

        <h4 className="fw-bold text-dark">
          Dashboard
        </h4>

        <form
          className="d-none d-md-flex"
          style={{ width: "350px" }}
        >
          <input
            className="form-control"
            placeholder="Search..."
          />
        </form>

        <div className="d-flex align-items-center">

          <button className="btn position-relative me-3">
            <i className="bi bi-bell fs-5"></i>

            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              3
            </span>
          </button>

          <div className="me-3 text-end">
            <h6 className="mb-0">
              Admin
            </h6>

            <small className="text-muted">
              Food Delivery
            </small>
          </div>

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}