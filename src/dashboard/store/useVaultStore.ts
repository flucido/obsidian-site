/* Zustand store — holds all vault data for the dashboard */
/* Ported from Obsidian plugin — reads from filesystem instead of vault API */

'use client';

import { create } from 'zustand';
import type {
  TodaySnapshot,
  PipelineLead,
  PriorityQueueItem,
  ChecklistItem,
  LeadDossierMeta,
  WeeklyPlan,
} from '../types';
import {
  extractFrontmatter,
  extractTableFromSection,
  extractAllTablesFromSection,
  extractAllTables,
  extractChecklist,
  extractSection,
  extractWikiLinks,
} from '../parser/parseMarkdown';

function cleanSeverity(raw: string): string {
  return raw
    .replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1')
    .replace(/\([^)]*\)/g, '')
    .trim();
}

const PATHS = {
  morningStandup: 'content/Ops/morning-standup.md',
  eveningReflection: 'content/Ops/evening-reflection.md',
  wfcPipeline: 'content/Work/WFC/pipeline.md',
  ltcPipeline: 'content/Work/LTC/pipeline.md',
  priorityQueue: 'content/Work/Shared/master-priority-queue.md',
  memory: 'content/MEMORY.md',
  leadsDir: 'content/leads',
  wfcWeeklyPlan: 'content/Work/WFC/weekly-plan.md',
  ltcWeeklyPlan: 'content/Work/LTC/weekly-plan.md',
};

interface VaultStore {
  loading: boolean;
  error: string | null;

  today: TodaySnapshot | null;
  wfcPipeline: PipelineLead[];
  ltcPipeline: PipelineLead[];
  priorityQueue: PriorityQueueItem[];
  memoryContent: string;
  leads: LeadDossierMeta[];
  lastRefreshed: string | null;

  wfcChecklist: ChecklistItem[];
  ltcChecklist: ChecklistItem[];
  sharedChecklist: ChecklistItem[];

  wfcWeeklyPlan: WeeklyPlan | null;
  ltcWeeklyPlan: WeeklyPlan | null;

  refresh: () => Promise<void>;
}

export const useVaultStore = create<VaultStore>((set) => ({
  loading: false,
  error: null,

  today: null,
  wfcPipeline: [],
  ltcPipeline: [],
  priorityQueue: [],
  memoryContent: '',
  leads: [],
  lastRefreshed: null,

  wfcChecklist: [],
  ltcChecklist: [],
  sharedChecklist: [],

  wfcWeeklyPlan: null,
  ltcWeeklyPlan: null,

  refresh: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch('/api/data');
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const data = await res.json();

      // Parse today's snapshot
      const morningRaw = data.morningStandup || '';
      const eveningRaw = data.eveningReflection || '';
      const wfcRaw = data.wfcPipeline || '';
      const ltcRaw = data.ltcPipeline || '';
      const pqRaw = data.priorityQueue || '';
      const memRaw = data.memory || '';
      const wfcWeeklyRaw = data.wfcWeeklyPlan || '';
      const ltcWeeklyRaw = data.ltcWeeklyPlan || '';
      const leadsData = data.leads || [];

      const dateMatch = morningRaw.match(/^#\s+Morning Stand-up\s*[—–-]\s*(\d{4}-\d{2}-\d{2})/m);
      const date = dateMatch ? dateMatch[1] : '';

      const prioritiesTable = extractTableFromSection(morningRaw, "Today's Top Priorities");
      const blockersTable = extractTableFromSection(morningRaw, 'Active Blockers');
      const deadlinesTable = extractTableFromSection(morningRaw, "Today's Deadlines");
      const risksTable = extractTableFromSection(morningRaw, 'Risk Flags');
      const calendarTable = extractTableFromSection(morningRaw, 'Calendar / Time Blocks');
      const openLoopsTable = extractTableFromSection(morningRaw, 'Open Loops (carried from yesterday)');

      const shippedTable = extractTableFromSection(eveningRaw, 'What Shipped Today');
      const slippedTable = extractTableFromSection(eveningRaw, 'What Slipped');

      const winsSection = extractSection(eveningRaw, 'Wins');
      const wins = winsSection
        .split('\n')
        .filter(l => l.trim().startsWith('-'))
        .map(l => l.replace(/^-\s*/, '').trim());

      const learningsSection = extractSection(eveningRaw, 'Learnings');
      const learnings = learningsSection
        .split('\n')
        .filter(l => l.trim().startsWith('-'))
        .map(l => l.replace(/^-\s*/, '').trim());

      const tomorrowTable = extractTableFromSection(eveningRaw, "Tomorrow's First Attention");

      const wfcPipeline = parsePipeline(wfcRaw);
      const ltcPipeline = parsePipeline(ltcRaw);

      const pqData = extractTableFromSection(pqRaw, 'Top Priorities (This Week)');
      const priorityQueue: PriorityQueueItem[] = pqData.rows.map(r => ({
        rank: parseInt(r.rank || '0', 10),
        org: r.org || '',
        item: r.item || '',
        urgency: r.urgency || '',
        impact: r.impact || '',
        owner: r.owner || '',
        due: r.due || '',
      }));

      const wfcSection = extractSection(morningRaw, 'WFC') || '';
      const ltcSection = extractSection(morningRaw, 'LTC') || '';
      const sharedSection = extractSection(morningRaw, 'Shared') || '';

      set({
        loading: false,
        lastRefreshed: new Date().toLocaleTimeString(),
        today: {
          date,
          weekLabel: '',
          priorities: prioritiesTable.rows.map(r => ({
            rank: parseInt(r.rank || '0', 10),
            org: (r.org as any) || 'WFC',
            item: r.item || '',
            urgency: (r.urgency as any) || 'MEDIUM',
            impact: (r.impact as any) || 'MEDIUM',
            owner: r.owner || '',
            estTime: r.est_time || '',
          })),
          blockers: blockersTable.rows.map(r => ({
            blocker: r.blocker || '',
            org: r.org || '',
            impact: r.impact || '',
            owner: r.owner || '',
            eta: r.eta || '',
            escalation: r.escalation || r['escalation?'] || '',
          })),
          deadlines: deadlinesTable.rows.map(r => ({
            deadline: r.deadline || '',
            org: r.org || '',
            item: r.item || '',
            owner: r.owner || '',
            status: r.status || '',
          })),
          riskFlags: risksTable.rows.map(r => ({
            risk: r.risk || '',
            org: r.org || '',
            severity: (cleanSeverity(r.severity) as any) || 'LOW',
            firstSeen: r.first_seen || '',
            mitigation: r.mitigation || '',
          })),
          calendarBlocks: calendarTable.rows.map(r => ({
            time: r.time || '',
            block: r.block || '',
            focus: r.focus || '',
          })),
          openLoops: openLoopsTable.rows.map(r => ({
            id: r.id || '',
            org: r.org || '',
            description: r.description || '',
            owner: r.owner || '',
            due: r.due || '',
            age: parseInt(r['age_(days)'] || r.age || '0', 10),
          })),
          shipped: shippedTable.rows.map(r => ({
            org: r.org || '',
            item: r.item || '',
            outcome: r.outcome || '',
            confidence: r.confidence || '',
          })),
          slipped: slippedTable.rows.map(r => ({
            org: r.org || '',
            item: r.item || '',
            reason: r.reason || '',
            newTarget: r.new_target || '',
          })),
          wins,
          learnings,
          tomorrowFirst: tomorrowTable.rows.map(r => ({
            rank: parseInt(r.priority || r.rank || '0', 10),
            org: (r.org as any) || 'WFC',
            item: r.item || '',
            urgency: 'HIGH',
            impact: 'HIGH',
            owner: '',
            estTime: '',
          })),
        },
        wfcPipeline,
        ltcPipeline,
        priorityQueue,
        memoryContent: memRaw,
        leads: leadsData,
        wfcChecklist: extractChecklist(wfcSection),
        ltcChecklist: extractChecklist(ltcSection),
        sharedChecklist: extractChecklist(sharedSection),
        wfcWeeklyPlan: parseWeeklyPlan(wfcWeeklyRaw, 'WFC'),
        ltcWeeklyPlan: parseWeeklyPlan(ltcWeeklyRaw, 'LTC'),
      });
    } catch (err: any) {
      console.error('[dashboard] refresh error:', err);
      set({ loading: false, error: err.message || 'Failed to load vault data' });
    }
  },
}));

