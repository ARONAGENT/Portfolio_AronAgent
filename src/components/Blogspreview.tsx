import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const blogs = [
  {
    slug: "microservices",
    icon: "🛒",
    title: "Building an E-Commerce Microservices Platform",
    teaser:
      "A deep dive into architecting a production-ready distributed system with Spring Cloud, Eureka, API Gateway, Circuit Breaker, and full observability.",
    tags: ["Spring Cloud", "Microservices", "Docker", "ELK Stack"],
    readTime: "15 min read",
    accent: "border-primary",
  },
  {
    slug: "docker",
    icon: "🐳",
    title: "Mastering Docker with Spring Boot",
    teaser:
      "Complete guide from Docker fundamentals to containerizing Spring Boot apps with PostgreSQL using Docker Compose — 22 hands-on screenshots.",
    tags: ["Docker", "Spring Boot", "PostgreSQL", "DevOps"],
    readTime: "12 min read",
    accent: "border-blue-500",
  },
  {
    slug: "kafka",
    icon: "⚡",
    title: "Apache Kafka with Spring Boot",
    teaser:
      "From basic producer-consumer to advanced Avro serialization and Confluent Schema Registry — build real event-driven notification systems.",
    tags: ["Kafka", "Spring Boot", "Avro", "Schema Registry"],
    readTime: "18 min read",
    accent: "border-amber-500",
  },
  {
    slug: "spring-security",
    icon: "🔐",
    title: "Spring Security Complete Guide",
    teaser:
      "JWT authentication with access & refresh tokens, Google OAuth2 social login, role-based access control (RBAC), and custom filter chains — all production-ready.",
    tags: ["Spring Security", "JWT", "OAuth2", "RBAC"],
    readTime: "22 min read",
    accent: "border-green-500",
  },
];

const BlogsPreview = () => (
  <section id="blogs-preview" className="max-w-5xl mx-auto px-6 py-20">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-end justify-between mb-12 flex-wrap gap-4"
    >
      <div>
        <h2 className="font-heading font-extrabold text-3xl md:text-4xl gradient-text mb-2">
          Latest Articles
        </h2>
        <p className="text-muted-foreground text-sm max-w-md">
          Deep dives into backend engineering, distributed systems, and AI integration.
        </p>
      </div>
      <Link
        to="/blogs"
        className="flex items-center gap-2 text-sm text-primary font-semibold hover:underline"
      >
        View all articles <ArrowRight size={14} />
      </Link>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {blogs.map((blog, i) => (
        <motion.div
          key={blog.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
        >
          <Link to={`/blogs/${blog.slug}`}>
            <div
              className={`glass rounded-xl p-6 glow-cyan-hover transition-all duration-300 hover:-translate-y-1 h-full border-l-4 ${blog.accent}`}
            >
              <span className="text-3xl mb-3 block">{blog.icon}</span>
              <h3 className="font-heading font-bold text-base text-foreground mb-2">
                {blog.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{blog.teaser}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((t) => (
                  <span key={t} className="skill-pill text-xs">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{blog.readTime}</span>
                <span className="text-primary text-sm flex items-center gap-1">
                  Read Article <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </section>
);

export default BlogsPreview;