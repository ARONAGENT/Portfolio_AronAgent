import BlogLayout from "@/components/BlogLayout";
import BlogImage from "@/components/BlogImage";
import CodeBlock from "@/components/CodeBlock";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "features", label: "Features" },
  { id: "filter-chain", label: "Security Filter Chain" },
  { id: "jwt-auth", label: "JWT Authentication" },
  { id: "jwt-code", label: "JWT Token Code" },
  { id: "oauth2", label: "OAuth2 Integration" },
  { id: "rbac", label: "Role-Based Authorization" },
  { id: "method-security", label: "Method-Level Security" },
  { id: "session", label: "Session Management" },
  { id: "filters", label: "Custom Filters" },
  { id: "exceptions", label: "Exception Handling" },
  { id: "screenshots", label: "Screenshots" },
  { id: "api-endpoints", label: "API Endpoints" },
  { id: "tech-stack", label: "Tech Stack" },
];

const SpringSecurityBlog = () => (
  <BlogLayout
    title="Spring Security Complete Guide — JWT, OAuth2, RBAC & More"
    tags={["Spring Security", "JWT", "OAuth2", "RBAC"]}
    readTime="22 min read"
    toc={toc}
  >
    {/* Overview */}
    <section id="overview" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Overview</h2>
      <p className="text-muted-foreground mb-4">
        Security is the backbone of every production-grade backend. This guide walks through a comprehensive
        Spring Security implementation covering JWT-based stateless authentication, Google OAuth2 social login,
        role-based access control (RBAC), granular permissions, session management, and custom filter chains —
        all built on Spring Boot 3.x and Spring Security 6.x with Java 21.
      </p>
      <p className="text-muted-foreground">
        Whether you're protecting REST APIs, handling token refresh flows, or wiring up method-level security
        annotations, this project has you covered with real-world, production-ready patterns.
      </p>
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* Architecture */}
    <section id="architecture" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Architecture</h2>
      <p className="text-muted-foreground mb-6">
        Every incoming request passes through the Security Filter Chain before reaching any controller.
        The chain branches into JWT validation, OAuth2 handling, and RBAC enforcement — all converging
        into the Security Context.
      </p>
      <BlogImage
        src="https://github.com/user-attachments/assets/6910a91d-bb10-4e14-be40-327e3543e9a8"
        caption="Spring Security Flow Chart — Full request lifecycle through the security chain"
        loading="eager"
      />
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* Features */}
    <section id="features" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Features</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-muted-foreground font-normal">Category</th>
              <th className="text-left py-2 text-muted-foreground font-normal">Feature</th>
              <th className="text-left py-2 text-muted-foreground font-normal">Description</th>
            </tr>
          </thead>
          <tbody className="text-foreground">
            {[
              ["Core Auth", "JWT Tokens", "Access + Refresh token pair with expiry"],
              ["Core Auth", "BCrypt", "Password hashing with strength factor 12"],
              ["Social Login", "OAuth2 Google", "One-click Google sign-in flow"],
              ["Authorization", "RBAC", "ADMIN / USER / CREATOR roles"],
              ["Authorization", "Granular Perms", "READ / WRITE / DELETE permission level"],
              ["Sessions", "DB Persistence", "Sessions stored and validated from DB"],
              ["Filters", "JWT Filter", "OncePerRequestFilter for token validation"],
              ["Filters", "Logging Filter", "Structured request/response logging"],
              ["Exceptions", "AuthEntryPoint", "JSON 401 responses on auth failure"],
              ["Exceptions", "JwtExceptionHandler", "Expired / invalid token handling"],
            ].map(([cat, feat, desc]) => (
              <tr key={feat} className="border-b border-border/50">
                <td className="py-2 text-secondary font-mono text-xs">{cat}</td>
                <td className="py-2 text-primary font-mono text-xs">{feat}</td>
                <td className="py-2 text-muted-foreground">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* Security Filter Chain */}
    <section id="filter-chain" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Security Filter Chain</h2>
      <p className="text-muted-foreground mb-4">
        The <code className="text-primary text-sm bg-surface2 px-1.5 py-0.5 rounded">SecurityFilterChain</code> bean
        is the heart of the configuration. It disables CSRF for stateless REST APIs, enforces URL-based
        authorization rules, sets session policy to STATELESS, and wires the JWT filter before the default
        username/password filter.
      </p>
      <CodeBlock language="java" code={`@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* JWT Authentication */}
    <section id="jwt-auth" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">JWT Authentication Flow</h2>
      <p className="text-muted-foreground mb-6">
        JWT (JSON Web Token) enables stateless authentication — no server-side session required.
        Every request carries a signed token the server verifies independently.
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-muted-foreground font-normal">Step</th>
              <th className="text-left py-2 text-muted-foreground font-normal">Action</th>
              <th className="text-left py-2 text-muted-foreground font-normal">Result</th>
            </tr>
          </thead>
          <tbody className="text-foreground">
            {[
              ["1", "User Login", "Credentials validated against DB"],
              ["2", "Token Generation", "Access token (10h) + Refresh token (7d)"],
              ["3", "Cookie Storage", "Stored in HTTP-only secure cookies"],
              ["4", "Request Validation", "JWT filter extracts & verifies token"],
              ["5", "Token Refresh", "New access token issued via refresh endpoint"],
            ].map(([step, action, result]) => (
              <tr key={step} className="border-b border-border/50">
                <td className="py-2 text-primary font-mono text-xs font-bold">{step}</td>
                <td className="py-2 font-medium">{action}</td>
                <td className="py-2 text-muted-foreground">{result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BlogImage
          src="https://github.com/user-attachments/assets/c0614b1f-d5ea-45ac-964c-c84b1dba27f5"
          caption="JWT Token Generation — Access & Refresh token pair"
        />
        <BlogImage
          src="https://github.com/user-attachments/assets/4e1f5893-42ac-4609-8917-5ab4e0a2899f"
          caption="JWT Token Verification — Signature validation"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BlogImage
          src="https://github.com/user-attachments/assets/cadb0749-0cf4-47df-ba9c-2a9b53e2c38e"
          caption="JWT Token in Login Response"
        />
        <BlogImage
          src="https://github.com/user-attachments/assets/fc96e7fc-362f-4230-82f5-9ed7511254c5"
          caption="JWT Token Saved as HTTP-only Cookie"
        />
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* JWT Code */}
    <section id="jwt-code" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">JWT Token Code</h2>
      <p className="text-muted-foreground mb-4">
        The <code className="text-primary text-sm bg-surface2 px-1.5 py-0.5 rounded">JwtService</code> handles
        token creation, validation, and claim extraction. Access tokens expire in 10 hours; refresh tokens last 7 days.
      </p>
      <CodeBlock language="java" code={`@Service
public class JwtService {

    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return Jwts.builder()
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }
}`} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <BlogImage
          src="https://github.com/user-attachments/assets/e46aba2b-1587-4fa5-951c-ebdc40d73deb"
          caption="Refresh Token — Login with existing refresh token"
        />
        <BlogImage
          src="https://github.com/user-attachments/assets/acf5e240-d6cc-48ea-837a-29afda7450e8"
          caption="Refresh Token Generation — New access token issued"
        />
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* OAuth2 */}
    <section id="oauth2" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">OAuth2 Google Integration</h2>
      <p className="text-muted-foreground mb-4">
        Google OAuth2 lets users sign in with their Google account. On success, the
        <code className="text-primary text-sm bg-surface2 px-1.5 py-0.5 rounded mx-1">OAuth2SuccessHandler</code>
        creates or updates the user, generates a JWT, and redirects to the dashboard.
      </p>
      <CodeBlock language="yaml" code={`spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: \${GOOGLE_CLIENT_ID}
            client-secret: \${GOOGLE_CLIENT_SECRET}
            scope: openid,profile,email
        provider:
          google:
            authorization-uri: https://accounts.google.com/o/oauth2/auth
            token-uri: https://oauth2.googleapis.com/token
            user-info-uri: https://www.googleapis.com/oauth2/v2/userinfo`} />
      <CodeBlock language="java" code={`@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        // Create or update user in DB
        // Generate JWT token
        // Redirect to dashboard
    }
}`} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <BlogImage
          src="https://github.com/user-attachments/assets/dcb0aaf6-67f0-4a69-878c-c32d0874e9fd"
          caption="OAuth2 Login Page"
        />
        <BlogImage
          src="https://github.com/user-attachments/assets/145ba61a-4b37-4bc7-a279-75d7c5857b3b"
          caption="Google Account Selection"
        />
        <BlogImage
          src="https://github.com/user-attachments/assets/0716ecb9-166a-45b9-bf49-3e866a744e94"
          caption="OAuth2 Authentication Success"
        />
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* RBAC */}
    <section id="rbac" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Role-Based Authorization</h2>
      <p className="text-muted-foreground mb-4">
        Users are assigned roles (ADMIN, USER, CREATOR), and roles carry granular permissions (READ, WRITE, DELETE).
        This three-layer model — User → Role → Permission — gives fine-grained access control.
      </p>
      <CodeBlock language="java" code={`@Entity
public class User {
    private String username;
    private String password;
    private String email;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> roles;
}

@Entity
public class Role {
    private String name; // ADMIN, USER, CREATOR

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Permission> permissions;
}

@Entity
public class Permission {
    private String name; // READ, WRITE, DELETE
}`} />
      <BlogImage
        src="https://github.com/user-attachments/assets/d3e1a44e-09c6-4e70-bc79-adee27f7b927"
        caption="Role Based Authority — DB tables showing User, Role, and Permission relationships"
      />
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* Method-Level Security */}
    <section id="method-security" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Method-Level Security</h2>
      <p className="text-muted-foreground mb-4">
        With <code className="text-primary text-sm bg-surface2 px-1.5 py-0.5 rounded">@EnableMethodSecurity</code>,
        you can protect individual controller methods using annotations — no need to configure every URL manually.
      </p>
      <CodeBlock language="java" code={`@RestController
public class AdminController {

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/users")
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @PreAuthorize("hasAuthority('DELETE_USER')")
    @DeleteMapping("/admin/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
    }

    @Secured({"ROLE_ADMIN", "ROLE_CREATOR"})
    @PostMapping("/admin/posts")
    public Post createPost(@RequestBody Post post) {
        return postService.save(post);
    }

    // Custom annotation combining multiple rules
    @AdminOrOwner
    @PutMapping("/users/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId,
                                           @RequestBody User user) {
        return ResponseEntity.ok(userService.update(userId, user));
    }
}`} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <BlogImage
          src="https://github.com/user-attachments/assets/ce252ecc-9967-4f85-94f7-22f9a2fc7f84"
          caption="Protected Endpoint — Successful access with valid role"
        />
        <BlogImage
          src="https://github.com/user-attachments/assets/4d056140-663d-44cf-9be1-02d8b7222fb2"
          caption="403 Forbidden — Access denied for insufficient role"
        />
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* Session Management */}
    <section id="session" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Session Management</h2>
      <p className="text-muted-foreground mb-4">
        Sessions are persisted to the database, allowing validation of active sessions and
        forced logout capabilities. Every login creates a new session record tied to the JWT token.
      </p>
      <CodeBlock language="java" code={`@Entity
public class UserSession {
    private String sessionId;
    private String username;
    private String jwtToken;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private boolean active;
}

@Service
public class SessionService {

    public void createSession(String username, String jwtToken) {
        UserSession session = new UserSession();
        session.setUsername(username);
        session.setJwtToken(jwtToken);
        session.setActive(true);
        sessionRepository.save(session);
    }

    public boolean isSessionValid(String token) {
        return sessionRepository.findByJwtTokenAndActiveTrue(token)
            .map(s -> s.getExpiresAt().isAfter(LocalDateTime.now()))
            .orElse(false);
    }
}`} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <BlogImage
          src="https://github.com/user-attachments/assets/8771e085-ee37-4eef-8951-b58e92c1faa3"
          caption="Session Creation — New session persisted on login"
        />
        <BlogImage
          src="https://github.com/user-attachments/assets/d846c4fe-5e73-4694-9605-314bf0010734"
          caption="Session Database — Active session records in DB"
        />
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* Custom Filters */}
    <section id="filters" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Custom Security Filters</h2>
      <p className="text-muted-foreground mb-4">
        Two custom filters power the security chain: the JWT Authentication Filter validates
        tokens on every request, and the Logging Filter records structured request/response metadata.
      </p>
      <CodeBlock language="java" code={`@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String jwt = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            username = jwtService.extractUsername(jwt);
        }

        if (username != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails =
                userDetailsService.loadUserByUsername(username);

            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}`} />
      <BlogImage
        src="https://github.com/user-attachments/assets/fab314ba-6c58-4643-b262-54ddc15ca05f"
        caption="Custom Logging Filter — Structured request/response log output"
      />
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* Exception Handling */}
    <section id="exceptions" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Exception Handling</h2>
      <p className="text-muted-foreground mb-4">
        All security failures return clean JSON error responses — no HTML error pages.
        <code className="text-primary text-sm bg-surface2 px-1.5 py-0.5 rounded mx-1">AuthenticationEntryPoint</code>
        handles 401s,
        <code className="text-primary text-sm bg-surface2 px-1.5 py-0.5 rounded mx-1">@ControllerAdvice</code>
        handles JWT errors.
      </p>
      <CodeBlock language="java" code={`@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter().write("""
            {
                "error": "Unauthorized",
                "message": "Authentication required",
                "path": "%s"
            }
            """.formatted(request.getRequestURI()));
    }
}

@ControllerAdvice
public class JwtExceptionHandler {

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ErrorResponse> handleExpired(ExpiredJwtException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(new ErrorResponse("TOKEN_EXPIRED", "JWT token has expired"));
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ErrorResponse> handleJwt(JwtException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(new ErrorResponse("JWT_ERROR", ex.getMessage()));
    }
}`} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <BlogImage
          src="https://github.com/user-attachments/assets/31b82ffa-2153-4294-8d76-0957cf5dfa50"
          caption="Authentication Exception — 401 JSON response on auth failure"
        />
        <BlogImage
          src="https://github.com/user-attachments/assets/0e69eab7-825e-4752-b19e-33148de793a5"
          caption="JWT Expiration Exception — Expired token error response"
        />
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* Screenshots */}
    <section id="screenshots" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Screenshots</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BlogImage
          src="https://github.com/user-attachments/assets/77ffe071-37f7-4444-9927-40eab4efdc05"
          caption="User Registration with Password Encoding"
        />
        <BlogImage
          src="https://github.com/user-attachments/assets/c7f3c5f4-12dd-46c2-985e-86a6d2a01271"
          caption="Database Storage — BCrypt encoded password saved"
        />
      </div>
      <div className="flex flex-wrap gap-4 mt-6">
        <a
          href="https://github.com/user-attachments/files/18874505/Spring.Security.Working.Flow.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-btn px-6 py-3 rounded-lg text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
        >
          📋 Download Security Working Flow PDF
        </a>
        <a
          href="https://github.com/user-attachments/files/18875841/JWT.and.Refresh.Token.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg font-semibold border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
        >
          📄 JWT & Refresh Token PDF
        </a>
        <a
          href="https://github.com/ARONAGENT/Spring_Security_MAX"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg font-semibold border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
        >
          View on GitHub →
        </a>
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* API Endpoints */}
    <section id="api-endpoints" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">API Endpoints</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-muted-foreground font-normal">Method</th>
              <th className="text-left py-2 text-muted-foreground font-normal">Endpoint</th>
              <th className="text-left py-2 text-muted-foreground font-normal">Access</th>
              <th className="text-left py-2 text-muted-foreground font-normal">Description</th>
            </tr>
          </thead>
          <tbody className="text-foreground">
            {[
              ["POST", "/auth/signup", "Public", "User registration"],
              ["POST", "/auth/login", "Public", "Login & receive JWT"],
              ["POST", "/auth/refresh", "Public", "Refresh access token"],
              ["POST", "/auth/logout", "Authenticated", "Invalidate session"],
              ["GET", "/admin/users", "ADMIN", "List all users"],
              ["DELETE", "/admin/users/{id}", "DELETE_USER perm", "Remove a user"],
              ["GET", "/login/authorization/google", "Public", "Start Google OAuth2"],
              ["GET", "/login/oauth2/code/google", "Public", "Google OAuth2 callback"],
            ].map(([method, endpoint, access, desc]) => (
              <tr key={endpoint} className="border-b border-border/50">
                <td className="py-2">
                  <span className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${
                    method === "GET" ? "text-green-400" :
                    method === "POST" ? "text-blue-400" :
                    method === "DELETE" ? "text-red-400" : "text-primary"
                  }`}>{method}</span>
                </td>
                <td className="py-2 text-primary font-mono text-xs">{endpoint}</td>
                <td className="py-2 text-muted-foreground text-xs">{access}</td>
                <td className="py-2 text-muted-foreground">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    {/* Tech Stack */}
    <section id="tech-stack" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Tech Stack</h2>
      <div className="flex flex-wrap gap-2">
        {[
          "Spring Boot 3.x",
          "Spring Security 6.x",
          "Java 21",
          "JWT (JJWT)",
          "OAuth2 Google",
          "BCrypt",
          "JPA / Hibernate",
          "H2 / MySQL",
          "Maven",
          "Swagger UI",
        ].map((t) => (
          <span key={t} className="skill-pill">{t}</span>
        ))}
      </div>
    </section>
  </BlogLayout>
);

export default SpringSecurityBlog;