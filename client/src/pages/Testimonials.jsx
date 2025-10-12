import React, { useEffect, useState } from "react";
import api from "../api";
import Slider from "react-slick";
import { Star } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles.css"; // or "./Testimonials.css"


export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: "", message: "", rating: 5 });
  const [status, setStatus] = useState("");

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
      await api.post("/testimonials", form);
      setStatus("✅ Thank you for your feedback!");
      setForm({ name: "", message: "", rating: 5 });
      fetchTestimonials();
    } catch {
      setStatus("❌ Something went wrong. Please try again.");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }],
  };

  return (
    <section className="testimonials-section">
      <h2 data-aos="fade-up" className="text-4xl font-serif text-[#c5a349]">
  💬 Client Testimonials
</h2>

      <p className="subtitle">
        Hear what our clients have to say about their special moments 💖
      </p>

      <form onSubmit={handleSubmit} className="testimonial-form">
        <h3>Leave a Review ✍️</h3>
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Write your review..."
          rows="4"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        ></textarea>
        <label>Rating:</label>
        <select
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
        >
          <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
          <option value="4">⭐⭐⭐⭐ (Good)</option>
          <option value="3">⭐⭐⭐ (Average)</option>
          <option value="2">⭐⭐ (Poor)</option>
          <option value="1">⭐ (Very Poor)</option>
        </select>
        <button type="submit">Submit Review</button>
        {status && <p className="status-message">{status}</p>}
      </form>

      {testimonials.length > 0 && (
        <div className="testimonials-slider">
          <Slider {...settings}>
            {testimonials.map((t, i) => (
              <div key={i}>
                <div className="testimonial-card">
                  <p className="message">“{t.message}”</p>
                  <div className="stars">
                    {[...Array(Number(t.rating) || 5)].map((_, i) => (
                      <Star key={i} size={18} className="fill-[#c5a349]" />
                    ))}
                  </div>
                  <p className="name">— {t.name}</p>
                  <p className="date">
                    {new Date(t.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </section>
  );
}
