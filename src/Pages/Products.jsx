import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService"
export default function Products() {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        console.log("PRODUCT DATA:", response);

setFoods(response);
setFilteredFoods(response);
      } catch (err) {
        console.log("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Search & Category Filter
  useEffect(() => {
    let results = [...foods];

    // Search
    if (search.trim() !== "") {
      results = results.filter((food) =>
        food.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category Filter
    if (selectedCategory !== "All") {
      results = results.filter(
        (food) => food.category?.name === selectedCategory
      );
    }

    setFilteredFoods(results);
  }, [foods, search, selectedCategory]);

  // Dynamic Category List
  const categories = [
  "All",
  ...new Set(
    foods
      .filter(food => food.category)
      .map(food => food.category.name)
  ),
];

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h3>Loading Products...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* Heading */}
      <div className="text-center mb-5">

<h1 className="fw-bold">

Discover Your Favourite Food 🍔

</h1>


<p className="text-muted">

Fresh food delivered from top restaurants

</p>


</div>

      {/* Search */}
      <div className="row justify-content-center mb-4">
        <div className="col-lg-6">
          <div className="input-group shadow-sm">

<span className="input-group-text bg-white">

<i className="bi bi-search"></i>

</span>


<input

type="text"

className="
form-control
form-control-lg
border-start-0
"

placeholder="Search delicious food..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>


</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">


{
categories.map(category=>(


<button

key={category}

className={`
btn rounded-pill px-4

${
selectedCategory===category
?
"btn-warning"
:
"btn-outline-warning"
}

`}

onClick={()=>setSelectedCategory(category)}

>

{category}

</button>


))
}


</div>

      {/* Result Count */}
      <div className="text-center mb-4">
        <h5 className="text-secondary">
          🍴 Showing {filteredFoods.length} Products
        </h5>
      </div>

      {/* Product Cards */}
      <div className="row">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <ProductCard
              key={food.id}
              product={food}
            />
          ))
        ) : (
          <div className="text-center mt-5">
            <h4>No Products Found 😔</h4>
            <p>Try another search or category.</p>
          </div>
        )}
      </div>

    </div>
  );
}


 