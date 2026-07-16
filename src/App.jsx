import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import RestaurantDetails from "./pages/RestaurantDetails";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import ProductsAdmin from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import AddCategory from "./pages/admin/AddCategory";
import AddUser from "./pages/admin/AddUser";
import AdminPage from "./pages/admin/AdminPage";
import AdminOrders from "./pages/admin/Orders";
import ViewUser from "./pages/admin/ViewUser";
import ViewProduct from "./pages/admin/ViewProduct";
import EditUser from "./pages/admin/EditUser";

function AppContent() {
    const location = useLocation();

    const isAdminPage = location.pathname.startsWith("/admin");

    return (
        <>
            {!isAdminPage && <Navbar />}

            <Routes>
                {/* Customer Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />

                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/profile" element={<Profile />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/products" element={<ProductsAdmin />} />
                <Route path="/admin/add-product" element={<AddProduct />} />
                <Route path="/admin/edit-product/:id" element={<AddProduct />} />
                <Route path="/admin/add-category" element={<AddCategory />} />
                <Route path="/admin/view-user/:id" element={<ViewUser />} />
                <Route path="/admin/edit-user/:id" element={<EditUser />} />
                <Route
    path="/admin/view-product/:id"
    element={<ViewProduct />}
/>

                <Route path="/admin/orders" element={<AdminOrders />} />

                <Route path="/admin/users" element={<AdminPage page="users" />} />
                <Route path="/admin/add-user" element={<AddUser />} />

                <Route
                    path="/admin/categories"
                    element={<AdminPage page="categories" />}
                />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>

            {!isAdminPage && <Footer />}
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;