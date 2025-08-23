"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { IoMdArrowDropdown } from "react-icons/io";
import "../styles/header.css";
import TalkToUsModal from "./TalktoUsModal";
import { FaGlobe } from "react-icons/fa";

export default function Header() {
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [hideTopBar, setHideTopBar] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const handleMouseEnter = (menu: string) => setShowMenu(menu);
  const handleMouseLeave = () => setShowMenu(null);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 100) {
        setHideTopBar(true); // hide on scroll down
      } else {
        setHideTopBar(false); // show on scroll up
      }
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* --- TOP BAR --- */}
      <div
        className={`container top-bar border-top border-bottom bg-white d-flex align-items-center justify-content-between px-3 py-2 border-bottom ${
          hideTopBar ? "hide" : ""
        }`}
      >
        {/* Logo */}
        <div className="d-flex align-items-center gap-2">
          <a href="/">
            <Image
              src="/images/logo/logoinfra.png"
              alt="Infra.Health"
              width={160}
              height={50}
            />
          </a>
        </div>

        {/* Right side */}
        <div className="d-flex align-items-center gap-3">
          {/* Country Selector */}
          <div
            className="d-flex align-items-center gap-1"
            style={{
              border: "1px solid #000",
              borderRadius: "8px", // adjust the rounding as needed
              padding: "2px 8px",
              cursor: "pointer", // optional: to give some spacing inside
            }}
          >
            <FaGlobe />
            <select
              className="form-select form-select-sm border-0"
              onChange={(e) => console.log(e.target.value)}
            >
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
              <option>UAE</option>
            </select>
          </div>

          {/* Contact Us */}
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setModalShow(true)}
          >
            Talk to Us
          </button>
        </div>
      </div>
      <header className="sticky-header">
        {/* --- NAVBAR --- */}
        <Navbar expand="lg" className="border-top border-bottom bg-white">
          <Container>
            {/* Left Side Nav */}
            <Nav className="me-auto align-items-center">
              {/* Services */}
              <div
                className="px-3 py-2"
                onMouseEnter={() => handleMouseEnter("services")}
                onMouseLeave={handleMouseLeave}
              >
                <span className="nav-link">
                  Services <IoMdArrowDropdown />
                </span>
                {showMenu === "services" && (
                  <div className="megaMenu shadow p-4 bg-white">
                    {/* <h6 className="mb-3">From vision to execution</h6> */}
                    <Row>
                      <Col>
                        <strong>Consult</strong>
                        <br />
                        <small>Shaping strategies with precision</small>
                      </Col>
                      <Col>
                        <strong>Construct</strong>
                        <br />
                        <small>Bringing ideas to life</small>
                      </Col>
                      <Col>
                        <strong>Operate</strong>
                        <br />
                        <small>Sustaining excellence in use</small>
                      </Col>
                    </Row>
                    <hr className="megaDivider" />

                    <p className="megaTagline">
                      From vision to execution, we deliver integrated healthcare
                      solutions.
                    </p>
                  </div>
                )}
              </div>

              {/* Solutions */}
              <div
                className="px-3 py-2"
                onMouseEnter={() => handleMouseEnter("solutions")}
                onMouseLeave={handleMouseLeave}
              >
                <span className="nav-link">
                  Solutions <IoMdArrowDropdown />
                </span>
                {showMenu === "solutions" && (
                  <div className="megaMenu shadow p-4 bg-white">
                    {/* <h6 className="mb-3">
                      Tailored infrastructure for healthcare
                    </h6> */}
                    <Row>
                      <Col>
                        <strong>Medical Institutions & Colleges</strong>
                        <br />
                        <small>
                          Building healthcare foundations for the future
                        </small>
                      </Col>
                      <Col>
                        <strong>Multispecialty Hospitals</strong>
                        <br />
                        <small>Integrated systems for advanced care</small>
                      </Col>
                      <Col>
                        <strong>Modular Hospitals</strong>
                        <br />
                        <small>
                          Rapid, reliable, and scalable healthcare spaces
                        </small>
                      </Col>
                      <Col>
                        <strong>Government Hospitals</strong>
                        <br />
                        <small>
                          Strengthening public health infrastructure
                        </small>
                      </Col>
                      <Col>
                        <strong>Facilities</strong>
                        <br />
                        <small>
                          End-to-end support for efficient operations
                        </small>
                      </Col>
                    </Row>
                    <hr className="megaDivider" />

                    <p className="megaTagline">
                      Tailored infrastructure for healthcare
                    </p>
                  </div>
                )}
              </div>

              {/* Products */}
              <div
                className="px-3 py-2"
                onMouseEnter={() => handleMouseEnter("products")}
                onMouseLeave={handleMouseLeave}
              >
                <span className="nav-link">
                  Products <IoMdArrowDropdown />
                </span>
                {showMenu === "products" && (
                  <div className="megaMenu shadow p-4 bg-white">
                    {/* <h6 className="mb-3">
                      Engineered innovations for modern healthcare
                    </h6> */}
                    <Row>
                      <Col>
                        <strong>Modular Operation Theatres</strong>
                        <br />
                        <small>Precision-built for aseptic excellence</small>
                      </Col>
                      <Col>
                        <strong>Central Sterile Supply Department</strong>
                        <br />
                        <small>
                          Streamlined design for uncompromised sterility
                        </small>
                      </Col>
                      <Col>
                        <strong>Medical Gas Pipeline Systems</strong>
                        <br />
                        <small>Reliable lifelines for critical care</small>
                      </Col>
                      <Col>
                        <strong>Pneumatic Chutes</strong>
                        <br />
                        <small>
                          Fast, safe, and efficient material transport
                        </small>
                      </Col>
                      <Col>
                        <strong>Hospital Furniture</strong>
                        <br />
                        <small>
                          Ergonomic solutions for patient comfort and care
                        </small>
                      </Col>
                      <Col>
                        <strong>Pendants</strong>
                        <br />
                        <small>
                          Optimized accessibility for critical equipment
                        </small>
                      </Col>
                      <Col>
                        <strong>Walls</strong>
                        <br />
                        <small>
                          Advanced finishes for infection control and durability
                        </small>
                      </Col>
                    </Row>{" "}
                    <hr className="megaDivider" />
                    <p className="megaTagline">
                      Engineered innovations for modern healthcare
                    </p>
                  </div>
                )}
              </div>

              {/* Simple Links */}
              <Nav.Link href="/finance" className="px-3 py-2">
                Finance
              </Nav.Link>
              <Nav.Link href="/invest" className="px-3 py-2">
                Invest
              </Nav.Link>
            </Nav>

            {/* Right Side Nav */}
            <Nav className="ms-auto">
              <Nav.Link href="/about" className="px-3 py-2">
                About
              </Nav.Link>
              <Nav.Link href="/portfolio" className="px-3 py-2">
                Portfolio
              </Nav.Link>
              <Nav.Link href="/careers" className="px-3 py-2">
                Careers
              </Nav.Link>
              <Nav.Link href="/vendors" className="px-3 py-2">
                Vendors
              </Nav.Link>
              <Nav.Link href="/news" className="px-3 py-2">
                News
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <TalkToUsModal show={modalShow} handleClose={() => setModalShow(false)} />
    </>
  );
}
