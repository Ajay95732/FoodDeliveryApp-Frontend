import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { getCategories } from "../../services/categoryService";
import {
  addProduct,
  getProductById,
  updateProduct
} from "../../services/productService";
import { uploadImage } from "../../services/uploadService";

export default function AddProduct() {

  const navigate = useNavigate();

  const { id } = useParams();


  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    categoryId: ""
});
const [imageType, setImageType] = useState("file");
  const [categories, setCategories] = useState([]);


  const isEdit = Boolean(id);



  useEffect(() => {

    loadCategories();

    if (isEdit) {
        loadProduct();
    }

}, [id]);



  const loadProduct = async () => {

    try {

      const data = await getProductById(id);

setProduct({
    name: data.name,
    description: data.description,
    price: data.price,
    imageUrl: data.imageUrl,
    categoryId: data.categoryId
});


if(data.imageUrl)
{
    setImageType("url");
}

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
  const handleImageUpload = async (e) => {

    const file = e.target.files[0];

    if (!file)
        return;

    try {

        const imageUrl = await uploadImage(file);

        setProduct(prev => ({
    ...prev,
    imageUrl: imageUrl
}));

    }
    catch (error) {

        console.log(error);

        alert("Image upload failed");

    }

};




  const handleSubmit = async(e)=>{

    e.preventDefault();


    try {


      if(isEdit){


        await updateProduct(id, {
    ...product,
    price: Number(product.price),
    categoryId: Number(product.categoryId)
});


        alert("Product updated successfully");


      }
      else{

    await addProduct({
        ...product,
        price: Number(product.price),
        categoryId: Number(product.categoryId)
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
  const loadCategories = async () => {
    try {
        const data = await getCategories();
        setCategories(data);
    } catch (error) {
        console.log(error);
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
    Product Image
</label>


<div className="mb-2">

    <input
        type="radio"
        name="imageType"
        value="file"
        checked={imageType === "file"}
        onChange={(e)=>setImageType(e.target.value)}
    />

    <label className="ms-2">
        Upload File
    </label>


    <input
        type="radio"
        name="imageType"
        value="url"
        checked={imageType === "url"}
        onChange={(e)=>setImageType(e.target.value)}
        className="ms-3"
    />

    <label className="ms-2">
        Image URL
    </label>

</div>



{
imageType === "file" && (

<input
    type="file"
    className="form-control"
    accept="image/*"
    onChange={handleImageUpload}
/>

)
}



{
imageType === "url" && (

<input
    type="text"
    className="form-control"
    placeholder="Enter image URL"
    value={product.imageUrl}
    onChange={(e)=>
        setProduct({
            ...product,
            imageUrl:e.target.value
        })
    }
/>

)
}



{
product.imageUrl && (

<img
    src={product.imageUrl}
    alt="Preview"
    className="mt-3 img-thumbnail"
    style={{
        width:"180px",
        height:"180px",
        objectFit:"cover"
    }}
/>

)
}


</div>



            <div className="mb-3">

    <label className="form-label">
        Category
    </label>

    <select
        className="form-select"
        name="categoryId"
        value={product.categoryId}
        onChange={handleChange}
        required
    >
        <option value="">
            Select Category
        </option>

        {categories.map(category => (
            <option
                key={category.id}
                value={category.id}
            >
                {category.name}
            </option>
        ))}

    </select>

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