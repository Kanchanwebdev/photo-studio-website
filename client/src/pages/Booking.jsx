import React, { useState } from "react";
import api from "../api";
import "../styles.css"; // or "./Booking.css"

export default function Booking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "Wedding",
    date: "",
    venue: "",
    budget: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      await api.post("/bookings", { ...form, service: form.eventType });
      setStatus("✅ Booking submitted successfully!");
      setForm({
        name: "",
        phone: "",
        email: "",
        eventType: "Wedding",
        date: "",
        venue: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      setStatus("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <section className="booking-section">
      <h2>Booking</h2>
      <p className="subtitle">
        Fill in the form below and we’ll get in touch to confirm your session or event.
      </p>

      <div className="booking-form">
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 2 */}
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Event Type</label>
            <select
              name="eventType"
              value={form.eventType}
              onChange={handleChange}
            >
              <option>Wedding</option>
              <option>Pre-Wedding</option>
              <option>Candid</option>
              <option>Engagement</option>
              <option>Birthday</option>
            </select>
          </div>

          {/* Row 3 */}
          <div>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Venue</label>
            <input
              type="text"
              name="venue"
              value={form.venue}
              onChange={handleChange}
            />
          </div>

          {/* Row 4 */}
          <div>
            <label>Budget (₹)</label>
            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Any special requests or details?"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit Booking</button>
        </form>

        {status && <p className="booking-status">{status}</p>}
      </div>
    </section>
  );
}
