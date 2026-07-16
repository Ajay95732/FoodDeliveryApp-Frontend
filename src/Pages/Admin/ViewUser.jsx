import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { getUsers } from "../../services/userService";

export default function ViewUser() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {

        try {

            const users = await getUsers();

            const selectedUser = users.find(u => u.id === Number(id));

            setUser(selectedUser);

        }
        catch (error) {

            console.error(error);

            alert("Failed to load user.");

        }
    };

    if (!user) {
        return (
            <AdminLayout>
                <h4>Loading...</h4>
            </AdminLayout>
        );
    }

    return (

        <AdminLayout>

            <div className="card shadow border-0">

                <div className="card-header bg-primary text-white">

                    <h3>User Details</h3>

                </div>

                <div className="card-body">

                    <div className="mb-3">
                        <strong>ID :</strong> {user.id}
                    </div>

                    <div className="mb-3">
                        <strong>Name :</strong> {user.name}
                    </div>

                    <div className="mb-3">
                        <strong>Email :</strong> {user.email}
                    </div>

                    <div className="mb-4">
                        <strong>Role :</strong> {user.role}
                    </div>

                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/admin/users")}
                    >
                        Back
                    </button>

                </div>

            </div>

        </AdminLayout>

    );
}