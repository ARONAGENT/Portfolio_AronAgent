import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface TOCItem {
  id: string;
  label: string;
}

interface BlogLayoutProps {
  title: string;
  tags: string[];
  readTime: string;
  toc: TOCItem[];
  children: ReactNode;
}

const BlogLayout = ({ title, tags, readTime, toc, children }: BlogLayoutProps) => {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  return (
    <div className="min-h-screen grid-bg relative">
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline text-sm mb-8">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl gradient-text mb-4">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {tags.map((t) => (
              <span key={t} className="skill-pill text-xs">{t}</span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {readTime} · Rohan Uke — ARONAGENT
          </p>
        </motion.div>

        <div className="flex gap-12">
          {/* TOC sidebar - desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-bold">Contents</p>
              {toc.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`block text-sm py-1.5 pl-3 border-l-2 transition-colors ${
                    activeId === id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0 max-w-[800px]">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogLayout;
