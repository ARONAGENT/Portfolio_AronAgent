import BlogLayout from "@/components/BlogLayout";
import BlogImage from "@/components/BlogImage";
import CodeBlock from "@/components/CodeBlock";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "commands", label: "Essential Commands" },
  { id: "compose-config", label: "Docker Compose Config" },
  { id: "compose-commands", label: "Compose Commands" },
  { id: "containerizing", label: "Containerizing Spring Boot" },
  { id: "individual", label: "Running Containers" },
  { id: "monitoring", label: "Monitoring" },
  { id: "screenshots", label: "Screenshots Gallery" },
];

const screenshots = [
  { src: "https://github.com/user-attachments/assets/19223e0f-02fe-4007-a80e-bddeb3712ec9", cap: "1. Nginx server working fine" },
  { src: "https://github.com/user-attachments/assets/71d7b428-6206-4bba-9484-e0877d19ea1c", cap: "2. Nginx running in detached mode" },
  { src: "https://github.com/user-attachments/assets/aecdf371-9ec5-49aa-b8bd-ce9e3c7109c3", cap: "3. Named container — rohanContainer" },
  { src: "https://github.com/user-attachments/assets/329cb42f-a55c-4707-801a-64a7a4d7ea9a", cap: "4. Stop container by name" },
  { src: "https://github.com/user-attachments/assets/97aaa240-bda0-4d69-89a0-ead71545ff78", cap: "5. Stop using partial container ID" },
  { src: "https://github.com/user-attachments/assets/4fdbb778-a7e6-4352-b670-c7cd62415f12", cap: "6. Start container with docker start" },
  { src: "https://github.com/user-attachments/assets/7152e2ff-c8c0-401e-b7c6-4a8d0f9396ee", cap: "7. Stop all containers at once (PowerShell)" },
  { src: "https://github.com/user-attachments/assets/54d94bcf-789b-4938-bbbe-de97654f54a7", cap: "8. Remove container — docker rm" },
  { src: "https://github.com/user-attachments/assets/49107a92-a188-4a1e-9e24-fd5ffd6f0957", cap: "9. View all Docker images" },
  { src: "https://github.com/user-attachments/assets/dd362aca-1513-4815-be4d-013dc3f95ba2", cap: "10. Remove nginx containers and image" },
  { src: "https://github.com/user-attachments/assets/aa5e6ff1-9ad9-43f5-b5c5-4ff7dc59472c", cap: "11. View container logs" },
  { src: "https://github.com/user-attachments/assets/2348d3e0-77e4-4dab-b2ee-c6f027c1f2ca", cap: "12. Run Ubuntu container with CLI" },
  { src: "https://github.com/user-attachments/assets/b826e12c-e7ba-4eaf-9d44-2f9e4f03bbe8", cap: "13. Execute tasks in interactive container" },
  { src: "https://github.com/user-attachments/assets/3e199b01-231d-4c3c-b7d5-6ef2db257f70", cap: "14. Inspect container configuration" },
  { src: "https://github.com/user-attachments/assets/57b9855c-bb3b-4e26-8739-675d16b26fd4", cap: "15. Monitor CPU & memory — docker stats" },
  { src: "https://github.com/user-attachments/assets/bc7e3621-74bd-4951-afa6-77cb5316aae5", cap: "16. Build a new Docker image" },
  { src: "https://github.com/user-attachments/assets/0090aceb-5214-4ff1-9a3f-6b3c2b9ce169", cap: "17. View created python-image" },
  { src: "https://github.com/user-attachments/assets/9de776b3-516a-48e5-93e8-3cbc5dbec5b7", cap: "18. Run container from Dockerfile" },
  { src: "https://github.com/user-attachments/assets/f5eeab2e-3d63-448f-8d2e-29e31ddc73f6", cap: "19. Create Dockerfile in Spring Boot" },
  { src: "https://github.com/user-attachments/assets/e2462928-dec3-4128-a722-faea1dccca47", cap: "20. Build Spring Boot Docker image" },
  { src: "https://github.com/user-attachments/assets/8025e0d6-8ade-4254-8394-0c34668e5a93", cap: "21. Run Dockerized Spring Boot app" },
  { src: "https://github.com/user-attachments/assets/15ffec1c-861b-4f6c-87be-b0fff2395b33", cap: "22. Push image to Docker Hub" },
];

