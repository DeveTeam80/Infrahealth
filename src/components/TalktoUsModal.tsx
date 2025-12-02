import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { Modal, Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";

function TalkToUsModal({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) {
  const [formData, setFormData] = useState({
    title: "Dr",
    name: "",
    mobile: "",
    email: "",
    city: "",
    state: "",
    requirement: "",
    solution: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/talktoUs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Form submitted successfully!");
        setFormData({
          title: "Dr",
          name: "",
          mobile: "",
          email: "",
          city: "",
          state: "",
          requirement: "",
          solution: "",
          message: "",
        });
        handleClose();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert(" Server error. Please try again later.");
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
            {/* Title */}
            <Col md={6}>
              <FloatingLabel controlId="floatingTitle" label="Title">
                <Form.Select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                >
                  <option value="Dr">Dr.</option>
                  <option value="Mr">Mr.</option>
                  <option value="Mrs">Mrs.</option>
                  <option value="Miss">Miss</option>
                </Form.Select>
              </FloatingLabel>
            </Col>

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

            {/* State */}
            <Col md={6}>
              <FloatingLabel controlId="floatingState" label="State *">
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

            {/* Requirement */}
            <Col md={12}>
              <FloatingLabel controlId="floatingRequirement" label="Services *">
                <Form.Select
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Requirement --</option>
                  <option value="Hospital infrastructure">
                    Hospital infrastructure
                  </option>
                  <option value="Healthcare consulting">
                    Healthcare consulting
                  </option>
                  <option value="Advisory">Advisory</option>
                  <option value="Products">Products</option>
                  <option value="Medical equipment">Medical equipment</option>
                  <option value="Facility Management">
                    Facility Management
                  </option>
                  <option value="Properties">Properties</option>
                  <option value="Finance">Finance</option>
                </Form.Select>
              </FloatingLabel>
            </Col>

            <Col md={12}>
              <FloatingLabel controlId="floatingSolution" label="Solutions *">
                <Form.Select
                  name="solution"
                  value={formData.solution}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Solution --</option>
                  <option value="Medical Institutions and College">
                    Medical Institutions and College
                  </option>
                  <option value="Multispeciality Hospital">
                    Multispeciality Hospital
                  </option>
                  <option value="Modular Hospital">Modular Hospital</option>
                  <option value="Government Hospital">
                    Government Hospital
                  </option>
                  <option value="Facilities">Facilities</option>
                </Form.Select>
              </FloatingLabel>
            </Col>

            {/* Message */}
            <Col md={12}>
              <FloatingLabel controlId="floatingMessage" label="Message">
                <Form.Control
                  as="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Leave your message here"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
            </Col>
          </Row>

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

export default TalkToUsModal;
