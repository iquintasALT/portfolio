import { NextResponse } from "next/server";

export async function GET() {
  const blobBaseUrl = process.env.BLOB_BASE_URL;
  const blobUrl = `${blobBaseUrl}/dynamic/projects.json`;
  try {
    const res = await fetch(blobUrl);
    if (!res.ok) throw new Error("Failed to fetch projects.json from Blob");
    const projects = await res.json();
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Failed to load projects." }, { status: 500 });
  }
}
