import { findFileBySlugPath, readContentFile, renderMarkdown } from '@/lib/markdown';
import { notFound } from 'next/navigation';

export default async function LeadPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const filePath = findFileBySlugPath('leads', slug);

  if (!filePath) notFound();

  const content = readContentFile(filePath);
  if (!content) notFound();

  const html = renderMarkdown(content);

  return (
    <div className="content-page markdown-content">
      <a href="/leads" className="back-link">&larr; Leads</a>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
