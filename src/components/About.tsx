import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const code = `const ARONAGENT = {
  callSign: "Spring Boot Specialist 🌱",
  specialization: "Microservices & AI Integration",
  currentMission: "Crafting Intelligent Backend APIs",
  stack: ["Java", "Spring Boot", "Python", "Docker", "Kafka"],
  status: "ACTIVE_DEVELOPMENT",
  nextEvolution: "AI-Driven System Designer"
};
console.log(\`\${ARONAGENT.callSign} bootstrapped! 🚀\`);`;

const About = () => (
  <section id="about" className="py-24">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Terminal */}
        <div className="rounded-xl overflow-hidden border border-primary/20 glow-cyan">
          <div className="flex items-center gap-2 px-4 py-3 bg-surface2 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-muted-foreground font-mono">aronagent.config.ts</span>
          </div>
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            customStyle={{ margin: 0, padding: "1.5rem", background: "#0d1117", fontSize: "0.85rem" }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="font-heading font-extrabold text-3xl md:text-4xl gradient-text">
          Passionate Backend Developer
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          I'm Rohan — a backend engineer specializing in microservices architecture and scalable applications. 
          I build enterprise-grade systems with Spring Boot and Spring Cloud, integrate AI models using Spring AI 
          and RAG pipelines, and craft event-driven architectures with Apache Kafka. Currently evolving into an 
          AI-Driven System Designer.
        </p>
        <div className="flex items-center gap-2 text-primary">
          <Mail size={16} />
          <a href="mailto:rohanuke1@gmail.com" className="hover:underline text-sm">rohanuke1@gmail.com</a>
        </div>
        <div className="flex gap-4 pt-2">
          {[
            { icon: Github, href: "https://github.com/ARONAGENT", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/ARONAGENT", label: "LinkedIn" },
            { icon: ExternalLink, href: "https://leetcode.com/u/Aron20kk/", label: "LeetCode" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:glow-cyan transition-all text-sm text-muted-foreground hover:text-primary"
            >
              <Icon size={16} /> {label}
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default About;
