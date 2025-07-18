import React, { useState } from 'react';
import "./navbar.css"; // Ensure this path is correct

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage burger menu visibility

  const handleScroll = (e, id) => {
    e.preventDefault(); // Prevent default anchor behavior
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the element
      setIsOpen(false); // Close the menu after clicking a link
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar-inner-container">
        {/* Brand Logo */}
        <div className="navbar-brand">
          <span className="navbar-brand-devano">
            <a href="#" className="navbar-brand-devano">DEVANO</a>
          </span>
          <span className="navbar-brand-uk">
            <a href="#" className="navbar-brand-uk">UK</a>
          </span>
        </div>

        {/* Burger Menu Button for Mobile */}
        <div className="navbar-toggle-button-wrapper">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="navbar-toggle-button"
            aria-label="Toggle navigation menu"
          >
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links - Hidden on mobile by default, shown when burger menu is open */}
        <nav
          className={`navbar-nav ${isOpen ? 'is-open' : ''}`}
        >
          <ul className="navbar-nav-list">
            <li>
              <a
                href="#project"
                onClick={(e) => handleScroll(e, 'project')}
                className="navbar-nav-list-link"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => handleScroll(e, 'services')}
                className="navbar-nav-list-link"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                onClick={(e) => handleScroll(e, 'testimonials')}
                className="navbar-nav-list-link"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, 'contact')}
                className="navbar-nav-list-link"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Contact Button - Hidden on mobile when menu is open, shown on larger screens */}
        <div className="navbar-contact-button-wrapper">
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, 'contact')}
            className="navbar-contact-button"
          >
            Contact
            <img
              loading="lazy"
              src="https://cdn.prod.website-files.com/6822faf7b267d2a617501351/6822faf7b267d2a61750136f_Polygon%203.svg"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
