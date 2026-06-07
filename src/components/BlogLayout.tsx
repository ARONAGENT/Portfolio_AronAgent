import { ReactNode, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Palette ─── */
const C = {
  bg:        "#0C1208",
  bg2:       "#111509",
  surface:   "#161D10",
  surface2:  "#1C2416",
  green:     "#4A7C59",
  greenBr:   "#5E9970",
  greenDim:  "#2E4D38",
  brown:     "#BC6C25",
  brownLt:   "#DDA15E",
  cream:     "#FEFAE0",
  creamDim:  "rgba(254,250,224,0.45)",
  creamFaint:"rgba(254,250,224,0.07)",
  border:    "rgba(254,250,224,0.07)",
  borderGn:  "rgba(74,124,89,0.3)",
};

/* ─── 4-pointed star ─── */
const Star4 = ({ size = 14, color = C.brown, opacity = 1, spin = false }: {
  size?: number; color?: string; opacity?: number; spin?: boolean;
}) => (
  <motion.svg
    width={size} height={size} viewBox="0 0 24 24"
    style={{ opacity, flexShrink: 0 }}
    animate={spin ? { rotate: 360 } : {}}
    transition={spin ? { duration: 18, repeat: Infinity, ease: "linear" } : {}}
  >
    <path
      d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
      fill={color}
    />
  </motion.svg>
);

/* ─── Small eyebrow label ─── */
const Eyebrow = ({ children, color = C.green }: { children: ReactNode; color?: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <Star4 size={8} color={color} opacity={0.85} />
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "9px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color,
      opacity: 0.85,
    }}>
      {children}
    </span>
    <Star4 size={8} color={color} opacity={0.85} />
  </div>
);

interface TOCItem  { id: string; label: string; }
interface BlogLayoutProps {
  title:    string;
  tags:     string[];
  readTime: string;
  toc:      TOCItem[];
  children: ReactNode;
}

