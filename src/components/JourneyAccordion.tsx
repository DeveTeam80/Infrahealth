"use client";

import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

interface JourneyTab {
  key: string;
  label: string;
  title: string;
  description: string;
  image: string;
}

interface Props {
  tabs: JourneyTab[];
}

const JourneyAccordion: React.FC<Props> = ({ tabs }) => {
  const [openKey, setOpenKey] = useState<string | null>(tabs[0]?.key);

  const toggle = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="design-mobile-accordion">
      {tabs.map((tab) => (
        <div key={tab.key} className="mb-3">
          {/* HEADER */}
          <button
            type="button"
            className={`accordion-header ${
              openKey === tab.key ? "active" : ""
            }`}
            onClick={() => toggle(tab.key)}
          >
            <span>{tab.label}</span>
            <span className="icon">{openKey === tab.key ? "−" : "+"}</span>
          </button>

          {/* BODY */}
          {openKey === tab.key && (
            <div className="accordion-body mt-3">
              <Row>
                <Col xs={12} className="mb-3">
                  <img
                    src={tab.image}
                    alt={tab.title}
                    className="w-100 rounded shadow-sm"
                    style={{
                      height: "240px",
                      objectFit: "cover",
                    }}
                  />
                </Col>

                <Col xs={12}>
                  <h4 className="fw-bold mb-2">{tab.title}</h4>
                  <p>{tab.description}</p>
                </Col>
              </Row>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JourneyAccordion;
