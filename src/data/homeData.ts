export type JourneyTab = {
  key: string;
  label: string;
  title: string;
  description: string;
  image: string;
};
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
  journeyTabs: JourneyTab[];
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
    "Investments",
  ],
  services: [
    { img: "/images/services/1.jpg", title: "Design and Build" },
    { img: "/images/services/2.jpg", title: "Project Management Consultancy" },
    {
      img: "/images/services/3.jpg",
      title: "Engineering Procurement Construction (EPC)",
    },
    { img: "/images/services/4.jpg", title: "Planning and Design" },
    { img: "/images/services/5.jpg", title: "Facility Management Services" },
    {
      img: "/images/services/6.jpg",
      title: "Project Feasibility and Investment Advisory",
    },
    { img: "/images/services/7.jpg", title: "Regulatory Compliance" },
  ],
  projects: [
    {
      id: 1,
      title: "Multispeciality & Cancer Hospital",
      image: "/images/projects/proj1.png",
    },
    {
      id: 2,
      title: "Dr. D.Y. Patil Hospital & Research Center",
      image: "/images/projects/proj2.png",
    },
    {
      id: 3,
      title: "Sub-district Hospital, Kopergaon",
      image: "/images/projects/proj3.jpg",
    },
    {
      id: 4,
      title: "Multispeciality & Cancer Hospital",
      image: "/images/projects/proj1.png",
    },
    {
      id: 5,
      title: "Dr. D.Y. Patil Hospital & Research Center",
      image: "/images/projects/proj2.png",
    },
    {
      id: 6,
      title: "Sub-district Hospital, Kopergaon",
      image: "/images/projects/proj3.jpg",
    },
  ],
  testimonials: [
    {
      name: "Dr. Meera Kapoor",
      role: "Medical Director",
      reviews: [
        "We are incredibly impressed by Infra.Health’s ability to deliver complex healthcare projects with such precision. Their execution was seamless and highly professional.",
        "From planning to handover, the team was proactive, collaborative, and attentive to every detail. Thank you for enabling us to deliver world-class infrastructure to our patients.",
      ],
    },
    {
      name: "Rakesh Menon",
      role: "Facility Head",
      reviews: [
        "Infra.Health truly understands the dynamics of healthcare delivery. Their team showed unmatched commitment, ensuring the project was completed on time and fully compliant.",
        "We are especially grateful for their insights into optimizing patient flow through design. Exceptional experience!",
      ],
    },
    {
      name: "Dr. Anjali Verma",
      role: "Founder",
      reviews: [
        "A big thank you to the Infra.Health team for turning our vision for a modern, modular clinic into reality. The quality of work was outstanding.",
        "Their understanding of healthcare needs and ability to deliver within tight timelines sets them apart. We look forward to more collaborations in the future.",
      ],
    },
    {
      name: "Dr. Meera Kapoor",
      role: "Medical Director",
      reviews: [
        "We are incredibly impressed by Infra.Health’s ability to deliver complex healthcare projects with such precision. Their execution was seamless and highly professional.",
        "From planning to handover, the team was proactive, collaborative, and attentive to every detail. Thank you for enabling us to deliver world-class infrastructure to our patients.",
      ],
    },
    {
      name: "Rakesh Menon",
      role: "Facility Head",
      reviews: [
        "Infra.Health truly understands the dynamics of healthcare delivery. Their team showed unmatched commitment, ensuring the project was completed on time and fully compliant.",
        "We are especially grateful for their insights into optimizing patient flow through design. Exceptional experience!",
      ],
    },
    {
      name: "Dr. Anjali Verma",
      role: "Founder",
      reviews: [
        "A big thank you to the Infra.Health team for turning our vision for a modern, modular clinic into reality. The quality of work was outstanding.",
        "Their understanding of healthcare needs and ability to deliver within tight timelines sets them apart. We look forward to more collaborations in the future.",
      ],
    },
  ],
  blogs: [
    {
      img: "/images/blogs/blog1.png",
      title: "5 Smart Layout Trends in Modern Healthcare Facilities",
      link: "#",
    },
    {
      img: "/images/blogs/blog2.png",
      title: "How Infrastructure Impacts Hospital Infection Rates",
      link: "#",
    },
    {
      img: "/images/blogs/blog3.png",
      title: "Sustainable Hospital Infrastructure: Why It Matters",
      link: "#",
    },
  ],
  journeyTabs: [
    {
      key: "site-survey",
      label: "Site Survey",
      title: "Conduct Site Surveys with Infra.Health",
      description:
        "Our office team configures survey needs to be done by the field team via mobile app. The mobile app guides the team to capture spaces, measurements, technical details & observations. Real-time survey details are shared back to office teams for accurate planning.",
      image: "/images/journey/site-survey.jpg",
    },
    {
      key: "design-management",
      label: "Design Management",
      title: "Project Designs Management Workflow",
      description:
        "Our designs are approved & managed on Infra.Health’s tech platform, accessible to field teams via mobile app. Field teams can raise issues and ask for clarifications (RFIs). Experience a hassle-free way to manage & iterate designs in real time.",
      image: "/images/journey/design-management.jpg",
    },
    {
      key: "proposals",
      label: "Proposals & BOQ",
      title: "Project Estimates & Budget",
      description:
        "Review & manage your list of scope items with quantities and rates. Infra.Health manages proposal approvals, tracks change orders & monitors the project budget—delivering a quick and hassle-free client experience.",
      image: "/images/journey/proposals.jpg",
    },
    {
      key: "construction",
      label: "Construction Management",
      title: "Track Real Progress",
      description:
        "Track activity-wise & value-wise progress of work by the field team. Get daily updates on work items, activities, manpower & obstacles through Infra.Health’s integrated monitoring system.",
      image: "/images/journey/construction.jpg",
    },
    {
      key: "handover",
      label: "Audit & Handover",
      title: "Clean Project Closure & Handover",
      description:
        "Infra.Health captures all pending issues as a snaglist and tracks their closure. We record joint measurements and finalize billables to ensure a smooth and transparent project closure and handover.",
      image: "/images/journey/audit-handover.jpg",
    },
    {
      key: "operations",
      label: "Operations",
      title: "Seamless Healthcare Facility Operations",
      description:
        "Once your healthcare facility is operational, Infra.Health provides end-to-end support to ensure smooth, efficient, and compliant day-to-day functioning. Our operations service focuses on optimizing processes, maintaining quality standards, and enabling hassle-free management.",
      image: "/images/journey/operations.jpg",
    },
  ],
};
