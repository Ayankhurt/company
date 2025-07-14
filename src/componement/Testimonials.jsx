import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    const buttons = gsap.utils.toArray(".testimonial_button");
    const largeNumbers = gsap.utils.toArray(".special-text-number");
    const wrappers = imageWrapperRefs.current;

    // --- Master Timeline aur ScrollTrigger Setup ---
    // Outer section ke liye total scroll height calculate karein
    // Humein 100vh chahiye section ko viewport mein laane ke liye,
    // plus (data.length - 1) * window.innerWidth horizontal scroll ke liye.
    // Yahan window.innerWidth ko har horizontal slide ke liye scroll distance maan rahe hain.
    const scrollPerHorizontalSlide = window.innerWidth;
    const totalHorizontalScrollNeeded = scrollPerHorizontalSlide * (data.length - 1);
    const totalSectionHeight = window.innerHeight + totalHorizontalScrollNeeded; // Total height for the outer section

    if (sectionTestimonialsRef.current) {
        sectionTestimonialsRef.current.style.height = `${totalSectionHeight}px`;
    }

    let masterTL = gsap.timeline({
        scrollTrigger: {
            trigger: sectionTestimonialsRef.current, // Outer section trigger karega pin ko
            start: "top top", // Jab outer section ka top, viewport ke top se takrayega, tab pin shuru hoga
            end: `+=${totalHorizontalScrollNeeded}`, // Horizontal movement ke liye jitna scroll chahiye, utni der tak pin rahega
            scrub: 1,
            pin: testimonialsContentRef.current, // Inner content div ko pin karein
            snap: {
                snapTo: 1 / (data.length - 1), // Har horizontal slide par snap karein
                duration: 0.3,
                ease: "power1.inOut",
            },
            onUpdate: (self) => {
                const progress = self.progress;
                // Horizontal slides ke liye activeIndex calculate karein (0 se data.length - 1 tak)
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
            // Jab component mount ho ya scroll karke is section tak pahunche
            onEnter: () => {
                buttons[0].classList.add('is-active');
                if (currentNameRef.current && currentTitleRef.current) {
                    currentNameRef.current.textContent = data[0].name;
                    currentTitleRef.current.textContent = data[0].title;
                }
            },
            onLeaveBack: () => { // Jab scroll karke pin kiye hue section se wapas upar jaayen
                buttons.forEach(button => button.classList.remove('is-active'));
                buttons[0].classList.add('is-active');
                if (currentNameRef.current && currentTitleRef.current) {
                    currentNameRef.current.textContent = data[0].name;
                    currentTitleRef.current.textContent = data[0].title;
                }
            },
        }
    });

    // Large numbers ko animate karein (vertical scroll)
    masterTL.to(largeNumbers, {
        yPercent: -100 * (largeNumbers.length - 1),
        ease: "none"
    }, 0); // Master timeline ke shuru mein hi shuru karein

    // Image wrappers ko animate karein (horizontal scroll)
    masterTL.to(wrappers, {
        xPercent: -100 * (wrappers.length - 1),
        ease: "none"
    }, 0); // Master timeline ke shuru mein hi shuru karein

    // Initial state set karein (jab component mount hota hai, scroll se pehle)
    buttons[0].classList.add('is-active');
    if (currentNameRef.current && currentTitleRef.current) {
      currentNameRef.current.textContent = data[0].name;
      currentTitleRef.current.textContent = data[0].title;
    }

    // Load hone par hash se auto-scroll ko rokein
    if (window.location.hash) {
      window.scrollTo(0, 0);
      history.replaceState(null, null, ' ');
    }

    // ScrollTrigger instances ko cleanup karein
    return () => {
        masterTL.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, []);

  return (
    <div className="section_testimonials" id="testimonial" ref={sectionTestimonialsRef}>
      <div className="testimonials_content" ref={testimonialsContentRef}> {/* Yeh div pin hoga */}
        <section className="testimonials_left padding-global">
          <div className="testimonials_top">
            <div className="testimonials_links">
              {data.map((d, i) => (
                <div key={i} className={`testimonial_button _${i + 1}`}>
                  <div className="button-style-b3">{d.number}</div>
                  <div className="button-style-b3">{d.name}</div>
                </div>
              ))}
            </div>

            <div className="special-text-number-block">
              {data.map((d, i) => (
                <div key={i} className={`special-text-number _${i + 1}`}>
                  {d.number}
                </div>
              ))}
            </div>
          </div>

          <div className="testimony_current_info">
            <div className="heading-style-h2" ref={currentNameRef}>
            </div>
            <div className="heading-style-h4 text-color-n500" ref={currentTitleRef}>
            </div>
          </div>

          <div className="testimony_swipe">
            <div className="heading-style-h6">Swipe For More</div>
          </div>
        </section>

        <div className="testimonials_right">
          <div className="testimonials_image-block"> {/* Yeh div horizontally scrolling images ko hold karega */}
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
    </div>
  );
};

export default Testimonials;