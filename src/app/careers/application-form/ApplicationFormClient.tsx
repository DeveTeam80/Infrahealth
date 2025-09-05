"use client";

import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FaUpload, FaLinkedin } from "react-icons/fa";

interface Props {
  designation: string;
}

export default function ApplicationFormClient({ designation }: Props) {
  const [validated, setValidated] = useState(false);
  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    // ✅ File size validation
    const fileInput = form.querySelector<HTMLInputElement>("#resume");
    if (fileInput?.files?.length) {
      const file = fileInput.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        event.preventDefault();
        event.stopPropagation();
        alert("File size must be less than 5MB.");
        return;
      }
    }

    setValidated(true);
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* Personal Information */}
        <h4 className="mt-4 mb-3">Personal Information</h4>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="fullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" required />
              <Form.Control.Feedback type="invalid">
                Please enter your full name.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="dob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                required
                max={today} // must not exceed today
              />
              <Form.Control.Feedback type="invalid">
                Please select a valid birthdate (cannot be in the future).
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Select required>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select your gender.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="contact">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="tel" pattern="^[0-9]{10}$" required />
              <Form.Control.Feedback type="invalid">
                Please enter a valid 10-digit contact number.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="address">
              <Form.Label>Current Address</Form.Label>
              <Form.Control as="textarea" rows={1} required />
              <Form.Control.Feedback type="invalid">
                Please enter your current address.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Position Applied For */}
        <h4 className="mt-4 mb-3">Position Applied For</h4>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="role">
              <Form.Label>Department/Role</Form.Label>
              <Form.Control type="text" value={designation} readOnly required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="location">
              <Form.Label>Preferred Location</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="joining">
              <Form.Label>Expected Joining Date</Form.Label>
              <Form.Control type="date" required min={today} />
              <Form.Control.Feedback type="invalid">
                Joining date cannot be before today.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        {/* Education */}
        <h4 className="mt-4 mb-3">Educational Background</h4>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="qualification">
              <Form.Label>Highest Qualification</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="institution">
              <Form.Label>Institution/University</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="year">
              <Form.Label>Year of Completion</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Col>
        </Row>

        {/* Experience */}
        <h4 className="mt-4 mb-3">Professional Experience</h4>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="employer">
              <Form.Label>Current/Last Employer</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="designation">
              <Form.Label>Designation</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="experience">
              <Form.Label>Years of Experience</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="responsibilities">
              <Form.Label>Key Responsibilities</Form.Label>
              <Form.Control as="textarea" rows={1} />
            </Form.Group>
          </Col>
        </Row>

        {/* Skills */}
        <h4 className="mt-4 mb-3">Skills & Competencies</h4>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="techskills">
              <Form.Label>Technical Skills</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="softskills">
              <Form.Label>Soft Skills</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="certifications">
              <Form.Label>Certifications (if any)</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>

        {/* Motivation */}
        <h4 className="mt-4 mb-3">Motivation</h4>
        <Form.Group className="mb-3" controlId="motivation">
          <Form.Label>Why do you want to work at Infra.Health?</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        {/* Resume & LinkedIn */}
        <h4 className="mt-4 mb-3">Resume Upload</h4>
        <Form.Group className="mb-3" controlId="resume">
          <Form.Label>
            <FaUpload className="me-2 text-secondary" />
            Attach Resume (PDF/Word)
          </Form.Label>
          <Form.Control type="file" accept=".pdf,.doc,.docx" required />
          <Form.Control.Feedback type="invalid">
            Please upload your resume (PDF or Word).
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="linkedin">
          <Form.Label>
            <FaLinkedin className="me-2 text-primary" />
            LinkedIn Profile (If Applicable)
          </Form.Label>
          <Form.Control
            type="url"
            placeholder="https://linkedin.com/in/username"
          />
        </Form.Group>

        {/* Declaration */}
        <h4 className="mt-4 mb-3">Declaration</h4>
        <Form.Group className="mb-3" controlId="declaration">
          <Form.Check
            required
            label="I hereby declare that the information provided above is true and accurate to the best of my knowledge."
          />
        </Form.Group>

        {/* Submit */}
        <div className="text-center">
          <button type="submit" className="btn btn-outline-secondary btn-sm">
            Submit
          </button>
        </div>
      </Form>
    </>
  );
}
