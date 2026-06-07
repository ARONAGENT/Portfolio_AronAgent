import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Calendar, Hash, CheckCircle2 } from "lucide-react";
import { useRef } from "react";

const OLIVE_DEEP  = "#283618";
const OLIVE_MID   = "#3d4a22";
const OLIVE_SOFT  = "#606C38";
const AMBER       = "#BC6C25";
const AMBER_LT    = "#DDA15E";
const CREAM       = "#FEFAE0";
const BORDER      = "rgba(96,108,56,0.18)";
const CARD_BG     = "#1a2610";
const CARD_BORDER = "rgba(96,108,56,0.35)";
const CARD_TEXT   = "rgba(254,250,224,0.88)";
const CARD_MUTED  = "rgba(254,250,224,0.48)";

/* ── Custom icons ── */
const CupIcon = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M6 4h16l-2 12H8L6 4Z" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M20 8h3a2 2 0 0 1 0 4h-3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 16v2m10-2v2M6 20h16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="14" cy="10" r="2" fill={color} opacity="0.7"/>
  </svg>
);
const PythonIcon = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 3C9 3 9.5 5.5 9.5 5.5V8H14.5V9H7S3.5 8.6 3.5 13s3.5 4.5 3.5 4.5H9V15s-.1-3.5 3.5-3.5H17s3.5.1 3.5-3V6S21 3 14 3Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.4"/>
    <path d="M14 25c5 0 4.5-2.5 4.5-2.5V20H13.5v-1H21s3.5.4 3.5-4-3.5-4.5-3.5-4.5H19v2.5s.1 3.5-3.5 3.5H11s-3.5-.1-3.5 3v4.5S7 25 14 25Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.4"/>
    <circle cx="11.5" cy="6" r="1" fill={color}/>
    <circle cx="16.5" cy="22" r="1" fill={color}/>
  </svg>
);
const WebIcon = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="10" stroke={color} strokeWidth="1.5" opacity="0.4"/>
    <path d="M14 4c-3 3-4.5 6-4.5 10s1.5 7 4.5 10M14 4c3 3 4.5 6 4.5 10s-1.5 7-4.5 10" stroke={color} strokeWidth="1.4"/>
    <path d="M4 14h20M6 9h16M6 19h16" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>
  </svg>
);
const CloudIconSvg = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M8 18a5 5 0 1 1 1.5-9.7A6 6 0 0 1 22 13a4 4 0 0 1-1 7.9H8Z" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12 22v3M16 22v3M14 22v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
  </svg>
);
const RocketIcon = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 3s5 1 7 8l-7 7-7-7c2-7 7-8 7-8Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="14" cy="11" r="2" fill={color}/>
    <path d="M7 18s-3 1-3 4h6M21 18s3 1 3 4h-6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
    <path d="M11 18l3 6 3-6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const StarShineIcon = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 3 L15.8 12.2 L25 14 L15.8 15.8 L14 25 L12.2 15.8 L3 14 L12.2 12.2 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M14 7 L14.9 11.1 L19 12 L14.9 12.9 L14 17 L13.1 12.9 L9 12 L13.1 11.1 Z" fill={color} opacity="0.5"/>
  </svg>
);

