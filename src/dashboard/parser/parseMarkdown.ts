/* Markdown parser — extracts tables, checklists, sections from vault files */
/* Ported from Obsidian dashboard plugin — reads strings, no vault API needed */

export interface TableRow {
  [key: string]: string;
}

export function extractFrontmatter(content: string): Record<string, any> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const lines = match[1].split('\n');
  const result: Record<string, any> = {};

  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      result[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, ''));
    } else {
      result[key] = value;
    }
  }

  return result;
}

export function extractSection(content: string, heading: string): string {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`^#{1,6}\\s+${escaped}\\s*\\n([\\s\\S]*?)(?=^#{1,6}\\s|$(?!\\n))`, 'm');
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

export function extractTable(content: string): { headers: string[]; rows: TableRow[] } {
  const lines = content.split('\n');
  const result: TableRow[] = [];
  let headers: string[] = [];

  let inTable = false;
  let headerLine = -1;
  let separatorLine = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.startsWith('|')) {
      if (inTable) break;
      continue;
    }

    if (!inTable) {
      headerLine = i;
      inTable = true;
      continue;
    }

    if (inTable && headerLine === i - 1) {
      if (/^\|[\s\-:|]+\|$/.test(line)) {
        separatorLine = i;
        const headerCells = parseTableRow(lines[headerLine].trim());
        headers = headerCells.map(h => normalizeHeader(h));
        continue;
      } else {
        inTable = false;
        headerLine = -1;
        continue;
      }
    }

    if (inTable && separatorLine >= 0) {
      const cells = parseTableRow(line);
      if (cells.length === 0) break;
      result.push(cellsToRow(cells, headers));
    }
  }

  return { headers, rows: result };
}

export function extractTableFromSection(content: string, sectionHeading: string): { headers: string[]; rows: TableRow[] } {
  const section = extractSection(content, sectionHeading);
  if (!section) return { headers: [], rows: [] };
  return extractTable(section);
}

export function extractAllTables(content: string): { headers: string[]; rows: TableRow[] }[] {
  const lines = content.split('\n');
  const tables: { headers: string[]; rows: TableRow[] }[] = [];
  let currentRows: TableRow[] = [];
  let currentHeaders: string[] = [];
  let inTable = false;
  let headerLine = -1;
  let separatorFound = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.startsWith('|')) {
      if (inTable && separatorFound && currentHeaders.length > 0 && currentRows.length > 0) {
        tables.push({ headers: currentHeaders, rows: currentRows });
      }
      inTable = false;
      headerLine = -1;
      separatorFound = false;
      currentRows = [];
      currentHeaders = [];
      continue;
    }

    if (!inTable) {
      headerLine = i;
      inTable = true;
      continue;
    }

    if (inTable && headerLine === i - 1) {
      if (/^\|[\s\-:|]+\|$/.test(line)) {
        separatorFound = true;
        const headerCells = parseTableRow(lines[headerLine].trim());
        currentHeaders = headerCells.map(h => normalizeHeader(h));
        continue;
      } else {
        inTable = false;
        headerLine = -1;
        separatorFound = false;
        currentRows = [];
        currentHeaders = [];
        continue;
      }
    }

    if (inTable && separatorFound) {
      const cells = parseTableRow(line);
      if (cells.length === 0) continue;
      currentRows.push(cellsToRow(cells, currentHeaders));
    }
  }

  if (inTable && separatorFound && currentHeaders.length > 0 && currentRows.length > 0) {
    tables.push({ headers: currentHeaders, rows: currentRows });
  }

  return tables;
}

export function extractAllTablesFromSection(content: string, sectionHeading: string): { headers: string[]; rows: TableRow[] }[] {
  const section = extractSection(content, sectionHeading);
  if (!section) return [];
  return extractAllTables(section);
}

export function extractChecklist(content: string): { text: string; checked: boolean; links: string[] }[] {
  const lines = content.split('\n');
  const result: { text: string; checked: boolean; links: string[] }[] = [];

  for (const line of lines) {
    const match = line.match(/^-\s+\[([ xX])\]\s+(.+)$/);
    if (!match) continue;

    const checked = match[1].toLowerCase() === 'x';
    const rawText = match[2].trim();

    const links: string[] = [];
    const linkRegex = /\[\[([^\]]+)\]\]/g;
    let linkMatch;
    while ((linkMatch = linkRegex.exec(rawText)) !== null) {
      links.push(linkMatch[1]);
    }

    const cleanText = rawText.replace(/\[\[([^\]]+)\]\]/g, (_, content) => {
      const parts = content.split('|');
      return parts.length > 1 ? parts[1] : parts[0];
    });

    result.push({ text: cleanText, checked, links });
  }

  return result;
}

export function extractWikiLinks(text: string): { target: string; label: string }[] {
  const results: { target: string; label: string }[] = [];
  const regex = /\[\[([^\]]+)\]\]/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const parts = match[1].split('|');
    results.push({
      target: parts[0].trim(),
      label: parts.length > 1 ? parts[1].trim() : parts[0].trim(),
    });
  }
  return results;
}

function parseTableRow(line: string): string[] {
  const PLACEHOLDER = '\x00';
  const normalized = line.replace(/\\\|/g, PLACEHOLDER);
  const trimmed = normalized.replace(/^\|/, '').replace(/\|$/, '');
  return trimmed.split('|').map(c => c.trim().replace(/\x00/g, '|'));
}

function cellsToRow(cells: string[], headers: string[]): TableRow {
  const row: TableRow = {};
  cells.forEach((cell, i) => {
    const key = headers[i] || `col_${i}`;
    row[key] = cell;
  });
  return row;
}

function normalizeHeader(h: string): string {
  return h.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '_');
}
