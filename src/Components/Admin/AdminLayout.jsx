import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <div className="d-flex">

      <Sidebar />

      <div
        className="flex-grow-1 bg-light"
        style={{ minHeight: "100vh" }}
      >
        <AdminNavbar />

        <div className="container-fluid py-4">
          {children}
        </div>

      </div>

    </div>
  );
}