import React, { useEffect, useState } from "react";
import { ProjectCard } from "../components/ProjectCard";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  language: string;
  libraries: string[];
}

export const ProjectsGrid: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/app/lib/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <div className="flex flex-wrap justify-center max-w-[1040px] gap-y-6">
      {projects.map((project) => (
        <div key={project.id} className="sm:w-[340px] md:w-[340px]">
          <ProjectCard {...project} />
        </div>
      ))}
    </div>
  );
};
