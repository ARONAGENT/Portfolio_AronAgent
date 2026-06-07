import BlogLayout from "@/components/BlogLayout";
import BlogImage from "@/components/BlogImage";
import CodeBlock from "@/components/CodeBlock";

const toc = [
  { id: "architecture", label: "Architecture Overview" },
  { id: "auth-workflow", label: "Authentication Workflow" },
  { id: "features", label: "Features" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "gateway-config", label: "Gateway Configuration" },
  { id: "jwt-filter", label: "JWT Gateway Filter" },
  { id: "api-endpoints", label: "API Endpoints" },
  { id: "service-urls", label: "Service URLs" },
  { id: "config-structure", label: "Configuration Structure" },
  { id: "screenshots", label: "Screenshots Gallery" },
  { id: "learning", label: "Learning Outcomes" },
];

const screenshots = [
  { src: "https://github.com/user-attachments/assets/1518b6b6-182c-4e16-8209-0291c34b0f23", cap: "1. Eureka Default Dashboard" },
  { src: "https://github.com/user-attachments/assets/d69a1e90-0c02-4a05-ba28-15c9fe8a422f", cap: "2. All Services Registered with Eureka" },
  { src: "https://github.com/user-attachments/assets/7359ac75-e7ac-433b-8be4-bd2b7cba0017", cap: "3. Demo API Call — Inventory to Order Service" },
  { src: "https://github.com/user-attachments/assets/3916fb1f-5cf2-4087-981a-6c2646117ab6", cap: "4. API Gateway — Inventory calls Order via Gateway" },
  { src: "https://github.com/user-attachments/assets/e29440fe-3258-4d68-a0cc-95752fc63803", cap: "5. Filters Added in API Gateway" },
  { src: "https://github.com/user-attachments/assets/3cc2f86a-2596-4ebc-97d8-ba37543ba1d3", cap: "6. OpenFeign Client Setup" },
  { src: "https://github.com/user-attachments/assets/d46d1e99-9d1a-4005-afbc-fb7a576e8352", cap: "7. Order Items via OpenFeign — Reduce Product Stock" },
  { src: "https://github.com/user-attachments/assets/7433c215-228e-4e1e-b779-e95a95e9f401", cap: "8. After Ordering — Stock Updated" },
  { src: "https://github.com/user-attachments/assets/fb14a595-7944-4994-817d-325c4565d1ac", cap: "9. Resilience4j @CircuitBreaker in Action" },
  { src: "https://github.com/user-attachments/assets/0343f03a-2fde-41fc-97cb-d66857fb9450", cap: "10. GlobalLogin Gateway Filter Working" },
  { src: "https://github.com/user-attachments/assets/926fa034-ca30-485c-8002-6efdd6ed86a9", cap: "11. Global Logging Filter in Gateway Chain" },
  { src: "https://github.com/user-attachments/assets/fefb49b5-19ab-41f4-9d2b-51e15b2cc8ed", cap: "12. Custom Logging Filter for Order Service" },
  { src: "https://github.com/user-attachments/assets/2c561262-2fc8-458f-9a4d-56f2464f72b0", cap: "13. Both Filters Registered Successfully" },
  { src: "https://github.com/user-attachments/assets/36fbd815-17fe-4db9-9d92-24f50f7ffe89", cap: "14. Zipkin Dependencies Flow" },
  { src: "https://github.com/user-attachments/assets/5539eb16-ddef-4ea1-b5cc-bc45b04053a9", cap: "15. Elasticsearch Running Successfully" },
  { src: "https://github.com/user-attachments/assets/4f02c48a-03d5-4b13-a999-8b88e5a921fc", cap: "16. Kibana Interface — Log Visualization" },
  { src: "https://github.com/user-attachments/assets/6d69d413-cd3a-4ecf-bb6b-ce5514631e88", cap: "17. Logstash Sending Logs to Elasticsearch" },
];

