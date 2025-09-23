"use client";

import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Nav } from "react-bootstrap";
import "../../../styles/services.css";
import {
  FaUserMd,
  FaGlobe,
  FaClipboardCheck,
  FaAward,
  FaLightbulb,
} from "react-icons/fa";

interface DetailBlock {
  [key: string]: string[];
}

interface ConstructService {
  id: string;
  title: string;
  description: string;
  details: DetailBlock;
  image?: string;
}

interface WhyPoint {
  title: string;
  text: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface WhyInfraHealth {
  title: string;
  points: WhyPoint[];
}

interface ConstructData {
  intro: {
    title: string;
    main: string;
    sub: string;
  };
  services: ConstructService[];
  why: WhyInfraHealth;
}

const constructData: ConstructData = {
  intro: {
    title: "Construct",
    main: "Healthcare Infrastructure Execution Excellence",
    sub: "Infra.Health delivers world-class healthcare infrastructure through a dedicated Construct vertical... designed to deliver accreditation-ready, patient-centric, and future-proof hospitals that meet international benchmarks such as NABH, JCI, NFPA, HTM, and MoHFW guidelines.",
  },
  services: [
    {
      id: "epc",
      title: "Engineering, Procurement & Construction (EPC)",
      description:
        "The EPC model ensures single-point accountability, combining engineering excellence, efficient procurement, and seamless construction delivery.",
      image: "/images/services/construct/epc.jpg",
      details: {
        "Scope of Work": [
          "Civil and structural construction of healthcare facilities, from foundations to superstructure",
          "Hospital-grade interiors, infection-control finishes, and modular installations",
          "Procurement and execution of MEPF & ELV systems (HVAC, electrical, plumbing, fire, medical gases, automation, and IT)",
          "Turnkey setup of critical care infrastructure: ICUs, OTs, labs, CSSD, imaging, oncology, dialysis, and emergency units",
          "Strict adherence to national and international healthcare standards",
        ],
        "Strategic Benefits": [
          "Single-window responsibility ensuring quality, cost, and schedule adherence",
          "Minimised risk exposure by integrating design, procurement, and construction under one roof",
          "Rapid commissioning with a streamlined, standardised approach",
          "Investor confidence with bankable, compliance-ready facilities",
        ],
      },
    },
    {
      id: "design-build",
      title: "Design & Build",
      description:
        "A fast-track, integrated delivery model where Infra.Health manages the entire project — from design concept to physical handover.",
      image: "/images/services/construct/design.jpg",
      details: {
        "Scope of Work": [
          "Architectural, structural, interior, and MEPF design, fully integrated with execution",
          "BIM-enabled digital workflows for clash detection and precision engineering",
          "Procurement of hospital-grade materials, equipment integration, and construction delivery",
          "Design aligned with healthcare workflows, infection-control, and patient experience optimisation",
        ],
        "Strategic Benefits": [
          "Reduced redesign risks with single-point accountability for both design & construction",
          "Speed-to-market advantage through compressed timelines",
          "Predictable budgets and optimised lifecycle costs",
          "Operationally efficient designs driven by healthcare specialists and end-user engagement",
        ],
      },
    },
    {
      id: "fitout-retrofit",
      title: "Fitout & Retrofit",
      description:
        "Hospitals must evolve and modernise without disrupting ongoing patient services. Infra.Health provides phased fitout and retrofit solutions to expand capacity, upgrade systems, and align with the latest compliance standards.",
      image: "/images/services/construct/fitout.jpg",
      details: {
        "Scope of Work": [
          "Interior fitouts for new hospitals, including OPDs, wards, ICUs, OTs, labs, and diagnostic centres",
          "Retrofit upgrades of MEPF & ELV systems to enhance energy efficiency and safety",
          "Modular upgrades for CSSD, ICU clusters, isolation wards, and high-dependency units",
          "NABH/JCI accreditation retrofits — compliance-focused upgrades in fire safety, infection control, and patient safety",
          "Phased execution strategies to ensure zero disruption to hospital operations",
        ],
        "Strategic Benefits": [
          "Cost-effective modernisation compared to new builds",
          "Improved patient experience with upgraded facilities and interiors",
          "Extended lifecycle of hospital assets with energy and system upgrades",
          "Revenue growth through addition of new specialties and advanced care units",
        ],
      },
    },
    {
      id: "specialty-services",
      title: "Specialty Services",
      description:
        "Hospitals demand precision-engineered specialty systems that directly impact patient safety and operational efficiency. Infra.Health specialises in end-to-end delivery of critical hospital infrastructure systems.",
      image: "/images/services/consult/equipment-installing.jpg",
      details: {
        "Scope of Work": [
          "Integrated MEPF + ELV Engineering: HVAC, power distribution, plumbing, fire safety, automation, IT, and smart hospital systems",
          "Critical Care Infrastructure: Modular Operation Theatres, CSSD, ICUs, NICUs, PICUs, dialysis units, isolation rooms, and BSL labs",
          "Smart Hospital Integration: Building Management Systems (BMS), nurse call, RTLS (real-time location tracking), pneumatic tube systems, HIS/PACS connectivity",
          "Specialised Facilities: Oncology units, radiology/imaging centres, dialysis clusters, and advanced diagnostic labs",
        ],
        "Strategic Benefits": [
          "Accreditation-ready infrastructure aligned with NABH, JCI, NFPA, and HTM standards",
          "Enhanced patient safety through infection control and fail-safe systems",
          "Digital transformation with IoT-driven automation and smart monitoring",
          "Future-proof facilities built to adopt emerging technologies and clinical innovations",
        ],
      },
    },
  ],
  why: {
    title: "Why Infra.Health Construct?",
    points: [
      {
        title: "Healthcare-Focused Expertise",
        text: "Unlike generic contractors, we build exclusively for hospitals and medical facilities.",
        icon: FaUserMd,
      },
      {
        title: "Global Standards, Local Execution",
        text: "International best practices adapted to Indian and global healthcare markets.",
        icon: FaGlobe,
      },
      {
        title: "Turnkey Delivery",
        text: "From EPC to specialty fitouts, we provide single-window accountability.",
        icon: FaClipboardCheck,
      },
      {
        title: "Accreditation-Ready Projects",
        text: "Every facility designed and built to pass NABH, JCI, and global quality audits.",
        icon: FaAward,
      },
      {
        title: "Innovation & Technology",
        text: "BIM, IoT, and automation ensure smarter, faster, and safer delivery.",
        icon: FaLightbulb,
      },
    ],
  },
};

interface DetailSectionProps {
  details: DetailBlock;
}

const DetailSection: React.FC<DetailSectionProps & { image?: string }> = ({
  details,
  image,
}) => (
  <Row>
    {Object.entries(details).map(([key, value]) => (
      <React.Fragment key={key}>
        <Col md={12} className="mb-3">
          <h4 className="details-title">{key.replace(/_/g, " ")}:</h4>
          <ul className="details-list">
            {Array.isArray(value) &&
              value.map((item: string, index: number) => (
                <li key={index}>
                  <span>{item}</span>
                </li>
              ))}
          </ul>
        </Col>

        {key === "Scope of Work" && image && (
          <Col md={12} className="mb-4 text-center">
            <img
              src={image}
              alt="Service Illustration"
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </Col>
        )}
      </React.Fragment>
    ))}
  </Row>
);

export default function ConstructPage() {
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
            <span>{constructData.intro.title}</span>
          </h3>
          <h4 className="fs-4 mb-3">{constructData.intro.main}</h4>
          <p className="mt-3 text-muted">{constructData.intro.sub}</p>
        </div>

        <Row>
          <Col lg={3} className="d-none d-lg-block">
            <Nav className="flex-column sticky-top sidenav">
              {constructData.services.map((service) => (
                <Nav.Link
                  key={service.id}
                  href={`#${service.id}`}
                  onClick={(e) => handleNavLinkClick(e, service.id)}
                  className={activeLink === service.id ? "active" : ""}
                >
                  {service.title}
                </Nav.Link>
              ))}
              <Nav.Link
                href="#why-infrahealth"
                onClick={(e) => handleNavLinkClick(e, "why-infrahealth")}
                className={activeLink === "why-infrahealth" ? "active" : ""}
              >
                Why Infra.Health?
              </Nav.Link>
            </Nav>
          </Col>

          <Col lg={9}>
            <div className="vstack gap-5">
              {constructData.services.map((service) => (
                <section key={service.id} id={service.id}>
                  <h3>{service.title}</h3>
                  <p className="text-muted">{service.description}</p>
                  <div className="service-card">
                    <DetailSection
                      details={service.details}
                      image={service.image}
                    />
                  </div>
                </section>
              ))}
              <section id="why-infrahealth">
                <h2>{constructData.why.title}</h2>
                <div className="features construct-ft mt-4">
                  {constructData.why.points.map((point, index) => (
                    <div key={index} className="value-card col-md-3">
                      <div className="icon">
                        <point.icon size={32} />
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
      </main>
    </>
  );
}
