import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on link click (mobile UX)
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <div className="navbar-left desktop-only">
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <div className="navbar-center">
          <div className="logo-main">
            <span className="logo-bold">Prompt</span>
            <span className="logo-thin">Crafted</span>
          </div>
        </div>
        <div className="navbar-right desktop-only">
          <a href="#contact" className="contact-btn">
            Contact <span className="arrow">►</span>
          </a>
        </div>
        {/* Hamburger icon for mobile */}
        <button
          className={`hamburger-btn mobile-only${menuOpen ? " open" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
        {/* Mobile menu */}
        <div className={`mobile-menu mobile-only${menuOpen ? " show" : ""}`}>
          <a href="#projects" className="nav-link" onClick={handleLinkClick}>Projects</a>
          <a href="#services" className="nav-link" onClick={handleLinkClick}>Services</a>
          <a href="#testimonials" className="nav-link" onClick={handleLinkClick}>Testimonials</a>
          <a href="#contact" className="nav-link" onClick={handleLinkClick}>Contact</a>
          <a href="#contact" className="contact-btn" onClick={handleLinkClick}>
            Contact <span className="arrow">►</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
