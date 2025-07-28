import React, { useEffect } from "react";
import "../App.css"; // Assuming App.css contains global styles and variables
import ImageGallery from "./ImageGallery"; // Assuming these components exist
import Services from "./Services";
import ServiceItem from "./ServiceItem";
import Testimonials from "./Testimonials";
import Contact from "./contact";
import Footer from "./footer";
import Navbar from "./Navbar";

const Main = () => {
  useEffect(() => {
    function TxtType(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = "";
      this.tick = this.tick.bind(this);
      this.isDeleting = false;
      this.tick();
    }

    TxtType.prototype.tick = function () {
      const i = this.loopNum % this.toRotate.length;
      const fullTxt = this.toRotate[i];
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
      this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";
      let delta = 150 - Math.random() * 75;
      if (this.isDeleting) {
        delta /= 2;
      }
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }
      setTimeout(this.tick, delta);
    };

    const elements = document.getElementsByClassName("typewrite");
    for (let i = 0; i < elements.length; i++) {
      const toRotate = elements[i].getAttribute("data-type");
      const period = elements[i].getAttribute("data-period");
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
  }, []);

  return (
    <div className="main">
      <section className="section-hero min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("logo.jpg")' }}>
        <Navbar />
        <div className="container mx-auto px-4">
          <div className="hero-content flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="hero-meta max-w-lg lg:self-end mb-8 lg:mb-0 lg:ml-auto">
              <div className="text-xl sm:text-2xl font-medium text-gray-700">
                We are PromptCrafted Studio, an AI Prompt Engineer with a
                Copywriter's soul. I blend strategic language with powerful AI
                tools to deliver copy that connects, converts, and resonates.
              </div>
            </div>
            <div className="hero-main w-full">
              <div className="heading-hero-block flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-8">
                <h1 className="main-text font-extrabold leading-tight"> {/* Use the new 'main-text' class */}
                  AI-Driven{" "}
                  <a
                    href="#"
                    className="typewrite text-white"
                    data-period="2000"
                    data-type='[ "Copy", "Human", "Touch" ]'
                  >
                    <span className="wrap"></span>
                  </a>
                </h1>
                <h1 id="hero-cursor" className="font-extrabold leading-tight animation1"> {/* Use the new cursor styles defined in CSS */}
                  _
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="project" className="py-16 bg-gray-100">
        <ImageGallery />
      </section>
      <section id="services" className="py-16 bg-white">
        <Services />
        <ServiceItem />
      </section>
      <section id="testimonials" className="py-16 bg-gray-100">
        <Testimonials />
      </section>
      <section id="contact" className="py-16 bg-white">
        <Contact />
      </section>
      <section className="bg-black text-white py-8">
        <Footer />
      </section>
    </div>
  );
};

export default Main;