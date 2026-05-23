import { getContentFiles, readContentFile, renderMarkdown } from '@/lib/markdown';

export async function generateStaticParams() {
  const files = getContentFiles('Daily');
  return files.map((f) => ({ slug: f.slug }));
}

export default async function DailyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fileMatch = getContentFiles('Daily').find(f => f.slug === slug);

  if (!fileMatch) {
    return <div className="content-page"><h1>Not found</h1><p>No daily note for &ldquo;{slug}&rdquo;.</p></div>;
  }

  const content = readContentFile(fileMatch.path);
  if (!content) {
    return <div className="content-page"><h1>Not found</h1><p>Could not read file.</p></div>;
  }

  const html = renderMarkdown(content);

  return (
    <div className="content-page markdown-content">
      <a href="/daily" className="back-link">&larr; All daily notes</a>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