function parsePipeline(content: string): PipelineLead[] {
  const tables = extractAllTablesFromSection(content, 'Active Opportunities');
  const allTables = tables.length > 0 ? tables : extractAllTables(content);

  const leads: PipelineLead[] = [];
  for (const table of allTables) {
    for (const r of table.rows) {
      const leadName = r.lead || '';
      let links = extractWikiLinks(leadName);

      if (links.length === 0) {
        for (const val of Object.values(r)) {
          const found = extractWikiLinks(val as string);
          if (found.length > 0) { links = found; break; }
        }
      }

      if (!leadName && links.length === 0) continue;

      leads.push({
        lead: links.length > 0 ? links[0].label : leadName,
        linkPath: links.length > 0 ? links[0].target : '',
        practiceType: r.practice_type || '',
        district: r.district || '',
        offerFit: r.offer_fit || '',
        stage: r.stage || '',
        confidence: (r.confidence as any) || 'MEDIUM',
        nextAction: r.next_action || '',
        deadline: r.deadline || '',
        lastContact: r.last_contact || '',
      });
    }
  }

  return leads;
}

function parseWeeklyPlan(content: string, org: 'WFC' | 'LTC'): WeeklyPlan {
  const empty: WeeklyPlan = { org, weekOf: '', activeProjects: [], deliveryGoals: [], blockers: [], risks: [] };
  if (!content) return empty;

  const weekMatch = content.match(/^>\s*Week of\s+(\d{4}-\d{2}-\d{2})/m);
  const weekOf = weekMatch ? weekMatch[1] : '';

  const projectsTable = extractTableFromSection(content, 'Active Projects');
  const activeProjects = projectsTable.rows
    .map(r => ({
      project: r.project || '',
      client: r.client || '',
      milestone: r.milestone || r.stage || '',
      status: r.status || '',
      risk: r.risk || '',
      nextCheckpoint: r.next_checkpoint || '',
    }))
    .filter(p => p.project);

  const goalsSection = extractSection(content, "This Week's Delivery Goals");
  const deliveryGoals = extractChecklist(goalsSection).map(g => ({
    text: g.text,
    checked: g.checked,
  }));

  const blockersTable = extractTableFromSection(content, 'Blockers and Dependencies');
  const blockers = blockersTable.rows
    .map(r => ({
      blocker: r.blocker || '',
      project: r.project || '',
      impact: r.impact || '',
      owner: r.resolution_owner || r.owner || '',
      eta: r.eta || '',
    }))
    .filter(b => b.blocker);

  const risksTable = extractTableFromSection(content, 'Risk Register');
  const risks = risksTable.rows
    .map(r => ({
      project: r.project || '',
      risk: r.risk || '',
      severity: r.severity || '',
      mitigation: r.mitigation || '',
    }))
    .filter(r => r.risk);

  return { org, weekOf, activeProjects, deliveryGoals, blockers, risks };
}
