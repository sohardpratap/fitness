import { useState } from "react";
import Navbar from "../components/Navbar";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data._id) {
        alert("Signup successful");
        window.location.href = "/login";
      } else {
        alert(data.message || "Signup failed");
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
          <h2 className="text-2xl mb-4">Sign Up</h2>

          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            onClick={handleSignup}
            className="bg-blue-600 text-white w-full py-2 rounded-lg"
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
