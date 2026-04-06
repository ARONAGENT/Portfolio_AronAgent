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

// Reliably scrolls to a section — retries up to 10 times waiting for the
// element to appear in the DOM (needed after a route change on mobile).
const scrollToSection = (href: string, attempt = 0) => {
  const el = document.querySelector(href);
  if (el) {
    // Small offset so the fixed navbar doesn't cover the heading
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  } else if (attempt < 10) {
    setTimeout(() => scrollToSection(href, attempt + 1), 80);
  }
};

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleClick = useCallback((href: string) => {
    setMobileOpen(false);

    if (location.pathname !== "/") {
      // Navigate home first, then scroll once the page has mounted
      navigate("/");
      setTimeout(() => scrollToSection(href), 120);
    } else {
      scrollToSection(href);
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

        {/* ── Mobile toggle ── */}
        <button
          className="md:hidden text-foreground p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden glass-strong border-t border-border overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045 }}
                  onClick={() => handleClick(link.href)}
                  className="text-muted-foreground hover:text-primary active:text-primary transition-colors font-body text-left py-3 px-2 rounded-lg hover:bg-primary/5 active:bg-primary/10 text-base w-full"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;