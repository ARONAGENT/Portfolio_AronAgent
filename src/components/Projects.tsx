import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { ExternalLink } from "lucide-react";

const featured = [
  {
    icon: "🏨",
    title: "AirBnb-Style Hotel Booking Platform",
    description:
      "Enterprise hotel management platform handling 10,000+ hotels with dynamic pricing strategies. Features JWT authentication, RBAC, Stripe payment integration with webhooks, HotelMinPrice strategy for sub-15ms search across 900,000+ records, Redis caching for sub-2ms API responses, AI chatbot using RAG + pgvector cosine similarity, XP gamification with leaderboards, real-time WebSocket + STOMP communities, and a fully responsive React + TypeScript frontend.",
    tags: ["Spring Boot", "PostgreSQL", "Redis", "Stripe", "Spring AI", "WebSocket", "Docker", "JWT", "pgvector"],
    github: "https://github.com/ARONAGENT/AirBnb_App_SpringBoot",
  },
  {
    icon: "🎯",
    title: "Focus Forge — AI Study Platform",
    description:
      "Revolutionary educational platform transforming how students track progress and achieve goals. Features daily study activity tracking, AI-powered assistance via Spring AI, comprehensive analytics dashboard, personalized weekly reports with recommendations, goal tracking with achievement milestones, and intelligent reminders.",
    tags: ["Spring Boot", "Spring AI", "MySQL", "JWT", "REST API", "Analytics"],
    github: "https://github.com/ARONAGENT/Focus_Forge_Backend",
  },
  {
    icon: "🛒",
    title: "E-Commerce Microservices Platform",
    description:
      "Production-ready distributed microservices system with Netflix Eureka service discovery, Spring Cloud Gateway with JWT auth, OpenFeign inter-service communication, Resilience4J circuit breaker + retry patterns, Zipkin + Micrometer distributed tracing, ELK Stack centralized logging, and multi-environment support.",
    tags: ["Spring Boot", "Spring Cloud", "Eureka", "Kafka", "Docker", "Zipkin", "ELK Stack"],
    github: "https://github.com/ARONAGENT/Microservices_SpringBoot_E-Commerce",
  },
];

const springBootProjects = [
  {
    icon: "⚡",
    title: "Kafka Event-Driven Notification System",
    description: "Production-grade Kafka notification system with KRaft mode, Avro serialization, Confluent Schema Registry, and KafBat UI for real-time monitoring.",
    tags: ["Apache Kafka", "Spring Boot", "Avro", "Docker"],
    github: "https://github.com/ARONAGENT/Kafka-Driven-User-Notification-System",
  },
  {
    icon: "🔐",
    title: "Spring Security MAX",
    description: "Enterprise-grade security with JWT auth, OAuth2 social login, RBAC, token refresh flows, and custom Spring Security filter chain.",
    tags: ["Spring Security", "JWT", "OAuth2", "RBAC"],
    github: "https://github.com/ARONAGENT/Spring_Security_MAX",
  },
  {
    icon: "🧠",
    title: "Caching & Transaction Management",
    description: "Redis caching (@Cacheable/@CacheEvict) with all four isolation levels, optimistic/pessimistic locking. Cache hits: 250ms → 2ms.",
    tags: ["Redis", "PostgreSQL", "@Transactional", "ACID"],
    github: "https://github.com/ARONAGENT/Spring_Boot_Caching_And_Concurrent_Transactions",
  },
  {
    icon: "🚀",
    title: "Spring Boot Production Template",
    description: "Battle-tested starter template with Swagger UI, Spring Actuator, JPA Auditing, structured JSON logging, DevTools, and env-specific profiles.",
    tags: ["Swagger UI", "Actuator", "JPA Auditing", "DevTools"],
    github: "https://github.com/ARONAGENT/Spring-Boot-Ready-Features",
  },
  {
    icon: "🏫",
    title: "College JPA Mapping System",
    description: "All JPA relationship mapping strategies: @OneToOne, @OneToMany, @ManyToMany with cascade types, LAZY vs EAGER fetch, and bidirectional relationships.",
    tags: ["JPA", "Hibernate", "MySQL", "Entity Mapping"],
    github: "https://github.com/ARONAGENT/College_Management_System",
  },
  {
    icon: "🌐",
    title: "Spring MVC & REST API PRO",
    description: "Enterprise-level REST API implementation built with layered architecture, showcasing clean MVC design, DTO-based response structuring, and robust CRUD operations.",
    tags: ["Spring Web MVC", "Spring Data JPA", "Hibernate", "H2 Database", "Jakarta Validation", "Java 21", "Maven"],
    github: "https://github.com/ARONAGENT/Spring-MVC-Rest_API",
  },
];

