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



  useEffect(() => {
    loadProducts();
  }, []);



  const loadProducts = async () => {

    try {

      const data = await getProducts();

      setProducts(data);
      setFilteredProducts(data);

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

            onChange={(e)=>setSearch(e.target.value)}

          />





          {
            loading ?


            <div className="text-center py-5">

              <div className="spinner-border text-warning"></div>

            </div>



            :



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

                          style={{
                            objectFit:"cover"
                          }}

                        />

                      </td>



                      <td>
                        {product.name}
                      </td>



                      <td>
                        {product.category}
                      </td>



                      <td>
                        ₹{product.price}
                      </td>





                      <td>


                        {/* Edit Button */}

                        <button

                          className="btn btn-primary btn-sm me-2"

                          onClick={() =>
                            navigate(
                              `/admin/edit-product/${product.id}`
                            )
                          }

                        >

                          <i className="bi bi-pencil"></i>


                        </button>





                        {/* Delete Button */}

                        <button

                          className="btn btn-danger btn-sm"

                          onClick={() =>
                            handleDelete(product.id)
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