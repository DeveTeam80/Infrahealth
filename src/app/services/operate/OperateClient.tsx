// Updated OperateClient.tsx with TAB-STYLE navigation (no scrolling)

"use client";

import React, { useState, useEffect } from "react";
import { Row, Col, Nav } from "react-bootstrap";
import "../../../styles/services.css";
import { IconType } from "react-icons";
import {
  FaHospitalAlt,
  FaGlobe,
  FaMicrochip,
  FaUsers,
  FaHeartbeat,
  FaLeaf,
} from "react-icons/fa";

interface WhyPoint {
  title: string;
  text: string;
  icon: IconType;
}

interface WhyInfraHealth {
  title: string;
  points: WhyPoint[];
}

interface DetailBlock {
  [key: string]: string[];
}

interface OperateService {
  id: string;
  title: string;
  description: string;
  details: DetailBlock;
  image?: string;
}

interface OperateData {
  intro: {
    title: string;
    main: string;
    sub: string;
  };
  services: OperateService[];
  why: WhyInfraHealth;
}

// ---- DATA ----
const operateData: OperateData = {
  intro: {
    title: "Operate",
    main: "Global Healthcare Facility Operations & Lifecycle Services",
    sub: "Infra.Health’s Operate vertical provides comprehensive post-construction services, ensuring hospitals remain efficient, compliant, sustainable, and patient-centric throughout their lifecycle.",
  },
  services: [
    {
      id: "property-management",
      title: "Property Management",
      description:
        "Specialised property management solutions tailored for healthcare real estate assets.",
      image: "/images/services/operate/property-management.jpg",
      details: {
        "Scope of Work": [
          "Day-to-day operations of hospital campuses, medical towers, and facilities",
          "Lease administration, vendor management, utility billing",
          "Compliance with zoning and healthcare safety codes",
          "Energy management and cost optimisation",
        ],
        "Deliverables & Benefits": [
          "Maximised asset value and reduced lifecycle cost",
          "Transparent reporting for promoters and investors",
          "Risk-free compliant operations",
          "Strategic long-term asset planning",
        ],
      },
    },
    {
      id: "ifm",
      title: "Integrated Facility Management (IFM)",
      description:
        "End-to-end facility operations covering hard and soft services, enabled by technology platforms for efficiency.",
      image: "/images/services/consult/equipment-installing.jpg",
      details: {
        "Scope of Work": [
          "Soft: Housekeeping, sanitation, BMW, catering, transport",
          "Hard: MEPF, HVAC, Electrical, Fire safety, MGPS",
          "Digital: CAFM, CMMS, IoT monitoring dashboards",
          "Accreditation: NABH, JCI, ISO compliance audits",
        ],
        "Deliverables & Benefits": [
          "Premium patient experience",
          "Improved equipment uptime",
          "Cost efficiency via SLA/KPI models",
          "Transparent performance reporting",
        ],
      },
    },
    {
      id: "o-m",
      title: "Operations & Maintenance (O&M)",
      description:
        "Infra.Health ensures continuous performance of hospital infrastructure and critical systems.",
      image: "/images/services/operate/maintenance.jpg",
      details: {
        "Scope of Work": [
          "Preventive and corrective maintenance protocols",
          "Lifecycle management for equipment, HVAC, DG, lifts",
          "Energy optimisation programs",
          "Emergency breakdown response teams",
        ],
        "Deliverables & Benefits": [
          "Maximum uptime for critical care zones",
          "Optimised asset life and cost savings",
          "Improved accreditation compliance",
          "24/7 technical readiness",
        ],
      },
    },
    {
      id: "hr-support",
      title: "HR Support Services",
      description:
        "Infra.Health provides workforce solutions ensuring hospitals have skilled professionals.",
      image: "/images/services/operate/hr-support.jpg",
      details: {
        "Scope of Work": [
          "Recruitment: Doctors, nurses, paramedics",
          "Workforce outsourcing: attendants, security, housekeeping",
          "HR systems, SOPs, job roles, performance management",
          "Training: patient care, safety, infection control",
          "Payroll, PF, ESIC, labour law compliance",
        ],
        "Deliverables & Benefits": [
          "Access to trained healthcare staff",
          "Reduced HR risks and legal issues",
          "Improved patient outcomes",
          "Cost-efficient staffing models",
        ],
      },
    },
  ],
  why: {
    title: "Why Choose Infra.Health Operate?",
    points: [
      {
        title: "Healthcare-Only Focus",
        text: "We manage only hospitals.",
        icon: FaHospitalAlt,
      },
      {
        title: "International Compliance",
        text: "Aligned with NABH, JCI, ISO.",
        icon: FaGlobe,
      },
      {
        title: "Technology-Driven",
        text: "IoT, CMMS, CAFM, AI platforms.",
        icon: FaMicrochip,
      },
      {
        title: "Single-Window",
        text: "Property, IFM, O&M, HR.",
        icon: FaUsers,
      },
      {
        title: "Patient-Centric",
        text: "Safety & hygiene–first approach.",
        icon: FaHeartbeat,
      },
      {
        title: "Sustainability",
        text: "ESG-aligned green operations.",
        icon: FaLeaf,
      },
    ],
  },
};

