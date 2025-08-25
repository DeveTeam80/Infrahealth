export interface Service {
  img: string;
  title: string;
}

export interface Project {
  id: number;
  title: string;
  image: string;
}

export interface Testimonial {
  name: string;
  role: string;
  reviews: string[];
}

export interface Blog {
  img: string;
  title: string;
  link: string;
}

export interface HomeData {
  words: string[];
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  blogs: Blog[];
}

// Export strongly-typed home data
export const homeData: HomeData = {
  words: [
    "Infrastructure",
    "Real Estate",
    "Operations",
    "Consulting",
    "Construction",
    "Finance",
    "Investments"
  ],
  services: [
    { img: "/images/services/1.jpg", title: "Design and Build" },
    { img: "/images/services/2.jpg", title: "Project Management Consultancy" },
    { img: "/images/services/3.jpg", title: "Engineering Procurement Construction (EPC)" },
    { img: "/images/services/4.jpg", title: "Planning and Design" },
    { img: "/images/services/5.jpg", title: "Facility Management Services" },
    { img: "/images/services/6.jpg", title: "Project Feasibility and Investment Advisory" },
    { img: "/images/services/7.jpg", title: "Regulatory Compliance" }
  ],
  projects: [
    { id: 1, title: "Multispeciality & Cancer Hospital", image: "/images/projects/proj1.png" },
    { id: 2, title: "Dr. D.Y. Patil Hospital & Research Center", image: "/images/projects/proj2.png" },
    { id: 3, title: "Sub-district Hospital, Kopergaon", image: "/images/projects/proj3.jpg" }
  ],
  testimonials: [
    {
      name: "Dr. Meera Kapoor",
      role: "Medical Director",
      reviews: [
        "We are incredibly impressed by Infra.Health’s ability to deliver complex healthcare projects with such precision. Their execution was seamless and highly professional.",
        "From planning to handover, the team was proactive, collaborative, and attentive to every detail. Thank you for enabling us to deliver world-class infrastructure to our patients."
      ]
    },
    {
      name: "Rakesh Menon",
      role: "Facility Head",
      reviews: [
        "Infra.Health truly understands the dynamics of healthcare delivery. Their team showed unmatched commitment, ensuring the project was completed on time and fully compliant.",
        "We are especially grateful for their insights into optimizing patient flow through design. Exceptional experience!"
      ]
    },
    {
      name: "Dr. Anjali Verma",
      role: "Founder",
      reviews: [
        "A big thank you to the Infra.Health team for turning our vision for a modern, modular clinic into reality. The quality of work was outstanding.",
        "Their understanding of healthcare needs and ability to deliver within tight timelines sets them apart. We look forward to more collaborations in the future."
      ]
    },
    {
      name: "Dr. Meera Kapoor",
      role: "Medical Director",
      reviews: [
        "We are incredibly impressed by Infra.Health’s ability to deliver complex healthcare projects with such precision. Their execution was seamless and highly professional.",
        "From planning to handover, the team was proactive, collaborative, and attentive to every detail. Thank you for enabling us to deliver world-class infrastructure to our patients."
      ]
    },
    {
      name: "Rakesh Menon",
      role: "Facility Head",
      reviews: [
        "Infra.Health truly understands the dynamics of healthcare delivery. Their team showed unmatched commitment, ensuring the project was completed on time and fully compliant.",
        "We are especially grateful for their insights into optimizing patient flow through design. Exceptional experience!"
      ]
    },
    {
      name: "Dr. Anjali Verma",
      role: "Founder",
      reviews: [
        "A big thank you to the Infra.Health team for turning our vision for a modern, modular clinic into reality. The quality of work was outstanding.",
        "Their understanding of healthcare needs and ability to deliver within tight timelines sets them apart. We look forward to more collaborations in the future."
      ]
    }
  ],
  blogs: [
    { img: "/images/blogs/blog1.png", title: "5 Smart Layout Trends in Modern Healthcare Facilities", link: "#" },
    { img: "/images/blogs/blog2.png", title: "How Infrastructure Impacts Hospital Infection Rates", link: "#" },
    { img: "/images/blogs/blog3.png", title: "Sustainable Hospital Infrastructure: Why It Matters", link: "#" }
  ]
};
