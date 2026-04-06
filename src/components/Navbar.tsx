import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About",          href: "#about" },
  { label: "Skills",         href: "#skills" },
  { label: "Projects",       href: "#projects" },
  { label: "Blogs",          href: "#blogs-preview" },
  { label: "Certifications", href: "#certifications" },
  { label: "Resume",         href: "#resume" },
  { label: "Contact",        href: "#contact" },
];

// Strips the '#' and finds the element, then uses scrollIntoView which works
// reliably on iOS Safari, Android Chrome, and all desktop browsers.
const scrollToId = (href: string, attempt = 0) => {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (attempt < 15) {
    // Retry — element may not be in DOM yet after a route change
    setTimeout(() => scrollToId(href, attempt + 1), 100);
  }
};

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleClick = useCallback((href: string) => {
    // Close menu first — gives the browser a frame to collapse the menu
    // before we attempt to scroll, which avoids layout shift issues on mobile
    setMobileOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      // Wait for React to render the home page, then scroll
      setTimeout(() => scrollToId(href), 300);
    } else {
      // Small delay so mobile menu animation finishes before scroll
      setTimeout(() => scrollToId(href), 50);
    }
  }, [location.pathname, navigate]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="font-heading font-extrabold text-2xl gradient-text"
          onClick={() => setMobileOpen(false)}
        >
          ARONAGENT
        </Link>

        {/* ── Desktop ── */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleClick(link.href)}
              className="text-muted-foreground hover:text-primary transition-colors font-body text-sm tracking-wide"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden text-foreground p-2 -mr-2 rounded-md"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="md:hidden glass-strong border-t border-border"
          >
            <div className="px-4 py-3 flex flex-col">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleClick(link.href)}
                  // Large touch target — minimum 48px height for mobile usability
                  className="text-left text-base font-body text-muted-foreground
                             hover:text-primary active:text-primary
                             py-3 px-3 rounded-xl
                             hover:bg-white/5 active:bg-white/10
                             transition-colors w-full min-h-[48px] flex items-center"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;