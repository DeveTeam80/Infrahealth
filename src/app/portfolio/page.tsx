"use client";

import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import "../../styles/portfolio.css";

// --- TYPE DEFINITIONS ---
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
    { id: 1, title: '100 Bedded Cancer & Cardiac Care Hospital, Baner', category: 'Core Clinical Infrastructure', subcategory: 'Specialty Hospitals', brief: { beds: '100 Beds', config: 'G+5 Floors', area: '80,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+1' },
    { id: 2, title: '1500 Bedded Hospital Dr. D Y Patil Hospital & Medical College, Pimpri', category: 'Academic & Institutional Healthcare', subcategory: 'Medical Colleges & Teaching Hospitals', brief: { beds: '1500 Beds', config: 'Multi-Building Campus', area: '1,200,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+2' },
    { id: 3, title: 'IVF Lab, Dr. D Y Patil Hospital', category: 'Diagnostics & Life Sciences', subcategory: 'Specialized Labs', brief: { beds: 'N/A', config: 'Lab Facility', area: '5,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+3' },
    { id: 4, title: 'Path Lab, Dr. D Y Patil Hospital', category: 'Diagnostics & Life Sciences', subcategory: 'Specialized Labs', brief: { beds: 'N/A', config: 'Lab Facility', area: '10,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+4' },
    { id: 5, title: 'Radiology, Dr. D Y Patil Hospital', category: 'Diagnostics & Life Sciences', subcategory: 'Imaging Centres', brief: { beds: 'N/A', config: 'Imaging Department', area: '15,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+5' },
    { id: 6, title: '150 Bedded Cancer & Modern Maternity Hospital, KDMC', category: 'Core Clinical Infrastructure', subcategory: 'Specialty Hospitals', brief: { beds: '150 Beds', config: 'G+7 Floors', area: '120,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+6' },
    { id: 7, title: 'Homeopathy College & Hospital, Kagal', category: 'Academic & Institutional Healthcare', subcategory: 'Medical Colleges & Teaching Hospitals', brief: { beds: '100 Beds', config: 'Campus with Hostel', area: '90,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+7' },
    { id: 8, title: '365 Bedded Regional Mental Hospital, Jaisingpur', category: 'Public & Government Healthcare', subcategory: 'Government Hospitals', brief: { beds: '365 Beds', config: 'Multiple Wards', area: '250,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+8' },
    { id: 9, title: 'Lokmanya Hospital, SB Road – Diagnostic Centre', category: 'Diagnostics & Life Sciences', subcategory: 'Imaging Centres', brief: { beds: 'N/A', config: 'Diagnostic Center', area: '8,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+9' },
    { id: 10, title: 'CRHP Rural Hospital, Jamkhed', category: 'Core Clinical Infrastructure', subcategory: 'Multispecialty & Acute-Care Hospitals', brief: { beds: '50 Beds', config: 'G+2 Floors', area: '40,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+10' },
    { id: 11, title: 'Sub-District Hospital, Karjat', category: 'Public & Government Healthcare', subcategory: 'Government Hospitals', brief: { beds: '100 Beds', config: 'G+3 Floors', area: '75,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+11' },
    { id: 12, title: 'Sub-District Hospital, Jamkhed', category: 'Public & Government Healthcare', subcategory: 'Government Hospitals', brief: { beds: '100 Beds', config: 'G+3 Floors', area: '75,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+12' },
    { id: 13, title: 'Sub-District Hospital, Mirajgaon', category: 'Public & Government Healthcare', subcategory: 'Government Hospitals', brief: { beds: '50 Beds', config: 'G+2 Floors', area: '50,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+13' },
    { id: 14, title: 'Sub-District Hospital, Sangamner', category: 'Public & Government Healthcare', subcategory: 'Government Hospitals', brief: { beds: '100 Beds', config: 'G+3 Floors', area: '80,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+14' },
    { id: 15, title: 'Sub-District Hospital, Chakan', category: 'Public & Government Healthcare', subcategory: 'Government Hospitals', brief: { beds: '100 Beds', config: 'G+3 Floors', area: '78,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+15' },
    { id: 16, title: 'Sub-District Hospital, Narayangaon', category: 'Public & Government Healthcare', subcategory: 'Government Hospitals', brief: { beds: '50 Beds', config: 'G+2 Floors', area: '55,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+16' },
    { id: 17, title: 'Sub-District Hospital, Mangalwedha', category: 'Public & Government Healthcare', subcategory: 'Government Hospitals', brief: { beds: '50 Beds', config: 'G+2 Floors', area: '52,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+17' },
    { id: 18, title: 'Rural Hospital, Ghodegaon', category: 'Public & Government Healthcare', subcategory: 'Government Hospitals', brief: { beds: '30 Beds', config: 'G+1 Floor', area: '30,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+18' },
    { id: 19, title: '350 Bedded Multi-specialty Hospital, Warje', category: 'Core Clinical Infrastructure', subcategory: 'Multispecialty & Acute-Care Hospitals', brief: { beds: '350 Beds', config: '2B+G+10 Floors', area: '300,000 sq.ft' }, imageUrl: 'https://placehold.co/600x400/008080/FFFFFF?text=Project+19' },
];

// --- MAIN COMPONENT ---
export default function PortfolioPage() {
    const [activeFilter, setActiveFilter] = useState('All');

    const categories = useMemo(() => {
        const uniqueCategories = new Set(portfolioData.map(p => p.category));
        return ['All', ...Array.from(uniqueCategories)];
    }, []);

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'All') {
            return portfolioData;
        }
        return portfolioData.filter(project => project.category === activeFilter);
    }, [activeFilter]);

    return (
        <>
            <main className="container py-5 mt-4">
                <div className="portfolio-header">
                    <p className="section-subtitle">OUR WORK</p>
                    <h1 className="section-title">Infra.Health <span>Portfolio</span></h1>
                    <p className="lead mt-3 text-muted">
                        Our portfolio reflects a diverse range of healthcare projects across India—spanning academic institutions, public hospitals, specialty centres, and multispecialty hospitals.
                    </p>
                </div>
                
                <Nav className="filter-nav" activeKey={activeFilter} onSelect={(k) => setActiveFilter(k || 'All')}>
                    {categories.map(category => (
                        <Nav.Item key={category}>
                            <Nav.Link eventKey={category}>{category}</Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
                
                <Row className="portfolio-grid">
                    {filteredProjects.map(project => (
                        <Col key={project.id} md={6} lg={4} className="mb-4">
                            <div className="project-card">
                                <img src={project.imageUrl} alt={project.title} />
                                <div className="project-card-overlay">
                                    <h4>{project.title}</h4>
                                    <p><strong>Beds:</strong> {project.brief.beds}</p>
                                    <p><strong>Area:</strong> {project.brief.area}</p>
                                    <p><strong>Config:</strong> {project.brief.config}</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </main>
        </>
    );
}
