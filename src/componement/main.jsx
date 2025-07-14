import React, { useEffect } from "react";
import "../App.css";
import ImageGallery from "./ImageGallery";
import Services from "./services";
import ServiceItem from "./ServiceItem";
import Testimonials from "./Testimonials";
import Contact from "./contact";
import Footer from "./footer";

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

    // INJECT CSS
    const css = document.createElement("style");
    css.type = "text/css";
    document.body.appendChild(css);

    // Cleanup on unmount
    return () => {
      if (css.parentNode) css.parentNode.removeChild(css);
    };
  }, []);

  return (
    <div className="main">
      <section className="section-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-meta">
              <div className="heading-style-h7 text-color-n700">
                We are PromptCrafted Studio, an AI Prompt Engineer with a
                Copywriter's soul. I blend strategic language with powerful AI
                tools to deliver copy that connects, converts, and resonates.
              </div>
            </div>
            <div className="hero-main">
              <div className="heading-hero-block">
                <h1 className="heading-style-h1">
                  AI-Driven{" "}
                  <a
                    href="#"
                    className="typewrite"
                    data-period="2000"
                    data-type='[ "Copy", "Human", "Touch" ]'
                  >
                    <span className="wrap"></span>
                  </a>
                </h1>
                <h1 id="hero-cursor" className="heading-style-h1 animation1">
                  _
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="project">
        <ImageGallery />
      </section>
      <section id="services">
        <Services />
        <ServiceItem />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Main;