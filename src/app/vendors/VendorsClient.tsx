"use client";

import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  Row,
  Alert,
  Button,
} from "react-bootstrap";
import "../../styles/services.css";
import "../../styles/career.css";

export default function VendorsClient() {
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    show: boolean;
    type: "success" | "danger";
    message: string;
  }>({ show: false, type: "success", message: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    // File size validation
    const fileInputs =
      form.querySelectorAll<HTMLInputElement>('input[type="file"]');
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (const input of fileInputs) {
      if (input?.files?.length) {
        if (input.files[0].size > maxSize) {
          setSubmitStatus({
            show: true,
            type: "danger",
            message: `File "${input.id}" is too large. Max size is 5MB.`,
          });
          return;
        }
      }
    }

    setIsSubmitting(true);
    setSubmitStatus({ show: false, type: "success", message: "" });

    try {
      const formData = new FormData(form);

      const response = await fetch("/api/vendor", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      if (response.ok && result.success) {
        setSubmitStatus({
          show: true,
          type: "success",
          message: result.message || "Application submitted successfully!",
        });
        form.reset();
        setValidated(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error(result.message || "Failed to submit application.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        show: true,
        type: "danger",
        message:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <section className="py-5">
        <Container>
          <Row className="justify-content-center">
            {/* LEFT CONTENT: WHY PARTNER */}
            <Col lg={6}>
              <div className="mx-auto" style={{ textAlign: "justify" }}>
                <p className="section-subtitle">OUR PARTNERS</p>
                <h3 className="section-title">
                  Why Partner With <span> Us?</span>
                </h3>
                <p className="mt-3 text-muted">
                  We have grown by taking forward our partners with us, making
                  them more competitive. Our connections help vendors increase
                  their reach across diverse geographies in India and
                  internationally. <br />
                  <br />
                  We maintain an on-time payment record and ensure product
                  specifications align with regulatory standards (NABH, ISO,
                  WHO), reducing compliance risks. Let&apos;s Grow Together!
                </p>
              </div>
            </Col>
            {submitStatus.show && (
              <Alert
                variant={submitStatus.type}
                className="mb-4 "
                dismissible
                onClose={() =>
                  setSubmitStatus({ ...submitStatus, show: false })
                }
              >
                {submitStatus.message}
              </Alert>
            )}
            {/* RIGHT CONTENT: FORM */}
            <Col lg={6}>
              <Card className="shadow rounded-4 border-0 p-4">
                <Card.Body>
                  <h3 className="mb-4 text-center">Vendor Application Form</h3>

                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group controlId="companyName">
                          <Form.Label>Company Name</Form.Label>
                          <Form.Control
                            name="companyName"
                            type="text"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="email">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control name="email" type="email" required />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group controlId="phone">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control name="phone" type="tel" required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="city">
                          <Form.Label>City</Form.Label>
                          <Form.Control name="city" type="text" required />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group controlId="state">
                          <Form.Label>State</Form.Label>
                          <Form.Control name="state" type="text" required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="turnover">
                          <Form.Label>Annual Turnover (₹ Crores)</Form.Label>
                          <Form.Select name="turnover" required>
                            <option value="">Select turnover</option>
                            <option value="<1.5">&lt; 1.5 Cr</option>
                            <option value="1.5-3">1.5 - 3 Cr</option>
                            <option value="3-6">3 - 6 Cr</option>
                            <option value=">25">&gt; 25 Cr</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <hr />
                    <h5 className="mb-3">Documents (Max 5MB each)</h5>

                    <Form.Group className="mb-3" controlId="companyProfile">
                      <Form.Label>Company Profile (PDF/DOC)</Form.Label>
                      <Form.Control
                        name="companyProfile"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        required
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="turnoverCertificate"
                    >
                      <Form.Label>Turnover Certificate</Form.Label>
                      <Form.Control
                        name="turnoverCertificate"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="isoCertificate">
                      <Form.Label>ISO Certificate</Form.Label>
                      <Form.Control
                        name="isoCertificate"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="describeYou">
                      <Form.Label>What describes you best?</Form.Label>
                      <Form.Select name="describeYou" required>
                        <option value="">Choose one</option>
                        <option value="OEM">OEM</option>
                        <option value="Suppliers">Suppliers</option>
                        <option value="Consultant">Consultant</option>
                        <option value="Contractors">Contractors</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        required
                        name="acceptance"
                        label="I agree to the Privacy Policy."
                      />
                    </Form.Group>

                    <div className="text-center">
                      <Button
                        type="submit"
                        className="btn btn-primary px-5 w-75"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
