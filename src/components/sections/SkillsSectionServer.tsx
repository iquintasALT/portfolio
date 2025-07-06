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
  try {
    const h = await headers();
    const host = h.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const res = await fetch(`${protocol}://${host}/api/skills`, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error("[SkillsSectionServer] Failed to fetch /api/skills:", res.status, res.statusText);
      return [];
    }
    const data = await res.json();
    console.log(`[SkillsSectionServer] Successfully fetched skills: count = ${Array.isArray(data) ? data.length : 0}`);
    return data;
  } catch (err) {
    console.error("[SkillsSectionServer] Error fetching skills:", err);
    return [];
  }
}

const SkillsSection = async ({ id }: SectionProps) => {
  const skills = await getSkills();
  if (!skills || skills.length === 0) {
    return <section id={id} style={{ color: 'red', padding: 32 }}>Skills data could not be loaded.</section>;
  }
  // Pass id to client component so it renders the section with the id
  return <SkillsSectionClient id={id} skills={skills} />;
};

export default SkillsSection;