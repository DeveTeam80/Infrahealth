"use client";

import { useState } from "react";
import { Container, Row, Col, Nav, Card, Pagination } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import "../../styles/news.css";
import "../../styles/home.css";
import { newsData, NewsItem } from "@/data/newsData";
import Link from "next/link";

const TABS = ["Blogs", "Media", "Webinars", "Case Studies"] as const;
type TabType = (typeof TABS)[number];

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<TabType>("Blogs");
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 10;
  const filteredCards: NewsItem[] = newsData[activeTab] || [];
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  const displayedCards = filteredCards.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  return (
    <main className="resources-page py-5">
      <Container>
        {/* Tabs */}
        <Nav
          variant="pills"
          activeKey={activeTab}
          className="justify-content-center gap-3 mb-4 flex-nowrap"
        >
          {TABS.map((tab) => (
            <Nav.Item key={tab} className="flex-shrink-0">
              <Nav.Link
                eventKey={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={
                  activeTab === tab
                    ? "bg-danger text-white"
                    : "bg-white text-dark"
                }
                style={{
                  borderRadius: "8px",
                  fontWeight: 500,
                  border: "1px solid #b6520f",
                  whiteSpace: "nowrap",
                }}
              >
                {tab}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        {/* Cards */}
        <div className="d-flex flex-column align-items-center justify-content-center w-100">
          {displayedCards.map((card, index) => (
            <div key={card.id} className="w-100">
              <Col
                md={10}
                className="mx-auto mb-4 d-flex justify-content-start"
              >
                <Card className="h-100 border-0">
                  <Row className="g-0 h-100">
                    <Col md={5}>
                      <Card.Img
                        src={card.image}
                        alt={card.title}
                        className="card-rect-img rounded-start"
                      />
                    </Col>
                    <Col md={7} className="d-flex flex-column p-4">
                      <Card.Body className="p-0 flex-grow-1">
                        <Card.Title className="fw-bold">
                          {card.title}
                        </Card.Title>
                        <Card.Text className="text-muted small">
                          {card.date}
                        </Card.Text>
                        <Card.Text>{card.description}</Card.Text>
                      </Card.Body>
                      <div className="mt-auto">
                        <Link href={"#"} className="read-more p-0">
                          READ MORE &raquo;
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Divider only if not the last card */}
              {index < displayedCards.length - 1 && (
                <div className="divider mx-auto"></div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="justify-content-center mt-4">
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
      </Container>
    </main>
  );
}
