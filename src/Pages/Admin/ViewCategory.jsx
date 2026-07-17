import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { getCategoryById } from "../../services/categoryService";


export default function ViewCategory() {


    const { id } = useParams();

    const navigate = useNavigate();


    const [category, setCategory] = useState(null);



    useEffect(() => {

        loadCategory();

    }, []);




    const loadCategory = async () => {

        try {

            const data = await getCategoryById(id);

            setCategory(data);

        }
        catch(error){

            console.log(error);

            alert("Unable to load category");

        }

    };




    if(!category){

        return (

            <AdminLayout>

                <div className="text-center mt-5">

                    <div className="spinner-border text-success"></div>

                </div>

            </AdminLayout>

        );

    }




    return (

        <AdminLayout>


            <div className="card shadow border-0">


                <div className="card-header bg-success text-white">

                    <h4 className="mb-0">
                        Category Details
                    </h4>

                </div>



                <div className="card-body">


                    <table className="table table-bordered">


                        <tbody>


                            <tr>

                                <th width="200">
                                    ID
                                </th>

                                <td>
                                    {category.id}
                                </td>

                            </tr>



                            <tr>

                                <th>
                                    Category Name
                                </th>

                                <td>
                                    {category.name}
                                </td>

                            </tr>



                            <tr>

                                <th>
                                    Description
                                </th>

                                <td>
                                    {category.description || "No Description"}
                                </td>

                            </tr>



                        </tbody>


                    </table>




                    <button

                        className="btn btn-secondary me-2"

                        onClick={() =>
                            navigate("/admin/categories")
                        }

                    >

                        Back

                    </button>




                    <button

                        className="btn btn-primary"

                        onClick={() =>
                            navigate(`/admin/edit-category/${category.id}`)
                        }

                    >

                        Edit

                    </button>


                </div>


            </div>


        </AdminLayout>

    );

}