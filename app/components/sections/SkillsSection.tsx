import { useSectionTransition } from "../ui/SectionTransitionWrapper";

interface SectionProps {
  id: string;
}

const SkillsSection: React.FC<SectionProps> = ({ id }) => {
  const { scrollToSection } = useSectionTransition();
  return (
    <section className="flex items-center justify-center min-h-screen" id={id}>
      <div className="flex flex-col items-center gap-4">
        <div>SKILLS - TO DO</div>
        <button
          className="star-button"
          onClick={() => scrollToSection("projects")}
          type="button"
        >
          Go to Projects
        </button>
      </div>
    </section>
  );
};

export default SkillsSection;