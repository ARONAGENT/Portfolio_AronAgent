import { useState, useEffect, useRef } from "react";
import { motion, useInView as useFramerInView } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

/* ─── PALETTE ─── */
const OLIVE_DEEP  = "#283618";
const OLIVE_MID   = "#3d4a22";
const OLIVE_SOFT  = "#606C38";
const AMBER       = "#BC6C25";
const AMBER_LT    = "#DDA15E";
const CREAM       = "#FEFAE0";

/* ─── DATA ─── */
const featured = [
  {
    num: "001", label: "Full Stack · AI · Backend",
    title: "AirBnb-Style Hotel Booking Platform",
    description: "Enterprise hotel management handling 10,000+ hotels with dynamic pricing. JWT auth, RBAC, Stripe + webhooks, HotelMinPrice strategy for sub-15ms search across 900K+ records, Redis sub-2ms responses, AI chatbot via RAG + pgvector cosine similarity, XP gamification with leaderboards, WebSocket + STOMP communities.",
    tags: ["Spring Boot","PostgreSQL","Redis","Stripe","Spring AI","pgvector","Docker","JWT"],
    github: "https://github.com/ARONAGENT/AirBnb_App_SpringBoot",
    accent: "#BC6C25",
    stat: { label: "Hotels Managed", value: "10K+" },
    stat2: { label: "Search Speed", value: "<15ms" },
  },
  {
    num: "002", label: "AI · Education · Analytics",
    title: "Focus Forge — AI Study Platform",
    description: "Transforms how students track progress and achieve goals. Spring AI assistance, comprehensive analytics dashboard, personalised weekly reports with recommendations, goal tracking with achievement milestones, and intelligent reminders.",
    tags: ["Spring Boot","Spring AI","MySQL","JWT","REST API","Analytics"],
    github: "https://github.com/ARONAGENT/Focus_Forge_Backend",
    accent: "#606C38",
    stat: { label: "AI Engine", value: "Spring AI" },
    stat2: { label: "Reports", value: "Weekly" },
  },
  {
    num: "003", label: "Microservices · Cloud · DevOps",
    title: "E-Commerce Microservices Platform",
    description: "Production-ready distributed system with Netflix Eureka service discovery, Spring Cloud Gateway with JWT auth, OpenFeign inter-service comms, Resilience4J circuit breaker, Zipkin + Micrometer distributed tracing, ELK Stack logging, multi-environment support.",
    tags: ["Spring Cloud","Eureka","Kafka","Docker","Zipkin","ELK Stack"],
    github: "https://github.com/ARONAGENT/Microservices_SpringBoot_E-Commerce",
    accent: "#DDA15E",
    stat: { label: "Architecture", value: "Distributed" },
    stat2: { label: "Tracing", value: "Zipkin" },
  },
];

const springBootProjects = [
  { num: "SB-01", title: "Kafka Event-Driven Notification System", description: "Production-grade Kafka notification system with KRaft mode, Avro serialization, Confluent Schema Registry, and KafBat UI for real-time monitoring.", tags: ["Apache Kafka","Spring Boot","Avro","Docker"], github: "https://github.com/ARONAGENT/Kafka-Driven-User-Notification-System" },
  { num: "SB-02", title: "Spring Security MAX", description: "Enterprise-grade security with JWT auth, OAuth2 social login, RBAC, token refresh flows, and custom Spring Security filter chain.", tags: ["Spring Security","JWT","OAuth2","RBAC"], github: "https://github.com/ARONAGENT/Spring_Security_MAX" },
  { num: "SB-03", title: "Caching & Transaction Management", description: "Redis caching with @Cacheable/@CacheEvict, all four isolation levels, optimistic/pessimistic locking. Cache hits: 250ms → 2ms.", tags: ["Redis","PostgreSQL","@Transactional","ACID"], github: "https://github.com/ARONAGENT/Spring_Boot_Caching_And_Concurrent_Transactions" },
  { num: "SB-04", title: "Spring Boot Production Template", description: "Battle-tested starter with Swagger UI, Spring Actuator, JPA Auditing, structured JSON logging, DevTools, and env-specific profiles.", tags: ["Swagger UI","Actuator","JPA Auditing","DevTools"], github: "https://github.com/ARONAGENT/Spring-Boot-Ready-Features" },
  { num: "SB-05", title: "College JPA Mapping System", description: "All JPA relationship mapping strategies: @OneToOne, @OneToMany, @ManyToMany with cascade types, LAZY vs EAGER fetch, and bidirectional relationships.", tags: ["JPA","Hibernate","MySQL","Entity Mapping"], github: "https://github.com/ARONAGENT/College_Management_System" },
  { num: "SB-06", title: "Spring MVC & REST API PRO", description: "Enterprise-level REST API with layered architecture, DTO-based response structuring, clean MVC design, and robust CRUD. Java 21 + Maven.", tags: ["Spring Web MVC","Hibernate","H2 Database","Java 21"], github: "https://github.com/ARONAGENT/Spring-MVC-Rest_API" },
];

