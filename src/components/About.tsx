import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const warmLight: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': { color: "#283618", background: "none" },
  'pre[class*="language-"]':  { color: "#283618", background: "none" },
  comment:        { color: "#8a9070", fontStyle: "italic" },
  punctuation:    { color: "#606C38" },
  property:       { color: "#BC6C25" },
  string:         { color: "#606C38" },
  number:         { color: "#BC6C25" },
  boolean:        { color: "#BC6C25" },
  keyword:        { color: "#283618", fontWeight: "600" },
  "attr-name":    { color: "#606C38" },
  "attr-value":   { color: "#BC6C25" },
  function:       { color: "#BC6C25", fontWeight: "600" },
  "class-name":   { color: "#283618", fontWeight: "700" },
  operator:       { color: "#606C38" },
  variable:       { color: "#283618" },
  "template-string": { color: "#606C38" },
};

const code = `const ARONAGENT = {
  callSign: "Spring Boot Specialist 🌱",
  specialization: "Microservices & AI Integration",
  currentMission: "Crafting Intelligent Backend APIs",
  stack: ["Java", "Spring Boot", "Python", "Docker", "Kafka"],
  status: "ACTIVE_DEVELOPMENT",
  nextEvolution: "AI-Driven System Designer"
};
console.log(\`\${ARONAGENT.callSign} bootstrapped! 🚀\`);`;

const socials = [
  { icon: Github,       href: "https://github.com/ARONAGENT",     label: "GitHub"   },
  { icon: Linkedin,     href: "https://linkedin.com/in/ARONAGENT", label: "LinkedIn" },
  { icon: ExternalLink, href: "https://leetcode.com/u/Aron20kk/",  label: "LeetCode" },
];

const facts = [
  { num: "10+", label: "Projects Shipped" },
  { num: "3+",  label: "Years Building"   },
  { num: "5+",  label: "Tech Stacks"      },
];

const About = () => (
  <section id="about" style={{ background: "#FEFAE0", padding: 0, overflow: "hidden" }}>

    {/* Label bar */}
    <div style={{ background: "#283618", padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", color: "#FEFAE0", textTransform: "uppercase" as const, opacity: 0.7 }}>✦ Section 01</span>
      <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: "0.14em", color: "#DDA15E", textTransform: "uppercase" as const }}>About Me</span>
      <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", color: "#FEFAE0", textTransform: "uppercase" as const, opacity: 0.7 }}>Backend Engineer ✦</span>
    </div>

    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 24px 80px" }}>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
        style={{ marginBottom: "48px", position: "relative" }}
      >
        <span aria-hidden style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "clamp(64px,12vw,160px)", color: "rgba(96,108,56,0.07)", lineHeight: 1, letterSpacing: "-0.04em", position: "absolute", top: -16, left: -6, userSelect: "none" as const, pointerEvents: "none" as const }}>WHO</span>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "clamp(32px,5vw,60px)", color: "#283618", letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0, position: "relative", zIndex: 1 }}>
          Passionate
          <span style={{ display: "block", color: "#BC6C25", fontStyle: "italic", fontFamily: "'DM Serif Display',serif" }}>Backend Developer.</span>
        </h2>
      </motion.div>

      {/* Two-col → single col on mobile */}
      <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>

        {/* LEFT — code card */}
        <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
          <div style={{ background: "#fff", border: "1.5px solid rgba(96,108,56,0.18)", borderRadius: "0 0 16px 16px", overflow: "hidden", boxShadow: "4px 10px 32px rgba(40,54,24,0.08)" }}>
            {/* Title bar */}
            <div style={{ background: "#283618", padding: "11px 16px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#BC6C25", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#DDA15E", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#606C38", display: "inline-block" }} />
              <span style={{ marginLeft: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "rgba(254,250,224,0.5)", letterSpacing: "0.04em" }}>aronagent.config.ts</span>
            </div>
            {/* Code */}
            <div style={{ padding: "20px", background: "#fdf8ec", overflowX: "auto" }}>
              <SyntaxHighlighter language="typescript" style={warmLight}
                customStyle={{ margin: 0, padding: 0, background: "transparent", fontSize: "12px", lineHeight: "1.7", fontFamily: "'JetBrains Mono',monospace", minWidth: "280px" }}
                wrapLines>
                {code}
              </SyntaxHighlighter>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", marginTop: 16, border: "1.5px solid rgba(96,108,56,0.18)", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
            {facts.map(({ num, label }, i) => (
              <div key={label} style={{ padding: "18px 12px", textAlign: "center" as const, borderRight: i < 2 ? "1px solid rgba(96,108,56,0.12)" : "none" }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 26, color: "#283618", letterSpacing: "-0.03em", display: "block", lineHeight: 1, marginBottom: 4 }}>{num}</span>
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 9, color: "#888670", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — bio */}
        <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22,1,0.36,1] }}
          style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Pull quote */}
          <div style={{ borderLeft: "4px solid #DDA15E", paddingLeft: 18 }}>
            <p style={{ fontFamily: "'DM Serif Display',serif", fontStyle: "italic", fontSize: "clamp(17px,2vw,22px)", color: "#283618", lineHeight: 1.45, margin: 0 }}>
              "Building systems that think, scale, and outlast the hype."
            </p>
          </div>

          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, lineHeight: 1.8, color: "#3d4a22", margin: 0 }}>
            I'm <strong style={{ color: "#283618" }}>Rohan</strong> — a backend engineer specializing in microservices architecture and scalable distributed systems. I build enterprise-grade APIs with Spring Boot and Spring Cloud, integrate AI models via RAG pipelines, and design event-driven flows with Apache Kafka.
          </p>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, lineHeight: 1.8, color: "#3d4a22", margin: 0 }}>
            Currently evolving into an <strong style={{ color: "#BC6C25" }}>AI-Driven System Designer</strong> — shipping systems that are not just functional, but intelligent by architecture.
          </p>

          <a href="mailto:rohanuke1@gmail.com" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#BC6C25", textDecoration: "none", letterSpacing: "0.04em" }}>
            <Mail size={14} color="#BC6C25" /> rohanuke1@gmail.com
          </a>

          <div style={{ height: 1.5, background: "rgba(96,108,56,0.15)" }} />

          {/* Social links */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 16px", background: "#fff", border: "1.5px solid rgba(96,108,56,0.22)", borderRadius: 4, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 13, color: "#283618", textDecoration: "none", transition: "all .18s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#BC6C25"; e.currentTarget.style.color = "#BC6C25"; e.currentTarget.style.background = "rgba(188,108,37,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(96,108,56,0.22)"; e.currentTarget.style.color = "#283618"; e.currentTarget.style.background = "#fff"; }}
              ><Icon size={14} />{label}</a>
            ))}
          </div>

          {/* Dot grid */}
          <div aria-hidden style={{ display: "grid", gridTemplateColumns: "repeat(8,10px)", gap: 8, opacity: 0.2 }}>
            {Array.from({ length: 32 }).map((_, i) => <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#606C38", display: "block" }} />)}
          </div>
        </motion.div>
      </div>
    </div>

    {/* ── Responsive ── */}
    <style>{`
      @media (max-width: 768px) {
        .about-grid {
          grid-template-columns: 1fr !important;
          gap: 32px !important;
        }
      }
    `}</style>
  </section>
);

export default About;