import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [message, setMessage] = useState("");

  // ✅ Get token from localStorage
  const token = localStorage.getItem("token");

  // ✅ Protect route - redirect to login if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/admin-login");
    }
  }, [token, navigate]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE || "https://photo-studio-api-8w4k.onrender.com/api"}/services/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Service added successfully!");
        setForm({
          name: "",
          description: "",
          price: "",
          category: "",
          image: "",
        });
      } else {
        setMessage(`❌ ${data.message || "Failed to add service"}`);
      }
    } catch (err) {
      console.error("Error adding service:", err);
      setMessage("⚠️ Server error. Please try again.");
    }
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  // ✅ Optional: Auto logout after 1 hour
  useEffect(() => {
    const loginTime = localStorage.getItem("loginTime");
    if (loginTime && Date.now() - loginTime > 3600000) {
      localStorage.removeItem("token");
      localStorage.removeItem("loginTime");
      alert("Session expired. Please log in again.");
      navigate("/admin-login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex flex-col items-center py-10 px-4">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full sm:w-[500px] border border-pink-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm font-medium transition"
            onClick={handleLogout}
          >
            🔒 Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Service Name"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-300 outline-none"
            required
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category (e.g. Wedding, Pre-wedding)"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-300 outline-none"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Service Description"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-300 outline-none"
            rows="3"
            required
          />
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price (e.g. ₹10,000)"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-300 outline-none"
            required
          />
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-300 outline-none"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-pink-400 to-rose-500 text-white py-2 rounded-lg hover:opacity-90 transition font-medium"
          >
            Add Service
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