const certifications = [
  {
    id: 1, Icon: CupIcon,
    title: "Enterprise Java Development",
    issuer: "SohamGlobal", issuerUrl: "https://sohamglobal.com/",
    issuedDate: "Aug 2025", credentialId: "EJ2E1364", period: "2024 – Aug 2025", hours: "120 hrs",
    verified: false,
    achievement: "Completed 120-hour intensive Enterprise Java training, building production-grade backend systems from scratch.",
    learned: ["Core Java 21 & DSA", "Spring Boot 3 & JPA", "Microservices & Security", "MongoDB & MySQL", "AI Agents & GenAI"],
    verifyLink: null,
    driveLink: "https://drive.google.com/file/d/1LDahOf5inTOBSkVvwb7ai07cBIflxdFb/view?usp=sharing",
    accent: "#E8943A",
  },
  {
    id: 2, Icon: PythonIcon,
    title: "Python for Web, AIML & Data Science",
    issuer: "SohamGlobal", issuerUrl: "https://sohamglobal.com/",
    issuedDate: "Apr 2025", credentialId: "PY2305042", period: "2024 – Apr 2025", hours: "120 hrs",
    verified: false,
    achievement: "Completed 120-hour Python program spanning web development, machine learning, and generative AI integrations.",
    learned: ["Python 3.12 & Django", "Pandas & NumPy", "Scikit-Learn ML", "Azure OpenAI", "LangChain Agents"],
    verifyLink: null,
    driveLink: "https://drive.google.com/file/d/1oQ3fVd9MoA_UbldH814UagghE8KIOw_B/view?usp=sharing",
    accent: "#5B9BD5",
  },
  {
    id: 3, Icon: WebIcon,
    title: "Forage Virtual Experience – Software Engineering",
    issuer: "Forage", issuerUrl: "https://www.theforage.com/",
    issuedDate: "Jan 2025", credentialId: "sw5B3H9doiq7274ct", period: "Jan 2025", hours: null,
    verified: true,
    achievement: "Completed real-world software engineering tasks simulating professional dev workflows at top-tier companies.",
    learned: ["Coding challenges", "Git & GitHub", "Agile practices", "Problem-solving"],
    verifyLink: "https://www.theforage.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_47LTPFKX6f7xd8H26_1735839831588_completion_certificate.pdf",
    driveLink: "https://drive.google.com/file/d/1rnB77Gxm6ECAvi6GAoaevI2tEi55DWzN/view?usp=sharing",
    accent: "#A47BD5",
  },
  {
    id: 4, Icon: CloudIconSvg,
    title: "OCI DevOps Professional",
    issuer: "Oracle", issuerUrl: "https://www.oracle.com/",
    issuedDate: "Oct 2025", credentialId: "OCI-DevOps-2025", period: "Oct 2025 – Oct 2027", hours: null,
    verified: true,
    achievement: "Earned Oracle's professional-level DevOps certification, validating expertise in CI/CD and cloud-native workflows on OCI.",
    learned: ["CI/CD pipelines", "OCI DevOps service", "Artifact registry", "Cloud monitoring"],
    verifyLink: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=8A71174FC51540BDA9826084CA5E6578FCB9D5A9C22D801C0EBDFD307417B8BB",
    driveLink: "https://drive.google.com/file/d/1JSeNoe4paaKgqfLOrWBcfhMoaolQni5c/view?usp=sharing",
    accent: "#E05C4B",
  },
  {
    id: 5, Icon: RocketIcon,
    title: "Spring Boot 0 To 1 – Fundamentals",
    issuer: "Coding Shuttle", issuerUrl: "https://www.codingshuttle.com/",
    issuedDate: "Oct 2025", credentialId: "TLNRSWVV", period: "2025 – Oct 2025", hours: null,
    verified: true,
    achievement: "Completed Spring Boot fundamentals under Anuj Kumar Sharma, covering end-to-end backend development and AWS deployment.",
    learned: ["Spring Boot & MVC", "Spring Data JPA", "Spring Security", "Actuator & Profiles", "AWS deployment"],
    verifyLink: "https://app.codingshuttle.com/certificate/verify/TLNRSWVV",
    driveLink: "https://drive.google.com/file/d/1YaMZOsANKAzZvZzNw3PuxpQF_loxKVB9/view?usp=sharing",
    accent: "#5BAD6F",
  },
  {
    id: 6, Icon: StarShineIcon,
    title: "Spring Boot 0 To 100 – Advanced Backend",
    issuer: "Coding Shuttle", issuerUrl: "https://www.codingshuttle.com/",
    issuedDate: "Nov 2025", credentialId: "6SEYHO5W", period: "2025 – Nov 2025", hours: null,
    verified: true,
    achievement: "Backend journey milestone unlocked! Successfully completed Spring Boot Cohort 4.0 at Coding Shuttle.",
    learned: ["AOP & Aspects", "Redis Caching", "Transaction Mgmt", "Microservices", "Docker & Kubernetes"],
    verifyLink: "https://app.codingshuttle.com/certificate/verify/6SEYHO5W",
    driveLink: "https://drive.google.com/file/d/1gFwZM04g4z0bCI_YXuCrZuEi1ipAx96A/view?usp=sharing",
    accent: "#3DBFA0",
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Space+Grotesk:wght@400;500;700&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;700&display=swap');

  .certs-section {
    background: ${CREAM};
    padding: 0;
    overflow: hidden;
    position: relative;
  }

  .certs-label-bar {
    background: ${OLIVE_DEEP};
    padding: 10px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .certs-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 80px 40px 100px;
    position: relative;
  }

  .certs-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    position: relative;
    z-index: 1;
  }

  .cert-card {
    background: ${CARD_BG};
    border: 1.5px solid ${CARD_BORDER};
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 24px rgba(0,0,0,0.22);
    transition: border-color 0.25s, transform 0.32s cubic-bezier(.22,1,.36,1), box-shadow 0.32s;
  }

  .cert-card:hover {
    transform: translateY(-5px);
  }

  .stats-strip {
    display: flex;
    gap: 0;
    margin-top: 32px;
    border: 1.5px solid ${BORDER};
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    width: fit-content;
  }

  .stat-cell {
    padding: 16px 28px;
    text-align: center;
    border-right: 1px solid ${BORDER};
  }
  .stat-cell:last-child { border-right: none; }

  .certs-stripe {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -55deg, transparent, transparent 40px,
      rgba(96,108,56,0.025) 40px, rgba(96,108,56,0.025) 41px
    );
    pointer-events: none;
    z-index: 0;
  }

  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  .cert-shimmer-line {
    height: 3px;
    background-size: 200% auto;
    animation: shimmer 4s linear infinite;
    flex-shrink: 0;
  }

  @media (max-width: 900px) {
    .certs-inner { padding: 60px 24px 80px; }
    .certs-label-bar { padding: 10px 24px; }
    .certs-grid { grid-template-columns: 1fr; gap: 12px; }
    .stats-strip { width: 100%; }
    .stat-cell { flex: 1; padding: 14px 16px; }
  }

  @media (max-width: 540px) {
    .certs-inner { padding: 48px 18px 64px; }
    .certs-label-bar { padding: 9px 18px; }
    .certs-label-bar .label-right { display: none; }
    .cert-card { border-radius: 12px; }
  }
