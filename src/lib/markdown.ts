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
