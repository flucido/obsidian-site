import { getContentFiles, readContentFile, renderMarkdown } from '@/lib/markdown';

export default async function LeadsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const files = getContentFiles('leads');
  const fileMatch = files.find(f => f.slug === slug);

  if (!fileMatch) {
    return <div className="content-page"><h1>Not found</h1><p>No file matching &ldquo;{slug}&rdquo;.</p></div>;
  }

  const content = readContentFile(fileMatch.path);
  if (!content) {
    return <div className="content-page"><h1>Not found</h1><p>Could not read file.</p></div>;
  }

  const html = renderMarkdown(content);

  return (
    <div className="content-page markdown-content">
      <a href="/leads" className="back-link">&larr; All leads</a>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
