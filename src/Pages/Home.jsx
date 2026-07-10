import { Link } from "react-router-dom";

const categories = [
  { emoji: "🍕", name: "Pizza" },
  { emoji: "🍔", name: "Burger" },
  { emoji: "🍗", name: "Chicken" },
  { emoji: "🍛", name: "Biryani" },
  { emoji: "🍜", name: "Noodles" },
  { emoji: "🥤", name: "Drinks" },
];

const restaurants = [
  {
    id: 1,
    name: "Pizza Hut",
    cuisine: "Pizza • Italian",
    rating: "4.5",
    time: "30 mins",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    id: 2,
    name: "Burger King",
    cuisine: "Burger • Fast Food",
    rating: "4.4",
    time: "25 mins",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: 3,
    name: "Biryani House",
    cuisine: "Indian • Biryani",
    rating: "4.8",
    time: "35 mins",
    image:
      "https://images.unsplash.com/photo-1701579231346-fbf4a50f0df3",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="text-white py-5"
        style={{
          background: "linear-gradient(to right,#fc8019,#ff9f43)",
        }}
      >
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6">
              <h1 className="display-3 fw-bold">
                Hungry?
              </h1>

              <p className="lead mt-3">
                Order your favorite food from the best restaurants near you.
              </p>

              <Link
                to="/products"
                className="btn btn-light btn-lg mt-3 px-4"
              >
                🍔 Order Now
              </Link>
            </div>

            <div className="col-lg-6 text-center mt-4 mt-lg-0">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                alt="Food"
                className="img-fluid rounded shadow"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-5">

        <h2 className="text-center fw-bold mb-5">
          🍽 Popular Categories
        </h2>

        <div className="row">
          {categories.map((item, index) => (
            <div
              className="col-lg-2 col-md-4 col-6 mb-4"
              key={index}
            >
              <div
                className="card border-0 shadow-sm text-center h-100"
                style={{
                  borderRadius: "20px",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                <div className="card-body">

                  <h1 style={{ fontSize: "50px" }}>
                    {item.emoji}
                  </h1>

                  <h5>{item.name}</h5>

                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Offer Banner */}
      <section
        className="py-5 text-white"
        style={{ background: "#fc8019" }}
      >
        <div className="container">
          <div className="row text-center">

            <div className="col-md-4">
              <h2>🎉 50% OFF</h2>
              <p>Use Code : FOOD50</p>
            </div>

            <div className="col-md-4">
              <h2>🚚 Free Delivery</h2>
              <p>Above ₹299</p>
            </div>

            <div className="col-md-4">
              <h2>🎁 First Order</h2>
              <p>Get ₹100 OFF</p>
            </div>

          </div>
        </div>
      </section>

      {/* Popular Restaurants */}
<section className="container py-5">

  <h2 className="text-center fw-bold mb-5">
    ⭐ Popular Restaurants
  </h2>

  <div className="row">

    {restaurants.map((restaurant) => (

      <div
        className="col-lg-4 col-md-6 mb-4"
        key={restaurant.id}
      >

        <Link
          to={`/restaurant/${restaurant.id}`}
          className="text-decoration-none text-dark"
        >

          <div className="card border-0 shadow h-100">

            <img
              src={restaurant.image}
              className="card-img-top"
              alt={restaurant.name}
              style={{
                height: "220px",
                objectFit: "cover",
              }}
            />

            <div className="card-body">

              <h5 className="fw-bold">
                {restaurant.name}
              </h5>

              <p className="text-muted">
                {restaurant.cuisine}
              </p>

              <div className="d-flex justify-content-between">

                <span className="badge bg-success">
                  ⭐ {restaurant.rating}
                </span>

                <span>
                  ⏱ {restaurant.time}
                </span>

              </div>

            </div>

          </div>

        </Link>

      </div>

    ))}

  </div>

</section>
      {/* Call To Action */}
      <section className="bg-dark text-white py-5">

        <div className="container text-center">

          <h2 className="fw-bold">
            Ready to Order?
          </h2>

          <p className="lead">
            Discover hundreds of delicious meals and enjoy fast delivery.
          </p>

          <Link
            to="/products"
            className="btn btn-warning btn-lg"
          >
            Explore Menu 🍽
          </Link>

        </div>

      </section>
    </>
  );
}