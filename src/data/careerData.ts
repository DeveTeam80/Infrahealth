export interface CareerItem {
  sr: number;
  designation: string;
  project: string;
  openings: number;
  qualification: string;
  exp: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  reviews: string[];
}

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How can I apply?",
    answer:
      "You can apply directly through our official website. You may also reach out via LinkedIn or Instagram to learn about current openings.",
  },
  {
    id: 2,
    question: "What is the hiring process?",
    answer:
      "Our process includes application screening, shortlisting, interview rounds, role-specific assignments (if required), and finally, the onboarding process.",
  },
  {
    id: 3,
    question: "Can I apply for multiple positions?",
    answer:
      "We encourage you to apply for the role that best matches your skills and aspirations, as applications are accepted for one position at a time.",
  },
  {
    id: 4,
    question: "When will I hear back after applying?",
    answer:
      "Once your application is reviewed and found aligned with the role requirements, our recruitment team will connect with you at the earliest.",
  },
];

export const careerData: CareerItem[] = [
  {
    sr: 1,
    designation: "EPC Head",
    project: "-",
    openings: 1,
    qualification: "BE/ME Civil Engineering",
    exp: "20+ Years",
  },
  {
    sr: 2,
    designation: "Project Engineer",
    project: "-",
    openings: 1,
    qualification: "BE/ME Civil Engineering",
    exp: "4+ Years",
  },
  {
    sr: 3,
    designation: "MEP Engineer",
    project: "-",
    openings: 1,
    qualification: "BE/ME Electrical",
    exp: "6+ Years",
  },
  {
    sr: 4,
    designation: "Store Keeper",
    project: "-",
    openings: 1,
    qualification: "Any Graduate",
    exp: "8+ Years",
  },
  {
    sr: 5,
    designation: "Project Engineer",
    project: "-",
    openings: 1,
    qualification: "BE/ME Civil Engineering",
    exp: "4+ Years",
  },
  {
    sr: 6,
    designation: "Safety Officer",
    project: "-",
    openings: 1,
    qualification: "Diploma HSE",
    exp: "6+ Years",
  },
  {
    sr: 7,
    designation: "MEP Engineer",
    project: "-",
    openings: 1,
    qualification: "BE/ME Electrical",
    exp: "6+ Years",
  },
  {
    sr: 8,
    designation: "Store Keeper",
    project: "-",
    openings: 1,
    qualification: "Any Graduate",
    exp: "8+ Years",
  },
  {
    sr: 9,
    designation: "MEP Design Coordinator - Plumbing & FF",
    project: "-",
    openings: 1,
    qualification: "BE/ME Civil Engineering",
    exp: "10 Years",
  },
  {
    sr: 10,
    designation: "Sr. Estimation Engineer",
    project: "-",
    openings: 1,
    qualification: "BE/ME Civil Engineering",
    exp: "10 Years",
  },
  {
    sr: 11,
    designation: "Executive Assistant",
    project: "-",
    openings: 1,
    qualification: "MBA",
    exp: "5 Years",
  },
  {
    sr: 12,
    designation: "Procurement Manager - HO",
    project: "-",
    openings: 1,
    qualification: "BE/ME Civil Engineering",
    exp: "11+ Years",
  },
  {
    sr: 13,
    designation: "Sr. Estimation Engineer",
    project: "-",
    openings: 1,
    qualification: "BE/ME Civil Engineering",
    exp: "8 to 10 Years",
  },
  {
    sr: 14,
    designation: "Legal Advisor",
    project: "-",
    openings: 1,
    qualification: "LLB/LLM",
    exp: "5 Years",
  },
  {
    sr: 15,
    designation: "Biomedical Engineer",
    project: "-",
    openings: 1,
    qualification: "Biomedical Engineering",
    exp: "5 to 6 Years",
  },
  {
    sr: 16,
    designation: "Sr. Architect",
    project: "-",
    openings: 1,
    qualification: "B. Arch / NICMAR - Construction Management",
    exp: "6 to 8 Years",
  },
  {
    sr: 17,
    designation: "Mid Architect",
    project: "-",
    openings: 1,
    qualification: "B. Arch",
    exp: "3 to 6 Years",
  },
  {
    sr: 18,
    designation: "Jr. Architect",
    project: "-",
    openings: 1,
    qualification: "B. Arch",
    exp: "2 to 5 Years",
  },
  {
    sr: 19,
    designation: "Sales & Business Development Head",
    project: "-",
    openings: 1,
    qualification: "MBA Marketing",
    exp: "10+ Years",
  },
  {
    sr: 20,
    designation: "Sales Executive",
    project: "-",
    openings: 2,
    qualification: "MBA Marketing",
    exp: "2 to 5 Years",
  },
  {
    sr: 21,
    designation: "Sr. Digital Marketing Executive",
    project: "-",
    openings: 1,
    qualification: "MBA Marketing",
    exp: "5 to 8 Years",
  },
  {
    sr: 22,
    designation: "Events Coordinator",
    project: "-",
    openings: 1,
    qualification: "MBA Marketing",
    exp: "2 to 5 Years",
  },
  {
    sr: 23,
    designation: "Driver",
    project: "-",
    openings: 1,
    qualification: "12th Pass",
    exp: "2 to 5 Years",
  },
  {
    sr: 24,
    designation: "CFO",
    project: "-",
    openings: 1,
    qualification: "C.A.",
    exp: "10+ Years",
  },
  {
    sr: 25,
    designation: "Sr. Accountant",
    project: "-",
    openings: 1,
    qualification: "B. Com",
    exp: "5 to 7 Years",
  },
  {
    sr: 26,
    designation: "Project Engineer",
    project: "-",
    openings: 1,
    qualification: "BE/ME Civil Engineering",
    exp: "5 to 7 Years",
  },
  {
    sr: 27,
    designation: "MEPF - Mechanical Design Engineer",
    project: "-",
    openings: 1,
    qualification: "BE/ME Mechanical Engineering",
    exp: "5 to 7 Years",
  },
  {
    sr: 28,
    designation: "MEPF - Electrical Design Engineer",
    project: "-",
    openings: 1,
    qualification: "BE/ME Electrical Engineering",
    exp: "5 to 7 Years",
  },
  {
    sr: 29,
    designation: "Plumbing Engineer",
    project: "-",
    openings: 1,
    qualification: "BE/ME Civil Engineering",
    exp: "5 to 7 Years",
  },
  {
    sr: 30,
    designation: "Quantity Surveyor",
    project: "-",
    openings: 1,
    qualification: "BE/ME Civil Engineering",
    exp: "5 to 7 Years",
  },
  {
    sr: 31,
    designation: "Estimation & Billing Engineer",
    project: "-",
    openings: 1,
    qualification: "BE/ME Civil Engineering",
    exp: "5 to 7 Years",
  },
];