`;

const CertCard = ({ cert, index }: { cert: (typeof certifications)[0]; index: number }) => {
  const { Icon, accent } = cert;

  return (
    <motion.div
      className="cert-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = accent + "88";
        e.currentTarget.style.boxShadow = `0 24px 52px rgba(0,0,0,0.3), 0 0 0 1px ${accent}33`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = CARD_BORDER;
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.22)";
      }}
    >
      {/* Animated shimmer top line */}
      <div className="cert-shimmer-line" style={{
        backgroundImage: `linear-gradient(90deg, ${accent}00 0%, ${accent} 40%, ${accent} 60%, ${accent}00 100%)`,
      }} />

      {/* Top inner glow */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: `radial-gradient(ellipse at 50% 0%, ${accent}0b, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ padding: "22px 22px 18px", display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
          <div style={{
            width: "50px", height: "50px", borderRadius: "12px",
            background: `${accent}18`, border: `1.5px solid ${accent}38`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            boxShadow: `0 0 20px ${accent}18`,
          }}>
            <Icon color={accent} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <a href={cert.issuerUrl} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: accent, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: "4px",
              marginBottom: "5px", opacity: 0.9,
            }}>
              {cert.issuer} <ExternalLink size={9} />
            </a>
            <h3 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "14px",
              color: CREAM, letterSpacing: "-0.02em", lineHeight: 1.25, margin: 0,
            }}>{cert.title}</h3>
          </div>

          {cert.verified && (
            <div style={{
              display: "flex", alignItems: "center", gap: "4px",
              padding: "4px 10px", borderRadius: "99px",
              background: "rgba(91,173,111,0.12)", border: "1px solid rgba(91,173,111,0.32)",
              flexShrink: 0,
            }}>
              <CheckCircle2 size={11} color="#5BAD6F" />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "8.5px",
                letterSpacing: "0.1em", textTransform: "uppercase", color: "#5BAD6F",
              }}>Verified</span>
            </div>
          )}
        </div>

        {/* Meta chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {[
            { icon: Calendar, text: cert.period },
            { icon: Hash, text: cert.credentialId },
            ...(cert.hours ? [{ icon: null as any, text: cert.hours }] : []),
          ].map(({ icon: MI, text }, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
              letterSpacing: "0.05em", color: CARD_MUTED,
              background: "rgba(96,108,56,0.15)", border: "1px solid rgba(96,108,56,0.25)",
              padding: "3px 9px", borderRadius: "4px",
            }}>
              {MI && <MI size={9} />}{text}
            </span>
          ))}
        </div>

        {/* Achievement */}
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: "12.5px",
          color: CARD_TEXT, lineHeight: 1.72, margin: 0,
        }}>{cert.achievement}</p>

        {/* Skills */}
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "8.5px",
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: CARD_MUTED, marginBottom: "8px",
          }}>Key Skills</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {cert.learned.map(skill => (
              <span key={skill} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
                letterSpacing: "0.05em", padding: "3px 10px", borderRadius: "4px",
                border: `1px solid ${accent}45`, color: accent,
                background: `${accent}12`,
              }}>{skill}</span>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* Divider with accent dot */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(96,108,56,0.28)" }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: accent, opacity: 0.4 }} />
        </div>

        {/* Footer links */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          {cert.verifyLink && (
            <a href={cert.verifyLink} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "9.5px",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: accent, textDecoration: "none",
              paddingBottom: "2px", borderBottom: `1px solid ${accent}55`,
            }}>
              Verify Certificate <ExternalLink size={10} />
            </a>
          )}
          {cert.driveLink && (
            <a href={cert.driveLink} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                fontFamily: "'JetBrains Mono', monospace", fontSize: "9.5px",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: CARD_MUTED, textDecoration: "none",
                paddingBottom: "2px", borderBottom: "1px solid rgba(254,250,224,0.15)",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = accent; }}
              onMouseLeave={e => { e.currentTarget.style.color = CARD_MUTED; }}
            >
              View on Drive <ExternalLink size={10} />
            </a>
          )}
          <span style={{
            marginLeft: "auto",
            fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
            letterSpacing: "0.08em", color: "rgba(254,250,224,0.28)",
          }}>Issued {cert.issuedDate}</span>
        </div>
      </div>

      {/* Corner bracket */}
      <div style={{
        position: "absolute", bottom: 14, right: 14,
        width: 14, height: 14,
        borderRight: `2px solid ${accent}44`,
        borderBottom: `2px solid ${accent}44`,
        borderRadius: "0 0 4px 0",
        pointerEvents: "none",
      }} />
    </motion.div>
  );
};

