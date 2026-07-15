import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter Email and Password.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      if (response.ok) {
        const data = await response.json();

        // Save User Details
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login Successful 🎉");

        // Redirect Based on Role
        if (data.user.role === "Admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }

      } else {
        const error = await response.text();
        alert(error || "Invalid Email or Password");
      }

    } catch (err) {
      console.error(err);
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "#fff",
      }}
    >
      <div className="row min-vh-100">

        {/* Left Side */}

        <div className="col-lg-6 d-flex flex-column justify-content-center px-5">

          <h1
            className="fw-bold mb-3"
            style={{
              color: "#fc8019",
              fontSize: "3rem",
            }}
          >
            Welcome Back 👋
          </h1>

          <p className="text-muted fs-5 mb-4">
            Login to continue ordering your favourite food.
          </p>

          <div
            className="card border-0 shadow-lg p-4"
            style={{
              maxWidth: "450px",
              borderRadius: "18px",
            }}
          >
            <h3 className="fw-bold mb-4">Login</h3>

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="btn text-white"
              style={{ background: "#fc8019" }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging In..." : "LOGIN"}
            </button>

            <p className="text-center mt-4">
              New to FoodExpress?{" "}
              <Link
                to="/signup"
                className="text-decoration-none fw-bold"
                style={{ color: "#fc8019" }}
              >
                Create an account
              </Link>
            </p>

          </div>

        </div>

        {/* Right Side */}

        <div
          className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center"
          style={{
            background: "#fff7f0",
          }}
        >
          <img
            src="https://ouch-cdn2.icons8.com/WsS_X0PdB0-v5OVS6M7R8cRj3jSkg2b4iEzD5V5QYwI/rs:fit:800:800/czM6Ly9pY29uczgvb3VjaC1pbWFnZXMvcHJldmlldy82NjIvYzI0NzY2ZWQtODhmMi00M2JkLTg0ZmQtNzM5ODQ1YjRhYzM0LnBuZw.png"
            alt="Food Delivery"
            className="img-fluid"
          />
        </div>

      </div>
    </div>
  );
}