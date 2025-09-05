"use client";

import React, { useState, useEffect, useRef } from "react";
import "../../styles/services.css";
import { Card, Col, Container, Form, Row, Alert, Spinner } from "react-bootstrap";
import { FaUpload } from "react-icons/fa6";
import "../../styles/career.css";

// --- MAIN COMPONENT ---
export default function ConstructPage() {
  const [activeLink, setActiveLink] = useState<string>("epc");
  const sectionsRef = useRef<Record<string, Element>>({});
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    show: boolean;
    type: "success" | "danger";
    message: string;
  }>({ show: false, type: "success", message: "" });

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    const formData = new FormData(form);
    
    // File size validation
    const fileInputs = form.querySelectorAll<HTMLInputElement>('input[type="file"]');
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    for (const input of fileInputs) {
      if (input?.files?.length) {
        const file = input.files[0];
        if (file.size > maxSize) {
          setSubmitStatus({
            show: true,
            type: "danger",
            message: `File size for ${input.name} must be less than 5MB.`
          });
          return;
        }
      }
    }

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ show: false, type: "success", message: "" });

    try {
      // Collect checkbox values for categories
      const categoryCheckboxes = form.querySelectorAll('input[name="categories"]:checked') as NodeListOf<HTMLInputElement>;
      categoryCheckboxes.forEach(checkbox => {
        formData.append('categories', checkbox.value);
      });

      const response = await fetch('/api/vendor', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          show: true,
          type: "success",
          message: result.message
        });
        form.reset();
        setValidated(false);
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        show: true,
        type: "danger",
        message: error instanceof Error ? error.message : "An error occurred while submitting the form."
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <br /> Let&apos;s Grow Together!
          </p>
        </div>

        {/* Vendor Application */}
        <section className="py-5">
          <Container>
            <Row className="justify-content-center">
              <Col lg={10}>
                {submitStatus.show && (
                  <Alert 
                    variant={submitStatus.type} 
                    className="mb-4"
                    dismissible 
                    onClose={() => setSubmitStatus({ ...submitStatus, show: false })}
                  >
                    {submitStatus.message}
                  </Alert>
                )}
                
                <Card className="shadow rounded-4 border-0 p-4">
                  <Card.Body>
                    <h3 className="mb-4 text-center">
                      Vendor Partnership Application Form
                    </h3>
                    
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                      {/* Section 1: Company Information */}
                      <h5 className="mt-4 mb-3">Company Information</h5>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label htmlFor="companyName">Company Name (as per registration)</Form.Label>
                            <Form.Control 
                              id="companyName"
                              name="companyName" 
                              type="text" 
                              autoComplete="organization"
                              required 
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter company name.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label htmlFor="address">Registered Business Address</Form.Label>
                            <Form.Control 
                              id="address"
                              name="address" 
                              type="text" 
                              autoComplete="street-address"
                              required 
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter business address.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row className="mb-3">
                        <Col md={4}>
                          <Form.Group>
                            <Form.Label htmlFor="city">City</Form.Label>
                            <Form.Control 
                              id="city"
                              name="city" 
                              type="text" 
                              autoComplete="address-level2"
                              required 
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter city.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group>
                            <Form.Label htmlFor="state">State</Form.Label>
                            <Form.Control 
                              id="state"
                              name="state" 
                              type="text" 
                              autoComplete="address-level1"
                              required 
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter state.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group>
                            <Form.Label htmlFor="country">Country</Form.Label>
                            <Form.Control 
                              id="country"
                              name="country" 
                              type="text" 
                              autoComplete="country"
                              required 
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter country.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label htmlFor="website">Website</Form.Label>
                            <Form.Control
                              id="website"
                              name="website"
                              type="url"
                              autoComplete="url"
                              placeholder="https://example.com"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group>
                            <Form.Label htmlFor="established">Year of Establishment</Form.Label>
                            <Form.Control 
                              id="established"
                              name="established" 
                              type="number" 
                              autoComplete="off"
                              min="1800"
                              max="2024"
                              required 
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter establishment year.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group>
                            <Form.Label htmlFor="entityType">Type of Business Entity</Form.Label>
                            <Form.Control
                              id="entityType"
                              name="entityType"
                              type="text"
                              autoComplete="off"
                              placeholder="Private Ltd., LLP, etc."
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter entity type.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label htmlFor="cin">CIN / Registration Number</Form.Label>
                            <Form.Control 
                              id="cin"
                              name="cin" 
                              type="text" 
                              autoComplete="off"
                              required 
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter CIN/Registration number.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* Section 2: Primary Contact Details */}
                      <h5 className="mt-4 mb-3">Primary Contact Details</h5>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label htmlFor="contactName">Full Name</Form.Label>
                            <Form.Control 
                              id="contactName"
                              name="contactName" 
                              type="text" 
                              autoComplete="name"
                              required 
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter full name.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label htmlFor="contactDesignation">Designation</Form.Label>
                            <Form.Control 
                              id="contactDesignation"
                              name="contactDesignation" 
                              type="text" 
                              autoComplete="organization-title"
                              required 
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter designation.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label htmlFor="contactEmail">Email Address</Form.Label>
                            <Form.Control 
                              id="contactEmail"
                              name="contactEmail" 
                              type="email" 
                              autoComplete="email"
                              required 
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter a valid email address.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label htmlFor="contactMobile">Mobile Number</Form.Label>
                            <Form.Control
                              id="contactMobile"
                              name="contactMobile"
                              type="tel"
                              autoComplete="tel"
                              pattern="^[0-9]{10}$"
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter a valid 10-digit mobile number.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="alternateContact">Alternate Contact Person (Optional)</Form.Label>
                        <Form.Control 
                          id="alternateContact"
                          name="alternateContact" 
                          type="text" 
                          autoComplete="off"
                        />
                      </Form.Group>

                      {/* Section 3: Product / Service Details */}
                      <h5 className="mt-4 mb-3">Product / Service Details</h5>
                      <Form.Group className="mb-3">
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
                            <Form.Check 
                              key={i} 
                              type="checkbox" 
                              id={`category-${i}`}
                              name="categories"
                              value={cat}
                              label={cat} 
                            />
                          ))}
                        </div>
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="offerings">Brief Description of Offerings</Form.Label>
                        <Form.Control
                          id="offerings"
                          name="offerings"
                          as="textarea"
                          rows={3}
                          maxLength={500}
                          autoComplete="off"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please describe your offerings.
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="certifications">Certifications & Compliance</Form.Label>
                        <Form.Control
                          id="certifications"
                          name="certifications"
                          type="text"
                          autoComplete="off"
                          placeholder="ISO, NABH, CE, etc."
                        />
                      </Form.Group>
                      
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label htmlFor="locations">Manufacturing Location(s)</Form.Label>
                            <Form.Control 
                              id="locations"
                              name="locations" 
                              type="text" 
                              autoComplete="off"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label htmlFor="capacity">Capacity / Supply Capability per Month</Form.Label>
                            <Form.Control 
                              id="capacity"
                              name="capacity" 
                              type="text" 
                              autoComplete="off"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* Section 4: Experience & Clients */}
                      <h5 className="mt-4 mb-3">Experience & Clients</h5>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label htmlFor="yearsHealthcare">Years Supplying to Healthcare Sector</Form.Label>
                            <Form.Control 
                              id="yearsHealthcare"
                              name="yearsHealthcare" 
                              type="number" 
                              autoComplete="off"
                              min="0"
                              max="100"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label htmlFor="clients">Major Clients Served (max 5)</Form.Label>
                            <Form.Control 
                              id="clients"
                              name="clients" 
                              type="text" 
                              autoComplete="off"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="projects">Recent Healthcare Projects Supplied</Form.Label>
                        <Form.Control
                          id="projects"
                          name="projects"
                          as="textarea"
                          rows={2}
                          autoComplete="off"
                          placeholder="Project name, year, scope"
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="geography">Geographic Areas Served</Form.Label>
                        <Form.Control 
                          id="geography"
                          name="geography" 
                          type="text" 
                          autoComplete="off"
                        />
                      </Form.Group>

                      {/* Section 5: Commercial & Operational Details */}
                      <h5 className="mt-4 mb-3">Commercial & Operational Details</h5>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label htmlFor="leadtime">Average Lead Time for Orders</Form.Label>
                            <Form.Control 
                              id="leadtime"
                              name="leadtime" 
                              type="text" 
                              autoComplete="off"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label htmlFor="gst">GST Number / Tax Identification Number</Form.Label>
                            <Form.Control 
                              id="gst"
                              name="gst" 
                              type="text" 
                              autoComplete="off"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="bank">Bank Details (optional at this stage)</Form.Label>
                        <Form.Control 
                          id="bank"
                          name="bank" 
                          type="text" 
                          autoComplete="off"
                        />
                      </Form.Group>

                      {/* Section 6: Attachments */}
                      <h5 className="mt-4 mb-3">Attachments</h5>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="profileUpload">
                          <FaUpload className="me-2 text-secondary" />
                          Company Profile / Brochure
                        </Form.Label>
                        <Form.Control
                          id="profileUpload"
                          name="profile"
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="catalogueUpload">
                          <FaUpload className="me-2 text-secondary" />
                          Product Catalogue
                        </Form.Label>
                        <Form.Control
                          id="catalogueUpload"
                          name="catalogue"
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="certsUpload">
                          <FaUpload className="me-2 text-secondary" />
                          Relevant Certifications
                        </Form.Label>
                        <Form.Control
                          id="certsUpload"
                          name="certs"
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="refsUpload">
                          <FaUpload className="me-2 text-secondary" />
                          Reference Letters (if available)
                        </Form.Label>
                        <Form.Control
                          id="refsUpload"
                          name="refs"
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                      </Form.Group>

                      {/* Section 7: Declaration & Consent */}
                      <h5 className="mt-4 mb-3">Declaration & Consent</h5>
                      <Form.Group className="mb-3">
                        <Form.Check
                          required
                          id="declarationCheck"
                          name="declaration"
                          type="checkbox"
                          label="I confirm that the information provided above is accurate and complete to the best of my knowledge."
                        />
                        <Form.Control.Feedback type="invalid">
                          You must confirm the accuracy of information.
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Check
                          required
                          id="consentCheck"
                          name="consent"
                          type="checkbox"
                          label="I agree to Infra.Health's vendor terms & policies."
                        />
                        <Form.Control.Feedback type="invalid">
                          You must agree to the terms & policies.
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Submit Button */}
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-outline-secondary btn-lg px-5"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                              />
                              Submitting...
                            </>
                          ) : (
                            "Submit"
                          )}
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