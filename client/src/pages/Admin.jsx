import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container py-5 text-center">
      <h2 className="section-title mb-4">👋 Welcome, Admin!</h2>
      <p className="mb-5">
        Manage your photo studio easily from this dashboard.
      </p>

      {/* Management Buttons */}
      <div className="d-flex flex-column align-items-center gap-3">
        <Link
          to="/admin/services"
          className="btn btn-brand px-4 py-2"
          style={{ width: "250px", fontWeight: "bold" }}
        >
          📦 Manage Services
        </Link>

        <Link
          to="/admin/bookings"
          className="btn btn-secondary px-4 py-2"
          style={{ width: "250px", fontWeight: "bold", backgroundColor: "#444", color: "#fff" }}
        >
          🧾 View Bookings
        </Link>

        <Link
          to="/admin/testimonials"
          className="btn btn-outline-dark px-4 py-2"
          style={{ width: "250px", fontWeight: "bold" }}
        >
          💬 Manage Testimonials (Coming Soon)
        </Link>

        <button
          className="btn btn-danger px-4 py-2 mt-4"
          style={{ width: "250px", fontWeight: "bold" }}
          onClick={handleLogout}
        >
          🔒 Logout
        </button>
      </div>
    </div>
  );
}
