import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { registerUser } from "../../services/authService";

export default function AddUser() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "User"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const response = await registerUser(formData);

        if (response.ok) {

            alert("User Added Successfully!");

            navigate("/admin/users");

        } else {

            const error = await response.text();

            alert(error);

        }

    } catch (error) {

        console.error(error);

        alert("Something went wrong.");

    }
};

    return (
        <AdminLayout>

            <div className="card shadow border-0">

                <div className="card-header bg-success text-white">
                    <h4 className="mb-0">Add User</h4>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Role</label>

                            <select
                                name="role"
                                className="form-select"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-success me-2"
                        >
                            Save User
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/admin/users")}
                        >
                            Cancel
                        </button>

                    </form>

                </div>

            </div>

        </AdminLayout>
    );
}