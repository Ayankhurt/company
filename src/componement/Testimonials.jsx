import React, { useEffect, useRef, useState } from "react";
import "./Testimonials.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const data = [
  { number: "01", name: "Drew Norman", title: "CEO of NovaTech Solutions", imageUrl: "/images/img11.png", bgImageUrl: "/images/bg1.jpg" },
  { number: "02", name: "Yusuf Omar", title: "CEO of NovaTech Solutions", imageUrl: "/images/img12.png", bgImageUrl: "/images/bg2.jpg" },
  { number: "03", name: "Linda Lee", title: "CEO of NovaTech Solutions", imageUrl: "/images/img13.png", bgImageUrl: "/images/bg3.jpg" },
  { number: "04", name: "Rajan Patel", title: "CEO of NovaTech Solutions", imageUrl: "/images/img11.png", bgImageUrl: "/images/bg1.jpg" },
  { number: "05", name: "Sutrisno Budi", title: "CEO of NovaTech Solutions", imageUrl: "/images/img12.png", bgImageUrl: "/images/bg2.jpg" },
];

const Testimonials = () => {
  const currentNameRef = useRef(null);
  const currentTitleRef = useRef(null);
  const imageWrapperRefs = useRef([]);
  const sectionTestimonialsRef = useRef(null); // Outer section ka ref
  const testimonialsContentRef = useRef(null); // Inner content jo pin hoga
  const specialTextNumberTrackRef = useRef(null); // New ref for the number track

  // State to manage whether it's desktop/tablet or mobile
  const [isDesktopOrTablet, setIsDesktopOrTablet] = useState(window.innerWidth >= 1024); // Adjust breakpoint as needed

  useEffect(() => {
    // Function to update the breakpoint state
    const handleResize = () => {
      setIsDesktopOrTablet(window.innerWidth >= 1024); // Update state on resize
    };

    window.addEventListener('resize', handleResize);

    let masterTL; // Declare masterTL outside the if block for cleanup

    if (isDesktopOrTablet) {
      // GSAP animations for desktop/tablet
      const buttons = gsap.utils.toArray(".testimonial_button");
      const wrappers = imageWrapperRefs.current;
      const numberTrack = specialTextNumberTrackRef.current; // Target the new track

      // Ensure initial state is correctly set when entering desktop view
      gsap.set(numberTrack, { y: 0 }); // Ensure the track starts at the top
      gsap.set(wrappers, { x: 0 }); // Ensure images start at left

      // Calculate total scroll height for horizontal pinning
      const scrollPerHorizontalSlide = window.innerWidth;
      const totalHorizontalScrollNeeded = scrollPerHorizontalSlide * (data.length - 1);
      const totalSectionHeight = window.innerHeight + totalHorizontalScrollNeeded;

      if (sectionTestimonialsRef.current) {
        sectionTestimonialsRef.current.style.height = `${totalSectionHeight}px`;
      }

      masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: sectionTestimonialsRef.current,
          start: "top top",
          end: `+=${totalHorizontalScrollNeeded}`,
          scrub: 0.05,
          pin: testimonialsContentRef.current,
          snap: {
            snapTo: 1 / (data.length - 1),
            duration: 0.3,
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const progress = self.progress;
            const activeIndex = Math.min(data.length - 1, Math.floor(progress * (data.length - 1)));

            buttons.forEach((button, index) => {
              if (index === activeIndex) {
                button.classList.add('is-active');
              } else {
                button.classList.remove('is-active');
              }
            });

            if (currentNameRef.current && currentTitleRef.current) {
              currentNameRef.current.textContent = data[activeIndex].name;
              currentTitleRef.current.textContent = data[activeIndex].title;
            }
          },
          onEnter: () => {
            // Ensure initial state is correctly set when entering desktop view
            buttons[0].classList.add('is-active');
            if (currentNameRef.current && currentTitleRef.current) {
              currentNameRef.current.textContent = data[0].name;
              currentTitleRef.current.textContent = data[0].title;
            }
          },
          onLeaveBack: () => {
            // Reset to first item when scrolling back out
            buttons.forEach(button => button.classList.remove('is-active'));
            buttons[0].classList.add('is-active');
            if (currentNameRef.current && currentTitleRef.current) {
              currentNameRef.current.textContent = data[0].name;
              currentTitleRef.current.textContent = data[0].title;
            }
          },
          // markers: true // Uncomment for debugging ScrollTrigger
        }
      });

      // Animate the entire number track vertically
      masterTL.to(numberTrack, {
        yPercent: -100 * (data.length - 1), // Move up by 100% of track's height for each slide
        ease: "none"
      }, 0); // Start at the beginning of the master timeline

      masterTL.to(wrappers, {
        xPercent: -100 * (wrappers.length - 1),
        ease: "none"
      }, 0);

      // Initial state set (when component mounts, before scroll or if already in view)
      buttons[0].classList.add('is-active');
      if (currentNameRef.current && currentTitleRef.current) {
        currentNameRef.current.textContent = data[0].name;
        currentTitleRef.current.textContent = data[0].title;
      }

    } else {
      // For mobile, ensure elements are visible and at their natural scale/position
      // and reset any inline styles set by GSAP if it was previously active
      if (sectionTestimonialsRef.current) {
        sectionTestimonialsRef.current.style.height = 'auto'; // Reset height for mobile
      }
      if (testimonialsContentRef.current) {
        gsap.set(testimonialsContentRef.current, { clearProps: "all" }); // Clear all GSAP-set inline styles
      }
      imageWrapperRefs.current.forEach(el => {
        if (el) gsap.set(el, { clearProps: "all" });
      });
      // Clear transforms on the number track and individual numbers for mobile
      if (specialTextNumberTrackRef.current) {
        gsap.set(specialTextNumberTrackRef.current, { clearProps: "all" });
      }
      gsap.utils.toArray(".special-text-number").forEach(el => {
        if (el) gsap.set(el, { clearProps: "all" });
      });
      gsap.utils.toArray(".testimonial_button").forEach(button => {
        button.classList.remove('is-active'); // Remove active class
      });
      // Set initial content for mobile view (first testimonial)
      if (currentNameRef.current && currentTitleRef.current && data.length > 0) {
        currentNameRef.current.textContent = data[0].name;
        currentTitleRef.current.textContent = data[0].title;
      }
    }

    // Load hone par hash se auto-scroll ko rokein
    if (window.location.hash) {
      window.scrollTo(0, 0);
      history.replaceState(null, null, ' ');
    }

    // Cleanup on unmount or when breakpoint changes
    return () => {
      window.removeEventListener('resize', handleResize);
      if (masterTL) {
        masterTL.kill(); // Kill the timeline and its ScrollTriggers
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Ensure all triggers are killed
    };

  }, [isDesktopOrTablet]); // Re-run effect when isDesktopOrTablet changes

  return (
    <div className="section_testimonials" id="testimonial" ref={sectionTestimonialsRef}>
      {/* Desktop/Tablet Content */}
      <div className="testimonials_content" ref={testimonialsContentRef}>
        <section className="testimonials_left padding-global">
          <div className="testimonials_top">
            {/* Testimonial Buttons (visible on desktop/tablet) */}
            {isDesktopOrTablet && (
              <div className="testimonials_links">
                {data.map((d, i) => (
                  <div key={i} className={`testimonial_button _${i + 1}`}>
                    <div className="button-style-b3">{d.number}</div>
                    <div className="button-style-b3">{d.name}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Large Scrolling Numbers (visible on desktop/tablet) */}
            {isDesktopOrTablet && (
              <div className="special-text-number-block">
                {/* New wrapper for sequential number scrolling */}
                <div className="special-text-number-track" ref={specialTextNumberTrackRef}>
                  {data.map((d, i) => (
                    <div key={i} className={`special-text-number _${i + 1}`}>
                      {d.number}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="testimony_current_info">
            <div className="heading-style-h2" ref={currentNameRef}>
            </div>
            <div className="heading-style-h4 text-color-n500" ref={currentTitleRef}>
            </div>
          </div>

          {/* Swipe For More (visible on mobile only) */}
          {!isDesktopOrTablet && (
            <div className="testimony_swipe">
              <div className="heading-style-h6">Swipe For More</div>
            </div>
          )}
        </section>

        <div className="testimonials_right">
          <div className="testimonials_image-block">
            {data.map((d, i) => (
              <div
                key={i}
                className={`testimonial_image_wrapper _${i + 1}`}
                style={{ backgroundImage: `url(${d.bgImageUrl})` }}
                ref={el => imageWrapperRefs.current[i] = el}
              >
                <img
                  src={d.imageUrl}
                  alt={`Testimonial ${d.number}`}
                  className={`testimonial_image _${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile-specific Testimonial Content (rendered conditionally by CSS) */}
      <div className="testimonials_mobile_list">
        {data.map((d, i) => (
          <div key={`mobile-${i}`} className="mobile_testimonial_item">
            <div className="mobile_testimonial_image_wrapper">
              <img src={d.imageUrl} alt={`Testimonial ${d.number}`} className="mobile_testimonial_image" />
              <div className="mobile_testimonial_bg" style={{ backgroundImage: `url(${d.bgImageUrl})` }}></div>
            </div>
            <div className="mobile_testimonial_details">
              <div className="mobile_testimonial_number">{d.number}</div>
              <div className="mobile_testimonial_name">{d.name}</div>
              <div className="mobile_testimonial_title">{d.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
