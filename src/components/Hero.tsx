import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import profileImg from "@/assets/profile.png";

const roles = [
  "Spring Boot Specialist 🌱",
  "Microservices Architect 🧩",
  "AI Integration Engineer 🤖",
  "Backend Systems Builder ⚡",
  "Cloud Native Developer ☁️",
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [views, setViews] = useState<number | null>(null);

  // Typewriter Effect
  useEffect(() => {
    const current = roles[roleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, displayText.length + 1));

        if (displayText.length === current.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(current.slice(0, displayText.length - 1));

        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // Views Counter
  useEffect(() => {
    fetch("https://api.counterapi.dev/v1/portfolio-aronagent/views/up")
      .then((res) => res.json())
      .then((data) => setViews(data.count))
      .catch(() => setViews(null));
  }, []);

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
      {/* Background Blur */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

        {/* Mobile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:hidden flex justify-center"
        >
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-primary/30 rounded-[24px] blur-[50px] scale-110" />

            <div
              style={{
                padding: "3px",
                borderRadius: "22px",
                background:
                  "linear-gradient(135deg, var(--primary, #6366f1), var(--secondary, #a855f7), var(--primary, #6366f1))",
                position: "relative",
                zIndex: 10,
              }}
            >
              <img
                src={profileImg}
                alt="ARONAGENT - Rohan Uke"
                className="w-64 h-64 object-cover object-top block"
                style={{
                  borderRadius: "20px",
                  display: "block",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-3 space-y-6"
        >
          {/* Small Intro */}
          <span className="font-mono text-primary text-sm tracking-wider">
            {"< Backend Architect />"}
          </span>

          {/* Name */}
          <h1 className="font-heading font-extrabold text-5xl md:text-7xl lg:text-[80px] gradient-text leading-tight">
            Rohan Uke
          </h1>

          {/* Typewriter Role */}
          <div className="h-8">
            <span className="font-mono text-lg text-foreground typing-cursor">
              {displayText}
            </span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
            Crafting intelligent backend systems that scale,
            integrating AI into modern cloud-native applications,
            and building high-performance APIs with clean architecture.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() =>
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="gradient-btn px-6 py-3 rounded-lg font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              View Projects
            </button>

            <button
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-6 py-3 rounded-lg font-semibold border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
            >
              Contact Me
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 pt-2 text-sm text-muted-foreground">
            {[
              "10+ Projects",
              "Java & Spring Boot",
              "AI Integration",
              "Open Source",
            ].map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full border border-border bg-surface/50"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Simple Views Counter */}
          {views !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-2 pt-2 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
                <Eye className="w-4 h-4 text-primary" />

                <span>
                  <span className="text-primary font-semibold">
                    {views.toLocaleString()}+
                  </span>{" "}
                  portfolio views
                </span>

                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Desktop Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:flex lg:col-span-2 justify-center"
        >
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-primary/30 rounded-[28px] blur-[60px] scale-110" />

            <div
              style={{
                padding: "3px",
                borderRadius: "26px",
                background:
                  "linear-gradient(135deg, var(--primary, #6366f1), var(--secondary, #a855f7), var(--primary, #6366f1))",
                position: "relative",
                zIndex: 10,
              }}
            >
              <img
                src={profileImg}
                alt="ARONAGENT - Rohan Uke"
                className="w-96 h-96 object-cover object-top block"
                style={{ borderRadius: "45px" }}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;