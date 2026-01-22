// data/newsData.ts

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
}

export interface NewsData {
  Blogs: NewsItem[];
  Media: NewsItem[];
  "Case Studies": NewsItem[];
  Webinars: NewsItem[];
}

export const newsData: NewsData = {
  Blogs: [
    {
      id: "blog-1",
      title: "Delivering Sustainable Healthcare Infrastructure in India",
      date: "September 1, 2025",
      image: "images/blogs/blog-1.png",
      description:
        "How Infra.Health is advancing sustainability across hospital design and operations with green building practices.",
    },
    {
      id: "blog-2",
      title: "Designing Patient-Centric Hospitals: Key Considerations",
      date: "September 3, 2025",
      image: "images/blogs/blog-2.png",
      description:
        "Exploring design principles that center on patient safety, comfort, workflow efficiency, and regulatory compliance.",
    },
    {
      id: "blog-3",
      title: "Modular Construction: Faster Hospital Setups",
      date: "September 5, 2025",
      image: "images/blogs/blog-3.png",
      description:
        "The benefits of modular and prefabricated healthcare infrastructure in reducing project timelines and costs.",
    },
    {
      id: "blog-4",
      title: "Healthcare Finance Models: How Infra.Health Enables Access",
      date: "September 7, 2025",
      image: "images/blogs/blog1.png",
      description:
        "Project finance, PPPs, and structured capital models that make hospitals possible in underserved regions.",
    },
    {
      id: "blog-5",
      title: "Role of Tech & IoT in Facility Management",
      date: "September 10, 2025",
      image: "images/blogs/blog2.png",
      description:
        "Infra.Health’s approach to IoT and CAFM systems for predictive maintenance and operational efficiency.",
    },
    {
      id: "blog-6",
      title: "Achieving NABH & JCI Accreditation: Best Practices",
      date: "September 12, 2025",
      image: "images/blogs/blog3.png",
      description:
        "Key compliance requirements, design, and operational protocols needed to meet global healthcare standards.",
    },
    {
      id: "blog-7",
      title: "Public-Private Partnerships in Healthcare Infrastructure",
      date: "September 15, 2025",
      image: "images/blogs/blog1.png",
      description:
        "How government and private sector partnerships deliver high-quality healthcare facilities.",
    },
    {
      id: "blog-8",
      title: "Energy Efficiency in Hospitals: From Design to Operation",
      date: "September 18, 2025",
      image: "images/blogs/blog2.png",
      description:
        "Strategies Infra.Health uses to cut energy usage without compromising medical functionality.",
    },
    {
      id: "blog-9",
      title: "Optimising Clinical Workflow Through Facility Layout",
      date: "September 21, 2025",
      image: "images/blogs/blog3.png",
      description:
        "How zoning, adjacency, and layout impact patient outcomes and staff efficiency.",
    },
    {
      id: "blog-10",
      title: "Financial Viability of Rural Hospitals: Challenges & Solutions",
      date: "September 24, 2025",
      image: "images/blogs/blog1.png",
      description:
        "Overcoming funding, staffing, and regulatory barriers for rural and semi-urban hospitals.",
    },
    {
      id: "blog-11",
      title: "Building Resilience into Hospital Infrastructure",
      date: "September 27, 2025",
      image: "images/blogs/blog2.png",
      description:
        "Design strategies for handling disasters, pandemics, and climate extremes in healthcare buildings.",
    },
    {
      id: "blog-12",
      title: "Using Data to Drive Healthcare Operations",
      date: "September 30, 2025",
      image: "images/blogs/blog3.png",
      description:
        "Role of dashboards, KPIs, and predictive analytics in optimizing operations.",
    },
    {
      id: "blog-13",
      title: "Integrating Diagnostics & Imaging in Hospital Design",
      date: "October 3, 2025",
      image: "images/blogs/blog1.png",
      description:
        "Planning radiology, MRI, and labs as integral parts of hospital infrastructure.",
    },
    {
      id: "blog-14",
      title: "Financing Medical Equipment: Leasing vs Purchase",
      date: "October 6, 2025",
      image: "images/blogs/blog2.png",
      description:
        "Pros and cons of leasing high-end medical equipment vs purchasing.",
    },
    {
      id: "blog-15",
      title:
        "Green Building Certifications in Healthcare: What You Should Know",
      date: "October 9, 2025",
      image: "images/blogs/blog3.png",
      description:
        "Overview of LEED, IGBC, NABH, and other healthcare-friendly certifications.",
    },
  ],

  Media: Array.from({ length: 10 }, (_, i) => ({
    id: `media-${i + 1}`,
    title: `Infra.Health Media Coverage ${i + 1}`,
    date: `August ${5 + i * 3}, 2025`,
    image: `images/blogs/blog${(i % 3) + 1}.png`,
    description: `Highlights of Infra.Health’s presence in news and media, story ${i + 1}.`,
  })),

  "Case Studies": Array.from({ length: 10 }, (_, i) => ({
    id: `case-${i + 1}`,
    title: `Infra.Health Case Study ${i + 1}`,
    date: `July ${7 + i * 7}, 2025`,
    image: `images/blogs/blog${(i % 3) + 1}.png`,
    description: `A case study showcasing Infra.Health’s project execution and outcomes, case ${i + 1}.`,
  })),

  Webinars: Array.from({ length: 5 }, (_, i) => ({
    id: `webinar-${i + 1}`,
    title: `Infra.Health Webinar ${i + 1}`,
    date: `June ${10 + i * 10}, 2025`,
    image: `images/blogs/blog${(i % 3) + 1}.png`,
    description: `A webinar session discussing healthcare infrastructure insights and innovations, webinar ${i + 1}.`,
  })),
};
