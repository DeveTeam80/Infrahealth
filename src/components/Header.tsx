"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Row, Col, NavDropdown } from "react-bootstrap";
import { IoMdArrowDropdown } from "react-icons/io";
import "../styles/header.css";
import TalkToUsModal from "./TalktoUsModal";
import ReactCountryFlag from "react-country-flag";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [hideTopBar, setHideTopBar] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [country, setCountry] = useState("IN");
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState("consult");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
    console.log(e.target.value);
  };

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowMenu(null);
    }, 200); // 👈 small delay prevents flicker
  };
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
                    <NavDropdown.Item as={Link} href="/services/consult">
                      Hospital Management Consultancy
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/services/consult">
                      Hospital Design
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/services/consult">
                      Project Management Consultancy
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/services/consult">
                      Equipment Planning & Integration
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/services/consult">
                      Public Private Partnership (PPP) Advisory
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/services/consult">
                      Hospital ESG Advisory Services
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/services/consult">
                      Hospital Green Building Consultancy
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/services/consult">
                      Facility Management Consultancy
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/services/consult">
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
                          {/* LEFT COLUMN (Categories) */}
                          <Col md={3} className="megaCategories">
                            <ul className="megaParentList">
                              <li
                                onMouseEnter={() =>
                                  setActiveCategory("consult")
                                }
                                className={
                                  activeCategory === "consult" ? "active" : ""
                                }
                              >
                                <Link href="/services/consult">
                                  <strong>Consult</strong>
                                  <br />
                                  <small>
                                    Shaping strategies with precision
                                  </small>
                                </Link>
                              </li>
                              <li
                                onMouseEnter={() =>
                                  setActiveCategory("construct")
                                }
                                className={
                                  activeCategory === "construct" ? "active" : ""
                                }
                              >
                                <Link href="/services/construct">
                                  <strong>Construct</strong>
                                  <br />
                                  <small>Bringing ideas to life</small>
                                </Link>
                              </li>
                              <li
                                onMouseEnter={() =>
                                  setActiveCategory("operate")
                                }
                                className={
                                  activeCategory === "operate" ? "active" : ""
                                }
                              >
                                <Link href="/services/operate">
                                  <strong>Operate</strong>
                                  <br />
                                  <small>Sustaining excellence in use</small>
                                </Link>
                              </li>
                              <li
                                onMouseEnter={() =>
                                  setActiveCategory("solutions")
                                }
                                className={
                                  activeCategory === "solutions" ? "active" : ""
                                }
                              >
                                <Link href="/services/solutions">
                                  <strong>Solutions</strong>
                                  <br />
                                  <small>
                                    Tailored infrastructure for healthcare
                                  </small>
                                </Link>
                              </li>
                            </ul>
                          </Col>

                          {/* RIGHT COLUMN (Children) */}
                          <Col md={9} className="megaChildren">
                            {activeCategory === "consult" && (
                              <ul className="megaList">
                                <li>
                                  <Link href="/services/consult">
                                    <strong>
                                      Hospital Management Consultancy
                                    </strong>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/consult">
                                    <strong>Hospital Design</strong>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/consult">
                                    <strong>
                                      Project Management Consultancy
                                    </strong>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/consult">
                                    <strong>
                                      Equipment Planning & Integration
                                    </strong>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/consult">
                                    <strong>
                                      Public Private Partnership (PPP) Advisory
                                    </strong>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/consult">
                                    <strong>
                                      Hospital ESG Advisory Services
                                    </strong>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/consult">
                                    <strong>
                                      Hospital Green Building Consultancy
                                    </strong>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/consult">
                                    <strong>
                                      Facility Management Consultancy
                                    </strong>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/consult">
                                    <strong>Accreditation Advisory</strong>
                                  </Link>
                                </li>
                              </ul>
                            )}

                            {activeCategory === "construct" && (
                              <ul className="megaList">
                                <li>
                                  <Link href="/services/construct">
                                    <strong>
                                      Engineering, Procurement & Construction
                                    </strong>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/construct">
                                    <strong>Design & Build</strong>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/construct">
                                    <strong>Fitout & Retrofit</strong>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/construct">
                                    <strong>Specialty Services</strong>
                                  </Link>
                                </li>
                              </ul>
                            )}

                            {activeCategory === "operate" && (
                              <ul className="megaList">
                                <li>
                                  <Link href="/services/operate">
                                    <strong>Property Management</strong>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/operate">
                                    <strong>
                                      Integrated Facility Management Services
                                    </strong>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/operate">
                                    <strong>Operation & Maintenance</strong>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/operate">
                                    <strong>HR Support Services</strong>
                                  </Link>
                                </li>
                              </ul>
                            )}

                            {activeCategory === "solutions" && (
                              <ul className="megaList">
                                <li>
                                  <Link href="/services/solutions">
                                    <strong>
                                      Medical Institutions & Colleges
                                    </strong>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/solutions">
                                    <strong>Multispecialty Hospitals</strong>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/solutions">
                                    <strong>Modular Hospitals</strong>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/solutions">
                                    <strong>Government Hospitals</strong>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/solutions">
                                    <strong>Facilities</strong>
                                  </Link>
                                </li>
                              </ul>
                            )}
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

                {/* ---------------- Products ---------------- */}
                {isMobile ? (
                  <NavDropdown title="Products" id="products-nav-dropdown">
                    <NavDropdown.Item
                      as={Link}
                      href="/products/"
                    >
                      Modular Operation Theatres
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      href="/products/central-sterile-supply-department"
                    >
                      Central Sterile Supply Department
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      href="/products/medical-gas-pipeline-systems"
                    >
                      Medical Gas Pipeline Systems
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      href="/products/pneumatic-chutes"
                    >
                      Pneumatic Chutes
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      href="/products/hospital-furniture"
                    >
                      Hospital Furniture
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/products/pendants">
                      Pendants
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/products/walls">
                      Walls
                    </NavDropdown.Item>
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
                            <Link href="/products/">
                              <strong>Modular Operation Theatres</strong>
                              <br />
                              <small>
                                Precision-built for aseptic excellence
                              </small>
                            </Link>
                          </Col>
                          <Col>
                            <Link href="/products/central-sterile-supply-department">
                              <strong>Central Sterile Supply Department</strong>
                              <br />
                              <small>
                                Streamlined design for uncompromised sterility
                              </small>
                            </Link>
                          </Col>
                          <Col>
                            <Link href="/products/medical-gas-pipeline-systems">
                              <strong>Medical Gas Pipeline Systems</strong>
                              <br />
                              <small>
                                Reliable lifelines for critical care
                              </small>
                            </Link>
                          </Col>
                          <Col>
                            <Link href="/products/pneumatic-chutes">
                              <strong>Pneumatic Chutes</strong>
                              <br />
                              <small>
                                Fast, safe, and efficient material transport
                              </small>
                            </Link>
                          </Col>
                          <Col>
                            <Link href="/products/medical-furniture-solutions">
                              <strong>Hospital Furniture</strong>
                              <br />
                              <small>
                                Ergonomic solutions for patient comfort and care
                              </small>
                            </Link>
                          </Col>
                          <Col>
                            <Link href="/products/pendants">
                              <strong>Pendants</strong>
                              <br />
                              <small>
                                Optimized accessibility for critical equipment
                              </small>
                            </Link>
                          </Col>
                          <Col>
                            <Link href="/products/walls">
                              <strong>Walls</strong>
                              <br />
                              <small>
                                Advanced finishes for infection control and
                                durability
                              </small>
                            </Link>
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

                <Nav.Link
                  href="/properties"
                  className={`px-3 py-2 ${
                    pathname === "/properties" ? "active" : ""
                  }`}
                >
                  Properties
                </Nav.Link>

                <Nav.Link
                  href="/finance"
                  className={`px-3 py-2 ${
                    pathname === "/finance" ? "active" : ""
                  }`}
                >
                  Project Finance
                </Nav.Link>
              </Nav>

              <Nav className="ms-auto">
                {["about", "portfolio", "careers", "vendors", "news"].map(
                  (path) => (
                    <Nav.Link
                      key={path}
                      href={`/${path}`}
                      className={`px-3 py-2 ${
                        pathname === `/${path}` ? "active" : ""
                      }`}
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
