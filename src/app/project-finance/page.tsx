"use client";

import { useState, useEffect } from "react";
import { Row, Col, Nav } from "react-bootstrap";
import "../../styles/services.css";
import { FaGlobeAmericas, FaProjectDiagram } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { IconType } from "react-icons";

// TYPES
interface FinanceService {
  id: string;
  title: string;
  description: string[];
  image?: string;
  icon?: IconType;
}

interface FinanceData {
  intro: {
    title: string;
    main: string;
    sub: string;
  };
  services: FinanceService[];
  value: {
    title: string;
    points: { title: string; text: string; icon?: IconType }[];
  };
}

// DATA
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
      image: "/images/finance/project-finance.jpg",
    },
    {
      id: "capital-equipment",
      title: "Financing for Capital Equipment",
      description: [
        "Arranging vendor financing and leasing models with OEMs.",
        "Securing equipment loans at concessional rates.",
        "Integrating equipment financing with overall project funding to align with cashflows.",
      ],
      image: "/images/finance/equipment.jpg",
    },
    {
      id: "opex-funding",
      title: "OPEX Funding",
      description: [
        "Structured OPEX funding lines for early years of hospital operations.",
        "Integration with facility management contracts to stabilize cashflows.",
        "Bridging finance until hospital operations reach break-even.",
      ],
      image: "/images/finance/opex.jpg",
    },
    {
      id: "fdi-facilitation",
      title: "FDI Facilitation & International Investment Structuring",
      description: [
        "Structuring equity, quasi-equity, and debt instruments to attract international investors.",
        "Compliance with Indian FDI policies, healthcare sector norms, and international tax planning.",
        "Advisory on cross-border joint ventures, investor relations, and corporate governance.",
      ],
      image: "/images/finance/fdi.jpg",
    },
    {
      id: "ppp-financing",
      title: "PPP Healthcare Project Financing",
      description: [
        "Financial structuring aligned with state health missions and central healthcare schemes.",
        "Blending of grants, viability gap funding, and long-term debt.",
        "Risk allocation models ensuring investor security and public accessibility.",
      ],
      image: "/images/finance/ppp.jpg",
    },
    {
      id: "global-fund",
      title: "Global Healthcare Fund Creation",
      description: [
        "Creation of global pooled funds targeting hospitals, med-cities, digital health, and senior care.",
        "Partnerships with sovereign wealth funds, pension funds, and global healthcare investors.",
        "Deploying capital in India and emerging markets to generate sustainable, impact-driven returns.",
      ],
      image: "/images/finance/global-fund.jpg",
    },
  ],
  value: {
    title: "Why Choose Infra.Health Finance?",
    points: [
      {
        title: "Trusted Expertise",
        text: "Decades of experience in healthcare + infrastructure financing.",
        icon: FaUserTie,
      },
      {
        title: "Global Networks",
        text: "Partnerships with international banks, funds, and investors.",
        icon: FaGlobeAmericas,
      },
      {
        title: "End-to-End Support",
        text: "From feasibility studies to post-completion cashflow stabilization.",
        icon: FaProjectDiagram,
      },
    ],
  },
};

// DETAIL COMPONENT
const DetailSection = ({ description }: { description: string[] }) => (
  <ul className="details-list">
    {description.map((item, index) => (
      <li key={index}>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

// MAIN COMPONENT — TAB-STYLE
export default function ProjectFinancePage() {
  const sections = [...financeData.services.map((s) => s.id), "why-finance"];

  const getInitial = () => {
    if (typeof window === "undefined") return sections[0];
    const hash = window.location.hash.replace("#", "");
    return sections.includes(hash) ? hash : sections[0];
  };

  const [activeSection, setActiveSection] = useState<string>(getInitial);

  // Update hash on tab switch
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.history.pushState(null, "", `#${activeSection}`);
  }, [activeSection]);

  // Support browser back/forward navigation
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
      {/* INTRO */}
      <div className="text-left mx-auto pb-4" style={{ maxWidth: "1920px" }}>
        <p className="section-subtitle">OUR FINANCIAL SERVICE</p>
        <h3 className="section-title">
          <span>{financeData.intro.title}</span>
        </h3>
        <h4 className="fs-4 mb-3">{financeData.intro.main}</h4>
        <p className="mt-3 text-muted">{financeData.intro.sub}</p>
      </div>

      <Row>
        {/* SIDEBAR TABS */}
        <Col lg={3} className="d-none d-lg-block">
          <Nav className="flex-column sticky-top sidenav">
            {financeData.services.map((service) => (
              <Nav.Link
                key={service.id}
                href={`#${service.id}`}
                className={activeSection === service.id ? "active" : ""}
                onClick={() => setActiveSection(service.id)}
              >
                {service.title}
              </Nav.Link>
            ))}

            {/* VALUE TAB */}
            <Nav.Link
              href="#why-finance"
              className={activeSection === "why-finance" ? "active" : ""}
              onClick={() => setActiveSection("why-finance")}
            >
              Why Choose Infra.Health Finance?
            </Nav.Link>
          </Nav>
        </Col>

        {/* CONTENT AREA */}
        <Col lg={9}>
          <div className="vstack gap-4">
            {/* SERVICE SECTIONS */}
            {financeData.services.map((service) =>
              activeSection === service.id ? (
                <section key={service.id}>
                  <Row className="align-items-center">
                    <Col md={5}>
                      {service.image && (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="img-fluid rounded shadow-sm"
                        />
                      )}
                    </Col>
                    <Col md={7}>
                      <div className="service-card">
                        <h3>{service.title}</h3>
                        <DetailSection description={service.description} />
                      </div>
                    </Col>
                  </Row>
                </section>
              ) : null
            )}

            {/* VALUE SECTION */}
            {activeSection === "why-finance" && (
              <section id="why-finance">
                <h2>{financeData.value.title}</h2>
                <div className="value-grid mt-4">
                  {financeData.value.points.map((point, index) => (
                    <div key={index} className="value-card">
                      <div className="icon">
                        {point.icon && <point.icon size={32} />}
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
