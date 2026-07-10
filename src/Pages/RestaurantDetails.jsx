import { useParams } from "react-router-dom";

const restaurants = [
  {
    id: 1,
    name: "Pizza Hut",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      
    rating: 4.5,
    time: "30 mins",
    address: "Madhapur, Hyderabad",
    cuisine: "Italian • Pizza",
     menu: [
  {
    id: 101,
    name: "Margherita Pizza",
    price: 299,
    rating: 4.6,
    veg: true,
    bestSeller: true,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    id: 102,
    name: "Veg Supreme",
    price: 399,
    rating: 4.7,
    veg: true,
    bestSeller: false,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    id: 103,
    name: "Garlic Bread",
    price: 149,
    rating: 4.5,
    veg: true,
    bestSeller: true,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
  },
  {
    id: 104,
    name: "Chicken Pizza",
    price: 499,
    rating: 4.8,
    veg: false,
    bestSeller: true,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    id: 105,
    name: "Pepsi",
    price: 60,
    rating: 4.4,
    veg: true,
    bestSeller: false,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97",
  },
],
  },

  {
    id: 2,
    name: "Burger King",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    rating: 4.4,
    time: "25 mins",
    address: "Kukatpally, Hyderabad",
    cuisine: "Burger • Fast Food",
    menu: [
  {
    id: 201,
    name: "Whopper",
    price: 249,
    rating: 4.7,
    veg: false,
    bestSeller: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: 202,
    name: "Chicken Burger",
    price: 199,
    rating: 4.6,
    veg: false,
    bestSeller: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: 203,
    name: "Veg Burger",
    price: 179,
    rating: 4.5,
    veg: true,
    bestSeller: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: 204,
    name: "French Fries",
    price: 119,
    rating: 4.4,
    veg: true,
    bestSeller: true,
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f",
  },
  {
    id: 205,
    name: "Coke",
    price: 60,
    rating: 4.3,
    veg: true,
    bestSeller: false,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97",
  },
],
  },

  {
    id: 3,
    name: "Biryani House",
    image:
      "https://images.unsplash.com/photo-1701579231346-fbf4a50f0df3",
    rating: 4.8,
    time: "35 mins",
    address: "Hitech City, Hyderabad",
    cuisine: "Indian • Biryani",
    menu: [
  {
    id: 301,
    name: "Chicken Biryani",
    price: 299,
    rating: 4.8,
    veg: false,
    bestSeller: true,
    image: "https://images.unsplash.com/photo-1701579231346-fbf4a50f0df3",
  },
  {
    id: 302,
    name: "Mutton Biryani",
    price: 399,
    rating: 4.9,
    veg: false,
    bestSeller: true,
    image: "https://images.unsplash.com/photo-1701579231346-fbf4a50f0df3",
  },
  {
    id: 303,
    name: "Veg Biryani",
    price: 249,
    rating: 4.5,
    veg: true,
    bestSeller: false,
    image: "https://images.unsplash.com/photo-1701579231346-fbf4a50f0df3",
  },
  {
    id: 304,
    name: "Double Ka Meetha",
    price: 99,
    rating: 4.4,
    veg: true,
    bestSeller: true,
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
  },
  {
    id: 305,
    name: "Soft Drink",
    price: 50,
    rating: 4.3,
    veg: true,
    bestSeller: false,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97",
  },
],
  },
];

export default function RestaurantDetails() {
  const { id } = useParams();

  const restaurant = restaurants.find(
    (item) => item.id === Number(id)
  );

  if (!restaurant) {
    return (
      <div className="container mt-5">
        <h2>Restaurant Not Found</h2>
      </div>
    );
  }

  // ==========================
  // Add Menu Item To Cart
  // ==========================
  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    // Refresh Navbar Count
    window.dispatchEvent(new Event("storage"));

    alert(`${item.name} added to cart 🛒`);
  };

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-lg">

        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="card-img-top"
          style={{
            height: "420px",
            objectFit: "cover",
          }}
        />

        <div className="card-body p-4">

          <h2 className="fw-bold">
            {restaurant.name}
          </h2>

          <p className="text-muted fs-5">
            {restaurant.cuisine}
          </p>

          <div className="row text-center my-4">

            <div className="col-md-4">
              ⭐ <strong>{restaurant.rating}</strong>
            </div>

            <div className="col-md-4">
              🚚 {restaurant.time}
            </div>

            <div className="col-md-4">
              📍 {restaurant.address}
            </div>

          </div>

          <hr />

          <h3 className="mb-4">
            🍽 Menu
          </h3>

          {restaurant.menu.map((item) => (
  <div
    key={item.id}
    className="card mb-3 border-0 shadow-sm"
  >
    <div className="card-body">

      <div className="row align-items-center">

        {/* Food Details */}
        <div className="col-md-8">

          <h5 className="fw-bold">
            {item.name}
          </h5>

          <p className="text-success fw-bold mb-2">
            ₹{item.price}
          </p>

          <p className="mb-2">
            ⭐ {item.rating}

            {item.bestSeller && (
              <span className="badge bg-danger ms-2">
                🔥 Best Seller
              </span>
            )}
          </p>

          {item.veg ? (
            <span className="badge bg-success">
              🟢 Veg
            </span>
          ) : (
            <span className="badge bg-danger">
              🔴 Non-Veg
            </span>
          )}

        </div>

        {/* Food Image */}
        <div className="col-md-4 position-relative text-center">

          <img
            src={item.image}
            alt={item.name}
            className="img-fluid rounded shadow"
            style={{
              height: "120px",
              width: "160px",
              objectFit: "cover",
            }}
          />

          <button
            className="btn btn-success shadow position-absolute"
            style={{
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100px",
              fontWeight: "bold",
            }}
            onClick={() => addToCart(item)}
          >
            ADD
          </button>

        </div>

      </div>

    </div>
  </div>
))}

        </div>

      </div>
    </div>
  );
}