// lib/seo-config.ts


  
  export const globalKeywords = [
    "Best Healthcare infrastructure service provider",
    "Medical planning & consulting",
    "Healthcare EPC solutions",
    "Hospital infrastructure",
    "Medical equipment provider",
    "Modular hospitals",
    "Healthcare consulting"
  ];
  
  export const siteConfig = {
    siteName: "Infra.Health",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://infra.health",
    defaultImage: "/og-image.jpg",
  };
  
  export const pageMetadata = {
    home: {
      title: "Infra.Health - Best Healthcare Infrastructure Service Provider",
      description: "Infra.Health is the best healthcare infrastructure service provider offering EPC solutions, medical equipment, and hospital planning.",
      keywords: [...globalKeywords, "Hospital planning", "Medical facilities"],
    },
    services: {
      title: "Healthcare Infrastructure Services",
      description: "Comprehensive healthcare infrastructure services including consulting, construction, and operations management.",
      keywords: [...globalKeywords, "Healthcare consulting", "EPC solutions", "Hospital operations"],
    },
    servicesConsult: {
      title: "Healthcare Consulting Services",
      description: "Infra.Health offers professional healthcare consulting services that precisely define infrastructure strategies, ensuring optimal planning and seamless implementation.",
      keywords: [...globalKeywords, "Healthcare consulting", "Infrastructure planning", "Medical consulting"],
    },
    servicesConstruct: {
      title: "Healthcare Construction & EPC Solutions",
      description: "Infra.Health transforms visionary healthcare infrastructure ideas into reality through end-to-end EPC solutions, modular hospitals, and custom-built medical facilities.",
      keywords: [...globalKeywords, "EPC solutions", "Modular hospitals", "Healthcare construction"],
    },
    servicesOperate: {
      title: "Healthcare Operations Management",
      description: "Infra.Health helps healthcare facilities operate at their best by integrating smart systems, advanced medical equipment, and efficient workflows that drive everyday excellence.",
      keywords: [...globalKeywords, "Hospital operations", "Smart healthcare systems", "Medical equipment integration"],
    },
    products: {
      title: "Medical Infrastructure Products",
      description: "Infra.Health provides smart, reliable, and patient-focused medical infrastructure - from modular operation theatres to hospital furniture and advanced critical care systems.",
      keywords: [...globalKeywords, "Modular operation theatres", "Hospital furniture", "Critical care systems", "Medical infrastructure"],
    },
    about: {
      title: "About Us - Best Healthcare Infrastructure Company",
      description: "Infra.Health is the best healthcare infrastructure company redefining how hospitals, medical cities, and ecosystems are conceived, financed, built, and operated.",
      keywords: [...globalKeywords, "Healthcare company", "Medical cities", "Hospital ecosystems"],
    },
    vendors: {
      title: "Vendor Partnerships",
      description: "At Infra.Health, we grow with our partners by providing open and honest procurement, strategic partnerships, and access to leading healthcare projects that help vendors expand, compliance and success.",
      keywords: [...globalKeywords, "Healthcare vendors", "Strategic partnerships", "Healthcare procurement"],
    },
    careers: {
      title: "Careers at Infra.Health - Join Our Team",
      description: "Passionate about shaping the future of healthcare? Explore exciting career opportunities at Infra.Health and share your CV with us. We look forward to connecting!",
      keywords: [...globalKeywords, "Healthcare careers", "Hospital jobs", "Healthcare opportunities"],
    },
  };