const pythonProjects = [
  { num: "PY-01", title: "Django CRUD SQL", description: "Full-featured Django app for film management with dual DB support (PostgreSQL + MySQL), class-based views, and Django admin.", tags: ["Django","PostgreSQL","MySQL","MVT"], github: "https://github.com/ARONAGENT/Django-SQL-CRUD" },
  { num: "PY-02", title: "Django CRUD MongoDB", description: "Django + MongoEngine ODM for NoSQL integration, dynamic document schemas, embedded documents, schema-less flexibility.", tags: ["Django","MongoDB","MongoEngine","NoSQL"], github: "https://github.com/ARONAGENT/Django-Mongo-CRUD" },
  { num: "PY-03", title: "Flask REST API — SQL & MongoDB", description: "Dual-version Flask REST API: SQLAlchemy ORM version + PyMongo version. RESTful conventions, Blueprint-based route organisation.", tags: ["Flask","SQLAlchemy","PyMongo","REST API"], github: "https://github.com/ARONAGENT/Flask_REST-SQL" },
  { num: "PY-04", title: "Flask-Django Integration", description: "Hybrid architecture embedding Flask within Django. Flask handles REST APIs while Django manages ORM, admin, and templating.", tags: ["Flask","Django","REST API","Microservices"], github: "https://github.com/ARONAGENT/Flask-Django_Project" },
  { num: "PY-05", title: "Car Severity Prediction ML", description: "Django ML app predicting vehicle accident severity using Scikit-learn Random Forest with confidence scores: Minor, Major, Fatal.", tags: ["Django","Scikit-learn","Pandas","Classification"], github: "https://github.com/ARONAGENT/Vehicles_Severity_ML_Model" },
  { num: "PY-06", title: "AI-Powered Resume Builder", description: "Django app generating professional resumes via AI API. Structured form, photo upload, AI summaries, customisable templates, PDF export.", tags: ["Django","AI API","File Upload","PDF"], github: "https://github.com/ARONAGENT/Resume_Building_Using_AI" },
];

const MARQUEE_SB = ["Spring Boot","Microservices","REST APIs","AI Integration","Cloud Native","Docker","PostgreSQL","LangChain","Open Source","Backend Systems"];
const MARQUEE_PY = ["Python","Django","Flask","MongoDB","Scikit-learn","Pandas","NumPy","LangChain","FastAPI","ML Models","REST APIs","PostgreSQL"];

