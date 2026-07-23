import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { getProducts, deleteProduct } from "../../services/productService";


export default function Products() {

const navigate = useNavigate();

const [products,setProducts] = useState([]);
const [filteredProducts,setFilteredProducts] = useState([]);
const [search,setSearch] = useState("");
const [loading,setLoading] = useState(true);



useEffect(()=>{

loadProducts();

},[]);



const loadProducts = async()=>{

try{

setLoading(true);

const response = await getProducts();

console.log("ADMIN PRODUCTS:",response);


setProducts(response);
setFilteredProducts(response);


}
catch(error){

console.log(error);
alert("Unable to load products");

}
finally{

setLoading(false);

}

};



const handleDelete = async(id)=>{


if(!window.confirm("Delete product?"))
return;


try{

await deleteProduct(id);

alert("Deleted Successfully");

loadProducts();

}
catch(error){

console.log(error);

}

};




useEffect(()=>{


const result = products.filter(product=>

product.name
?.toLowerCase()
.includes(search.toLowerCase())

);


setFilteredProducts(result);


},[search,products]);




return (

<AdminLayout>


<div className="d-flex justify-content-between mb-4">

<h2 className="fw-bold">
Products
</h2>


<button

className="btn btn-warning"

onClick={()=>navigate("/admin/add-product")}

>

Add Product

</button>


</div>



<div className="card shadow">

<div className="card-body">


<input

className="form-control mb-3"

placeholder="Search Product"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>




{
loading ?

<div className="text-center">

Loading...

</div>


:


<table className="table">


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

filteredProducts.map(product=>(


<tr key={product.id}>


<td>
{product.id}
</td>


<td>

<img

src={product.imageUrl}

width="70"

height="70"

style={{objectFit:"cover"}}

/>

</td>


<td>
{product.name}
</td>



<td>

{
product.category?.name || "No Category"
}

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