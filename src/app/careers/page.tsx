"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import "../../styles/about.css";
import Image from "next/image";
import {
  careerData,
  CareerItem,
  faqData,
  FAQItem,
  Testimonial,
  testimonials,
} from "../../data/careerData";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "../../styles/career.css";
import Link from "next/link";

export default function AboutSection() {
  const [visibleCards, setVisibleCards] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll<HTMLElement>(
        `.${"scrollReveal"}`
      );
      elements.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setVisibleCards((prev) => ({ ...prev, [i]: true }));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const buildData = [
    {
      letter: "B",
      title: "Brainstorming",
      text: "We spark fresh ideas, fuel creativity, and embrace new perspectives.",
    },
    {
      letter: "U",
      title: "Unity",
      text: "We value teamwork, collaboration, and ensure every voice is heard.",
    },
    {
      letter: "I",
      title: "Integrity",
      text: "We uphold ethics, transparency, responsibility, and trust.",
    },
    {
      letter: "L",
      title: "Leadership",
      text: "We foster mentorship, skill growth, and lifelong learning.",
    },
    {
      letter: "D",
      title: "Diversity",
      text: "We respect differences, share strengths, and thrive inclusively.",
    },
  ];

  return (
    <>
      {/* About */}
      <section className="pt-5 who-we-are-section">
        <Container>
          <Row className="align-items-center">
            {/* Left Side: Icons */}
            <Col md={5}>
              <video
                src="/images/careers/intro.mp4"
                width="500"
                height="300"
                // controls 
                style={{ borderRadius: "12px", objectFit: "cover" }}
                // poster="/images/about.jpg" 
                autoPlay={true}
                muted={true}
                loop={true}
              >
                Your browser does not support the video tag.
              </video>
            </Col>

            <Col md={7} className="ps-md-5 mt-4 mt-md-0">
              <p className="section-subtitle">Work With Us</p>
              <h2 className="section-title">
                Build <span>your</span> Tomorrow with<span> Us</span> Today
              </h2>
              <p>
                In the last 15 years, we have not only built healthcare
                infrastructure but also nurtured careers. Our multidisciplinary
                team brings together architects, engineers, project managers,
                designers, healthcare specialists, marketers, recruiters, and
                many more professionals who drive our vision forward. At Infra
                Health, employees don’t work <i>for</i> us, they work{" "}
                <i>with</i> us, contributing as partners in building the future
                of healthcare. Opportunities span across diverse functions,
                ensuring that talent from every discipline finds a place to grow
                and thrive.
              </p>
              <p>
                If you are passionate about contributing to the future of
                healthcare, explore our current openings and share your CV. We
                look forward to connecting with you. <br />
                <br />
                Brick by brick, step by step, let’s build each other.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Philosophy */}
      <section className="pt-5 text-start">
        <Container>
          <p className="section-subtitle">You make us what we are</p>
          <h3 className="section-title">
            Why work at<span> Infra.health?</span>
          </h3>

          <Row className="g-3 justify-content-center">
            {buildData.map((item, index) => (
              <Col key={index} md className="d-flex">
                <div
                  className="p-4 rounded text-center flex-fill"
                  style={{
                    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: "#008080",
                      color: "#fff",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {item.letter}
                  </div>
                  <h5>{item.title}</h5>
                  <p>{item.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      {/* Openings */}
      <section className="pt-5 text-start">
        <Container>
          <p className="section-subtitle">Our Opportunities</p>
          <h3 className="section-title">
            Explore <span> your </span> career with <span> Infra.health</span>
          </h3>

          <Row className="careers g-4">
            {careerData.map((job: CareerItem) => (
              <Col key={job.sr} md={3} className="feature-card">
                <h3>
                  <span>{job.designation}</span>
                </h3>
                <p>
                  <strong>Openings:</strong> {job.openings} <br />
                  <strong>Qualification:</strong> {job.qualification} <br />
                  <strong>Experience:</strong> {job.exp}
                </p>
                {/* <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                > */}
                <Link
                  href={`/careers/application-form?designation=${encodeURIComponent(
                    job.designation
                  )}`}
                  className="btn btn-outline-secondary btn-sm text-decoration-none"
                >
                  Apply Now
                </Link>
                {/* </button> */}
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      {/* TESTIMONIALS */}
      <section className="testimonials py-5">
        <Container>
          <p className="section-subtitle">Our Testimonials</p>
          <h3 className="section-title mb-4">
            Read why Our <span>Employees love Us</span>
          </h3>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((t: Testimonial, i: number) => (
              <SwiperSlide key={i}>
                <div className="t-card d-flex flex-column justify-content-between">
                  <div>
                    <h4>{t.name}</h4>
                    <p className="role">{t.role}</p>
                    {t.reviews.map((r, j) => (
                      <p key={j} className="review">
                        {r}
                      </p>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </section>
      {/* FAQs */}
      <section className="pt-5 text-start">
        <Container>
          <p className="section-subtitle">FAQ</p>
          <h3 className="section-title">
            Frequently Asked <span>Questions</span>
          </h3>

          <Row className="g-4">
            {/* Split data into 2 columns */}
            <Col md={6}>
              <Accordion alwaysOpen className="customAccordion">
                {faqData
                  .filter((faq: FAQItem) => faq.id <= 2)
                  .map((faq) => (
                    <Accordion.Item eventKey={faq.id.toString()} key={faq.id}>
                      <Accordion.Header>{faq.question}</Accordion.Header>
                      <Accordion.Body>{faq.answer}</Accordion.Body>
                    </Accordion.Item>
                  ))}
              </Accordion>
            </Col>

            <Col md={6}>
              <Accordion alwaysOpen className="customAccordion">
                {faqData
                  .filter((faq: FAQItem) => faq.id > 2)
                  .map((faq) => (
                    <Accordion.Item eventKey={faq.id.toString()} key={faq.id}>
                      <Accordion.Header>{faq.question}</Accordion.Header>
                      <Accordion.Body>{faq.answer}</Accordion.Body>
                    </Accordion.Item>
                  ))}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
