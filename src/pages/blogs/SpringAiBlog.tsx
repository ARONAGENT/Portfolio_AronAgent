import BlogLayout from "@/components/BlogLayout";
import BlogImage from "@/components/BlogImage";
import CodeBlock from "@/components/CodeBlock";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "chat-client", label: "Basic ChatClient" },
  { id: "prompt-template", label: "PromptTemplate" },
  { id: "vector-rag", label: "Vector Store & RAG" },
  { id: "memory", label: "Memory Strategies" },
  { id: "advisors", label: "Advisors" },
  { id: "tool-calling", label: "Tool Calling" },
  { id: "docker-setup", label: "Docker Setup" },
  { id: "installation", label: "Installation" },
  { id: "screenshots", label: "Screenshots Gallery" },
];

const screenshots = [
  { src: "https://github.com/user-attachments/assets/eb52cedb-04e7-4992-97ea-9d9bee383298", cap: "1. ChatClient Successfully Implemented" },
  { src: "https://github.com/user-attachments/assets/a3fd5f42-56b7-4a28-a5e8-6a965ee9434e", cap: "2. Fast Response with OpenAI GPT-4o-mini" },
  { src: "https://github.com/user-attachments/assets/32b0fe87-155c-47a8-8d79-49d6e53372d8", cap: "3. PromptTemplate — Dynamic Variable Injection" },
  { src: "https://github.com/user-attachments/assets/45a10eea-eea4-481b-9978-b83df53eaba6", cap: "4. Data Stored in Vector Store (Embedded Format)" },
  { src: "https://github.com/user-attachments/assets/8c1ea8db-d831-4b5f-9449-dc1a3b72189b", cap: "5. Similarity Search from Vector Store" },
  { src: "https://github.com/user-attachments/assets/b8d77771-a46b-429e-9bee-e678e229801d", cap: "6. RAG Implementation — Custom Vector Store Search" },
  { src: "https://github.com/user-attachments/assets/e0b2b97d-bca0-47d2-8d42-262f5d92f462", cap: "7. VectorStoreChatMemoryAdvisor — Long-Term Memory" },
  { src: "https://github.com/user-attachments/assets/a17b2975-09a7-469b-9b76-4f9bae17dcf5", cap: "8. Answer via VectorStore using GPT-4o-mini" },
  { src: "https://github.com/user-attachments/assets/46d2c05f-4906-40f0-bfe2-7b715a7f8bcf", cap: "9. MessageChatMemoryAdvisor — Short-Term Memory" },
  { src: "https://github.com/user-attachments/assets/9e0db28c-8806-47cc-b402-c5d7d9c11c90", cap: "10. Hybrid Memory — Fallback from Message to VectorStore" },
  { src: "https://github.com/user-attachments/assets/7f615b65-c2e7-4682-9685-f9ad33e2033d", cap: "11. Chat Memory Stored in Database" },
  { src: "https://github.com/user-attachments/assets/e573d836-06c7-4b12-9e46-da0d405a94ac", cap: "12. QuestionAnswerAdvisor — Best for RAG Q&A" },
  { src: "https://github.com/user-attachments/assets/160db13c-5c5e-47e0-98e2-7373101bccd3", cap: "13. SafeGuardAdvisor — Policy Governance" },
  { src: "https://github.com/user-attachments/assets/a380695c-01c7-4bc9-913c-ed411f9b1817", cap: "14. Custom TokenUsage Advisor" },
  { src: "https://github.com/user-attachments/assets/75912a28-d7cc-4854-b803-32463008ef48", cap: "15. Tool Calling with OpenWeatherMap API" },
];

