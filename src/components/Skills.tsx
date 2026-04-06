import { motion } from "framer-motion";
import { Tilt } from "react-tilt";

const skillGroups = [
  {
    icon: "🏗️",
    title: "Backend Fortress",
    skills: ["Java", "Spring Boot", "Hibernate", "JWT", "Maven", "Gradle"],
  },
  {
    icon: "🗄️",
    title: "Data Vaults",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    icon: "☁️",
    title: "Cloud Command",
    skills: ["Docker", "Kubernetes", "Apache Kafka", "AWS", "Git"],
  },
  {
    icon: "🤖",
    title: "AI & Data Lab",
    skills: ["Python", "Pandas", "TensorFlow", "Power BI", "Spring AI"],
  },
];

const Skills = () => (
  <section id="skills" className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading font-extrabold text-3xl md:text-4xl gradient-text text-center mb-16"
      >
        Tech Arsenal
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Tilt options={{ max: 15, scale: 1.02 }}>
              <div className="glass rounded-xl p-6 glow-cyan-hover transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{group.icon}</span>
                  <h3 className="font-heading font-bold text-lg text-foreground">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="skill-pill">{skill}</span>
                  ))}
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
