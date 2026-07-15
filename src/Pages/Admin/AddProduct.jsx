import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  addProduct,
  getProductById,
  updateProduct
} from "../../services/productService";


export default function AddProduct() {

  const navigate = useNavigate();

  const { id } = useParams();


  const [product, setProduct] = useState({

    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: ""

  });


  const isEdit = Boolean(id);



  useEffect(() => {

    if(isEdit){
      loadProduct();
    }

  }, [id]);



  const loadProduct = async () => {

    try {

      const data = await getProductById(id);

      setProduct(data);

    }
    catch(error){

      console.log(error);

      alert("Unable to load product");

    }

  };




  const handleChange = (e)=>{

    setProduct({

      ...product,

      [e.target.name]: e.target.value

    });

  };




  const handleSubmit = async(e)=>{

    e.preventDefault();


    try {


      if(isEdit){


        await updateProduct(id,{

          ...product,

          price:Number(product.price)

        });


        alert("Product updated successfully");


      }
      else{


        await addProduct({

          ...product,

          price:Number(product.price)

        });


        alert("Product added successfully");


      }



      navigate("/admin/products");


    }
    catch(error){

      console.log(error);

      alert("Operation failed");

    }

  };




  return (

    <AdminLayout>


      <div className="card shadow border-0">


        <div className="card-header bg-warning text-white">

          <h3>

            {isEdit ? "Edit Product" : "Add Product"}

          </h3>


        </div>




        <div className="card-body">


          <form onSubmit={handleSubmit}>


            <div className="mb-3">

              <label className="form-label">
                Product Name
              </label>


              <input

                className="form-control"

                name="name"

                value={product.name}

                onChange={handleChange}

                required

              />

            </div>




            <div className="mb-3">

              <label className="form-label">
                Description
              </label>


              <textarea

                className="form-control"

                name="description"

                value={product.description}

                onChange={handleChange}

                required

              />


            </div>




            <div className="mb-3">

              <label className="form-label">
                Price
              </label>


              <input

                type="number"

                className="form-control"

                name="price"

                value={product.price}

                onChange={handleChange}

                required

              />


            </div>




            <div className="mb-3">

              <label className="form-label">
                Image URL
              </label>


              <input

                className="form-control"

                name="imageUrl"

                value={product.imageUrl}

                onChange={handleChange}

              />


            </div>




            <div className="mb-3">

              <label className="form-label">
                Category
              </label>


              <input

                className="form-control"

                name="category"

                value={product.category}

                onChange={handleChange}

              />


            </div>




            <button className="btn btn-success">

              {isEdit ? "Update Product" : "Save Product"}

            </button>



            <button

              type="button"

              className="btn btn-secondary ms-2"

              onClick={() => navigate("/admin/products")}

            >

              Cancel

            </button>



          </form>


        </div>


      </div>


    </AdminLayout>

  );

}