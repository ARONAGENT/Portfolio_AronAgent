import BlogLayout from "@/components/BlogLayout";
import BlogImage from "@/components/BlogImage";
import CodeBlock from "@/components/CodeBlock";

const toc = [
  { id: "architecture", label: "Architecture Overview" },
  { id: "features", label: "Features" },
  { id: "quick-start", label: "Quick Start" },
  { id: "topic-mgmt", label: "Topic Management" },
  { id: "app-config", label: "Application Config" },
  { id: "topic-config", label: "Topic Config Bean" },
  { id: "producer", label: "Producer Service" },
  { id: "consumer", label: "Consumer Service" },
  { id: "avro", label: "Avro Schema" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "debug", label: "Debug Commands" },
  { id: "screenshots", label: "Screenshots Gallery" },
];

const screenshots = [
  { src: "https://github.com/user-attachments/assets/767bd4c4-2ff8-4e3c-8a55-441aa357347b", cap: "1. KafBat UI Overview" },
  { src: "https://github.com/user-attachments/assets/6a14ace3-2ab7-4828-aa44-c3b731e27422", cap: "2. Kafka Events View in KafBat" },
  { src: "https://github.com/user-attachments/assets/10873fd5-b7be-4f45-9f35-9a45953eb2e8", cap: "3. Message Published to Topic" },
  { src: "https://github.com/user-attachments/assets/3ac85046-b65c-4a13-93e3-9757fb56ef8b", cap: "4. Detailed Event Info" },
  { src: "https://github.com/user-attachments/assets/a56e8078-6874-4407-b2f5-3d19a91f7db8", cap: "5. Notification Clients Listening to user-random-topic" },
  { src: "https://github.com/user-attachments/assets/0e4b8c99-5ae8-4eca-8a61-72b419beaa3e", cap: "6. Kafka Partition Assignment" },
  { src: "https://github.com/user-attachments/assets/434a40d2-da1e-4ed9-99d5-3a58713e9ae3", cap: "7. User to Kafka Flow in Confluent" },
];

