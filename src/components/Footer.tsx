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
        <Col xs={12} md={4} className="footer-logo mb-4">
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
            {[FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF, FaTwitter].map(
              (Icon, i) => (
                <a key={i} href="#">
                  <Icon />
                </a>
              )
            )}
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
              "Finance",
              "Invest",
            ].map((text, i) => (
              <li key={i}>
                <Link href="#" passHref>
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </Col>

        <Col xs={12} md={3} className="footer-links mb-4">
          <h4>Services</h4>
          <ul>
            {["Consult", "Construct", "Operate"].map((text, i) => (
              <li key={i}>
                <Link href="#" passHref>
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </Col>

        <Col xs={12} md={3} className="footer-links mb-4">
          <h4>Contact Info</h4>
          <ul>
            <li>
              <FaMapMarkerAlt className="me-2" />
              506, Supreme Headquarters, Near Tata Motors showroom, Near Pune
              Bangalore Highway, Baner, Pune-411045
            </li>
            <li>
              <FaPhone className="me-2" /> 02045099895
            </li>
            <li>
              <FaEnvelope className="me-2" /> contact@infra.health
            </li>
          </ul>
        </Col>
      </Container>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Infra.health | Emerway Healthtech
          Private Limited™
        </p>
      </div>

      <div className="scroll-top" onClick={scrollToTop}>
        <FaArrowUp />
      </div>
      <TalkToUsModal show={modalShow} handleClose={() => setModalShow(false)} />
    </footer>
    </>
  );
};

export default Footer;
