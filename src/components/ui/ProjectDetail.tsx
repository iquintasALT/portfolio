



interface ProjectDetailProps {
  project: {
    title: string;
    description: string;
    image: string;
    libraries: string[];
    language: string;
  };
  children: React.ReactNode; // For MDX content
}

// Server Component: Only for static content (image, title, description, meta, and MDX children)
export default function ProjectDetail({ project, children }: ProjectDetailProps) {
  return (
    <div className="relative flex flex-col w-full max-w-4xl mx-auto py-0 sm:py-12 px-0 sm:px-4">
      {/* Hero section */}
      <div className="relative flex flex-col items-center mb-12">
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-2xl aspect-[2.2/1] rounded-3xl overflow-hidden shadow-2xl border-4 border-indigo-500">
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ filter: 'brightness(1.4) contrast(1.08)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 to-zinc-950/70" />
            <div className="absolute bottom-0 left-0 w-full px-8 py-6 flex flex-col items-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 mb-2 text-center drop-shadow-lg">
                {project.title}
              </h1>
              <p className="text-zinc-300 text-lg mb-2 text-center max-w-2xl drop-shadow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-2 justify-center">
                {(Array.isArray(project.libraries) ? project.libraries : []).map((lib: string) => (
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
      {/* Blog content (MDX) */}
      <div className="prose prose-invert max-w-none">
        {children}
      </div>
    </div>
  );
}
