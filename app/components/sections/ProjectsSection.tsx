import { useSectionTransition } from "../ui/SectionTransitionWrapper";

const projects = [
    {

    }
]

interface SectionProps {
  id: string;
}

const ProjectsSection: React.FC<SectionProps> = ({ id }) => {
  const { scrollToSection } = useSectionTransition();
  return (
    <section className="flex items-center justify-center min-h-screen" id={id}>
      <div className="flex flex-col items-center gap-4">
        <div>PROJECTS - TO DO</div>
        <button
          className="star-button"
          onClick={() => scrollToSection("contact")}
          type="button"
        >
          Contact Me
        </button>
      </div>
    </section>
  );
};

export default ProjectsSection;