const BlogLayout = ({ title, tags, readTime, toc, children }: BlogLayoutProps) => {
  const [activeId, setActiveId] = useState("");
  const [scrollPct, setScrollPct] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  /* ── Active TOC tracking ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [toc]);

  /* ── Reading progress bar ── */
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const pct = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
      setScrollPct(Math.min(1, pct) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Split title ── */
  const words = title.split(" ");
  const greenWords = words.slice(0, 2).join(" ");
  const brownWords = words.slice(2).join(" ");

  return (
    <div style={{ background: C.bg, minHeight: "100vh", position: "relative", overflowX: "hidden" }}>

      {/* ── Reading progress bar ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, height: "2px",
        width: `${scrollPct}%`,
        background: `linear-gradient(90deg, ${C.green}, ${C.brown})`,
        zIndex: 9999, transition: "width 0.1s linear",
      }} />

      {/* ── Noise overlay ── */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        opacity: 0.4,
      }} />

      <div aria-hidden style={{ position: "fixed", top: "-100px", left: "-80px", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, rgba(74,124,89,0.07) 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden style={{ position: "fixed", bottom: "-80px", right: "-80px", width: "420px", height: "420px", borderRadius: "50%", background: `radial-gradient(circle, rgba(188,108,37,0.06) 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />

      <Navbar />

      {/* ══ HERO ══ */}
      <div ref={heroRef} style={{ position: "relative", zIndex: 1, borderBottom: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: `repeating-linear-gradient(-55deg, transparent, transparent 40px, rgba(74,124,89,0.025) 40px, rgba(74,124,89,0.025) 41px)`,
          pointerEvents: "none",
        }} />
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(254,250,224,0.055) 1px, transparent 1px)",
          backgroundSize: "26px 26px", pointerEvents: "none",
          maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
        }} />
        <div aria-hidden className="bl-ghost-bg" style={{
          position: "absolute", bottom: "-30px", right: "-20px",
          fontFamily: "'Syne', sans-serif", fontWeight: 900,
          fontSize: "clamp(80px, 14vw, 160px)", color: "rgba(254,250,224,0.018)",
          letterSpacing: "-0.06em", lineHeight: 1, userSelect: "none", pointerEvents: "none", whiteSpace: "nowrap",
        }}>BLOG</div>

        <div className="bl-hero-inner">
          {/* Back link */}
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ marginBottom: "28px" }}>
            <Link to="/" className="bl-back-link"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: C.creamDim, textDecoration: "none", border: `1px solid ${C.border}`, padding: "7px 14px", borderRadius: "3px", transition: "color 0.2s, border-color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = C.green; e.currentTarget.style.borderColor = C.greenBr; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = C.creamDim; e.currentTarget.style.borderColor = C.border; }}
            >
              <ArrowLeft size={12} /> Back to Portfolio
            </Link>
          </motion.div>

          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} style={{ marginBottom: "20px" }}>
            <Eyebrow>Technical Article</Eyebrow>
          </motion.div>

          {/* Title */}
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} style={{ marginBottom: "24px" }}>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(22px, 4.5vw, 58px)", lineHeight: 1.05, letterSpacing: "-0.04em", margin: 0 }}>
              <span style={{ color: C.greenBr }}>{greenWords} </span>
              <span style={{ color: C.brown }}>{brownWords}</span>
            </h1>
          </motion.div>

          {/* Tags + meta */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
            {tags.map((t) => (
              <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 11px", borderRadius: "2px", border: `1px solid ${C.greenDim}`, color: C.greenBr, background: "rgba(74,124,89,0.08)" }}>
                {t}
              </span>
            ))}
            <span style={{ width: "1px", height: "16px", background: C.border, display: "inline-block" }} />
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: C.creamDim, letterSpacing: "0.06em" }}>
              <Clock size={11} style={{ color: C.brown }} /> {readTime}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: C.creamDim, letterSpacing: "0.06em" }}>
              <User size={11} style={{ color: C.green }} /> Rohan Uke — ARONAGENT
            </span>
          </motion.div>

          {/* Mobile TOC toggle */}
          {toc.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="bl-toc-mobile-btn-wrap">
              <button
                onClick={() => setTocOpen(o => !o)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  marginTop: "20px",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: tocOpen ? C.greenBr : C.creamDim,
                  background: "transparent",
                  border: `1px solid ${tocOpen ? C.greenBr : C.border}`,
                  padding: "8px 16px", borderRadius: "3px", cursor: "pointer",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                <Star4 size={8} color={tocOpen ? C.green : C.creamDim} opacity={0.8} />
                {tocOpen ? "Hide" : "Show"} Contents ({toc.length})
              </button>

              {tocOpen && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
                  style={{ marginTop: "12px", padding: "16px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "6px" }}>
                  {toc.map(({ id, label }, i) => (
                    <a key={id} href={`#${id}`} onClick={() => setTocOpen(false)}
                      style={{ display: "flex", alignItems: "center", gap: "10px", padding: "7px 0", textDecoration: "none", borderBottom: i < toc.length - 1 ? `1px solid ${C.border}` : "none" }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: C.brown, minWidth: "18px" }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.04em", color: C.creamDim, lineHeight: 1.4 }}>{label}</span>
                    </a>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${C.green}, ${C.brown}, transparent)`, opacity: 0.4 }} />
      </div>

      {/* ══ BODY ══ */}
      <div className="bl-body-wrap">

        {/* Desktop TOC sidebar */}
        <aside className="bl-toc-sidebar">
          <div style={{ position: "sticky", top: "96px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", paddingBottom: "12px", borderBottom: `1px solid ${C.border}` }}>
              <Star4 size={9} color={C.green} opacity={0.7} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: C.creamDim, opacity: 0.6 }}>Contents</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {toc.map(({ id, label }, i) => {
                const isActive = activeId === id;
                return (
                  <a key={id} href={`#${id}`}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px 8px 12px", textDecoration: "none", borderLeft: `2px solid ${isActive ? C.green : C.border}`, transition: "border-color 0.25s, color 0.25s", position: "relative" }}>
                    {isActive && (
                      <motion.span layoutId="tocDot" style={{ position: "absolute", left: "-5px", width: "8px", height: "8px", borderRadius: "1px", background: C.green, transform: "rotate(45deg)", display: "block", flexShrink: 0 }} />
                    )}
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.05em", color: isActive ? C.greenBr : "rgba(254,250,224,0.3)", transition: "color 0.25s", lineHeight: 1.4 }}>
                      <span style={{ color: isActive ? C.brown : "rgba(254,250,224,0.18)", marginRight: "6px" }}>{String(i + 1).padStart(2, "0")}</span>
                      {label}
                    </span>
                  </a>
                );
              })}
            </div>
            <div style={{ marginTop: "28px", display: "flex", justifyContent: "center" }}>
              <Star4 size={18} color={C.greenDim} opacity={0.4} spin />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: 1, minWidth: 0, maxWidth: "820px" }}
          className="blog-prose"
        >
          {children}
        </motion.div>
      </div>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=JetBrains+Mono:wght@400;500&family=DM+Sans:wght@400;500&display=swap');

        /* ── Layout shells ── */
        .bl-hero-inner {
          max-width: 1300px;
          margin: 0 auto;
          padding: 100px 56px 56px;
        }

        .bl-body-wrap {
          max-width: 1300px;
          margin: 0 auto;
          padding: 52px 56px 80px;
          position: relative;
          z-index: 1;
          display: flex;
          gap: 52px;
          align-items: flex-start;
        }

        /* Desktop TOC: visible */
        .bl-toc-sidebar {
          display: block;
          width: 210px;
          flex-shrink: 0;
        }

        /* Mobile TOC toggle: hidden on desktop */
        .bl-toc-mobile-btn-wrap {
          display: none;
        }

        /* Ghost background text: show on desktop */
        .bl-ghost-bg {
          display: block;
        }

        /* ── Responsive ── */

        @media (max-width: 1024px) {
          .bl-hero-inner { padding: 80px 32px 48px; }
          .bl-body-wrap { padding: 40px 32px 60px; gap: 36px; }
          .bl-toc-sidebar { width: 180px; }
        }

        @media (max-width: 768px) {
          .bl-hero-inner { padding: 72px 20px 40px; }
          .bl-body-wrap { padding: 32px 20px 52px; flex-direction: column; gap: 0; }
          /* Hide desktop TOC on mobile */
          .bl-toc-sidebar { display: none; }
          /* Show mobile TOC toggle */
          .bl-toc-mobile-btn-wrap { display: block; }
          .bl-ghost-bg { display: none; }
        }

        @media (max-width: 540px) {
          .bl-hero-inner { padding: 60px 16px 36px; }
          .bl-body-wrap { padding: 24px 16px 48px; }
          .bl-back-link { font-size: 9px !important; padding: 6px 12px !important; }
        }

        /* ── Prose styles ── */
        .blog-prose h2 {
          font-family: 'Syne', sans-serif !important;
          font-weight: 900 !important;
          font-size: clamp(17px, 2.2vw, 24px) !important;
          color: ${C.cream} !important;
          letter-spacing: -0.03em !important;
          line-height: 1.15 !important;
          margin-bottom: 18px !important;
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
        }
        .blog-prose h2::before {
          content: '';
          display: inline-block;
          width: 3px;
          height: 20px;
          background: ${C.green};
          border-radius: 2px;
          flex-shrink: 0;
        }

        .blog-prose h3 {
          font-family: 'Syne', sans-serif !important;
          font-weight: 800 !important;
          font-size: clamp(14px, 1.6vw, 18px) !important;
          color: ${C.cream} !important;
          letter-spacing: -0.02em !important;
          margin-bottom: 12px !important;
        }

        .blog-prose p {
          font-family: 'DM Sans', sans-serif !important;
          font-size: 14px !important;
          color: rgba(254,250,224,0.55) !important;
          line-height: 1.82 !important;
          margin-bottom: 18px !important;
        }

        .blog-prose > div[style*="height: 1px"],
        .blog-prose hr {
          border: none !important;
          height: 1px !important;
          background: linear-gradient(90deg, transparent, rgba(74,124,89,0.2), rgba(188,108,37,0.2), transparent) !important;
          margin: 48px 0 !important;
        }

        .blog-prose .glass {
          background: ${C.surface} !important;
          border: 1px solid ${C.border} !important;
          border-radius: 4px !important;
        }

        .blog-prose .skill-pill {
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 9px !important;
          letter-spacing: 0.07em !important;
          text-transform: uppercase !important;
          padding: 3px 10px !important;
          border-radius: 2px !important;
          border: 1px solid ${C.greenDim} !important;
          color: ${C.greenBr} !important;
          background: rgba(74,124,89,0.08) !important;
        }

        .blog-prose pre,
        .blog-prose code {
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 12px !important;
          background: ${C.surface2} !important;
          border: 1px solid ${C.border} !important;
          border-radius: 4px !important;
        }
        .blog-prose pre {
          padding: 18px 20px !important;
          overflow-x: auto !important;
          margin-bottom: 20px !important;
          border-left: 3px solid ${C.green} !important;
          /* Prevent code blocks from overflowing on mobile */
          max-width: 100% !important;
          white-space: pre-wrap !important;
          word-break: break-word !important;
        }

        /* ── Responsive prose ── */
        @media (max-width: 540px) {
          .blog-prose p { font-size: 13px !important; line-height: 1.75 !important; }
          .blog-prose pre, .blog-prose code { font-size: 11px !important; }
          .blog-prose pre { padding: 14px 14px !important; }
          .blog-prose h2 { font-size: 16px !important; }
          .blog-prose h3 { font-size: 14px !important; }
        }

        .blog-prose table {
          border-collapse: collapse !important;
          width: 100% !important;
          display: block !important;
          overflow-x: auto !important;
          -webkit-overflow-scrolling: touch !important;
        }
        .blog-prose th {
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 9px !important;
          letter-spacing: 0.14em !important;
          text-transform: uppercase !important;
          color: rgba(254,250,224,0.3) !important;
          font-weight: 400 !important;
          border-bottom: 1px solid ${C.border} !important;
          padding: 8px 12px !important;
          text-align: left !important;
          white-space: nowrap !important;
        }
        .blog-prose td {
          padding: 10px 12px !important;
          border-bottom: 1px solid rgba(254,250,224,0.04) !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 13px !important;
          color: rgba(254,250,224,0.65) !important;
        }

        .blog-prose img {
          border-radius: 6px !important;
          border: 1px solid ${C.border} !important;
          max-width: 100% !important;
          height: auto !important;
        }

        .blog-prose a[href*="github"] {
          display: inline-flex !important;
          align-items: center !important;
          gap: 8px !important;
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 11px !important;
          letter-spacing: 0.12em !important;
          text-transform: uppercase !important;
          color: ${C.cream} !important;
          background: ${C.brown} !important;
          padding: 12px 26px !important;
          border-radius: 4px !important;
          text-decoration: none !important;
          transition: background 0.2s !important;
        }
        .blog-prose a[href*="github"]:hover {
          background: #A85A1A !important;
        }
      `}</style>
    </div>
  );
};

export default BlogLayout;