import { NextResponse } from "next/server";

export async function GET() {
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
}
