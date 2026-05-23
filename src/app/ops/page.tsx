import { getContentSections, ContentSection } from '@/lib/markdown';
import Link from 'next/link';

function ContentIndex({ title, sections }: { title: string; sections: ContentSection[] }) {
  return (
    <div className="content-page">
      <h1>{title}</h1>
      {sections.map((section) => (
        <div key={section.name} className="content-section">
          <h2>{section.name}</h2>
          <ul className="content-index">
            {section.files.map((f) => (
              <li key={f.slug}>
                <Link href={`/${f.path.replace(/\.md$/, '').toLowerCase()}`}>{f.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function OpsIndex() {
  const sections = getContentSections('Ops', 'Ops').filter((s) => s.files.length > 0);
  return <ContentIndex title="Ops" sections={sections} />;
}
