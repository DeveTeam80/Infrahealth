import { Container, Row, Col, Card } from "react-bootstrap";
import "../../../styles/career.css";
import ApplicationFormClient from "./ApplicationFormClient";

export default async function ApplicationFormPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = await searchParams;
  const designation =
    typeof params.designation === "string" ? params.designation : "";

  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="shadow rounded-4 border-0 p-4">
              <h3 className="mb-4 text-center">Employee Application Form</h3>
              <ApplicationFormClient designation={designation} />
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}