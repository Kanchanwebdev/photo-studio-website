import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token } = res.data;

      // Save token for protected routes
      localStorage.setItem("token", token);

      setMessage("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/admin"), 1000);
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setMessage("❌ Invalid credentials");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="section-title">Admin Login</h2>
      <p className="text-center mb-4">Login to manage services.</p>

      {message && <p className="text-center">{message}</p>}

      <form onSubmit={handleLogin} className="card">
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}
