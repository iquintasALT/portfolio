import SkillsSectionClient from "./SkillsSectionClient";
import { headers } from "next/headers";

interface SectionProps {
  id: string;
}

interface Skill {
  name: string;
  icon: string;
  description: string;
}
interface SkillCategory {
  category: string;
  skills: Skill[];
}

async function getSkills(): Promise<SkillCategory[]> {
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/api/skills`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  return res.json();
}

const SkillsSection = async ({ id }: SectionProps) => {
  const skills = await getSkills();
  return (
    <section className="flex flex-col items-center overflow-hidden justify-start pt-20 min-h-screen px-2" id={id}>
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-8">
        <SkillsSectionClient skills={skills} />
      </div>
    </section>
  );
};

export default SkillsSection;