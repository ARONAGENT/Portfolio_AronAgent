import { motion } from "framer-motion";

const focuses = [
  { icon: "🏗️", title: "Microservices Architecture", sub: "Service mesh & distributed systems" },
  { icon: "⚡", title: "Event-Driven Development", sub: "Apache Kafka & message streaming" },
  { icon: "☁️", title: "Cloud-Native Technologies", sub: "Docker, Kubernetes & AWS" },
  { icon: "🤖", title: "ML Engineering", sub: "MLOps & model deployment" },
  { icon: "📊", title: "Advanced Data Analysis", sub: "Power BI & predictive analytics" },
  { icon: "🌐", title: "Open Source Contributions", sub: "Building for the community" },
];

const CurrentFocus = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading font-extrabold text-3xl md:text-4xl gradient-text text-center mb-16"
      >
        Current Focus
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {focuses.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-6 glow-cyan-hover transition-all duration-300 hover:-translate-y-1"
          >
            <span className="text-3xl mb-3 block">{f.icon}</span>
            <h3 className="font-heading font-bold text-foreground mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.sub}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CurrentFocus;
