"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaTags, FaStore } from "react-icons/fa";
import "../styles/home.css";
import TalkToUsModal from "../components/TalktoUsModal";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

export default function Home() {
  const words = [
    "Infrastructure",
    "Real Estate",
    "Operations",
    "Consulting",
    "Construction",
    "Finance",
    "Investments",
  ];

  const services = [
    { img: "/images/services/1.jpg", title: "Design and Build" },
    { img: "/images/services/2.jpg", title: "Project Management Consultancy" },
    {
      img: "/images/services/3.jpg",
      title: "Engineering Procurement Construction (EPC)",
    },
    { img: "/images/services/4.jpg", title: "Planning and Design" },
    { img: "/images/services/5.jpg", title: "Facility Management Services" },
    {
      img: "/images/services/6.jpg",
      title: "Project Feasibility and Investment Advisory",
    },
    { img: "/images/services/7.jpg", title: "Regulatory Compliance" },
  ];

  const projects = [
    {
      id: 1,
      title: "Multispeciality & Cancer Hospital",
      image: "/images/projects/proj1.png",
    },
    {
      id: 2,
      title: "Dr. D.Y. Patil Hospital & Research Center",
      image: "/images/projects/proj2.png",
    },
    {
      id: 3,
      title: "Sub-district Hospital, Kopergaon",
      image: "/images/projects/proj3.jpg",
    },
  ];

  const testimonialsData = [
    {
      name: "Dr. Meera Kapoor",
      role: "Medical Director, Apex Hospitals",
      reviews: [
        "We are incredibly impressed by Infra.Health’s ability to deliver complex healthcare projects with such precision. Their execution was seamless and highly professional.",
        "From planning to handover, the team was proactive, collaborative, and attentive to every detail. Thank you for enabling us to deliver world-class infrastructure to our patients.",
      ],
    },
    {
      name: "Rakesh Menon",
      role: "Facility Head, Medilink Diagnostics",
      reviews: [
        "Infra.Health truly understands the dynamics of healthcare delivery. Their team showed unmatched commitment, ensuring the project was completed on time and fully compliant.",
        "We are especially grateful for their insights into optimizing patient flow through design. Exceptional experience!",
      ],
    },
    {
      name: "Dr. Anjali Verma",
      role: "Founder, UrbanCare Clinics",
      reviews: [
        "A big thank you to the Infra.Health team for turning our vision for a modern, modular clinic into reality. The quality of work was outstanding.",
        "Their understanding of healthcare needs and ability to deliver within tight timelines sets them apart. We look forward to more collaborations in the future.",
      ],
    },
    {
      name: "Dr. Meera Kapoor",
      role: "Medical Director, Apex Hospitals",
      reviews: [
        "We are incredibly impressed by Infra.Health’s ability to deliver complex healthcare projects with such precision. Their execution was seamless and highly professional.",
        "From planning to handover, the team was proactive, collaborative, and attentive to every detail. Thank you for enabling us to deliver world-class infrastructure to our patients.",
      ],
    },
    {
      name: "Rakesh Menon",
      role: "Facility Head, Medilink Diagnostics",
      reviews: [
        "Infra.Health truly understands the dynamics of healthcare delivery. Their team showed unmatched commitment, ensuring the project was completed on time and fully compliant.",
        "We are especially grateful for their insights into optimizing patient flow through design. Exceptional experience!",
      ],
    },
    {
      name: "Dr. Anjali Verma",
      role: "Founder, UrbanCare Clinics",
      reviews: [
        "A big thank you to the Infra.Health team for turning our vision for a modern, modular clinic into reality. The quality of work was outstanding.",
        "Their understanding of healthcare needs and ability to deliver within tight timelines sets them apart. We look forward to more collaborations in the future.",
      ],
    },
  ];

  const blogsData = [
    {
      img: "/images/blogs/blog1.png",
      title: "5 Smart Layout Trends in Modern Healthcare Facilities",
      link: "#",
    },
    {
      img: "/images/blogs/blog2.png",
      title: "How Infrastructure Impacts Hospital Infection Rates",
      link: "#",
    },
    {
      img: "/images/blogs/blog3.png",
      title: "Sustainable Hospital Infrastructure: Why It Matters",
      link: "#",
    },
  ];

  const [currentWord, setCurrentWord] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
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
  }, []);

  return (
    <main>
      {/* HERO SECTION START */}
      <section className="hero" id="hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h3 className="subheading">One-Stop Solution for</h3>
          <h3>
            <span>Healthcare</span>{" "}
            <span className="rotating-text">{words[currentWord]}</span>
          </h3>
        </div>

        <div className="hero-bottom-box" aria-hidden="false">
          <Row className="align-items-center w-100">
            <Col md={8} className="cta-text">
              <h2>Looking to setup your own hospital?</h2>
              <p>
                Be it a multi-speciality hospital, general hospital or a medical
                college or institute, we take care of everything from scoping
                and designing to building and equipping your hospital for you to
                operate.
              </p>
            </Col>
            <Col md={4} className="text-md-end text-center mt-3 mt-md-0">
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
      {/* HERO SECTION END */}
      {/* ABOUT SECTION START */}
      <section className="about-difference">
        <Container>
          <div className="about-grid">
            {/* LEFT COLUMN - COUNTERS */}
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
                <p>Multi-Disciplinary Team</p>
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

            {/* MIDDLE COLUMN - IMAGE */}
            <div className="about-images">
              <img src="/images/hero/home-abt.png" alt="Healthcare Team" />
            </div>

            {/* RIGHT COLUMN - TEXT */}
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

              <a href="/about" className="btn">
                Know More
              </a>
            </div>
          </div>
        </Container>
      </section>
      {/* ABOUT SECTION END */}
      {/*Why Choose Us Section */}
      <section className="why-choose-us py-5">
        <Container>
          <Row className="align-items-start justify-content-between">
            {/* LEFT SIDE */}
            <Col lg={7} md={12} className="mb-4">
              <p className="section-subtitle">Why Choose Us</p>
              <h3 className="section-title mb-4">
                From Concept to Care <br />
                <span>Building Health,</span> Brick by Brick
              </h3>
              <div className="why-image">
                <img
                  src="/images/hero/abt.png"
                  alt="Infra.Health Building"
                  className="img-fluid rounded shadow"
                />
              </div>
            </Col>

            {/* RIGHT SIDE */}
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
                  <h5>Energy-Efficient & Sustainable Systems</h5>
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
      {/*Why Choose Us Section */}
      {/*Our Services Section */}
      <section className="services-slider py-5">
        <Container>
          <p className="section-subtitle">Our Services</p>
          <h3 className="section-title mb-4">
            Specialized Healthcare Infrastructure <span>Solutions</span>
          </h3>

          {/* Swiper Wrapper with relative positioning */}
          <div className="swiper-wrapper-container">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={3}
              loop={true}
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
              {services.map((service, index) => (
                <SwiperSlide key={index}>
                  <div className="service-card">
                    <img src={service.img} alt={service.title} />
                    <div className="card-overlay">{service.title}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons INSIDE wrapper */}
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </Container>
      </section>
      {/*Our Services Section */}
      {/*Our Portfolio Section */}
      <section className="portfolio-section">
        <Container>
          <p className="section-subtitle">Our Portfolio</p>
          <h3 className="section-title">
            Specialized Healthcare Infrastructure <span>Solutions</span>
          </h3>

          {/* Project Cards */}
          <Row className="justify-content-center g-4 my-4">
            {projects.map((project) => (
              <Col key={project.id} xs={12} sm={6} md={4}>
                <div className="card project-card">
                  <img src={project.image} alt={project.title} />
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
                Let's Build Your{" "}
                <span className="highlight">Dream Healthcare Facility</span>
              </h3>
            </div>
            <div className="cta-buttons">
              <div className="btn primary-btn">View All Projects</div>
            </div>
          </div>
        </Container>
      </section>
      {/*Our Portfolio Section */}
      <section className="testimonials py-5">
        <Container>
          <p className="section-subtitle">Our Testimonials</p>
          <h3 className="section-title mb-4">
            Read why our <span>clients love us</span>
          </h3>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              1024: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              480: { slidesPerView: 1 },
            }}
          >
            {testimonialsData.map((t, idx) => (
              <SwiperSlide key={idx}>
                <div className="t-card d-flex flex-column justify-content-between">
                  <div>
                    <h4>{t.name}</h4>
                    <p className="role">{t.role}</p>
                    {t.reviews.map((r, i) => (
                      <p key={i} className="review">
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

      <section className="media-buzz py-5">
        <Container>
          <p className="section-subtitle">Our Blogs</p>
          <h2 className="section-title mb-4">
            Check out <span>Our latest Blogs</span>
          </h2>

          <Row className="justify-content-center g-4">
            {blogsData.map((blog, idx) => (
              <Col key={idx} xs={12} md={6} lg={4}>
                <Card className="blog-card h-100 border-0 shadow-sm">
                  <Card.Img variant="top" src={blog.img} />
                  <Card.Body className="card-content">
                    <Card.Title as="h3" className="h6">
                      {blog.title}
                    </Card.Title>
                    <a href={blog.link} className="read-more p-0">
                      READ MORE &raquo;
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="explore-btn justify-content-center d-flex">
            <a href="#">Explore More Blogs</a>
          </div>
        </Container>
      </section>
      <TalkToUsModal show={modalShow} handleClose={() => setModalShow(false)} />
    </main>
  );
}