const DockerBlog = () => (
  <BlogLayout
    title="Mastering Docker with Spring Boot — From Basics to Production"
    tags={["Docker", "Spring Boot", "PostgreSQL", "DevOps"]}
    readTime="12 min read"
    toc={toc}
  >
    <section id="overview" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Overview</h2>
      <p className="text-muted-foreground">
        Docker is the platform enabling creation, management, and execution of containers. Containers handle isolation and packaging while Docker provides the tools and infrastructure. This guide covers Docker Runtime, Image Management, Networking, Security, Volume and Storage Management.
      </p>
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="commands" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Essential Docker Commands</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <tbody className="text-foreground">
            {[
              ["docker run -d -p 8080:80 nginx", "Creates and starts container in detached mode"],
              ["docker ps -a", "Shows all containers (running + stopped)"],
              ["docker stop <id>", "Stops a running container gracefully"],
              ["docker start <id>", "Starts existing stopped container"],
              ["docker rm <id>", "Deletes a stopped container permanently"],
              ["docker images", "Lists all Docker images"],
              ["docker rmi <name>", "Removes a Docker image"],
              ["docker pull <name>:<tag>", "Downloads image from Docker Hub"],
              ["docker container prune", "Deletes all stopped containers"],
              ["docker logs <id>", "Displays container logs"],
              ["docker inspect <id>", "Shows container metadata"],
              ["docker stats", "Real-time CPU, memory, network usage"],
            ].map(([cmd, desc]) => (
              <tr key={cmd} className="border-b border-border/50">
                <td className="py-2 font-mono text-xs text-primary">{cmd}</td>
                <td className="py-2 text-muted-foreground text-xs">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="compose-config" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Docker Compose Config</h2>
      <CodeBlock language="yaml" code={`services:
  app:
    image: image-name:tag
    container_name: custom-name
    ports:
      - "8080:80"
    volumes:
      - ./data:/app/data
    environment:
      - POSTGRES_DB=mydatabase
    depends_on:
      - database
    networks:
      - app-network`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="compose-commands" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Docker Compose Commands</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <tbody className="text-foreground">
            {[
              ["docker-compose up", "Start all services"],
              ["docker-compose down", "Stop and remove containers + networks"],
              ["docker-compose build", "Build or rebuild services"],
              ["docker-compose start", "Start existing containers"],
              ["docker-compose stop", "Stop without removing"],
              ["docker-compose ps", "List containers for services"],
              ["docker-compose logs <service>", "View logs for specific service"],
            ].map(([cmd, desc]) => (
              <tr key={cmd} className="border-b border-border/50">
                <td className="py-2 font-mono text-xs text-primary">{cmd}</td>
                <td className="py-2 text-muted-foreground text-xs">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="containerizing" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Containerizing Spring Boot</h2>
      <CodeBlock language="bash" code={`git clone https://github.com/ARONAGENT/Docker-in-Spring-boot.git
docker --version && docker-compose --version
./mvnw clean package
docker build -t spring-boot-docker-app .
docker-compose up -d
# Access: http://localhost:8080`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="individual" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Running Individual Containers</h2>
      <CodeBlock language="bash" code={`docker run -d -p 8080:8080 --name spring-app spring-boot-docker-app

docker run -d -p 5432:5432 --name postgres-db \\
  -e POSTGRES_DB=mydb \\
  -e POSTGRES_USER=admin \\
  -e POSTGRES_PASSWORD=password \\
  postgres:15`} />
    </section>

    <hr className="border-primary/10 mb-12" />

    <section id="monitoring" className="mb-12">
      <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Monitoring Commands</h2>
      <CodeBlock language="bash" code={`docker ps
docker stats
docker logs <container-id>
docker inspect <container-id>`} />
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
        href="https://github.com/ARONAGENT/Docker-in-Spring-boot"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 gradient-btn px-6 py-3 rounded-lg text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
      >
        View on GitHub →
      </a>
    </section>
  </BlogLayout>
);

export default DockerBlog;
