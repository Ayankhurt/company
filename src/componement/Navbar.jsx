import React, { useState, useEffect } from "react";
import "./navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarColor, setNavbarColor] = useState('light-bg'); // Default light background

  // Smooth scroll function
  const smoothScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setMenuOpen(false); // Close mobile menu after clicking
  };

  // Handle link clicks with smooth scrolling
  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };

  // Scroll detection to change navbar colors
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const navbarHeight = 120; // Approximate navbar height
      
      // Get actual section elements
      const heroSection = document.querySelector('.section-hero');
      const projectSection = document.getElementById('project');
      const servicesSection = document.getElementById('services');
      const testimonialsSection = document.getElementById('testimonials');
      const contactSection = document.getElementById('contact');
      const footerSection = document.querySelector('.footer');
      
      // Calculate section positions
      const getSectionPosition = (element) => {
        if (!element) return { top: 0, bottom: 0 };
        const rect = element.getBoundingClientRect();
        const top = rect.top + scrollY;
        const bottom = top + rect.height;
        return { top, bottom };
      };

      const heroPos = getSectionPosition(heroSection);
      const projectPos = getSectionPosition(projectSection);
      const servicesPos = getSectionPosition(servicesSection);
      const testimonialsPos = getSectionPosition(testimonialsSection);
      const contactPos = getSectionPosition(contactSection);
      const footerPos = getSectionPosition(footerSection);

      // Adjust scroll position for navbar offset
      const adjustedScrollY = scrollY + navbarHeight;

      // Determine which section we're currently viewing
      let currentColor = 'light-bg'; // Default

      if (adjustedScrollY >= heroPos.top && adjustedScrollY < heroPos.bottom) {
        currentColor = 'light-bg'; // Hero section - light background
      } else if (adjustedScrollY >= projectPos.top && adjustedScrollY < projectPos.bottom) {
        currentColor = 'light-bg'; // Projects section - light background
      } else if (adjustedScrollY >= servicesPos.top && adjustedScrollY < servicesPos.bottom) {
        currentColor = 'dark-bg'; // Services section - dark background
      } else if (adjustedScrollY >= testimonialsPos.top && adjustedScrollY < testimonialsPos.bottom) {
        currentColor = 'light-bg'; // Testimonials section - light background
      } else if (adjustedScrollY >= contactPos.top && adjustedScrollY < contactPos.bottom) {
        currentColor = 'dark-bg'; // Contact section - dark background
      } else if (adjustedScrollY >= footerPos.top) {
        currentColor = 'light-bg'; // Footer section - light background
      }

      setNavbarColor(currentColor);
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set correct color
    handleScroll();

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`custom-navbar ${navbarColor}`}>
      <div className="navbar-container">
        <div className="navbar-left desktop-only">
          <a href="#project" className="nav-link" onClick={(e) => handleLinkClick(e, 'project')}>Projects</a>
          <a href="#services" className="nav-link" onClick={(e) => handleLinkClick(e, 'services')}>Services</a>
          <a href="#testimonials" className="nav-link" onClick={(e) => handleLinkClick(e, 'testimonials')}>Testimonials</a>
          <a href="#contact" className="nav-link" onClick={(e) => handleLinkClick(e, 'contact')}>Contact</a>
        </div>
        <div className="navbar-center">
          <div className="logo-main">
            <span className="logo-bold">Devano</span>
            <span className="logo-thin">UK</span>
          </div>
        </div>
        <div className="navbar-right desktop-only">
          <a href="#contact" className="contact-btn" onClick={(e) => handleLinkClick(e, 'contact')}>
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
          <a href="#project" className="nav-link" onClick={(e) => handleLinkClick(e, 'project')}>Projects</a>
          <a href="#services" className="nav-link" onClick={(e) => handleLinkClick(e, 'services')}>Services</a>
          <a href="#testimonials" className="nav-link" onClick={(e) => handleLinkClick(e, 'testimonials')}>Testimonials</a>
          <a href="#contact" className="nav-link" onClick={(e) => handleLinkClick(e, 'contact')}>Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
