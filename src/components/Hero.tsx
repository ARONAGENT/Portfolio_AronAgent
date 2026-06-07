import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, ArrowRight } from "lucide-react";
import profileImg from "@/assets/profile.png";

const roles = ["Spring Boot Specialist","Microservices Architect","AI Integration Engineer","Backend Systems Builder","Cloud Native Developer"];
const MARQUEE = ["Spring Boot","Microservices","REST APIs","AI Integration","Cloud Native","Docker","PostgreSQL","LangChain","Open Source","Backend Systems"];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); }
};

export default function Hero() {
  const [roleIndex,   setRoleIndex]   = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting,  setIsDeleting]  = useState(false);
  const [views,       setViews]       = useState<number | null>(null);

  useEffect(() => {
    const cur = roles[roleIndex];
    const t = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(cur.slice(0, displayText.length + 1));
        if (displayText.length === cur.length) setTimeout(() => setIsDeleting(true), 1500);
      } else {
        setDisplayText(cur.slice(0, displayText.length - 1));
        if (displayText.length === 0) { setIsDeleting(false); setRoleIndex(p => (p + 1) % roles.length); }
      }
    }, isDeleting ? 38 : 78);
    return () => clearTimeout(t);
  }, [displayText, isDeleting, roleIndex]);

  useEffect(() => {
    fetch("https://api.counterapi.dev/v1/portfolio-aronagent/views/up")
      .then(r => r.json()).then(d => setViews(d.count)).catch(() => setViews(null));
  }, []);

  return (
    <>
      <section id="hero" style={{ minHeight: "100vh", background: "#FEFAE0", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>

        {/* Deco shapes */}
        <div aria-hidden style={{ position: "absolute", width: "min(580px,60vw)", height: "min(580px,60vw)", borderRadius: "50%", background: "#DDA15E", top: "-18%", right: "-12%", zIndex: 1, opacity: 0.88 }} />
        <div aria-hidden style={{ position: "absolute", width: "160px", height: "160px", borderRadius: "50%", border: "2.5px solid #BC6C25", bottom: "18%", right: "6%", zIndex: 3, opacity: 0.4 }} />
        <div aria-hidden style={{ position: "absolute", width: "56px", height: "56px", border: "2.5px solid #606C38", borderRadius: "10px", transform: "rotate(22deg)", top: "130px", left: "5%", zIndex: 2, opacity: 0.18 }} />
        <div aria-hidden style={{ position: "absolute", width: "100px", height: "100px", borderRadius: "50%", background: "#606C38", bottom: "50px", left: "2%", zIndex: 1, opacity: 0.09 }} />

        {/* Content */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", position: "relative", zIndex: 5, width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "100px 24px 48px" }}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "48px", alignItems: "center", width: "100%" }}
            className="hero-grid-wrap">

            {/* LEFT */}
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>

              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#BC6C25", display: "inline-block" }} />
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.13em", color: "#BC6C25", textTransform: "uppercase" as const }}>Backend Architect</span>
              </div>

              <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "clamp(48px,8vw,96px)", lineHeight: 0.9, letterSpacing: "-0.04em", color: "#283618", margin: "0 0 4px" }}>Rohan</h1>
              <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "clamp(48px,8vw,96px)", lineHeight: 0.9, letterSpacing: "-0.04em", color: "#BC6C25", margin: "0 0 24px" }}>Uke.</h1>

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ width: 32, height: 1.5, background: "#606C38", opacity: 0.5, flexShrink: 0, display: "inline-block" }} />
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, color: "#606C38", letterSpacing: "0.04em", minHeight: 22 }}>
                  {displayText}
                  <span style={{ display: "inline-block", width: 2, height: "1em", background: "#BC6C25", marginLeft: 2, verticalAlign: "text-bottom", animation: "blink .8s step-start infinite" }} />
                </span>
              </div>

              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, lineHeight: 1.78, color: "#3d4a22", maxWidth: 420, marginBottom: 28 }}>
                Crafting intelligent backend systems that scale, integrating AI into modern cloud-native applications, and building high-performance APIs with clean architecture.
              </p>

              {/* Buttons */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const, marginBottom: 24 }}>
                <button
                  onClick={() => scrollTo("projects")}
                  style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.04em", color: "#FEFAE0", background: "#283618", border: "2px solid #283618", padding: "12px 26px", borderRadius: 4, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7, transition: "all .18s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#BC6C25"; e.currentTarget.style.borderColor = "#BC6C25"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#283618"; e.currentTarget.style.borderColor = "#283618"; }}
                >View Projects <ArrowRight size={15} /></button>

                <button
                  onClick={() => scrollTo("contact")}
                  style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.04em", color: "#283618", background: "transparent", border: "2px solid #283618", padding: "12px 26px", borderRadius: 4, cursor: "pointer", transition: "all .18s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#BC6C25"; e.currentTarget.style.color = "#BC6C25"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#283618"; e.currentTarget.style.color = "#283618"; }}
                >Contact Me</button>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 7, marginBottom: 18 }}>
                {["10+ Projects","Java & Spring Boot","AI Integration","Open Source"].map(t => (
                  <span key={t} style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.06em", color: "#606C38", padding: "5px 13px", borderRadius: 99, border: "1.5px solid rgba(96,108,56,0.3)", background: "rgba(96,108,56,0.07)" }}>{t}</span>
                ))}
              </div>

              {views !== null && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 15px", borderRadius: 99, border: "1.5px solid rgba(188,108,37,0.28)", background: "rgba(188,108,37,0.07)" }}>
                    <Eye size={14} color="#BC6C25" />
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: "#3d4a22" }}>
                      <strong style={{ color: "#BC6C25" }}>{views.toLocaleString()}+</strong> portfolio views
                    </span>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#606C38", display: "inline-block", animation: "pulse 1.5s infinite" }} />
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* RIGHT — profile card */}
            <motion.div
              className="hero-right-panel"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22,1,0.36,1] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, flexShrink: 0 }}
            >
              {/* Larger card — 340×400 to show laptop */}
              <div className="hero-float" style={{ position: "relative", width: 340, height: 400 }}>
                {/* Rotating amber square frame */}
                <div style={{ position: "absolute", inset: -12, border: "2.5px solid #DDA15E", borderRadius: 22, transform: "rotate(5deg)", opacity: 0.55, zIndex: 0 }} />
                {/* Inner rotated frame */}
                <div style={{ position: "absolute", inset: -5, border: "1.5px solid #BC6C25", borderRadius: 18, transform: "rotate(-3deg)", opacity: 0.3, zIndex: 0 }} />

                {/* Image */}
                <div style={{ width: 340, height: 400, borderRadius: 18, overflow: "hidden", background: "#283618", boxShadow: "0 24px 70px rgba(40,54,24,0.28)", position: "relative", zIndex: 1 }}>
                  <img
                    src={profileImg}
                    alt="Rohan Uke"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      /* shifted down so laptop is visible, face stays in frame */
                      objectPosition: "center 15%",
                      display: "block",
                    }}
                  />
                  {/* Name overlay */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(40,54,24,0.92) 0%, transparent 100%)", padding: "32px 16px 16px" }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15, color: "#FEFAE0", letterSpacing: "-0.02em" }}>Rohan Uke</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#DDA15E", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginTop: 2 }}>Backend Engineer</div>
                  </div>
                </div>

                {/* Available badge */}
                <div style={{ position: "absolute", top: -10, right: -14, zIndex: 10, background: "#DDA15E", color: "#283618", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 10, letterSpacing: "0.1em", padding: "5px 12px", borderRadius: 99, textTransform: "uppercase" as const, boxShadow: "0 4px 14px rgba(188,108,37,0.4)", whiteSpace: "nowrap" as const }}>● Available</div>
                {/* Decorative dot */}
                <div style={{ position: "absolute", bottom: -12, left: -12, width: 24, height: 24, borderRadius: "50%", background: "#606C38", opacity: 0.55, zIndex: 0 }} />
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: 8 }}>
                {[{ n: "10+", l: "Projects" }, { n: views ? `${(views/1000).toFixed(1)}k` : "—", l: "Views" }].map(({ n, l }) => (
                  <div key={l} style={{ background: "#fff", border: "1.5px solid rgba(96,108,56,0.18)", borderRadius: 10, padding: "10px 16px", textAlign: "center" as const, minWidth: 70 }}>
                    <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: "#283618", letterSpacing: "-0.03em", display: "block", lineHeight: 1, marginBottom: 3 }}>{n}</span>
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 9, color: "#888670", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{l}</span>
                  </div>
                ))}
              </div>

              {/* Pills */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const, justifyContent: "center", maxWidth: 280 }}>
                {["Java","Docker","AWS","LangChain"].map(s => (
                  <span key={s} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#606C38", letterSpacing: "0.06em", padding: "4px 11px", border: "1.5px solid rgba(96,108,56,0.28)", borderRadius: 99, background: "rgba(96,108,56,0.07)" }}>{s}</span>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* Marquee */}
        <div style={{ background: "#283618", overflow: "hidden", padding: "11px 0", zIndex: 5 }}>
          <div style={{ display: "flex", whiteSpace: "nowrap" as const, animation: "marq 22s linear infinite" }}>
            {[...MARQUEE,...MARQUEE].map((item, i) => (
              <span key={i} style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 12, color: "#FEFAE0", letterSpacing: "0.12em", textTransform: "uppercase" as const, padding: "0 28px", opacity: 0.72 }}>
                <span style={{ color: "#DDA15E", marginRight: 8, fontSize: 14 }}>✦</span>{item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.55;transform:scale(.82)} }
        @keyframes marq  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .hero-float { animation: float 3.4s ease-in-out infinite; }

        /* ── Tablet: shrink card a bit ── */
        @media (max-width: 1100px) {
          .hero-right-panel .hero-float { width: 290px !important; height: 340px !important; }
          .hero-right-panel .hero-float > div:nth-child(3) { width: 290px !important; height: 340px !important; }
        }

        /* ── Mobile: stack layout, show compact image on top ── */
        @media (max-width: 768px) {
          .hero-grid-wrap {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
            padding: 80px 20px 40px !important;
          }

          /* Re-order: image first on mobile */
          .hero-right-panel {
            order: -1;
            display: flex !important;
            margin-bottom: 32px;
          }

          /* Smaller card on mobile */
          .hero-right-panel .hero-float {
            width: 200px !important;
            height: 240px !important;
          }
          .hero-right-panel .hero-float > div:nth-child(3) {
            width: 200px !important;
            height: 240px !important;
          }

          /* Hide stats + pills on mobile to keep it clean */
          .hero-right-panel > div:not(.hero-float) {
            display: none !important;
          }
        }

        @media (max-width: 480px) {
          .hero-right-panel .hero-float {
            width: 170px !important;
            height: 200px !important;
          }
          .hero-right-panel .hero-float > div:nth-child(3) {
            width: 170px !important;
            height: 200px !important;
          }
        }
      `}</style>
    </>
  );
}