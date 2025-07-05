"use client";


interface ProjectPageClientProps {
  project: {
    title: string;
    image: string;
    libraries: string[];
    description: string;
    language: string;
  };
  mdxSource: string;
}

export default function ProjectPageClient({ project, mdxSource }: ProjectPageClientProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Section Nav (sticky, only on large screens) */}
      <MdxSectionNav mdxRootSelector="#mdx-content" />
      
    </div>
  );
}