// ---- DETAILS COMPONENT ----
const DetailSection: React.FC<{ details: DetailBlock; image?: string }> = ({
  details,
  image,
}) => (
  <Row>
    {Object.entries(details).map(([key, value]) => (
      <React.Fragment key={key}>
        <Col md={12}>
          <h4 className="details-title">{key}:</h4>
          <ul className="details-list mb-3">
            {value.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Col>

        {key === "Scope of Work" && image && (
          <Col md={12} className="text-center mb-4">
            <img
              src={image}
              alt="Illustration"
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: 300, objectFit: "cover" }}
            />
          </Col>
        )}
      </React.Fragment>
    ))}
  </Row>
);

// ---- MAIN COMPONENT ----
export default function OperateClient() {
  const sections = [
    ...operateData.services.map((s) => s.id),
    "why-infrahealth-operate",
  ];

  const getInitial = () => {
    if (typeof window === "undefined") return sections[0];
    const hash = window.location.hash.replace("#", "");
    return sections.includes(hash) ? hash : sections[0];
  };

  const [activeSection, setActiveSection] = useState<string>(getInitial);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.history.pushState(null, "", `#${activeSection}`);
  }, [activeSection]);

  useEffect(() => {
    const onPop = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveSection(sections.includes(hash) ? hash : sections[0]);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return (
    <main className="container py-5 mt-4">
      <div className="pb-4" style={{ maxWidth: 1920 }}>
        <p className="section-subtitle">OUR SERVICES</p>
        <h3 className="section-title">
          <span>{operateData.intro.title}</span>
        </h3>
        <h4 className="fs-4 mb-3">{operateData.intro.main}</h4>
        <p className="text-muted">{operateData.intro.sub}</p>
      </div>

      <Row>
        {/* LEFT NAVIGATION */}
        <Col lg={3} className="d-none d-lg-block">
          <Nav className="flex-column sticky-top sidenav">
            {operateData.services.map((service) => (
              <Nav.Link
                key={service.id}
                onClick={() => setActiveSection(service.id)}
                className={activeSection === service.id ? "active" : ""}
              >
                {service.title}
              </Nav.Link>
            ))}

            <Nav.Link
              onClick={() => setActiveSection("why-infrahealth-operate")}
              className={
                activeSection === "why-infrahealth-operate" ? "active" : ""
              }
            >
              Why Infra.Health?
            </Nav.Link>
          </Nav>
        </Col>

        {/* RIGHT CONTENT */}
        <Col lg={9}>
          <div className="vstack gap-1">
            {/* --- SERVICE SECTIONS --- */}
            {operateData.services.map((s) =>
              activeSection === s.id ? (
                <section key={s.id}>
                  <h3>{s.title}</h3>
                  <p className="text-muted">{s.description}</p>

                  <div className="service-card consult-card">
                    <DetailSection details={s.details} image={s.image} />
                  </div>
                </section>
              ) : null
            )}

            {/* --- WHY INFRAHEALTH SECTION --- */}
            {activeSection === "why-infrahealth-operate" && (
              <section>
                <h3>{operateData.why.title}</h3>

                <div className="value-grid mt-4">
                  {operateData.why.points.map((point, index) => (
                    <div key={index} className="value-card">
                      <div className="icon">
                        <point.icon size={32} />
                      </div>
                      <h4>{point.title}</h4>
                      <p>{point.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </Col>
      </Row>
    </main>
  );
}
