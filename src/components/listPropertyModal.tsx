"use client";

import React, { useState } from "react";
import { FaXmark, FaTrash } from "react-icons/fa6";
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
  FloatingLabel,
  Alert,
} from "react-bootstrap";

function ListPropertyModal({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) {
  // --- States ---
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    show: boolean;
    type: "success" | "danger";
    message: string;
  }>({ show: false, type: "success", message: "" });

  const [propertyType, setPropertyType] = useState("Clinics");
  const [adType, setAdType] = useState("Rent");
  const [files, setFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    area: "",
    state: "",
    message: "",
  });

  // --- Handlers ---
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    e.target.value = ""; // Reset input
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ show: false, type: "success", message: "" });

    try {
      const formPayload = new FormData();

      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      // Append custom tab values
      formPayload.append("propertyType", propertyType);
      formPayload.append("adType", adType);

      // Append multiple files
      files.forEach((file) => {
        formPayload.append("files", file);
      });

      const res = await fetch("/api/listProperty", {
        method: "POST",
        body: formPayload,
      });

      if (res.ok) {
        setSubmitStatus({
          show: true,
          type: "success",
          message: "✅ Property listed successfully!",
        });

        // Reset Form
        setFormData({
          name: "",
          mobile: "",
          email: "",
          city: "",
          area: "",
          state: "",
          message: "",
        });
        setFiles([]);
        setValidated(false);

        // Optional: Close modal after delay
        setTimeout(() => {
          handleClose();
          setSubmitStatus({ ...submitStatus, show: false });
        }, 2000);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (err) {
      setSubmitStatus({
        show: true,
        type: "danger",
        message: "❌ Server error. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Body className="p-4 position-relative bg-light">
        <button
          type="button"
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            background: "transparent",
            fontSize: "1.5rem",
            zIndex: 10,
            cursor: "pointer",
            color: "#b6520f",
          }}
        >
          <FaXmark />
        </button>

        <h4 className="mb-4 fw-bold">List Your Property</h4>

        {submitStatus.show && (
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ zIndex: 9999, width: "90%", maxWidth: "400px" }}
          >
            <Alert
              variant={submitStatus.type}
              dismissible
              onClose={() => setSubmitStatus({ ...submitStatus, show: false })}
              className="shadow-lg text-center fw-bold"
            >
              {submitStatus.message}
            </Alert>
          </div>
        )}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <FloatingLabel label="Full Name *">
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel label="Mobile Number *">
                <Form.Control
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile"
                  required
                  pattern="[0-9]{10,15}"
                />
              </FloatingLabel>
            </Col>

            <Col md={12}>
              <FloatingLabel label="Email Address *">
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={4}>
              <FloatingLabel label="City *">
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={4}>
              <FloatingLabel label="Area/Locality *">
                <Form.Control
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Area"
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={4}>
              <FloatingLabel label="State *">
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                />
              </FloatingLabel>
            </Col>

            <Col md={12}>
              <FloatingLabel label="Additional Message (Optional)">
                <Form.Control
                  as="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
            </Col>
          </Row>

          {/* ATTACH FILES */}
          <div className="mt-4">
            <Form.Group controlId="attachFiles">
              <Form.Label className="fw-semibold">
                Attach Photos / Documents
              </Form.Label>
              <Form.Control
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <small className="text-muted d-block mt-1">
                Max file size: 5MB per file.
              </small>

              {files.length > 0 && (
                <div className="mt-3">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center justify-content-between border rounded px-3 py-2 mb-2 bg-white"
                    >
                      <span className="small text-truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="property-form-trash"
                        title="Remove"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Form.Group>
          </div>

          {/* PROPERTY SELECTION BOXES WITH PREVIOUS CLASSES */}
          <div className="property-box mt-4">
            <p className="property-title">Property type</p>
            <div className="property-tabs">
              {["Clinics", "Hospital", "Medical institutes"].map((type) => (
                <button
                  type="button"
                  key={type}
                  className={`property-tab ${
                    propertyType === type ? "active" : ""
                  }`}
                  onClick={() => setPropertyType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="property-divider" />

            <p className="property-title mt-3">Select Property Ad Type</p>
            <div className="property-tabs secondary">
              {["Rent", "Resale", "Infrastructure"].map((type) => (
                <button
                  type="button"
                  key={type}
                  className={`property-tab ${adType === type ? "active" : ""}`}
                  onClick={() => setAdType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center">
            <Button
              type="submit"
              className="btn-primary px-5 py-2 fw-bold w-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Property Details"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ListPropertyModal;
