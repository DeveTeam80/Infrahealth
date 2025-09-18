"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Col, Container, Form, Nav, Row } from "react-bootstrap";
import { FaSearch, FaUniversity } from "react-icons/fa";
import {
  FaChartLine,
  FaGlobe,
  FaHandshake,
  FaStethoscope,
} from "react-icons/fa6";
import { IconType } from "react-icons";

import "../../styles/portfolio.css";
import "../../styles/services.css";
// import "../../styles/home.css";

// --- TYPES ---
export interface ValuePoint {
  icon: IconType;
  title: string;
  text: string;
}

export interface ValueSection {
  title: string;
  points: ValuePoint[];
}

export interface SpectrumSubItem {
  subTitle: string;
  points: string[];
}

export type SpectrumItem = string | SpectrumSubItem;

export interface FacilityCategory {
  id: string;
  title: string;
  icon: IconType;
  image: string;
  items: SpectrumItem[];
}

interface SpectrumSection {
  id: string;
  title: string;
  icon: IconType;
  points: string[];
}

export interface SolutionsData {
  value: ValueSection;
  spectrum: SpectrumSection[];
}

interface Project {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  transactionType: "buy" | "sell" | "lease"; // 👈 new field
  brief: {
    beds: string;
    config: string;
    area: string;
  };
  imageUrl: string;
}

