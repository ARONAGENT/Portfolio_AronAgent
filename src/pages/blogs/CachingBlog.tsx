import BlogLayout from "@/components/BlogLayout";
import BlogImage from "@/components/BlogImage";
import CodeBlock from "@/components/CodeBlock";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "workflow", label: "Workflow Diagram" },
  { id: "benchmarks", label: "Performance Benchmarks" },
  { id: "isolation", label: "Isolation Levels" },
  { id: "use-cases", label: "Real-World Use Cases" },
  { id: "redis-caching", label: "Redis Caching Code" },
  { id: "transaction-code", label: "Transaction Code" },
  { id: "optimistic", label: "Optimistic Locking" },
  { id: "pessimistic", label: "Pessimistic Locking" },
  { id: "screenshots", label: "Screenshots" },
  { id: "tech-stack", label: "Tech Stack" },
];

const CachingBlog = () => (
  <BlogLayout
    title="Spring Boot Caching & Transaction Management — The Complete Guide"
    tags={["Redis", "Spring Boot", "Transactions", "Performance"]}
    readTime="14 min read"
    toc={toc}
  >
    <section id="overview" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Overview</h2>
      <p className="text-muted-foreground">
        Why caching matters: reduces DB load, improves response time dramatically. Why transaction management: ensures ACID properties in concurrent environments. This guide covers Redis caching, all 4 isolation levels, and locking strategies.
      </p>
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="workflow" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Workflow Diagram</h2>
      <BlogImage
        src="https://github.com/user-attachments/assets/700a1470-b8e3-4e4a-8494-51df860b4419"
        caption="Overall Workflow — Caching & Transaction Management Integration"
        loading="eager"
      />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="benchmarks" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Performance Benchmarks</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            <th className="text-left py-2 text-muted-foreground font-normal">Strategy</th>
            <th className="text-left py-2 text-muted-foreground font-normal">Type</th>
            <th className="text-left py-2 text-muted-foreground font-normal">Latency</th>
            <th className="text-left py-2 text-muted-foreground font-normal">Throughput</th>
          </tr></thead>
          <tbody className="text-foreground">
            {[
              ["No Cache", "Database Query", "250ms", "400 req/s"],
              ["In-Memory", "Cache Hit", "2ms", "5000 req/s"],
              ["Redis Local", "Cache Hit", "5ms", "2000 req/s"],
              ["Redis Remote", "Cache Hit", "15ms", "800 req/s"],
            ].map(([s, t, l, th]) => (
              <tr key={s} className="border-b border-border/50">
                <td className="py-2 text-primary font-mono text-xs">{s}</td>
                <td className="py-2">{t}</td>
                <td className="py-2">{l}</td>
                <td className="py-2">{th}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="isolation" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Transaction Isolation Levels</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            <th className="text-left py-2 text-muted-foreground font-normal">Level</th>
            <th className="text-left py-2 text-muted-foreground font-normal">Concurrency</th>
            <th className="text-left py-2 text-muted-foreground font-normal">Speed</th>
            <th className="text-left py-2 text-muted-foreground font-normal">Use Case</th>
          </tr></thead>
          <tbody className="text-foreground">
            {[
              ["Read Uncommitted", "Highest", "Fastest", "Analytics"],
              ["Read Committed", "High", "Fast", "E-commerce"],
              ["Repeatable Read", "Medium", "Moderate", "Reporting"],
              ["Serializable", "Lowest", "Slowest", "Financial/Banking"],
            ].map(([l, c, s, u]) => (
              <tr key={l} className="border-b border-border/50">
                <td className="py-2 text-primary font-mono text-xs">{l}</td>
                <td className="py-2">{c}</td>
                <td className="py-2">{s}</td>
                <td className="py-2">{u}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="use-cases" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Real-World Use Cases</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            <th className="text-left py-2 text-muted-foreground font-normal">Strategy</th>
            <th className="text-left py-2 text-muted-foreground font-normal">Company</th>
            <th className="text-left py-2 text-muted-foreground font-normal">Use Case</th>
          </tr></thead>
          <tbody className="text-foreground">
            {[
              ["Read Committed", "Amazon E-commerce", "Product catalog browsing"],
              ["Serializable", "Banking Systems", "Money transfers"],
              ["Optimistic Locking", "Google Docs", "Collaborative editing"],
              ["Pessimistic Locking", "Airline Booking", "Seat reservations"],
              ["Redis Caching", "Netflix", "Content recommendations"],
              ["No Transactions", "Twitter/X", "Social media feeds"],
            ].map(([s, c, u]) => (
              <tr key={s + c} className="border-b border-border/50">
                <td className="py-2 text-primary font-mono text-xs">{s}</td>
                <td className="py-2">{c}</td>
                <td className="py-2">{u}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="redis-caching" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Redis Caching Code</h2>
      <CodeBlock language="java" code={`@Service
public class ProductService {
    
    @Cacheable(value = "products", key = "#id")
    public Product getProduct(Long id) {
        return productRepository.findById(id).orElseThrow();
    }
    
    @CacheEvict(value = "products", key = "#id")
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    
    @CachePut(value = "products", key = "#product.id")
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }
}`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="transaction-code" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Transaction Isolation Levels</h2>
      <CodeBlock language="java" code={`@Transactional(isolation = Isolation.READ_COMMITTED)
public Product browseProduct(Long id) { ... }

@Transactional(isolation = Isolation.SERIALIZABLE)
public void transferMoney(Long from, Long to, BigDecimal amount) { ... }`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="optimistic" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Optimistic Locking</h2>
      <CodeBlock language="java" code={`@Entity
public class Product {
    @Id
    private Long id;
    
    @Version  // Prevents stale data overwrites
    private Integer version;
    
    private int stock;
}`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="pessimistic" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Pessimistic Locking</h2>
      <CodeBlock language="java" code={`@Transactional
public Product reserveSeat(Long seatId) {
    return seatRepository.findById(seatId, LockModeType.PESSIMISTIC_WRITE);
    // DB-level lock — only one transaction at a time
}`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="screenshots" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Screenshots</h2>
      {[
        { src: "https://github.com/user-attachments/assets/7d488ff9-f422-4e2d-83fa-07925c48d696", cap: "1. Without Locking — Race condition visible in concurrent threads" },
        { src: "https://github.com/user-attachments/assets/1aa2fc93-ccef-4ed1-8e4d-e5fe59757c21", cap: "2. Optimistic Locking — @Version prevents stale data overwrites" },
        { src: "https://github.com/user-attachments/assets/32da7b84-a23e-49b8-a828-8b761807cdda", cap: "3. Pessimistic Locking — DB-level lock ensures exclusive access" },
      ].map((s, i) => (
        <BlogImage key={i} src={s.src} caption={s.cap} />
      ))}
      <div className="flex flex-wrap gap-4 mt-6">
        <a
          href="https://github.com/user-attachments/files/19491733/Caching.And.Concurrent.Transaction.Management.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-btn px-6 py-3 rounded-lg text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
        >
          📋 Download Complete PDF Documentation
        </a>
        <a
          href="https://github.com/ARONAGENT/Spring_Boot_Caching_And_Concurrent_Transactions"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg font-semibold border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
        >
          View on GitHub →
        </a>
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="tech-stack" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Tech Stack</h2>
      <div className="flex flex-wrap gap-2">
        {["Spring Boot 3.x", "Spring Data JPA", "Spring Cache", "Redis", "PostgreSQL", "MySQL", "Micrometer", "Actuator", "Maven", "Java 17+"].map((t) => (
          <span key={t} className="skill-pill">{t}</span>
        ))}
      </div>
    </section>
  </BlogLayout>
);

export default CachingBlog;
