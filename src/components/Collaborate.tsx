import { motion } from "framer-motion";
import { Server, Brain, Cloud, MessageCircle, FileText } from "lucide-react";

const offerings = [
  {
    icon: <Server className="w-6 h-6" />,
    title: "Backend & APIs",
    desc: "Spring Boot microservices, REST/GraphQL APIs, scalable architecture",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI Integration",
    desc: "LLM-powered features, intelligent agents, RAG pipelines",
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Cloud & DevOps",
    desc: "Docker, CI/CD pipelines, cloud-native deployments",
  },
];

const Collaborate = () => (
  <section id="collaborate" className="py-24 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-mono text-primary text-xs tracking-widest uppercase mb-5">
          Open to work
        </p>

        {/* Availability pill */}
        <div className="inline-flex items-center gap-2 border border-green-500/30 bg-green-500/8 rounded-full px-4 py-1.5 text-sm text-green-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for freelance projects
        </div>

        <h2 className="font-heading font-extrabold text-4xl md:text-5xl gradient-text mb-5 leading-tight">
          Let's build something<br />great together
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-12">
          Have an idea that needs a solid backend? I'm open to freelance
          collaborations — from API design to full-stack AI-powered products.
        </p>

        {/* Offering cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {offerings.map((o) => (
            <div
              key={o.title}
              className="rounded-xl border border-border bg-surface/40 p-6 text-left hover:border-primary/40 transition-colors"
            >
              <div className="text-primary mb-3">{o.icon}</div>
              <h3 className="font-semibold text-foreground text-sm mb-2">{o.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="gradient-btn px-6 py-3 rounded-lg font-semibold text-primary-foreground flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Start a conversation
          </button>
          <button
            onClick={() => document.querySelector("#resume")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 rounded-lg font-semibold border border-primary/30 text-primary hover:bg-primary/10 transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            View my resume
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Collaborate;