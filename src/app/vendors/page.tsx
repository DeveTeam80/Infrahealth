"use client";

import React, { useState, useEffect, useRef } from "react";
import "../../styles/services.css";
import {
  Card,
  Col,
  Container,
  Form,
  Row,
  Alert,
  Spinner,
} from "react-bootstrap";
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
    const fileInputs =
      form.querySelectorAll<HTMLInputElement>('input[type="file"]');
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (const input of fileInputs) {
      if (input?.files?.length) {
        const file = input.files[0];
        if (file.size > maxSize) {
          setSubmitStatus({
            show: true,
            type: "danger",
            message: `File size for ${input.name} must be less than 5MB.`,
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
      const categoryCheckboxes = form.querySelectorAll(
        'input[name="categories"]:checked'
      ) as NodeListOf<HTMLInputElement>;
      categoryCheckboxes.forEach((checkbox) => {
        formData.append("categories", checkbox.value);
      });

      const response = await fetch("/api/vendor", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          show: true,
          type: "success",
          message: result.message,
        });
        form.reset();
        setValidated(false);
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        show: true,
        type: "danger",
        message:
          error instanceof Error
            ? error.message
            : "An error occurred while submitting the form.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container mt-4">
        {/* Vendor Application */}
        <section className="py-5">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6}>
                <div className="mx-auto" style={{ textAlign: "justify" }}>
                  <p className="section-subtitle">OUR PARTNERS</p>
                  <h3 className="section-title">
                    Why Partner With <span> Us?</span>
                  </h3>
                  <p className="mt-3 text-muted">
                    We have grown not by leaving others behind, but by taking
                    forward our partners with us, by efficiently making them
                    more competitive. Our connections with the best healthcare
                    industries have helped vendors increase their reach. Our
                    projects are spread across the diverse geographies in India,
                    and also internationally. This creates opportunities for our
                    vendors to expand their business without investing in
                    marketing. Our procurement processes are transparent,
                    smooth, and structured, with clean timelines, so that
                    vendors can plan and allocate their resources accordingly.
                    In a fast-growing healthcare infrastructure ecosystem, Infra
                    Health has a strong foothold, supported by the best
                    hospitals, government health department, and healthcare
                    investors. <br />
                    <br />
                    We maintain an on-time payment record, and also offer
                    channels to eliminate any possible delay in payments or
                    approvals. We ensure that product specifications are aligned
                    with regulatory standards such as NABH, ISO, and WHO
                    guidelines, reducing compliance risks and potential rework.
                    Visibility of our partners is increased by priority bidding,
                    joint marketing initiatives, and co-branding. Operational
                    efficiency is increased by smooth order processing and
                    improved logistics coordination. Suppliers looking to
                    strengthen their presence in the healthcare domain get an
                    opportunity of a strategic partnership to deliver excellence
                    together. <br />
                    <br /> Let&apos;s Grow Together!
                  </p>
                </div>
              </Col>
              <Col lg={6}>
                {submitStatus.show && (
                  <Alert
                    variant={submitStatus.type}
                    className="mb-4"
                    dismissible
                    onClose={() =>
                      setSubmitStatus({ ...submitStatus, show: false })
                    }
                  >
                    {submitStatus.message}
                  </Alert>
                )}

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
                      {/* Company + Email */}
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="companyName">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                              name="companyName"
                              type="text"
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter your company name.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control name="email" type="email" required />
                            <Form.Control.Feedback type="invalid">
                              Please enter a valid email.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* Phone + City */}
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="phone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control name="phone" type="tel" required />
                            <Form.Control.Feedback type="invalid">
                              Please enter your phone number.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control name="city" type="text" required />
                            <Form.Control.Feedback type="invalid">
                              Please enter your city.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* State + Turnover */}
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="state">
                            <Form.Label>State</Form.Label>
                            <Form.Control name="state" type="text" required />
                            <Form.Control.Feedback type="invalid">
                              Please enter your state.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="turnover">
                            <Form.Label>
                              Annual Turnover (in ₹ Crores)
                            </Form.Label>
                            <Form.Select name="turnover" required>
                              <option value="">Select turnover</option>
                              <option value="<1.5">&lt; 1.5 Cr</option>
                              <option value="1.5-3">1.5 - 3 Cr</option>
                              <option value="3-6">3 - 6 Cr</option>
                              <option value="6-10">6 - 10 Cr</option>
                              <option value="10-15">10 - 15 Cr</option>
                              <option value="15-25">15 - 25 Cr</option>
                              <option value=">25">&gt; 25 Cr</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              Please select your turnover.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* Describe You + Industry */}
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group controlId="describeYou">
                            <Form.Label>What describes you best?</Form.Label>
                            <Form.Select name="describeYou" required>
                              <option value="">Choose one</option>
                              <option value="general-contractor">
                                General Contractor
                              </option>
                              <option value="fixtures-factory">
                                Fixtures Factory
                              </option>
                              <option value="material-supplier">
                                Material Supplier
                              </option>
                              <option value="agency">Agency</option>
                              <option value="turnkey-labour">
                                Turnkey Labour Contractor
                              </option>
                              <option value="branding-factory">
                                Branding Factory
                              </option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              Please select an option.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Form.Group controlId="industry">
                            <Form.Label>Industry</Form.Label>
                            <Form.Select name="industry" required>
                              <option value="">Select industry</option>
                              <option value="retail">Retail</option>
                              <option value="commercial">Commercial</option>
                              <option value="residential">Residential</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              Please select your industry.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* Acceptance */}
                      <Form.Group className="mb-3">
                        <Form.Check
                          required
                          name="acceptance"
                          label="By submitting this form, you agree to our Privacy Policy."
                        />
                        <Form.Control.Feedback type="invalid">
                          You must agree before submitting.
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Submit */}
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting…" : "Submit"}
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
