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
import { BsCheckCircleFill } from "react-icons/bs";

import "../../styles/services.css";
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
  brief: {
    beds: string;
    config: string;
    area: string;
  };
  imageUrl: string;
}

// --- DATA OBJECT ---
const portfolioData: Project[] = [
  // Data has been populated with placeholders as requested.
  {
    id: 1,
    title: "100 Bedded Cancer & Cardiac Care Hospital, Baner",
    category: "Core Clinical Infrastructure",
    subcategory: "Specialty Hospitals",
    brief: { beds: "100 Beds", config: "G+5 Floors", area: "80,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+1",
  },
  {
    id: 2,
    title:
      "1500 Bedded Hospital Dr. D Y Patil Hospital & Medical College, Pimpri",
    category: "Academic & Institutional Healthcare",
    subcategory: "Medical Colleges & Teaching Hospitals",
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
    brief: { beds: "N/A", config: "Lab Facility", area: "5,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+3",
  },
  {
    id: 4,
    title: "Path Lab, Dr. D Y Patil Hospital",
    category: "Diagnostics & Life Sciences",
    subcategory: "Specialized Labs",
    brief: { beds: "N/A", config: "Lab Facility", area: "10,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+4",
  },
  {
    id: 5,
    title: "Radiology, Dr. D Y Patil Hospital",
    category: "Diagnostics & Life Sciences",
    subcategory: "Imaging Centres",
    brief: { beds: "N/A", config: "Imaging Department", area: "15,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+5",
  },
  {
    id: 6,
    title: "150 Bedded Cancer & Modern Maternity Hospital, KDMC",
    category: "Core Clinical Infrastructure",
    subcategory: "Specialty Hospitals",
    brief: { beds: "150 Beds", config: "G+7 Floors", area: "120,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+6",
  },
  {
    id: 7,
    title: "Homeopathy College & Hospital, Kagal",
    category: "Academic & Institutional Healthcare",
    subcategory: "Medical Colleges & Teaching Hospitals",
    brief: {
      beds: "100 Beds",
      config: "Campus with Hostel",
      area: "90,000 sq.ft",
    },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+7",
  },
  {
    id: 8,
    title: "365 Bedded Regional Mental Hospital, Jaisingpur",
    category: "Public & Government Healthcare",
    subcategory: "Government Hospitals",
    brief: {
      beds: "365 Beds",
      config: "Multiple Wards",
      area: "250,000 sq.ft",
    },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+8",
  },
  {
    id: 9,
    title: "Lokmanya Hospital, SB Road – Diagnostic Centre",
    category: "Diagnostics & Life Sciences",
    subcategory: "Imaging Centres",
    brief: { beds: "N/A", config: "Diagnostic Center", area: "8,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+9",
  },
  {
    id: 10,
    title: "CRHP Rural Hospital, Jamkhed",
    category: "Core Clinical Infrastructure",
    subcategory: "Multispecialty & Acute-Care Hospitals",
    brief: { beds: "50 Beds", config: "G+2 Floors", area: "40,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+10",
  },
  {
    id: 11,
    title: "Sub-District Hospital, Karjat",
    category: "Public & Government Healthcare",
    subcategory: "Government Hospitals",
    brief: { beds: "100 Beds", config: "G+3 Floors", area: "75,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+11",
  },
  {
    id: 12,
    title: "Sub-District Hospital, Jamkhed",
    category: "Public & Government Healthcare",
    subcategory: "Government Hospitals",
    brief: { beds: "100 Beds", config: "G+3 Floors", area: "75,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+12",
  },
  {
    id: 13,
    title: "Sub-District Hospital, Mirajgaon",
    category: "Public & Government Healthcare",
    subcategory: "Government Hospitals",
    brief: { beds: "50 Beds", config: "G+2 Floors", area: "50,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+13",
  },
  {
    id: 14,
    title: "Sub-District Hospital, Sangamner",
    category: "Public & Government Healthcare",
    subcategory: "Government Hospitals",
    brief: { beds: "100 Beds", config: "G+3 Floors", area: "80,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+14",
  },
  {
    id: 15,
    title: "Sub-District Hospital, Chakan",
    category: "Public & Government Healthcare",
    subcategory: "Government Hospitals",
    brief: { beds: "100 Beds", config: "G+3 Floors", area: "78,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+15",
  },
  {
    id: 16,
    title: "Sub-District Hospital, Narayangaon",
    category: "Public & Government Healthcare",
    subcategory: "Government Hospitals",
    brief: { beds: "50 Beds", config: "G+2 Floors", area: "55,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+16",
  },
  {
    id: 17,
    title: "Sub-District Hospital, Mangalwedha",
    category: "Public & Government Healthcare",
    subcategory: "Government Hospitals",
    brief: { beds: "50 Beds", config: "G+2 Floors", area: "52,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+17",
  },
  {
    id: 18,
    title: "Rural Hospital, Ghodegaon",
    category: "Public & Government Healthcare",
    subcategory: "Government Hospitals",
    brief: { beds: "30 Beds", config: "G+1 Floor", area: "30,000 sq.ft" },
    imageUrl: "https://placehold.co/600x400/008080/FFFFFF?text=Project+18",
  },
  {
    id: 19,
    title: "350 Bedded Multi-specialty Hospital, Warje",
    category: "Core Clinical Infrastructure",
    subcategory: "Multispecialty & Acute-Care Hospitals",
    brief: {
      beds: "350 Beds",
      config: "2B+G+10 Floors",
      area: "300,000 sq.ft",
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
        <BsCheckCircleFill className="list-icon" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const PropertySearch = () => {
  const [activeTab, setActiveTab] = useState("sell");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeLink, setActiveLink] = useState<string>("transactions-advisory");
  const sectionsRef = useRef<Record<string, HTMLElement>>({});
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(portfolioData.map((p) => p.category));
    return ["All", ...Array.from(uniqueCategories)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return portfolioData;
    }
    return portfolioData.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      sectionsRef.current[section.id] = section as HTMLElement;
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
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${targetId}`);

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
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
        <p className="mt-3 text-muted">
          Healthcare infrastructure is not only about building and operating
          hospitals, it is also about unlocking the real estate value that
          underpins them. Infra.Health Healthcare Real Estate vertical provides
          a comprehensive international platform for healthcare operators,
          investors, and developers to transact, invest, and expand their
          healthcare asset base with confidence.
        </p>
      </div>
      {/* Tabs */}
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
          <Nav.Link eventKey="lease">Lease</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="sell">Sell</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Search Box */}
      <div className="border rounded p-3 d-flex align-items-center">
        {/* Location */}
        <Form.Select
          className="me-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ maxWidth: "100px" }}
        >
          <option value="">India</option>
        </Form.Select>

        {/* Filters */}
        <Form.Select
          className="me-2"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option>Asset Type</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="office">Office</option>
        </Form.Select>

        {/* Search Input */}
        <Form.Control
          type="text"
          placeholder="Search upto 3 localities or landmarks"
          className="me-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* Search Button */}
        <button className="btn d-flex align-items-center px-4">
          <FaSearch className="me-2" /> Search
        </button>
      </div>
      <Row className="portfolio-grid mt-3">
        {filteredProjects.map((project) => (
          <Col key={project.id} md={6} lg={3} className="mb-4">
            <div className="project-card">
              <img src={project.imageUrl} alt={project.title} />
              <div className="project-card-overlay">
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
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <section className="portfolio-section mb-4">
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
      <section id="value">
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