const SpringAiBlog = () => (
  <BlogLayout
    title="Spring AI Complete Guide — RAG, Vector Stores, Memory & Tool Calling"
    tags={["Spring AI", "RAG", "pgvector", "OpenAI"]}
    readTime="20 min read"
    toc={toc}
  >
    <section id="overview" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Overview</h2>
      <p className="text-muted-foreground">
        Spring AI is a framework bridging Spring Boot and Large Language Models. This guide covers ChatClient integration, PromptTemplates, Vector Stores with pgvector, RAG, short/long-term memory advisors, and Tool Calling with external APIs.
      </p>
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="features" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {[
          ["🤖", "ChatClient", "LLM integration (OpenAI, Ollama)"],
          ["⚡", "Fast Responses", "Optimized OpenAI calls"],
          ["📝", "PromptTemplates", "Dynamic variable injection"],
          ["🗄️", "Vector Store", "pgvector embedding storage"],
          ["🔍", "Similarity Search", "Semantic retrieval"],
          ["🧠", "RAG System", "Context-aware AI responses"],
          ["💾", "Long-Term Memory", "VectorStoreChatMemoryAdvisor"],
          ["🎯", "Short-Term Memory", "MessageChatMemoryAdvisor"],
          ["💬", "Hybrid Memory", "Intelligent fallback strategy"],
          ["📊", "DB Chat History", "Persistent conversation lookup"],
          ["❓", "Q&A Advisor", "RAG Q&A optimization"],
          ["🛡️", "SafeGuard", "Policy governance"],
          ["📈", "Token Tracking", "Custom usage monitoring"],
          ["🔧", "Tool Calling", "External API (OpenWeatherMap)"],
          ["🐳", "Dockerized", "PgVector via Docker"],
        ].map(([icon, title, desc]) => (
          <div key={title} className="glass rounded-lg p-3">
            <span className="text-lg mr-2">{icon}</span>
            <span className="text-sm font-bold text-foreground">{title}</span>
            <p className="text-xs text-muted-foreground mt-1">{desc}</p>
          </div>
        ))}
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="tech-stack" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Tech Stack</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <tbody className="text-foreground">
            {[
              ["Spring Boot", "3.x", "Application framework"],
              ["Spring AI", "Latest", "AI/LLM integration"],
              ["Java", "17+", "Programming language"],
              ["PgVector", "Latest", "Vector similarity search"],
              ["Docker", "Latest", "Containerization"],
              ["OpenAI API", "GPT-4o-mini", "Cloud LLM provider"],
              ["Ollama", "Latest", "Local LLM runtime"],
              ["PostgreSQL", "Latest", "Database with vector support"],
            ].map(([tech, ver, purpose]) => (
              <tr key={tech} className="border-b border-border/50">
                <td className="py-2 text-primary font-mono text-xs">{tech}</td>
                <td className="py-2">{ver}</td>
                <td className="py-2 text-muted-foreground">{purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="chat-client" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Basic ChatClient</h2>
      <CodeBlock language="java" code={`@Autowired
private ChatClient chatClient;

public String chat(String userMessage) {
    return chatClient.prompt()
        .user(userMessage)
        .call()
        .content();
}`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="prompt-template" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">PromptTemplate</h2>
      <CodeBlock language="java" code={`PromptTemplate template = new PromptTemplate(
    "Tell me about {topic} in {style} style"
);
Prompt prompt = template.create(Map.of(
    "topic", "Spring AI",
    "style", "professional"
));`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="vector-rag" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Vector Store & RAG</h2>
      <CodeBlock language="java" code={`// Store documents
vectorStore.add(List.of(
    new Document("Spring AI is a framework...", metadata)
));

// Similarity search
List<Document> results = vectorStore.similaritySearch(
    SearchRequest.query("What is Spring AI?").withTopK(5)
);`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="memory" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Memory Strategies</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "VectorStoreChatMemoryAdvisor", desc: "Long-term persistent memory across sessions" },
          { title: "MessageChatMemoryAdvisor", desc: "Short-term session-based memory" },
          { title: "Hybrid Strategy", desc: "Falls back from MessageChatMemory to VectorStore automatically" },
        ].map((m) => (
          <div key={m.title} className="glass rounded-lg p-4">
            <h4 className="font-heading font-bold text-sm text-primary mb-2">{m.title}</h4>
            <p className="text-xs text-muted-foreground">{m.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="advisors" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Advisors Explained</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "QuestionAnswerAdvisor", desc: "Specialized for RAG Q&A, retrieves context before answering" },
          { title: "SafeGuardAdvisor", desc: "Enforces policies, prevents off-topic/harmful conversations" },
          { title: "Custom TokenUsage Advisor", desc: "Tracks token consumption for cost optimization" },
        ].map((a) => (
          <div key={a.title} className="glass rounded-lg p-4">
            <h4 className="font-heading font-bold text-sm text-primary mb-2">{a.title}</h4>
            <p className="text-xs text-muted-foreground">{a.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="tool-calling" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Tool Calling</h2>
      <CodeBlock language="java" code={`@Bean
public FunctionCallback weatherFunction() {
    return FunctionCallback.builder()
        .function("getCurrentWeather", this::getWeather)
        .description("Get current weather for a location")
        .inputType(WeatherRequest.class)
        .build();
}`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="docker-setup" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Docker Setup</h2>
      <CodeBlock language="bash" code={`docker-compose up -d
# Starts PgVector (PostgreSQL + pgvector extension)`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="installation" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Installation Steps</h2>
      <CodeBlock language="bash" code={`git clone https://github.com/ARONAGENT/Spring_AI.git
docker-compose up -d
# Set OPENAI_API_KEY in application.properties
mvn clean install
mvn spring-boot:run
# Access: http://localhost:8080`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="screenshots" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Screenshots Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {screenshots.map((s, i) => (
          <BlogImage key={i} src={s.src} caption={s.cap} badge={i + 1} />
        ))}
      </div>
      <a
        href="https://github.com/ARONAGENT/Spring_AI"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 gradient-btn px-6 py-3 rounded-lg text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
      >
        View on GitHub →
      </a>
    </section>
  </BlogLayout>
);

export default SpringAiBlog;
