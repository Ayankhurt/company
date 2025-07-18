import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ImageGallery.css';

gsap.registerPlugin(ScrollTrigger);

const ImageGallery = () => {
  const galleryContainerRef = useRef(null); // Ref for #magic-text (the horizontally scrolling container)
  const galleryWrapperRef = useRef(null); // Ref for #magic-text-wrapper (the trigger and pin element)

  useEffect(() => {
    let tl; // Declare timeline variable for cleanup

    const setupGSAP = () => {
      // Kill existing ScrollTriggers and timelines before re-creating
      if (tl) {
        tl.kill(); // Kills the timeline and its associated ScrollTrigger
        tl = null;
      }
      // Ensure all ScrollTriggers are killed, especially if previous ones weren't part of the timeline
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      const images = gsap.utils.toArray('.gallery-image-wrapper', galleryContainerRef.current);
      if (images.length === 0 || !galleryContainerRef.current || !galleryWrapperRef.current) {
        return; // Exit if elements are not found
      }

      const currentWidth = window.innerWidth;
      let imagesPerRow;

      // Determine images per row based on CSS breakpoints
      if (currentWidth <= 768) { // Mobile
        imagesPerRow = 1;
      } else if (currentWidth <= 1024) { // Tablet
        imagesPerRow = 2;
      } else { // Desktop
        imagesPerRow = 2; // Default for desktop
      }

      // Calculate the total width the .gallery-container needs to be to hold all images side-by-side
      // Each image wrapper takes up `currentWidth / imagesPerRow` of the viewport width.
      const totalContentWidth = images.length * (currentWidth / imagesPerRow);

      // Set the width of the gallery container explicitly for horizontal layout
      gsap.set(galleryContainerRef.current, { width: totalContentWidth, x: 0 }); // IMPORTANT: Set initial x to 0

      // Calculate the horizontal distance the container needs to move
      // It's the total width of the content minus the viewport width.
      // This ensures the last image aligns to the right edge of the viewport.
      const xDistance = -(totalContentWidth - currentWidth);

      // Calculate the scroll distance required for the pin effect
      // This should be equal to the horizontal distance the content moves
      // plus an additional viewport height to allow the section to scroll out smoothly.
      const scrollDistanceForPin = Math.abs(xDistance) + window.innerHeight;

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: galleryWrapperRef.current,
          start: "top top", // Pin when the top of the wrapper hits the top of the viewport
          end: `+=${scrollDistanceForPin}`, // The total scroll length for the pin
          pin: true,
          pinSpacing: true, // Adds space for the pinned element
          scrub: 0.05, // **DECREASED THIS VALUE FOR FASTER SCROLLING**
          anticipatePin: 1, // Helps with smoother pinning
          invalidateOnRefresh: true, // Recalculate on refresh/resize
          // markers: true // Uncomment for debugging ScrollTrigger
        }
      });

      tl.to(galleryContainerRef.current, {
        x: xDistance, // Animate from 0 to xDistance
        ease: "none",
        duration: 1 // Duration of the horizontal scroll within the timeline (relative to scrub)
      });

      // Optional: Animate scale (if the container itself is meant to scale)
      tl.to(galleryContainerRef.current, {
        scale: 1.05, // Slight scale effect
      }, 0); // Start at the beginning of the timeline
    };

    // Initial setup
    setupGSAP();

    // Re-setup GSAP on window resize to adjust for responsive changes
    window.addEventListener('resize', setupGSAP);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', setupGSAP);
      if (tl) {
        tl.kill(); // Ensure the timeline and its ScrollTrigger are killed
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Double-check all triggers are killed
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  const imagesData = [
    { src: '/images/img1.jpg', title: 'EchoFrame Media', para: "Brand Voice / AI Content", time: "April 2025", link: 'https://your-link-1.com' },
    { src: '/images/img2.jpg', title: 'PixelFold Technologies', para: "UX Copy / Mobile App", time: "February 2025", link: 'https://your-link-2.com' },
    { src: '/images/img3.jpg', title: 'TravelMatch Co.', para: "Ad Copy / Emotional Branding", time: "March 2025", link: 'https://your-link-3.com' },
    { src: '/images/img4.jpg', title: 'RSVP Gourmet', para: "Brand Messaging / Event Copy", time: "January 2025", link: 'https://your-link-4.com' },
  ];

  return (
    <div id="magic-text-wrapper" className="gallery-wrapper" ref={galleryWrapperRef}>
      <div id="magic-text" className="gallery-container" ref={galleryContainerRef}>
        {imagesData.map((img, idx) => (
          <a href={img.link} target="_blank" rel="noopener noreferrer" key={idx} className="gallery-image-wrapper">
            <img src={img.src} alt={img.title} className="gallery-image" />
            <div className="gallery-overlay">
              <div className="project_details">
                <div className="project_details_main">
                  <div className="heading-style-h2">{img.title}</div>
                  <div className="heading-style-h6">{img.para}</div>
                </div>
                <div className="project_details_extra">
                  <div className="bodytext-style-bt1">{img.title}</div> {/* Consider if you want title here again or a different detail */}
                  <div className="bodytext-style-bt1 text-color-n400">{img.time}</div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;