const pythonProjects = [
  {
    icon: "🎬",
    title: "Django CRUD SQL",
    description: "Full-featured Django app for film management with dual database support (PostgreSQL + MySQL), class-based views, and Django admin.",
    tags: ["Django", "PostgreSQL", "MySQL", "MVT"],
    github: "https://github.com/ARONAGENT/Django-SQL-CRUD",
  },
  {
    icon: "👷",
    title: "Django CRUD MongoDB",
    description: "Django + MongoEngine ODM for NoSQL integration, dynamic document schemas, embedded documents, and schema-less flexibility.",
    tags: ["Django", "MongoDB", "MongoEngine", "NoSQL"],
    github: "https://github.com/ARONAGENT/Django-Mongo-CRUD",
  },
  {
    icon: "🌐",
    title: "Flask REST API — SQL & MongoDB",
    description: "Dual-version Flask REST API: SQLAlchemy ORM version + PyMongo version. RESTful conventions, Blueprint-based route organization.",
    tags: ["Flask", "SQLAlchemy", "PyMongo", "REST API"],
    github: "https://github.com/ARONAGENT/Flask_REST-SQL",
  },
  {
    icon: "🔄",
    title: "Flask-Django Integration",
    description: "Hybrid architecture embedding Flask within Django. Flask handles REST APIs while Django manages ORM, admin, and templating.",
    tags: ["Flask", "Django", "REST API", "Microservices"],
    github: "https://github.com/ARONAGENT/Flask-Django_Project",
  },
  {
    icon: "🚗",
    title: "Car Severity Prediction ML",
    description: "Django ML app predicting vehicle accident severity using Scikit-learn (Random Forest) with confidence scores: Minor, Major, Fatal.",
    tags: ["Django", "Scikit-learn", "Pandas", "Classification"],
    github: "https://github.com/ARONAGENT/Vehicles_Severity_ML_Model",
  },
  {
    icon: "📄",
    title: "AI-Powered Resume Builder",
    description: "Django app generating professional resumes via AI API. Structured form, photo upload, AI summaries, customizable templates, PDF export.",
    tags: ["Django", "AI API", "File Upload", "PDF"],
    github: "https://github.com/ARONAGENT/Resume_Building_Using_AI",
  },
];

const ProjectCard = ({ project, large = false }: { project: typeof featured[0]; large?: boolean }) => (
  <Tilt options={{ max: 15, scale: 1.02 }}>
    <div className={`glass rounded-xl glow-cyan-hover transition-all duration-300 hover:-translate-y-1 h-full flex flex-col ${large ? "p-8" : "p-6"}`}>
      <div className="flex items-start gap-3 mb-3">
        <span className={large ? "text-3xl" : "text-2xl"}>{project.icon}</span>
        <h3 className={`font-heading font-bold text-foreground ${large ? "text-xl" : "text-base"}`}>{project.title}</h3>
      </div>
      <p className={`text-muted-foreground leading-relaxed flex-1 ${large ? "text-sm" : "text-xs"}`}>
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags.map((tag) => (
          <span key={tag} className="skill-pill text-xs">{tag}</span>
        ))}
      </div>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-4 text-primary hover:underline text-sm"
      >
        <ExternalLink size={14} /> View on GitHub
      </a>
    </div>
  </Tilt>
);

const Projects = () => (
  <section id="projects" className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      {/* Featured */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading font-extrabold text-3xl md:text-4xl gradient-text text-center mb-16"
      >
        Featured Projects
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-24">
        {featured.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <ProjectCard project={p} large />
          </motion.div>
        ))}
      </div>

      {/* Spring Boot Projects */}
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-heading font-bold text-2xl text-foreground mb-8"
      >
        📦 More Projects — <span className="text-primary">Spring Boot</span>
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {springBootProjects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </div>

      {/* Python Projects */}
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-heading font-bold text-2xl text-foreground mb-8"
      >
        🐍 More Projects — <span className="text-secondary">Python</span>
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pythonProjects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;