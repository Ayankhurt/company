import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  useEffect(() => {
    // Split text into words for individual animation
    const mainText = document.querySelector('.services-main-text');
    const words = mainText.textContent.split(' ');
    mainText.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');

    // Animate each word from gray to white on scroll
    gsap.utils.toArray(".word").forEach((word, index) => {
      gsap.fromTo(word,
        {
          color: "#616161" // Start with gray
        },
        {
          color: "#ffffff", // Change to white
          duration: 0.5,
          scrollTrigger: {
            trigger: word,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div>
      <div className="services-section" id="services">
        <div className="services-container">
          <div className="services-hero">
            <h1 className="services-main-text">
              Unlock the full power of AI through expertly crafted prompts tailored to your goals.
            </h1>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Services;