

import SectionTransitionWrapper from "../components/ui/SectionTransitionWrapperClient";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSectionServer";
import ProjectsSection from "../components/sections/ProjectsSectionServer";
import ContactSection from "../components/sections/ContactSection";
// import PetCompanion from "../components/PetCompanion";
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
