import React, { useEffect, useRef, useState } from 'react'; // Import useState
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ImageGallery.css';

gsap.registerPlugin(ScrollTrigger);

const ImageGallery = () => {
    const galleryContainerRef = useRef(null); // Ref for #magic-text (the horizontally scrolling container)
    const galleryWrapperRef = useRef(null); // Ref for #magic-text-wrapper (the trigger and pin element)

    // State to track if it's a mobile screen (<= 768px)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        let tl; // Declare timeline variable for cleanup

        const handleResize = () => {
            // Update the isMobile state on resize
            setIsMobile(window.innerWidth <= 768);
        };

        // Add resize listener
        window.addEventListener('resize', handleResize);

        // --- GSAP Setup Logic ---
        if (!isMobile) { // Only run GSAP animations for desktop/tablet
            const images = gsap.utils.toArray('.gallery-image-wrapper', galleryContainerRef.current);
            if (images.length === 0 || !galleryContainerRef.current || !galleryWrapperRef.current) {
                // If elements are not ready or no images, just return
                // Also ensures that if we switch from mobile to desktop, refs are valid
                return;
            }

            // Kill existing ScrollTriggers and timelines before re-creating
            // This is important when switching from mobile to desktop or on subsequent resizes
            if (tl) {
                tl.kill();
                tl = null;
            }
            ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Ensure all triggers are killed

            const currentWidth = window.innerWidth;
            let imagesPerRow;

            // Determine images per row based on CSS breakpoints
            if (currentWidth <= 768) { // This block ideally won't be hit due to !isMobile, but for completeness
                imagesPerRow = 1;
            } else if (currentWidth <= 1024) { // Tablet
                imagesPerRow = 2;
            } else { // Desktop (1025px and up)
                imagesPerRow = 2; // Default for desktop
            }

            // Calculate the total width the .gallery-container needs to be to hold all images side-by-side
            const totalContentWidth = images.length * (currentWidth / imagesPerRow);

            // Set the width of the gallery container explicitly for horizontal layout
            // IMPORTANT: Set initial x to 0, or GSAP might resume from a previous state
            gsap.set(galleryContainerRef.current, { width: totalContentWidth, x: 0 });

            // Calculate the horizontal distance the container needs to move
            const xDistance = -(totalContentWidth - currentWidth);

            // Calculate the scroll distance required for the pin effect
            const scrollDistanceForPin = Math.abs(xDistance) + window.innerHeight;

            tl = gsap.timeline({
                scrollTrigger: {
                    trigger: galleryWrapperRef.current,
                    start: "top top", // Pin when the top of the wrapper hits the top of the viewport
                    end: `+=${scrollDistanceForPin}`, // The total scroll length for the pin
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.05,
                    anticipatePin: 1,
                    invalidateOnRefresh: true, // Recalculate on refresh/resize
                    // markers: true // Uncomment for debugging ScrollTrigger
                }
            });

            tl.to(galleryContainerRef.current, {
                x: xDistance, // Animate from 0 to xDistance
                ease: "none",
                duration: 1
            });

            // Optional: Animate scale (if the container itself is meant to scale)
            tl.to(galleryContainerRef.current, {
                scale: 1.05, // Slight scale effect
            }, 0); // Start at the beginning of the timeline

        } else { // For mobile (isMobile is true), ensure GSAP styles are cleared
            if (tl) {
                tl.kill(); // Kill any active timeline
                tl = null;
            }
            ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Kill all ScrollTriggers

            // Clear any inline styles set by GSAP for the elements
            if (galleryContainerRef.current) {
                gsap.set(galleryContainerRef.current, { clearProps: "all" });
            }
            if (galleryWrapperRef.current) {
                gsap.set(galleryWrapperRef.current, { clearProps: "all" });
            }
            gsap.utils.toArray('.gallery-image-wrapper', galleryContainerRef.current).forEach(el => {
                if (el) gsap.set(el, { clearProps: "all" });
            });
        }

        // Cleanup on unmount or when isMobile state changes
        return () => {
            window.removeEventListener('resize', handleResize);
            if (tl) {
                tl.kill();
            }
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [isMobile]); // Re-run effect when isMobile changes

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