"use client";

import React, { useState, useMemo } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
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

  return (
    <main className="container py-5 mt-4">
      <div className="portfolio-header">
        <p className="section-subtitle">OUR WORK</p>
        <h3 className="section-title">
          Infra.Health <span>Portfolio</span>
        </h3>
        <p className="mt-3 text-muted">
          Our portfolio reflects a diverse range of healthcare projects across India—spanning academic institutions, public hospitals, specialty centres, and multispecialty hospitals.
        </p>
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
                      <strong>Config:</strong> {project.projectBrief.buildingConfiguration}
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