const Certifications = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <section id="certifications" className="certs-section" ref={containerRef}>
      <style>{styles}</style>

      {/* Label bar */}
      <div className="certs-label-bar">
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.18em", color: CREAM, textTransform: "uppercase", opacity: 0.7 }}>✦ Section 06</span>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "11px", letterSpacing: "0.14em", color: AMBER_LT, textTransform: "uppercase" }}>Certifications</span>
        <span className="label-right" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.18em", color: CREAM, textTransform: "uppercase", opacity: 0.7 }}>Credentials ✦</span>
      </div>

      <div className="certs-inner">
        {/* Texture + orbs */}
        <div className="certs-stripe" />
        <div style={{ position: "absolute", top: -40, right: -70, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${AMBER}14, transparent 70%)`, filter: "blur(52px)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: 60, left: -40, width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle, ${OLIVE_SOFT}22, transparent 70%)`, filter: "blur(42px)", pointerEvents: "none", zIndex: 0 }} />

        {/* Ghost watermark */}
        <motion.span aria-hidden style={{
          y: bgY,
          fontFamily: "'Syne', sans-serif", fontWeight: 900,
          fontSize: "clamp(70px,13vw,150px)", color: "rgba(96,108,56,0.04)",
          lineHeight: 1, letterSpacing: "-0.04em",
          position: "absolute", top: "60px", right: "-10px",
          userSelect: "none", pointerEvents: "none",
        }}>CERTS</motion.span>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "56px", position: "relative", zIndex: 1 }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: 32, height: 2, background: AMBER_LT }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", color: AMBER_LT, textTransform: "uppercase" }}>Credentials</span>
          </div>

          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 900,
            fontSize: "clamp(32px,5vw,60px)", color: OLIVE_DEEP,
            letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0,
          }}>
            Professional
            <span style={{ display: "block", color: AMBER, fontStyle: "italic", fontFamily: "'DM Serif Display', serif" }}>
              Credentials.
            </span>
          </h2>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginTop: "24px", maxWidth: "500px" }}>
            <div style={{ width: 4, height: 56, background: `linear-gradient(${AMBER_LT}, ${AMBER}55)`, borderRadius: 4, flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: 1.8, color: OLIVE_MID, margin: 0, opacity: 0.85 }}>
              Professional credentials earned through structured training, hands-on projects, and industry exams — each one a milestone.
            </p>
          </div>

          {/* Stats strip */}
          <div className="stats-strip">
            {[
              { num: `${certifications.length}`, label: "Total Certs" },
              { num: `${certifications.filter(c => c.verified).length}`, label: "Verified" },
              { num: "360+", label: "Training Hrs" },
            ].map(({ num, label }, i) => (
              <div className="stat-cell" key={label}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "26px", color: OLIVE_DEEP, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "4px" }}>{num}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: OLIVE_SOFT, opacity: 0.65 }}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="certs-grid">
          {certifications.map((cert, i) => <CertCard key={cert.id} cert={cert} index={i} />)}
        </div>

        {/* Bottom dot matrix */}
        <div aria-hidden style={{ display: "grid", gridTemplateColumns: "repeat(12, 10px)", gap: "8px", opacity: 0.15, marginTop: "48px", position: "relative", zIndex: 1 }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} style={{
              width: i % 4 === 0 ? "5px" : "3px",
              height: i % 4 === 0 ? "5px" : "3px",
              borderRadius: "50%",
              background: i % 5 === 0 ? AMBER : OLIVE_SOFT,
              display: "block", alignSelf: "center", justifySelf: "center",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;