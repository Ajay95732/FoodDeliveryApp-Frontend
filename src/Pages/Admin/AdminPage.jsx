import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { getUsers, deleteUser } from "../../services/userService";
import {
    getCategories,
    deleteCategory
} from "../../services/categoryService";
export default function AdminPage({ page }) {
const navigate = useNavigate();
const [users, setUsers] = useState([]);
const [search, setSearch] = useState("");
const [categories, setCategories] = useState([]);

useEffect(() => {

    if (page === "users") {
        loadUsers();
    }

    if (page === "categories") {
        loadCategories();
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
const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete this user?"))
        return;

    try {

        await deleteUser(id);

        alert("User Deleted Successfully");

        loadUsers();

    } catch (error) {

        console.error(error);

        alert("Failed to delete user.");

    }
};
const loadCategories = async () => {

    try {

        const data = await getCategories();

        setCategories(data);

    } catch (error) {

        console.error(error);

        alert("Failed to load categories");

    }
};

const handleDeleteCategory = async (id) => {

    if (!window.confirm("Delete this category?"))
        return;

    try {

        await deleteCategory(id);

        alert("Category Deleted Successfully");

        loadCategories();

    } catch (error) {

        console.error(error);

        alert("Failed to delete category.");

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

    <div>

        <button
            className="btn btn-success me-3"
            onClick={() => navigate("/admin/add-user")}
        >
            <i className="bi bi-person-plus-fill me-2"></i>
            Add User
        </button>

        <span className="badge bg-primary fs-6">
            Total Users : {users.length}
        </span>

    </div>

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
                                <th>Action</th>
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

    <td>

    <button
        className="btn btn-primary btn-sm me-2"
        onClick={() => navigate(`/admin/view-user/${user.id}`)}
    >
        <i className="bi bi-eye-fill"></i>
    </button>

    <button
        className="btn btn-warning btn-sm me-2"
        onClick={() => navigate(`/admin/edit-user/${user.id}`)}
    >
        <i className="bi bi-pencil-square"></i>
    </button>

    <button
        className="btn btn-danger btn-sm"
        onClick={() => handleDelete(user.id)}
    >
        <i className="bi bi-trash"></i>
    </button>

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

        <div className="d-flex justify-content-between align-items-center mb-4">

    <h2 className="fw-bold">
        Categories Management
    </h2>

    <div>

        <button
            className="btn btn-success me-3"
            onClick={() => navigate("/admin/add-category")}
        >
            <i className="bi bi-plus-circle me-2"></i>
            Add Category
        </button>

        <span className="badge bg-success fs-6">
            Total Categories : {categories.length}
        </span>

    </div>

</div>

        <div className="card shadow border-0">

            <div className="card-body">

                <table className="table table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {categories.map(category => (

                            <tr key={category.id}>

                                <td>{category.id}</td>

                                <td>{category.name}</td>

                                <td>{category.description}</td>

                                <td>

    <button
        className="btn btn-primary btn-sm me-2"
        onClick={() => navigate(`/admin/view-category/${category.id}`)}
    >
        <i className="bi bi-eye-fill"></i>
    </button>

    <button
        className="btn btn-warning btn-sm me-2"
        onClick={() => navigate(`/admin/edit-category/${category.id}`)}
    >
        <i className="bi bi-pencil-square"></i>
    </button>

    <button
        className="btn btn-danger btn-sm"
        onClick={() => handleDeleteCategory(category.id)}
    >
        <i className="bi bi-trash"></i>
    </button>

</td>
                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    </>
)}

        </AdminLayout>
    );
}