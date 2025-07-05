import AboutSection from "../components/sections/AboutSection";
import ContactSection from "../components/sections/ContactSection";
import HeroSection from "../components/sections/HeroSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import SkillsSection from "../components/sections/SkillsSection";
import { SectionTransitionWrapper } from "../components/ui/SectionTransitionWrapper";
// import { PetCompanion } from "../components/PetCompanion";
// import Footer from "../components/Footer";

export default function Page() {
  return (
    <main>
      <SectionTransitionWrapper>
        <HeroSection id="me" />
        <AboutSection id="about" />
        <SkillsSection id="skills" />
        <ProjectsSection id="projects" />
        <ContactSection id="contact" />
      </SectionTransitionWrapper>
      {/* Pet Companion */}
      {/* <PetCompanion route="home" /> */}
      {/* <Footer /> */}
    </main>
  );
}
