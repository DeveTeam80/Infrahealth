import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaCircleXmark } from "react-icons/fa6";

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
    requirement: "", // renamed from speciality
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
    <Modal show={show} onHide={handleClose} size="lg" closeButton>
      <Modal.Body>
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            background: "transparent",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          <FaCircleXmark />
        </button>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
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
          </Form.Group>

          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Mobile <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile number"
              required
              pattern="[0-9]{10,15}"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Email <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
            />
          </Form.Group>

          {/* City & State in a Row */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  City <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  State <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Requirement Dropdown */}
          <Form.Group>
            <Form.Label>
              Services <span style={{ color: "red" }}>*</span>
            </Form.Label>
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
              <option value="Facility Management">Facility Management</option>
              <option value="Properties">Properties</option>
              <option value="Finance">Finance</option>
            </Form.Select>
          </Form.Group>

          <Button className="mt-3" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TalkToUsModal;
