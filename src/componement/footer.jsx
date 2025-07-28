import React, { useEffect, useRef } from 'react';
import './footer.css'; // Correct: Import the CSS file
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Power3, Power2 } from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    // Refs for animations
    const footerHeadRef = useRef(null);
    const footerMetaRef = useRef(null);
    const walkingBlockRef = useRef(null);
    const footerLinksRef = useRef(null);
    const footerCreditRef = useRef(null);
    const footerConditionsRef = useRef(null);
    const copyrightRef = useRef(null);

    useEffect(() => {
        // Cleanup function for ScrollTriggers
        const cleanup = () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };

        // Footer Head Animation (Ready to Collaborate?)
        if (footerHeadRef.current) {
            gsap.fromTo(footerHeadRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: Power3.out,
                    scrollTrigger: {
                        trigger: footerHeadRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                        once: true,
                    }
                }
            );
        }

        // Footer Meta Animation (description text)
        if (footerMetaRef.current) {
            gsap.fromTo(footerMetaRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: Power3.out,
                    delay: 0.1,
                    scrollTrigger: {
                        trigger: footerMetaRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                        once: true,
                    }
                }
            );
        }

        // Walking Block Animation ("Get In Touch")
        if (walkingBlockRef.current) {
            const mask = walkingBlockRef.current.querySelector('.walking-button-mask');
            if (mask) {
                gsap.to(mask, {
                    x: '-50%', // Adjust based on how much content you've duplicated
                    duration: 20, // Adjust speed as needed
                    ease: "none",
                    repeat: -1, // Infinite loop
                    modifiers: {
                        x: gsap.utils.unitize(x => parseFloat(x) % (mask.scrollWidth / 2))
                    }
                });
            }
        }

        // Footer Links Animation (About, Projects, Services, Contact)
        if (footerLinksRef.current) {
            gsap.fromTo(footerLinksRef.current.children,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: Power2.out,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: footerLinksRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                        once: true,
                    }
                }
            );
        }

        // Footer Credit Animation (Prompt Crafted, Socials)
        if (footerCreditRef.current) {
            gsap.fromTo(footerCreditRef.current.children,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: Power2.out,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: footerCreditRef.current,
                        start: "top 90%",
                        toggleActions: "play none none none",
                        once: true,
                    }
                }
            );
        }

        // Footer Conditions Animation (404, License, etc.)
        if (footerConditionsRef.current) {
            gsap.fromTo(footerConditionsRef.current.children,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: Power2.out,
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: footerConditionsRef.current,
                        start: "top 95%",
                        toggleActions: "play none none none",
                        once: true,
                    }
                }
            );
        }

        // Copyright Text Animation
        if (copyrightRef.current) {
            gsap.fromTo(copyrightRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.8,
                    ease: Power2.out,
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: copyrightRef.current,
                        start: "top 95%",
                        toggleActions: "play none none none",
                        once: true,
                    }
                }
            );
        }

        return cleanup; // Return cleanup function for ScrollTriggers
    }, []);

    return (
        <section className="footer">
            <div className="footer_content">
                <div className="footer_top padding-global">
                    <div className="container">
                        <div className="footer_top_content">
                            <div className="footer_head">
                                <div ref={footerHeadRef} className="heading-style-h2 text-color-n500">
                                    Ready to Collaborate?
                                </div>
                                <div ref={footerMetaRef} className="footer_meta">
                                    <div className="heading-style-h7 text-color-n700">
                                        Whether you're building from scratch or improving what's already there, I'm here to bring clarity, creativity, and results.
                                    </div>
                                </div>
                            </div>
                            <div ref={walkingBlockRef} className="footer_walking_block">
                                <div className="walking-button-mask">
                                    {/* Duplicated content for seamless infinite scroll */}
                                    <div className="walking-button">
                                        <div className="heading-style-h1 text-weight-bold">Get In Touch</div>
                                        <div className="walking-button_arrow"></div>
                                    </div>
                                    <div className="walking-button">
                                        <div className="heading-style-h1 text-weight-bold">Get In Touch</div>
                                        <div className="walking-button_arrow"></div>
                                    </div>
                                    <div className="walking-button">
                                        <div className="heading-style-h1 text-weight-bold">Get In Touch</div>
                                        <div className="walking-button_arrow"></div>
                                    </div>
                                    <div className="walking-button">
                                        <div className="heading-style-h1 text-weight-bold">Get In Touch</div>
                                        <div className="walking-button_arrow"></div>
                                    </div>
                                    <div className="walking-button">
                                        <div className="heading-style-h1 text-weight-bold">Get In Touch</div>
                                        <div className="walking-button_arrow"></div>
                                    </div>
                                    <div className="walking-button">
                                        <div className="heading-style-h1 text-weight-bold">Get In Touch</div>
                                        <div className="walking-button_arrow"></div>
                                    </div>
                                </div>
                            </div>
                            <div ref={footerLinksRef} className="footer_links">
                                <a href="#hero-cursor" className="button-style-b1 w-inline-block">
                                    <div className="button">
                                        <div className="button_content-footer">
                                            <div>About</div>
                                        </div>
                                        <svg width="2" height="2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="button_line">
                                            <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="2"></line>
                                        </svg>
                                    </div>
                                </a>
                                <a href="#project" className="button-style-b1 w-inline-block">
                                    <div className="button">
                                        <div className="button_content-footer">
                                            <div>Projects</div>
                                        </div>
                                        <svg width="2" height="2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="button_line">
                                            <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="2"></line>
                                        </svg>
                                    </div>
                                </a>
                                <a href="#service" className="button-style-b1 w-inline-block">
                                    <div className="button">
                                        <div className="button_content-footer">
                                            <div>Services</div>
                                        </div>
                                        <svg width="2" height="2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="button_line">
                                            <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="2"></line>
                                        </svg>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_bottom padding-global">
                    <div className="container footerblock">
                        <div ref={footerCreditRef} className="footer_credit">
                            <div className="footer_credit_top">
                                <a aria-label="Footer Link" href="#" className="footer_brand w-inline-block">
                                    <div className="footer_brand_prompt">DEVANO</div>
                                    <div className="footer_brand_crafted">UK</div>
                                </a>
                                <div className="footer_socials">
                                    <a href="#" className="button-style-b1 text-color-secondary w-inline-block">
                                        <div className="button">
                                            <div className="button_content-footer">
                                                <div>Linkedin</div>

                                            </div>
                                        </div>
                                    </a>
                                    <a href="#" className="button-style-b1 text-color-secondary w-inline-block">
                                        <div className="button">
                                            <div className="button_content-footer">
                                                <div>X</div>

                                            </div>
                                        </div>
                                    </a>
                                    <a href="#" className="button-style-b1 text-color-secondary w-inline-block">
                                        <div className="button">
                                            <div className="button_content-footer">
                                                <div>Behance</div>

                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div ref={footerConditionsRef} className="footer_credit_bottom">
                                <div className="footer_conditions">
                                    <a href="/404" className="button-style-b2 text-color-n500 w-inline-block">
                                        <div className="button">
                                            <div className="button_content-footer">
                                                <div>404</div>

                                            </div>
                                        </div>
                                    </a>
                                    <a href="/license" className="button-style-b2 text-color-n500 w-inline-block">
                                        <div className="button">
                                            <div className="button_content-footer">
                                                <div>License</div>
                                                <svg width="2" height="2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="button_line">
                                            <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="2"></line>
                                        </svg>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="/changelog" className="button-style-b2 text-color-n500 w-inline-block">
                                        <div className="button">
                                            <div className="button_content-footer">
                                                <div>Changelog</div>
                                                <svg width="2" height="2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="button_line">
                                            <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="2"></line>
                                        </svg>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="/instruction-guide" className="button-style-b2 text-color-n500 w-inline-block">
                                        <div className="button">
                                            <div className="button_content-footer">
                                                <div>Instruction</div>
                                                <svg width="2" height="2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="button_line">
                                            <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="2"></line>
                                        </svg>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="/style-guide" className="button-style-b2 text-color-n500 w-inline-block">
                                        <div className="button">
                                            <div className="button_content-footer">
                                                <div>Style Guide</div>
                                                <svg width="2" height="2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="button_line">
                                            <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="2"></line>
                                        </svg>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div ref={copyrightRef} className="bodytext-style-bt1 text-color-n600">
                                    © 2025 PromptCrafted Studio. All rights reserved.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;