"use client";

import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

interface TabDetails {
  scope?: string[];
  benefits?: string[];
  deliverables?: string[];
  systems_covered?: string[];
  image?: string;
}

interface ServiceTab {
  eventKey: string;
  title: string;
  description: string;
  details?: TabDetails;
}

interface Props {
  tabs: ServiceTab[];
}

const MobileAccordion: React.FC<Props> = ({ tabs }) => {
  const [openKey, setOpenKey] = useState<string | null>(tabs[0]?.eventKey);

  const toggle = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="design-mobile-accordion">
      {tabs.map((tab) => (
        <div key={tab.eventKey} className="mb-3">
          {/* HEADER */}
          <button
            type="button"
            className={`accordion-header ${
              openKey === tab.eventKey ? "active" : ""
            }`}
            onClick={() => toggle(tab.eventKey)}
          >
            <span>{tab.title}</span>
            <span className="icon">{openKey === tab.eventKey ? "−" : "+"}</span>
          </button>

          {/* BODY */}
          {openKey === tab.eventKey && (
            <div className="accordion-body mt-3">
              {tab.details?.image && (
                <img
                  src={tab.details.image}
                  alt={tab.title}
                  className="w-100 rounded shadow-sm mb-3"
                  style={{
                    height: "260px",
                    objectFit: "cover",
                  }}
                />
              )}

              <p>{tab.description}</p>

              {tab.details && (
                <Row>
                  <Col md={12}>
                    {Object.entries(tab.details).map(
                      ([key, value]) =>
                        key !== "image" && (
                          <div key={key} className="mb-3">
                            <h4 className="details-title">
                              {key.replace(/_/g, " ")}:
                            </h4>

                            <ul className="details-list">
                              {Array.isArray(value) &&
                                value.map((item: string, i: number) => (
                                  <li key={i}>{item}</li>
                                ))}
                            </ul>
                          </div>
                        ),
                    )}
                  </Col>
                </Row>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileAccordion;
