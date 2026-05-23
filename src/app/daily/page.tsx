import { getContentFiles, readContentFile, renderMarkdown, ContentFile } from '@/lib/markdown';
import Link from 'next/link';

function ContentIndex({ title, files }: { title: string; files: ContentFile[] }) {
  return (
    <div className="content-page">
      <h1>{title}</h1>
      <ul className="content-index">
        {files.map((f) => (
          <li key={f.slug}>
            <Link href={`/daily/${f.slug}`}>{f.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DailyIndex() {
  const files = getContentFiles('Daily');
  return <ContentIndex title="Daily Notes" files={files} />;
}
