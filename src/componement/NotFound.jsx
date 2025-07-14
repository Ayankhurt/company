import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import gsap from 'gsap';
import './NotFound.css'; // Create this CSS file next

const NotFound = () => {
    const headingRef = useRef(null);
    const textRef = useRef(null);
    const buttonRef = useRef(null);
    const imageRef = useRef(null); // Ref for an optional image

    useEffect(() => {
        // Animation for the 404 heading
        gsap.fromTo(headingRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        );

        // Animation for the descriptive text
        gsap.fromTo(textRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
        );

        // Animation for the "Go Home" button
        gsap.fromTo(buttonRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, delay: 0.4, ease: 'back.out(1.7)' }
        );

        // Optional: Animation for an image if you add one
        if (imageRef.current) {
            gsap.fromTo(imageRef.current,
                { opacity: 0, rotation: -10 },
                { opacity: 1, rotation: 0, duration: 1, delay: 0.6, ease: 'power3.out' }
            );
        }

    }, []);

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                {/* You can add an image here for a visual touch */}
                {/* <img ref={imageRef} src="/path/to/your/404-image.png" alt="Page Not Found" className="not-found-image" /> */}

                <h1 ref={headingRef} className="not-found-heading">404 - Page Not Found</h1>
                <p ref={textRef} className="not-found-text">
                    Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link to="/" className="not-found-button" ref={buttonRef}>
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFound;