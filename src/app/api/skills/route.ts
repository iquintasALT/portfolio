import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const useBlob = process.env.USE_BLOB === "true";
  if (useBlob) {
    const blobBaseUrl = process.env.BLOB_BASE_URL;
    const blobUrl = `${blobBaseUrl}/dynamic/skills.json`;
    try {
      const res = await fetch(blobUrl);
      if (!res.ok) throw new Error("Failed to fetch skills.json from Blob");
      const skills = await res.json();
      return NextResponse.json(skills);
    } catch {
      return NextResponse.json({ error: "Failed to load skills." }, { status: 500 });
    }
  } else {
    const filePath = path.join(process.cwd(), "content", "dynamic", "skills.json");
    try {
      const data = await fs.readFile(filePath, "utf-8");
      const skills = JSON.parse(data);
      return NextResponse.json(skills);
    } catch {
      return NextResponse.json({ error: "Failed to load skills." }, { status: 500 });
    }
  }
}
