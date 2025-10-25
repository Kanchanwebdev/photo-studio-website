// redeploy trigger
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Gallery from "./pages/Gallery.jsx";
import About from "./pages/About.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import Booking from "./pages/Booking.jsx";
import Admin from "./pages/Admin.jsx";
import AdminBookings from "./pages/AdminBookings.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminServices from "./pages/AdminServices";
import AdminTestimonials from "./pages/AdminTestimonials";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
});





// Navbar
function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">S.Arts Photo Studio</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/gallery">Gallery</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
           {/* <li className="nav-item"><Link className="nav-link" to="/testimonials">Reviews</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/booking">Book Now</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
           <li className="nav-item"><Link className="nav-link" to="/admin/bookings">Bookings</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/admin/services">Admin Services</Link></li>*/}
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Left side */}
        <div className="text-center text-md-start mb-3 mb-md-0">
          <img src="/logo.png" alt="Logo" style={{ width: "60px", marginBottom: "10px" }} />
          <h6 className="mb-1">Salman Bargir Photography</h6>
          <small>“Capturing Memories Forever”</small><br />
          <small>595 C Ward, Azad Line, Aram Corner, Kolhapur 416002</small><br />
          <small>9850425203 · Salman.bargir77@gmail.com</small>
        </div>

        {/* Right side */}
        <div className="text-center text-md-end">
          <h6>Follow Us</h6>
          <a className="text-light me-3" href="https://www.instagram.com/salman_bargir77" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a className="text-light" href="https://www.facebook.com/share/14M2XMKWm2g/?mibextid=wwXIfr" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom mt-3 text-center">
        <small>© 2025 Salman Bargir Photography. All rights reserved.</small>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919850425203"
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </footer>
  );
}


// App
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/admin/testimonials" element={<AdminTestimonials />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/services" element={<AdminServices />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
