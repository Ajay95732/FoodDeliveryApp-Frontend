import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    getCategoryById,
    updateCategory
} from "../../services/categoryService";

 function EditCategory() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });



    useEffect(() => {

        loadCategory();

    }, []);



    const loadCategory = async () => {

        try {

            const data = await getCategoryById(id);

            setFormData({

                name: data.name,

                description: data.description

            });


        }
        catch(error){

            console.log(error);

            alert("Unable to load category");

        }

    };




    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };




    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            await updateCategory(id, formData);


            alert("Category Updated Successfully");


            navigate("/admin/categories");


        }
        catch(error){

            console.log(error);

            alert("Update failed");

        }

    };



    return (

        <AdminLayout>


            <div className="card shadow border-0">


                <div className="card-header bg-primary text-white">

                    <h4 className="mb-0">
                        Edit Category
                    </h4>

                </div>



                <div className="card-body">


                    <form onSubmit={handleSubmit}>


                        <div className="mb-3">

                            <label className="form-label">
                                Category Name
                            </label>


                            <input

                                type="text"

                                className="form-control"

                                name="name"

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

                                className="form-control"

                                rows="4"

                                name="description"

                                value={formData.description}

                                onChange={handleChange}

                            />


                        </div>




                        <button

                            className="btn btn-primary me-2"

                        >

                            Update

                        </button>




                        <button

                            type="button"

                            className="btn btn-secondary"

                            onClick={() =>
                                navigate("/admin/categories")
                            }

                        >

                            Cancel

                        </button>


                    </form>


                </div>


            </div>


        </AdminLayout>

    );

}

export default EditCategory;