const KafkaBlog = () => (
  <BlogLayout
    title="Apache Kafka with Spring Boot — Producer-Consumer to Schema Registry"
    tags={["Kafka", "Spring Boot", "Avro", "Schema Registry"]}
    readTime="18 min read"
    toc={toc}
  >
    <section id="architecture" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Architecture Overview</h2>
      <BlogImage
        src="https://github.com/user-attachments/assets/aa52318e-b8fc-4386-b6b8-e2234cf5699a"
        caption="Kafka + Spring Boot — Full Architecture Overview"
        loading="eager"
      />
      <p className="text-muted-foreground">
        Apache Kafka is a distributed event streaming platform. This guide covers producer-consumer patterns, Avro serialization with Confluent Schema Registry, and real-time notification systems.
      </p>
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="features" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Features</h2>
      <div className="mb-4">
        <h3 className="font-heading font-bold text-lg text-primary mb-2">Core</h3>
        <div className="flex flex-wrap gap-2">
          {["Kafka Producer", "Kafka Consumer", "Topic Management", "Error Handling", "JSON/Avro serialization"].map((s) => (
            <span key={s} className="skill-pill text-xs">{s}</span>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-heading font-bold text-lg text-primary mb-2">Advanced</h3>
        <div className="flex flex-wrap gap-2">
          {["Schema Registry", "Message Monitoring", "Security (SSL/SASL)", "Batch Processing", "Performance Tuning"].map((s) => (
            <span key={s} className="skill-pill text-xs">{s}</span>
          ))}
        </div>
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="quick-start" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Quick Start</h2>
      <CodeBlock language="bash" code={`# Generate cluster UUID
.\\bin\\windows\\kafka-storage.bat random-uuid

# Format storage
.\\bin\\windows\\kafka-storage.bat format -t aW47Xy3ASHGaGkZgOqOaNA \\
  -c .\\config\\kraft\\server.properties

# Start Kafka (KRaft mode — no ZooKeeper needed)
.\\bin\\windows\\kafka-server-start.bat .\\config\\kraft\\server.properties

# Create topic
kafka-topics.bat --create --topic rohan-events \\
  --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="topic-mgmt" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Topic Management Commands</h2>
      <CodeBlock language="bash" code={`kafka-topics.bat --list --bootstrap-server localhost:9092
kafka-topics.bat --describe --topic rohan-events --bootstrap-server localhost:9092
kafka-topics.bat --delete --topic rohan-events --bootstrap-server localhost:9092`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="app-config" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Application Configuration</h2>
      <CodeBlock language="yaml" code={`# Consumer
spring:
  kafka:
    bootstrap-servers: localhost:9092
    consumer:
      group-id: \${spring.application.name}
      key-deserializer: org.apache.kafka.common.serialization.LongDeserializer
      value-deserializer: io.confluent.kafka.serializers.KafkaAvroDeserializer
      properties:
        schema.registry.url: http://127.0.0.1:8081
        specific.avro.reader: true

# Producer
spring:
  kafka:
    producer:
      key-serializer: org.apache.kafka.common.serialization.LongSerializer
      value-serializer: io.confluent.kafka.serializers.KafkaAvroSerializer
      properties:
        schema.registry.url: http://127.0.0.1:8081

kafka:
  topic:
    user-random-topic: user-random-topic
    user-created-topic: user-created-topic`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="topic-config" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Kafka Topic Config Bean</h2>
      <CodeBlock language="java" code={`@Configuration
public class KafkaTopicConfig {
    @Value("\${kafka.topic.user-created-topic}")
    private String KAFKA_CREATED_USER_TOPIC;

    @Bean
    public NewTopic userCreatedTopic() {
        return new NewTopic(KAFKA_CREATED_USER_TOPIC, 3, (short) 1);
    }
}`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="producer" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Producer Service</h2>
      <CodeBlock language="java" code={`@Service @Slf4j @RequiredArgsConstructor
public class UserServices {
    private final KafkaTemplate<Long, UserCreatedEvent> kafkaTemplate;

    @Value("\${kafka.topic.user-created-topic}")
    private String KAFKA_CREATED_USER_TOPIC;

    public void createUser(UserDto userDto) {
        UserEntity saved = userRepository.save(
            modelMapper.map(userDto, UserEntity.class));
        UserCreatedEvent event = modelMapper.map(saved, UserCreatedEvent.class);
        kafkaTemplate.send(KAFKA_CREATED_USER_TOPIC, event.getId(), event);
    }
}`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="consumer" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Consumer Service</h2>
      <CodeBlock language="java" code={`@Service @Slf4j
public class UserCreatedConsumer {
    @KafkaListener(topics = "user-created-topic")
    public void listenUserCreatedEvent(UserCreatedEvent event) {
        log.info("Received event: {}", event);
    }
}`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="avro" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Avro Schema</h2>
      <CodeBlock language="json" code={`{
  "type": "record",
  "name": "UserCreatedEvent",
  "namespace": "com.springJourneyMax.events",
  "fields": [
    { "name": "id", "type": "long" },
    { "name": "name", "type": "string" },
    { "name": "email", "type": "string" }
  ]
}`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="troubleshooting" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Troubleshooting</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Connection Refused", desc: "Ensure Kafka is running on localhost:9092" },
          { title: "Serialization Error", desc: "Check Schema Registry is running" },
          { title: "Consumer Lag", desc: "Increase concurrency or optimize processing" },
        ].map((t) => (
          <div key={t.title} className="glass rounded-lg p-4">
            <h4 className="font-heading font-bold text-sm text-destructive mb-1">{t.title}</h4>
            <p className="text-xs text-muted-foreground">{t.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="debug" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Debug Commands</h2>
      <CodeBlock language="bash" code={`kafka-consumer-groups.bat --bootstrap-server localhost:9092 --list
kafka-consumer-groups.bat --bootstrap-server localhost:9092 \\
  --describe --group event-consumer-group
kafka-console-consumer.bat --topic rohan-events --from-beginning \\
  --bootstrap-server localhost:9092 --property print.key=true`} />
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
        href="https://github.com/ARONAGENT/Kafka-Driven-User-Notification-System"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 gradient-btn px-6 py-3 rounded-lg text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
      >
        View on GitHub →
      </a>
    </section>
  </BlogLayout>
);

export default KafkaBlog;
