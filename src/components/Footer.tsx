"use client";

import Link from "next/link";
import Image from "next/image";
import { Container, Col, Row } from "react-bootstrap";
import {
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";
import "../styles/footer.css";
import { useState } from "react";
import TalkToUsModal from "./TalktoUsModal";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div className="footer-cta-box" aria-hidden="false">
        <Row className="d-flex align-items-center w-100">
          <Col md={10} className="cta-text">
            <h2>Looking to setup your own hospital?</h2>
            <p>
              Be it a multi‑speciality hospital, general hospital or a medical
              college or institute, we take care of everything from scoping and
              designing to building and equipping your hospital for you to
              operate.
            </p>
          </Col>
          <Col md={2} className="text‑md‑end text‑center mt‑3 mt‑md‑0">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setModalShow(true)}
            >
              Talk to Us
            </button>
          </Col>
        </Row>
      </div>
      <footer className="footer">
        <Container className="footer-container">
          <Col xs={12} md={3} className="footer-logo mb-4">
            <Link href="/" passHref>
              <Image
                src="/images/logo/infrawhite.png"
                alt="Infra.health logo"
                width={218}
                height={60}
              />
            </Link>
            <p>
              We design, build, operate and fund tomorrow&apos;s healthcare
              ecosystems bridging healthcare vision with execution through
              strategy, capital, and technology.
            </p>
            <div className="social-icons">
              {[
                {
                  icon: FaFacebookF,
                  url: "https://www.facebook.com/profile.php?viewas=100000686899395&id=61579937188150",
                },
                {
                  icon: FaInstagram,
                  url: "https://www.instagram.com/infra.healthind/",
                },
                {
                  icon: FaLinkedinIn,
                  url: "https://www.linkedin.com/company/infra-health-india/",
                },
                { icon: FaTwitter, url: "https://x.com/infra_healthind" },
                {
                  icon: FaYoutube,
                  url: "https://www.youtube.com/@Infra.Health",
                },
              ].map(({ icon: Icon, url }, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                  <Icon />
                </a>
              ))}
            </div>
          </Col>

          <Col xs={12} md={2} className="footer-links mb-4">
            <h4>Quick Links</h4>
            <ul>
              {[
                "About",
                "Portfolio",
                "Careers",
                "Vendors",
                "Project Finance",
              ].map((text, i) => (
                <li key={i}>
                  <Link
                    href={`/${text.toLowerCase().replace(/\s+/g, "-")}`}
                    passHref
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={12} md={3} className="footer-links mb-4">
            <h4>Services</h4>
            <ul>
              {["Consult", "Construct", "Operate", "Solutions"].map(
                (text, i) => (
                  <li key={i}>
                    <Link href={`/services/${text.toLowerCase()}`} passHref>
                      {text}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </Col>

          <Col xs={12} md={4} className="footer-links mb-4">
            <h4>Contact Info</h4>
            <ul>
              <li>
                <FaMapMarkerAlt className="me-2" />
                <a
                  href="https://maps.app.goo.gl/TCcVZvUNq16BqLPC9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  506, Supreme Headquarters, Near Tata Motors showroom, Near
                  Pune Bangalore Highway, Baner, Pune-411045
                </a>
              </li>
              <li>
                <FaPhone className="me-2" />
                <a href="tel:+912045099895">+91 20 45099895</a>
              </li>
              <li>
                <FaPhone className="me-2" />
                <a href="tel:+919028155071">+91 9028155071</a>
              </li>
              <li>
                <FaEnvelope className="me-2" />
                <a href="mailto:contact@infra.health">contact@infra.health</a>
              </li>
            </ul>
          </Col>
        </Container>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Infra.health™ | Emerway Healthtech
            Private Limited
          </p>
        </div>

        <div className="scroll-top" onClick={scrollToTop}>
          <FaArrowUp />
        </div>
        <TalkToUsModal
          show={modalShow}
          handleClose={() => setModalShow(false)}
        />
      </footer>
    </>
  );
};

export default Footer;
