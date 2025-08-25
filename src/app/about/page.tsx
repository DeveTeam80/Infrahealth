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
      {/* Hero */}
      <section className="hero" id="hero">
        <div className="heroOverlay"></div>
        <div className="heroContent">
          <h3 className="subheading">One-Stop Solution for</h3>
          <h3>
            <span>Healthcare Infrastructure</span>
          </h3>
        </div>
      </section>

      {/* About */}
      <section className="about-section">
        <Container>
          <Row className="about-grid">
            <Col md={6} className="aboutImages">
              <img src="/images/home-abt.png" alt="Healthcare Team" />
            </Col>
            <Col md={6} className="aboutText">
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
                cost efficiency.
              </p>
              <p>
                We take pride in ensuring that patients receive world-class care
                without compromise, and that future healthcare professionals are
                equipped with the best learning environments.
              </p>
              <p>
                Now expanding globally, Infra.Health brings its expertise to
                emerging and developed markets worldwide.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Approach */}
      <section className="ourApproach">
        <Container>
          <p className="section-subtitle">Our Process</p>
          <h2 className="section-title">
            Our Approach to <span>Healthcare Infrastructure</span>
          </h2>

          <Row className="approachGrid">
            {[
              {
                title: "Multidisciplinary Expertise",
                text: "Our team includes architects, planners, project managers, engineers, chartered accountants, doctors, and more — ensuring every healthcare project is a masterpiece.",
              },
              {
                title: "World-Class Patient Care",
                text: "Patients receive uncompromised care. Future professionals are trained in the best environments, backed by 50+ successful projects.",
              },
              {
                title: "Client-Centered Execution",
                text: "Every project begins with understanding client needs. We execute their vision and provide expert consultation for optimal functionality.",
              },
              {
                title: "Commitment to Excellence",
                text: "Our engineers oversee planning, resources, and flawless execution. Client satisfaction remains our highest priority.",
              },
            ].map((card, i) => (
              <Col
                md={6}
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
              md={6}
              className={`${"mv-card"} ${"scrollReveal"} ${
                visibleCards[10] ? "visible" : ""
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
              md={6}
              className={`${"mv-card"} ${"scrollReveal"} ${
                visibleCards[11] ? "visible" : ""
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

      {/* Core Values */}
      <section className="core-values">
        <Container>
          <p className="section-subtitle">Our Core Values</p>
          <h3 className="section-title">
            Our Foundation for Trusted <span>Healthcare Solutions</span>
          </h3>

          <Row className="features">
            {[
              { icon: <FaAward />, title: "EXCELLENCE", text: "Setting new benchmarks in healthcare design, construction, and operations" },
              { icon: <FaLightbulb />, title: "INNOVATION", text: "Modular, digital, and green technologies for superior results" },
              { icon: <FaBalanceScale />, title: "INTEGRITY", text: "Transparent, ethical, and responsible business practices" },
              { icon: <FaHandshake />, title: "COLLABORATION", text: "Partnering with stakeholders for shared success" },
              { icon: <FaLeaf />, title: "SUSTAINABILITY", text: "Building for a greener, healthier future" },
            ].map((val, i) => (
              <Col key={i} md={4} className="featureCard">
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
