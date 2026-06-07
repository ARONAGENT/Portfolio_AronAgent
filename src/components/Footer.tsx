import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const OLIVE_DEEP = "#283618";
const OLIVE_SOFT = "#606C38";
const AMBER      = "#BC6C25";
const AMBER_LT   = "#DDA15E";
const CREAM      = "#FEFAE0";

const socials = [
  { icon: Github,       href: "https://github.com/ARONAGENT",        label: "GitHub"   },
  { icon: Linkedin,     href: "https://linkedin.com/in/ARONAGENT",   label: "LinkedIn" },
  { icon: Mail,         href: "mailto:rohanuke1@gmail.com",           label: "Email"    },
  { icon: ExternalLink, href: "https://leetcode.com/u/Aron20kk/",    label: "LeetCode" },
];

const Footer = () => (
  <footer style={{ background: OLIVE_DEEP, overflow: "hidden" }}>

    {/* Top amber accent line */}
    <div style={{ height: "3px", background: `linear-gradient(90deg, ${AMBER}, ${AMBER_LT}, ${AMBER})` }} />

    {/* Main footer body */}
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 40px 36px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "40px", alignItems: "end" }}>

        {/* LEFT — brand + tagline */}
        <div>
          <div style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 900,
            fontSize: "24px", letterSpacing: "-0.04em",
            color: CREAM, marginBottom: "8px",
          }}>
            ARON<span style={{ color: AMBER_LT }}>AGENT</span>
          </div>
          <p style={{
            fontFamily: "'DM Serif Display', serif", fontStyle: "italic",
            fontSize: "15px", color: "rgba(254,250,224,0.5)",
            lineHeight: 1.6, margin: "0 0 24px", maxWidth: "340px",
          }}>
            "Code is poetry, architecture is art, and innovation is the masterpiece."
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: "36px", height: "36px", borderRadius: "6px",
                  background: "rgba(254,250,224,0.07)",
                  border: "1px solid rgba(254,250,224,0.12)",
                  color: "rgba(254,250,224,0.55)",
                  textDecoration: "none",
                  transition: "background 0.18s, border-color 0.18s, color 0.18s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${AMBER}22`;
                  e.currentTarget.style.borderColor = `${AMBER}55`;
                  e.currentTarget.style.color = AMBER_LT;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(254,250,224,0.07)";
                  e.currentTarget.style.borderColor = "rgba(254,250,224,0.12)";
                  e.currentTarget.style.color = "rgba(254,250,224,0.55)";
                }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — quick nav */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
          {["About", "Skills", "Projects", "Certifications", "Contact"].map(item => (
            <button key={item}
              onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
                fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" as const,
                color: "rgba(254,250,224,0.45)", background: "transparent", border: "none",
                cursor: "pointer", padding: 0, transition: "color 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = AMBER_LT; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(254,250,224,0.45)"; }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Bottom strip */}
    <div style={{
      borderTop: "1px solid rgba(254,250,224,0.08)",
      padding: "14px 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: "8px",
      maxWidth: "100%",
    }}>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
        color: "rgba(254,250,224,0.3)", letterSpacing: "0.08em",
      }}>
        © 2026 Rohan Uke — ARONAGENT. Built with passion for innovation.
      </span>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
        color: "rgba(254,250,224,0.2)", letterSpacing: "0.06em",
      }}>
        Amravati, Maharashtra, India
      </span>
    </div>
  </footer>
);

export default Footer;