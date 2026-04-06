import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const blogs = [
  {
    slug: "microservices",
    icon: "🛒",
    title: "Building an E-Commerce Microservices Platform",
    teaser: "A deep dive into architecting a production-ready distributed system with Spring Cloud, Eureka, API Gateway, Circuit Breaker, and full observability.",
    tags: ["Spring Cloud", "Microservices", "Docker", "ELK Stack"],
    readTime: "15 min read",
    accent: "border-primary",
  },
  {
    slug: "docker",
    icon: "🐳",
    title: "Mastering Docker with Spring Boot",
    teaser: "Complete guide from Docker fundamentals to containerizing Spring Boot apps with PostgreSQL using Docker Compose — 22 hands-on screenshots.",
    tags: ["Docker", "Spring Boot", "PostgreSQL", "DevOps"],
    readTime: "12 min read",
    accent: "border-blue-500",
  },
  {
    slug: "kafka",
    icon: "⚡",
    title: "Apache Kafka with Spring Boot",
    teaser: "From basic producer-consumer to advanced Avro serialization and Confluent Schema Registry — build real event-driven notification systems.",
    tags: ["Kafka", "Spring Boot", "Avro", "Schema Registry"],
    readTime: "18 min read",
    accent: "border-amber",
  },
  {
    slug: "caching",
    icon: "🧠",
    title: "Caching & Transaction Management",
    teaser: "Master Redis caching, all 4 transaction isolation levels, and optimistic vs pessimistic locking with real performance benchmarks.",
    tags: ["Redis", "Spring Boot", "Transactions", "Performance"],
    readTime: "14 min read",
    accent: "border-destructive",
  },
  {
    slug: "spring-ai",
    icon: "🤖",
    title: "Spring AI Complete Guide",
    teaser: "RAG systems, Vector Stores, short/long-term memory advisors, tool calling, and pgvector — everything to build AI-powered Spring Boot apps.",
    tags: ["Spring AI", "RAG", "pgvector", "OpenAI"],
    readTime: "20 min read",
    accent: "border-secondary",
  },
  {
    slug: "spring-security",
    icon: "🔐",
    title: "Spring Security Complete Guide",
    teaser: "JWT authentication with access & refresh tokens, Google OAuth2 social login, role-based access control (RBAC), granular permissions, session management, and custom filter chains — all production-ready.",
    tags: ["Spring Security", "JWT", "OAuth2", "RBAC"],
    readTime: "22 min read",
    accent: "border-green-500",
  },
];

const Blogs = () => (
  <div className="min-h-screen grid-bg relative">
    <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />
    <Navbar />
    <div className="max-w-5xl mx-auto px-6 pt-28 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl gradient-text mb-4">
          Technical Blog
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Deep dives into backend engineering, distributed systems, and AI integration
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog, i) => (
          <motion.div
            key={blog.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/blogs/${blog.slug}`}>
              <div className={`glass rounded-xl p-6 glow-cyan-hover transition-all duration-300 hover:-translate-y-1 h-full border-l-4 ${blog.accent}`}>
                <span className="text-3xl mb-3 block">{blog.icon}</span>
                <h2 className="font-heading font-bold text-lg text-foreground mb-2">{blog.title}</h2>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{blog.teaser}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((t) => (
                    <span key={t} className="skill-pill text-xs">{t}</span>
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
    </div>
    <Footer />
  </div>
);

export default Blogs;