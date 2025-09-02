"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, Row, Col, Card, Nav, Button } from "react-bootstrap";
import { FaTags, FaStore } from "react-icons/fa";
import "../styles/home.css";
import TalkToUsModal from "../components/TalktoUsModal";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { homeData } from "@/data/homeData";

export default function Home() {
  const { words, services, projects, testimonials, blogs, journeyTabs } =
    homeData;
  const [currentWord, setCurrentWord] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [activeKey, setActiveKey] = useState(journeyTabs[0].key);
  const activeTab = journeyTabs.find((tab: any) => tab.key === activeKey)!;

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentWord((prev) => (prev + 1) % words.length),
      2000
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>(".counter");
    const runCounter = (counter: HTMLElement) => {
      const target = +counter.getAttribute("data-to")!;
      const suffix = counter.getAttribute("data-suffix") || "";
      let count = 0;
      const increment = target / 200;
      const update = () => {
        count += increment;
        if (count < target) {
          counter.textContent = Math.floor(count) + suffix;
          requestAnimationFrame(update);
        } else {
          counter.textContent = target.toLocaleString() + suffix;
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
  }, [words.length]);

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero" id="hero">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source
            src="/images/hero/infra-banner.mp4"
            type="video/mp4"
            media="(min-width: 768px)"
          />
          {/* Mobile video */}
          <source
            src="/images/hero/infra-health-mobile.mp4"
            type="video/mp4"
            media="(max-width: 767px)"
          />
          Your browser does not support the video tag.
        </video>
        {/* <div className="hero-content">
          <h3 className="subheading">One‑Stop Solution for</h3>
          <h3 className="d-flex justify-space-evenly">
            <span>Healthcare </span>{" "}
            <span className="rotating-wrapper">
              <span className="rotating-text"> {words[currentWord]}</span>
            </span>
          </h3>
        </div> */}
        <div className="hero-bottom-box" aria-hidden="false">
          <Row className="d-flex align-items-center w-100">
            <Col md={10} className="cta-text">
              <h2>Looking to setup your own hospital?</h2>
              <p>
                Be it a multi‑speciality hospital, general hospital or a medical
                college or institute, we take care of everything from scoping
                and designing to building and equipping your hospital for you to
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
      </section>

      {/* ABOUT SECTION */}
      <section className="about-difference">
        <Container>
          <div className="about-grid">
            <div className="counters">
              <div className="counter-box">
                <div className="counter-number">
                  <span className="counter" data-to="10" data-suffix="M SF+">
                    10M SF+
                  </span>
                </div>
                <p>Healthcare Spaces Designed & Operated</p>
              </div>
              <div className="counter-box">
                <div className="counter-number">
                  <span className="counter" data-to="100" data-suffix="+">
                    100+
                  </span>
                </div>
                <p>Multi‑Disciplinary Team</p>
              </div>
              <div className="counter-box">
                <div className="counter-number">
                  <span className="counter" data-to="5000" data-suffix="+">
                    5000+
                  </span>
                </div>
                <p>
                  Beds Inpatient, Outpatient Medical Office & Support Facilities
                  under Management
                </p>
              </div>
            </div>

            <div className="about-images">
              <Image
                src="/images/hero/abt-home.png"
                alt="Healthcare Team"
                width={600}
                height={550}
              />
            </div>

            <div className="about-text">
              <p className="section-subtitle">About Infra.Health</p>
              <h3 className="section-title">
                What we <span>do?</span>
              </h3>
              <p>
                Infra.Health is a dedicated business focused exclusively on
                providing total life cycle real estate and facility solutions to
                the healthcare industry in India.
              </p>
              <br />
              <p>
                <strong>Hospitals:</strong> Specialising in modular hospitals,
                be it 30, 50, 70, 100 bed hospitals and EPC (Engineering,
                Procurement and Construction) for larger hospitals with higher
                bed sizes. Get the highest quality without the multi agency
                hassles all in one place.
                <br />
                <br />
                <strong>Medical Colleges and Institutes:</strong> Thorough
                understanding of the nuances of designing and building
                futuristic Medical colleges and Institutes for enabling the
                future generations to succeed on a global scale.
              </p>
              <div className="about-highlights">
                <div className="started">
                  <FaStore color="#2d8386" size={32} />
                  <h5 className="ms-2 mb-0">Started In 2013</h5>
                </div>
                <div className="projects">
                  <FaTags color="#2d8386" size={32} />
                  <h5 className="ms-2 mb-0">50+ Projects</h5>
                </div>
              </div>
              <Link href="/" className="btn">
                Know More
              </Link>
            </div>
          </div>
        </Container>
      </section>
      {/* WHY CHOOSE US */}
      <section className="why-choose-us py-5">
        <Container>
          <Row className="align-items-start justify-content-between">
            <p className="section-subtitle">Why Choose Us</p>
            <h3 className="section-title mb-4">
              From Concept to Care <span>Building Health,</span> Brick by Brick
            </h3>
            <Col lg={7} md={12} className="mb-4">
              <div className="why-image">
                <Image
                  src="/images/hero/abt.png"
                  alt="Infra.Health Building"
                  width={600}
                  height={400}
                  className="img-fluid rounded shadow"
                />
              </div>
            </Col>
            <Col lg={4} md={12}>
              <Card className="why-card mb-4">
                <Card.Body>
                  <h5>Scalable Hospitals</h5>
                  <p>
                    We provide hospitals that offer modifications and can be
                    scaled according to requirements. Customizable models with
                    30, 50, 70, and 100 bed capacities.
                  </p>
                </Card.Body>
              </Card>
              <Card className="why-card mb-4">
                <Card.Body>
                  <h5>Modular Operation Theatres</h5>
                  <p>
                    Efficient, economical, and durable theatres with laminar
                    airflow, high quality filters, and specialized surgical
                    lighting.
                  </p>
                </Card.Body>
              </Card>
              <Card className="why-card">
                <Card.Body>
                  <h5>Energy‑Efficient & Sustainable Systems</h5>
                  <p>
                    Focused on reducing energy consumption with efficient HVAC,
                    LED lighting, renewable energy, and waste management.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      {/* JOURNEY SECTION */}
      <section className="py-5 bg-light">
        <Container>
          {/* Heading */}
          <Row className="align-items-start justify-content-between">
            <p className="section-subtitle">How We Do It</p>
            <h3 className="section-title mb-4">
              Your journey from <span>Enquiry</span> to <span>Handover</span>
            </h3>
          </Row>

          {/* Tabs */}
          <Row className="justify-content-center mb-5">
            <Col md="12">
              <Nav
                variant="pills"
                className="nav-scroll gap-2"
                activeKey={activeKey}
                onSelect={(k) => setActiveKey(k || journeyTabs[0].key)}
              >
                {journeyTabs.map((tab) => (
                  <Nav.Item key={tab.key} className="flex-shrink-0">
                    <Nav.Link
                      eventKey={tab.key}
                      className={
                        activeKey === tab.key
                          ? "bg-danger text-white"
                          : "bg-white text-dark"
                      }
                      style={{
                        borderRadius: "8px",
                        fontWeight: 500,
                        border: "1px solid #e98c46",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {tab.label}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
          </Row>

          {/* Content */}
          <Row className="align-items-center">
            <Col md={6} className="mb-3 mb-md-0">
              <div className="d-flex align-items-center gap-2 mb-3">
                <h4 className="fw-bold">{activeTab.title}</h4>
              </div>
              <p className="text-muted">{activeTab.description}</p>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setModalShow(true)}
              >
                Contact Us
              </button>
            </Col>
            <Col md={6}>
              <Swiper spaceBetween={20} slidesPerView={1} loop>
                <SwiperSlide>
                  <Image
                    src={activeTab.image}
                    alt={activeTab.label}
                    width={500}
                    height={350}
                    className="rounded shadow"
                  />
                </SwiperSlide>
              </Swiper>
            </Col>
          </Row>
        </Container>
      </section>
      {/* SERVICES SLIDER */}
      <section className="services-slider py-5">
        <Container>
          <p className="section-subtitle">Our Services</p>
          <h3 className="section-title mb-4">
            Specialized Healthcare Infrastructure <span>Solutions</span>
          </h3>
          <div className="swiper-wrapper-container">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={3}
              loop
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="mySwiper"
            >
              {services.map((service, idx) => (
                <SwiperSlide key={idx}>
                  <div className="service-card">
                    <Image
                      src={service.img}
                      alt={service.title}
                      width={300}
                      height={200}
                    />
                    <div className="card-overlay">{service.title}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </Container>
      </section>
      {/* PORTFOLIO */}
      <section className="portfolio-section">
        <Container>
          <p className="section-subtitle">Our Portfolio</p>
          <h3 className="section-title">
            Specialized Healthcare Infrastructure <span>Solutions</span>
          </h3>
          <Row className="justify-content-center g-4 my-4">
            {projects.map((project) => (
              <Col key={project.id} xs={12} sm={6} md={4}>
                <div className="card project-card">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                  />
                  <div className="project-name">
                    <span className="ms-2">{project.title}</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div className="projects-bottom d-flex justify-content-between">
            <div className="bottom-cta">
              <h3 className="section-title">
                Let&apos;s Build Your{" "}
                <span className="highlight">Dream Healthcare Facility</span>
              </h3>
            </div>
            <div className="cta-buttons">
              <div className="btn primary-btn">View All Projects</div>
            </div>
          </div>
        </Container>
      </section>
      {/* TESTIMONIALS */}
      <section className="testimonials py-5">
        <Container>
          <p className="section-subtitle">Our Testimonials</p>
          <h3 className="section-title mb-4">
            Read why our <span>clients love us</span>
          </h3>
          <Swiper
            modules={[Autoplay]}
            // spaceBetween={20}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 1 }, // tablets
              1024: { slidesPerView: 3 }, // desktops
            }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="t-card d-flex flex-column justify-content-between">
                  <div>
                    <h4>{t.name}</h4>
                    <p className="role">{t.role}</p>
                    {t.reviews.map((r, j) => (
                      <p key={j} className="review">
                        {r}
                      </p>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </section>
      {/* BLOGS */}
      <section className="media-buzz py-5">
        <Container>
          <p className="section-subtitle">Our Blogs</p>
          <h2 className="section-title mb-4">
            Check out <span>Our latest Blogs</span>
          </h2>
          <Row className="justify-content-center g-4">
            {blogs.map((blog, i) => (
              <Col key={i} xs={12} md={6} lg={4}>
                <Card className="blog-card h-100 border-0 shadow-sm">
                  <Image
                    src={blog.img}
                    alt={blog.title}
                    width={400}
                    height={350}
                  />
                  <Card.Body className="card-content">
                    <Card.Title as="h3" className="h6">
                      {blog.title}
                    </Card.Title>
                    <Link href={blog.link} className="read-more p-0">
                      READ MORE &raquo;
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="explore-btn justify-content-center d-flex">
            <Link href="#">Explore More Blogs</Link>
          </div>
        </Container>
      </section>

      <TalkToUsModal show={modalShow} handleClose={() => setModalShow(false)} />
    </>
  );
}
