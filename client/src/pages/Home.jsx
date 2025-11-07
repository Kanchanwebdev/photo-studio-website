// client/src/pages/Home.jsx
import React, { useRef, useEffect } from "react";
import "../styles.css";
import { Link } from "react-router-dom";

/* Video card that plays when >=50% visible */
{/*function VideoCard({ video }) {
  const vidRef = useRef(null);

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // try to play (muted)
            v.play().catch(() => {});
          } else {
            v.pause();
            v.currentTime = 0;
          }
        });
      },
      { threshold: 0.5 }
    );

    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="video-card" data-aos="fade-up">
      <video
        ref={vidRef}
        className="home-video"
        src={video.src}
        poster={video.poster}
        muted
        playsInline
        preload="metadata"
        controls
      >
        <source src={video.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <figcaption className="video-caption">{video.title}</figcaption>
    </figure>
  );
}*/}

export default function Home() {
  {/*const videos = [
    {
      id: "wedding",
      src: "/videos/wedding-reel.mp4",
      poster: "/thumbnails/wedding-thumb.jpg",
      title: "Wedding Reel",
    },
    {
      id: "wedding",
      src: "/videos/wedding-reel2.mp4",
      poster: "/thumbnails/wedding-thumb.jpg",
      title: "Wedding Reel",
    },
    {
      id: "prewedding",
      src: "/videos/prewedding-reel.mp4",
      poster: "/thumbnails/prewedding-thumb.jpg",
      title: "Pre-Wedding Reel",
    },
  ];*/}

  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <h1 data-aos="fade-up">❤️Capturing Memories☆<br/>Forever</h1>
          <p className="hero-subtext" data-aos="fade-up" data-aos-delay="100">
            Wedding · Pre-wedding · Engagement · Candid · Videography · Drone · Premium Albums
          </p>
        </div>
      </div>

      {/* ===== Animated Video Strip (after hero) ===== 
      <section className="video-strip-section">
        <h2 className="section-title" data-aos="fade-up">Reels & Highlights</h2>
        <p className="section-sub" data-aos="fade-up" data-aos-delay="100">
          Short reels — quick look at our best moments
        </p>

        <div className="video-strip" data-aos="fade-up" data-aos-delay="150">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </section>*/}

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
          <Link to="/gallery" className="btn-secondary">View Full Gallery →</Link>
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
        <p>👉🏼Package Details:- Basic-50000, Primium-100000, Luxury-150000.</p>
        <div className="service-cards">
          <div className="service-card" data-aos="flip-left">
            <h3>Wedding Photography Album</h3>
            <p>Wedding covreage with best photo book Album quality.</p>
            <p className="price">₹50,000 onwards</p>
          </div>

          <div className="service-card" data-aos="flip-left" data-aos-delay="100">
            <h3>Pre-Wedding Shoots</h3>
            <p>Creative pre-wedding concepts tailored for you.</p>
            <p className="price">₹25,000 onwards</p>
          </div>

          <div className="service-card" data-aos="flip-left" data-aos-delay="200">
            <h3>Cinematic Films</h3>
            <p>Storytelling through moments and emotions.</p>
            <p className="price">₹20,000 onwards</p>
          </div>
        </div>
      </section>
    </div>
  );
}
