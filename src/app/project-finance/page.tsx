"use client";

import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import "../../styles/services.css";

// --- CHECK ICON ---
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

// --- TYPES ---
interface DetailBlock {
  [key: string]: string[];
}

interface FinanceService {
  id: string;
  title: string;
  description: string[];
}

interface FinanceData {
  intro: {
    title: string;
    main: string;
    sub: string;
  };
  services: FinanceService[];
}

// --- DATA ---
const financeData: FinanceData = {
  intro: {
    title: "Project Finance",
    main: "Catalyzing Capital for Sustainable Healthcare Growth",
    sub: "Infra.Health goes beyond design, construction, and operations to address the single biggest challenge in healthcare infrastructure — capital mobilization. Recognizing that even the best hospital plans cannot succeed without structured financing, we have developed a dedicated Project Financing vertical. This vertical is built to unlock domestic and international capital flows into healthcare, enabling clients, governments, and investors to accelerate world-class medical infrastructure.",
  },
  services: [
    {
      id: "project-loan-financing",
      title: "Project Loan Financing for Infrastructure Funding",
      description: [
        "Tailored debt financing for greenfield and brownfield hospitals, medical colleges, and healthcare campuses.",
        "Risk-aligned structuring with milestone-based disbursements.",
        "Leveraging escrow accounts and FIDIC-style contractual frameworks to ensure fund security and transparency.",
      ],
    },
    {
      id: "capital-equipment",
      title: "Financing for Capital Equipment",
      description: [
        "Arranging vendor financing and leasing models with OEMs.",
        "Securing equipment loans at concessional rates.",
        "Integrating equipment financing with overall project funding to align with cashflows.",
      ],
    },
    {
      id: "opex-funding",
      title: "OPEX Funding",
      description: [
        "Structured OPEX funding lines for early years of hospital operations.",
        "Integration with facility management contracts to stabilize cashflows.",
        "Bridging finance until hospital operations reach break-even.",
      ],
    },
    {
      id: "fdi-facilitation",
      title: "FDI Facilitation & International Investment Structuring",
      description: [
        "Structuring equity, quasi-equity, and debt instruments to attract international investors.",
        "Compliance with Indian FDI policies, healthcare sector norms, and international tax planning.",
        "Advisory on cross-border joint ventures, investor relations, and corporate governance.",
      ],
    },
    {
      id: "ppp-financing",
      title: "PPP Healthcare Project Financing",
      description: [
        "Financial structuring aligned with state health missions and central healthcare schemes.",
        "Blending of grants, viability gap funding, and long-term debt.",
        "Risk allocation models ensuring investor security and public accessibility.",
      ],
    },
    {
      id: "global-fund",
      title: "Global Healthcare Fund Creation",
      description: [
        "Creation of global pooled funds targeting hospitals, med-cities, digital health, and senior care.",
        "Partnerships with sovereign wealth funds, pension funds, and global healthcare investors.",
        "Deploying capital in India and emerging markets to generate sustainable, impact-driven returns.",
      ],
    },
  ],
};

// --- HELPER COMPONENT ---
interface DetailSectionProps {
  description: string[];
}
const DetailSection: React.FC<DetailSectionProps> = ({ description }) => (
  <ul className="details-list">
    {description.map((item, index) => (
      <li key={index}>
        <BsCheckCircleFill />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

// --- MAIN PAGE ---
export default function ProjectFinancePage() {
  const [activeLink, setActiveLink] = useState<string>("project-loan-financing");
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
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
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

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      window.history.pushState(null, "", `#${targetId}`);

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(
        () => (isClickScrolling.current = false),
        1000
      );
    }
  };

  return (
    <main className="container py-5 mt-4">
      <div className="text-left mx-auto mb-5 pb-4" style={{ maxWidth: "1920px" }}>
        <p className="section-subtitle">OUR FINANCIAL SERVICE</p>
        <h3 className="section-title">
          <span>{financeData.intro.title}</span>
        </h3>
        <h4 className="fs-4 mb-3">{financeData.intro.main}</h4>
        <p className="mt-3 text-muted">{financeData.intro.sub}</p>
      </div>

      <Row>
        {/* Sidebar */}
        <Col lg={3} className="d-none d-lg-block">
          <Nav className="flex-column sticky-top sidenav">
            {financeData.services.map((service) => (
              <Nav.Link
                key={service.id}
                href={`#${service.id}`}
                className={activeLink === service.id ? "active" : ""}
                onClick={(e) => handleNavLinkClick(e, service.id)}
              >
                {service.title}
              </Nav.Link>
            ))}
          </Nav>
        </Col>

        {/* Content */}
        <Col lg={9}>
          <div className="vstack gap-5">
            {financeData.services.map((service) => (
              <section key={service.id} id={service.id}>
                <h3>{service.title}</h3>
                <div className="service-card">
                  <DetailSection description={service.description} />
                </div>
              </section>
            ))}
          </div>
        </Col>
      </Row>
    </main>
  );
}
