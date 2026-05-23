import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

interface WikiLinkMatch {
  target: string;
  label: string;
}

export function resolveWikiLinks(markdown: string): string {
  return markdown.replace(/\[\[([^\]]+)\]\]/g, (_, inner) => {
    const parts = inner.split('|');
    const target = parts[0].trim();
    const label = parts.length > 1 ? parts[1].trim() : target;

    const resolvedPath = resolveVaultPath(target);
    if (resolvedPath) {
      return `[${label}](${resolvedPath})`;
    }
    return label;
  });
}

export function resolveVaultPath(wikilink: string): string | null {
  const slug = wikilink
    .toLowerCase()
    .replace(/[^a-z0-9-/]+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '');

  if (wikilink.startsWith('Daily/') || wikilink.startsWith('Work/') || wikilink.startsWith('Research/') || wikilink.startsWith('leads/')) {
    return `/${slug}`;
  }

  const baseDirs = ['Daily', 'Work', 'Research', 'leads', 'Ops', 'People'];
  for (const dir of baseDirs) {
    const testPath = path.join(CONTENT_DIR, dir);
    if (fs.existsSync(testPath)) {
      const entries = fs.readdirSync(testPath, { withFileTypes: true, recursive: true });
      for (const entry of entries) {
        if (entry.isDirectory()) continue;
        const relPath = `${dir}/${entry.name}`;
        if (relPath.toLowerCase().includes(wikilink.toLowerCase() + '.md')) {
          return `/${slug}`;
        }
      }
    }
  }

  return null;
}

export function renderCallouts(markdown: string): string {
  return markdown.replace(/^>\s*\[!(\w+)\]([+-]?)\s*(.+)$/gm, (_, type, fold, title) => {
    const calloutType = type.toLowerCase();
    const icon = getCalloutIcon(calloutType);
    return `<blockquote class="callout callout-${calloutType}">
<p class="callout-title">${icon} ${title || calloutType}</p>
`;
  }).replace(/^>\s+(.+)$/gm, (_, content) => {
    return `${content}`;
  }).replace(/<\/blockquote>\n<blockquote/g, '\n');
}

function getCalloutIcon(type: string): string {
  const icons: Record<string, string> = {
    note: '📝',
    warning: '⚠️',
    danger: '🔥',
    tip: '💡',
    info: 'ℹ️',
    success: '✅',
    question: '❓',
    abstract: '📋',
    example: '📖',
    quote: '💬',
    todo: '☑️',
  };
  return icons[type] || '📝';
}

export function renderTables(markdown: string): string {
  // Match a block of lines that all start with |
  return markdown.replace(
    /^(\|.+\|\n)+/gm,
    (block) => {
      const lines = block.trimEnd().split('\n').filter(Boolean);
      if (lines.length < 2) return block;

      // Second line must be the separator (|---|---|)
      const isSeparator = (line: string) =>
        /^\|[\s|:-]+\|$/.test(line.trim());
      if (!isSeparator(lines[1])) return block;

      const parseRow = (line: string) =>
        line
          .trim()
          .replace(/^\||\|$/g, '')   // strip leading/trailing |
          .split('|')
          .map((cell) => cell.trim());

      const headers = parseRow(lines[0]);
      const rows = lines.slice(2).map(parseRow);

      const thead =
        '<thead><tr>' +
        headers.map((h) => `<th>${h}</th>`).join('') +
        '</tr></thead>';

      const tbody =
        '<tbody>' +
        rows
          .map(
            (cells) =>
              '<tr>' +
              cells.map((c) => `<td>${c}</td>`).join('') +
              '</tr>'
          )
          .join('') +
        '</tbody>';

      return `<table>${thead}${tbody}</table>\n`;
    }
  );
}

export function renderMarkdown(markdown: string): string {
  let html = markdown;

  html = resolveWikiLinks(html);
  html = renderCallouts(html);

  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  html = html.replace(/^---$/gm, '<hr>');

  // Tables — must run before the paragraph pass
  html = renderTables(html);

  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  html = html.replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>');

  const paragraphs = html.split('\n\n');
  html = paragraphs.map(p => {
    const trimmed = p.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<table') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<hr')) {
      return trimmed;
    }
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');

  return html;
}

export interface ContentFile {
  slug: string;
  path: string;
  title: string;
}

export function getContentFiles(dir: string): ContentFile[] {
  const fullPath = path.join(CONTENT_DIR, dir);
  const results: ContentFile[] = [];

  try {
    const entries = fs.readdirSync(fullPath, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
      const filePath = path.join(fullPath, entry.name);
      const content = fs.readFileSync(filePath, 'utf-8');
      const slug = entry.name.replace(/\.md$/, '');
      const title = extractTitle(content) || slug;

      results.push({ slug: slug.toLowerCase(), path: `${dir}/${entry.name}`, title });
    }

    results.sort((a, b) => {
      const dateA = extractDate(a.title);
      const dateB = extractDate(b.title);
      if (dateA && dateB) return dateB.localeCompare(dateA);
      if (dateA) return -1;
      if (dateB) return 1;
      return a.title.localeCompare(b.title);
    });
  } catch {}

  return results;
}

export function readContentFile(filePath: string): string | null {
  try {
    return fs.readFileSync(path.join(CONTENT_DIR, filePath), 'utf-8');
  } catch {
    return null;
  }
}

/**
 * Given a base directory and URL slug segments (lowercased), find the matching
 * .md file doing case-insensitive matching on each path component.
 * Returns the path relative to CONTENT_DIR (e.g. "Work/WFC/pipeline.md"), or null.
 */
export function findFileBySlugPath(baseDir: string, segments: string[]): string | null {
  let currentPath = path.join(CONTENT_DIR, baseDir);

  try {
    for (let i = 0; i < segments.length - 1; i++) {
      const entries = fs.readdirSync(currentPath, { withFileTypes: true });
      const match = entries.find(
        (e) => e.isDirectory() && e.name.toLowerCase() === segments[i].toLowerCase()
      );
      if (!match) return null;
      currentPath = path.join(currentPath, match.name);
    }

    const last = segments[segments.length - 1].toLowerCase();
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    const match = entries.find(
      (e) => e.isFile() && e.name.toLowerCase() === `${last}.md`
    );
    if (!match) return null;

    return path.relative(CONTENT_DIR, path.join(currentPath, match.name));
  } catch {
    return null;
  }
}

/**
 * Returns ContentFile entries for a specific filename found inside immediate
 * subdirectories of baseDir (e.g., all leads/<slug>/dossier.md files).
 */
export function getSubdirFiles(baseDir: string, filename: string): ContentFile[] {
  const fullPath = path.join(CONTENT_DIR, baseDir);
  const results: ContentFile[] = [];

  try {
    const entries = fs.readdirSync(fullPath, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const filePath = path.join(fullPath, entry.name, `${filename}.md`);
      if (!fs.existsSync(filePath)) continue;
      const content = fs.readFileSync(filePath, 'utf-8');
      const title = extractTitle(content) || entry.name;
      results.push({
        slug: entry.name.toLowerCase(),
        path: `${baseDir}/${entry.name}/${filename}.md`,
        title,
      });
    }
  } catch {}

  return results.sort((a, b) => a.title.localeCompare(b.title));
}

function extractTitle(content: string): string {
  const h1Match = content.match(/^# (.+)$/m);
  if (h1Match) return h1Match[1].trim();

  const fmMatch = content.match(/^---\ntitle:\s*(.+)$/m);
  if (fmMatch) return fmMatch[1].trim();

  return '';
}

function extractDate(filename: string): string | null {
  const match = filename.match(/(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : null;
}
