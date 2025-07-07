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
  const filePath = path.join(process.cwd(), "content", "projects", `${slug}.mdx`);
  try {
    const source = await fs.readFile(filePath, "utf8");
    const { content, data } = matter(source);
    return NextResponse.json({ content, meta: data });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
