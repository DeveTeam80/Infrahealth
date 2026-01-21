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

  useEffect(() => {
    setShowMenu(null);
  }, [pathname]);

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
          {/* <div
    className="d-flex align-items-center gap-1"
    style={{
      border: "1px solid #b6520f",
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
      <option value="AE">UAE</option>
      <option value="AF">Africa</option>
    </select>
  </div> */}
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
                      Consult
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/services/construct">
                      Construct
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/services/operate">
                      Operate
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/services/solutions">
                      Solutions
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
                          <Col md={3} className="megaChildren">
                            {activeCategory === "consult" && (
                              <ul className="megaList">
                                {/* <li>
                                  <Link href="/services/consult">
                                    Hospital Management Consultancy
                                  </Link>
                                </li> */}
                                <li>
                                  <Link href="/services/consult">
                                    Hospital Design
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/consult">
                                    Project Management Consultancy
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/consult">
                                    Equipment Planning & Integration
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/consult">
                                    Public Private Partnership (PPP) Advisory
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/consult">
                                    Hospital ESG Advisory Services
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/consult">
                                    Hospital Green Building Consultancy
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/consult">
                                    Facility Management Consultancy
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/consult">
                                    Accreditation Advisory
                                  </Link>
                                </li>
                              </ul>
                            )}

                            {activeCategory === "construct" && (
                              <ul className="megaList">
                                <li>
                                  <Link href="/services/construct">
                                    Engineering, Procurement & Construction
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/construct">
                                    Design & Build
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/construct">
                                    Fitout & Retrofit
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/construct">
                                    Specialty Services
                                  </Link>
                                </li>
                              </ul>
                            )}

                            {activeCategory === "operate" && (
                              <ul className="megaList">
                                <li>
                                  <Link href="/services/operate">
                                    Property Management
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/operate">
                                    Integrated Facility Management Services
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/operate">
                                    Operation & Maintenance
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/operate">
                                    HR Support Services
                                  </Link>
                                </li>
                              </ul>
                            )}

                            {activeCategory === "solutions" && (
                              <ul className="megaList">
                                <li>
                                  <Link href="/services/solutions">
                                    Medical Institutions & Colleges
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/solutions">
                                    Multispecialty Hospitals
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/solutions">
                                    Modular Hospital
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/solutions">
                                    Government Hospitals
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/services/solutions">
                                    Facilities
                                  </Link>
                                </li>
                              </ul>
                            )}
                          </Col>
                          <Col
                            md={5}
                            className="megaThumbnails position-relative ms-4"
                          >
                            {activeCategory === "consult" && (
                              <>
                                <Image
                                  src="/images/header1.jpg"
                                  alt="Consulting visual 1"
                                  width={280}
                                  height={180}
                                  className="thumb thumb1 rounded shadow"
                                />
                                <Image
                                  src="/images/header2.jpg"
                                  alt="Consulting visual 2"
                                  width={280}
                                  height={180}
                                  className="thumb thumb2 rounded shadow"
                                />
                              </>
                            )}

                            {activeCategory === "construct" && (
                              <>
                                <Image
                                  src="/images/journey/construction.jpg"
                                  alt="Construct visual 1"
                                  width={280}
                                  height={180}
                                  className="thumb thumb1 rounded shadow"
                                />
                                <Image
                                  src="/images/journey/site-survey.jpg"
                                  alt="Construct visual 2"
                                  width={280}
                                  height={180}
                                  className="thumb thumb2 rounded shadow"
                                />
                              </>
                            )}

                            {activeCategory === "operate" && (
                              <>
                                <Image
                                  src="/images/journey/facility.jpg"
                                  alt="Operate visual 1"
                                  width={280}
                                  height={180}
                                  className="thumb thumb1 rounded shadow"
                                />
                                <Image
                                  src="/images/journey/operations.jpg"
                                  alt="Operate visual 2"
                                  width={280}
                                  height={180}
                                  className="thumb thumb2 rounded shadow"
                                />
                              </>
                            )}

                            {activeCategory === "solutions" && (
                              <>
                                <Image
                                  src="/images/services/solutions/3.jpg"
                                  alt="Solutions visual 1"
                                  width={280}
                                  height={180}
                                  className="thumb thumb1 rounded shadow"
                                />
                                <Image
                                  src="/images/services/solutions/7.jpg"
                                  alt="Solutions visual 2"
                                  width={280}
                                  height={180}
                                  className="thumb thumb2 rounded shadow"
                                />
                              </>
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
                <Nav.Link
                  href="/products"
                  className={`px-3 py-2 ${
                    pathname === "/products" ? "active" : ""
                  }`}
                >
                  Products
                </Nav.Link>

                <Nav.Link
                  href="/properties"
                  className={`px-3 py-2 ${
                    pathname === "/properties" ? "active" : ""
                  }`}
                >
                  Properties
                </Nav.Link>

                <Nav.Link
                  href="/project-finance"
                  className={`px-3 py-2 ${
                    pathname === "/project-finance" ? "active" : ""
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
                  ),
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
