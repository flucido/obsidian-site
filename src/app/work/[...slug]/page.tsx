import { findFileBySlugPath, readContentFile, renderMarkdown } from '@/lib/markdown';
import { notFound } from 'next/navigation';

export default async function WorkPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const filePath = findFileBySlugPath('Work', slug);

  if (!filePath) notFound();

  const content = readContentFile(filePath);
  if (!content) notFound();

  const html = renderMarkdown(content);

  return (
    <div className="content-page markdown-content">
      <a href="/work" className="back-link">&larr; Work</a>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
