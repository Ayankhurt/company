import React, { useEffect, useRef } from 'react'; // Import useRef
import './contact.css';
import gsap from 'gsap'; // Import gsap
import ScrollTrigger from 'gsap/ScrollTrigger'; // Import ScrollTrigger

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger plugin

const Contact = () => {
    const ctaTitleRef = useRef(null);
    const ctaActionRef = useRef(null);
    const sectionCtaRef = useRef(null); // Ref for the whole section to use as trigger

    useEffect(() => {
        // Ensure elements exist before animating
        if (ctaTitleRef.current && ctaActionRef.current && sectionCtaRef.current) {
            // Animation for the left-side text
            gsap.fromTo(ctaTitleRef.current,
                { x: -100, opacity: 0 }, // Start from 100px left and invisible
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionCtaRef.current,
                        start: "top center+=10%", // When the top of the section hits 10% above center of viewport
                        toggleActions: "play none none none", // Play animation once on scroll into view
                        once: true, // Only play once
                    }
                }
            );

            // Animation for the right-side text and button
            gsap.fromTo(ctaActionRef.current,
                { x: 100, opacity: 0 }, // Start from 100px right and invisible
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.2, // Slight delay after the left text starts
                    scrollTrigger: {
                        trigger: sectionCtaRef.current,
                        start: "top center+=10%", // Same trigger as left text
                        toggleActions: "play none none none",
                        once: true,
                    }
                }
            );
        }

        // Cleanup function for ScrollTrigger instances
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };

    }, []); // Empty dependency array means this runs once on mount

    return (
        <div>
            <section id="cta" className="section_cta padding-global-1" ref={sectionCtaRef}> {/* Attach ref here */}
                <div className="container">
                    <div className="cta_content">
                        <div className="cta_title" ref={ctaTitleRef}> {/* Attach ref here */}
                            <div
                                className="heading-style-h1-contact text-weight-bold"
                            >
                                Let’s build something together.
                            </div>
                        </div>
                        <div className="cta_action" ref={ctaActionRef}> {/* Attach ref here */}
                            <div
                                className="heading-style-h6 cta-text"
                            >
                                Ready to turn your ideas into powerful words?<br />Let’s Connect!
                            </div>
                            <a href="#" className="cta_button w-inline-block">
                                <div
                                    className="button-style-b1"
                                >
                                    <div
                                        className="button"
                                    >
                                        <div className="button_content">
                                            <div>Let's Talk</div>
                                            <img src="https://cdn.prod.website-files.com/6822faf7b267d2a617501351/6822faf7b267d2a61750136f_Polygon%203.svg" loading="lazy" alt="" className="button_arrow" />
                                        </div>
                                        <svg width="2" height="2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="button_line" style={{ opacity: 0.2 }}>
                                            <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="2"></line>
                                        </svg>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Contact;