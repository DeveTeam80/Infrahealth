"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaAward,
  FaLightbulb,
  FaBalanceScale,
  FaHandshake,
  FaLeaf,
} from "react-icons/fa";
import "../../styles/about.css";
import Image from "next/image";

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

  return (
    <>
      {/* About */}
      <section className="about-difference">
        <Container>
          <div className="about-grid">
              <div className="counters">
              <div className="counter-box">
                <div className="counter-number">
                  <span className="counter" data-to="10" data-suffix="M SF+">
                    10M SF+
                  </span>
                </div>
                <p>Healthcare Spaces Designed & Operated</p>
              </div>
              <div className="counter-box">
                <div className="counter-number">
                  <span className="counter" data-to="100" data-suffix="+">
                    100+
                  </span>
                </div>
                <p>Multi‑Disciplinary Team</p>
              </div>
              <div className="counter-box">
                <div className="counter-number">
                  <span className="counter" data-to="5000" data-suffix="+">
                    5000+
                  </span>
                </div>
                <p>
                  Beds Inpatient, Outpatient Medical Office & Support Facilities
                  under Management
                </p>
              </div>
            </div>
            <div className="about-images">
              <Image
                src="/images/hero/abt-home.png"
                alt="Healthcare Team"
                width={600}
                height={500}
              />
            </div>
            <div className="about-text">
              <p className="section-subtitle">About Infra.Health</p>
              <h3 className="section-title">
                Who we <span>are?</span>
              </h3>
              <p>
                Infra.Health is a next-generation, multinational healthcare
                infrastructure company redefining how hospitals, medical cities,
                and advanced healthcare ecosystems are conceived, financed,
                built, and operated.
              </p>
              <p>
                With 50+ hospital projects across India, ranging from 100 to
                2,000 beds, Infra.Health collaborates with private healthcare
                providers, government agencies, and PPP entities to deliver
                world-class medical infrastructure at a high speed, quality, and
                cost efficiency. From setting up hospitals from the ground up to
                designing state-of-the-art facilities, we provide everything
                under one roof.
              </p>
              {/* <p>
                We take pride in ensuring that patients receive world-class care
                without compromise, and that future healthcare professionals are
                equipped with the best learning environments. With over 50
                successful projects, we are known for our deep understanding of
                healthcare needs, timely project delivery, and uncompromising
                quality standards.
              </p> */}
              <p>
                Now expanding globally, Infra.Health brings its expertise to
                emerging and developed markets worldwide, powered by FDI,
                international partnerships, advanced manufacturing, and digital
                healthcare innovation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Approach */}
      <section className="our-approach">
        <Container>
          <p className="section-subtitle">Our Process</p>
          <h2 className="section-title">
            Our Approach to <span>Healthcare Infrastructure</span>
          </h2>

          <Row className="approach-grid">
            {[
              {
                title: "Multidisciplinary Expertise",
                text: "Our team includes architects, planners, project managers, engineers, chartered accountants, company secretaries, legal experts, doctors, and medical specialists, working seamlessly to ensure every healthcare project is a masterpiece of design, operational efficiency, and patient care.",
              },
              {
                title: "World-Class Patient Care",
                text: "We take pride in ensuring that patients receive world-class care without compromise. Future healthcare professionals are also equipped with the best learning environments, backed by over 50 successful projects delivered with quality and precision.",
              },
              {
                title: "Client-Centered Execution",
                text: "Every project begins with a detailed understanding of client requirements. We not only execute their vision but also provide expert consultation for optimal design and functionality at every stage.",
              },
              {
                title: "Commitment to Excellence",
                text: "Our skilled engineers and project managers oversee planning, resource management, and flawless execution. Client satisfaction remains our highest priority, strengthened by long-term relationships, positive testimonials, and continuous improvement.",
              },
            ].map((card, i) => (
              <Col
                md={12}
                key={i}
                className={`${"approach-card"} ${"scrollReveal"} ${
                  visibleCards[i] ? "visible" : ""
                }`}
              >
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="mv-section">
        <Container>
          <p className="section-subtitle">Guiding Principles</p>
          <h2 className="section-title">
            Our <span>Vision & Mission</span>
          </h2>
          <Row className="mv-grid">
            <Col
              md={12}
              className={`${"mv-card"} ${"scrollReveal"} ${
                visibleCards[0] ? "visible" : ""
              }`}
            >
              <h3>Our Vision</h3>
              <p>
                To be the world’s most trusted partner in healthcare
                infrastructure, delivering sustainable, tech-advanced healthcare
                environments that improve outcomes.
              </p>
            </Col>
            <Col
              md={12}
              className={`${"mv-card"} ${"scrollReveal"} ${
                visibleCards[1] ? "visible" : ""
              }`}
            >
              <h3>Our Mission</h3>
              <p>
                To transform healthcare delivery by providing integrated,
                finance-backed infrastructure solutions, combining innovative
                design, precision engineering, and lifecycle operations.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Core Commitments */}
      <section className="py-5 who-we-are-section">
        <Container>
          <Row className="align-items-center">
            {/* Left Side: Icons */}
            <Col md={6}>
              <Image
                src="/images/about.jpg"
                alt="Healthcare Team"
                width={550}
                height={300}
                style={{ borderRadius: "12px" }}
              />
            </Col>

            <Col md={6} className="ps-md-5 mt-4 mt-md-0">
              <p className="section-subtitle">Why Choose Us</p>
              <h2 className="section-title">
                Our <span>Core Commitments</span>
              </h2>
              <ul className="mt-3 core-ul">
                <li>
                  Deliver innovative solutions using <strong>AI</strong>,
                  modular construction, and digital twin technology
                </li>
                <li>
                  Focus on green buildings, <strong>LEED-certified</strong>
                  energy-efficient medical facilities
                </li>
                <li>
                  Ensure <strong>360° delivery</strong> with a collaborative
                  team of experts from different disciplines
                </li>
                <li>
                  No compromise in <strong>quality</strong> and standards
                </li>
                <li>
                  Enhance <strong>patient experience</strong> and healthcare
                  outcomes
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Core Values */}
      <section className="core-values">
        <Container>
          <p className="section-subtitle">Our Core Values</p>
          <h2 className="section-title">
            Our Foundation for Trusted <span>Healthcare Solutions</span>
          </h2>
          <Row className="features">
            {[
              {
                icon: <FaAward />,
                title: "EXCELLENCE",
                text: "Setting new benchmarks in healthcare design, construction, and operations",
              },
              {
                icon: <FaLightbulb />,
                title: "INNOVATION",
                text: "Modular, digital, and green technologies for superior results",
              },
              {
                icon: <FaBalanceScale />,
                title: "INTEGRITY",
                text: "Transparent, ethical, and responsible business practices",
              },
              {
                icon: <FaHandshake />,
                title: "COLLABORATION",
                text: "Partnering with stakeholders for shared success",
              },
              {
                icon: <FaLeaf />,
                title: "SUSTAINABILITY",
                text: "Building for a greener, healthier future",
              },
            ].map((val, i) => (
              <Col key={i} md={3} className="feature-card">
                <div className="icon">{val.icon}</div>
                <h3>
                  <span>{val.title}</span>
                </h3>
                <p>{val.text}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}
