import { headers } from "next/headers";
import { notFound } from "next/navigation";
import ProjectDetail from "~/components/ui/ProjectDetail";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

import CustomMDXComponents from "@/components/mdx/CustomMDXComponents";
import MdxSectionNav from "@/components/ui/MdxSectionNav";

interface ProjectMeta {
  title: string;
  image: string; // Can be image or video
  libraries: string[];
  description: string;
  language: string;
  github?: string;
  live?: string;
  imageType?: "image" | "video";
}

interface ProjectData {
  content: string;
  meta: ProjectMeta;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hdrs = await headers();
  const host = hdrs.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/project-mdx?slug=${slug}`, { next: { revalidate: 180 } });
  if (!res.ok) return notFound();
  const data: ProjectData = await res.json();

  // Blob logic for image (can be image or video) in meta, with HEAD check like ProjectsSectionServer
  const meta = { ...data.meta };
  const useBlob = process.env.NEXT_PUBLIC_USE_BLOB === "true";
  const blobBase = process.env.NEXT_BLOB_BASE_URL?.replace(/\/$/, "");
  if (useBlob && blobBase && meta.image && meta.image.startsWith("/media/projects/")) {
    const imagePath = meta.image.replace(/^\//, "");
    const blobUrl = `${blobBase}/${imagePath}`;
    try {
      const headRes = await fetch(blobUrl, { method: "HEAD" });
      if (headRes.ok) {
        meta.image = blobUrl;
      }
    } catch {
      // fallback: keep original path
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="mt-8 ml-[-10vw]">
          {/* Detect if the image is a video or image and pass type info to ProjectDetail */}
          <ProjectDetail project={meta}>
            {/* Action buttons under main image/fields, above MDX */}
            {(meta.github || meta.live) && (
              <div className="flex justify-center gap-4 mt-6 mb-8">
                {meta.github && (
                  <a
                    href={meta.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-indigo-300 border border-zinc-700 shadow transition-colors group"
                    title="View on GitHub"
                  >
                    {/* GitHub Icon (Lucide or SVG) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 21.13V25" />
                    </svg>
                    <span className="font-semibold">GitHub</span>
                  </a>
                )}
                {meta.live && (
                  <a
                    href={meta.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 text-white border border-indigo-700 shadow transition-colors group"
                    title="View Live"
                  >
                    {/* Globe Icon (Lucide or SVG) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-white group-hover:text-indigo-100"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
                    </svg>
                    <span className="font-semibold">View Live</span>
                  </a>
                )}
              </div>
            )}
            <div id="mdx-content">
              <MDXRemote
                source={data.content}
                components={CustomMDXComponents()}
                options={{
                  mdxOptions: {
                    rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: "one-dark-pro" }]],
                  },
                }}
              />
            </div>
          </ProjectDetail>
        </div>
      </div>
      {/* Section Nav (sticky, only on large screens, right side) */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <MdxSectionNav mdxRootSelector="#mdx-content" />
      </div>
    </div>
  );
}
