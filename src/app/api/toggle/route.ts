import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function POST(req: NextRequest) {
  const { filePath, lineIndex, currentChecked } = await req.json();

  if (!filePath || lineIndex === undefined) {
    return NextResponse.json({ error: 'Missing filePath or lineIndex' }, { status: 400 });
  }

  const fullPath = path.join(CONTENT_DIR, filePath);

  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    const lines = content.split('\n');

    if (lineIndex >= lines.length) {
      return NextResponse.json({ error: 'Line index out of range' }, { status: 400 });
    }

    const newMark = currentChecked ? '[ ]' : '[x]';
    lines[lineIndex] = lines[lineIndex].replace(/\[[ xX]\]/, newMark);
    const newContent = lines.join('\n');

    fs.writeFileSync(fullPath, newContent, 'utf-8');

    return NextResponse.json({ success: true, newChecked: !currentChecked });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
