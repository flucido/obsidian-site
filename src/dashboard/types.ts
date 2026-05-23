/* Shared types — ported from Obsidian dashboard plugin */

export interface Priority {
  rank: number;
  org: 'WFC' | 'LTC' | 'Shared';
  item: string;
  urgency: 'HIGH' | 'MEDIUM' | 'LOW';
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  owner: string;
  estTime: string;
}

export interface Blocker {
  blocker: string;
  org: string;
  impact: string;
  owner: string;
  eta: string;
  escalation: string;
}

export interface Deadline {
  deadline: string;
  org: string;
  item: string;
  owner: string;
  status: string;
}

export interface RiskFlag {
  risk: string;
  org: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  firstSeen: string;
  mitigation: string;
}

export interface TimeBlock {
  time: string;
  block: string;
  focus: string;
}

export interface OpenLoop {
  id: string;
  org: string;
  description: string;
  owner: string;
  due: string;
  age: number;
}

export interface PipelineLead {
  lead: string;
  practiceType?: string;
  district?: string;
  offerFit?: string;
  stage: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  nextAction: string;
  deadline: string;
  lastContact: string;
  linkPath: string;
}

export interface PriorityQueueItem {
  rank: number;
  org: string;
  item: string;
  urgency: string;
  impact: string;
  owner: string;
  due: string;
}

export interface ShippedItem {
  org: string;
  item: string;
  outcome: string;
  confidence: string;
}

export interface SlippedItem {
  org: string;
  item: string;
  reason: string;
  newTarget: string;
}

export interface TodaySnapshot {
  date: string;
  weekLabel: string;
  priorities: Priority[];
  blockers: Blocker[];
  deadlines: Deadline[];
  riskFlags: RiskFlag[];
  calendarBlocks: TimeBlock[];
  openLoops: OpenLoop[];
  shipped: ShippedItem[];
  slipped: SlippedItem[];
  wins: string[];
  learnings: string[];
  tomorrowFirst: Priority[];
}

export interface ChecklistItem {
  text: string;
  checked: boolean;
  links: string[];
}

export interface LeadDossierMeta {
  path: string;
  title: string;
  org: string;
  credential?: string;
  district?: string;
  platform?: string;
  score?: number;
  confidence?: string;
  status?: string;
  type?: string;
}

export interface WeeklyActiveProject {
  project: string;
  client: string;
  milestone: string;
  status: string;
  risk: string;
  nextCheckpoint: string;
}

export interface WeeklyBlocker {
  blocker: string;
  project: string;
  impact: string;
  owner: string;
  eta: string;
}

export interface WeeklyRisk {
  project: string;
  risk: string;
  severity: string;
  mitigation: string;
}

export interface WeeklyPlan {
  org: 'WFC' | 'LTC';
  weekOf: string;
  activeProjects: WeeklyActiveProject[];
  deliveryGoals: { text: string; checked: boolean }[];
  blockers: WeeklyBlocker[];
  risks: WeeklyRisk[];
}
