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
    <section id={id}>
      <ProjectsGrid/>
    </section>
  );
};

export default ProjectsSection;