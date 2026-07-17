import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { getCategories, deleteCategory } from "../../services/categoryService";


export default function Categories() {


    const navigate = useNavigate();


    const [categories, setCategories] = useState([]);

    const [filteredCategories, setFilteredCategories] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        loadCategories();

    }, []);



    const loadCategories = async () => {

        try {

            setLoading(true);


            const data = await getCategories();


            setCategories(data);

            setFilteredCategories(data);


        }
        catch(error){

            console.log(error);

            alert("Unable to load categories");

        }
        finally{

            setLoading(false);

        }

    };




    const handleDelete = async(id)=>{


        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );


        if(!confirmDelete)
            return;



        try{

            await deleteCategory(id);


            alert("Category deleted successfully");


            loadCategories();


        }
        catch(error){

            console.log(error);

            alert("Delete failed");

        }


    };




    useEffect(()=>{


        const result = categories.filter((category)=>

            category.name
            .toLowerCase()
            .includes(search.toLowerCase())

        );


        setFilteredCategories(result);



    },[search,categories]);





    return (

        <AdminLayout>


            <div className="d-flex justify-content-between align-items-center mb-4">


                <h2 className="fw-bold">
                    Categories
                </h2>



                <button

                    className="btn btn-success"

                    onClick={()=>navigate("/admin/add-category")}

                >

                    <i className="bi bi-plus-circle me-2"></i>

                    Add Category


                </button>


            </div>




            <div className="card shadow border-0">


                <div className="card-body">



                    <input

                        type="text"

                        className="form-control mb-3"

                        placeholder="Search Category..."

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                    />




                    {
                    loading ?


                    <div className="text-center py-5">

                        <div className="spinner-border text-success"></div>

                    </div>


                    :


                    <table className="table table-hover align-middle">


                        <thead className="table-dark">


                            <tr>

                                <th>ID</th>

                                <th>Name</th>

                                <th>Description</th>

                                <th>Action</th>

                            </tr>


                        </thead>



                        <tbody>


                        {
                            filteredCategories.map((category)=>(


                                <tr key={category.id}>


                                    <td>
                                        {category.id}
                                    </td>



                                    <td>
                                        {category.name}
                                    </td>



                                    <td>
                                        {category.description}
                                    </td>




                                    <td>

    {/* View */}
    <button
        className="btn btn-info btn-sm me-2"
        onClick={() =>
            navigate(`/admin/view-category/${category.id}`)
        }
    >
        <i className="bi bi-eye"></i>
    </button>


    {/* Edit */}
    <button
        className="btn btn-primary btn-sm me-2"
        onClick={() =>
            navigate(`/admin/edit-category/${category.id}`)
        }
    >
        <i className="bi bi-pencil"></i>
    </button>


    {/* Delete */}
    <button
        className="btn btn-danger btn-sm"
        onClick={() =>
            handleDelete(category.id)
        }
    >
        <i className="bi bi-trash"></i>
    </button>

</td>

                                </tr>


                            ))
                        }


                        </tbody>


                    </table>

                    }



                </div>


            </div>


        </AdminLayout>

    );

}