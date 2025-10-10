"use client";

import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Nav, Tab } from "react-bootstrap";
import "../../../styles/services.css";

// Type definitions
interface TabDetails {
  scope?: string[];
  benefits?: string[];
  deliverables?: string[];
  systems_covered?: string[];
  scope_of_work?: string[];
  digital_integration?: string[];
  certifications?: string[];
  stages?: string[];
  image?: string;
}

interface ServiceTab {
  eventKey: string;
  title: string;
  description: string;
  details?: TabDetails;
}

interface ServiceWithTabs {
  title: string;
  subtitle: string;
  tabs: ServiceTab[];
  image?: string;
}

interface ServiceWithDetails {
  title: string;
  subtitle: string;
  details: TabDetails;
  image?: string;
}

interface ServiceWithStages {
  title: string;
  subtitle: string;
  stages: string[];
  image?: string;
}

interface ConsultData {
  // management: ServiceWithTabs;
  design: ServiceWithTabs;
  pmc: ServiceWithStages;
  equipment: ServiceWithTabs;
  ppp: ServiceWithDetails;
  esg: ServiceWithDetails;
  green: ServiceWithDetails;
  ifm: ServiceWithDetails;
  accreditation: ServiceWithDetails;
}

// Data object for clean JSX
const consultData: ConsultData = {
  // management: {
  //     title: "Management Consultancy",
  //     subtitle: "Strategic advisory to bring clarity, direction, and financial viability to healthcare ventures.",
  //     tabs: [
  //         {
  //             eventKey: "dpr",
  //             title: "DPR & Market Intelligence",
  //             description: "We prepare comprehensive DPRs to assess viability and prospects of proposed facilities through market intelligence and financial feasibility.",
  //             details: {
  //                 scope: ["Demand–supply analysis, competitor benchmarking, risk assessment.", "Feasibility studies with IRR, ROI, EBITDA, DSCR ratios."],
  //                 benefits: ["Bankable reports for promoters, lenders, and investors.", "Reliable insights into service mix, consumer behaviour, and project costs."]
  //             }
  //         },
  //         {
  //             eventKey: "audit",
  //             title: "Performance Audit",
  //             description: "Audit of existing facilities to evaluate infrastructure, systems, productivity, revenue, and expenses.",
  //             details: {
  //                 scope: ["Internal & external environment scans, IT assessment.", "Tariff rationalisation, workflow re-engineering."],
  //                 benefits: ["Optimised resource utilisation, streamlined organograms.", "Improved profitability and EBIDTA margin."]
  //             }
  //         },
  //         {
  //             eventKey: "commissioning",
  //             title: "Commissioning Assistance",
  //             description: "Operational readiness support for new hospitals.",
  //             details: {
  //                 scope: ["SOPs, HR manuals, organograms, workforce planning, recruitment.", "IT systems integration, tariff design."],
  //                 benefits: ["Faster commissioning, minimised delays, robust organisational systems.", "Well-prepared core management team."]
  //             }
  //         }
  //     ]
  // },
  design: {
    title: "Hospital Design",
    subtitle: "Patient-centric, sustainable, and efficient design solutions.",
    tabs: [
      {
        eventKey: "architectural",
        title: "Architectural Design",
        description:
          "From space programming to master planning, delivering functional and aesthetic healthcare environments.",
        details: {
          deliverables: [
            "Space program, clustering matrix, schematic design, tender BOQs, GFC drawings.",
          ],
          image: "/images/services/consult/arch-design.jpg",
        },
      },
      {
        eventKey: "structural",
        title: "Structural Design",
        description:
          "Robust structural frameworks tailored to healthcare needs.",
        details: {
          deliverables: [
            "Design Basis Report, structural schemes, BOQs, GFC structural drawings.",
          ],
          image: "/images/services/consult/structural-design.jpg",
        },
      },
      {
        eventKey: "mep",
        title: "MEP Design",
        description:
          "Comprehensive mechanical, electrical & plumbing solutions.",
        details: {
          systems_covered: [
            "Electrical, plumbing, HVAC, fire safety, IT, networking, BMS, low-voltage systems.",
          ],
          deliverables: [
            "Design Basis Report, schematic designs, BOQs, GFC drawings, contractor shop drawing approvals.",
          ],
          image: "/images/services/consult/mep-design.jpg",
        },
      },
      {
        eventKey: "interior",
        title: "Interior Design",
        description:
          "Healing interiors balancing aesthetics with technical precision.",
        details: {
          deliverables: [
            "Concept schemes, 3D perspectives, schematic drawings, BOQs, GFC drawings.",
          ],
          image: "/images/services/consult/hospital-design.jpg",
        },
      },
    ],
  },
  pmc: {
    title: "Project Management Consultancy (PMC)",
    subtitle:
      "Ensuring timely, cost-effective, and quality-driven project execution.",
    image: "/images/services/consult/project-management.jpg",
    stages: [
      "Pre-Construction Stage: Strategic planning, budgeting, design finalisation, tendering, and agency selection.",
      "Construction Stage: Supervision with focus on cost, time, quality, safety, and compliance.",
      "Post-Construction Stage: Punch list management, documentation handover, training, facility readiness.",
      "Project Advisory: Periodic audits, quality reviews, budget tracking, and stakeholder coordination.",
    ],
  },
  equipment: {
    title: "Equipment Planning & Integration",
    subtitle:
      "Turnkey solutions for medical technology procurement and installation.",
    tabs: [
      {
        eventKey: "med-planning",
        title: "Medical Equipment",
        description:
          "Needs-based equipment selection aligned with clinical pathways and future-proofing.",
        details: {
          image: "/images/services/consult/med-eqpt.jpg",
        },
      },
      {
        eventKey: "equip-planning",
        title: "Equipment Planning",
        description:
          "Preparation of schedules, vendor presentations, technology reports.",
        details: {
          image: "/images/services/consult/eqpt-planning.jpg",
        },
      },
      {
        eventKey: "procurement",
        title: "Equipment Procurement",
        description:
          "Vendor-neutral procurement, techno-commercial analysis, financial negotiations, demonstrations.",
        details: {
          image: "/images/services/consult/procurement.jpg",
        },
      },
      {
        eventKey: "installation",
        title: "Installation & Commissioning",
        description:
          "Supervision of installation and validation of critical equipment (ICU, OT, Radiology, CSSD).",
        details: {
          image: "/images/services/consult/equipment-installing.jpg",
        },
      },
    ],
  },

  ppp: {
    title: "Public Private Partnership (PPP) Advisory",
    subtitle:
      "Structuring and executing PPP models for healthcare infrastructure.",
    image: "/images/services/consult/ppp-advisory.jpg",
    details: {
      scope: [
        "Transaction advisory, bid process management, concession agreements, financial modelling, risk allocation.",
      ],
      benefits: [
        "Bankable PPP structures, improved risk sharing.",
        "Compliance with NITI Aayog/MoHFW/IFC guidelines, attraction of private investment.",
      ],
    },
  },
  esg: {
    title: "Hospital ESG Advisory Services",
    subtitle:
      "Embedding sustainability and responsibility into healthcare operations.",
    image: "/images/services/consult/esg-advisory.jpg",
    details: {
      scope: [
        "Carbon footprint & GHG analysis, water/waste audits, patient safety, governance frameworks, ESG reporting.",
      ],
      deliverables: [
        "ESG Risk Register, compliance reports aligned with GRI, SASB, TCFD, BRSR, WHO/IFC standards.",
      ],
      benefits: [
        "Global investor credibility, access to green financing, improved efficiency, long-term sustainability.",
      ],
    },
  },
  green: {
    title: "Hospital Green Building Consultancy",
    subtitle:
      "Designing sustainable healthcare facilities certified by international benchmarks.",
    image: "/images/services/consult/igbc.jpg",
    details: {
      scope: [
        "Energy-efficient design, renewable energy integration, HVAC optimisation, eco-friendly materials.",
      ],
      certifications: ["LEED, IGBC, GRIHA, EDGE."],
      deliverables: [
        "Concept reports, sustainability strategies, certification documentation, post-construction audits.",
      ],
      benefits: [
        "Reduced operating costs, healthier environments, enhanced brand reputation, eligibility for green funding.",
      ],
    },
  },
  ifm: {
    title: "Integrated Facility Management (IFM) Consultancy",
    subtitle:
      "Optimising hospital operations through smart facility management systems.",
    image: "/images/header2.jpg",
    details: {
      scope: [
        "Hard & soft services (maintenance, housekeeping, biomedical waste, security, patient transport).",
      ],
      digital_integration: ["CAFM, IoT, CMMS for real-time monitoring."],
      deliverables: [
        "IFM strategy, SOPs, operations manual, digital roadmap, training modules.",
      ],
      benefits: [
        "Seamless patient experience, optimised asset lifecycle, cost savings, NABH/JCI compliance.",
      ],
    },
  },
  accreditation: {
    title: "Accreditation Advisory",
    subtitle:
      "Hospitals and healthcare facilities must meet stringent national and international quality standards to ensure patient safety, clinical excellence, and operational efficiency. Infra.Health provides end-to-end accreditation advisory services to prepare healthcare organisations for certifications such as NABH, JCI, NABL, and ISO.",
    details: {
      scope_of_work: [
        "Gap Assessment: Comprehensive audit of current hospital systems, processes, and infrastructure against accreditation standards.",
        "Policy & SOP Development: Preparation and implementation of department-specific SOPs, manuals, and clinical guidelines.",
        "Quality & Safety Frameworks: Establishment of infection control protocols, patient safety checklists, and clinical governance systems.",
        "Training & Capacity Building: Hands-on training for doctors, nurses, and administrative staff on accreditation requirements.",
        "Mock Audits & Compliance Readiness: Trial inspections, documentation reviews, and corrective action plans to ensure 100% compliance.",
        "Multi-Accreditation Advisory: Assistance for NABH (India), JCI (Global), NABL (Laboratories), ISO 9001/14001 (Quality & Environmental Standards).",
      ],
      deliverables: [
        "Accreditation Roadmap with timelines and milestones",
        "SOP and policy manuals customised to hospital workflows",
        "Training modules for medical and non-medical staff",
        "Audit reports and corrective action tracking",
        "Mock inspection reports before final accreditation audit",
      ],
      benefits: [
        "Achieve accreditation with confidence and reduced lead time",
        "Enhance patient trust, safety, and clinical outcomes",
        "Improve hospital reputation and market positioning",
        "Eligibility for empanelment with insurance providers, corporates, and international collaborations",
        "Structured systems ensuring long-term sustainability and quality improvement",
      ],
    },
  },
};

