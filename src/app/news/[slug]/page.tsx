"use client";

import { Container, Row, Col } from "react-bootstrap";
import { blogInner } from "@/data/blogInner";
import ReactMarkdown from "react-markdown";
import { FaRegCircleUser, FaRegClock } from "react-icons/fa6";

export default function BlogDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = blogInner.find((item) => item.slug === params.slug);

  if (!blog) {
    return <p className="text-center py-5">Blog not found</p>;
  }

  return (
    <main className="blog-details py-5">
      <Container>
        <Row>
          <Col md={10} className="mx-auto">
            <h2
              className="fw-bold mb-3 blog-title"
              dangerouslySetInnerHTML={{ __html: blog.title }}
            ></h2>
            <img
              src={blog.image}
              alt={blog.title}
              className="img-fluid rounded mb-4"
            />
            <div className="blog-content">
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>
            <p className="text-muted">
              <FaRegCircleUser /> By: Infra.health™ Team | <FaRegClock />{" "}
              {blog.date}
            </p>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
