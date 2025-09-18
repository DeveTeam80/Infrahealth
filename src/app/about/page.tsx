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
import Image from "next/image";
import { FaGlobe, FaBoxes, FaHospital } from "react-icons/fa";
import { FaBed } from "react-icons/fa6";

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

useEffect(() => {
  const counters = document.querySelectorAll<HTMLElement>(".counter");

  const runCounter = (counter: HTMLElement) => {
    const target = +counter.getAttribute("data-to")!;
    const suffix = counter.getAttribute("data-suffix") || "";
    const from = +(counter.getAttribute("data-from") || "0"); // 👈 support data-from
    const useCommas = counter.getAttribute("data-commas") !== "false"; // 👈 support data-commas

    let count = from;
    const duration = 2000; // total animation time in ms
    const frameRate = 60;
    const totalFrames = Math.round((duration / 1000) * frameRate);
    const increment = (target - from) / totalFrames;

    let frame = 0;
    const update = () => {
      frame++;
      count += increment;
      if (frame < totalFrames) {
        counter.textContent = (useCommas
          ? Math.floor(count).toLocaleString()
          : Math.floor(count).toString()) + suffix;
        requestAnimationFrame(update);
      } else {
        counter.textContent = (useCommas
          ? target.toLocaleString()
          : target.toString()) + suffix;
      }
    };
    update();
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter(entry.target as HTMLElement);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
  return () => observer.disconnect();
}, []);


  return (
    <>
      {/* About */}
      <section className="about-difference pt-0">
        <Container>
          <div className="about-grid">
            <div className="counters">
              <div className="counter-box">
                <div className="counter-number">
                  <span
                    className="counter"
                    data-from="2000"
                    data-to="2013"
                    data-suffix=""
                    data-commas="false"
                  >
                    2013
                  </span>
                </div>
                <p>Journey Started</p>
              </div>

              <div className="counter-box">
                <div className="counter-number">
                  <span className="counter" data-to="120" data-suffix="+">
                    120+
                  </span>
                </div>
                <p>Team Members</p>
              </div>

              <div className="counter-box">
                <div className="counter-number">
                  <span className="counter" data-to="70" data-suffix="+">
                    70+
                  </span>
                </div>
                <p>Projects Done</p>
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
      {/* Global Market Positioning & Expansion Strategy */}
      <section className="global-strategy-section py-5">
        <Container>
          <p className="section-subtitle">Global Presence</p>
          <h3 className="section-title mb-4">
            Global Market Positioning & <span>Expansion Strategy</span>
          </h3>
          <p className="text-muted mb-5">
            Infra.Health operates at the intersection of healthcare expertise,
            engineering innovation, and strategic investment, offering
            end-to-end solutions from concept to commissioning. We are not just
            a builder — we are an advisor, financier, designer, constructor,
            operator, and innovator — making Infra.Health the only truly
            integrated healthcare infrastructure partner in the global market.
          </p>

          <Row className="text-center">
            {[
              {
                icon: <FaGlobe className="strategy-icon" />,
                title: "Healthcare Transaction Advisory",
                text: "Supporting global investors with specialized healthcare deals.",
              },
              {
                icon: <FaHandshake className="strategy-icon" />,
                title: "Cross-Border PPP & FDI",
                text: "Facilitating Public-Private Partnerships and Foreign Direct Investment.",
              },
              {
                icon: <FaBed className="strategy-icon" />,
                title: "Export of Modular Products",
                text: "Delivering advanced modular healthcare solutions worldwide.",
              },
              {
                icon: <FaHospital className="strategy-icon" />,
                title: "International Operator Partnerships",
                text: "Collaborating with global hospital operators to enhance healthcare delivery.",
              },
            ].map((item, i) => (
              <Col md={3} sm={6} key={i} className="mb-4">
                <div className="strategy-card p-4 h-100">
                  <div className="mb-3" style={{ color: "#b6520f" }}>
                    {item.icon}
                  </div>
                  <h5 className="mb-2">{item.title}</h5>
                  <p className="text-muted">{item.text}</p>
                </div>
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
