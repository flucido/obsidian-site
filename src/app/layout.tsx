import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'wellfull + LTC',
  description: 'Internal company knowledge base',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <nav className="site-nav">
          <div className="nav-inner">
            <a href="/" className="nav-brand">wellfull + LTC</a>
            <div className="nav-links">
              <a href="/dashboard">Dashboard</a>
              <a href="/daily">Daily</a>
              <a href="/work">Work</a>
              <a href="/research">Research</a>
              <a href="/leads">Leads</a>
              <a href="/ops">Ops</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
