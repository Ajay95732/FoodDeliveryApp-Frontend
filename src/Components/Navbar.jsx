import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

useEffect(() => {
  const updateCounts = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setCartCount(cart.length);
    setWishlistCount(wishlist.length);
  };

  updateCounts();

  window.addEventListener("storage", updateCounts);
  window.addEventListener("cartUpdated", updateCounts);
  window.addEventListener("wishlistUpdated", updateCounts);

  return () => {
    window.removeEventListener("storage", updateCounts);
    window.removeEventListener("cartUpdated", updateCounts);
    window.removeEventListener("wishlistUpdated", updateCounts);
  };
}, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{ backgroundColor: "#fc8019" }}
    >
      <div className="container">

        <Link
          className="navbar-brand fw-bold fs-3"
          to="/"
        >
          🍔 FoodExpress
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="nav"
        >
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                🏠 Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/products"
              >
                🍽 Foods
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/wishlist"
              >
                ❤️ Wishlist ({wishlistCount})
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/cart"
              >
                🛒 Cart ({cartCount})
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/orders"
              >
                📦 Orders
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/login"
              >
                Login
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}