import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import matter from "gray-matter";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }
  const useBlob = process.env.USE_BLOB === "true";
  if (useBlob) {
    const blobBaseUrl = process.env.BLOB_BASE_URL;
    const blobUrl = `${blobBaseUrl}/projects/${slug}.mdx`;
    try {
      const res = await fetch(blobUrl);
      if (!res.ok) throw new Error("Failed to fetch MDX from Blob");
      const source = await res.text();
      const { content, data } = matter(source);
      return NextResponse.json({ content, meta: data });
    } catch {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  } else {
    const filePath = path.join(process.cwd(), "content", "projects", `${slug}.mdx`);
    try {
      const source = await fs.readFile(filePath, "utf8");
      const { content, data } = matter(source);
      return NextResponse.json({ content, meta: data });
    } catch {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }
}
