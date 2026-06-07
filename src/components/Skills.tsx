import { motion } from "framer-motion";

const skillGroups = [
  { num: "01", title: "Backend Fortress",  subtitle: "Core engineering layer",   color: "#283618", accent: "#DDA15E", skills: ["Java","Spring Boot","Hibernate","JWT","Maven","Gradle"] },
  { num: "02", title: "Data Vaults",       subtitle: "Persistence & caching",    color: "#BC6C25", accent: "#FEFAE0", skills: ["MySQL","PostgreSQL","MongoDB","Redis"] },
  { num: "03", title: "Cloud Command",     subtitle: "Infrastructure & ops",     color: "#606C38", accent: "#DDA15E", skills: ["Docker","Kubernetes","Apache Kafka","AWS","Git"] },
  { num: "04", title: "AI & Data Lab",     subtitle: "Intelligence pipeline",    color: "#DDA15E", accent: "#283618", skills: ["Python","Pandas","TensorFlow","Power BI","Spring AI"] },
];

const allSkills = [
  { name: "Spring Boot", pct: 95, cat: "backend" },
  { name: "Java",        pct: 92, cat: "backend" },
  { name: "Docker",      pct: 85, cat: "cloud"   },
  { name: "Apache Kafka",pct: 78, cat: "cloud"   },
  { name: "PostgreSQL",  pct: 88, cat: "data"    },
  { name: "Python",      pct: 80, cat: "ai"      },
  { name: "Spring AI",   pct: 72, cat: "ai"      },
  { name: "Kubernetes",  pct: 70, cat: "cloud"   },
];

const catColor: Record<string,string> = { backend: "#283618", cloud: "#606C38", data: "#BC6C25", ai: "#DDA15E" };

const Skills = () => (
  <section id="skills" style={{ background: "#FEFAE0", overflow: "hidden", padding: 0 }}>

    {/* Label bar */}
    <div style={{ background: "#BC6C25", padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", color: "#FEFAE0", textTransform: "uppercase" as const, opacity: 0.8 }}>✦ Section 02</span>
      <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: "0.14em", color: "#FEFAE0", textTransform: "uppercase" as const }}>Tech Arsenal</span>
      <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", color: "#FEFAE0", textTransform: "uppercase" as const, opacity: 0.8 }}>Skills & Stack ✦</span>
    </div>

    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 24px 80px" }}>

      {/* Heading */}
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
        style={{ marginBottom: "56px", position: "relative" }}>
        <span aria-hidden style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "clamp(64px,12vw,160px)", color: "rgba(96,108,56,0.07)", lineHeight: 1, letterSpacing: "-0.04em", position: "absolute", top: -20, left: -6, userSelect: "none" as const, pointerEvents: "none" as const }}>STACK</span>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "clamp(32px,5vw,60px)", color: "#283618", letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 14px", position: "relative", zIndex: 1 }}>
          The tools I<span style={{ color: "#BC6C25", fontStyle: "italic", fontFamily: "'DM Serif Display',serif", marginLeft: 12 }}>master.</span>
        </h2>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, color: "#3d4a22", lineHeight: 1.7, maxWidth: 480, margin: 0, position: "relative", zIndex: 1 }}>
          Four pillars of the stack — from deep backend engineering to the cutting edge of AI integration.
        </p>
      </motion.div>

      {/* Skill group cards — 2 col desktop, 1 col mobile */}
      <div className="skills-card-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginBottom: 48 }}>
        {skillGroups.map((group, i) => (
          <motion.div key={group.title}
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.6, ease: [0.22,1,0.36,1] }}>
            <div style={{ background: group.color, borderRadius: 16, padding: "28px 24px", position: "relative", overflow: "hidden", cursor: "default", transition: "transform .22s, box-shadow .22s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 50px rgba(40,54,24,0.18)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>

              {/* Ghost num */}
              <span aria-hidden style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 110, color: "rgba(255,255,255,0.05)", position: "absolute", right: -8, top: -16, lineHeight: 1, letterSpacing: "-0.06em", userSelect: "none" as const }}>{group.num}</span>

              {/* Num pill */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)", borderRadius: 99, padding: "4px 12px", marginBottom: 18 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, fontSize: 11, color: group.accent, letterSpacing: "0.1em" }}>{group.num}</span>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: group.accent, opacity: 0.7, display: "inline-block" }} />
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 10, color: group.accent, opacity: 0.75, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{group.subtitle}</span>
              </div>

              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: group.accent, letterSpacing: "-0.02em", margin: "0 0 16px", lineHeight: 1.1 }}>{group.title}</h3>
              <div style={{ height: 1, background: `${group.accent}25`, marginBottom: 16 }} />
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 7 }}>
                {group.skills.map(skill => (
                  <span key={skill} style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 500, fontSize: 11, color: group.accent, padding: "4px 12px", borderRadius: 4, border: `1px solid ${group.accent}40`, background: `${group.accent}10`, letterSpacing: "0.04em" }}>{skill}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Proficiency bars */}
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
        style={{ background: "#fff", border: "1.5px solid rgba(96,108,56,0.15)", borderRadius: 20, padding: "32px 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap" as const, gap: 12 }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: "#283618", letterSpacing: "-0.02em", margin: 0 }}>Proficiency</h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
            {[{ label: "Backend", color: "#283618" },{ label: "Cloud", color: "#606C38" },{ label: "Data", color: "#BC6C25" },{ label: "AI", color: "#DDA15E" }].map(({ label, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block" }} />
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 11, color: "#888670", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {allSkills.map((skill, i) => (
            <motion.div key={skill.name}
              initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
              style={{ display: "flex", alignItems: "center", gap: 12 }}>

              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 500, fontSize: 12, color: "#3d4a22", width: "120px", flexShrink: 0, letterSpacing: "0.02em" }}
                className="skill-name-resp">
                {skill.name}
              </span>

              <div style={{ flex: 1, height: 6, background: "rgba(96,108,56,0.1)", borderRadius: 99, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }} whileInView={{ width: `${skill.pct}%` }}
                  viewport={{ once: true }} transition={{ delay: i * 0.06 + 0.2, duration: 0.8, ease: [0.22,1,0.36,1] }}
                  style={{ height: "100%", background: catColor[skill.cat], borderRadius: 99 }}
                />
              </div>

              <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 13, color: catColor[skill.cat], width: 36, textAlign: "right" as const, flexShrink: 0 }}>
                {skill.pct}%
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>

    <style>{`
      @media (max-width: 640px) {
        .skills-card-grid { grid-template-columns: 1fr !important; }
        .skill-name-resp   { width: 90px !important; font-size: 11px !important; }
      }
    `}</style>
  </section>
);

export default Skills;