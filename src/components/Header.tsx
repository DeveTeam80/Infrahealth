"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaGlobe } from "react-icons/fa";
import "../styles/header.css";
import TalkToUsModal from "./TalktoUsModal";
import ReactCountryFlag from "react-country-flag";

export default function Header() {
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [hideTopBar, setHideTopBar] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [country, setCountry] = useState("IN");

  const handleChange = (e:any) => {
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

  return (
    <>
      <div
        className={`container top-bar border-top border-bottom bg-white d-flex align-items-center justify-content-between px-3 py-2 ${
          hideTopBar ? "hide" : ""
        }`}
      >
        <div className="d-flex align-items-center gap-2">
          <Link href="/" passHref>
            <Image
              src="/images/logo/logoinfra.png"
              alt="Infra.Health"
              width={218}
              height={60}
            />
          </Link>
        </div>

        <div className="d-flex align-items-center gap-3">
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
        <Navbar expand="lg" className="border-top border-bottom bg-white">
          <Container>
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
                    <Row>
                      <Col>
                        <strong>Modular Operation Theatres</strong>
                        <br />
                        <small>Precision‑built for aseptic excellence</small>
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
                    </Row>
                    <hr className="megaDivider" />
                    <p className="megaTagline">
                      Engineered innovations for modern healthcare
                    </p>
                  </div>
                )}
              </div>

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
                  <Nav.Link key={path} href={`/${path}`} className="px-3 py-2">
                    {path.charAt(0).toUpperCase() + path.slice(1)}
                  </Nav.Link>
                )
              )}
            </Nav>
          </Container>
        </Navbar>
      </header>

      <TalkToUsModal show={modalShow} handleClose={() => setModalShow(false)} />
    </>
  );
}
