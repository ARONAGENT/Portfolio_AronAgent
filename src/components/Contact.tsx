import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react";

const contacts = [
  { icon: Mail, label: "Gmail", href: "mailto:rohanuke1@gmail.com" },
  { icon: Linkedin, label: "Linkedin", href: "https://linkedin.com/in/ARONAGENT" },
  { icon: Github, label: "GitHub", href: "https://github.com/ARONAGENT" },
  { icon: ExternalLink, label: "LeetCode", href: "https://leetcode.com/u/Aron20kk/" },
];

const Contact = () => (
  <section id="contact" className="py-24">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading font-extrabold text-3xl md:text-4xl gradient-text mb-12"
      >
        Get In Touch
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contacts.map(({ icon: Icon, label, href }, i) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-6 flex items-center gap-4 glow-cyan-hover transition-all duration-300 hover:-translate-y-1"
          >
            <Icon size={24} className="text-primary flex-shrink-0" />
            <span className="text-foreground text-sm">{label}</span>
          </motion.a>
        ))}
      </div>
      <p className="mt-12 text-muted-foreground italic text-sm">
        "Code is poetry, architecture is art, and innovation is the masterpiece"
      </p>
    </div>
  </section>
);

export default Contact;
