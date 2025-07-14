import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ImageGallery.css';

gsap.registerPlugin(ScrollTrigger);

const ImageGallery = () => {
  useEffect(() => {
    const images = gsap.utils.toArray('.gallery-image');
    const totalWidth = Math.ceil(images.length / 2) * window.innerWidth; // 2 images per row, 2 rows

    gsap.fromTo(
      "#magic-text",
      {
        x: 0,
        scale: 1
      },
      {
        x: () => -totalWidth + window.innerWidth, // Move full width of all rows
        scale: 1.2,
        color: "#6bff61",
        ease: "none",
        scrollTrigger: {
          trigger: "#magic-text-wrapper",
          start: "top top",
          end: () => `+=${totalWidth}`, // End when all rows are scrolled
          pin: true,
          pinSpacing: true,
          scrub: 2,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      }
    );
    gsap.registerPlugin(ScrollTrigger);

// const split = new SplitType(".mygsaptrigger h2", {
//   types: "words, chars",
// });

// const tl = gsap
//   .timeline({
//     scrollTrigger: {
//       trigger: ".highlightcontainer",
//       start: "top 38%",
//       end: "+=50%",
//       scrub: 0.5,
//     },
//   })
//   .set(
//     split.chars,
//     {
//       duration: 0.3,
//       color: "white",
//       stagger: 0.1,
//     },
//     0.1
//   );


    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const images = [
    { src: '/images/img1.jpg', title: 'EchoFrame Media', para:"Brand Voice / AI Content",time: "April 2025", link: 'https://your-link-1.com' },
    { src: '/images/img2.jpg', title: 'PixelFold Technologies',para:"UX Copy / Mobile App", time: "February 2025", link: 'https://your-link-2.com' },
    { src: '/images/img3.jpg', title: 'TravelMatch Co.',para:"Ad Copy / Emotional Branding", time: "March 2025", link: 'https://your-link-3.com' },
    { src: '/images/img4.jpg', title: 'RSVP Gourmet', para:"Brand Messaging / Event Copy",time: "January 2025", link: 'https://your-link-4.com' }
  ];

  return (
    <div id="magic-text-wrapper" className="gallery-wrapper" >
      <div id="magic-text" className="gallery-container">
        {images.map((img, idx) => (
          <a href={img.link} target="_blank" rel="noopener noreferrer" key={idx} className="gallery-image-wrapper">
            <img src={img.src} alt={img.title} className="gallery-image" />
            <div className="gallery-overlay">
              <div className="project_details">
                <div className="project_details_main">
                  <div className="heading-style-h2">{img.title}</div>
                  <div className="heading-style-h6">{img.para}</div>
                </div>
                <div className="project_details_extra">
                  <div className="bodytext-style-bt1">{img.title}</div>
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