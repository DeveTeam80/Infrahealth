"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Row, Col, NavDropdown } from "react-bootstrap";
import { IoMdArrowDropdown } from "react-icons/io";
import "../styles/header.css";
import TalkToUsModal from "./TalktoUsModal";
import ReactCountryFlag from "react-country-flag";

export default function Header() {
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [hideTopBar, setHideTopBar] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [country, setCountry] = useState("IN");
  const [isMobile, setIsMobile] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
    console.log(e.target.value);
  };
  const handleMouseEnter = (menu: string) => setShowMenu(menu);
  const handleMouseLeave = () => setShowMenu(null);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 100) {
        setHideTopBar(true);
      } else {
        setHideTopBar(false);
      }
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 992);
    checkScreen(); // run once on mount
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <>
      <div
        className={`container top-bar border-top border-bottom bg-white d-flex align-items-center justify-content-between px-3 py-2 ${
          hideTopBar ? "hide" : ""
        }`}
      >
        <div className="d-flex align-items-center gap-2 logo">
          <Link href="/" passHref>
            <Image
              src="/images/logo/logoinfra.png"
              alt="Infra.Health"
              width={218}
              height={60}
            />
          </Link>
        </div>

<div className="d-flex align-items-center gap-3 justify-content-between justify-sm-start">
          <div
            className="d-flex align-items-center gap-1"
            style={{
              border: "1px solid #e98c46",
              borderRadius: "20px",
              padding: "10px 2px 10px 12px",
              cursor: "pointer",
            }}
          >
            <ReactCountryFlag
              countryCode={country}
              svg
              style={{ width: "1.5em", height: "1.5em" }}
            />
            <select
              className="form-select form-select-sm border-0"
              value={country}
              onChange={handleChange}
            >
              <option value="IN">India</option>
              <option value="US">USA</option>
              <option value="GB">UK</option>
              <option value="AE">UAE</option>
            </select>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setModalShow(true)}
            >
              Talk to Us
            </button>
          </div>
        </div>
      </div>

      <header className="sticky-header">
        <Navbar
          expand="lg"
          className="border-top border-bottom bg-white"
          collapseOnSelect
        >
          <Container>
            <Navbar.Brand as={Link} href="/" className="d-lg-none">
              <Image
                src="/images/logo/logoinfra.png"
                alt="Infra.Health"
                width={140}
                height={40}
              />
            </Navbar.Brand>

            {/* HAMBURGER */}
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
              <Nav className="me-auto align-items-lg-center align-items-start">
                {/* Services */}
                {isMobile ? (
                  // Mobile Dropdown
                  <NavDropdown title="Services" id="services-dropdown">
                    <NavDropdown.Item href="#consult">
                      Hospital Management Consultancy
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#design">
                      Hospital Design
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#pmc">
                      Project Management Consultancy
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#equipment">
                      Equipment Planning & Integration
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#ppp">
                      Public Private Partnership (PPP) Advisory
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#esg">
                      Hospital ESG Advisory Services
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#green">
                      Hospital Green Building Consultancy
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#facility">
                      Facility Management Consultancy
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#accreditation">
                      Accreditation Advisory
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
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
                        <Row>
                          {/* CONSULT */}
                          <Col md={4}>
                            <strong>Consult</strong>
                            <br />
                            <small>Shaping strategies with precision</small>
                            <ul className="megaList">
                              <li>Hospital Management Consultancy</li>
                              <li>Hospital Design</li>
                              <li>Project Management Consultancy</li>
                              <li>Equipment Planning & Integration</li>
                              <li>Public Private Partnership (PPP) Advisory</li>
                              <li>Hospital ESG Advisory Services</li>
                              <li>Hospital Green Building Consultancy</li>
                              <li>Facility Management Consultancy</li>
                              <li>Accreditation Advisory</li>
                            </ul>
                          </Col>

                          {/* CONSTRUCT */}
                          <Col md={4}>
                            <strong>Construct</strong>
                            <br />
                            <small>Bringing ideas to life</small>
                            <ul className="megaList">
                              <li>Engineering, Procurement & Construction</li>
                              <li>Design & Build</li>
                              <li>Fitout & Retrofit</li>
                              <li>Specialty Services</li>
                            </ul>
                          </Col>

                          {/* OPERATE */}
                          <Col md={4}>
                            <strong>Operate</strong>
                            <br />
                            <small>Sustaining excellence in use</small>
                            <ul className="megaList">
                              <li>Property Management</li>
                              <li>Integrated Facility Management Services</li>
                              <li>Operation & Maintenance</li>
                              <li>HR Support Services</li>
                            </ul>
                          </Col>
                        </Row>

                        <hr className="megaDivider" />
                        <p className="megaTagline">
                          From vision to execution, we deliver integrated
                          healthcare solutions.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Products */}
                {isMobile ? (
                  <NavDropdown title="Products" id="products-nav-dropdown">
                    <NavDropdown.Item href="#">
                      Modular Operation Theatres
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#">
                      Central Sterile Supply Department
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#">
                      Medical Gas Pipeline Systems
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#">
                      Pneumatic Chutes
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#">
                      Hospital Furniture
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#">Pendants</NavDropdown.Item>
                    <NavDropdown.Item href="#">Walls</NavDropdown.Item>
                  </NavDropdown>
                ) : (
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
                        <Row>
                          <Col>
                            <strong>Modular Operation Theatres</strong>
                            <br />
                            <small>
                              Precision‑built for aseptic excellence
                            </small>
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
                              Advanced finishes for infection control and
                              durability
                            </small>
                          </Col>
                        </Row>
                        <hr className="megaDivider" />
                        <p className="megaTagline">
                          Engineered innovations for modern healthcare
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Solutions */}
                {isMobile ? (
                  <NavDropdown title="Solutions" id="solutions-nav-dropdown">
                    <NavDropdown.Item href="#">
                      Medical Institutions & Colleges
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#">
                      Multispecialty Hospitals
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#">
                      Modular Hospitals
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#">
                      Government Hospitals
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#">Facilities</NavDropdown.Item>
                  </NavDropdown>
                ) : (
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
                )}
                <Nav.Link href="/finance" className="px-3 py-2">
                  Properties
                </Nav.Link>

                <Nav.Link href="/finance" className="px-3 py-2">
                  Finance
                </Nav.Link>
                <Nav.Link href="/invest" className="px-3 py-2">
                  Invest
                </Nav.Link>
              </Nav>

              <Nav className="ms-auto">
                {["about", "portfolio", "careers", "vendors", "news"].map(
                  (path) => (
                    <Nav.Link
                      key={path}
                      href={`/${path}`}
                      className="px-3 py-2"
                    >
                      {path.charAt(0).toUpperCase() + path.slice(1)}
                    </Nav.Link>
                  )
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <TalkToUsModal show={modalShow} handleClose={() => setModalShow(false)} />
    </>
  );
}