/* ─── INTERSECTION HOOK ─── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── FEATURED CARD ─── */
const FeaturedCard = ({ project, index }: { project: (typeof featured)[0]; index: number }) => {
  const { ref, inView } = useInView(0.06);
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22,1,0.36,1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#1a2210",
        border: `1.5px solid ${hovered ? project.accent + "88" : "rgba(254,250,224,0.07)"}`,
        borderRadius: "12px",
        padding: "32px 28px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        position: "relative", overflow: "hidden", cursor: "pointer",
        transition: "border-color 0.3s, transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px ${project.accent}22` : "0 4px 20px rgba(0,0,0,0.25)",
      }}
    >
      {/* Top accent band */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${project.accent}, ${project.accent}44)` }} />
      {/* Ghost number */}
      <span style={{ position: "absolute", bottom: "-14px", right: "16px", fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "100px", color: "rgba(254,250,224,0.025)", letterSpacing: "-0.06em", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>{project.num}</span>
      {/* Left bar */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: hovered ? "100%" : "40px", background: project.accent, transition: "height 0.45s cubic-bezier(.22,1,.36,1)" }} />

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: project.accent, fontWeight: 500 }}>{project.num}</span>
          <span style={{ width: "1px", height: "12px", background: "rgba(254,250,224,0.15)", display: "inline-block" }} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(254,250,224,0.35)" }}>{project.label}</span>
        </div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "clamp(17px,2vw,22px)", color: "#FEFAE0", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: "12px" }}>{project.title}</h2>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "13px", color: "rgba(254,250,224,0.48)", lineHeight: 1.75, marginBottom: "18px" }}>{project.description}</p>
        <div style={{ display: "flex", gap: "16px", marginBottom: "18px", flexWrap: "wrap" as const }}>
          {[project.stat, project.stat2].map(s => (
            <div key={s.label} style={{ padding: "8px 16px", border: "1px solid rgba(254,250,224,0.08)", borderRadius: "6px", background: "rgba(254,250,224,0.03)" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "18px", color: project.accent, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "3px" }}>{s.value}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(254,250,224,0.3)" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "5px", marginBottom: "20px" }}>
          {project.tags.map(t => (
            <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", letterSpacing: "0.06em", textTransform: "uppercase" as const, padding: "3px 10px", borderRadius: "3px", border: `1px solid ${project.accent}44`, color: project.accent, background: `${project.accent}10` }}>{t}</span>
          ))}
        </div>
      </div>

      <a href={project.github} target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: project.accent, textDecoration: "none", paddingBottom: "2px", borderBottom: `1px solid ${project.accent}44`, width: "fit-content", transition: "border-color 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = project.accent)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = `${project.accent}44`)}
      >
        <Github size={12} /> View on GitHub <ArrowUpRight size={12} />
      </a>
    </motion.div>
  );
};

/* ─── SMALL CARD ─── */
const SmallCard = ({ project, index, dark = false }: { project: (typeof springBootProjects)[0]; index: number; dark?: boolean }) => {
  const { ref, inView } = useInView(0.05);
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.07, ease: [0.22,1,0.36,1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: dark ? (hovered ? "#2e3e1a" : "#243214") : (hovered ? "#fff" : "#F7F2DC"),
        border: dark ? `1.5px solid rgba(254,250,224,${hovered?"0.12":"0.06"})` : `1.5px solid rgba(96,108,56,${hovered?"0.28":"0.14"})`,
        borderRadius: "10px",
        padding: "24px 22px",
        display: "flex", flexDirection: "column", position: "relative", overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? (dark ? "0 14px 40px rgba(0,0,0,0.3)" : "0 12px 36px rgba(40,54,24,0.1)") : "none",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: hovered ? "100%" : "0%", background: AMBER, transition: "height 0.35s cubic-bezier(.22,1,.36,1)", borderRadius: "0 0 3px 0" }} />
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: dark ? "rgba(254,250,224,0.3)" : "rgba(96,108,56,0.5)", marginBottom: "10px" }}>{project.num}</div>
      <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "15px", color: dark ? "#FEFAE0" : OLIVE_DEEP, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "8px" }}>{project.title}</h3>
      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "12px", color: dark ? "rgba(254,250,224,0.48)" : OLIVE_MID, lineHeight: 1.7, marginBottom: "14px", flex: 1, opacity: 0.9 }}>{project.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "5px", marginBottom: "14px" }}>
        {project.tags.map(t => (
          <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "8.5px", letterSpacing: "0.05em", textTransform: "uppercase" as const, padding: "3px 8px", borderRadius: "2px", border: dark ? "1px solid rgba(221,161,94,0.22)" : "1px solid rgba(96,108,56,0.22)", color: dark ? AMBER_LT : OLIVE_SOFT, background: dark ? "rgba(221,161,94,0.06)" : "rgba(96,108,56,0.06)" }}>{t}</span>
        ))}
      </div>
      <a href={project.github} target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontFamily: "'JetBrains Mono',monospace", fontSize: "9.5px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: dark ? AMBER_LT : AMBER, textDecoration: "none", width: "fit-content", transition: "opacity 0.2s", opacity: 0.85 }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}
      >
        <Github size={11} /> GitHub <ArrowUpRight size={11} />
      </a>
    </motion.div>
  );
};

/* ─── MAIN ─── */
const Projects = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useFramerInView(heroRef, { once: true, margin: "0px 0px -60px 0px" });
  const { ref: sbRef, inView: sbInView } = useInView(0.05);
  const { ref: pyRef, inView: pyInView } = useInView(0.05);
  const { ref: ctaRef, inView: ctaInView } = useInView(0.1);

  return (
    <div id="projects" style={{ background: CREAM, minHeight: "100vh", overflowX: "hidden" }}>

      {/* ══════════════════════════════════════
          SECTION LABEL BAR — Section 03
      ══════════════════════════════════════ */}
      <div style={{ background: OLIVE_DEEP, padding: "10px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.18em", color: CREAM, textTransform: "uppercase" as const, opacity: 0.7 }}>✦ Section 03</span>
        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "11px", letterSpacing: "0.14em", color: AMBER_LT, textTransform: "uppercase" as const }}>Projects</span>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.18em", color: CREAM, textTransform: "uppercase" as const, opacity: 0.7 }}>Selected Work ✦</span>
      </div>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <div ref={heroRef} style={{ maxWidth: "1280px", margin: "0 auto", padding: "72px 40px 56px", position: "relative", overflow: "hidden" }}>
        {/* Decorative shapes */}
        <div aria-hidden style={{ position: "absolute", top: "-100px", right: "-120px", width: "460px", height: "460px", borderRadius: "50%", background: AMBER_LT, opacity: 0.1, pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", bottom: "0", left: "60px", width: "140px", height: "140px", borderRadius: "50%", border: `2px solid ${AMBER}`, opacity: 0.13, pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", width: "56px", height: "56px", border: `2px solid ${OLIVE_SOFT}`, borderRadius: "8px", transform: "rotate(22deg)", top: "100px", right: "400px", opacity: 0.12, pointerEvents: "none" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "40px", alignItems: "start" }}>
          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
          >
            {/* Ghost watermark */}
            <span aria-hidden style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "clamp(80px,14vw,160px)", color: "rgba(96,108,56,0.045)", lineHeight: 1, letterSpacing: "-0.04em", position: "absolute", top: "44px", left: "32px", userSelect: "none" as const, pointerEvents: "none" }}>WORK</span>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: AMBER, flexShrink: 0, display: "inline-block" }} />
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "0.13em", color: AMBER, textTransform: "uppercase" as const }}>Section 03 · Selected Work</span>
            </div>

            <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "clamp(52px,8vw,88px)", lineHeight: 0.92, letterSpacing: "-0.04em", color: OLIVE_DEEP, margin: "0 0 6px" }}>My</h1>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "clamp(52px,8vw,88px)", lineHeight: 0.92, letterSpacing: "-0.04em", color: AMBER, margin: "0 0 28px" }}>Projects.</h1>

            <div style={{ borderLeft: `4px solid ${AMBER_LT}`, paddingLeft: "20px", marginBottom: "32px", maxWidth: "420px" }}>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", lineHeight: 1.8, color: OLIVE_MID, margin: 0 }}>
                Backend systems that scale, AI integrations that matter, and architectures built to last — 15+ repos across Java and Python.
              </p>
            </div>
          </motion.div>

          {/* Right — stats box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.22,1,0.36,1] }}
            style={{ flexShrink: 0 }}
            className="hero-stats-hide"
          >
            <div style={{ background: "#fff", border: `1.5px solid rgba(96,108,56,0.18)`, borderRadius: "16px", padding: "28px 24px", width: "220px", boxShadow: "0 8px 32px rgba(40,54,24,0.08)" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: OLIVE_SOFT, opacity: 0.6, marginBottom: "18px" }}>Portfolio Stats</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 10px", marginBottom: "22px" }}>
                {[
                  { v: "15+", l: "Projects",    c: AMBER },
                  { v: "3",   l: "Featured",    c: AMBER },
                  { v: "6",   l: "Spring Boot", c: OLIVE_DEEP },
                  { v: "6",   l: "Python",      c: OLIVE_SOFT },
                ].map(({ v, l, c }) => (
                  <div key={l} style={{ textAlign: "center" as const }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "28px", color: c, letterSpacing: "-0.05em", lineHeight: 1, marginBottom: "3px" }}>{v}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: OLIVE_MID, opacity: 0.6 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ height: "1px", background: "rgba(96,108,56,0.12)", marginBottom: "16px" }} />
              {/* Available badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4CAF50", display: "inline-block", animation: "pulse 1.5s infinite" }} />
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: OLIVE_MID, letterSpacing: "0.04em" }}>
                  <strong style={{ color: AMBER }}>Open</strong> to opportunities
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SPRING BOOT MARQUEE
      ══════════════════════════════════════ */}
      <div style={{ background: OLIVE_DEEP, overflow: "hidden", padding: "11px 0", marginBottom: "48px" }}>
        <div style={{ display: "flex", whiteSpace: "nowrap" as const, animation: "marquee-fwd 22s linear infinite" }}>
          {[...MARQUEE_SB, ...MARQUEE_SB].map((item, i) => (
            <span key={i} style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 500, fontSize: "11px", color: "rgba(254,250,224,0.65)", letterSpacing: "0.12em", textTransform: "uppercase" as const, padding: "0 28px" }}>
              <span style={{ color: AMBER_LT, marginRight: "8px", fontSize: "13px" }}>✦</span>{item}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          FEATURED SECTION LABEL
      ══════════════════════════════════════ */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px", marginBottom: "28px", display: "flex", alignItems: "center", gap: "14px" }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: OLIVE_SOFT, whiteSpace: "nowrap" as const }}>Featured Projects</span>
        <div style={{ flex: 1, height: "1px", background: "rgba(96,108,56,0.18)" }} />
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(96,108,56,0.4)" }}>03</span>
      </div>

      {/* ══════════════════════════════════════
          FEATURED GRID
      ══════════════════════════════════════ */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px 72px" }} className="feat-grid-wrap">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px" }} className="feat-grid">
          {featured.map((p, i) => <FeaturedCard key={p.num} project={p} index={i} />)}
        </div>
      </div>

      {/* ══════════════════════════════════════
          SPRING BOOT SECTION
      ══════════════════════════════════════ */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
        <motion.div
          ref={sbRef}
          initial={{ opacity: 0, y: 20 }} animate={sbInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "32px", paddingBottom: "22px", borderBottom: "1px solid rgba(96,108,56,0.15)" }}
        >
          <div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: OLIVE_SOFT, marginBottom: "7px" }}>Spring Boot</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "clamp(26px,4vw,42px)", color: OLIVE_DEEP, letterSpacing: "-0.04em", lineHeight: 0.95, margin: 0 }}>
              More <span style={{ color: AMBER }}>Work.</span>
            </h2>
          </div>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "72px", color: "rgba(40,54,24,0.06)", letterSpacing: "-0.06em", lineHeight: 1, userSelect: "none" as const }}>06</span>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "0" }} className="small-grid">
          {springBootProjects.map((p, i) => <SmallCard key={p.num} project={p} index={i} dark={false} />)}
        </div>
      </div>

      {/* ══════════════════════════════════════
          PYTHON MARQUEE — opposite direction
      ══════════════════════════════════════ */}
      <div style={{ background: OLIVE_SOFT, overflow: "hidden", padding: "11px 0", margin: "56px 0 0" }}>
        <div style={{ display: "flex", whiteSpace: "nowrap" as const, animation: "marquee-rev 20s linear infinite" }}>
          {[...MARQUEE_PY, ...MARQUEE_PY].map((item, i) => (
            <span key={i} style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 500, fontSize: "11px", color: "rgba(254,250,224,0.78)", letterSpacing: "0.14em", textTransform: "uppercase" as const, padding: "0 28px" }}>
              <span style={{ color: AMBER_LT, marginRight: "8px", fontSize: "13px" }}>✦</span>{item}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          PYTHON SECTION
      ══════════════════════════════════════ */}
      <section style={{ background: OLIVE_DEEP, padding: "64px 40px", position: "relative", overflow: "hidden" }}>
        <span aria-hidden style={{ position: "absolute", right: "-50px", top: "50%", transform: "translateY(-50%) rotate(90deg)", fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "120px", color: "rgba(254,250,224,0.03)", letterSpacing: "-0.04em", pointerEvents: "none", userSelect: "none" as const }}>PYTHON</span>

        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <motion.div
            ref={pyRef}
            initial={{ opacity: 0, y: 20 }} animate={pyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "36px", paddingBottom: "22px", borderBottom: "1px solid rgba(254,250,224,0.08)" }}
          >
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(254,250,224,0.32)", marginBottom: "7px" }}>Python · Django · Flask · ML</div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "clamp(26px,4vw,42px)", color: "#FEFAE0", letterSpacing: "-0.04em", lineHeight: 0.95, margin: 0 }}>
                Python <span style={{ color: AMBER_LT }}>Projects.</span>
              </h2>
            </div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "72px", color: "rgba(254,250,224,0.04)", letterSpacing: "-0.06em", lineHeight: 1, userSelect: "none" as const }}>06</span>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px" }} className="small-grid">
            {pythonProjects.map((p, i) => <SmallCard key={p.num} project={p} index={i} dark={true} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════ */}
      <section style={{ padding: "80px 40px", textAlign: "center" as const, background: CREAM }}>
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 28 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
          style={{ maxWidth: "520px", margin: "0 auto" }}
        >
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: OLIVE_SOFT, marginBottom: "14px" }}>Like what you see?</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "clamp(36px,5.5vw,56px)", color: OLIVE_DEEP, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: "14px" }}>
            Let's Build<br /><span style={{ color: AMBER }}>Something.</span>
          </h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: OLIVE_MID, lineHeight: 1.7, marginBottom: "30px", opacity: 0.8 }}>
            Open to backend roles, freelance projects, and open-source collaborations.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" as const }}>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase" as const, color: CREAM, background: OLIVE_DEEP, border: `2px solid ${OLIVE_DEEP}`, padding: "13px 28px", borderRadius: "4px", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = AMBER; e.currentTarget.style.borderColor = AMBER; }}
              onMouseLeave={e => { e.currentTarget.style.background = OLIVE_DEEP; e.currentTarget.style.borderColor = OLIVE_DEEP; }}
            >Get In Touch →</button>
            <a href="https://github.com/ARONAGENT" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase" as const, color: OLIVE_DEEP, background: "transparent", border: `2px solid rgba(40,54,24,0.28)`, padding: "13px 28px", borderRadius: "4px", cursor: "pointer", transition: "all 0.2s", textDecoration: "none", display: "inline-block" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = AMBER; e.currentTarget.style.color = AMBER; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(40,54,24,0.28)"; e.currentTarget.style.color = OLIVE_DEEP; }}
            >View GitHub</a>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          KEYFRAMES + RESPONSIVE
      ══════════════════════════════════════ */}
      <style>{`
        @keyframes marquee-fwd {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-rev {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.82); }
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .feat-grid { grid-template-columns: 1fr 1fr !important; }
          .small-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 700px) {
          .feat-grid { grid-template-columns: 1fr !important; }
          .small-grid { grid-template-columns: 1fr !important; }
          .hero-stats-hide { display: none !important; }
        }
        @media (max-width: 480px) {
          .feat-grid-wrap { padding: 0 16px 48px !important; }
        }
      `}</style>
    </div>
  );
};

export default Projects;