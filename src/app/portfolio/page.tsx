"use client";

import React, { useState, useMemo, useEffect } from "react"; // Added useEffect here
import { Row, Col, Nav } from "react-bootstrap";
import "../../styles/portfolio.css";
import { NewsItem, portfolioData } from "@/data/portfolioData";

// --- MAIN COMPONENT ---
export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Get unique categories from JSON
  const categories = useMemo(() => {
    const uniqueCategories = new Set(portfolioData.map((p) => p.category));
    return ["All", ...Array.from(uniqueCategories)];
  }, []);

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return portfolioData;
    return portfolioData.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  // Counter animation effect
  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>(".counter");
    const runCounter = (counter: HTMLElement) => {
      const target = +counter.getAttribute("data-to")!;
      const suffix = counter.getAttribute("data-suffix") || "";
      let count = 0;
      const increment = target / 200;
      const update = () => {
        count += increment;
        if (count < target) {
          counter.textContent = Math.floor(count) + suffix;
          requestAnimationFrame(update);
        } else {
          counter.textContent = target.toLocaleString() + suffix;
        }
      };
      update();
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target as HTMLElement);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((counter) => observer.observe(counter));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="container py-5 mt-4">
      <div className="portfolio-header">
        <p className="section-subtitle">OUR WORK</p>
        <h3 className="section-title">
          Infra.Health <span>Portfolio</span>
        </h3>
        <p className="mt-3 text-muted">
          Our portfolio reflects a diverse range of healthcare projects across
          India, spanning academic institutions, public hospitals, specialty
          centres, and multispecialty hospitals.
        </p>
      </div>

      {/* HORIZONTAL COUNTER SECTION */}
      <div className="portfolio-counters">
        {/* Row 1: Hospital Projects */}
        <div className="portfolio-counter-box">
          <div className="counter-number">
            <span className="counter" data-to="70" data-suffix="+">
              70+
            </span>
          </div>
          <p>Hospital Projects</p>
        </div>

        {/* Row 2: SQ.FT Healthcare Spaces */}
        <div className="portfolio-counter-box">
          <div className="counter-number">
            <span className="counter" data-to="18" data-suffix="M+">
              18M+
            </span>
          </div>
          <p>SQ.FT Healthcare spaces planned, designed & built.</p>
        </div>

        {/* Row 3: Ongoing Projects */}
        <div className="portfolio-counter-box">
          <div className="counter-number">
            <span className="counter" data-to="14" data-suffix="+">
              14+
            </span>
          </div>
          <p>Hospital Projects ongoing worldwide</p>
        </div>

        {/* Row 4: Total Beds */}
        <div className="portfolio-counter-box">
          <div className="counter-number">
            <span className="counter" data-to="13500" data-suffix="+">
              13500+
            </span>
          </div>
          <p>Beds</p>
        </div>

        {/* Row 5: ICU Beds */}
        <div className="portfolio-counter-box">
          <div className="counter-number">
            <span className="counter" data-to="2450" data-suffix="+">
              2450+
            </span>
          </div>
          <p>ICU Beds</p>
        </div>

        {/* Row 6: Modular OTs */}
        <div className="portfolio-counter-box">
          <div className="counter-number">
            <span className="counter" data-to="280" data-suffix="+">
              280+
            </span>
          </div>
          <p>Modular Operation Theatres</p>
        </div>
      </div>

      <Nav
        className="filter-nav"
        activeKey={activeFilter}
        onSelect={(k) => setActiveFilter(k || "All")}
      >
        {categories.map((category) => (
          <Nav.Item key={category}>
            <Nav.Link eventKey={category}>{category}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      <Row className="portfolio-grid">
        {filteredProjects.map((project: NewsItem) => (
          <Col key={project.slug} md={6} lg={4} className="mb-4">
            <a href={`/portfolio/${project.slug}`}>
              <div className="project-card">
                {project.images[0] && (
                  <img src={project.images[0]} alt={project.title} />
                )}
                <div className="project-card-overlay">
                  <h4>{project.title}</h4>
                  {project.projectBrief.noOfBeds && (
                    <p>
                      <strong>Beds:</strong> {project.projectBrief.noOfBeds}
                    </p>
                  )}
                  {project.projectBrief.builtUpArea && (
                    <p>
                      <strong>Area:</strong> {project.projectBrief.builtUpArea}
                    </p>
                  )}
                  {project.projectBrief.buildingConfiguration && (
                    <p>
                      <strong>Config:</strong>{" "}
                      {project.projectBrief.buildingConfiguration}
                    </p>
                  )}
                </div>
              </div>
            </a>
          </Col>
        ))}
      </Row>
    </main>
  );
}
