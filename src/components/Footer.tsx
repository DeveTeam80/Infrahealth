"use client";

import { Container, Row, Col } from "react-bootstrap";
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

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">
      <Container className="footer-container">
        {/* Left Column */}
        <Col xs={12} md={4} className="footer-logo mb-4">
          <a href="/">
            <img src="/images/logo/logoinfra.png" alt="Infra.health logo" />
          </a>
          <p>
            We design, build, and fund tomorrow’s healthcare ecosystems bridging
            healthcare vision with execution through strategy, capital, and
            technology.
          </p>
          <div className="social-icons">
            <a href="#">
              <FaLinkedinIn />
            </a>
            <a href="#">
              <FaYoutube />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
          </div>
        </Col>

        {/* Quick Links */}
        <Col xs={12} md={2} className="footer-links mb-4">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#">Portfolio</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Products</a>
            </li>
            <li>
              <a href="#">Finance</a>
            </li>
          </ul>
        </Col>

        {/* Services */}
        <Col xs={12} md={3} className="footer-links mb-4">
          <h4>Services</h4>
          <ul>
            <li>
              <a href="#">Design and Build</a>
            </li>
            <li>
              <a href="#">Project Management Consultancy</a>
            </li>
            <li>
              <a href="#">Planning and Design</a>
            </li>
            <li>
              <a href="#">Facility Management Services</a>
            </li>
            <li>
              <a href="#">Regulatory Compliance</a>
            </li>
          </ul>
        </Col>

        {/* Contact Info */}
        <Col xs={12} md={3} className="footer-links mb-4">
          <h4>Contact Info</h4>
          <ul>
            <li>
              <FaMapMarkerAlt className="me-2" /> 506, Supreme Headquarters,
              Near Tata Motors showroom, Near Pune Bangalore Highway, Baner,
              Pune-411045
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

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <a>Emerway Healthtech Private Limited™</a>
        </p>
      </div>

      {/* Scroll Top */}
      <div className="scroll-top" onClick={scrollToTop}>
        <FaArrowUp />
      </div>
    </footer>
  );
};

export default Footer;
