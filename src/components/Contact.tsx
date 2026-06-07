import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Linkedin, Github, ExternalLink, ArrowRight, MapPin } from "lucide-react";
import { useRef } from "react";

const OLIVE_DEEP  = "#283618";
const OLIVE_MID   = "#3d4a22";
const OLIVE_SOFT  = "#606C38";
const AMBER       = "#BC6C25";
const AMBER_LT    = "#DDA15E";
const CREAM       = "#FEFAE0";
const CARD_BG     = "#1a2610";
const CARD_BORDER = "rgba(96,108,56,0.38)";

const contacts = [
  { icon: Mail,         label: "Gmail",    sub: "rohanuke1@gmail.com",         href: "mailto:rohanuke1@gmail.com",        accent: "#E8943A", desc: "Best for opportunities" },
  { icon: Linkedin,     label: "LinkedIn", sub: "linkedin.com/in/ARONAGENT",   href: "https://linkedin.com/in/ARONAGENT", accent: "#5B9BD5", desc: "Professional network" },
  { icon: Github,       label: "GitHub",   sub: "github.com/ARONAGENT",        href: "https://github.com/ARONAGENT",      accent: AMBER_LT,  desc: "Open source work" },
  { icon: ExternalLink, label: "LeetCode", sub: "leetcode.com/u/Aron20kk",     href: "https://leetcode.com/u/Aron20kk/",  accent: "#E8943A", desc: "Competitive coding" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Space+Grotesk:wght@400;500;700&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;700&display=swap');

  .contact-section {
    background: ${CREAM};
    padding: 0;
    overflow: hidden;
    position: relative;
  }

  .contact-label-bar {
    background: ${AMBER};
    padding: 10px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .contact-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 80px 40px 100px;
    position: relative;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
    position: relative;
    z-index: 1;
  }

  .contact-card-link {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 22px;
    background: ${CARD_BG};
    border: 1.5px solid ${CARD_BORDER};
    border-radius: 14px;
    text-decoration: none;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    transition: border-color 0.25s, transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s;
    position: relative;
    overflow: hidden;
  }

  .contact-card-link:hover {
    transform: translateX(8px);
  }

  .send-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 32px;
    background: ${OLIVE_DEEP};
    color: ${CREAM};
    border: 2px solid ${OLIVE_DEEP};
    border-radius: 6px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
  }

  .send-btn:hover {
    background: ${AMBER};
    border-color: ${AMBER};
    transform: translateY(-2px);
  }

  .contact-stripe {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: repeating-linear-gradient(
      -55deg, transparent, transparent 40px,
      rgba(96,108,56,0.025) 40px, rgba(96,108,56,0.025) 41px
    );
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: 900px) {
    .contact-inner {
      padding: 60px 24px 80px;
    }
    .contact-label-bar {
      padding: 10px 24px;
    }
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 48px;
    }
  }

  @media (max-width: 540px) {
    .contact-inner {
      padding: 48px 18px 64px;
    }
    .contact-label-bar {
      padding: 9px 18px;
    }
    .contact-label-bar .label-right {
      display: none;
    }
    .contact-grid {
      gap: 40px;
    }
    .contact-card-link {
      padding: 16px 16px;
      border-radius: 12px;
    }
    .send-btn {
      padding: 14px 24px;
      font-size: 13px;
      width: 100%;
      justify-content: center;
    }
  }

  @keyframes pulseRing {
    0%   { transform: scale(1);   opacity: 0.6; }
    70%  { transform: scale(1.8); opacity: 0; }
    100% { transform: scale(1.8); opacity: 0; }
  }

  .pulse-dot::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: #4CAF50;
    animation: pulseRing 2s ease-out infinite;
  }

  .decorative-line {
    position: absolute;
    left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${AMBER_LT}44, transparent);
    pointer-events: none;
  }
