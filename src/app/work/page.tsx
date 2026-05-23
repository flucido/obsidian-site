import { getContentFiles, readContentFile, renderMarkdown, ContentFile } from '@/lib/markdown';
import Link from 'next/link';

interface SectionIndexProps {
  title: string;
  sections: { name: string; files: ContentFile[] }[];
}

function ContentIndex({ title, sections }: SectionIndexProps) {
  return (
    <div className="content-page">
      <h1>{title}</h1>
      {sections.map((section) => (
        <div key={section.name} className="content-section">
          <h2>{section.name}</h2>
          <ul className="content-index">
            {section.files.map((f) => (
              <li key={f.slug}>
                <Link href={`/${f.slug}`}>{f.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function WorkIndex() {
  const sections = [
    { name: 'WFC', files: getContentFiles('Work/WFC') },
    { name: 'LTC', files: getContentFiles('Work/LTC') },
    { name: 'Shared', files: getContentFiles('Work/Shared') },
  ];

  return <ContentIndex title="Work" sections={sections.filter(s => s.files.length > 0)} />;
}
