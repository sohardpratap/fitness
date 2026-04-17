import { useState } from "react";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
        window.location.href = "/dashboard";
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-20">
        <div className="bg-white shadow-lg p-8 rounded-xl w-80">
          <h2 className="text-2xl mb-4">Login</h2>

          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white w-full py-2 rounded-lg"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
