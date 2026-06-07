import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AMBER  = "#BC6C25";
const AMBER2 = "#DDA15E";
const CREAM  = "#FEFAE0";

const ALL_BLOGS = [
  {
    slug: "microservices",
    num: "01",
    label: "Architecture",
    title: "Building an E-Commerce Microservices Platform",
    teaser: "Production-ready distributed system — Spring Cloud, Eureka, API Gateway, Circuit Breaker, full observability.",
    tags: ["Spring Cloud", "Microservices", "Docker", "ELK Stack"],
    readTime: "15 min",
    accent: AMBER,
    accentDim: "rgba(188,108,37,0.12)",
  },
  {
    slug: "docker",
    num: "02",
    label: "DevOps",
    title: "Mastering Docker with Spring Boot",
    teaser: "Docker fundamentals to containerizing Spring Boot + PostgreSQL with Docker Compose — 22 hands-on screenshots.",
    tags: ["Docker", "Spring Boot", "PostgreSQL", "DevOps"],
    readTime: "12 min",
    accent: "#4A9ECC",
    accentDim: "rgba(74,158,204,0.12)",
  },
  {
    slug: "kafka",
    num: "03",
    label: "Event-Driven",
    title: "Apache Kafka with Spring Boot",
    teaser: "Producer-consumer to Avro + Confluent Schema Registry — build real event-driven notification systems.",
    tags: ["Kafka", "Spring Boot", "Avro", "Schema Registry"],
    readTime: "18 min",
    accent: AMBER2,
    accentDim: "rgba(221,161,94,0.12)",
  },
  {
    slug: "spring-security",
    num: "04",
    label: "Security",
    title: "Spring Security Complete Guide",
    teaser: "JWT auth, Google OAuth2, RBAC, token refresh, and custom filter chains — production-ready security.",
    tags: ["Spring Security", "JWT", "OAuth2", "RBAC"],
    readTime: "22 min",
    accent: "#7EBF8E",
    accentDim: "rgba(126,191,142,0.12)",
  },
  {
    slug: "spring-ai",
    num: "05",
    label: "AI/ML",
    title: "Spring AI — Building Intelligent Java Apps",
    teaser: "Integrate OpenAI, build RAG pipelines with pgvector, and deploy AI-powered Spring Boot services to production.",
    tags: ["Spring AI", "OpenAI", "RAG", "pgvector"],
    readTime: "20 min",
    accent: "#A47BD5",
    accentDim: "rgba(164,123,213,0.12)",
  },
  {
    slug: "caching",
    num: "06",
    label: "Performance",
    title: "Redis Caching Strategies in Spring Boot",
    teaser: "Cache-aside, write-through, TTL tuning, cache eviction policies, and distributed caching patterns at scale.",
    tags: ["Redis", "Caching", "Spring Boot", "Performance"],
    readTime: "14 min",
    accent: "#E05C4B",
    accentDim: "rgba(224,92,75,0.12)",
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=JetBrains+Mono:wght@400;500&family=DM+Sans:wght@400;500&display=swap');

  .blogs-page {
    background: #0C1208;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  .blogs-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .blogs-hero {
    position: relative;
    border-bottom: 1px solid rgba(254,250,224,0.07);
    overflow: hidden;
    padding: 100px 56px 64px;
  }

  .blogs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  .blog-full-card {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.3s, transform 0.32s cubic-bezier(.22,1,.36,1), box-shadow 0.32s;
    text-decoration: none;
    display: flex;
    flex-direction: column;
  }

  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  .card-shimmer {
    height: 2px;
    background-size: 200% auto;
    animation: shimmer 3.5s linear infinite;
    flex-shrink: 0;
  }

  @media (max-width: 1024px) {
    .blogs-hero { padding: 80px 32px 56px; }
    .blogs-content-pad { padding: 40px 32px 100px; }
    .blogs-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 768px) {
    .blogs-hero { padding: 72px 20px 48px; }
    .blogs-content-pad { padding: 32px 20px 80px; }
  }

  @media (max-width: 540px) {
    .blogs-hero { padding: 64px 16px 40px; }
    .blogs-content-pad { padding: 24px 16px 80px; }
    .blogs-grid { grid-template-columns: 1fr; gap: 12px; }
    .blogs-ghost-text { display: none !important; }
    .blogs-back-link { font-size: 9px !important; padding: 6px 12px !important; }
  }
`;

const Star4 = ({ size = 14, color = AMBER, opacity = 1 }: { size?: number; color?: string; opacity?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ opacity, flexShrink: 0 }}>
    <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill={color} />
  </svg>
);

const BlogFullCard = ({ blog, index }: { blog: typeof ALL_BLOGS[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: "100%" }}
    >
      <Link
        to={`/blogs/${blog.slug}`}
        className="blog-full-card"
        style={{
          background: hovered
            ? `linear-gradient(145deg, #1d1b12 0%, #1a1710 100%)`
            : `linear-gradient(145deg, #121009 0%, #181610 100%)`,
          border: `1px solid ${hovered ? blog.accent + "55" : "rgba(254,250,224,0.07)"}`,
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered
            ? `0 24px 52px rgba(0,0,0,0.55), 0 0 0 1px ${blog.accent}1a`
            : "0 2px 14px rgba(0,0,0,0.35)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Shimmer top line */}
        <div className="card-shimmer" style={{
          backgroundImage: `linear-gradient(90deg, ${blog.accent}00 0%, ${blog.accent} 40%, ${blog.accent} 60%, ${blog.accent}00 100%)`,
        }} />

        {/* Inner glow */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 60,
          background: `radial-gradient(ellipse at 50% 0%, ${blog.accent}0b, transparent 70%)`,
          pointerEvents: "none",
        }} />

        {/* Left accent bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, width: "3px",
          height: hovered ? "100%" : "40px",
          background: `linear-gradient(180deg, ${blog.accent}, ${blog.accent}44)`,
          borderRadius: "0 0 3px 0",
          transition: "height 0.45s cubic-bezier(.22,1,.36,1)",
        }} />

        {/* Ghost number */}
        <span className="blogs-ghost-text" style={{
          position: "absolute", bottom: "-10px", right: "12px",
          fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "88px",
          color: "rgba(254,250,224,0.025)", letterSpacing: "-0.06em",
          lineHeight: 1, userSelect: "none", pointerEvents: "none",
        }}>{blog.num}</span>

        <div style={{ padding: "22px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <Star4 size={9} color={blog.accent} opacity={0.9} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.16em",
                textTransform: "uppercase", color: blog.accent, opacity: 0.85,
              }}>
                {blog.num} — {blog.label}
              </span>
            </div>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
              color: "rgba(254,250,224,0.22)", border: "1px solid rgba(254,250,224,0.09)",
              borderRadius: "99px", padding: "3px 10px", whiteSpace: "nowrap",
            }}>
              {blog.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(13px,1.4vw,16px)",
            color: "#FEFAE0", lineHeight: 1.25, letterSpacing: "-0.025em", marginBottom: "10px",
          }}>
            {blog.title}
          </h3>

          {/* Teaser */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
            color: "rgba(254,250,224,0.4)", lineHeight: 1.75, marginBottom: "16px",
            display: "-webkit-box", WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical", overflow: "hidden", flex: 1,
          }}>
            {blog.teaser}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "18px" }}>
            {blog.tags.map(t => (
              <span key={t} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "8px",
                letterSpacing: "0.07em", textTransform: "uppercase", padding: "3px 8px",
                borderRadius: "2px", border: `1px solid ${blog.accent}38`,
                color: blog.accent, background: blog.accentDim,
              }}>
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.14em",
              textTransform: "uppercase", color: blog.accent,
              paddingBottom: "2px", borderBottom: `1px solid ${blog.accent}40`,
            }}>
              View Article <ArrowUpRight size={11} />
            </span>
            <div style={{
              width: 12, height: 12,
              borderRight: `2px solid ${blog.accent}44`,
              borderBottom: `2px solid ${blog.accent}44`,
              borderRadius: "0 0 3px 0",
            }} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Blogs = () => (
  <div className="blogs-page">
    <style>{styles}</style>

    {/* Noise overlay */}
    <div aria-hidden style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
      opacity: 0.4,
    }} />

    {/* BG orbs */}
    <div aria-hidden style={{ position: "fixed", top: -100, left: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,124,89,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
    <div aria-hidden style={{ position: "fixed", bottom: -80, right: -80, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(188,108,37,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

    <Navbar />

    {/* ── Hero ── */}
    <div className="blogs-hero" style={{ position: "relative", zIndex: 1 }}>
      {/* Dot grid */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(254,250,224,0.05) 1px, transparent 1px)",
        backgroundSize: "26px 26px", pointerEvents: "none",
        maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
      }} />

      {/* Ghost text */}
      <div className="blogs-ghost-text" aria-hidden style={{
        position: "absolute", bottom: -20, right: -10,
        fontFamily: "'Syne', sans-serif", fontWeight: 900,
        fontSize: "clamp(80px,14vw,160px)", color: "rgba(254,250,224,0.018)",
        letterSpacing: "-0.06em", lineHeight: 1, userSelect: "none", pointerEvents: "none", whiteSpace: "nowrap",
      }}>BLOG</div>

      <div className="blogs-inner" style={{ position: "relative", zIndex: 1 }}>
        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: "36px" }}>
          <Link to="/" className="blogs-back-link"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(254,250,224,0.35)", textDecoration: "none",
              border: "1px solid rgba(254,250,224,0.07)", padding: "7px 14px", borderRadius: "3px",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = AMBER; e.currentTarget.style.borderColor = `${AMBER}88`; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(254,250,224,0.35)"; e.currentTarget.style.borderColor = "rgba(254,250,224,0.07)"; }}
          >
            ← Back to Portfolio
          </Link>
        </motion.div>

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: 32, height: 2, background: AMBER, opacity: 0.6 }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: AMBER, opacity: 0.85 }}>
              Tech Writing
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "20px", flexWrap: "wrap", marginBottom: "16px" }}>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(32px,6vw,72px)", lineHeight: 0.9, letterSpacing: "-0.045em", color: CREAM, margin: 0 }}>All</h1>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(32px,6vw,72px)", lineHeight: 0.9, letterSpacing: "-0.045em", color: "transparent", WebkitTextStroke: `2.5px ${AMBER}`, margin: 0 }}>Articles</h1>
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} style={{ marginBottom: "8px" }}>
              <Star4 size={28} color={AMBER} opacity={0.7} />
            </motion.div>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(254,250,224,0.4)", lineHeight: 1.65, maxWidth: "420px", borderLeft: `2px solid ${AMBER}`, paddingLeft: "12px" }}>
            {ALL_BLOGS.length} in-depth articles on backend engineering, distributed systems, security, and AI — all free to read.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.55 }}
          style={{ display: "flex", gap: 0, marginTop: "28px", width: "fit-content", border: "1px solid rgba(254,250,224,0.07)", borderRadius: "6px", overflow: "hidden" }}>
          {[
            { n: `${ALL_BLOGS.length}`, l: "Articles" },
            { n: `${ALL_BLOGS.reduce((acc, b) => acc + parseInt(b.readTime), 0)}+`, l: "Min Total" },
            { n: "6", l: "Topics" },
          ].map(({ n, l }, i) => (
            <div key={l} style={{ padding: "14px 20px", textAlign: "center", borderRight: i < 2 ? "1px solid rgba(254,250,224,0.07)" : "none", background: "rgba(254,250,224,0.03)" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "22px", color: CREAM, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "3px" }}>{n}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(254,250,224,0.3)" }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, rgba(74,124,89,0.3), rgba(188,108,37,0.3), transparent)`, marginTop: 32, opacity: 0.5 }} />
    </div>

    {/* ── Cards grid ── */}
    <div className="blogs-content-pad" style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", paddingTop: "52px", paddingBottom: "80px" }}>
      <div className="blogs-grid">
        {ALL_BLOGS.map((blog, i) => (
          <BlogFullCard key={blog.slug} blog={blog} index={i} />
        ))}
      </div>
    </div>

    {/* Separator before footer */}
    <div style={{
      height: "1px",
      background: "linear-gradient(90deg, transparent, rgba(74,124,89,0.25), rgba(188,108,37,0.25), transparent)",
    }} />

    <Footer />
  </div>
);

export default Blogs;