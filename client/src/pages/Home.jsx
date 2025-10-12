import React from "react";
import "../styles.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
     <div className="hero">
  <div className="hero-content">
    <h1 data-aos="fade-up">❤️Capturing Memories☆<br/>Forever</h1>
<p className="hero-subtext" data-aos="fade-up" data-aos-delay="100">
  Wedding · Pre-wedding · Candid · Videography · Drone · Premium Albums
</p>
<a href="/booking" className="btn-hero" data-aos="zoom-in" data-aos-delay="200">
  Book Your Shoot
</a>

  </div>
</div>


{/* 🖼 GALLERY PREVIEW SECTION */}
      <section className="home-gallery-preview">
        <h2 data-aos="fade-up">Portfolio & Gallery</h2>
        <p className="home-gallery-subtext" data-aos="fade-up" data-aos-delay="100">
          A glimpse of our most loved wedding & pre-wedding moments 💞
        </p>

        <div className="home-gallery-grid" data-aos="zoom-in">
          <img src="/gallery/wedding/img6.webp" alt="Wedding" />
          <img src="/gallery/wedding/img7.webp" alt="Wedding" />
          <img src="/gallery/wedding/img5.webp" alt="Wedding" />
          <img src="/gallery/wedding/img4.jpg" alt="Wedding" />
          <img src="/gallery/prewedding/img1.jpg" alt="Prewedding" />
          <img src="/gallery/wedding/img10.webp" alt="Wedding" />
          <img src="/gallery/Baby Shoot/img1.JPG" alt="Baby Shoot" />
        </div>

        <div className="home-gallery-btn" data-aos="zoom-in" data-aos-delay="200">
          <Link to="/gallery" className="btn-secondary">
            View Full Gallery →
          </Link>
        </div>
      </section>


      {/* About Preview */}
      <section className="about-section">
        <h2 data-aos="fade-up">Meet Your Photographer</h2>
<div className="about-wrapper">
  <div className="about-text" data-aos="fade-right">

            <p>
              Hi, I’m <strong>Salman Bargir</strong> — a passionate storyteller
              behind the lens. With years of experience in weddings, pre-weddings,
              candid and cinematic shoots, I capture emotions that last a lifetime.
            </p>
            <ul>
              <li>💍 Wedding & Pre-wedding Specialist</li>
              <li>📸 Creative Candid & Cinematic Films</li>
              <li>⚡ Fast Delivery of Albums & Videos</li>
            </ul>
          </div>
          <div className="about-photo" data-aos="fade-left">
  <img src="/Salman Bargir.JPG" alt="Photographer" />
</div>

        </div>
      </section>

      {/* Services Preview */}
      <section className="services-preview">
        <h2 data-aos="fade-up">Our Services📷</h2>

<div className="service-cards">
  <div className="service-card" data-aos="flip-left">
    <h3>Wedding Photography</h3>
    <p>Timeless wedding coverage with cinematic quality.</p>
    <p className="price">₹25,000 onwards</p>
  </div>

  <div className="service-card" data-aos="flip-left" data-aos-delay="100">
    <h3>Pre-Wedding Shoots</h3>
    <p>Creative pre-wedding concepts tailored for you.</p>
    <p className="price">₹15,000 onwards</p>
  </div>

  <div className="service-card" data-aos="flip-left" data-aos-delay="200">
    <h3>Candid & Cinematic Films</h3>
    <p>Storytelling through moments and emotions.</p>
    <p className="price">₹30,000 onwards</p>
  </div>
</div>

        <Link to="/services" className="btn-secondary">
          Explore More
        </Link>
      </section>
    </div>
  );
}
