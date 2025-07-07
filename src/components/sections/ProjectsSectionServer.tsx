import { headers } from "next/headers";

import ProjectsSectionClient from "./ProjectsSectionClient";

interface SectionProps {
  id: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  language: string;
  libraries: string[];
}

async function getProjects(): Promise<Project[]> {
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/api/projects`, { next: { revalidate: 180 } });
  if (!res.ok) return [];
  return res.json();
}

const ProjectsSection = async ({ id }: SectionProps) => {
  const projects = await getProjects();
  return <ProjectsSectionClient id={id} projects={projects} />;
};

export default ProjectsSection;
