import AboutSection from "../components/sections/AboutSection";
import ContactSection from "../components/sections/ContactSection";
import HeroSection from "../components/sections/HeroSection";
import ProjectsSection from "../components/sections/ProjectsSectionServer";
import SkillsSection from "../components/sections/SkillsSectionServer";
import SectionTransition from "../components/ui/SectionTransitionClient";

// import PetCompanion from "../components/PetCompanion";
// import Footer from "../components/Footer";

export default function Page() {
  return (
    <main>
      <SectionTransition>
        <HeroSection id="me" />
        <AboutSection id="about" />
        <section id="skills">
          <SkillsSection id="skills" />
        </section>
        <section id="projects">
          <ProjectsSection id="projects" />
        </section>
        <ContactSection id="contact" />
      </SectionTransition>
      {/* Pet Companion */}
      {/* <PetCompanion route="home" /> */}
      {/* <Footer /> */}
    </main>
  );
}
