"use client";

import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Nav, Modal } from "react-bootstrap";
import { BsCheckCircleFill } from "react-icons/bs";
import Image from "next/image";
import "../../../styles/services.css";
import { FaClock, FaGlobe, FaMicrochip, FaUsers, FaXmark } from "react-icons/fa6";

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

const motData: SectionData[] = [
  {
    id: "intro",
    title: "Modular Operating Theatres (MOTs) by Infra.Health",
    subtitle: "Transforming Surgical Environments into Future-Ready Ecosystems",
    details: [
      {
        items: [
          "Modern healthcare demands surgical environments that are not only sterile and safe, but also flexible, technologically advanced, and globally compliant.",
          "Infra.Health’s Modular Operating Theaters (MOTs) are designed to meet these expectations, offering world-class solutions that combine cutting-edge engineering with medical functionality.",
          "Whether for a greenfield hospital, a specialized cancer or cardiac centre, or retrofitting existing facilities, Infra.Health MOTs ensure speed, precision, sustainability, and patient safety at every stage.",
        ],
      },
    ],
  },
  {
    id: "features",
    title: "Core Features of Infra.Health MOTs",
    details: [
      {
        heading: "1. Modular Architecture",
        items: [
          "Factory-fabricated wall, ceiling, and flooring panels for precision fit and rapid installation.",
          "Seamless, antibacterial surfaces (powder-coated steel, HPL, or stainless steel) to minimize bacterial growth.",
          "Customizable layouts adaptable for hybrid OTs, robotic surgery, and specialized disciplines.",
          "Rapid Deployment – Prefabricated modules reduce on-site construction timelines by up to 40%.",
        ],
      },
      {
        heading: "2. Advanced Infection Control",
        items: [
          "HEPA & ULPA Filtration Systems (ISO 14644 Class 5 & 7).",
          "Laminar Airflow (LAF) ceilings ensuring ultra-clean environments with controlled airflow.",
          "Hermetically sealed automatic doors with touchless access.",
          "Antistatic, seamless vinyl or conductive flooring compliant with HTM 02-01 standards.",
          "Integrated UV disinfection systems for enhanced sterilization between surgeries.",
        ],
      },
      {
        heading: "3. Integrated Medical Engineering Systems",
        items: [
          "Medical Gas Pipeline Systems (MGPS) – O₂, N₂O, compressed air, and vacuum.",
          "Surgeon Control Panels – touchscreen interface for HVAC, lighting, and medical equipment integration.",
          "Surgical Lighting Systems – LED shadowless lights with adjustable intensity and colour temperature.",
          "Ceiling-Mounted Pendants for gas, power, and data, reducing floor clutter.",
          "Video Integration Systems – PACS, surgical recording, and real-time data sharing.",
          "Optional Hybrid OT integration with intraoperative MRI/CT.",
        ],
      },
      {
        heading: "4. Digital & Smart OT Integration",
        items: [
          "IoT-enabled sensors for air quality, temperature, and humidity.",
          "AI-powered monitoring dashboards for predictive maintenance.",
          "Integration with HIS (Hospital Information Systems), EMR, and telemedicine platforms.",
          "Remote access for training, monitoring, and surgical assistance.",
        ],
      },
      {
        heading: "5. Global Compliance & Accreditation",
        items: [
          "Designed to align with NABH, JCI, WHO healthcare quality standards.",
          "DIN 1946-4 (Ventilation for surgical rooms).",
          "ISO 14644 (Cleanroom classification).",
          "HTM 03-01 (UK healthcare technical standards).",
          "NFPA 99 (International fire and safety standards).",
          "Ensures accreditation readiness for hospitals across India, Middle East, Africa, Europe, and Asia-Pacific.",
        ],
      },
    ],
  },
  {
    id: "types",
    title: "Types of Modular OTs",
    details: [
      {
        items: [
          {
            text: "General Surgery Operation Theatres",
            image: "/images/products/ots/1.jpg",
          },
          {
            text: "Hybrid Operation Theatres",
            image: "/images/products/ots/2.jpg",
          },
          {
            text: "Cardiac Operation Theatres",
            image: "/images/products/ots/3.jpg",
          },
          {
            text: "Oncology Surgery Operation Theatres",
            image: "/images/products/ots/4.jpg",
          },
          {
            text: "Neurosurgery Operation Theatres",
            image: "/images/products/ots/5.jpg",
          },
          {
            text: "Orthopaedic Operation Theatres",
            image: "/images/products/ots/6.jpg",
          },
          {
            text: "Robotic Surgery Operation Theatres",
            image: "/images/products/ots/7.jpg",
          },
          {
            text: "Emergency & Trauma Operation Theatres",
            image: "/images/products/ots/8.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "advantages",
    title: "Competitive Advantages",
    details: [
      {
        items: [
          "Turnkey delivery – from design and manufacturing to installation.",
          "Scalable & relocatable – modules can be expanded or repurposed.",
          "Sustainability – energy-efficient HVAC, recyclable materials.",
          "Cost efficiency – optimized sourcing for international affordability.",
          "Global adaptability – tailored for diverse climate conditions.",
          "Clinical focus – designed with surgeons, infection control specialists, and owners.",
        ],
      },
    ],
  },
  {
    id: "applications",
    title: "Applications Across Healthcare Infrastructure",
    details: [
      {
        items: [
          "Multispecialty Hospitals (100–2000 beds).",
          "Dedicated Specialty Centres – Cancer, Cardiac, Neuro, Ortho.",
          "Government & PPP Hospitals.",
          "Defence & Military Medical Facilities.",
          "Teaching Hospitals & Research Institutes.",
          "Mobile / Temporary Surgical Units for disaster relief.",
        ],
      },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Infra.Health?",
    points: [
      {
        icon: FaGlobe,
        title: "Global Vision, Local Expertise",
        text: "Trusted across India and expanding to international markets.",
      },
      {
        icon: FaUsers,
        title: "Multidisciplinary Expertise",
        text: "Architects, engineers, clinicians, and project managers on one platform.",
      },
      {
        icon: FaClock,
        title: "Speed & Reliability",
        text: "Track record of rapid hospital execution with uncompromised quality.",
      },
      {
        icon: FaMicrochip,
        title: "Future-Proof Design",
        text: "Ready for AI, robotics, and digital health ecosystems.",
      },
    ],
  },
];

const DetailSection: React.FC<{
  details: Detail[];
  onImageClick: (src: string) => void;
}> = ({ details, onImageClick }) => (
  <div className="detail-section">
    {details.map((detail, i) => (
      <div key={i} className="mb-4">
        {detail.heading && <h4 className="mb-3">{detail.heading}</h4>}

        {typeof detail.items[0] === "object" ? (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {(detail.items as DetailItem[]).map((item, j) => (
              <Col key={j}>
                <div
                  className="detail-card text-center h-100"
                  style={{ cursor: item.image ? "pointer" : "default" }}
                  onClick={() => item.image && onImageClick(item.image!)}
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.text}
                      width={250}
                      height={160}
                      className="img-fluid rounded shadow-sm mb-2"
                    />
                  )}
                  <p className="fw-medium">
                    {item.text.includes("Operation Theatres") ? (
                      <>
                        {item.text.replace(" Operation Theatres", "")}
                        <br />
                        Operation Theatres
                      </>
                    ) : (
                      item.text
                    )}
                  </p>
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

export default function MOTPage() {
  const [activeLink, setActiveLink] = useState<string>("intro");
  const sectionsRef = useRef<Record<string, Element>>({});
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = (img: string) => {
    setSelectedImage(img);
    setShow(true);
  };

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
    <main className="container py-5 mt-4">
      <div
        className="text-left mx-auto mb-5 pb-4"
        style={{ maxWidth: "1920px" }}
      >
        <p className="section-subtitle">OUR SOLUTIONS</p>
        <h3 className="section-title">
          Modular <span>Operating Theatres</span> (MOTs)
        </h3>
        <p className="mt-3 text-muted">
          Transforming surgical environments into future-ready ecosystems with
          speed, safety, and global compliance.
        </p>
      </div>

      <Row>
        {/* Side Navigation */}
        <Col lg={3} className="d-none d-lg-block">
          <Nav className="flex-column sticky-top sidenav">
            {motData.map((section) => (
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
            {motData.map((section) => (
              <section id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.subtitle && (
                  <p className="text-muted fs-5">{section.subtitle}</p>
                )}

                <div className="service-card">
                  {section.details && (
                    <DetailSection
                      details={section.details}
                      onImageClick={handleShow}
                    />
                  )}

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
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        contentClassName="bg-transparent border-0 shadow-none"
      >
        <FaXmark
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "4px",
            right: "20px",
            cursor: "pointer",
            backgroundColor: "#b6520f",
            color:"#fff",
            fontSize: "28px",
            borderRadius:"50%",
            padding:"5px"
          }}
        />
        {selectedImage && (
          <Image
            src={selectedImage}
            alt="Preview"
            width={900}
            height={600}
            className="w-100 h-auto rounded"
          />
        )}
      </Modal>
    </main>
  );
}
