"use client";

import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Image from "next/image";
import { FaBuilding, FaRulerCombined, FaBed } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../../styles/services.css";
import { portfolioData } from "@/data/portfolioData";

export default function PortfolioDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = portfolioData.find((item) => item.slug === params.slug);

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!project) {
    return <p className="text-center py-5">Project not found</p>;
  }

  const { title, category, subcategory, projectBrief, services, images } =
    project;

  const openGallery = (index: number) => {
    setGalleryImages(images);
    setActiveIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <>
      <main className="portfolio-details py-5">
        <Container>
          <Row>
            <Col md={10} className="mx-auto">
              {/* Main Image */}
              {images?.[0] && (
                <img
                  src={images[0]}
                  alt={title}
                  className="img-fluid rounded mb-4"
                  onClick={() => openGallery(0)}
                  style={{ cursor: "pointer", width: "100%" }}
                />
              )}

              {/* Title */}
              <h2 className="fw-bold mb-3">{title}</h2>

              {/* Short Paragraph */}
              <p className="text-muted mb-4">
                {`The ${
                  subcategory ? subcategory.toLowerCase() : ""
                } under ${category.toLowerCase()} is ${
                  projectBrief.shortDescription
                }`}
              </p>

              {/* Stats Cards */}
              <Row className="mb-4">
                {projectBrief.noOfBeds && (
                  <Col md={4} sm={6} xs={12} className="mb-3">
                    <Card className="text-center shadow-sm h-100">
                      <Card.Body className="d-flex align-items-center justify-content-center gap-2">
                        <FaBed color="#2d8386" size={30} />
                        <div className="d-flex">
                          <Card.Title className="mb-0">
                            {projectBrief.noOfBeds} Beds
                          </Card.Title>
                          {/* <Card.Text className="mb-0"></Card.Text> */}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )}
                {projectBrief.buildingConfiguration && (
                  <Col md={4} sm={6} xs={12} className="mb-3">
                    <Card className="text-center shadow-sm h-100">
                      <Card.Body className="d-flex align-items-center justify-content-center gap-2">
                        <FaBuilding color="#2d8386" size={30} />
                        <div className="d-flex">
                          <Card.Title className="mb-0">
                            {projectBrief.buildingConfiguration}
                          </Card.Title>
                          {/* <Card.Text className="mb-0">Building</Card.Text> */}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )}
                {projectBrief.builtUpArea && (
                  <Col md={4} sm={6} xs={12} className="mb-3">
                    <Card className="text-center shadow-sm h-100">
                      <Card.Body className="d-flex align-items-center justify-content-center gap-2">
                        <FaRulerCombined color="#2d8386" size={30} />
                        <div className="d-flex">
                          <Card.Title className="mb-0">
                            {projectBrief.builtUpArea} Area
                          </Card.Title>
                          {/* <Card.Text className="mb-0"> Area</Card.Text> */}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )}
              </Row>

              {/* Services */}
              {services && services.length > 0 && (
                <section className="mb-4">
                  <h4 className="mb-3">Services Provided</h4>
                  <div className="row justify-content-center">
                    {services.map((service: string, idx: number) => {
                      const colClass =
                        services.length === 3 ||
                        services.length === 5 ||
                        services.length === 6
                          ? "col-md-4 col-sm-6"
                          : "col-md-3 col-sm-6";

                      return (
                        <div key={idx} className={`${colClass} my-2`}>
                          <div
                            className="value-card p-3 text-center rounded shadow-sm d-flex align-items-center justify-content-center"
                            style={{ height: "120px" }}
                          >
                            <h5 className="mt-2">{service}</h5>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Gallery */}
              {images && images.length > 0 && (
                <section className="mt-4">
                  <h4 className="mb-3">Project Gallery</h4>
                  <Row className="g-3">
                    {images.map((img: string, idx: number) => (
                      <Col md={4} sm={6} xs={12} key={idx}>
                        <div
                          className="gallery-image-wrapper rounded shadow-sm"
                          style={{
                            width: "100%",
                            height: "200px", // fixed height
                            overflow: "hidden",
                            cursor: "pointer",
                          }}
                          onClick={() => openGallery(idx)}
                        >
                          <Image
                            src={img}
                            alt={`${title} - ${idx + 1}`}
                            width={400} // arbitrary width, next/image needs it
                            height={200} // same as wrapper height
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover", // fills container without distortion
                            }}
                            className="img-fluid"
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                </section>
              )}
            </Col>
          </Row>
        </Container>
      </main>

      {/* Swiper Gallery Popup */}
      {isGalleryOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsGalleryOpen(false);
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              fontSize: "28px",
              color: "#fff",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              zIndex: 10000,
            }}
            onClick={() => setIsGalleryOpen(false)}
          >
            ✕
          </button>

          <Swiper
            initialSlide={activeIndex}
            modules={[Navigation, Pagination, Keyboard]}
            navigation
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            style={{ width: "90%", height: "90%" }}
          >
            {galleryImages.map((src, index) => (
              <SwiperSlide key={index}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Image
                    src={src}
                    alt={`Slide ${index}`}
                    width={1000}
                    height={700}
                    style={{
                      maxHeight: "90vh",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
