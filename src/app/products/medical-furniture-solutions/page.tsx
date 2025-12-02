"use client";

import { useState, useEffect } from "react";
import { Row, Col, Nav } from "react-bootstrap";
import Image from "next/image";
import "../../../styles/services.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ------------------------------
// TYPES
// ------------------------------

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

// ------------------------------
// DATA
// ------------------------------

const furnitureData: SectionData[] = [
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

// ------------------------------
// DETAIL SECTION COMPONENT
// ------------------------------

const DetailSection: React.FC<{
  details: Detail[];
  onImageClick: (images: string[], index: number) => void;
}> = ({ details, onImageClick }) => (
  <div className="detail-section">
    {details.map((detail, i) => (
      <div key={i} className="mb-4">
        {detail.heading && <h4 className="mb-3">{detail.heading}</h4>}

        {/* GRID WITH IMAGES */}
        {typeof detail.items[0] === "object" ? (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {(detail.items as DetailItem[]).map((item, j) => (
              <Col key={j}>
                <div
                  className="detail-card text-center h-100"
                  style={{ cursor: item.image ? "pointer" : "default" }}
                  onClick={() =>
                    item.image &&
                    onImageClick(
                      (detail.items as DetailItem[]).map((it) => it.image!) as string[],
                      j
                    )
                  }
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
                  <p className="fw-medium">{item.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <ul className="details-list">
            {(detail.items as string[]).map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
);

// ------------------------------
// MAIN COMPONENT
// ------------------------------

export default function FurniturePage() {
  // GALLERY
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleImageClick = (images: string[], index: number) => {
    setGalleryImages(images);
    setActiveIndex(index);
    setIsGalleryOpen(true);
  };

  // -----------------------
  // TAB NAVIGATION (NO SCROLL)
  // -----------------------

  const sections = furnitureData.map((s) => s.id);

  const getInitial = () => {
    if (typeof window === "undefined") return sections[0];
    const hash = window.location.hash.replace("#", "");
    return sections.includes(hash) ? hash : sections[0];
  };

  const [activeSection, setActiveSection] = useState<string>(getInitial);

  useEffect(() => {
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

  // ------------------------------
  // RENDER
  // ------------------------------

  return (
    <main className="container py-5 mt-4">
      {/* HEADER */}
      <div className="mx-auto mb-5 pb-4" style={{ maxWidth: "1920px" }}>
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <p className="section-subtitle">OUR PRODUCTS</p>
            <h3 className="section-title">
              Medical <span>Furniture Solutions</span>
            </h3>
            <p className="mt-3 text-muted">
              Ergonomic, durable, and patient-centric furniture that enhances
              comfort, efficiency, and safety across healthcare facilities.
            </p>
          </div>

          <div className="cta-buttons">
            <a href="/products">
              <div className="btn primary-btn" style={{ width: "auto", padding: "12px" }}>
                Explore Our Products
              </div>
            </a>
          </div>
        </div>
      </div>

      <Row>
        {/* LEFT SIDEBAR */}
        <Col lg={3} className="d-none d-lg-block">
          <Nav className="flex-column sticky-top sidenav">
            {furnitureData.map((section) => (
              <Nav.Link
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={activeSection === section.id ? "active" : ""}
              >
                {section.title}
              </Nav.Link>
            ))}
          </Nav>
        </Col>

        {/* RIGHT TAB CONTENT */}
        <Col lg={9}>
          <div className="vstack gap-1">
            {furnitureData.map((section) =>
              activeSection === section.id ? (
                <section key={section.id}>
                  <h3>{section.title}</h3>

                  {section.subtitle && (
                    <p className="text-muted fs-5">{section.subtitle}</p>
                  )}

                  <div className="service-card prod-card">
                    {section.details && (
                      <DetailSection
                        details={section.details}
                        onImageClick={handleImageClick}
                      />
                    )}

                    {section.points && (
                      <div className="value-grid mt-2" style={{ gap: "50px" }}>
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
              ) : null
            )}
          </div>
        </Col>
      </Row>

      {/* LIGHTBOX SWIPER */}
      {isGalleryOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsGalleryOpen(false);
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              fontSize: "28px",
              color: "#fff",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              zIndex: 10000,
            }}
            onClick={() => setIsGalleryOpen(false)}
          >
            ✕
          </button>

          <Swiper
            initialSlide={activeIndex}
            modules={[Navigation, Pagination, Keyboard]}
            navigation
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            style={{ width: "90%", height: "90%" }}
          >
            {galleryImages.map((src, index) => (
              <SwiperSlide key={index}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Image
                    src={src}
                    alt={`Slide ${index}`}
                    width={1000}
                    height={700}
                    style={{
                      maxHeight: "90vh",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
}
