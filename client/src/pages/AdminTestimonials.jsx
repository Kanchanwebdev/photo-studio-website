import React, { useEffect, useState } from "react";
import api from "../api";
import { Star, Trash2, Edit3, CheckCircle } from "lucide-react";
import "../styles.css";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: "", message: "", rating: 5 });
  const [status, setStatus] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get("/testimonials");
      setTestimonials(res.data);
    } catch (err) {
      console.error("Error loading testimonials:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/testimonials/${editId}`, form);
        setStatus("✅ Testimonial updated successfully!");
      } else {
        await api.post("/testimonials", form);
        setStatus("✅ Testimonial added successfully!");
      }
      setForm({ name: "", message: "", rating: 5 });
      setEditId(null);
      fetchTestimonials();
    } catch (err) {
      setStatus("❌ Something went wrong. Try again.");
    }
  };

  const handleEdit = (t) => {
    setForm({ name: t.name, message: t.message, rating: t.rating });
    setEditId(t._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?"))
      return;
    try {
      await api.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="admin-testimonials-page">
      <h2 className="admin-title">💬 Manage Testimonials</h2>

      {/* --- Add / Edit Form --- */}
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          placeholder="Client Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        ></textarea>

        <select
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
          required
        >
          <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
          <option value="4">⭐⭐⭐⭐ (Good)</option>
          <option value="3">⭐⭐⭐ (Average)</option>
          <option value="2">⭐⭐ (Poor)</option>
          <option value="1">⭐ (Very Poor)</option>
        </select>

        <button type="submit" className="submit-btn">
          {editId ? (
            <>
              <CheckCircle size={18} /> Update
            </>
          ) : (
            "Add"
          )}
        </button>
        {status && <p className="status">{status}</p>}
      </form>

      {/* --- Testimonials List --- */}
      <div className="admin-testimonial-grid">
        {testimonials.map((t) => (
          <div key={t._id} className="admin-testimonial-card">
            <p className="message">“{t.message}”</p>
            <p className="name">— {t.name}</p>

            <div className="stars">
              {[...Array(Number(t.rating) || 5)].map((_, i) => (
                <Star key={i} size={16} className="text-gold fill-gold" />
              ))}
            </div>

            <div className="button-row">
              <button className="edit-btn" onClick={() => handleEdit(t)}>
                <Edit3 size={15} /> Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(t._id)}
              >
                <Trash2 size={15} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
