"use client";

import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Link from "next/link";
import { NewsItem } from "@/data/newsData";

interface Section {
  key: string;
  title: string;
  items: NewsItem[];
}

interface Props {
  sections: Section[];
}

const NewsMobileAccordion: React.FC<Props> = ({ sections }) => {
  const [openKey, setOpenKey] = useState<string | null>(
    sections[0]?.key || null,
  );

  const toggle = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="design-mobile-accordion">
      {sections.length > 0 ? (
        sections.map((section) => (
          <div key={section.key} className="mb-3">
            {/* HEADER */}
            <button
              type="button"
              className={`accordion-header ${
                openKey === section.key ? "active" : ""
              }`}
              onClick={() => toggle(section.key)}
            >
              <span>{section.title}</span>
              <span className="icon">
                {openKey === section.key ? "−" : "+"}
              </span>
            </button>

            {/* BODY */}
            {openKey === section.key && (
              <div className="accordion-body mt-3">
                {section.items.map((card) => (
                  <Card key={card.id} className="border-0 mb-4">
                    <Row className="g-0">
                      <Col xs={12}>
                        <Card.Img
                          src={card.image}
                          alt={card.title}
                          className="rounded mb-3"
                        />
                      </Col>

                      <Col xs={12}>
                        <Card.Body className="p-0">
                          <Card.Title className="fw-bold">
                            {card.title}
                          </Card.Title>

                          <Card.Text className="text-muted small">
                            {card.date}
                          </Card.Text>

                          <Card.Text>{card.description}</Card.Text>

                          <Link href={`/news/${card.id}`} className="read-more">
                            READ MORE →
                          </Link>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center py-4 text-gray-500">
          No records available at this time.
        </p>
      )}
    </div>
  );
};

export default NewsMobileAccordion;
