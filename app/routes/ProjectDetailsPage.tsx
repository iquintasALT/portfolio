import React from "react";
import { useParams } from "react-router-dom";
import fs from "fs";
import path from "path";
import { MDXProvider } from "@mdx-js/react";
import * as runtime from "react/jsx-runtime";
import { compileSync } from "@mdx-js/mdx";

export type Project = {
  title: string;
  description: string;
  image: string;
  libraries: string[];
  language: string;
  // ...other fields
};

const slugify = (str: string) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const ProjectDetailsPage: React.FC = () => {
  const slug = useParams().projectName;
  if (!slug) return <div>No project specified.</div>;

  let mdxSource: string | null = null;
  let error: string | null = null;
  try {
    const mdxPath = path.resolve(process.cwd(), "content", "projects", `${slug}.mdx`);
    mdxSource = fs.readFileSync(mdxPath, "utf8");
  } catch (e) {
    error = "Could not load project details.";
  }

  if (error) return <div>{error}</div>;
  if (!mdxSource) return <div>No project details found.</div>;

  // Compile the MDX string to a React component (sync)
  let Content: React.ComponentType<any> | null = null;
  try {
    // @ts-ignore
    Content = compileSync(mdxSource, { outputFormat: 'function-body', useDynamicImport: false, jsx: true, jsxImportSource: 'react', providerImportSource: '@mdx-js/react', runtime }).default;
  } catch (e) {
    return <div>Failed to compile MDX.</div>;
  }

  return (
    <div className="project-mdx-content">
      <MDXProvider>
        {Content ? <Content /> : <div>No content.</div>}
      </MDXProvider>
    </div>
  );
};

export default ProjectDetailsPage;