`;

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <section id="contact" className="contact-section" ref={containerRef}>
      <style>{styles}</style>

      {/* Label bar */}
      <div className="contact-label-bar">
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.18em", color: CREAM, textTransform: "uppercase", opacity: 0.8 }}>✦ Section 09</span>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "11px", letterSpacing: "0.14em", color: CREAM, textTransform: "uppercase" }}>Get In Touch</span>
        <span className="label-right" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.18em", color: CREAM, textTransform: "uppercase", opacity: 0.8 }}>Let's Connect ✦</span>
      </div>

      <div className="contact-inner">
        {/* Decorative lines */}
        <div className="decorative-line" style={{ top: 40 }} />
        <div className="decorative-line" style={{ bottom: 60 }} />

        {/* Stripe texture */}
        <div className="contact-stripe" />

        {/* Floating orbs */}
        <div style={{ position: "absolute", top: -40, right: -60, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${AMBER}14, transparent 70%)`, filter: "blur(50px)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: 60, left: -40, width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle, ${OLIVE_SOFT}22, transparent 70%)`, filter: "blur(40px)", pointerEvents: "none", zIndex: 0 }} />

        {/* Ghost watermark */}
        <motion.span aria-hidden style={{
          y: bgY,
          fontFamily: "'Syne', sans-serif", fontWeight: 900,
          fontSize: "clamp(70px,13vw,150px)", color: "rgba(96,108,56,0.04)",
          lineHeight: 1, letterSpacing: "-0.04em",
          position: "absolute", top: "54px", right: "-8px",
          userSelect: "none", pointerEvents: "none",
        }}>HELLO</motion.span>

        {/* Two-column layout */}
        <div className="contact-grid">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: 32, height: 2, background: AMBER_LT }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", color: AMBER_LT, textTransform: "uppercase" }}>Let's Talk</span>
            </div>

            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 900,
              fontSize: "clamp(32px,5vw,60px)", color: OLIVE_DEEP,
              letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 6px",
            }}>
              Say
              <span style={{ color: AMBER, fontStyle: "italic", fontFamily: "'DM Serif Display', serif", marginLeft: "14px" }}>
                hello.
              </span>
            </h2>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", margin: "24px 0 36px", maxWidth: "420px" }}>
              <div style={{ width: 4, height: 56, background: `linear-gradient(${AMBER_LT}, ${AMBER}55)`, borderRadius: 4, flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", lineHeight: 1.8, color: OLIVE_MID, margin: 0 }}>
                Have a project in mind, want to collaborate, or just want to talk backend? My inbox is always open.
              </p>
            </div>

            {/* CTA button */}
            <div style={{ marginBottom: "40px" }}>
              <a href="mailto:rohanuke1@gmail.com" className="send-btn">
                <Mail size={16} />
                Send a message
                <ArrowRight size={15} />
              </a>
            </div>

            {/* Quote block */}
            <div style={{
              borderTop: `1.5px solid rgba(96,108,56,0.12)`, paddingTop: "28px",
              position: "relative",
            }}>
              {/* Large quote mark */}
              <div style={{
                fontFamily: "'DM Serif Display', serif", fontSize: "80px", lineHeight: 0.6,
                color: AMBER, opacity: 0.15, position: "absolute", top: 20, left: -8,
                userSelect: "none", pointerEvents: "none",
              }}>"</div>

              <p style={{
                fontFamily: "'DM Serif Display', serif", fontStyle: "italic",
                fontSize: "17px", color: OLIVE_MID, lineHeight: 1.6,
                margin: "0 0 12px", opacity: 0.85, paddingLeft: "8px",
              }}>
                Code is like humor. When you have to explain it, it's bad.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: 20, height: 1.5, background: AMBER, opacity: 0.5 }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: AMBER, opacity: 0.7,
                }}>Rohan Uke</span>
              </div>
            </div>

            {/* Decorative dot matrix */}
            <div aria-hidden style={{
              display: "grid", gridTemplateColumns: "repeat(8, 10px)", gap: "8px",
              opacity: 0.15, marginTop: "32px",
            }}>
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} style={{
                  width: i % 3 === 0 ? "5px" : "3px",
                  height: i % 3 === 0 ? "5px" : "3px",
                  borderRadius: "50%",
                  background: i % 5 === 0 ? AMBER : OLIVE_SOFT,
                  display: "block",
                  alignSelf: "center", justifySelf: "center",
                }} />
              ))}
            </div>
          </motion.div>

          {/* RIGHT — contact cards */}
          <motion.div
            initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {/* Card count badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: OLIVE_SOFT, opacity: 0.7 }}>4 ways to reach me</span>
              <div style={{ flex: 1, height: 1, background: `${OLIVE_SOFT}33` }} />
            </div>

            {contacts.map(({ icon: Icon, label, sub, href, accent, desc }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="contact-card-link"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = accent + "99";
                  e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.3), 0 0 0 1px ${accent}22`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = CARD_BORDER;
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
                }}
              >
                {/* Left accent bar */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: `linear-gradient(180deg, ${accent}, ${accent}55)`, opacity: 0.8, borderRadius: "3px 0 0 3px" }} />

                {/* Inner top glow */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 48, background: `linear-gradient(180deg, ${accent}08, transparent)`, pointerEvents: "none" }} />

                {/* Icon circle */}
                <div style={{
                  width: "46px", height: "46px", borderRadius: "12px",
                  background: `${accent}14`, border: `1.5px solid ${accent}33`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  boxShadow: `0 0 16px ${accent}18`,
                }}>
                  <Icon size={18} color={accent} />
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "14px",
                    color: CREAM, letterSpacing: "-0.01em", marginBottom: "2px",
                  }}>{label}</div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
                    color: "rgba(254,250,224,0.4)", letterSpacing: "0.02em",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>{sub}</div>
                  <div style={{
                    fontFamily: "'Space Grotesk', monospace", fontSize: "10px",
                    color: `${accent}88`, marginTop: "3px",
                  }}>{desc}</div>
                </div>

                <div style={{
                  width: 28, height: 28, borderRadius: "8px",
                  background: `${accent}12`, border: `1px solid ${accent}33`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <ArrowRight size={14} color={accent} style={{ opacity: 0.75 }} />
                </div>
              </motion.a>
            ))}

            {/* Location pill — enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.65, duration: 0.5 }}
              style={{
                marginTop: "6px",
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "11px 18px",
                background: "#fff",
                border: `1.5px solid rgba(96,108,56,0.18)`,
                borderRadius: "99px",
                alignSelf: "flex-start",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4CAF50", display: "block" }} />
                <span className="pulse-dot" style={{ position: "absolute", inset: 0, width: "8px", height: "8px", borderRadius: "50%", background: "#4CAF50" }} />
              </div>
              <MapPin size={12} color={OLIVE_SOFT} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: OLIVE_MID, letterSpacing: "0.05em" }}>
                Amravati, Maharashtra · Open to Remote
              </span>
            </motion.div>

            {/* Response time badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "8px 14px",
              background: `${OLIVE_DEEP}10`,
              border: `1px dashed ${OLIVE_SOFT}44`,
              borderRadius: "8px",
              alignSelf: "flex-start",
            }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: OLIVE_MID, opacity: 0.7, letterSpacing: "0.06em" }}>
                ⚡ Avg. response · &lt;24h
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;