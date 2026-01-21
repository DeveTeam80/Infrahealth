import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { Modal, Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

function ListPropertyModal({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) {
  const [propertyType, setPropertyType] = useState<
    "Clinics" | "Hospital" | "Medical institute"
  >("Clinics");

  const [adType, setAdType] = useState<"Rent" | "Resale" | "infrastructure">(
    "Rent",
  );

  const [files, setFiles] = useState<File[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    // append instead of replace
    setFiles((prev) => [...prev, ...selectedFiles]);

    // reset input so same file can be re-selected
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    area: "",
    state: "",
    requirement: "",
    solution: "",
    message: "",
    propertyType: "",
    adType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();

      // text fields
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      // property values
      formPayload.append("propertyType", propertyType);
      formPayload.append("adType", adType);

      // files
      files.forEach((file) => {
        formPayload.append("files", file);
      });

      const res = await fetch("/api/talktoUs", {
        method: "POST",
        body: formPayload,
      });

      if (res.ok) {
        alert("✅ Form submitted successfully!");

        setFormData({
          name: "",
          mobile: "",
          email: "",
          city: "",
          area: "",
          state: "",
          requirement: "",
          solution: "",
          message: "",
          propertyType: "",
          adType: "",
        });

        setFiles([]);
        handleClose();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Body className="p-4 position-relative bg-light">
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            border: "none",
            background: "transparent",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#b6520f",
          }}
        >
          <FaXmark />
        </button>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            {/* Name */}
            <Col md={6}>
              <FloatingLabel controlId="floatingName" label="Name *">
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </FloatingLabel>
            </Col>

            {/* Mobile */}
            <Col md={6}>
              <FloatingLabel controlId="floatingMobile" label="Mobile *">
                <Form.Control
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile number"
                  required
                  pattern="[0-9]{10,15}"
                />
              </FloatingLabel>
            </Col>

            {/* Email */}
            <Col md={6}>
              <FloatingLabel controlId="floatingEmail" label="Email *">
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                />
              </FloatingLabel>
            </Col>

            {/* City */}
            <Col md={6}>
              <FloatingLabel controlId="floatingCity" label="City *">
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

            {/* area */}
            <Col md={6}>
              <FloatingLabel controlId="floatingState" label="State *">
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
          </Row>

          {/* ATTACH FILES */}
          <Col md={12} className="mt-4">
            <Form.Group controlId="attachFiles">
              <Form.Label className="fw-semibold">
                Attach Photos / Upload Documents
              </Form.Label>

              <Form.Control
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                onChange={handleFileChange}
              />

              <small className="text-muted">
                Supported formats: JPG, PNG, PDF, DOC, DOCX
              </small>

              {/* FILE PREVIEW LIST */}
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
                        className="property-form-trash "
                        title="Remove"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Form.Group>
          </Col>

          {/* PROPERTY TYPE */}
          <Col md={12} className="mt-3">
            <div className="property-box">
              <p className="property-title">Property type</p>

              <div className="property-tabs">
                {["Clinics", "Hospital", "Medical institutes"].map((type) => (
                  <button
                    type="button"
                    key={type}
                    className={`property-tab ${
                      propertyType === type ? "active" : ""
                    }`}
                    onClick={() => setPropertyType(type as typeof propertyType)}
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
                    className={`property-tab ${
                      adType === type ? "active" : ""
                    }`}
                    onClick={() => setAdType(type as typeof adType)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </Col>

          {/* Submit */}
          <div className="mt-4 text-center">
            <Button type="submit" className="px-4">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ListPropertyModal;
