// import type { LoaderFunctionArgs } from "@remix-run/node";
import fs from "fs";
import path from "path";

console.log("[project-mdx.$slug.ts] API route loader called");
export async function loader({ params }) {
  const { slug } = params;
  if (!slug) return Response.json({ error: "No slug provided" }, { status: 400 });

  const mdxPath = path.resolve(__dirname, "../../../content/projects", `${slug}.mdx`);
  // Debug: log the resolved path
  console.log("Looking for MDX at:", mdxPath);
  try {
    if (!fs.existsSync(mdxPath)) {
      console.error("MDX file does not exist:", mdxPath);
      return Response.json({ error: `MDX file does not exist: ${mdxPath}` }, { status: 404 });
    }
    const mdx = fs.readFileSync(mdxPath, "utf8");
    console.log("MDX file loaded successfully:", mdxPath);
    return Response.json({ mdx });
  } catch (e) {
    console.error("Error reading MDX file:", e);
    return Response.json({ error: `MDX not found: ${e}` }, { status: 404 });
  }
}
