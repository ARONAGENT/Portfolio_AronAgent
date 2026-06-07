import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const OLIVE_DEEP  = "#283618";
const OLIVE_MID   = "#3d4a22";
const OLIVE_SOFT  = "#606C38";
const AMBER       = "#BC6C25";
const AMBER_LT    = "#DDA15E";
const CREAM       = "#FEFAE0";
const CARD_BG     = "#1a2610";
const CARD_BORDER = "rgba(96,108,56,0.38)";

const focuses = [
  { icon: "🏗️", title: "Microservices Architecture", sub: "Service mesh & distributed systems",   accent: AMBER_LT,  num: "01", tag: "Backend" },
  { icon: "⚡",  title: "Event-Driven Development",   sub: "Apache Kafka & message streaming",     accent: "#E8943A", num: "02", tag: "Systems" },
  { icon: "☁️",  title: "Cloud-Native Technologies",  sub: "Docker, Kubernetes & AWS",             accent: "#8BBF5A", num: "03", tag: "DevOps" },
  { icon: "🤖",  title: "ML Engineering",             sub: "MLOps & model deployment",             accent: "#5B9BD5", num: "04", tag: "AI/ML" },
  { icon: "📊",  title: "Advanced Data Analysis",     sub: "Power BI & predictive analytics",      accent: "#A47BD5", num: "05", tag: "Data" },
  { icon: "🌐",  title: "Open Source Contributions",  sub: "Building for the community",           accent: "#3DBFA0", num: "06", tag: "Community" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Space+Grotesk:wght@400;500;700&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;700&display=swap');

  .focus-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .focus-card {
    background: ${CARD_BG};
    border: 1.5px solid ${CARD_BORDER};
    border-radius: 16px;
    padding: 28px 24px 26px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.22);
    transition: border-color 0.25s, transform 0.32s cubic-bezier(.22,1,.36,1), box-shadow 0.32s;
    cursor: default;
  }

  .focus-card:hover {
    transform: translateY(-7px) scale(1.01);
  }

  .section-label-bar {
    background: ${OLIVE_SOFT};
    padding: 10px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .inner-wrap {
    max-width: 1280px;
    margin: 0 auto;
    padding: 80px 40px 100px;
    position: relative;
  }

  /* Diagonal stripe accent */
  .stripe-accent {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: repeating-linear-gradient(
      -55deg,
      transparent,
      transparent 40px,
      rgba(96,108,56,0.03) 40px,
      rgba(96,108,56,0.03) 41px
    );
    pointer-events: none;
    z-index: 0;
  }

  .focus-number-track {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .focus-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 99px;
    border: 1px solid;
  }

  @media (max-width: 900px) {
    .focus-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    .inner-wrap {
      padding: 60px 24px 80px;
    }
    .section-label-bar {
      padding: 10px 24px;
    }
  }

  @media (max-width: 540px) {
    .focus-grid {
      grid-template-columns: 1fr;
      gap: 10px;
    }
    .inner-wrap {
      padding: 48px 18px 64px;
    }
    .section-label-bar {
      padding: 9px 18px;
    }
    .section-label-bar .label-mid {
      display: none;
    }
    .focus-card {
      padding: 22px 18px 20px;
      border-radius: 12px;
    }
  }

  /* Animated shimmer for card top line */
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  .card-top-line {
    position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
    background-size: 200% auto;
    animation: shimmer 3s linear infinite;
  }

  /* Floating orb decorations */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;
    z-index: 0;
  }
`;

const CurrentFocus = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section id="current-focus" ref={containerRef}
      style={{ background: CREAM, padding: "0", overflow: "hidden", position: "relative" }}>

      <style>{styles}</style>

      {/* Label bar */}
      <div className="section-label-bar">
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.18em", color: CREAM, textTransform: "uppercase", opacity: 0.75 }}>✦ Section 08</span>
        <span className="label-mid" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "11px", letterSpacing: "0.14em", color: AMBER_LT, textTransform: "uppercase" }}>Current Focus</span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.18em", color: CREAM, textTransform: "uppercase", opacity: 0.75 }}>What I'm Building ✦</span>
      </div>

      <div className="inner-wrap">
        {/* Background texture */}
        <div className="stripe-accent" />

        {/* Floating orbs */}
        <div className="orb" style={{ width: 340, height: 340, top: -60, right: -80, background: `radial-gradient(circle, ${AMBER}18, transparent 70%)` }} />
        <div className="orb" style={{ width: 260, height: 260, bottom: 40, left: -60, background: `radial-gradient(circle, ${OLIVE_SOFT}28, transparent 70%)` }} />

        {/* Ghost watermark */}
        <motion.span aria-hidden
          style={{
            y: bgY,
            fontFamily: "'Syne', sans-serif", fontWeight: 900,
            fontSize: "clamp(70px,13vw,150px)", color: "rgba(96,108,56,0.04)",
            lineHeight: 1, letterSpacing: "-0.04em",
            position: "absolute", top: "54px", right: "-8px",
            userSelect: "none", pointerEvents: "none",
          }}>FOCUS</motion.span>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "56px", position: "relative", zIndex: 1 }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: 32, height: 2, background: AMBER }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", color: AMBER, textTransform: "uppercase" }}>Deep Work Areas</span>
          </div>

          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 900,
            fontSize: "clamp(32px,5vw,60px)", color: OLIVE_DEEP,
            letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 6px",
          }}>
            Currently
            <span style={{ color: AMBER, fontStyle: "italic", fontFamily: "'DM Serif Display', serif", marginLeft: "14px" }}>
              obsessed with.
            </span>
          </h2>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginTop: "22px", maxWidth: "520px" }}>
            <div style={{ width: 4, height: 48, background: `linear-gradient(${AMBER_LT}, ${AMBER}66)`, borderRadius: 4, flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", lineHeight: 1.8, color: OLIVE_MID, margin: 0 }}>
              Six areas shaping my craft right now — where deep work meets real-world impact.
            </p>
          </div>

          {/* Live indicator */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "20px", padding: "6px 14px", background: `${OLIVE_DEEP}18`, border: `1px solid ${OLIVE_SOFT}44`, borderRadius: 99 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4CAF50", display: "inline-block", boxShadow: "0 0 0 3px #4CAF5022" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: OLIVE_MID, letterSpacing: "0.08em" }}>6 active tracks · Updated 2025</span>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="focus-grid" style={{ position: "relative", zIndex: 1 }}>
          {focuses.map((f, i) => (
            <motion.div
              key={f.title}
              className="focus-card"
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = f.accent + "aa";
                e.currentTarget.style.boxShadow = `0 24px 56px rgba(0,0,0,0.32), 0 0 0 1px ${f.accent}22, inset 0 1px 0 ${f.accent}11`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = CARD_BORDER;
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.22)";
              }}
            >
              {/* Shimmer top line */}
              <div className="card-top-line" style={{
                backgroundImage: `linear-gradient(90deg, ${f.accent}00 0%, ${f.accent} 40%, ${f.accent}ff 50%, ${f.accent} 60%, ${f.accent}00 100%)`,
              }} />

              {/* Inner glow */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: `radial-gradient(ellipse at 50% 0%, ${f.accent}0d, transparent 70%)`, pointerEvents: "none" }} />

              {/* Num + tag row */}
              <div className="focus-number-track">
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: f.accent, opacity: 0.7 }}>{f.num}</span>
                <span className="focus-tag" style={{ color: f.accent + "cc", borderColor: f.accent + "44", background: f.accent + "0d" }}>{f.tag}</span>
                <div style={{ flex: 1 }} />
                <span style={{ fontSize: "24px", lineHeight: 1, filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.35))" }}>{f.icon}</span>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "15px",
                color: CREAM, letterSpacing: "-0.02em", lineHeight: 1.25,
                margin: "0 0 12px",
              }}>{f.title}</h3>

              {/* Divider with accent dot */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ flex: 1, height: 1, background: "rgba(96,108,56,0.28)" }} />
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: f.accent, opacity: 0.5 }} />
              </div>

              {/* Sub */}
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: "12.5px",
                color: "rgba(254,250,224,0.55)", lineHeight: 1.7, margin: 0,
                letterSpacing: "0.01em",
              }}>{f.sub}</p>

              {/* Ghost number */}
              <span aria-hidden style={{
                position: "absolute", bottom: "-12px", right: "8px",
                fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "68px",
                color: `${f.accent}08`, letterSpacing: "-0.06em",
                lineHeight: 1, userSelect: "none", pointerEvents: "none",
              }}>{f.num}</span>

              {/* Corner bracket decoration */}
              <div style={{
                position: "absolute", bottom: 14, right: 14,
                width: 14, height: 14,
                borderRight: `2px solid ${f.accent}44`,
                borderBottom: `2px solid ${f.accent}44`,
                borderRadius: "0 0 4px 0",
              }} />
            </motion.div>
          ))}
        </div>

        {/* Bottom ticker strip */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            marginTop: 56,
            display: "flex", alignItems: "center", gap: 0,
            overflow: "hidden",
            borderTop: `1px solid ${OLIVE_SOFT}33`,
            paddingTop: 24,
            position: "relative", zIndex: 1,
          }}
        >
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {focuses.map(f => (
              <span key={f.title} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: f.accent, opacity: 0.55,
                display: "flex", alignItems: "center", gap: "6px",
              }}>
                <span>{f.icon}</span> {f.tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentFocus;