import { findFileBySlugPath, readContentFile, renderMarkdown } from '@/lib/markdown';
import { notFound } from 'next/navigation';

export default async function OpsPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const filePath = findFileBySlugPath('Ops', slug);

  if (!filePath) notFound();

  const content = readContentFile(filePath);
  if (!content) notFound();

  const html = renderMarkdown(content);

  return (
    <div className="content-page markdown-content">
      <a href="/ops" className="back-link">&larr; Ops</a>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
