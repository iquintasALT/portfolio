import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'content', 'dynamic', 'skills.json');
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const skills = JSON.parse(data);
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load skills.' }, { status: 500 });
  }
}