export const testimonials: Testimonial[] = [
  {
    name: "Aditi Sharma",
    role: "Project Manager",
    reviews: [
      "Infra.Health gives me the freedom to take ownership of projects while still feeling fully supported by my team.",
      "The collaborative culture here truly makes every challenge feel like a shared goal."
    ],
  },
  {
    name: "Rohit Mehta",
    role: "Healthcare Architect",
    reviews: [
      "Working here has allowed me to design solutions that directly impact hospitals and patient care across India.",
      "The organization encourages innovation, and my ideas are always welcomed and valued."
    ],
  },
  {
    name: "Sneha Iyer",
    role: "HR Specialist",
    reviews: [
      "I’ve seen firsthand how Infra.Health invests in its people, from career development to employee well-being.",
      "It’s rewarding to work in a company where people are truly the priority."
    ],
  },
  {
    name: "Arjun Patel",
    role: "Software Engineer",
    reviews: [
      "The exposure to cutting-edge technology in healthcare has been an incredible learning experience.",
      "Managers here genuinely care about our growth and encourage us to upskill constantly."
    ],
  },
  {
    name: "Fatima Khan",
    role: "Operations Lead",
    reviews: [
      "Infra.Health maintains a perfect balance between professionalism and warmth in its work culture.",
      "Every day, I feel proud knowing that our work contributes to building better healthcare infrastructure."
    ],
  },
];
