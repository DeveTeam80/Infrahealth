"use client";

import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { Modal, Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import Select from "react-select";

/* ===========================
   GROUPED OPTIONS
=========================== */
const GROUPED_OPTIONS = [
  {
    label: "Consult",
    options: [
      { value: "hospital-design", label: "Hospital Design" },
      {
        value: "project-management-consultancy",
        label: "Project Management Consultancy",
      },
      {
        value: "equipment-planning-integration",
        label: "Equipment Planning & Integration",
      },
      {
        value: "ppp-advisory",
        label: "Public Private Partnership (PPP) Advisory",
      },
      {
        value: "hospital-esg-advisory",
        label: "Hospital ESG Advisory Services",
      },
      {
        value: "green-building-consultancy",
        label: "Hospital Green Building Consultancy",
      },
      {
        value: "facility-management-consultancy",
        label: "Facility Management Consultancy",
      },
      {
        value: "accreditation-advisory",
        label: "Accreditation Advisory",
      },
    ],
  },

  {
    label: "Construct",
    options: [
      {
        value: "engineering-procurement-construction",
        label: "Engineering, Procurement & Construction",
      },
      {
        value: "design-build",
        label: "Design & Build",
      },
      {
        value: "fitout-retrofit",
        label: "Fitout & Retrofit",
      },
      {
        value: "specialty-services",
        label: "Specialty Services",
      },
    ],
  },

  {
    label: "Operate",
    options: [
      {
        value: "property-management",
        label: "Property Management",
      },
      {
        value: "integrated-facility-management",
        label: "Integrated Facility Management Services",
      },
      {
        value: "operation-maintenance",
        label: "Operation & Maintenance",
      },
      {
        value: "hr-support-services",
        label: "HR Support Services",
      },
    ],
  },
];

type OptionType = {
  value: string;
  label: string;
};

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
    requirement: [] as OptionType[],
    solution: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ===========================
     SUBMIT
  =========================== */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      requirement: formData.requirement.map((i) => i.value).join(", "),
    };

    try {
      const res = await fetch("/api/talktoUs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
          requirement: [],
          solution: "",
          message: "",
        });

        handleClose();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Body className="p-4 position-relative bg-light">
        {/* CLOSE BUTTON */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            border: "none",
            background: "transparent",
            fontSize: "1.5rem",
            color: "#b6520f",
            cursor: "pointer",
          }}
        >
          <FaXmark />
        </button>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            {/* TITLE */}
            <Col md={6}>
              <FloatingLabel label="Title">
                <Form.Select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                >
                  <option value="Dr">Dr.</option>
                  <option value="Mr">Mr.</option>
                  <option value="Mrs">Mrs.</option>
                  <option value="Miss">Miss</option>
                </Form.Select>
              </FloatingLabel>
            </Col>

            {/* NAME */}
            <Col md={6}>
              <FloatingLabel label="Name *">
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>

            {/* MOBILE */}
            <Col md={6}>
              <FloatingLabel label="Mobile *">
                <Form.Control
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>

            {/* EMAIL */}
            <Col md={6}>
              <FloatingLabel label="Email *">
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>

            {/* CITY */}
            <Col md={6}>
              <FloatingLabel label="City *">
                <Form.Control
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>

            {/* STATE */}
            <Col md={6}>
              <FloatingLabel label="State *">
                <Form.Control
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>

            {/* ✅ GROUPED MULTISELECT */}
            <Col md={12}>
              <FloatingLabel label="Services *">
                <div style={{ marginTop: "8px" }}>
                  <Select
                    isMulti
                    options={GROUPED_OPTIONS}
                    value={formData.requirement}
                    className="service-select"
                    onChange={(values) =>
                      setFormData((prev) => ({
                        ...prev,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        requirement: values as any,
                      }))
                    }
                    placeholder="Select services"
                    closeMenuOnSelect={false}
                    classNamePrefix="react-select"
                  />
                </div>
              </FloatingLabel>
            </Col>

            {/* SOLUTION */}
            <Col md={12}>
              <FloatingLabel label="Solutions *">
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

            {/* MESSAGE */}
            <Col md={12}>
              <FloatingLabel label="Message">
                <Form.Control
                  as="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
            </Col>
          </Row>

          {/* SUBMIT */}
          <div className="text-center mt-4">
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
