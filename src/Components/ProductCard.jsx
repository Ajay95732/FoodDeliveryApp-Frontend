import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product) return null;

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Refresh Navbar Count
    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${product.name} added to Cart 🛒`);
  };

  const addToWishlist = () => {
    let wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (exists) {
      alert("Already in Wishlist ❤️");
      return;
    }

    wishlist.push(product);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

    // Refresh Navbar Count
    window.dispatchEvent(new Event("wishlistUpdated"));

    alert(`${product.name} added to Wishlist ❤️`);
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div
        className="card border-0 shadow-sm h-100"
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}
      >
        <Link
          to={`/product/${product.id}`}
          className="text-decoration-none text-dark"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="card-img-top"
            style={{
              height: "220px",
              objectFit: "cover",
            }}
          />

          <div className="card-body">
            <h5 className="fw-bold">
              {product.name}
            </h5>

            <p className="text-muted mb-2">
              {product.category}
            </p>

            <p
              className="text-muted"
              style={{
                fontSize: "14px",
                minHeight: "45px",
              }}
            >
              {product.description}
            </p>

            <h5 className="text-success fw-bold">
              ₹{product.price}
            </h5>
          </div>
        </Link>

        <div className="card-footer bg-white border-0">
          <div className="d-flex gap-2">
            <button
              className="btn btn-success flex-fill"
              onClick={addToCart}
            >
              Add
            </button>

            <button
              className="btn btn-outline-danger"
              onClick={addToWishlist}
            >
              ❤️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}