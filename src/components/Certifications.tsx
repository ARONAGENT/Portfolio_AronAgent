import { motion } from "framer-motion";
import { ExternalLink, Award, Calendar, Hash } from "lucide-react";

const certifications = [
  {
    id: 1,
    icon: "☕",
    title: "Enterprise Java Development",
    issuer: "SohamGlobal",
    issuerUrl: "https://sohamglobal.com/",
    issuedDate: "Aug 2025",
    credentialId: "EJ2E1364",
    accent: "border-orange-500",
    accentColor: "text-orange-400",
    bgGlow: "bg-orange-500/5",
    period: "2024 – Aug 2025",
    achievement:
      "Completed 120-hour intensive Enterprise Java training, building production-grade backend systems from scratch.",
    learned: [
      "Core Java 21 & Collections / DSA",
      "Spring Boot 3, Hibernate, Spring Data JPA",
      "Microservices, REST APIs, Spring Security",
      "MongoDB, MySQL, Oracle Cloud DB",
      "Tomcat 10, GenAI solutions & AI Agents",
    ],
    verifyLink: null,
    driveLink: "https://drive.google.com/file/d/1LDahOf5inTOBSkVvwb7ai07cBIflxdFb/view?usp=sharing",
  },
  {
    id: 2,
    icon: "🐍",
    title: "Python for Web, AIML & Data Science",
    issuer: "SohamGlobal",
    issuerUrl: "https://sohamglobal.com/",
    issuedDate: "Apr 2025",
    credentialId: "PY2305042",
    accent: "border-blue-500",
    accentColor: "text-blue-400",
    bgGlow: "bg-blue-500/5",
    period: "2024 – Apr 2025",
    achievement:
      "Completed 120-hour Python program spanning web development, machine learning, and generative AI integrations.",
    learned: [
      "Core Python 3.12, Django, REST APIs",
      "Pandas, NumPy, Matplotlib, Power BI",
      "Machine Learning with Scikit-Learn",
      "AI with Azure Cognitive Services & OpenAI",
      "LangChain & AI Agent development",
    ],
    verifyLink: null,
    driveLink: "https://drive.google.com/file/d/1oQ3fVd9MoA_UbldH814UagghE8KIOw_B/view?usp=sharing",
  },
  {
    id: 3,
    icon: "🕸️",
    title: "Forage Virtual Experience – Software Engineering",
    issuer: "Forage",
    issuerUrl: "https://www.theforage.com/",
    issuedDate: "Jan 2025",
    credentialId: "sw5B3H9doiq7274ct",
    accent: "border-purple-500",
    accentColor: "text-purple-400",
    bgGlow: "bg-purple-500/5",
    period: "Jan 2025",
    achievement:
      "Completed real-world software engineering tasks simulating professional dev workflows at top-tier companies.",
    learned: [
      "Coding challenges & debugging exercises",
      "Git & GitHub version control",
      "Agile development practices",
      "Problem-solving & teamwork skills",
    ],
    verifyLink:
      "https://www.theforage.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_47LTPFKX6f7xd8H26_1735839831588_completion_certificate.pdf",
    driveLink: "https://drive.google.com/file/d/1rnB77Gxm6ECAvi6GAoaevI2tEi55DWzN/view?usp=sharing",
  },
  {
    id: 4,
    icon: "☁️",
    title: "OCI DevOps Professional",
    issuer: "Oracle",
    issuerUrl: "https://www.oracle.com/",
    issuedDate: "Oct 2025",
    credentialId: "OCI-DevOps-2025",
    accent: "border-red-500",
    accentColor: "text-red-400",
    bgGlow: "bg-red-500/5",
    period: "Oct 2025 – Oct 2027",
    achievement:
      "Earned Oracle's professional-level DevOps certification, validating expertise in CI/CD and cloud-native workflows on OCI.",
    learned: [
      "CI/CD pipeline design & automation",
      "OCI DevOps service & artifact registry",
      "Secure, scalable deployment strategies",
      "Cloud-based testing & monitoring",
    ],
    verifyLink:
      "https://catalog-education.oracle.com/ords/certview/sharebadge?id=8A71174FC51540BDA9826084CA5E6578FCB9D5A9C22D801C0EBDFD307417B8BB",
    driveLink: "https://drive.google.com/file/d/1JSeNoe4paaKgqfLOrWBcfhMoaolQni5c/view?usp=sharing",
  },
  {
    id: 5,
    icon: "🚀",
    title: "Spring Boot 0 To 1 – Fundamentals",
    issuer: "Coding Shuttle",
    issuerUrl: "https://www.codingshuttle.com/",
    issuedDate: "Oct 2025",
    credentialId: "TLNRSWVV",
    accent: "border-green-500",
    accentColor: "text-green-400",
    bgGlow: "bg-green-500/5",
    period: "2025 – Oct 2025",
    achievement:
      "Completed Spring Boot fundamentals under Anuj Kumar Sharma, covering end-to-end backend development and AWS deployment.",
    learned: [
      "Spring Boot & MVC Architecture",
      "Spring Data JPA & Hibernate",
      "Spring Security fundamentals",
      "Production-ready features & actuator",
      "AWS deployment workflows",
    ],
    verifyLink: "https://app.codingshuttle.com/certificate/verify/TLNRSWVV",
    driveLink: "https://drive.google.com/file/d/1YaMZOsANKAzZvZzNw3PuxpQF_loxKVB9/view?usp=sharing",
  },
  {
  id: 6,
  icon: "🌟",
  title: "Spring Boot 0 To 100 – Advanced Backend Development",
  issuer: "Coding Shuttle",
  issuerUrl: "https://www.codingshuttle.com/",
  issuedDate: "Nov 2025",
  credentialId: "6SEYHO5W",
  accent: "border-emerald-500",
  accentColor: "text-emerald-400",
  bgGlow: "bg-emerald-500/5",
  period: "2025 – Nov 2025",
  achievement:
    "Backend journey milestone unlocked! Successfully completed Spring Boot Cohort 4.0 at Coding Shuttle.",
  learned: [
   "AOP & Aspect-Oriented Programming",
  "Caching with Redis",
  "Transaction Management",
  "Microservices Architecture",
  "Docker Containerization",
  "Kubernetes Fundamentals",
  ],
  verifyLink:
    "https://app.codingshuttle.com/certificate/verify/6SEYHO5W",
  driveLink:
    "https://drive.google.com/file/d/1gFwZM04g4z0bCI_YXuCrZuEi1ipAx96A/view?usp=sharing",
}
];

