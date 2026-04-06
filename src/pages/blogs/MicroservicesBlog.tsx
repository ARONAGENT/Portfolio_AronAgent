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

const MicroservicesBlog = () => (
  <BlogLayout
    title="Building an E-Commerce Microservices Platform with Spring Cloud"
    tags={["Spring Cloud", "Microservices", "Docker", "ELK Stack"]}
    readTime="15 min read"
    toc={toc}
  >
    {/* Architecture Overview */}
    <section id="architecture" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Architecture Overview</h2>
      <BlogImage
        src="https://github.com/user-attachments/assets/363444ac-3585-483f-bfaf-7da4b8d851d6"
        caption="Microservices Architecture Overview — Distributed System Design"
        loading="eager"
      />
      <p className="text-muted-foreground mb-6">
        This distributed architecture comprises 5 core services working together to form a production-ready e-commerce platform.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: "Eureka Server", port: "8761", desc: "Service registry and discovery, health checks, load balancing" },
          { name: "API Gateway", port: "8081", desc: "Single entry point, JWT auth filter, rate limiting, logging" },
          { name: "Config Server", port: "8080", desc: "Git-based centralized config, environment-specific, dynamic refresh" },
          { name: "Order Service", port: "9020", desc: "Create/cancel orders, OpenFeign to inventory, circuit breaker" },
          { name: "Inventory Service", port: "9010", desc: "Stock management, product catalog, real-time updates" },
        ].map((s) => (
          <div key={s.name} className="glass rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-heading font-bold text-sm text-foreground">{s.name}</h4>
              <span className="font-mono text-xs text-primary">:{s.port}</span>
            </div>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* Auth Workflow */}
    <section id="auth-workflow" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Authentication Workflow</h2>
      <BlogImage
        src="https://github.com/user-attachments/assets/6b779958-96d5-4623-8f50-9a3a43116f15"
        caption="JWT Authentication Workflow — Gateway Level Security"
      />
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* Features */}
    <section id="features" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Features</h2>
      {[
        { title: "Core", items: ["Service Discovery (Eureka)", "API Gateway (Spring Cloud)", "Inter-service (OpenFeign)", "Circuit Breaker (Resilience4J)", "Load Balancing + Rate Limiting"] },
        { title: "Advanced", items: ["JWT at Gateway", "Centralized Config", "Zipkin + Micrometer tracing", "ELK logging", "Dynamic Config Refresh", "Multi-env support"] },
        { title: "Business", items: ["Order Management (Create/Update/Cancel)", "Inventory Management", "User Auth & Authorization", "Real-time Stock Updates"] },
      ].map((g) => (
        <div key={g.title} className="mb-6">
          <h3 className="font-heading font-bold text-lg text-primary mb-3">{g.title}</h3>
          <div className="flex flex-wrap gap-2">
            {g.items.map((item) => (
              <span key={item} className="skill-pill text-xs">{item}</span>
            ))}
          </div>
        </div>
      ))}
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* Tech Stack */}
    <section id="tech-stack" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Tech Stack</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-muted-foreground font-normal">Category</th>
              <th className="text-left py-2 text-muted-foreground font-normal">Technology</th>
              <th className="text-left py-2 text-muted-foreground font-normal">Purpose</th>
            </tr>
          </thead>
          <tbody className="text-foreground">
            {[
              ["Framework", "Spring Boot 3.x", "Microservice foundation"],
              ["Cloud", "Spring Cloud 2023.x", "Microservice patterns"],
              ["Service Discovery", "Netflix Eureka", "Registration & discovery"],
              ["API Gateway", "Spring Cloud Gateway", "Request routing & filtering"],
              ["Communication", "OpenFeign", "Declarative REST clients"],
              ["Resilience", "Resilience4J", "Circuit breaker, retry, rate limiter"],
              ["Configuration", "Spring Cloud Config", "Centralized configuration"],
              ["Security", "Spring Security + JWT", "Authentication & authorization"],
              ["Monitoring", "Micrometer + Zipkin", "Distributed tracing"],
              ["Logging", "ELK Stack", "Centralized logging"],
              ["Database", "H2/MySQL", "Data persistence"],
              ["Build", "Maven", "Dependency management"],
            ].map(([cat, tech, purpose]) => (
              <tr key={cat} className="border-b border-border/50">
                <td className="py-2 text-primary font-mono text-xs">{cat}</td>
                <td className="py-2">{tech}</td>
                <td className="py-2 text-muted-foreground">{purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* Gateway Config */}
    <section id="gateway-config" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Gateway Configuration</h2>
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

    <hr className="border-primary/10 mb-12" />

    {/* JWT Filter */}
    <section id="jwt-filter" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">JWT Gateway Filter</h2>
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

    <hr className="border-primary/10 mb-12" />

    {/* API Endpoints */}
    <section id="api-endpoints" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">API Endpoints</h2>
      <h3 className="font-heading font-bold text-lg text-foreground mb-3">Order Service</h3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <tbody className="text-foreground">
            {[
              ["POST", "/orders/add"],
              ["GET", "/orders/{id}"],
              ["GET", "/orders/all"],
              ["PUT", "/orders/update/{id}"],
              ["DELETE", "/orders/delete/{id}"],
            ].map(([method, path]) => (
              <tr key={path} className="border-b border-border/50">
                <td className="py-2 font-mono text-xs text-primary w-20">{method}</td>
                <td className="py-2 font-mono text-xs">{path}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="font-heading font-bold text-lg text-foreground mb-3">Inventory Service</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <tbody className="text-foreground">
            {[
              ["GET", "/inventory/products/all"],
              ["GET", "/inventory/products/{id}"],
              ["PUT", "/inventory/products/updateStocks"],
              ["PUT", "/inventory/products/increaseStocks"],
            ].map(([method, path]) => (
              <tr key={path} className="border-b border-border/50">
                <td className="py-2 font-mono text-xs text-primary w-20">{method}</td>
                <td className="py-2 font-mono text-xs">{path}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* Service URLs */}
    <section id="service-urls" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Service URLs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          ["API Gateway", "http://localhost:8081"],
          ["Eureka Dashboard", "http://localhost:8761"],
          ["Zipkin UI", "http://localhost:9411"],
          ["Kibana Dashboard", "http://localhost:5601"],
        ].map(([name, url]) => (
          <div key={name} className="glass rounded-lg p-4">
            <p className="text-sm font-heading font-bold text-foreground">{name}</p>
            <p className="font-mono text-xs text-primary">{url}</p>
          </div>
        ))}
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* Config Structure */}
    <section id="config-structure" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Configuration Structure</h2>
      <BlogImage
        src="https://github.com/user-attachments/assets/00802096-4016-432b-86df-cfbcd2cfe5f7"
        caption="Spring Cloud Config — Multi-Environment Configuration Structure"
      />
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* Screenshots */}
    <section id="screenshots" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Screenshots Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {screenshots.map((s, i) => (
          <BlogImage key={i} src={s.src} caption={s.cap} badge={i + 1} />
        ))}
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* Learning Outcomes */}
    <section id="learning" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Learning Outcomes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          "Microservices Architecture best practices",
          "Spring Cloud ecosystem integration",
          "Production-ready features implementation",
          "Distributed system challenges and solutions",
          "DevOps practices with monitoring and logging",
          "Security implementation in microservices",
          "Performance optimization techniques",
        ].map((item) => (
          <div key={item} className="glass rounded-lg p-3 flex items-center gap-2">
            <span className="text-accent">✅</span>
            <span className="text-sm text-foreground">{item}</span>
          </div>
        ))}
        <div className="glass rounded-lg p-3 flex items-center gap-2 opacity-60">
          <span>☑️</span>
          <span className="text-sm text-foreground">Kubernetes deployment (coming soon)</span>
        </div>
      </div>
      <a
        href="https://github.com/ARONAGENT/Microservices_SpringBoot_E-Commerce"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 gradient-btn px-6 py-3 rounded-lg text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
      >
        View on GitHub →
      </a>
    </section>
  </BlogLayout>
);

export default MicroservicesBlog;
