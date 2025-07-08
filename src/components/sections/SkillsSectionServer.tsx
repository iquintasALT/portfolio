import { headers } from "next/headers";

import SkillsSectionClient from "./SkillsSectionClient";

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
  try {
    const h = await headers();
    const host = h.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const useBlob = process.env.NEXT_PUBLIC_USE_BLOB === "true";
    const apiPath = useBlob ? "/api/blob/dynamic/skills.json" : "/api/skills";
    const res = await fetch(`${protocol}://${host}${apiPath}`, { next: { revalidate: 180 } });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return data;
  } catch {
    return [];
  }
}

const SkillsSection = async ({ id }: SectionProps) => {
  const skills = await getSkills();
  if (!skills || skills.length === 0) {
    return (
      <section id={id} style={{ color: "red", padding: 32 }}>
        Skills data could not be loaded.
      </section>
    );
  }
  // Pass id to client component so it renders the section with the id
  return <SkillsSectionClient id={id} skills={skills} />;
};

export default SkillsSection;