/* ─── Reusable section heading ─── */
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2
    style={{
      fontFamily: "'Syne', sans-serif",
      fontWeight: 900,
      fontSize: "clamp(20px, 2.4vw, 26px)",
      color: "#FEFAE0",
      letterSpacing: "-0.03em",
      lineHeight: 1.1,
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    }}
  >
    <span
      style={{
        display: "inline-block",
        width: "3px",
        height: "20px",
        background: "#BC6C25",
        borderRadius: "2px",
        flexShrink: 0,
      }}
    />
    {children}
  </h2>
);

/* ─── Styled service card ─── */
const ServiceCard = ({
  name,
  port,
  desc,
}: {
  name: string;
  port: string;
  desc: string;
}) => (
  <div
    style={{
      background: "rgba(20,18,12,0.6)",
      border: "1px solid rgba(254,250,224,0.08)",
      borderLeft: "3px solid #BC6C25",
      borderRadius: "4px",
      padding: "14px 16px",
      transition: "border-color 0.2s",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        marginBottom: "6px",
      }}
    >
      <span
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "13px",
          color: "#FEFAE0",
          letterSpacing: "-0.01em",
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          color: "#BC6C25",
          letterSpacing: "0.04em",
        }}
      >
        :{port}
      </span>
    </div>
    <p
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "12px",
        color: "rgba(254,250,224,0.45)",
        lineHeight: 1.6,
        margin: 0,
      }}
    >
      {desc}
    </p>
  </div>
);

/* ─── Styled pill/tag ─── */
const Tag = ({ children, accent = "#BC6C25" }: { children: string; accent?: string }) => (
  <span
    style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "9px",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      padding: "4px 11px",
      borderRadius: "2px",
      border: `1px solid ${accent}44`,
      color: accent,
      background: `${accent}10`,
    }}
  >
    {children}
  </span>
);

/* ─── Feature group ─── */
const FeatureGroup = ({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent: string;
}) => (
  <div style={{ marginBottom: "20px" }}>
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: accent,
        marginBottom: "10px",
        opacity: 0.8,
      }}
    >
      {title}
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
      {items.map((item) => (
        <Tag key={item} accent={accent}>
          {item}
        </Tag>
      ))}
    </div>
  </div>
);

/* ─── URL card ─── */
const UrlCard = ({ name, url }: { name: string; url: string }) => (
  <div
    style={{
      background: "rgba(20,18,12,0.6)",
      border: "1px solid rgba(254,250,224,0.08)",
      borderRadius: "4px",
      padding: "14px 16px",
    }}
  >
    <div
      style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: "13px",
        color: "#FEFAE0",
        marginBottom: "4px",
        letterSpacing: "-0.01em",
      }}
    >
      {name}
    </div>
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "11px",
        color: "#BC6C25",
        letterSpacing: "0.03em",
      }}
    >
      {url}
    </div>
  </div>
);

/* ─── Learning outcome item ─── */
const OutcomeItem = ({ text, dim = false }: { text: string; dim?: boolean }) => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      padding: "10px 14px",
      background: "rgba(20,18,12,0.5)",
      border: "1px solid rgba(254,250,224,0.07)",
      borderRadius: "4px",
      opacity: dim ? 0.5 : 1,
    }}
  >
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px",
        color: dim ? "rgba(254,250,224,0.4)" : "#BC6C25",
        marginTop: "1px",
        flexShrink: 0,
      }}
    >
      {dim ? "○" : "✦"}
    </span>
    <span
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "13px",
        color: "rgba(254,250,224,0.75)",
        lineHeight: 1.5,
      }}
    >
      {text}
    </span>
  </div>
);

