import { getContentFiles, getSubdirFiles } from '@/lib/markdown';
import Link from 'next/link';

export default function LeadsIndex() {
  const topLevelFiles = getContentFiles('leads');
  const dossiers = getSubdirFiles('leads', 'dossier');

  return (
    <div className="content-page">
      <h1>Leads</h1>

      {topLevelFiles.length > 0 && (
        <div className="content-section">
          <h2>Documents</h2>
          <ul className="content-index">
            {topLevelFiles.map((f) => (
              <li key={f.slug}>
                <Link href={`/leads/${f.slug}`}>{f.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {dossiers.length > 0 && (
        <div className="content-section">
          <h2>Individual Leads</h2>
          <ul className="content-index">
            {dossiers.map((f) => (
              <li key={f.slug}>
                <Link href={`/leads/${f.slug}/dossier`}>{f.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
