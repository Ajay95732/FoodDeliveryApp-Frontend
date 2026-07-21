import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

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

setFoods(response.data);
setFilteredFoods(response.data);
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
      <h2 className="text-center fw-bold mb-4">
        🍽 Discover Delicious Foods
      </h2>

      {/* Search */}
      <div className="row justify-content-center mb-4">
        <div className="col-lg-6">
          <input
            type="text"
            className="form-control form-control-lg rounded-pill shadow-sm"
            placeholder="🔍 Search your favorite food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="text-center mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn m-1 ${
              selectedCategory === category
                ? "btn-warning text-white"
                : "btn-outline-warning"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
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