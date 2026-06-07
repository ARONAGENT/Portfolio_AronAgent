import { Link } from "react-router-dom";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const CREAM      = "#FEFAE0";
const OLIVE      = "#283618";
const OLIVE_MID  = "#3d4a22";
const OLIVE_SOFT = "rgba(96,108,56,0.15)";
const AMBER      = "#BC6C25";
const AMBER2     = "#DDA15E";

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
    slug: "spring-ai",
    num: "04",
    label: "AI/ML",
    title: "Spring AI — Building Intelligent Java Apps",
    teaser: "Integrate OpenAI, build RAG pipelines with pgvector, and deploy AI-powered Spring Boot services to production.",
    tags: ["Spring AI", "OpenAI", "RAG", "pgvector"],
    readTime: "20 min",
    accent: "#A47BD5",
    accentDim: "rgba(164,123,213,0.12)",
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=JetBrains+Mono:wght@400;500&family=DM+Sans:wght@400;500&display=swap');

  .bp-label-bar {
    background: #283618;
    padding: 10px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .bp-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 80px 40px 80px;
    position: relative;
  }

  .bp-cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .bp-card {
    position: relative;
    height: 100%;
    border-radius: 8px;
    padding: 28px 24px 22px;
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.35s, transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s;
    text-decoration: none;
    display: block;
  }

  .bp-all-link {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(40,54,24,0.5);
    text-decoration: none;
    border: 1px solid rgba(96,108,56,0.22);
    padding: 7px 14px;
    border-radius: 3px;
    transition: color 0.2s, border-color 0.2s;
    flex-shrink: 0;
  }
  .bp-all-link:hover {
    color: ${AMBER};
    border-color: ${AMBER};
  }

  @media (max-width: 860px) {
    .bp-inner { padding: 60px 24px 60px; }
    .bp-label-bar { padding: 10px 24px; }
    .bp-cards-grid { grid-template-columns: 1fr; gap: 10px; }
  }

  @media (max-width: 540px) {
    .bp-inner { padding: 48px 18px 48px; }
    .bp-label-bar { padding: 9px 18px; }
    .bp-label-bar .bp-label-right { display: none; }
    .bp-card { padding: 22px 18px 18px; }
  }
