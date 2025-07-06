import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import CustomMDXComponents from "@/components/mdx/CustomMDXComponents";
import MdxSectionNav from "@/components/ui/MdxSectionNav";
import ProjectDetail from "~/components/ui/ProjectDetail";

interface ProjectMeta {
  title: string;
  image: string;
  libraries: string[];
  description: string;
  language: string;
}

interface ProjectData {
  content: string;
  meta: ProjectMeta;
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const hdrs = await headers();
  const host = hdrs.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/project-mdx?slug=${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return notFound();
  const data: ProjectData = await res.json();

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        <ProjectDetail project={data.meta}>
          <div id="mdx-content">
            <MDXRemote
              source={data.content}
              components={CustomMDXComponents()}
              options={{
                mdxOptions: {
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>
        </ProjectDetail>
      </div>
      {/* Section Nav (sticky, only on large screens, right side) */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <MdxSectionNav mdxRootSelector="#mdx-content" />
      </div>
    </div>
  );
}