interface DetailSectionProps {
  details: TabDetails;
}

const DetailSection: React.FC<DetailSectionProps> = ({ details }) => (
  <Row>
    {/* Left side: text list */}
    <Col md={12}>
      {Object.entries(details).map(
        ([key, value]) =>
          key !== "image" && ( // skip image key
            <div key={key}>
              <h4 className="details-title">{key.replace(/_/g, " ")}:</h4>
              <ul className="details-list">
                {Array.isArray(value) &&
                  value.map((item: string, index: number) => (
                    <li key={index}>
                      <span>{item}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )
      )}
    </Col>
  </Row>
);

export default function ConsultClient() {
  const [activeLink, setActiveLink] = useState<string>("hospital-design");
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

  // const createTabbedSection = (service: ServiceWithTabs) => {
  //   const [activeTab, setActiveTab] = useState(service.tabs[0].eventKey);

  //   return (
  //     <Tab.Container
  //       activeKey={activeTab}
  //       onSelect={(k) => setActiveTab(k || service.tabs[0].eventKey)}
  //     >
  //       <Row>
  //         {/* Tabs */}
  //         <Col md={12}>
  //           <Nav variant="pills" className="service-tabs mb-4">
  //             {service.tabs.map((tab: ServiceTab) => (
  //               <Nav.Item key={tab.eventKey}>
  //                 <Nav.Link eventKey={tab.eventKey}>{tab.title}</Nav.Link>
  //               </Nav.Item>
  //             ))}
  //           </Nav>
  //         </Col>
  //         {/* Image that changes per active tab */}
  //         <Col
  //           md={12}
  //           className="d-flex align-items-center justify-content-center"
  //         >
  //           {service.tabs
  //             .filter((tab) => tab.eventKey === activeTab)
  //             .map((tab) =>
  //               tab.details?.image ? (
  //                 <img
  //                   key={tab.eventKey}
  //                   src={tab.details.image}
  //                   alt={tab.title}
  //                   className="w-100 img-fluid rounded shadow-sm"
  //                   style={{
  //                     objectFit: "cover",
  //                     maxWidth: "100%",
  //                     height: "300px",
  //                   }}
  //                 />
  //               ) : service.image ? (
  //                 <img
  //                   key={tab.eventKey}
  //                   src={service.image}
  //                   alt={tab.title}
  //                   className="w-100 img-fluid rounded shadow-sm"
  //                   style={{
  //                     maxWidth: "100%",
  //                     height: "300px",
  //                     objectFit: "cover",
  //                     borderRadius: "8px",
  //                   }}
  //                 />
  //               ) : null
  //             )}
  //         </Col>

  //         {/* Content */}
  //         <Col md={12}>
  //           <Tab.Content className="service-card consult-card">
  //             {service.tabs.map((tab: ServiceTab) => (
  //               <Tab.Pane eventKey={tab.eventKey} key={tab.eventKey}>
  //                 <p>{tab.description}</p>
  //                 {tab.details && <DetailSection details={tab.details} />}
  //               </Tab.Pane>
  //             ))}
  //           </Tab.Content>
  //         </Col>
  //       </Row>
  //     </Tab.Container>
  //   );
  // };

  interface TabbedSectionProps {
    service: ServiceWithTabs;
  }

  const TabbedSection: React.FC<TabbedSectionProps> = ({ service }) => {
    const [activeTab, setActiveTab] = useState(service.tabs[0].eventKey);

    return (
      <Tab.Container
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || service.tabs[0].eventKey)}
      >
        <Row>
          {/* Tabs */}
          <Col md={12}>
            <Nav variant="pills" className="service-tabs mb-4">
              {service.tabs.map((tab: ServiceTab) => (
                <Nav.Item key={tab.eventKey}>
                  <Nav.Link eventKey={tab.eventKey}>{tab.title}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>

          {/* Image that changes per active tab */}
          <Col
            md={12}
            className="d-flex align-items-center justify-content-center"
          >
            {service.tabs
              .filter((tab) => tab.eventKey === activeTab)
              .map((tab) =>
                tab.details?.image ? (
                  <img
                    key={tab.eventKey}
                    src={tab.details.image}
                    alt={tab.title}
                    className="w-100 img-fluid rounded shadow-sm"
                    style={{
                      objectFit: "cover",
                      maxWidth: "100%",
                      height: "300px",
                    }}
                  />
                ) : service.image ? (
                  <img
                    key={tab.eventKey}
                    src={service.image}
                    alt={tab.title}
                    className="w-100 img-fluid rounded shadow-sm"
                    style={{
                      maxWidth: "100%",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : null
              )}
          </Col>

          {/* Content */}
          <Col md={12}>
            <Tab.Content className="service-card consult-card">
              {service.tabs.map((tab: ServiceTab) => (
                <Tab.Pane eventKey={tab.eventKey} key={tab.eventKey}>
                  <p>{tab.description}</p>
                  {tab.details && <DetailSection details={tab.details} />}
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  };

  return (
    <>
      <main className="container py-5 mt-4">
        <div
          className="text-left mx-auto pb-4"
          style={{ maxWidth: "1920px" }}
        >
          <p className="section-subtitle">OUR SERVICES</p>
          <h3 className="section-title">
            <span>Consult</span>ancy
          </h3>
          <p className="mt-3 text-muted">
            With expertise spanning Management, Design, and more, we offer
            comprehensive healthcare infrastructure solutions to empower
            providers, governments, and investors worldwide.
          </p>
        </div>

        <Row>
          <Col lg={3} className="d-none d-lg-block">
            <Nav className="flex-column sticky-top sidenav">
              {/* <Nav.Link
                href="#management-consultancy"
                onClick={(e) => handleNavLinkClick(e, "management-consultancy")}
                className={
                  activeLink === "management-consultancy" ? "active" : ""
                }
              >
                Management Consultancy
              </Nav.Link> */}
              <Nav.Link
                href="#hospital-design"
                onClick={(e) => handleNavLinkClick(e, "hospital-design")}
                className={activeLink === "hospital-design" ? "active" : ""}
              >
                Hospital Design
              </Nav.Link>
              <Nav.Link
                href="#pmc"
                onClick={(e) => handleNavLinkClick(e, "pmc")}
                className={activeLink === "pmc" ? "active" : ""}
              >
                Project Management (PMC)
              </Nav.Link>
              <Nav.Link
                href="#equipment-planning"
                onClick={(e) => handleNavLinkClick(e, "equipment-planning")}
                className={activeLink === "equipment-planning" ? "active" : ""}
              >
                Equipment Planning
              </Nav.Link>
              <Nav.Link
                href="#ppp-advisory"
                onClick={(e) => handleNavLinkClick(e, "ppp-advisory")}
                className={activeLink === "ppp-advisory" ? "active" : ""}
              >
                PPP Advisory
              </Nav.Link>
              <Nav.Link
                href="#esg-advisory"
                onClick={(e) => handleNavLinkClick(e, "esg-advisory")}
                className={activeLink === "esg-advisory" ? "active" : ""}
              >
                ESG Advisory
              </Nav.Link>
              <Nav.Link
                href="#green-building"
                onClick={(e) => handleNavLinkClick(e, "green-building")}
                className={activeLink === "green-building" ? "active" : ""}
              >
                Green Building
              </Nav.Link>
              <Nav.Link
                href="#ifm-consultancy"
                onClick={(e) => handleNavLinkClick(e, "ifm-consultancy")}
                className={activeLink === "ifm-consultancy" ? "active" : ""}
              >
                IFM Consultancy
              </Nav.Link>
              <Nav.Link
                href="#accreditation-advisory"
                onClick={(e) => handleNavLinkClick(e, "accreditation-advisory")}
                className={
                  activeLink === "accreditation-advisory" ? "active" : ""
                }
              >
                Accreditation Advisory
              </Nav.Link>
            </Nav>
          </Col>

          <Col lg={9}>
            <div className="vstack gap-1">
              {/* <section id="management-consultancy">
                                <h3>{consultData.management.title}</h3>
                                <p className="text-muted fs-5">{consultData.management.subtitle}</p>
                                {createTabbedSection(consultData.management)}
                            </section> */}

              <section id="hospital-design">
                <h3>{consultData.design.title}</h3>
                <p className="text-muted fs-5">{consultData.design.subtitle}</p>
                <TabbedSection service={consultData.design} />
              </section>

              <section id="pmc">
                <h3>{consultData.pmc.title}</h3>
                <p className="text-muted fs-5">{consultData.pmc.subtitle}</p>
                <Row className="align-items-center">
                  {consultData.pmc.image && (
                    <Col md={12} className="d-flex justify-content-center">
                      <img
                        src={consultData.pmc.image}
                        alt={consultData.pmc.title}
                        className="w-100 img-fluid rounded shadow-sm"
                        style={{
                          maxWidth: "100%",
                          height: "300px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </Col>
                  )}
                  <Col md={12}>
                    <div className="service-card consult-card">
                      <DetailSection
                        details={{ stages: consultData.pmc.stages }}
                      />
                    </div>
                  </Col>
                </Row>
              </section>

              <section id="equipment-planning">
                <h3>{consultData.equipment.title}</h3>
                <p className="text-muted fs-5">
                  {consultData.equipment.subtitle}
                </p>
                <TabbedSection service={consultData.equipment} />
              </section>
              <section id="ppp-advisory">
                <h3>{consultData.ppp.title}</h3>
                <p className="text-muted fs-5">{consultData.ppp.subtitle}</p>
                <Row className="align-items-center">
                  {consultData.ppp.image && (
                    <Col md={12} className="d-flex justify-content-center">
                      <img
                        src={consultData.ppp.image}
                        alt={consultData.ppp.title}
                        className="w-100 img-fluid rounded shadow-sm"
                        style={{
                          maxWidth: "100%",
                          height: "300px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </Col>
                  )}
                  <Col md={12}>
                    <div className="service-card consult-card">
                      <DetailSection details={consultData.ppp.details} />
                    </div>
                  </Col>
                </Row>
              </section>

              <section id="esg-advisory">
                <h3>{consultData.esg.title}</h3>
                <p className="text-muted fs-5">{consultData.esg.subtitle}</p>
                <Row className="align-items-center">
                  {consultData.esg.image && (
                    <Col md={12} className="d-flex justify-content-center">
                      <img
                        src={consultData.esg.image}
                        alt={consultData.esg.title}
                        className="w-100 img-fluid rounded shadow-sm"
                        style={{
                          maxWidth: "100%",
                          height: "300px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </Col>
                  )}
                  <Col md={12}>
                    <div className="service-card consult-card">
                      <DetailSection details={consultData.esg.details} />
                    </div>
                  </Col>
                </Row>
              </section>

              <section id="green-building">
                <h3>{consultData.green.title}</h3>
                <p className="text-muted fs-5">{consultData.green.subtitle}</p>
                <Row className="align-items-center">
                  {consultData.green.image && (
                    <Col md={12} className="d-flex justify-content-center">
                      <img
                        src={consultData.green.image}
                        alt={consultData.green.title}
                        className="w-100 img-fluid rounded shadow-sm"
                        style={{
                          maxWidth: "100%",
                          height: "300px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </Col>
                  )}
                  <Col md={12}>
                    <div className="service-card consult-card">
                      <DetailSection details={consultData.green.details} />
                    </div>
                  </Col>
                </Row>
              </section>

              <section id="ifm-consultancy">
                <h3>{consultData.ifm.title}</h3>
                <p className="text-muted fs-5">{consultData.ifm.subtitle}</p>
                <Row className="align-items-center">
                  {consultData.ifm.image && (
                    <Col md={12} className="d-flex justify-content-center">
                      <img
                        src={consultData.ifm.image}
                        alt={consultData.ifm.title}
                        className="w-100 img-fluid rounded shadow-sm"
                        style={{
                          maxWidth: "100%",
                          height: "300px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </Col>
                  )}
                  <Col md={12}>
                    <div className="service-card consult-card">
                      <DetailSection details={consultData.ifm.details} />
                    </div>
                  </Col>
                </Row>
              </section>

              <section id="accreditation-advisory">
                <h3>{consultData.accreditation.title}</h3>
                <p className="text-muted">
                  {consultData.accreditation.subtitle}
                </p>
                <div className="service-card consult-card mt-3">
                  <DetailSection details={consultData.accreditation.details} />
                </div>
              </section>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}