const portfolioData: Project[] = [
  {
    id: 1,
    title: "100 Bedded Cancer & Cardiac Care Hospital, Baner",
    category: "Core Clinical Infrastructure",
    subcategory: "Specialty Hospitals",
    transactionType: "buy",
    brief: { beds: "100 Beds", config: "G+5 Floors", area: "80,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+1",
  },
  {
    id: 2,
    title:
      "1500 Bedded Hospital Dr. D Y Patil Hospital & Medical College, Pimpri",
    category: "Academic & Institutional Healthcare",
    subcategory: "Medical Colleges & Teaching Hospitals",
    transactionType: "lease",
    brief: {
      beds: "1500 Beds",
      config: "Multi-Building Campus",
      area: "1,200,000 sq.ft",
    },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+2",
  },
  {
    id: 3,
    title: "IVF Lab, Dr. D Y Patil Hospital",
    category: "Diagnostics & Life Sciences",
    subcategory: "Specialized Labs",
    transactionType: "sell",
    brief: { beds: "N/A", config: "Lab Facility", area: "5,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+3",
  },
  {
    id: 4,
    title: "Cardiac Cath Lab, Dr. D Y Patil Hospital",
    category: "Diagnostics & Life Sciences",
    subcategory: "Diagnostic Centers",
    transactionType: "buy",
    brief: { beds: "N/A", config: "Cath Lab", area: "3,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+4",
  },
  {
    id: 5,
    title: "400 Bedded Multi-Specialty Hospital, Pune",
    category: "Core Clinical Infrastructure",
    subcategory: "Multi-Specialty Hospitals",
    transactionType: "lease",
    brief: { beds: "400 Beds", config: "G+8 Floors", area: "350,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+5",
  },
  {
    id: 6,
    title: "Oncology Research Lab, Mumbai",
    category: "Diagnostics & Life Sciences",
    subcategory: "Research & Development Labs",
    transactionType: "sell",
    brief: { beds: "N/A", config: "Research Lab", area: "12,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+6",
  },
  {
    id: 7,
    title: "Government Medical College & Hospital, Nashik",
    category: "Public & Government Healthcare",
    subcategory: "Medical Colleges & Teaching Hospitals",
    transactionType: "lease",
    brief: {
      beds: "1200 Beds",
      config: "Campus Facility",
      area: "950,000 sq.ft",
    },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+7",
  },
  {
    id: 8,
    title: "Children’s Hospital, Bangalore",
    category: "Core Clinical Infrastructure",
    subcategory: "Specialty Hospitals",
    transactionType: "buy",
    brief: {
      beds: "200 Beds",
      config: "Pediatric Facility",
      area: "150,000 sq.ft",
    },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+8",
  },
  {
    id: 9,
    title: "Diagnostic Imaging Center, Pune",
    category: "Diagnostics & Life Sciences",
    subcategory: "Diagnostic Centers",
    transactionType: "sell",
    brief: { beds: "N/A", config: "Imaging Equipment", area: "6,500 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+9",
  },
  {
    id: 10,
    title: "AIIMS-Style Government Hospital, Nagpur",
    category: "Public & Government Healthcare",
    subcategory: "Tertiary Care Hospitals",
    transactionType: "lease",
    brief: {
      beds: "2000 Beds",
      config: "Mega Hospital Campus",
      area: "1,500,000 sq.ft",
    },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+10",
  },
  {
    id: 11,
    title: "Dental College & Hospital, Chennai",
    category: "Academic & Institutional Healthcare",
    subcategory: "Dental Colleges",
    transactionType: "buy",
    brief: {
      beds: "250 Beds",
      config: "College + Hospital",
      area: "300,000 sq.ft",
    },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+11",
  },
  {
    id: 12,
    title: "Biotech Research Park, Hyderabad",
    category: "Diagnostics & Life Sciences",
    subcategory: "Research & Development Labs",
    transactionType: "sell",
    brief: { beds: "N/A", config: "Lab Clusters", area: "500,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+12",
  },
  {
    id: 13,
    title: "Neuro & Trauma Care Hospital, Delhi",
    category: "Core Clinical Infrastructure",
    subcategory: "Specialty Hospitals",
    transactionType: "buy",
    brief: {
      beds: "300 Beds",
      config: "Emergency + Trauma",
      area: "200,000 sq.ft",
    },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+13",
  },
  {
    id: 14,
    title: "Community Health Center, Rural Maharashtra",
    category: "Public & Government Healthcare",
    subcategory: "Primary Healthcare Centers",
    transactionType: "lease",
    brief: {
      beds: "50 Beds",
      config: "Basic Healthcare",
      area: "20,000 sq.ft",
    },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+14",
  },
  {
    id: 15,
    title: "Medical Simulation Lab, Ahmedabad",
    category: "Academic & Institutional Healthcare",
    subcategory: "Training & Simulation Centers",
    transactionType: "sell",
    brief: { beds: "N/A", config: "Simulation Lab", area: "15,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+15",
  },
  {
    id: 16,
    title: "Women & Maternity Hospital, Jaipur",
    category: "Core Clinical Infrastructure",
    subcategory: "Specialty Hospitals",
    transactionType: "buy",
    brief: {
      beds: "180 Beds",
      config: "Obstetrics & Gynecology",
      area: "120,000 sq.ft",
    },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+16",
  },
  {
    id: 17,
    title: "Genomics & Molecular Lab, Pune",
    category: "Diagnostics & Life Sciences",
    subcategory: "Specialized Labs",
    transactionType: "sell",
    brief: { beds: "N/A", config: "Genomics Research", area: "8,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+17",
  },
  {
    id: 18,
    title: "500 Bedded Teaching Hospital, Lucknow",
    category: "Academic & Institutional Healthcare",
    subcategory: "Medical Colleges & Teaching Hospitals",
    transactionType: "lease",
    brief: {
      beds: "500 Beds",
      config: "Teaching + Hospital",
      area: "400,000 sq.ft",
    },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+18",
  },
  {
    id: 19,
    title: "Veterans Healthcare Facility, Chandigarh",
    category: "Public & Government Healthcare",
    subcategory: "Specialty Hospitals",
    transactionType: "buy",
    brief: {
      beds: "600 Beds",
      config: "Multi-Specialty",
      area: "450,000 sq.ft",
    },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+19",
  },
];

const solutionsData: SolutionsData = {
  value: {
    title: "Why Infra.Health?",
    points: [
      {
        icon: FaStethoscope,
        title: "Healthcare-Centric",
        text: "Unlike traditional real estate firms, Infra.Health operates at the intersection of healthcare, finance, and infrastructure.",
      },
      {
        icon: FaUniversity,
        title: "Deep Sectoral Knowledge",
        text: "We bring unmatched expertise in healthcare infrastructure, clinical workflows, and sector-specific regulations.",
      },
      {
        icon: FaChartLine,
        title: "Financial Structuring",
        text: "Our team provides financial structuring expertise to optimize healthcare investments for sustainability and returns.",
      },
      {
        icon: FaGlobe,
        title: "Global Investor Networks",
        text: "With access to international investors, we position healthcare assets not just as buildings, but as future-ready investment vehicles.",
      },
    ],
  },

  spectrum: [
    {
      id: "transactions-advisory",
      title: "Healthcare Real Estate Transaction Advisory",
      icon: FaHandshake,
      points: [
        "End-to-end advisory for acquisitions, dispositions, mergers, and joint ventures of healthcare assets.",
        "Specialized expertise in hospital valuations, medical campus redevelopment, and healthcare REIT structuring.",
        "Cross-border transaction support for global investors entering emerging healthcare markets.",
        "Alignment with accreditation standards (NABH, JCI, etc.) to ensure real estate is investment-ready.",
      ],
    },
    {
      id: "transactions-buy-sell-lease",
      title: "Buy, Sell & Lease Your Hospital Asset via Infra.Health",
      icon: FaHandshake,
      points: [
        "A dedicated marketplace for hospitals, medical colleges, diagnostic centres, senior living, and wellness resorts.",
        "Structuring long-term leasebacks for hospital operators seeking liquidity.",
        "Assisting institutional investors, family offices, and funds to acquire stabilized healthcare assets.",
        "Facilitating distressed asset resolutions, ensuring continuity of healthcare services while protecting stakeholder value.",
      ],
    },
    {
      id: "transactions-invest",
      title: "Invest in Healthcare",
      icon: FaHandshake,
      points: [
        "Curated investment opportunities across India, GCC, Southeast Asia, and Africa.",
        "Joint venture models with healthcare operators for expansion into Tier-2 and Tier-3 markets.",
        "Advisory on Healthcare Real Estate Investment Trusts (H-REITs) and global healthcare funds.",
        "Impact-driven investment models combining financial returns with measurable healthcare outcomes.",
      ],
    },
  ],
};

interface SpectrumListProps {
  items: string[];
}

const SpectrumList: React.FC<SpectrumListProps> = ({ items }) => (
  <ul className="details-list">
    {items.map((item, index) => (
      <li key={index}>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const PropertySearch = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeLink, setActiveLink] = useState<string>("transactions-advisory");
  const sectionsRef = useRef<Record<string, HTMLElement>>({});
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredProjects = useMemo(() => {
    let projects = portfolioData;

    // ✅ filter by transactionType (Buy / Sell / Lease tab)
    if (activeTab) {
      projects = projects.filter((p) => p.transactionType === activeTab);
    }

    if (activeFilter !== "All") {
      projects = projects.filter((p) => p.category === activeFilter);
    }

    if (propertyType && propertyType !== "Asset Type") {
      projects = projects.filter((p) => p.category === propertyType);
    }

    if (location.trim() !== "") {
      const searchTerm = location.toLowerCase();
      projects = projects.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm) ||
          p.brief.beds.toLowerCase().includes(searchTerm) ||
          p.brief.area.toLowerCase().includes(searchTerm)
      );
    }

    return projects;
  }, [activeFilter, propertyType, location, activeTab]); // 👈 added activeTab

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

    const sections = document.querySelectorAll<HTMLElement>("section[id]");
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
    <Container className="mt-4">
      <div className="text-left mx-auto" style={{ maxWidth: "1920px" }}>
        <p className="section-subtitle">OUR PROPERTIES</p>
        <h3 className="section-title">
          Unlocking Value Across <span> Global </span> Healthcare Assets
        </h3>
        {/* <p className="mt-3 text-muted">
          Healthcare infrastructure is not only about building and operating
          hospitals, it is also about unlocking the real estate value that
          underpins them. Infra.Health Healthcare Real Estate vertical provides
          a comprehensive international platform for healthcare operators,
          investors, and developers to transact, invest, and expand their
          healthcare asset base with confidence.
        </p> */}
      </div>
      {/* Tabs */}
      <Row className="justify-content-center pt-4">
        <Col md={6} className="d-flex justify-content-center">
          <Nav
            variant="tabs"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k || "sell")}
            className="properties"
          >
            <Nav.Item>
              <Nav.Link eventKey="buy">Buy</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="sell">Sell</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="lease">Lease</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>

      {/* Search & Filters Box */}
      <Row className="justify-content-center pb-4">
        <Col md={9} className="border rounded p-3">
          {/* First Row: Search Bar */}
          <div className="d-flex align-items-center justify-content-center mb-3">
            <Form.Control
              type="text"
              placeholder="Search upto 3 localities or landmarks"
              className="me-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ maxWidth: "70%" }}
            />
            <button className="btn d-flex align-items-center justify-content-center">
              <FaSearch size={15} className="me-1" /> Search
            </button>
          </div>

          {/* Second Row: Dropdowns */}
          <div className="d-flex mt-2">
            {/* Location */}
            <Form.Select
              className="me-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ maxWidth: "30%" }}
            >
              <option value="">India</option>
            </Form.Select>

            {/* Filters */}
            <Form.Select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              style={{ maxWidth: "70%" }}
            >
              <option>Asset Type</option>
              <option value="Core Clinical Infrastructure">
                Core Clinical Infrastructure
              </option>
              <option value="Academic & Institutional Healthcare">
                Academic & Institutional Healthcare
              </option>
              <option value="Diagnostics & Life Sciences">
                Diagnostics & Life Sciences
              </option>
              <option value="Public & Government Healthcare">
                Public & Government Healthcare
              </option>
            </Form.Select>
          </div>
        </Col>
      </Row>

      {/* <div className="border rounded p-3 d-flex align-items-center">
        
        <Form.Select
          className="me-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ maxWidth: "180px" }}
        >
          <option value="">India</option>
        </Form.Select>

        <Form.Select
          className="me-2"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          style={{ maxWidth: "35%" }}
        >
          <option>Asset Type</option>
          <option value="Core Clinical Infrastructure">
            Core Clinical Infrastructure
          </option>
          <option value="Academic & Institutional Healthcare">
            Academic & Institutional Healthcare
          </option>
          <option value="Diagnostics & Life Sciences">
            Diagnostics & Life Sciences
          </option>
          <option value="Public & Government Healthcare">
            Public & Government Healthcare
          </option>
        </Form.Select>

        <Form.Control
          type="text"
          placeholder="Search upto 3 localities or landmarks"
          className="me-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ maxWidth: "35%" }}
        />

        <button className="btn d-flex align-items-center px-4">
          <FaSearch size={24} className="me-1" /> Search
        </button>
      </div> */}

      <Row>
        <Col md={9}></Col>
        <Col md={3} className="d-flex align-items-center justify-content-end">
          <div
            className="btn primary-btn"
            onClick={(e) => handleNavLinkClick(e, "list-property-section")}
          >
            List Your Property
          </div>
        </Col>
      </Row>
      <Row className="portfolio-grid mt-3">
        {filteredProjects.map((project) => (
          <Col key={project.id} md={6} lg={3} className="mb-4">
            <div className="project-card">
              <img src={project.imageUrl} alt={project.title} />
              {/* <div className="project-card-overlay">
                <h4>{project.title}</h4>
                <p>
                  <strong>Beds:</strong> {project.brief.beds}
                </p>
                <p>
                  <strong>Area:</strong> {project.brief.area}
                </p>
                <p>
                  <strong>Config:</strong> {project.brief.config}
                </p>
              </div> */}
            </div>
          </Col>
        ))}
      </Row>
      <section id="list-property-section" className="portfolio-section mb-4">
        <Container>
          {/* <p className="section-subtitle">Our Portfolio</p> */}
          <h3 className="section-title">
            List<span> Your </span> Healthcare Properties
          </h3>
          <p className="mt-3">
            Infra.Health provides a global digital listing platform where
            hospitals, diagnostic centers, and healthcare campuses can showcase
            their properties. Investors and operators gain access to verified,
            due diligence–ready healthcare assets. Integrated data room and
            valuation services ensure transparency and faster closures.
            Cross-border visibility ensures properties attract international
            buyers and healthcare funds.
          </p>
          <div className="cta-buttons text-center">
            <div className="btn primary-btn">List Your Property</div>
          </div>
        </Container>
      </section>
      <section id="value" className="properties">
        <h3>{solutionsData.value.title}</h3>
        <div className="value-grid my-4">
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
      <h3 className="my-4">Spectrum of Healthcare Facilities We Deliver</h3>
      <Row>
        {/* Sidebar */}
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
          </Nav>
        </Col>

        {/* Main Content */}
        <Col lg={9}>
          <div className="vstack gap-5">
            <section>
              {solutionsData.spectrum.map((category, index) => (
                <Row
                  as="section"
                  key={category.id}
                  id={category.id}
                  className="mb-5 interactive-section align-items-center"
                >
                  <Col
                    md={12}
                    className={index % 2 === 0 ? "order-md-2" : "order-md-1"}
                  >
                    <div className="service-card">
                      <div className="category-header">
                        <category.icon className="category-icon" />
                        <h4>{category.title}</h4>
                      </div>
                      <SpectrumList items={category.points} />
                    </div>
                  </Col>
                </Row>
              ))}
            </section>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertySearch;
