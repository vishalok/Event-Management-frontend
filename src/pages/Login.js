import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle regular login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("isGuest", data.isGuest); // Store if the user is a guest
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data.message || "Login failed");
    }
  };

  // Handle guest login
  const handleGuestLogin = async () => {
    try {
      const guestCredentials = {
        email: "guest@example.com", // Ensure these credentials exist in your backend
        password: "guest123",
      };
      const { data } = await API.post("/auth/login", guestCredentials);
      localStorage.setItem("token", data.token);
      localStorage.setItem("isGuest", true); // Indicate guest login

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data.message || "Guest login failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <br />
      <button onClick={handleGuestLogin} className="guest-login-btn">
        Guest Login
      </button>
    </div>
  );
};

export default Login;
