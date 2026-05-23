import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

function readFile(relPath: string): string {
  try {
    return fs.readFileSync(path.join(CONTENT_DIR, relPath), 'utf-8');
  } catch {
    return '';
  }
}

export async function GET() {
  const morningStandup = readFile('Ops/morning-standup.md');
  const eveningReflection = readFile('Ops/evening-reflection.md');
  const wfcPipeline = readFile('Work/WFC/pipeline.md');
  const ltcPipeline = readFile('Work/LTC/pipeline.md');
  const priorityQueue = readFile('Work/Shared/master-priority-queue.md');
  const memory = readFile('MEMORY.md');
  const wfcWeeklyPlan = readFile('Work/WFC/weekly-plan.md');
  const ltcWeeklyPlan = readFile('Work/LTC/weekly-plan.md');

  const leadsData = readLeadsMetadata();

  return NextResponse.json({
    morningStandup,
    eveningReflection,
    wfcPipeline,
    ltcPipeline,
    priorityQueue,
    memory,
    wfcWeeklyPlan,
    ltcWeeklyPlan,
    leads: leadsData,
  });
}

function readLeadsMetadata() {
  const leadsDir = path.join(CONTENT_DIR, 'leads');
  const results: any[] = [];

  try {
    const entries = fs.readdirSync(leadsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const dossierPath = path.join(leadsDir, entry.name, 'dossier.md');
      try {
        const content = fs.readFileSync(dossierPath, 'utf-8');
        const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (!fmMatch) continue;
        const fm = parseYaml(fmMatch[1]);
        if (fm.type !== 'dossier') continue;

        results.push({
          path: `leads/${entry.name}/dossier.md`,
          title: fm.title || entry.name,
          org: fm.org || '',
          credential: fm.credential,
          district: fm.district,
          platform: fm.platform,
          score: fm.score,
          confidence: fm.confidence,
          status: fm.status,
          type: fm.type,
        });
      } catch {}
    }
  } catch {}

  return results;
}

function parseYaml(yaml: string): Record<string, any> {
  const result: Record<string, any> = {};
  for (const line of yaml.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value.startsWith('[') && value.endsWith(']')) {
      result[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, ''));
    } else {
      const num = Number(value);
      result[key] = !isNaN(num) && value !== '' ? num : value;
    }
  }
  return result;
}
