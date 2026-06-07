import { motion } from "framer-motion";
import { Download, FileText, ExternalLink, RefreshCw } from "lucide-react";

const OLIVE_DEEP = "#283618";
const OLIVE_MID  = "#3d4a22";
const OLIVE_SOFT = "#606C38";
const AMBER      = "#BC6C25";
const AMBER_LT   = "#DDA15E";
const CREAM      = "#FEFAE0";
const BORDER     = "rgba(96,108,56,0.18)";

const DRIVE_SHARE_URL = "https://drive.google.com/file/d/19AyrdLyAXqWgRlUFg6uRe9ua6NvA1BMz/view?usp=sharing";
const RESUME_FILENAME = "Rohan_Uke_Resume_June2026.pdf";
const LAST_UPDATED    = "June 2026";

const toEmbedUrl = (url: string) => {
  const m = url.match(/\/file\/d\/([^/?]+)/);
  return m ? `https://drive.google.com/file/d/${m[1]}/preview` : url;
};
const toDownloadUrl = (url: string) => {
  const m = url.match(/\/file\/d\/([^/?]+)/);
  return m ? `https://drive.google.com/uc?export=download&id=${m[1]}` : url;
};

const embedUrl    = toEmbedUrl(DRIVE_SHARE_URL);
const downloadUrl = toDownloadUrl(DRIVE_SHARE_URL);

const Resume = () => (
  <section id="resume" style={{ background: CREAM, padding: "0", overflow: "hidden" }}>

    {/* Label bar */}
    <div style={{
      background: OLIVE_DEEP, padding: "10px 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.18em", color: CREAM, textTransform: "uppercase" as const, opacity: 0.7 }}>✦ Section 07</span>
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "11px", letterSpacing: "0.14em", color: AMBER_LT, textTransform: "uppercase" as const }}>Resume</span>
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.18em", color: CREAM, textTransform: "uppercase" as const, opacity: 0.7 }}>Always Updated ✦</span>
    </div>

    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 40px 100px", position: "relative" }}>

      {/* Ghost watermark */}
      <span aria-hidden style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 900,
        fontSize: "clamp(80px,14vw,160px)", color: "rgba(96,108,56,0.04)",
        lineHeight: 1, letterSpacing: "-0.04em",
        position: "absolute", top: "54px", right: "-8px",
        userSelect: "none" as const, pointerEvents: "none" as const,
      }}>CV</span>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
        style={{ marginBottom: "48px", position: "relative", zIndex: 1 }}
      >
        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 900,
          fontSize: "clamp(36px,5vw,60px)", color: OLIVE_DEEP,
          letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0,
        }}>
          My
          <span style={{ color: AMBER, fontStyle: "italic", fontFamily: "'DM Serif Display', serif", marginLeft: "14px" }}>
            Résumé.
          </span>
        </h2>
        <div style={{ borderLeft: `4px solid ${AMBER_LT}`, paddingLeft: "20px", marginTop: "22px", maxWidth: "500px" }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", lineHeight: 1.8, color: OLIVE_MID, margin: 0 }}>
            A snapshot of my skills, experience, and education — always up to date for recruiters and collaborators.
          </p>
        </div>
      </motion.div>

      {/* PDF viewer card */}
      <motion.div
        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1, ease: [0.22,1,0.36,1] }}
        style={{
          background: "#fff",
          border: `1.5px solid ${BORDER}`,
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(40,54,24,0.1)",
          position: "relative", zIndex: 1,
        }}
      >
        {/* Action bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 20px",
          background: OLIVE_DEEP,
          flexWrap: "wrap", gap: "12px",
        }}>
          {/* File info */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FileText size={15} color={AMBER_LT} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: CREAM, letterSpacing: "0.04em" }}>
              {RESUME_FILENAME}
            </span>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
              color: "rgba(254,250,224,0.45)", letterSpacing: "0.08em",
              marginLeft: "4px",
            }}>
              <RefreshCw size={9} /> Updated {LAST_UPDATED}
            </span>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a href={DRIVE_SHARE_URL} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 600,
                color: "rgba(254,250,224,0.6)", textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "color 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = AMBER_LT; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(254,250,224,0.6)"; }}
            >
              <ExternalLink size={13} /> Open in Drive
            </a>
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "8px 18px",
                background: AMBER_LT, color: OLIVE_DEEP,
                border: "none", borderRadius: "4px",
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase" as const,
                textDecoration: "none",
                transition: "background 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = AMBER; e.currentTarget.style.color = CREAM; }}
              onMouseLeave={e => { e.currentTarget.style.background = AMBER_LT; e.currentTarget.style.color = OLIVE_DEEP; }}
            >
              <Download size={13} /> Download
            </a>
          </div>
        </div>

        {/* Iframe */}
        <div style={{ width: "100%", height: "820px", background: "#f7f3e8" }}>
          <iframe
            src={embedUrl}
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            allow="autoplay"
            title="Rohan Uke Resume"
          >
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", height: "100%", gap: "20px", textAlign: "center", padding: "24px",
            }}>
              <FileText size={52} color={OLIVE_SOFT} style={{ opacity: 0.4 }} />
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "16px", color: OLIVE_DEEP }}>
                Preview unavailable
              </p>
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "12px 24px", background: OLIVE_DEEP, color: CREAM,
                  borderRadius: "4px", fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: "13px", textDecoration: "none",
                }}>
                <Download size={14} /> Download Resume
              </a>
            </div>
          </iframe>
        </div>

        {/* Bottom strip */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 20px",
          background: "#fdf8ec",
          borderTop: `1px solid ${BORDER}`,
          flexWrap: "wrap", gap: "8px",
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: OLIVE_SOFT, letterSpacing: "0.06em", opacity: 0.7 }}>
            Backend Engineer · Rohan Uke · Amravati, Maharashtra
          </span>
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", fontWeight: 700,
              color: AMBER, textDecoration: "none", letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
            }}>
            <Download size={11} /> Download PDF
          </a>
        </div>
      </motion.div>

      {/* Dots */}
      <div aria-hidden style={{ display: "grid", gridTemplateColumns: "repeat(12,10px)", gap: "8px", opacity: 0.18, marginTop: "48px" }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} style={{ width: "4px", height: "4px", borderRadius: "50%", background: OLIVE_SOFT, display: "block" }} />
        ))}
      </div>
    </div>
  </section>
);

export default Resume;