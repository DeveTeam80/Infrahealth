"use client";

import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { BsCheckCircleFill } from "react-icons/bs";
import Image from "next/image";
import "../../../styles/services.css";
import { FaClock, FaGlobe, FaLeaf, FaUsers } from "react-icons/fa6";

interface DetailItem {
  text: string;
  image?: string;
}

interface Detail {
  heading?: string;
  items: (string | DetailItem)[];
}

interface Point {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  text: string;
}

interface SectionData {
  id: string;
  title: string;
  subtitle?: string;
  details?: Detail[];
  points?: Point[];
}

const furnitureData: SectionData[] = [
  {
    id: "intro",
    title: "Medical Furniture Solutions by Infra.Health",
    subtitle: "Ergonomic. Durable. Patient-Centric.",
    details: [
      {
        items: [
          "At Infra.Health, we understand that the healing environment is shaped not only by technology and infrastructure, but also by the furniture that supports patients, caregivers, and clinical workflows.",
          "Our range of Medical Furniture Solutions is designed to combine ergonomics, durability, hygiene, and aesthetics, ensuring comfort for patients, efficiency for staff, and longevity for hospital operators.",
        ],
      },
    ],
  },
  {
    id: "features",
    title: "Core Features & Value Proposition",
    details: [
      {
        items: [
          "Ergonomically Designed – Reduces caregiver fatigue, improves patient comfort, and streamlines hospital operations.",
          "Durability & Safety – Built with medical-grade materials, antibacterial finishes, and load-tested structures.",
          "Infection Control – Smooth, seamless surfaces, chemical resistance, and infection-prevention compliance.",
          "Customizable & Modular – Adjustable features for departments and specialties.",
          "International Standards – EN, ISO, NABH, and JCI compliant.",
          "Sustainability – Recyclable materials and eco-friendly processes.",
        ],
      },
    ],
  },
  {
    id: "portfolio",
    title: "Product Portfolio",
    details: [
      {
        heading: "Patient Care Furniture",
        items: [
          { text: "Hospital Beds", image: "/images/products/furniture/beds.jpg" },
          { text: "Bedside Lockers & Overbed Tables", image: "/images/products/furniture/lockers.jpg" },
          { text: "Mattresses & Pressure Relief Systems", image: "/images/products/furniture/mattresses.jpg" },
        ],
      },
      {
        heading: "Caregiver & Utility Furniture",
        items: [
          { text: "Examination Tables & Procedure Chairs", image: "/images/products/furniture/exam-tables.jpg" },
          { text: "Treatment & Dressing Trolleys", image: "/images/products/furniture/trolleys.jpg" },
          { text: "Instrument & Utility Trolleys", image: "/images/products/furniture/utility-trolleys.jpg" },
          { text: "Doctor & Nurse Workstations", image: "/images/products/furniture/workstations.jpg" },
        ],
      },
      {
        heading: "Specialty Medical Furniture",
        items: [
          { text: "OT Furniture", image: "/images/products/furniture/ot-furniture.jpg" },
          { text: "ICU Furniture", image: "/images/products/furniture/icu.jpg" },
          { text: "Rehabilitation & Physiotherapy Furniture", image: "/images/products/furniture/rehab.jpg" },
          { text: "Maternity & Neonatal Furniture", image: "/images/products/furniture/maternity.jpg" },
        ],
      },
      {
        heading: "Public & Administrative Areas",
        items: [
          { text: "Waiting Area Seating", image: "/images/products/furniture/waiting.jpg" },
          { text: "Cafeteria & Lounge Furniture", image: "/images/products/furniture/cafeteria.jpg" },
          { text: "Staff Residences & On-Call Rooms", image: "/images/products/furniture/staff.jpg" },
        ],
      },
    ],
  },
  {
    id: "applications",
    title: "Applications Across Healthcare Facilities",
    details: [
      {
        items: [
          "Hospitals & Specialty Centres (ICU, OT, OPD, Wards).",
          "Medical Colleges & Teaching Institutions.",
          "Daycare & Ambulatory Centres.",
          "Rehabilitation & Elderly Care Facilities.",
          "Diagnostic & Research Centres.",
        ],
      },
    ],
  },
];

const DetailSection: React.FC<{ details: Detail[] }> = ({ details }) => (
  <div className="detail-section">
    {details.map((detail, i) => (
      <div key={i} className="mb-4">
        {detail.heading && <h4 className="mb-3">{detail.heading}</h4>}

        {typeof detail.items[0] === "object" ? (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {(detail.items as DetailItem[]).map((item, j) => (
              <Col key={j}>
                <div className="detail-card text-center h-100">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.text}
                      width={213}
                      height={142}
                      className="img-fluid rounded shadow-sm mb-2"
                    />
                  )}
                  <p className="fw-medium">{item.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <ul className="details-list">
            {(detail.items as string[]).map((item, j) => (
              <li key={j}>
                <BsCheckCircleFill className="list-icon" /> {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
);

export default function FurniturePage() {
  const [activeLink, setActiveLink] = useState<string>("intro");
  const sectionsRef = useRef<Record<string, Element>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
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
    };
  }, []);

  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setActiveLink(targetId);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  return (
    <main className="container py-5 mt-4">
      <div className="text-left mx-auto mb-5 pb-4" style={{ maxWidth: "1920px" }}>
        <p className="section-subtitle">OUR SOLUTIONS</p>
        <h3 className="section-title">
          Medical <span>Furniture Solutions</span>
        </h3>
        <p className="mt-3 text-muted">
          Ergonomic, durable, and patient-centric furniture that enhances comfort,
          efficiency, and safety across healthcare facilities.
        </p>
      </div>

      <Row>
        {/* Side Navigation */}
        <Col lg={3} className="d-none d-lg-block">
          <Nav className="flex-column sticky-top sidenav">
            {furnitureData.map((section) => (
              <Nav.Link
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => handleNavLinkClick(e, section.id)}
                className={activeLink === section.id ? "active" : ""}
              >
                {section.title}
              </Nav.Link>
            ))}
          </Nav>
        </Col>

        {/* Content Sections */}
        <Col lg={9}>
          <div className="vstack gap-5">
            {furnitureData.map((section) => (
              <section id={section.id} key={section.id}>
                <h3>{section.title}</h3>
                {section.subtitle && (
                  <p className="text-muted fs-5">{section.subtitle}</p>
                )}

                <div className="service-card">
                  {section.details && <DetailSection details={section.details} />}

                  {section.points && (
                    <div className="value-grid mt-4" style={{ gap: "50px" }}>
                      {section.points.map((point, index) => (
                        <div key={index} className="value-card">
                          <div className="icon">
                            <point.icon size={32} />
                          </div>
                          <h4>{point.title}</h4>
                          <p>{point.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </Col>
      </Row>
    </main>
  );
}
