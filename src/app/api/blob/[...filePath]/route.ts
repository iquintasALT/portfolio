// This API fetches any file from blob storage or local content, based on the path provided.
// Example: /api/blob/dynamic/projects.json

import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { filePath: string[] } }) {
  const useBlob = process.env.NEXT_PUBLIC_USE_BLOB === "true";
  const filePathArr = params.filePath;
  if (!filePathArr || filePathArr.length === 0) {
    return NextResponse.json({ error: "No file specified." }, { status: 400 });
  }
  const filePathStr = filePathArr.join("/");

  if (useBlob) {
    const blobBaseUrl = process.env.NEXT_BLOB_BASE_URL;
    const blobUrl = `${blobBaseUrl}/${filePathStr}`;
    try {
      const res = await fetch(blobUrl);
      if (!res.ok) throw new Error("Failed to fetch file from Blob");
      // Try to detect if it's JSON or binary
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        return NextResponse.json(data);
      } else {
        const buffer = Buffer.from(await res.arrayBuffer());
        return new NextResponse(buffer, {
          status: 200,
          headers: {
            "Content-Type": contentType,
            "Content-Disposition": `inline; filename=\"${filePathArr[filePathArr.length - 1]}\"`,
          },
        });
      }
    } catch {
      return NextResponse.json({ error: "Failed to load file from Blob." }, { status: 500 });
    }
  } else {
    // Local fallback
    const localPath = path.join(process.cwd(), "content", ...filePathArr);
    try {
      const ext = path.extname(localPath);
      const isJson = ext === ".json";
      const data = await fs.readFile(localPath);
      if (isJson) {
        const json = JSON.parse(data.toString("utf-8"));
        return NextResponse.json(json);
      } else {
        return new NextResponse(data, {
          status: 200,
          headers: {
            "Content-Type": ext === ".pdf" ? "application/pdf" : "application/octet-stream",
            "Content-Disposition": `inline; filename=\"${filePathArr[filePathArr.length - 1]}\"`,
          },
        });
      }
    } catch {
      return NextResponse.json({ error: "Failed to load file locally." }, { status: 500 });
    }
  }
}
