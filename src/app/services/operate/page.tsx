"use client";

import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import "../../../styles/services.css";

const BsCheckCircleFill: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
  </svg>
);

interface DetailBlock {
  [key: string]: string[];
}

interface OperateService {
  id: string;
  title: string;
  description: string;
  details: DetailBlock;
}

interface WhyInfraHealth {
  title: string;
  points: string[];
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

// --- DATA OBJECT ---
const operateData: OperateData = {
  intro: {
    title: "Operate",
    main: "Global Healthcare Facility Operations & Lifecycle Services",
    sub: "Infra.Health’s Operate vertical provides comprehensive post-construction services, ensuring hospitals remain efficient, compliant, sustainable, and patient-centric throughout their lifecycle. We combine property expertise, facility management, technical O&M, and HR solutions under one umbrella.",
  },
  services: [
    {
      id: "property-management",
      title: "Property Management",
      description:
        "Specialised property management solutions tailored for healthcare real estate assets.",
      details: {
        "Scope of Work": [
          "Day-to-day operations of hospital campuses, medical towers, and ancillary facilities",
          "Lease administration, vendor management, utility billing, and asset reporting",
          "Compliance with zoning, healthcare-specific regulations, safety codes, and statutory frameworks",
          "Energy management, space utilisation, and cost-optimisation strategies",
        ],
        "Deliverables & Benefits": [
          "Maximised asset value with reduced lifecycle costs",
          "Transparent reporting for investors, developers, and healthcare operators",
          "Strong compliance, ensuring risk-free operations",
          "Strategic asset planning aligned with long-term healthcare needs",
        ],
      },
    },
    {
      id: "ifm",
      title: "Integrated Facility Management (IFM)",
      description:
        "End-to-end facility operations covering hard and soft services, enabled by technology platforms for efficiency.",
      details: {
        "Scope of Work": [
          "Soft Services: Housekeeping, sanitation, laundry, catering, biomedical waste management, patient transport, hospitality",
          "Hard Services: Preventive and corrective maintenance of MEPF systems, HVAC, electrical, water, plumbing, fire safety, MGPS, and medical utilities",
          "Digital Integration: CAFM, CMMS, and IoT-driven monitoring dashboards for predictive performance",
          "Accreditation support for NABH, JCI, ISO through compliance-driven audits",
        ],
        "Deliverables & Benefits": [
          "World-class patient experience through hospitality-driven services",
          "Improved equipment uptime and hospital system reliability",
          "Cost efficiency through SLA/KPI-based delivery models",
          "Transparent facility performance data for administrators and promoters",
        ],
      },
    },
    {
      id: "o-m",
      title: "Operations & Maintenance (O&M)",
      description:
        "Hospitals run 24/7/365. Infra.Health ensures continuous performance of hospital infrastructure and critical systems through structured O&M programs.",
      details: {
        "Scope of Work": [
          "Preventive, predictive, and corrective maintenance protocols",
          "Asset lifecycle management for medical equipment, HVAC plants, DG sets, electrical systems, lifts, and plumbing networks",
          "Energy efficiency programs: audits, optimisation, and green operations strategy",
          "Rapid-response teams for emergency breakdowns in critical zones (ICUs, OTs, labs, emergency departments)",
        ],
        "Deliverables & Benefits": [
          "Maximum uptime for critical medical services",
          "Optimised asset lifecycle and reduced operating costs",
          "Improved NABH/JCI compliance through documented O&M systems",
          "Peace of mind for operators with 24/7 emergency readiness",
        ],
      },
    },
    {
      id: "hr-support",
      title: "HR Support Services",
      description:
        "People are the backbone of hospitals. Infra.Health provides comprehensive HR solutions, ensuring hospitals have the right workforce at the right time.",
      details: {
        "Scope of Work": [
          "Recruitment & Staffing: Doctors, nurses, paramedics, and administrative staff",
          "Workforce Outsourcing: Security, housekeeping, patient attendants, transport staff",
          "HR Systems & Policies: SOPs, job descriptions, organisational hierarchies, and performance management frameworks",
          "Training & Development: Induction programs, patient-care protocols, safety and infection-control training, continuous skill development",
          "Compliance & Payroll: PF, ESIC, labour law adherence, payroll management, and workforce rationalisation",
        ],
        "Deliverables & Benefits": [
          "Access to trained healthcare manpower pools",
          "HR compliance with reduced legal and operational risks",
          "Improved patient outcomes via skilled and motivated staff",
          "Cost-efficient staffing models, reducing non-core HR burdens on hospital leadership",
        ],
      },
    },
  ],
  why: {
    title: "Why Choose Infra.Health Operate?",
    points: [
      "Healthcare-Only Focus – Unlike generic FM/O&M companies, we manage only hospitals and healthcare facilities.",
      "International Compliance – Every service aligned with NABH, JCI, ISO, OSHA, NFPA, HTM standards.",
      "Technology-Driven – IoT, CMMS, CAFM, and AI-enabled predictive analytics for smarter operations.",
      "Single-Window Partner – Property, facility, systems, and HR under one umbrella.",
      "Patient-Centric Approach – Services benchmarked for safety, hygiene, and patient comfort.",
      "Sustainability Aligned – ESG-compliant operations supporting carbon neutrality, energy conservation, and green healthcare initiatives.",
    ],
  },
};

// --- HELPER COMPONENT ---
interface DetailSectionProps {
  details: DetailBlock;
}

const DetailSection: React.FC<DetailSectionProps> = ({ details }) => (
  <Row>
    {Object.entries(details).map(([key, value]) => (
      <Col md={12} key={key} className={"mb-3"}>
        <h4 className="details-title">{key.replace(/_/g, " ")}:</h4>
        <ul className="details-list">
          {Array.isArray(value) &&
            value.map((item: string, index: number) => (
              <li key={index}>
                <BsCheckCircleFill />
                <span>{item}</span>
              </li>
            ))}
        </ul>
      </Col>
    ))}
  </Row>
);

// --- MAIN COMPONENT ---
export default function OperatePage() {
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
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
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
      <main className="container py-5 mt-4">
        <div
          className="text-left mx-auto mb-5 pb-4"
          style={{ maxWidth: "1920px" }}
        >
          <p className="section-subtitle">OUR SERVICES</p>
          <h3 className="section-title">
            <span>{operateData.intro.title}</span>
          </h3>
          <h4 className="fs-4 mb-3">{operateData.intro.main}</h4>
          <p className="mt-3 text-muted">{operateData.intro.sub}</p>
        </div>

        <Row>
          <Col lg={3} className="d-none d-lg-block">
            <Nav className="flex-column sticky-top sidenav">
              {operateData.services.map((service) => (
                <Nav.Link
                  key={service.id}
                  href={`#${service.id}`}
                  className={activeLink === service.id ? "active" : ""}
                  onClick={(e) => handleNavLinkClick(e, service.id)}
                >
                  {service.title}
                </Nav.Link>
              ))}

              <Nav.Link
                href="#why-infrahealth-operate"
                className={
                  activeLink === "why-infrahealth-operate" ? "active" : ""
                }
                onClick={(e) =>
                  handleNavLinkClick(e, "why-infrahealth-operate")
                }
              >
                Why Infra.Health?
              </Nav.Link>
            </Nav>
          </Col>

          <Col lg={9}>
            <div className="vstack gap-5">
              {operateData.services.map((service) => (
                <section key={service.id} id={service.id}>
                  <h3>{service.title}</h3>
                  <p className="text-muted fs-5">{service.description}</p>
                  <div className="service-card">
                    <DetailSection details={service.details} />
                  </div>
                </section>
              ))}
              <section id="why-infrahealth-operate">
                <h3>{operateData.why.title}</h3>
                <div className="service-card">
                  <DetailSection
                    details={{ "Key Advantages": operateData.why.points }}
                  />
                </div>
              </section>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}
