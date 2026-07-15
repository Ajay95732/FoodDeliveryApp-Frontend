import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getUsers } from "../../services/userService";
export default function AdminPage({ page }) {
    const [users, setUsers] = useState([]);
const [search, setSearch] = useState("");

useEffect(() => {
    if (page === "users") {
        loadUsers();
    }
}, [page]);

const loadUsers = async () => {
    try {
        const data = await getUsers();
        setUsers(data);
    } catch (error) {
        console.error(error);
        alert("Failed to load users");
    }
};

const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
);

    return (
        <AdminLayout>

            {page === "orders" && (
                <>
                    <h2>Orders</h2>
                    <p>Orders page coming soon...</p>
                </>
            )}

            {page === "users" && (
    <>
        <div className="d-flex justify-content-between align-items-center mb-4">

            <h2 className="fw-bold">
                Users Management
            </h2>

            <span className="badge bg-primary fs-6">
                Total Users : {users.length}
            </span>

        </div>

        <div className="card shadow border-0">

            <div className="card-body">

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="table-responsive">

                    <table className="table table-hover">

                        <thead className="table-dark">

                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredUsers.map(user => (

                                <tr key={user.id}>

                                    <td>{user.id}</td>

                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>
                                        <span className="badge bg-success">
                                            {user.role}
                                        </span>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    </>
)}

            {page === "categories" && (
                <>
                    <h2>Categories</h2>
                    <p>Categories page coming soon...</p>
                </>
            )}

        </AdminLayout>
    );
}