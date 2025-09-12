"use client";

import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import {
  FaUniversity,
  FaFlask,
  FaRegHospital,
  FaClinicMedical,
  FaAmbulance,
  FaMicroscope,
  FaBrain,
  FaUserTie,
  FaConnectdevelop,
  FaGlobe,
  FaLaptopCode,
  FaLeaf,
} from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import "../../../styles/services.css";

// --- ICON COMPONENT ---
const BsCheckCircleFill: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    {" "}
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />{" "}
  </svg>
);

// --- TYPE DEFINITIONS ---
type FacilityItem = string | { main: string; sub: string[] };

interface FacilityCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  image: string;
  items: FacilityItem[];
}

interface ValuePoint {
  icon: React.ElementType;
  title: string;
  text: string;
}

interface SolutionsData {
  intro: {
    title: string;
    paragraphs: string[];
  };
  spectrum: FacilityCategory[];
  value: {
    title: string;
    points: ValuePoint[];
  };
}

// --- DATA OBJECT ---
const solutionsData: SolutionsData = {
  intro: {
    title: "Infra.Health – Solutions",
    paragraphs: [
      "At Infra.Health, we don’t just build healthcare infrastructure—we design and deliver future-ready ecosystems that balance medical excellence, operational efficiency, financial sustainability, and patient well-being.",
      "Our leadership team has worked as hospital owners, trustees, operators, and consultants, giving us the rare advantage of knowing exactly what challenges healthcare owners face. We transform these challenges into opportunities by offering real-time, practical, and innovative solutions tailored to every project.",
      "With expertise spanning concept development, design, EPC delivery, operations, financing, and compliance, Infra.Health delivers projects that are accreditation-ready (NABH, JCI, NABL, CAP, WHO) and built for global healthcare standards.",
    ],
  },
  spectrum: [
    {
      id: "academic",
      title: "Academic & Institutional Healthcare",
      icon: FaUniversity,
      image: "/images/services/solutions/1.jpg",
      items: [
        "Medical Colleges & Teaching Hospitals – Integrated academic, research, and clinical blocks designed for NMC norms and international benchmarks.",
        "Skill Development & Simulation Labs – Advanced learning environments with AR/VR simulators, mannequins, and AI-driven training.",
        "Allied Health & Nursing Colleges – Smart campuses for producing skilled healthcare manpower.",
      ],
    },
    {
      id: "research",
      title: "Research & Innovation Hubs",
      icon: FaFlask,
      image: "/images/services/solutions/2.jpg",
      items: [
        "Medical Research Institutes – GMP-certified laboratories, clean rooms, and trial facilities.",
        "Biotech & Pharma R&D Centres – Compliant with FDA/WHO standards.",
        "Digital Health & AI Labs – Innovation hubs for genomics, telehealth, and precision medicine.",
      ],
    },
    {
      id: "public",
      title: "Public & Government Healthcare",
      icon: FaRegHospital,
      image: "/images/services/solutions/3.jpg",
      items: [
        "District Hospitals, Civil Hospitals & PPP Projects – High-capacity, cost-optimized facilities designed for accessibility and scalability.",
        "Special Schemes (Ayushman Bharat, ESI, CGHS) – Infrastructure aligned with government programs, policies, and budget frameworks.",
      ],
    },
    {
      id: "clinical",
      title: "Core Clinical Infrastructure",
      icon: FaClinicMedical,
      image: "/images/services/solutions/4.jpg",
      items: [
        "Multispecialty & Acute-Care Hospitals: 30–2000 bedded hospitals with modular OT complexes, ICUs, and advanced MEPF systems.",
        {
          main: "Specialty Hospitals – Focused facilities for oncology, cardiology, nephrology, orthopaedics, and rehabilitation.",
          sub: [
            "Cancer Centres: LINAC bunkers, PET-CT, brachytherapy, oncology ICUs.",
            "Heart Centres: Hybrid cath labs, cardiac theatres, ECMO-ready ICUs.",
            "Women’s & Children’s Hospitals: Maternal ICUs, NICUs, PICUs, IVF & fertility clinics.",
          ],
        },
      ],
    },
    {
      id: "ambulatory",
      title: "Daycare, Ambulatory & Outpatient Care",
      icon: FaAmbulance,
      image: "/images/services/solutions/5.jpg",
      items: [
        "Ambulatory Surgery Centres (ASC) – Cost-efficient surgical facilities for short-stay, minimally invasive procedures.",
        "Outpatient Clinics & Polyclinics – Multi-specialty consultation hubs with diagnostics, pharmacy, and minor procedure rooms.",
        "Medical Office Buildings – Flexible clinical spaces for doctors, allied services, and co-practice models.",
      ],
    },
    {
      id: "diagnostics",
      title: "Diagnostics & Life Sciences",
      icon: FaMicroscope,
      image: "/images/services/solutions/6.jpg",
      items: [
        "Imaging & Radiology Centres – MRI, CT, Ultrasound, Nuclear Medicine with PACS integration.",
        "Pathology & Genomics Labs – NABL-ready labs for diagnostics, genetic testing, and molecular biology.",
        "Blood Banks, Eye Banks, Human Milk Banks, Organ Banks – Controlled environments with international biosafety compliance.",
      ],
    },
    {
      id: "advanced",
      title: "Advanced & Emerging Healthcare Facilities",
      icon: FaBrain,
      image: "/images/services/solutions/7.jpg",
      items: [
        "Rehabilitation & Long-Term Care Centres – Geriatric hospitals, palliative care, and post-acute recovery hubs.",
        "Emergency & Trauma Centres – High-acuity, rapid-response facilities integrated with tertiary care.",
        "Telemedicine & e-Health Hubs – Digital platforms, command centres, and tele-ICUs for remote patient monitoring.",
        "Wellness & Preventive Health Facilities – Integrative medicine centres, lifestyle clinics, and health resorts.",
      ],
    },
  ],
  value: {
    title: "How Infra.Health Adds Value",
    points: [
      {
        icon: FaUserTie,
        title: "Owner’s Perspective",
        text: "We solve problems the way promoters and trustees need them solved.",
      },
      {
        icon: FaConnectdevelop,
        title: "Integrated Approach",
        text: "Combining finance, design, EPC, and operations under one platform.",
      },
      {
        icon: FaGlobe,
        title: "Global Compliance",
        text: "Facilities aligned with NABH, JCI, WHO, LEED, WELL, and ESG standards.",
      },
      {
        icon: FaLaptopCode,
        title: "Tech & Digital Innovation",
        text: "IoT-enabled hospitals, BIM-integrated designs, AI-driven facility management.",
      },
      {
        icon: BsFillGrid3X3GapFill,
        title: "Future-Ready & Modular",
        text: "Adaptable to new specialties, pandemics, or evolving healthcare needs.",
      },
      {
        icon: FaLeaf,
        title: "Sustainability",
        text: "Green buildings, energy-efficient MEPF systems, and reduced carbon footprint.",
      },
    ],
  },
};

