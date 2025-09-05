"use client";

import React, { useState, useEffect, useRef } from "react";
import "../../styles/services.css";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { FaUpload } from "react-icons/fa6";
import "../../styles/career.css";
// --- MAIN COMPONENT ---
export default function ConstructPage() {
  const [activeLink, setActiveLink] = useState<string>("epc");
  const sectionsRef = useRef<Record<string, Element>>({});
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (isClickScrolling.current) return; // Don't update state if scrolling from a click
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
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    // ✅ File size validation for all uploads
    const fileInputs =
      form.querySelectorAll<HTMLInputElement>('input[type="file"]');
    const maxSize = 5 * 1024 * 1024; // 5MB
    for (const input of fileInputs) {
  if (input?.files?.length) {
    const file = input.files[0];
    if (file.size > maxSize) {
      event.preventDefault();
      event.stopPropagation();
      alert(`File size for ${input.id} must be less than 5MB.`);
      return;
    }
  }
}

    setValidated(true);
  };

  return (
    <>
      <div className="container mt-4">
        <div className="text-left mx-auto">
          <p className="section-subtitle">OUR PARTNERS</p>
          <h3 className="section-title">
            Why Partner With <span> Us?</span>
          </h3>
          <p className="mt-3 text-muted">
            We have grown not by leaving others behind, but by taking forward
            our partners with us, by efficiently making them more competitive.
            Our connections with the best healthcare industries have helped
            vendors increase their reach. Our projects are spread across the
            diverse geographies in India, and also internationally. This creates
            opportunities for our vendors to expand their business without
            investing in marketing. Our procurement processes are transparent,
            smooth, and structured, with clean timelines, so that vendors can
            plan and allocate their resources accordingly. In a fast-growing
            healthcare infrastructure ecosystem, Infra Health has a strong
            foothold, supported by the best hospitals, government health
            department, and healthcare investors. <br />
            <br />
            We maintain an on-time payment record, and also offer channels to
            eliminate any possible delay in payments or approvals. We ensure
            that product specifications are aligned with regulatory standards
            such as NABH, ISO, and WHO guidelines, reducing compliance risks and
            potential rework. Visibility of our partners is increased by
            priority bidding, joint marketing initiatives, and co-branding.
            Operational efficiency is increased by smooth order processing and
            improved logistics coordination. Suppliers looking to strengthen
            their presence in the healthcare domain get an opportunity of a
            strategic partnership to deliver excellence together. <br />
            <br /> Let’s Grow Together!
          </p>
        </div>
        {/*Vendor Application*/}
        <section className="py-5">
          <Container>
            <Row className="justify-content-center">
              <Col lg={10}>
                <Card className="shadow rounded-4 border-0 p-4">
                  <Card.Body>
                    <h3 className="mb-4 text-center">
                      Vendor Partnership Application Form
                    </h3>
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                    >
                      {/* Section 1: Company Information */}
                      <h5 className="mt-4 mb-3">Company Information</h5>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="companyName">
                            <Form.Label>
                              Company Name (as per registration)
                            </Form.Label>
                            <Form.Control type="text" required />
                            <Form.Control.Feedback type="invalid">
                              Please enter company name.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="address">
                            <Form.Label>Registered Business Address</Form.Label>
                            <Form.Control type="text" required />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={4}>
                          <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" required />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="state">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" required />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" required />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="website">
                            <Form.Label>Website</Form.Label>
                            <Form.Control
                              type="url"
                              placeholder="https://example.com"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group controlId="established">
                            <Form.Label>Year of Establishment</Form.Label>
                            <Form.Control type="number" required />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group controlId="entityType">
                            <Form.Label>Type of Business Entity</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Private Ltd., LLP, etc."
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="cin">
                            <Form.Label>CIN / Registration Number</Form.Label>
                            <Form.Control type="text" required />
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* Section 2: Primary Contact Details */}
                      <h5 className="mt-4 mb-3">Primary Contact Details</h5>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="contactName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" required />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="contactDesignation">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control type="text" required />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="contactEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" required />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="contactMobile">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                              type="tel"
                              pattern="^[0-9]{10}$"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3" controlId="alternateContact">
                        <Form.Label>
                          Alternate Contact Person (Optional)
                        </Form.Label>
                        <Form.Control type="text" />
                      </Form.Group>

                      {/* Section 3: Product / Service Details */}
                      <h5 className="mt-4 mb-3">Product / Service Details</h5>
                      <Form.Group className="mb-3" controlId="categories">
                        <Form.Label>Product / Service Categories</Form.Label>
                          <div className="d-flex flex-wrap gap-3">
                            {[
                              "Construction Materials",
                              "Medical Equipment",
                              "MEP Systems",
                              "Furniture & Fixtures",
                              "IT Systems",
                              "Consumables",
                              "Others",
                            ].map((cat, i) => (
                              <Form.Check key={i} type="checkbox" label={cat} />
                            ))}
                          </div>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="offerings">
                        <Form.Label>Brief Description of Offerings</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          maxLength={500}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="certifications">
                        <Form.Label>Certifications & Compliance</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="ISO, NABH, CE, etc."
                        />
                      </Form.Group>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="locations">
                            <Form.Label>Manufacturing Location(s)</Form.Label>
                            <Form.Control type="text" />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="capacity">
                            <Form.Label>
                              Capacity / Supply Capability per Month
                            </Form.Label>
                            <Form.Control type="text" />
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* Section 4: Experience & Clients */}
                      <h5 className="mt-4 mb-3">Experience & Clients</h5>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="yearsHealthcare">
                            <Form.Label>
                              Years Supplying to Healthcare Sector
                            </Form.Label>
                            <Form.Control type="number" />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="clients">
                            <Form.Label>
                              Major Clients Served (max 5)
                            </Form.Label>
                            <Form.Control type="text" />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3" controlId="projects">
                        <Form.Label>
                          Recent Healthcare Projects Supplied
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder="Project name, year, scope"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="geography">
                        <Form.Label>Geographic Areas Served</Form.Label>
                        <Form.Control type="text" />
                      </Form.Group>

                      {/* Section 5: Commercial & Operational Details */}
                      <h5 className="mt-4 mb-3">
                        Commercial & Operational Details
                      </h5>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="leadtime">
                            <Form.Label>
                              Average Lead Time for Orders
                            </Form.Label>
                            <Form.Control type="text" />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="gst">
                            <Form.Label>
                              GST Number / Tax Identification Number
                            </Form.Label>
                            <Form.Control type="text" />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3" controlId="bank">
                        <Form.Label>
                          Bank Details (optional at this stage)
                        </Form.Label>
                        <Form.Control type="text" />
                      </Form.Group>

                      {/* Section 6: Attachments */}
                      <h5 className="mt-4 mb-3">Attachments</h5>
                      {[
                        { id: "profile", label: "Company Profile / Brochure" },
                        { id: "catalogue", label: "Product Catalogue" },
                        { id: "certs", label: "Relevant Certifications" },
                        {
                          id: "refs",
                          label: "Reference Letters (if available)",
                        },
                      ].map((f) => (
                        <Form.Group
                          className="mb-3"
                          controlId={f.id}
                          key={f.id}
                        >
                          <Form.Label>
                            <FaUpload className="me-2 text-secondary" />
                            {f.label}
                          </Form.Label>
                          <Form.Control
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          />
                        </Form.Group>
                      ))}

                      {/* Section 7: Declaration & Consent */}
                      <h5 className="mt-4 mb-3">Declaration & Consent</h5>
                      <Form.Group className="mb-3" controlId="declaration">
                        <Form.Check
                          required
                          label="I confirm that the information provided above is accurate and complete to the best of my knowledge."
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="consent">
                        <Form.Check
                          required
                          label="I agree to Infra.Health’s vendor terms & policies."
                        />
                      </Form.Group>

                      {/* Submit */}
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-outline-secondary btn-sm"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
}
