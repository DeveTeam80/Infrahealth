"use client";

import { Container, Row, Col, Card, Button } from "react-bootstrap";

const products = [
  {
    title: "Modular Operation Theatres (MOT)",
    image: "/images/products/mot.jpg",
    link: "/products/modular-operation-theatres",
  },
  {
    title: "Hospital Furniture Solutions",
    image: "/images/products/furniture.jpg",
    link: "/products/medical-furniture-solutions",
  },
  {
    title: "Modular ICUs",
    image: "/images/products/icu.jpg",
    link: "",
  },
  {
    title: "Complete Modular Hospitals",
    image: "/images/products/modular-hospital.png",
    link: "",
  },
  {
    title: "Central Sterile Services Departments (CSSD)",
    image: "/images/products/cssd.jpg",
    link: "",
  },
  {
    title: "Medical Gas Pipeline Systems (MGPS)",
    image: "/images/products/mgps.webp",
    link: "",
  },
  {
    title: "Nurse Call System",
    image: "/images/products/nurse-call-system.jpg",
    link: "",
  },
  {
    title: "Field Hospitals – rapid deployment medical infrastructure",
    image: "/images/products/field-hosp.jpg",
    link: "",
  },
  {
    title:
      "Digital Healthcare Solutions – HIMS, hospital automation, telemedicine platforms",
    image: "/images/products/digital.webp",
    link: "",
  },
];

export default function ProductClient() {
  return (
    <section className="py-5 bg-light">
      <Container>
                   <p className="section-subtitle">OUR PRODUCTS</p>
                    <h3 className="section-title"><span>Infra.Health</span> Products</h3>
        <Row className="g-4">
          {products.map((product, i) => (
            <Col key={i} xs={12} sm={6} md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.title}
                  height={250}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title>{product.title}</Card.Title>
                  <a href={product.link} className="stretched-link"></a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
