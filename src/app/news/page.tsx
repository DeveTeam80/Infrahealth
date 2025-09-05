"use client";

import { Container, Row, Col } from "react-bootstrap";
import { FaClock } from "react-icons/fa";

export default function ComingSoon() {
  return (
    <main className="coming-soon-page d-flex align-items-center text-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <FaClock size={60} className="mb-4 text-primary" />
            <h1 className="mb-3">🚀 Coming Soon</h1>
            <p className="lead text-muted">
              We’re working hard to launch this page. Stay tuned for something amazing!
            </p>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .coming-soon-page {
          min-height: 80vh; /* keeps it nicely centered */
        }
        h1 {
          font-weight: 700;
        }
      `}</style>
    </main>
  );
}
