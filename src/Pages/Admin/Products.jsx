import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { getProducts, deleteProduct } from "../../services/productService";


export default function Products() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);

const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);


useEffect(() => {
  loadProducts();
}, [currentPage]);



  const loadProducts = async () => {

    try {

      setLoading(true);

      const response = await getProducts(
        currentPage,
        10
      );


      setProducts(response.data);

      setFilteredProducts(response.data);

      setTotalPages(response.totalPages);


    }
    catch(error){

      console.log(error);

      alert("Unable to load products");

    }
    finally{

      setLoading(false);

    }

};




  const handleDelete = async (id) => {


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );


    if(!confirmDelete)
      return;



    try {


      await deleteProduct(id);


      alert("Product deleted successfully");


      loadProducts();



    }
    catch(error){

      console.log(error);

      alert("Delete failed");

    }

  };




  useEffect(() => {


    const result = products.filter((p) =>

      p.name.toLowerCase()
      .includes(search.toLowerCase())

    );


    setFilteredProducts(result);


  }, [search, products]);





  return (

    <AdminLayout>


      <div className="d-flex justify-content-between align-items-center mb-4">


        <h2 className="fw-bold">
          Products
        </h2>



        <button

          className="btn btn-warning"

          onClick={() => navigate("/admin/add-product")}

        >

          <i className="bi bi-plus-circle me-2"></i>

          Add Product


        </button>


      </div>





      <div className="card shadow border-0">


        <div className="card-body">


          <input

            type="text"

            className="form-control mb-3"

            placeholder="Search Product..."

            value={search}

           onChange={(e)=>{
    setSearch(e.target.value);
    setCurrentPage(1);
}}

          />





          {
            loading ?


            <div className="text-center py-5">

              <div className="spinner-border text-warning"></div>

            </div>



            :


<>
            <table className="table table-hover align-middle">

              <thead className="table-dark">


                <tr>

                  <th>ID</th>

                  <th>Image</th>

                  <th>Name</th>

                  <th>Category</th>

                  <th>Price</th>

                  <th>Action</th>

                </tr>


              </thead>





              <tbody>


                {
                  filteredProducts.map((product)=>(


                    <tr key={product.id}>


                      <td>
                        {product.id}
                      </td>



                      <td>

                        <img
    src={product.imageUrl}
    alt={product.name}
    width="70"
    height="70"
    className="rounded"
    style={{ objectFit: "cover" }}
    onError={(e) => {
        e.target.src = "https://via.placeholder.com/70";
    }}
/>
                      </td>



                      <td>
                        {product.name}
                      </td>



                      <td>
    {product.category?.name || "No Category"}
</td>


                      <td>
                        ₹{product.price}
                      </td>
                      <td>

    {/* View */}
    <button
    className="btn btn-info btn-sm me-2"
    onClick={() =>
        navigate(`/admin/view-product/${product.id}`)
    }
>
    <i className="bi bi-eye"></i>
</button>

    {/* Edit */}
    <button
        className="btn btn-primary btn-sm me-2"
        onClick={() =>
            navigate(`/admin/edit-product/${product.id}`)
        }
    >
        <i className="bi bi-pencil"></i>
    </button>

    {/* Delete */}
    <button
        className="btn btn-danger btn-sm"
        onClick={() => handleDelete(product.id)}
    >
        <i className="bi bi-trash"></i>
    </button>

</td>


                    </tr>


                  ))
                }


              </tbody>


                        </table>


{
totalPages > 1 && (

<div className="d-flex justify-content-center mt-4">

<button
className="btn btn-outline-warning mx-1"
disabled={currentPage === 1}
onClick={() => setCurrentPage(currentPage - 1)}
>
Previous
</button>


{
Array.from(
 { length: totalPages },
 (_, index) => index + 1
)
.map(page => (

<button
key={page}
className={
currentPage === page
? "btn btn-warning mx-1"
: "btn btn-outline-warning mx-1"
}
onClick={() => setCurrentPage(page)}
>
{page}
</button>

))
}


<button
className="btn btn-outline-warning mx-1"
disabled={currentPage === totalPages}
onClick={() => setCurrentPage(currentPage + 1)}
>
Next
</button>

</div>
)
}

</>
          }
            

          
          


        </div>


      </div>


    </AdminLayout>

  );


}