
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import projectsData from "~/../public/data/projects.json";

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Helper to render section content (code, lists, images, etc.)
function renderSectionContent(content: string) {
  // Code block
  if (content.trim().startsWith("```") ) {
    const code = content.replace(/```[a-z]*\n?|```/g, "");
    return (
      <pre className="bg-zinc-900 text-zinc-100 rounded-lg p-4 overflow-x-auto my-4">
        <code>{code}</code>
      </pre>
    );
  }
  // Markdown image
  if (content.trim().startsWith("!")) {
    const match = content.match(/!\[[^\]]*\]\(([^)]+)\)/);
    if (match) {
      return (
        <img src={match[1]} alt="Gallery" className="rounded-xl shadow-lg my-4 max-w-full mx-auto" />
      );
    }
  }
  // List
  if (content.trim().startsWith("-")) {
    return (
      <ul className="list-disc pl-6 my-2">
        {content
          .split("\n")
          .filter((line) => line.trim().startsWith("-"))
          .map((line, i) => (
            <li key={i}>{line.replace(/^- /, "")}</li>
          ))}
      </ul>
    );
  }
  // Headings (##, ###, etc.)
  const headingMatch = content.trim().match(/^#{2,}\s/);
  if (headingMatch) {
    const levelMatch = content.match(/^#+/);
    const level = levelMatch ? levelMatch[0].length : 2;
    const text = content.replace(/^#+\s*/, "");
    if (level === 2) return <h2 className="text-2xl font-bold mb-2">{text}</h2>;
    if (level === 3) return <h3 className="text-xl font-semibold mb-2">{text}</h3>;
    return <h4 className="text-lg font-semibold mb-2">{text}</h4>;
  }
  // Blockquote
  if (content.trim().startsWith(">")) {
    return <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-zinc-400 my-4">{content.replace(/^>\s*/, "")}</blockquote>;
  }
  // Paragraph
  return <p className="mb-4">{content}</p>;
}


const ProjectDetail: React.FC = () => {
  const { projectName } = useParams();
  const project = (projectsData as any[]).find(
    (p) => slugify(p.title) === projectName
  );
  const [sections, setSections] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!project) return;
    setLoading(true);
    fetch(`/content/projects/${slugify(project.title)}.json`)
      .then((res) => res.json())
      .then((data) => setSections(data.sections))
      .catch(() => setSections(null))
      .finally(() => setLoading(false));
  }, [project]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-zinc-300">
        <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
        <p>The project you are looking for does not exist.</p>
      </div>
    );
  }

  if (loading || !sections) {
    return <div className="text-center text-zinc-400 py-12">Loading project content…</div>;
  }

  return (
    <div className="relative flex flex-row w-full max-w-6xl mx-auto py-0 sm:py-12 px-0 sm:px-4 gap-0 sm:gap-8">
      {/* Sidebar (Table of Contents) */}
      <aside className="hidden lg:flex flex-col w-72 min-w-[16rem] max-w-xs sticky top-0 h-screen pt-16 pb-8 px-4 bg-zinc-950/90 border-r border-zinc-800 shadow-xl z-10">
        <div className="flex-1 flex flex-col">
          <h3 className="text-zinc-200 font-bold mb-4 text-lg tracking-wide">Sections</h3>
          <ul className="space-y-2">
            {sections.map((section: any) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="block px-3 py-2 rounded-lg text-zinc-400 hover:text-indigo-400 hover:bg-zinc-800 transition-colors text-sm font-medium"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {/* Main content */}
      <main className="flex-1 min-w-0 max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Hero section */}
        <div className="relative flex flex-col items-center mb-12">
          <div className="w-full flex justify-center">
            <div className="relative w-full max-w-2xl aspect-[2.2/1] rounded-3xl overflow-hidden shadow-2xl border-4 border-indigo-500">
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ filter: 'brightness(0.92) contrast(1.08)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 to-zinc-950/90" />
              <div className="absolute bottom-0 left-0 w-full px-8 py-6 flex flex-col items-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 mb-2 text-center drop-shadow-lg">
                  {project.title}
                </h1>
                <p className="text-zinc-300 text-lg mb-2 text-center max-w-2xl drop-shadow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-2 justify-center">
                  {project.libraries.map((lib: string) => (
                    <span
                      key={lib}
                      className="bg-zinc-800/80 text-zinc-200 px-3 py-1 rounded-full text-xs shadow border border-zinc-700"
                    >
                      {lib}
                    </span>
                  ))}
                </div>
                <div className="flex flex-row gap-4 items-center text-zinc-400 text-xs mt-2">
                  <span>
                    Language: <span className="text-zinc-200 font-semibold">{project.language}</span>
                  </span>
                  {/* Optional: Add meta info here if available */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Blog content */}
        <div className="prose prose-invert max-w-none">
          {sections.map((section: any) => (
            <section id={section.id} key={section.id} className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
              {renderSectionContent(section.content)}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