// --- HELPER COMPONENT ---
interface SpectrumListProps {
  items: FacilityItem[];
}

const SpectrumList: React.FC<SpectrumListProps> = ({ items }) => (
  <ul className="details-list">
    {items.map((item, index) => {
      if (typeof item === "string") {
        return (
          <li key={index}>
            <BsCheckCircleFill className="list-icon" />
            <span>{item}</span>
          </li>
        );
      }
      return (
        <li key={index}>
          <BsCheckCircleFill className="list-icon" />
          <div>
            <span>{item.main}</span>
            {item.sub.map((subItem, subIndex) => (
              <div key={subIndex} className="sub-item">
                {subItem}
              </div>
            ))}
          </div>
        </li>
      );
    })}
  </ul>
);

// --- MAIN COMPONENT ---
export default function SolutionsPage() {
   const [activeLink, setActiveLink] = useState<string>("epc");
  const sectionsRef = useRef<Record<string, Element>>({});
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (isClickScrolling.current) return; 
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      sectionsRef.current[section.id] = section;
      observer.observe(section);
    });

    return () => {
      Object.values(sectionsRef.current).forEach((section) => {
        if (section) observer.unobserve(section);
      });
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

const handleNavLinkClick = (
  e: React.MouseEvent<HTMLElement>,
  targetId: string
) => {
  e.preventDefault();
  isClickScrolling.current = true;
  setActiveLink(targetId);

  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const headerOffset = 180; 
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    window.history.pushState(null, "", `#${targetId}`);

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);
  }
};

  return (
    <>
      <div className="container py-5 mt-4">
        <div
          className="text-left mx-auto mb-5 pb-4"
          style={{ maxWidth: "1920px" }}
        >
          <p className="section-subtitle">OUR SOLUTIONS</p>
          <h3 className="section-title">
            <span>Infra.Health</span> Solutions
          </h3>
          {solutionsData.intro.paragraphs.map((p, i) => (
            <p key={i} className="mt-3 text-muted">
              {p}
            </p>
          ))}
        </div>

        <Row>
          <Col lg={3} className="d-none d-lg-block">
            <Nav className="flex-column sticky-top sidenav">
              {solutionsData.spectrum.map((category) => (
                <Nav.Link
                  key={category.id}
                  href={`#${category.id}`}
                  onClick={(e) => handleNavLinkClick(e, category.id)}
                  className={activeLink === category.id ? "active" : ""}
                >
                  {category.title}
                </Nav.Link>
              ))}
              <Nav.Link
                href="#value"
                onClick={(e) => handleNavLinkClick(e, "value")}
                className={activeLink === "value" ? "active" : ""}
              >
                How We Add Value
              </Nav.Link>
            </Nav>
          </Col>

          <Col lg={9}>
            <div className="vstack gap-5">
              <section>
                <h3 className="mb-4">
                  Spectrum of Healthcare Facilities We Deliver
                </h3>
                {solutionsData.spectrum.map((category, index) => (
                  <Row
                    as="section"
                    key={category.id}
                    id={category.id}
                    className="mb-5 interactive-section align-items-center"
                  >
                    <Col
                      md={5}
                      className={index % 2 === 0 ? "order-md-1" : "order-md-2"}
                    >
                      <img
                        src={category.image}
                        alt={category.title}
                        className="img-fluid"
                      />
                    </Col>
                    <Col
                      md={7}
                      className={index % 2 === 0 ? "order-md-2" : "order-md-1"}
                    >
                      <div className="service-card">
                        <div className="category-header">
                          <category.icon className="category-icon" />
                          <h4>{category.title}</h4>
                        </div>
                        <SpectrumList items={category.items} />
                      </div>
                    </Col>
                  </Row>
                ))}
              </section>
              <section id="value">
                <h2>{solutionsData.value.title}</h2>
                <div className="value-grid mt-4">
                  {solutionsData.value.points.map((point, index) => (
                    <div key={index} className="value-card">
                      <div className="icon">
                        <point.icon />
                      </div>
                      <h4>{point.title}</h4>
                      <p>{point.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
