import { motion, useScroll, useTransform } from "framer-motion";
import { Server, Brain, Cloud, MessageCircle, FileText } from "lucide-react";
import { useRef } from "react";

const OLIVE_DEEP  = "#283618";
const OLIVE_MID   = "#3d4a22";
const OLIVE_SOFT  = "#606C38";
const AMBER       = "#BC6C25";
const AMBER_LT    = "#DDA15E";
const CREAM       = "#FEFAE0";
const BORDER      = "rgba(96,108,56,0.18)";
const CARD_BG     = "#1a2610";
const CARD_BORDER = "rgba(96,108,56,0.38)";
const CARD_TEXT   = "rgba(254,250,224,0.85)";

const offerings = [
  {
    icon: Server, num: "01",
    title: "Backend & APIs",
    desc: "Spring Boot microservices, REST/GraphQL APIs, JWT auth, Redis caching, and scalable architecture patterns.",
    accent: AMBER_LT,
    accentBg: "rgba(221,161,94,0.12)",
    tag: "Core Service",
  },
  {
    icon: Brain, num: "02",
    title: "AI Integration",
    desc: "LLM-powered features, intelligent agents, RAG pipelines with pgvector, and Spring AI integrations.",
    accent: "#E8943A",
    accentBg: "rgba(232,148,58,0.12)",
    tag: "AI/ML",
  },
  {
    icon: Cloud, num: "03",
    title: "Cloud & DevOps",
    desc: "Docker, Kafka event-driven systems, CI/CD pipelines, ELK stack logging, and cloud-native deployments.",
    accent: "#8BBF5A",
    accentBg: "rgba(139,191,90,0.12)",
    tag: "Infrastructure",
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Space+Grotesk:wght@400;500;700&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;700&display=swap');

  .collab-section {
    background: ${CREAM};
    padding: 0;
    overflow: hidden;
    position: relative;
  }

  .collab-label-bar {
    background: ${OLIVE_DEEP};
    padding: 10px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .collab-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 80px 40px 100px;
    position: relative;
  }

  .offering-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 56px;
  }

  .offering-card {
    background: ${CARD_BG};
    border: 1.5px solid ${CARD_BORDER};
    border-radius: 16px;
    padding: 30px 26px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.25s, transform 0.32s cubic-bezier(.22,1,.36,1), box-shadow 0.32s;
    cursor: default;
    box-shadow: 0 4px 24px rgba(0,0,0,0.2);
  }

  .offering-card:hover {
    transform: translateY(-6px) scale(1.01);
  }

  .cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    background: ${OLIVE_DEEP};
    border: 2px solid ${OLIVE_DEEP};
    border-radius: 6px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${CREAM};
    cursor: pointer;
    transition: background 0.18s, border-color 0.18s, transform 0.2s;
  }
  .btn-primary:hover {
    background: ${AMBER};
    border-color: ${AMBER};
    transform: translateY(-2px);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: #fff;
    border: 1.5px solid ${BORDER};
    border-radius: 6px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 13px;
    color: ${OLIVE_DEEP};
    cursor: pointer;
    transition: border-color 0.18s, color 0.18s, background 0.18s, transform 0.2s;
  }
  .btn-secondary:hover {
    border-color: ${AMBER};
    color: ${AMBER};
    background: rgba(188,108,37,0.06);
    transform: translateY(-2px);
  }

  .collab-stripe {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -55deg, transparent, transparent 40px,
      rgba(96,108,56,0.025) 40px, rgba(96,108,56,0.025) 41px
    );
    pointer-events: none;
    z-index: 0;
  }

  .dots-trail {
    display: grid;
    grid-template-columns: repeat(8, 10px);
    gap: 8px;
    opacity: 0.18;
    margin-left: auto;
  }

  @keyframes ping {
    75%, 100% { transform: scale(2); opacity: 0; }
  }

  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  .card-shimmer-line {
    position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
    background-size: 200% auto;
    animation: shimmer 3.5s linear infinite;
  }

  @media (max-width: 900px) {
    .collab-inner { padding: 60px 24px 80px; }
    .collab-label-bar { padding: 10px 24px; }
    .offering-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .dots-trail { display: none; }
  }

  @media (max-width: 600px) {
    .collab-inner { padding: 48px 18px 64px; }
    .collab-label-bar { padding: 9px 18px; }
    .offering-grid { grid-template-columns: 1fr; gap: 10px; }
    .collab-label-bar .label-right { display: none; }
    .offering-card { padding: 22px 18px; border-radius: 12px; }
    .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
    .cta-row { flex-direction: column; }
  }