// ─── CERT CARD ────────────────────────────────────────────────────────────────
const CertCard = ({ cert, index }: { cert: (typeof certifications)[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`glass rounded-xl p-6 border-l-4 ${cert.accent} ${cert.bgGlow} glow-cyan-hover transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4`}
  >
    {/* Header */}
    <div className="flex items-start gap-3">
      <span className="text-3xl">{cert.icon}</span>
      <div>
        <h3 className="font-heading font-bold text-base text-foreground leading-snug">{cert.title}</h3>
        {/* Clickable issuer name → opens official website */}
        <a
          href={cert.issuerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 text-xs font-semibold mt-0.5 ${cert.accentColor} hover:underline transition-opacity hover:opacity-80`}
        >
          {cert.issuer}
          <ExternalLink size={10} />
        </a>
      </div>
    </div>

    {/* Meta row */}
    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
      <span className="flex items-center gap-1">
        <Calendar size={11} /> {cert.period}
      </span>
      <span className="flex items-center gap-1">
        <Hash size={11} /> {cert.credentialId}
      </span>
      <span className="flex items-center gap-1">
        <Award size={11} /> Issued {cert.issuedDate}
      </span>
    </div>

    {/* Achievement */}
    <p className="text-sm text-muted-foreground leading-relaxed">{cert.achievement}</p>

    {/* Learned pills */}
    <div>
      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">
        Key Skills Gained
      </p>
      <div className="flex flex-wrap gap-2">
        {cert.learned.map((skill) => (
          <span key={skill} className="skill-pill text-xs">
            {skill}
          </span>
        ))}
      </div>
    </div>

    {/* Verify / Drive links */}
    {(cert.verifyLink || cert.driveLink) && (
      <div className="flex flex-wrap gap-3 pt-1">
        {cert.verifyLink && (
          <a
            href={cert.verifyLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 text-xs font-semibold ${cert.accentColor} hover:underline`}
          >
            Verify Certificate <ExternalLink size={11} />
          </a>
        )}
        {cert.driveLink && (
          <a
            href={cert.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 text-xs font-semibold ${cert.accentColor} hover:underline`}
          >
            View on Drive <ExternalLink size={11} />
          </a>
        )}
      </div>
    )}
  </motion.div>
);

// ─── SECTION ──────────────────────────────────────────────────────────────────
const Certifications = () => (
  <section id="certifications" className="max-w-5xl mx-auto px-6 py-20">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-14"
    >
      <h2 className="font-heading font-extrabold text-3xl md:text-4xl gradient-text mb-3">
        Certifications
      </h2>
      <p className="text-muted-foreground max-w-lg mx-auto text-sm">
        Professional credentials earned through structured training, hands-on projects, and industry exams.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {certifications.map((cert, i) => (
        <CertCard key={cert.id} cert={cert} index={i} />
      ))}
    </div>

    {/* ── HOW TO ADD A NEW CERT ─────────────────────────────────────────────
        Append a new object to the `certifications` array above.
        Add issuerUrl: "https://..." for the company website link.
        Always wrap all URLs in quotes: driveLink: "https://..."
        Set verifyLink or driveLink to null if not applicable.
    ──────────────────────────────────────────────────────────────────────── */}
  </section>
);

export default Certifications;