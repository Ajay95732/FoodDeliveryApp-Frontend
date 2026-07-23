import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser({
        name,
        email,
        password,
      });

      if (response.ok) {
        alert("Account Created Successfully 🎉");

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        navigate("/login");
      } else {
        const error = await response.text();
        alert(error || "Signup Failed");
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

          <h1 className="fw-bold text-warning">
🍔 FoodExpress
</h1>

          <p className="text-muted fs-5 mb-4">
            Create your account and enjoy delicious food delivered to your doorstep.
          </p>

          <div
            className="card border-0 shadow-lg p-4"
            style={{
              maxWidth: "450px",
              borderRadius: "18px",
            }}
          >
            <h3 className="fw-bold">

Create Account

</h3>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Full Name"
              style={{ height: "55px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email Address"
              style={{ height: "55px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              style={{ height: "55px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-4"
              placeholder="Confirm Password"
              style={{ height: "55px" }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              className="btn text-white fw-bold"
              style={{
                background: "#fc8019",
                height: "55px",
                fontSize: "18px",
              }}
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "CREATE ACCOUNT"}
            </button>

            <p className="text-center mt-4 mb-0">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-decoration-none fw-bold"
                style={{ color: "#fc8019" }}
              >
                Login
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
            style={{
              maxWidth: "80%",
            }}
          />
        </div>

      </div>
    </div>
  );
}