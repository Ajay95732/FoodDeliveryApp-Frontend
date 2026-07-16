import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    getUsers,
    updateUser
} from "../../services/userService";

export default function EditUser() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        role: "User"
    });

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {

        try {

            const users = await getUsers();

            const selectedUser = users.find(u => u.id === Number(id));

            if (selectedUser) {

                setUser({
                    name: selectedUser.name,
                    email: selectedUser.email,
                    role: selectedUser.role
                });

            }

        } catch (error) {

            console.error(error);

            alert("Failed to load user.");

        }
    };

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        await updateUser(id, {
            ...user,
            password: ""
        });

        alert("User Updated Successfully!");

        navigate("/admin/users");

    }
    catch (error) {

        console.error(error);

        alert("Failed to update user.");

    }
};

    return (

        <AdminLayout>

            <div className="card shadow border-0">

                <div className="card-header bg-warning">

                    <h3>Edit User</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>Name</label>

                            <input
                                className="form-control"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Email</label>

                            <input
                                className="form-control"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-4">

                            <label>Role</label>

                            <select
                                className="form-select"
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                            >
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>

                        </div>

                        <button
                            className="btn btn-success me-2"
                            type="submit"
                        >
                            Update User
                        </button>

                        <button
                            className="btn btn-secondary"
                            type="button"
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