import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServiceItem.css';

gsap.registerPlugin(ScrollTrigger);

const ServiceItem = () => {
  const serviceRef1 = useRef(null);
  const serviceRef2 = useRef(null);
  const serviceRef3 = useRef(null);

  useEffect(() => {
    [serviceRef1, serviceRef2, serviceRef3].forEach(ref => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0.8, scale: 1.5 },
          {
            opacity: 1,
            scale: 0.8,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 100%',
              end: 'bottom 20%',
              scrub: 1,
            },
            transformOrigin: 'center center',
          }
        );
      }
    });
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div>
      <div className="service _1">
        <div ref={serviceRef1}>
          <div className="service_top _1">
            <img src="/images/img5.png" alt="Top Image" className="service_image _1 is-topleft" />
            <div className="service_meta_mobile">
              <div className="bodytext-style-bt1 text-color-n500">
              Smart, fast, and effective website copy powered  <br />by AI—tailored to your brand and optimized <br />for clarity and engagement.
              </div>
            </div>
          </div>
          <div className="service_title _1">
            <div className="heading-style-h1-2 text-height-100">
            Website
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;Copywriting
            </div>
          </div>
          <div className="service_bottom _1">
            <img src="/images/img6.png" loading="lazy" alt="Bottom Image" className="service_image _2 is-bottomright" />
            <div className="service_meta text-align-right">
              <div className="bodytext-style-bt1 text-color-n500">
              Smart, fast, and effective website copy powered by AI—tailored to your brand and optimized for clarity and engagement.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="service _2">
        <div ref={serviceRef2}>
          <div className="service_top _2">
            <img src="/images/img7.png" alt="Top Image" className="service_image _3 is-topleft" />
            <div className="service_meta_mobile">
              <div className="bodytext-style-bt1 text-color-n500">
              Define a unique brand voice and compelling story that builds connection and trust with your audience.
              </div>
            </div>
          </div>
          <div className="service_title _2">
            <div className="heading-style-h1-2 text-height-100">
              &nbsp;&nbsp;&nbsp;Brand Story &amp;
              <br />
            Voice Crafting
            </div>
          </div>
          <div className="service_bottom _2">
            <img src="/images/img8.png" loading="lazy" alt="Bottom Image" className="service_image _4 is-bottomright" />
            <div className="service_meta">
              <div className="bodytext-style-bt1 text-color-n500">
              Define a unique brand voice and compelling story that builds connection and trust with your audience.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="service _3">
        <div ref={serviceRef3}>
          <div className="service_top _3">
            <img src="/images/img9.png" alt="Top Image" className="service_image _5 is-topleft" />
            <div className="service_meta_mobile">
              <div className="bodytext-style-bt1 text-color-n500">
              Define a unique brand voice and compelling story that builds connection and trust with your audience.
              </div>
            </div>
          </div>
          <div className="service_title _3">
            <div className="heading-style-h1-2 text-height-100">
            Email Campaign
              <br />
              &nbsp;&nbsp;&amp; Landing Page
            </div>
          </div>
          <div className="service_bottom _3">
            <img src="/images/img10.png" loading="lazy" alt="Bottom Image" className="service_image _6 is-bottomright" />
            <div className="service_meta">
              <div className="bodytext-style-bt1 text-color-n500">
              Define a unique brand voice and compelling story that builds connection and trust with your audience.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;