import React, { useEffect, useState, useCallback } from "react";
import "../styles.css";

export default function Gallery() {
  const [groups, setGroups] = useState({});
  const [flat, setFlat] = useState([]);
  const [open, setOpen] = useState(-1);
  const [activeTab, setActiveTab] = useState(""); // track active category

  useEffect(() => {
    fetch("/gallery/manifest.json")
      .then((r) => r.json())
      .then((m) => {
        setGroups(m || {});
        const flatArr = Object.values(m || {}).flat();
        setFlat(flatArr);
        const firstKey = Object.keys(m || {})[0] || "";
        setActiveTab(firstKey || "Videos"); // default to first or Videos
      })
      .catch(() => {
        setGroups({});
        setFlat([]);
        setActiveTab("Videos");
      });
  }, []);

  const next = useCallback(() => setOpen((i) => (i + 1) % flat.length), [flat]);
  const prev = useCallback(
    () => setOpen((i) => (i - 1 + flat.length) % flat.length),
    [flat]
  );

  // --- list of videos (local public folder paths) ---
  {/*const videos = [
    {
      id: "wedding",
      src: "/videos/wedding-reel.mp4",
      poster: "/thumbnails/wedding-thumb.jpg",
      title: "Wedding Reel",
    },
    {
      id: "prewedding",
      src: "/videos/prewedding-reel.mp4",
      poster: "/thumbnails/prewedding-thumb.jpg",
      title: "Pre-wedding Reel",
    },
    {
      id: "wedding",
      src: "/videos/wedding-reel2.mp4",
      poster: "/thumbnails/wedding-thumb.jpg",
      title: "Wedding Reel",
    },
  ];*/}

  return (
    <div className="container">
      <h2 className="section-title">Portfolio & Gallery</h2>

      {/* Tabs */}
      <div className="tabs">
        {Object.keys(groups).map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}

        {/* Videos tab 
        <button
          className={`tab-btn ${activeTab === "Videos" ? "active" : ""}`}
          onClick={() => setActiveTab("Videos")}
        >
          🎬 Videos
        </button>*/}
      </div>

      {/* Images Grid */}
      {activeTab !== "Videos" && (
        <div className="gallery-grid">
          {groups[activeTab]?.map((src, idx) => (
            <div key={src} className="gallery-grid-item" data-aos="zoom-in">
              <img
                src={src}
                alt={activeTab}
                className="gallery-photo"
                onClick={() => setOpen(idx)}
              />

              <div className="watermark">
                <img src="/logo.jpg" alt="S.Arts Studio" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Gallery 
      {activeTab === "Videos" && (
        <div id="videos" className="video-grid">
          {videos.map((v) => (
            <figure key={v.id} className="video-card" data-aos="fade-up">
              <video
                controls
                className="gallery-video"
                poster={v.poster}
                preload="metadata"
                playsInline
              >
                <source src={v.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <figcaption className="video-caption">{v.title}</figcaption>
            </figure>
          ))}
        </div>
      )}*/}

      {/* Lightbox (images only) */}
      {open >= 0 && (
        <div className="lightbox-backdrop" onClick={() => setOpen(-1)}>
          <button
            className="lightbox-close"
            onClick={() => setOpen(-1)}
            aria-label="Close"
          >
            ✖
          </button>
          <button
            className="lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
          >
            ‹
          </button>

          <img
            className="lightbox-img"
            src={groups[activeTab][open]}
            alt=""
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
