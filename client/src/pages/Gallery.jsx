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
        setGroups(m);
        setFlat(Object.values(m).flat());
        setActiveTab(Object.keys(m)[0]); // default tab
      })
      .catch(() => {
        setGroups({});
        setFlat([]);
      });
  }, []);

  const next = useCallback(
    () => setOpen((i) => (i + 1) % flat.length),
    [flat]
  );
  const prev = useCallback(
    () => setOpen((i) => (i - 1 + flat.length) % flat.length),
    [flat]
  );

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
      </div>

      {/* Images Grid */}
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
  <img src="/logo.jpg" alt="S.Arts Studio"/>
</div>

    </div>
  ))}
</div>



      {/* Lightbox */}
      {open >= 0 && (
        <div className="lightbox-backdrop" onClick={() => setOpen(-1)}>
          <button className="lightbox-close" onClick={() => setOpen(-1)}>✖</button>
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>
          <img className="lightbox-img" src={groups[activeTab][open]} alt="" />
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); next(); }}>›</button>
        </div>
      )}
    </div>
  );
}
