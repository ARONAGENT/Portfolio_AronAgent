import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Blogspreview from "@/components/Blogspreview";
import Certifications from "@/components/Certifications";
import Resume from "@/components/Resume";
import CurrentFocus from "@/components/CurrentFocus";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen grid-bg relative">
    {/* Purple glow top-left */}
    <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />
    <Navbar />
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Blogspreview />
    <Certifications />
    <Resume />
    <CurrentFocus />
    <Contact />
    <Footer />
  </div>
);

export default Index;