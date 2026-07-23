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
        window.dispatchEvent(
new Event("userChanged")
);

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
className="container-fluid min-vh-100"
style={{
background:"#FFF8F3"
}}
>


<div className="row min-vh-100 align-items-center">


{/* LEFT SECTION */}

<div className="col-lg-6">


<div className="px-5">


<h1
className="fw-bold mb-2"
style={{
color:"#FF4B2B",
fontSize:"45px"
}}
>

🍔 FoodExpress

</h1>


<h2 className="fw-bold">

Welcome Back 👋

</h2>


<p className="text-muted fs-5">

Order delicious food from your favourite restaurants.

</p>





<div
className="
card
border-0
shadow-lg
p-4
mt-4
"
style={{

maxWidth:"430px",

borderRadius:"25px"

}}
>



<h3
className="fw-bold mb-4"
>

Login

</h3>





<div className="mb-3">


<label className="fw-semibold">

Email

</label>


<input

type="email"

className="
form-control
rounded-pill
py-3
"

placeholder="Enter email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>


</div>







<div className="mb-4">


<label className="fw-semibold">

Password

</label>


<input

type="password"

className="
form-control
rounded-pill
py-3
"

placeholder="Enter password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>


</div>







<button

className="
btn
w-100
rounded-pill
py-3
fw-bold
text-white
"

style={{

background:"#FF4B2B"

}}

onClick={handleLogin}

disabled={loading}

>

{
loading
?
"Logging..."
:
"Login"
}

</button>







<p className="
text-center
mt-4
">


New customer?


<Link

to="/signup"

style={{

color:"#FF4B2B"

}}

className="
fw-bold
text-decoration-none
"

>

Create Account

</Link>


</p>





</div>


</div>


</div>









{/* RIGHT SECTION */}


<div
className="
col-lg-6
d-none
d-lg-flex
justify-content-center
align-items-center
"
>


<div
className="
text-center
"
>


<div
className="
rounded-circle
p-5
"
style={{

background:"#FFE3D9"

}}
>


<img

src="https://ouch-cdn2.icons8.com/WsS_X0PdB0-v5OVS6M7R8cRj3jSkg2b4iEzD5V5QYwI/rs:fit:800:800/czM6Ly9pY29uczgvb3VjaC1pbWFnZXMvcHJldmlldy82NjIvYzI0NzY2ZWQtODhmMi00M2JkLTg0ZmQtNzM5ODQ1YjRhYzM0LnBuZw.png"

className="img-fluid"

style={{
maxWidth:"400px"
}}


/>


</div>



<h2
className="fw-bold mt-4"
>

Food Delivered Fast 🚀

</h2>



<p className="text-muted fs-5">

Fresh meals at your doorstep

</p>


</div>


</div>



</div>


</div>

);
}