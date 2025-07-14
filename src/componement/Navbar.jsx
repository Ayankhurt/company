import React from 'react';
import '../App.css';

const Navbar = () => {
  const handleScroll = (e, id) => {
    e.preventDefault(); // Prevent default anchor behavior
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the element
    }
  };

  return (
    <div className='nav padding-global'>
      <div className="container navbar">
        <div className="nav-content-6">
          <div className="nav-links">
            <a href="#project" onClick={(e) => handleScroll(e, 'project')} className="button-style-b2-4 w-inline-block">
              <div>Projects</div>
            </a>
            <a href="#services" onClick={(e) => handleScroll(e, 'services')} className="button-style-b2-4 w-inline-block">
              <div>Services</div>
            </a>
            <a href="#testimonials" onClick={(e) => handleScroll(e, 'testimonials')} className="button-style-b2-4 w-inline-block">
              <div>Testimonials</div>
            </a>
            <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="button-style-b2-4 w-inline-block">
              <div>Contact</div>
            </a>
          </div>
          <div className="nav-brand">
            <div>
              <span><a href="" className='nav-brand-text'>DEVANO</a></span>
            </div>
            <div>
              <span><a href="" className='nav-brand-text-uk'>UK</a></span>
            </div>
          </div>
          <div className="nav-contact">
            <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="button-style-b2-4 w-inline-block">
              <div className="button-4 secondary-w-arrow">
                <div className="button-content secondary-w-arrow-2">
                  <div>Contact</div>
                  <img loading="lazy" src="https://cdn.prod.website-files.com/6822faf7b267d2a617501351/6822faf7b267d2a61750136f_Polygon%203.svg" alt="" className="button-arrow-2 secondary-w-arrow-3" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;