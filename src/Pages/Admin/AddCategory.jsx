import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { addCategory } from "../../services/categoryService";

export default function AddCategory() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: ""
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

            await addCategory(formData);

            alert("Category Added Successfully!");

            navigate("/admin/categories");

        } catch (error) {

            console.error(error);

            alert("Failed to add category.");

        }
    };

    return (
        <AdminLayout>

            <div className="card shadow border-0">

                <div className="card-header bg-success text-white">
                    <h4 className="mb-0">Add Category</h4>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">
                                Category Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                name="description"
                                className="form-control"
                                rows="4"
                                value={formData.description}
                                onChange={handleChange}
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success me-2"
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/admin/categories")}
                        >
                            Cancel
                        </button>

                    </form>

                </div>

            </div>

        </AdminLayout>
    );
}