const MicroservicesBlog = () => (
  <BlogLayout
    title="Building an E-Commerce Microservices Platform with Spring Cloud"
    tags={["Spring Cloud", "Microservices", "Docker", "ELK Stack"]}
    readTime="15 min read"
    toc={toc}
  >

    {/* ── ARCHITECTURE ── */}
    <section id="architecture" style={{ marginBottom: "52px" }}>
      <SectionHeading>Architecture Overview</SectionHeading>
      <BlogImage
        src="https://github.com/user-attachments/assets/363444ac-3585-483f-bfaf-7da4b8d851d6"
        caption="Microservices Architecture Overview — Distributed System Design"
        loading="eager"
      />
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px",
          color: "rgba(254,250,224,0.55)",
          lineHeight: 1.8,
          marginBottom: "24px",
        }}
      >
        This distributed architecture comprises 5 core services working together to form a
        production-ready e-commerce platform.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "8px",
        }}
      >
        {[
          { name: "Eureka Server",     port: "8761", desc: "Service registry and discovery, health checks, load balancing" },
          { name: "API Gateway",       port: "8081", desc: "Single entry point, JWT auth filter, rate limiting, logging" },
          { name: "Config Server",     port: "8080", desc: "Git-based centralized config, environment-specific, dynamic refresh" },
          { name: "Order Service",     port: "9020", desc: "Create/cancel orders, OpenFeign to inventory, circuit breaker" },
          { name: "Inventory Service", port: "9010", desc: "Stock management, product catalog, real-time updates" },
        ].map((s) => (
          <ServiceCard key={s.name} {...s} />
        ))}
      </div>
    </section>

    <div style={{ height: "1px", background: "rgba(254,250,224,0.06)", marginBottom: "52px" }} />

    {/* ── AUTH WORKFLOW ── */}
    <section id="auth-workflow" style={{ marginBottom: "52px" }}>
      <SectionHeading>Authentication Workflow</SectionHeading>
      <BlogImage
        src="https://github.com/user-attachments/assets/6b779958-96d5-4623-8f50-9a3a43116f15"
        caption="JWT Authentication Workflow — Gateway Level Security"
      />
    </section>

    <div style={{ height: "1px", background: "rgba(254,250,224,0.06)", marginBottom: "52px" }} />

    {/* ── FEATURES ── */}
    <section id="features" style={{ marginBottom: "52px" }}>
      <SectionHeading>Features</SectionHeading>
      <FeatureGroup
        title="Core"
        accent="#BC6C25"
        items={["Service Discovery (Eureka)", "API Gateway (Spring Cloud)", "Inter-service (OpenFeign)", "Circuit Breaker (Resilience4J)", "Load Balancing + Rate Limiting"]}
      />
      <FeatureGroup
        title="Advanced"
        accent="#DDA15E"
        items={["JWT at Gateway", "Centralized Config", "Zipkin + Micrometer tracing", "ELK logging", "Dynamic Config Refresh", "Multi-env support"]}
      />
      <FeatureGroup
        title="Business"
        accent="#C97A30"
        items={["Order Management (Create/Update/Cancel)", "Inventory Management", "User Auth & Authorization", "Real-time Stock Updates"]}
      />
    </section>

    <div style={{ height: "1px", background: "rgba(254,250,224,0.06)", marginBottom: "52px" }} />

    {/* ── TECH STACK ── */}
    <section id="tech-stack" style={{ marginBottom: "52px" }}>
      <SectionHeading>Tech Stack</SectionHeading>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
          }}
        >
          <thead>
            <tr>
              {["Category", "Technology", "Purpose"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "8px 12px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(254,250,224,0.3)",
                    fontWeight: 400,
                    borderBottom: "1px solid rgba(254,250,224,0.08)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Framework",         "Spring Boot 3.x",         "Microservice foundation"],
              ["Cloud",             "Spring Cloud 2023.x",     "Microservice patterns"],
              ["Service Discovery", "Netflix Eureka",           "Registration & discovery"],
              ["API Gateway",       "Spring Cloud Gateway",    "Request routing & filtering"],
              ["Communication",     "OpenFeign",               "Declarative REST clients"],
              ["Resilience",        "Resilience4J",            "Circuit breaker, retry, rate limiter"],
              ["Configuration",     "Spring Cloud Config",     "Centralized configuration"],
              ["Security",          "Spring Security + JWT",   "Authentication & authorization"],
              ["Monitoring",        "Micrometer + Zipkin",     "Distributed tracing"],
              ["Logging",           "ELK Stack",               "Centralized logging"],
              ["Database",          "H2 / MySQL",              "Data persistence"],
              ["Build",             "Maven",                   "Dependency management"],
            ].map(([cat, tech, purpose], i) => (
              <tr
                key={cat}
                style={{
                  borderBottom: "1px solid rgba(254,250,224,0.05)",
                  background: i % 2 === 0 ? "transparent" : "rgba(254,250,224,0.015)",
                }}
              >
                <td style={{ padding: "10px 12px", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#BC6C25", letterSpacing: "0.04em" }}>{cat}</td>
                <td style={{ padding: "10px 12px", color: "#FEFAE0", fontWeight: 500 }}>{tech}</td>
                <td style={{ padding: "10px 12px", color: "rgba(254,250,224,0.45)" }}>{purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <div style={{ height: "1px", background: "rgba(254,250,224,0.06)", marginBottom: "52px" }} />

    {/* ── GATEWAY CONFIG ── */}
    <section id="gateway-config" style={{ marginBottom: "52px" }}>
      <SectionHeading>Gateway Configuration</SectionHeading>
      <CodeBlock language="yaml" code={`spring:
  cloud:
    gateway:
      routes:
        - id: orderService
          uri: lb://ORDERSERVICE
          predicates:
            - Path=/api/v1/orders/**
          filters:
            - AddRequestHeader=X-Request-Id, Rohan
            - StripPrefix=2
            - name: LoggingOrdersFilter
            - name: Authentication
        - id: inventoryService
          uri: lb://INVENTORYSERVICE
          predicates:
            - Path=/api/v1/inventory/**
          filters:
            - AddRequestHeader=X-Request-Id, Rohan
            - StripPrefix=2
            - name: Authentication`} />
    </section>

    <div style={{ height: "1px", background: "rgba(254,250,224,0.06)", marginBottom: "52px" }} />

    {/* ── JWT FILTER ── */}
    <section id="jwt-filter" style={{ marginBottom: "52px" }}>
      <SectionHeading>JWT Gateway Filter</SectionHeading>
      <CodeBlock language="java" code={`@Component
public class AuthenticationGatewayFilterFactory 
    extends AbstractGatewayFilterFactory<Config> {

    private final JwtService jwtService;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String authHeader = exchange.getRequest()
            .getHeaders().getFirst("Authorization");
        if (authHeader == null) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        String token = authHeader.split("Bearer ")[1];
        Long userId = jwtService.getUserIdFromToken(token);
        ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
            .header("X_User-Id", userId.toString()).build();
        return chain.filter(exchange.mutate().request(mutatedRequest).build());
    }
}`} />
    </section>

    <div style={{ height: "1px", background: "rgba(254,250,224,0.06)", marginBottom: "52px" }} />

    {/* ── API ENDPOINTS ── */}
    <section id="api-endpoints" style={{ marginBottom: "52px" }}>
      <SectionHeading>API Endpoints</SectionHeading>

      {[
        {
          label: "Order Service",
          rows: [
            ["POST",   "/orders/add"],
            ["GET",    "/orders/{id}"],
            ["GET",    "/orders/all"],
            ["PUT",    "/orders/update/{id}"],
            ["DELETE", "/orders/delete/{id}"],
          ],
        },
        {
          label: "Inventory Service",
          rows: [
            ["GET", "/inventory/products/all"],
            ["GET", "/inventory/products/{id}"],
            ["PUT", "/inventory/products/updateStocks"],
            ["PUT", "/inventory/products/increaseStocks"],
          ],
        },
      ].map(({ label, rows }) => (
        <div key={label} style={{ marginBottom: "28px" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(254,250,224,0.35)",
              marginBottom: "10px",
            }}
          >
            {label}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {rows.map(([method, path]) => {
              const methodColors: Record<string, string> = {
                GET: "#4A9ECC", POST: "#7EC47E", PUT: "#DDA15E", DELETE: "#E07070",
              };
              return (
                <div
                  key={path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px 14px",
                    background: "rgba(20,18,12,0.5)",
                    border: "1px solid rgba(254,250,224,0.06)",
                    borderRadius: "3px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      color: methodColors[method] ?? "#BC6C25",
                      fontWeight: 600,
                      minWidth: "48px",
                    }}
                  >
                    {method}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "12px",
                      color: "rgba(254,250,224,0.7)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {path}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>

    <div style={{ height: "1px", background: "rgba(254,250,224,0.06)", marginBottom: "52px" }} />

    {/* ── SERVICE URLS ── */}
    <section id="service-urls" style={{ marginBottom: "52px" }}>
      <SectionHeading>Service URLs</SectionHeading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "8px",
        }}
      >
        {[
          ["API Gateway",      "http://localhost:8081"],
          ["Eureka Dashboard", "http://localhost:8761"],
          ["Zipkin UI",        "http://localhost:9411"],
          ["Kibana Dashboard", "http://localhost:5601"],
        ].map(([name, url]) => (
          <UrlCard key={name} name={name} url={url} />
        ))}
      </div>
    </section>

    <div style={{ height: "1px", background: "rgba(254,250,224,0.06)", marginBottom: "52px" }} />

    {/* ── CONFIG STRUCTURE ── */}
    <section id="config-structure" style={{ marginBottom: "52px" }}>
      <SectionHeading>Configuration Structure</SectionHeading>
      <BlogImage
        src="https://github.com/user-attachments/assets/00802096-4016-432b-86df-cfbcd2cfe5f7"
        caption="Spring Cloud Config — Multi-Environment Configuration Structure"
      />
    </section>

    <div style={{ height: "1px", background: "rgba(254,250,224,0.06)", marginBottom: "52px" }} />

    {/* ── SCREENSHOTS ── */}
    <section id="screenshots" style={{ marginBottom: "52px" }}>
      <SectionHeading>Screenshots Gallery</SectionHeading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "8px",
        }}
      >
        {screenshots.map((s, i) => (
          <BlogImage key={i} src={s.src} caption={s.cap} badge={i + 1} />
        ))}
      </div>
    </section>

    <div style={{ height: "1px", background: "rgba(254,250,224,0.06)", marginBottom: "52px" }} />

    {/* ── LEARNING OUTCOMES ── */}
    <section id="learning" style={{ marginBottom: "52px" }}>
      <SectionHeading>Learning Outcomes</SectionHeading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "6px",
          marginBottom: "28px",
        }}
      >
        {[
          "Microservices Architecture best practices",
          "Spring Cloud ecosystem integration",
          "Production-ready features implementation",
          "Distributed system challenges and solutions",
          "DevOps practices with monitoring and logging",
          "Security implementation in microservices",
          "Performance optimization techniques",
        ].map((item) => (
          <OutcomeItem key={item} text={item} />
        ))}
        <OutcomeItem text="Kubernetes deployment (coming soon)" dim />
      </div>

      {/* GitHub CTA */}
      <a
        href="https://github.com/ARONAGENT/Microservices_SpringBoot_E-Commerce"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 500,
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#FEFAE0",
          background: "#BC6C25",
          border: "none",
          padding: "13px 28px",
          borderRadius: "4px",
          cursor: "pointer",
          textDecoration: "none",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#A85A1A")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#BC6C25")}
      >
        View on GitHub →
      </a>
    </section>
  </BlogLayout>
);

export default MicroservicesBlog;