`;

const Collaborate = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);

  return (
    <section id="collaborate" className="collab-section" ref={containerRef}>
      <style>{styles}</style>

      {/* Label bar */}
      <div className="collab-label-bar">
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.18em", color: CREAM, textTransform: "uppercase", opacity: 0.7 }}>✦ Section 05</span>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "11px", letterSpacing: "0.14em", color: AMBER_LT, textTransform: "uppercase" }}>Collaborate</span>
        <span className="label-right" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.18em", color: CREAM, textTransform: "uppercase", opacity: 0.7 }}>Open to Work ✦</span>
      </div>

      <div className="collab-inner">
        {/* Texture */}
        <div className="collab-stripe" />

        {/* Orbs */}
        <div style={{ position: "absolute", top: -60, right: -80, width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, ${AMBER}16, transparent 70%)`, filter: "blur(56px)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: 80, left: -50, width: 240, height: 240, borderRadius: "50%", background: `radial-gradient(circle, ${OLIVE_SOFT}24, transparent 70%)`, filter: "blur(44px)", pointerEvents: "none", zIndex: 0 }} />

        {/* Ghost watermark */}
        <motion.span aria-hidden style={{
          y: bgY,
          fontFamily: "'Syne', sans-serif", fontWeight: 900,
          fontSize: "clamp(70px,13vw,150px)", color: "rgba(96,108,56,0.04)",
          lineHeight: 1, letterSpacing: "-0.04em",
          position: "absolute", top: "60px", right: "-10px",
          userSelect: "none", pointerEvents: "none",
        }}>BUILD</motion.span>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "56px", position: "relative", zIndex: 1 }}
        >
          {/* Availability pill */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
            <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "10px", height: "10px" }}>
              <span style={{ position: "absolute", width: "10px", height: "10px", borderRadius: "50%", background: "#4CAF50", opacity: 0.25, animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4CAF50", display: "inline-block", position: "relative" }} />
            </span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.14em",
              textTransform: "uppercase", color: "#2E7D32",
              background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.25)",
              padding: "4px 14px", borderRadius: "99px",
            }}>Available for freelance</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: AMBER, opacity: 0.7 }}>· Open to work</span>
          </div>

          {/* Eyebrow line */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: 32, height: 2, background: AMBER_LT }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", color: AMBER_LT, textTransform: "uppercase" }}>Collaboration</span>
          </div>

          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 900,
            fontSize: "clamp(32px,5vw,60px)", color: OLIVE_DEEP,
            letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0, position: "relative", zIndex: 1,
          }}>
            Let's build something
            <span style={{ display: "block", color: AMBER, fontStyle: "italic", fontFamily: "'DM Serif Display', serif" }}>
              great together.
            </span>
          </h2>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginTop: "24px", maxWidth: "540px" }}>
            <div style={{ width: 4, height: 56, background: `linear-gradient(${AMBER_LT}, ${AMBER}55)`, borderRadius: 4, flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: 1.8, color: OLIVE_MID, margin: 0 }}>
              Have an idea that needs a solid backend? I'm open to freelance collaborations — from API design to full-stack AI-powered products.
            </p>
          </div>
        </motion.div>

        {/* Offering cards */}
        <div className="offering-grid" style={{ position: "relative", zIndex: 1 }}>
          {offerings.map(({ icon: Icon, num, title, desc, accent, accentBg, tag }, i) => (
            <motion.div
              key={title}
              className="offering-card"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = accent + "99";
                e.currentTarget.style.boxShadow = `0 24px 52px rgba(0,0,0,0.3), 0 0 0 1px ${accent}22`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = CARD_BORDER;
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.2)";
              }}
            >
              {/* Shimmer top line */}
              <div className="card-shimmer-line" style={{
                backgroundImage: `linear-gradient(90deg, ${accent}00 0%, ${accent} 40%, ${accent} 60%, ${accent}00 100%)`,
              }} />

              {/* Inner top glow */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 70, background: `radial-gradient(ellipse at 50% 0%, ${accent}0d, transparent 70%)`, pointerEvents: "none" }} />

              {/* Left accent bar */}
              <div style={{
                position: "absolute", top: 0, left: 0,
                width: "3px", height: "100%",
                background: `linear-gradient(180deg, ${accent}, ${accent}44)`, opacity: 0.85,
                borderRadius: "3px 0 0 3px",
              }} />

              {/* Num + tag row */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: accent, opacity: 0.7,
                }}>{num}</span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "2px 8px", borderRadius: "99px",
                  border: `1px solid ${accent}44`, color: `${accent}cc`,
                  background: `${accent}0d`,
                }}>{tag}</span>
              </div>

              {/* Icon */}
              <div style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "46px", height: "46px", borderRadius: "12px",
                background: accentBg, border: `1.5px solid ${accent}33`,
                marginBottom: "18px",
                boxShadow: `0 0 18px ${accent}18`,
              }}>
                <Icon size={20} color={accent} />
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "16px",
                color: CREAM, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "12px",
              }}>{title}</h3>

              {/* Divider with dot */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                <div style={{ flex: 1, height: 1, background: "rgba(96,108,56,0.28)" }} />
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: accent, opacity: 0.5 }} />
              </div>

              {/* Desc */}
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "13px",
                color: CARD_TEXT, lineHeight: 1.78, margin: 0,
              }}>{desc}</p>

              {/* Ghost number */}
              <span aria-hidden style={{
                position: "absolute", bottom: "-12px", right: "8px",
                fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "76px",
                color: `${accent}07`, letterSpacing: "-0.06em",
                lineHeight: 1, userSelect: "none", pointerEvents: "none",
              }}>{num}</span>

              {/* Corner bracket */}
              <div style={{
                position: "absolute", bottom: 14, right: 14,
                width: 14, height: 14,
                borderRight: `2px solid ${accent}44`,
                borderBottom: `2px solid ${accent}44`,
                borderRadius: "0 0 4px 0",
              }} />
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: "1.5px", background: `linear-gradient(90deg, transparent, ${AMBER_LT}44, transparent)`, marginBottom: "48px", position: "relative", zIndex: 1 }} />

        {/* CTA row */}
        <motion.div
          className="cta-row"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <button
            className="btn-primary"
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            <MessageCircle size={15} /> Start a conversation
          </button>

          <button
            className="btn-secondary"
            onClick={() => document.querySelector("#resume")?.scrollIntoView({ behavior: "smooth" })}
          >
            <FileText size={15} /> View my resume
          </button>

          {/* Dots */}
          <div className="dots-trail">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} style={{
                width: i % 4 === 0 ? "5px" : "3px",
                height: i % 4 === 0 ? "5px" : "3px",
                borderRadius: "50%",
                background: i % 5 === 0 ? AMBER : OLIVE_SOFT,
                display: "block", alignSelf: "center", justifySelf: "center",
              }} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Collaborate;