`;

const Star4 = ({ size = 16, color = AMBER, opacity = 1, rotate = 0 }: {
  size?: number; color?: string; opacity?: number; rotate?: number;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
    style={{ opacity, transform: `rotate(${rotate}deg)`, flexShrink: 0 }}>
    <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill={color} />
  </svg>
);

interface Particle { id: number; x: number; y: number; size: number; color: string; rotate: number; tx: number; ty: number; delay: number; }
const PCOLS = [AMBER, AMBER2, "#E8924A", "#F0C080", "#DDA15E"];
function makeParticles(n: number): Particle[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i, x: 35 + Math.random() * 30, y: 20 + Math.random() * 60,
    size: 6 + Math.random() * 14,
    color: PCOLS[Math.floor(Math.random() * PCOLS.length)],
    rotate: Math.random() * 45,
    tx: (Math.random() - 0.5) * 520, ty: (Math.random() - 0.5) * 340,
    delay: Math.random() * 0.18,
  }));
}

const BlogCard = ({ blog, index, cardVariants }: {
  blog: typeof ALL_BLOGS[0]; index: number; cardVariants: object;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div variants={cardVariants} custom={index} style={{ height: "100%" }}>
      <Link to={`/blogs/${blog.slug}`} className="bp-card"
        style={{
          background: hovered
            ? `linear-gradient(135deg, #1a1710 0%, rgba(30,26,18,0.98) 100%)`
            : `linear-gradient(135deg, #100e08 0%, #1a1710 100%)`,
          border: `1px solid ${hovered ? blog.accent + "55" : "rgba(254,250,224,0.08)"}`,
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered
            ? `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px ${blog.accent}22`
            : "0 2px 12px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Animated left accent bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, width: "3px",
          height: hovered ? "100%" : "36px",
          background: `linear-gradient(180deg, ${blog.accent}, ${blog.accent}55)`,
          borderRadius: "3px 0 0 3px",
          transition: "height 0.45s cubic-bezier(.22,1,.36,1)",
        }} />

        {/* Top inner glow */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 56,
          background: `radial-gradient(ellipse at 50% 0%, ${blog.accent}0c, transparent 70%)`,
          pointerEvents: "none" }} />

        {/* Ghost number */}
        <span style={{
          position: "absolute", bottom: "-14px", right: "12px",
          fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "96px",
          color: "rgba(254,250,224,0.025)", letterSpacing: "-0.06em",
          lineHeight: 1, userSelect: "none", pointerEvents: "none",
        }}>{blog.num}</span>

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Star4 size={10} color={blog.accent} opacity={0.9} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.18em",
              textTransform: "uppercase", color: blog.accent, opacity: 0.85 }}>
              {blog.num} — {blog.label}
            </span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.1em",
            color: "rgba(254,250,224,0.25)", border: "1px solid rgba(254,250,224,0.1)",
            borderRadius: "99px", padding: "3px 10px" }}>
            {blog.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900,
          fontSize: "clamp(14px,1.5vw,17px)",
          color: "#FEFAE0", lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: "10px" }}>
          {blog.title}
        </h3>

        {/* Teaser */}
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12.5px",
          color: "rgba(254,250,224,0.42)", lineHeight: 1.7, marginBottom: "16px",
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {blog.teaser}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "18px" }}>
          {blog.tags.map(t => (
            <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8.5px",
              letterSpacing: "0.07em", textTransform: "uppercase", padding: "3px 9px",
              borderRadius: "2px", border: `1px solid ${blog.accent}40`,
              color: blog.accent, background: blog.accentDim }}>
              {t}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "5px",
            fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.14em",
            textTransform: "uppercase", color: blog.accent,
            paddingBottom: "2px", borderBottom: `1px solid ${blog.accent}40` }}>
            Read Article <ArrowUpRight size={11} />
          </div>
          <motion.div animate={hovered ? { rotate: 180, scale: 1.3, opacity: 1 } : { rotate: 0, scale: 1, opacity: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut" }}>
            <Star4 size={14} color={blog.accent} />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

const BlogsPreview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const controls = useAnimation();
  const [particles] = useState<Particle[]>(() => makeParticles(22));
  const [particlesDone, setParticlesDone] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      const t = setTimeout(() => setParticlesDone(true), 900);
      return () => clearTimeout(t);
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 0, scale: 0.85, rotate: (i: number) => [-4, 3, -2, 5][i] ?? 0 },
    visible: (i: number) => ({
      opacity: 1, scale: 1, rotate: 0,
      transition: { duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const particleVariant = (p: Particle) => ({
    hidden: { opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 },
    visible: {
      opacity: [0, 0.9, 0.6], x: p.tx, y: p.ty, scale: [0, 1.4, 1], rotate: p.rotate + 180,
      transition: { duration: 0.85, delay: p.delay, ease: [0.16, 1, 0.3, 1] },
    },
    settled: { opacity: 0, transition: { duration: 0.5 } },
  });

  return (
    <div style={{ background: "#FEFAE0" }}>
      <style>{styles}</style>

      {/* Label bar */}
      <div className="bp-label-bar">
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.18em", color: "#FEFAE0", textTransform: "uppercase", opacity: 0.7 }}>✦ Section 04</span>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "11px", letterSpacing: "0.14em", color: "#DDA15E", textTransform: "uppercase" }}>Latest Articles</span>
        <span className="bp-label-right" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.18em", color: "#FEFAE0", textTransform: "uppercase", opacity: 0.7 }}>Tech Writing ✦</span>
      </div>

      <section ref={sectionRef} id="blogs-preview"
        style={{ position: "relative", background: "rgba(254,250,224,0.97)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(96,108,56,0.15)" }}>
        <div className="bp-inner">

          {/* BG amber glow */}
          <div aria-hidden style={{
            position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
            width: "600px", height: "400px",
            background: "radial-gradient(ellipse, rgba(188,108,37,0.09) 0%, transparent 70%)",
            pointerEvents: "none", zIndex: 0,
          }} />

          {/* Diagonal stripe */}
          <div aria-hidden style={{
            position: "absolute", inset: 0,
            background: "repeating-linear-gradient(-55deg, transparent, transparent 40px, rgba(96,108,56,0.025) 40px, rgba(96,108,56,0.025) 41px)",
            pointerEvents: "none", zIndex: 0,
          }} />

          {/* Particles */}
          <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, overflow: "hidden" }}>
            {particles.map(p => (
              <motion.div key={p.id}
                initial="hidden"
                animate={particlesDone ? "settled" : isInView ? "visible" : "hidden"}
                variants={particleVariant(p)}
                style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%` }}>
                <Star4 size={p.size} color={p.color} rotate={p.rotate} />
              </motion.div>
            ))}
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", zIndex: 3, marginBottom: "52px" }}
          >
            {/* Top rule + label */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px", flexWrap: "wrap" }}>
              <div style={{ width: "32px", height: "1px", background: AMBER, opacity: 0.6 }} />
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <Star4 size={8} color={AMBER} opacity={0.9} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: AMBER, opacity: 0.85 }}>Writing</span>
                <Star4 size={8} color={AMBER} opacity={0.9} />
              </div>
              <div style={{ flex: 1, height: "1px", background: "rgba(96,108,56,0.2)", minWidth: 20 }} />
              <Link to="/blogs" className="bp-all-link">
                All Articles <ArrowUpRight size={10} />
              </Link>
            </div>

            {/* Big headline */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "20px", flexWrap: "wrap" }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(38px,6vw,72px)", lineHeight: 0.9, letterSpacing: "-0.045em", color: "#283618", margin: 0 }}>Latest</h2>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(38px,6vw,72px)", lineHeight: 0.9, letterSpacing: "-0.045em", color: "transparent", WebkitTextStroke: `2.5px ${AMBER}`, margin: 0 }}>Articles</h2>
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} style={{ marginBottom: "8px", flexShrink: 0 }}>
                <Star4 size={32} color={AMBER} opacity={0.7} />
              </motion.div>
            </div>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(40,54,24,0.55)", lineHeight: 1.65, marginTop: "14px", maxWidth: "380px", borderLeft: `2px solid ${AMBER}`, paddingLeft: "12px" }}>
              Deep dives into backend engineering, distributed systems, and AI integration.
            </p>
          </motion.div>

          {/* 4 cards grid */}
          <motion.div className="bp-cards-grid" initial="hidden" animate={controls} style={{ position: "relative", zIndex: 3 }}>
            {ALL_BLOGS.map((blog, i) => (
              <BlogCard key={blog.slug} blog={blog} index={i} cardVariants={cardVariants} />
            ))}
          </motion.div>

          {/* View all CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }}
            style={{ position: "relative", zIndex: 3, marginTop: "36px", textAlign: "center" }}
          >
            <Link to="/blogs"
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: OLIVE_MID, textDecoration: "none",
                border: `1.5px solid rgba(96,108,56,0.3)`,
                padding: "13px 28px", borderRadius: "4px",
                background: "rgba(40,54,24,0.05)",
                transition: "border-color 0.2s, color 0.2s, background 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = AMBER; e.currentTarget.style.color = AMBER; e.currentTarget.style.background = "rgba(188,108,37,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(96,108,56,0.3)"; e.currentTarget.style.color = OLIVE_MID; e.currentTarget.style.background = "rgba(40,54,24,0.05)"; }}
            >
              <Star4 size={12} color={AMBER} opacity={0.7} />
              View All {ALL_BLOGS.length} Articles
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>

          {/* Bottom rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "relative", zIndex: 3, marginTop: "48px", height: "1px",
              background: `linear-gradient(90deg, transparent, rgba(96,108,56,0.35), ${AMBER}55, transparent)`,
              transformOrigin: "center",
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default BlogsPreview;