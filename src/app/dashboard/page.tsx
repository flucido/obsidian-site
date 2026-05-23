'use client';

import dynamic from 'next/dynamic';

const DashboardClient = dynamic(() => import('@/dashboard/App').then(mod => ({ default: mod.App })), {
  ssr: false,
});

export default function DashboardPage() {
  return (
    <div className="company-dashboard">
      <DashboardClient />
    </div>
  );
}
