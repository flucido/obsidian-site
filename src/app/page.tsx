import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-page">
      <h1>wellfull + LTC</h1>
      <p className="subtitle">Internal knowledge base</p>
      <div className="home-grid">
        <Link href="/dashboard" className="home-card">
          <h2>Dashboard</h2>
          <p>Operations dashboard with pipeline, priorities, and weekly plans</p>
        </Link>
        <Link href="/daily" className="home-card">
          <h2>Daily Notes</h2>
          <p>Daily standup and reflection notes</p>
        </Link>
        <Link href="/work" className="home-card">
          <h2>Work</h2>
          <p>WFC, LTC, and Shared pipelines, weekly plans, and marketing</p>
        </Link>
        <Link href="/research" className="home-card">
          <h2>Research</h2>
          <p>Market research, legal research, competitive analysis</p>
        </Link>
        <Link href="/leads" className="home-card">
          <h2>Leads</h2>
          <p>Lead dossiers and outreach</p>
        </Link>
      </div>
    </div>
  );
}
