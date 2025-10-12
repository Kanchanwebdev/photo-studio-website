import React from "react";
import "../styles.css"; // or "./About.css" if separated

export default function About() {
  return (
    <section className="about-section">
      <h2>Our Story</h2>
      <p className="intro-text">
        We are storytellers with a passion for authentic, timeless imagery.
        From intimate candids to cinematic films—every frame is crafted with
        emotion and care, turning your moments into memories that last forever.
      </p>

      <div className="about-content">
        {/* Left Column: Why Choose Us */}
        <div className="about-text">
          <h3>Why Choose Us</h3>
          <ul>
            <li>Experienced wedding & pre-wedding photography team</li>
            <li>Drone & cinematic videography</li>
            <li>Luxury albums with premium editing</li>
            <li>Fast delivery with professional results</li>
          </ul>
        </div>

        {/* Right Column: Map */}
        <div className="map-container">
          <h3>Find Us</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.399189656843!2d74.2310!3d16.7005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1006cf9d2f9a5%3A0x2f7dd6b3a0d046c9!2sKolhapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            title="S.Arts Photo Studio Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
