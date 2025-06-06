import AboutSection from "~/components/sections/AboutSection";
import ContactSection from "~/components/sections/ContactSection";
import HeroSection from "~/components/sections/HeroSection";
import ProjectsSection from "~/components/sections/ProjectsSection";
import SkillsSection from "~/components/sections/SkillsSection";
import ThemeToggle from "~/components/ThemeToggle";
import Navbar from "~/components/ui/Navbar/Navbar";
import StarBackground from "~/components/ui/StarBackground";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Theme toggle */}
      <ThemeToggle />
      {/* Background effects */}
      <StarBackground/>
      {/* Navbar */}
      <Navbar/>
      {/* Main content */}
      <main>
        <HeroSection/>
        <AboutSection/>
        <SkillsSection/>
        <ProjectsSection/>
        <ContactSection/>
      </main>
      {/* Footer */}
    </div>
  );
}
