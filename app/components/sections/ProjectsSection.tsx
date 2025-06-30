import { useSectionTransition } from "../ui/SectionTransitionWrapper";
import { ProjectsGrid } from "../ProjectsGrid";

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
      <div className="flex flex-col items-center gap-4 w-full">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <ProjectsGrid />
      </div>
    </section>
  );
};

export default ProjectsSection;