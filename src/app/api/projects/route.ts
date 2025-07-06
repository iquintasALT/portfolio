import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'content', 'dynamic', 'projects.json');
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const projects = JSON.parse(data);
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load projects.' }, { status: 500 });
  }
}
