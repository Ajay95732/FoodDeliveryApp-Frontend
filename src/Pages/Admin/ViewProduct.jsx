import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { getProductById } from "../../services/productService";

export default function ViewProduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        try {

            const data = await getProductById(id);

            setProduct(data);

        } catch (error) {

            console.log(error);

            alert("Unable to load product");

        }
    };

    if (!product) {
        return (
            <AdminLayout>
                <div className="text-center mt-5">
                    <div className="spinner-border text-warning"></div>
                </div>
            </AdminLayout>
        );
    }

    return (

        <AdminLayout>

            <div className="card shadow border-0">

                <div className="card-header bg-info text-white">

                    <h3>
                        Product Details
                    </h3>

                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-4 text-center">

                            <img
    src={product.imageUrl}
    alt={product.name}
    className="img-fluid rounded shadow"
    style={{
    width: "320px",
    height: "320px",
    objectFit: "cover",
    borderRadius:"15px"
}}
    onError={(e)=>{
        e.target.src="https://via.placeholder.com/250";
    }}
/>

                        </div>

                        <div className="col-md-8">

                            <table className="table table-bordered">

                                <tbody>

                                    <tr>
                                        <th width="180">ID</th>
                                        <td>{product.id}</td>
                                    </tr>

                                    <tr>
                                        <th>Name</th>
                                        <td>{product.name}</td>
                                    </tr>

                                    <tr>
                                        <th>Description</th>
                                        <td>{product.description}</td>
                                    </tr>

                                    <tr>
                                        <th>Category</th>
                                        <td>
    {product.category?.name || "No Category"}
</td>
                                    </tr>

                                    <tr>
                                        <th>Price</th>
                                        <td>₹{product.price}</td>
                                    </tr>
                                    <tr>
    <th>Image URL</th>
    <td>
        <a 
          href={product.imageUrl}
          target="_blank"
          rel="noreferrer"
        >
          View Image URL
        </a>
    </td>
</tr>

                                </tbody>

                            </table>

                            <button
                                className="btn btn-secondary"
                                onClick={() => navigate("/admin/products")}
                            >
                                Back
                            </button>
                            <button
    className="btn btn-primary ms-2"
    onClick={() =>
        navigate(`/admin/edit-product/${product.id}`)
    }
>
    Edit Product
</button>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>

    );
}