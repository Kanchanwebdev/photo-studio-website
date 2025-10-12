import React, { useEffect, useState } from "react";
import api from "../api";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get("/services").then((res) => setServices(res.data));
  }, []);

  return (
    <section className="services-section">
      <h2>Services & Packages</h2>
      <p className="subtitle">
        Curated packages crafted for weddings, pre-weddings, candid moments and cinematic films.
      </p>
      <p className="subtitle">
        👉🏼Package Details:- Basic-50000, Primium-100000, Luxury-150000.
      </p>

      {services.map((s, index) => (
        <div key={index} className="service-card">
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          <p className="price">₹{s.price}</p>
        </div>
      ))}
    </section>
  );
}
