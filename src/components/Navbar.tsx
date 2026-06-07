import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// ALL links are hash-based — they scroll on the homepage.
// If the user is on another page (e.g. /blogs/slug), clicking any link
// navigates home first, then scrolls to the section.
const NAV = [
  { label: "About",          hash: "#about"          },
  { label: "Skills",         hash: "#skills"         },
  { label: "Projects",       hash: "#projects"       },
  { label: "Blogs",          hash: "#blogs-preview"  },
  { label: "Collaborate",    hash: "#collaborate"    },
  { label: "Certifications", hash: "#certifications" },
  { label: "Resume",         hash: "#resume"         },
  { label: "Contact",        hash: "#contact"        },
];

const scrollTo = (hash: string, attempt = 0) => {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); }
  else if (attempt < 20) { setTimeout(() => scrollTo(hash, attempt + 1), 80); }
};

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const go = useCallback((hash: string) => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      // already home — just scroll
      scrollTo(hash);
    } else {
      // navigate home then scroll once DOM is ready
      navigate("/");
      setTimeout(() => scrollTo(hash), 400);
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        transition: "all .3s",
        background: scrolled ? "rgba(254,250,224,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(96,108,56,0.15)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(40,54,24,0.06)" : "none",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

          {/* Logo */}
          <Link to="/" onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "1.2rem", letterSpacing: "-0.03em", textDecoration: "none", color: "#283618", flexShrink: 0 }}>
            ARON<span style={{ color: "#BC6C25" }}>AGENT</span>
          </Link>

          {/* Desktop links */}
          <div id="nb-desktop" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {NAV.map(link => (
              <button key={link.label} onClick={() => go(link.hash)}
                style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: 13, letterSpacing: "0.04em", color: "#3d4a22", background: "transparent", border: "none", padding: "6px 11px", borderRadius: 4, cursor: "pointer", transition: "color .18s, background .18s", whiteSpace: "nowrap" as const }}
                onMouseEnter={e => { e.currentTarget.style.color = "#BC6C25"; e.currentTarget.style.background = "rgba(188,108,37,0.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#3d4a22"; e.currentTarget.style.background = "transparent"; }}
              >{link.label}</button>
            ))}
            <button onClick={() => go("#contact")}
              style={{ marginLeft: 10, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#FEFAE0", background: "#283618", border: "2px solid #283618", padding: "8px 20px", borderRadius: 99, cursor: "pointer", transition: "all .18s", whiteSpace: "nowrap" as const }}
              onMouseEnter={e => { e.currentTarget.style.background = "#BC6C25"; e.currentTarget.style.borderColor = "#BC6C25"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#283618"; e.currentTarget.style.borderColor = "#283618"; }}
            >Hire Me</button>
          </div>

          {/* Hamburger */}
          <button id="nb-ham" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu"
            style={{ color: "#283618", background: "transparent", border: "none", cursor: "pointer", padding: 8, display: "none" }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div key="mob"
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              style={{ background: "rgba(254,250,224,0.98)", backdropFilter: "blur(18px)", borderTop: "1px solid rgba(96,108,56,0.15)" }}
            >
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "10px 16px 18px", display: "flex", flexDirection: "column", gap: 2 }}>
                {NAV.map((link, i) => (
                  <motion.button key={link.label}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                    onClick={() => go(link.hash)}
                    style={{ textAlign: "left" as const, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: 15, color: "#3d4a22", background: "transparent", border: "none", padding: "13px 14px", borderRadius: 6, cursor: "pointer", width: "100%", minHeight: 48, display: "flex", alignItems: "center", letterSpacing: "0.02em" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#BC6C25"; e.currentTarget.style.background = "rgba(188,108,37,0.07)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#3d4a22"; e.currentTarget.style.background = "transparent"; }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#DDA15E", marginRight: 12, flexShrink: 0, display: "inline-block" }} />
                    {link.label}
                  </motion.button>
                ))}
                <div style={{ padding: "8px 14px 0" }}>
                  <button onClick={() => go("#contact")}
                    style={{ width: "100%", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14, color: "#FEFAE0", background: "#283618", border: "2px solid #283618", padding: "13px 20px", borderRadius: 99, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase" as const }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#BC6C25"; e.currentTarget.style.borderColor = "#BC6C25"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#283618"; e.currentTarget.style.borderColor = "#283618"; }}
                  >Hire Me</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <style>{`
        @media (min-width: 901px) { #nb-ham { display: none !important; } }
        @media (max-width: 900px) { #nb-desktop { display: none !important; } #nb-ham { display: block !important; } }
      `}</style>
    </>
  );
}