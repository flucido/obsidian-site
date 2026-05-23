'use client';

import React from 'react';
import { useVaultStore } from '../store/useVaultStore';

const ACTIONS = [
  { label: "Today's Note", href: '/daily', primary: true },
  { label: 'Morning Standup', href: '/work', primary: true },
  { label: 'WFC Pipeline', href: '/work' },
  { label: 'LTC Pipeline', href: '/work' },
  { label: 'Priority Queue', href: '/work' },
  { label: 'Revenue Dashboard', href: '/work' },
  { label: 'Leads Dashboard', href: '/leads' },
  { label: 'MEMORY.md', href: '/work' },
];

export function QuickActions() {
  const refresh = useVaultStore((s) => s.refresh);

  return (
    <div className="quick-actions">
      {ACTIONS.map((action) => (
        <a
          key={action.label}
          href={action.href}
          className={`quick-action-btn${action.primary ? ' primary' : ''}`}
        >
          {action.label}
        </a>
      ))}
      <button
        className="quick-action-btn"
        onClick={refresh}
        style={{ marginLeft: 'auto' }}
      >
        Refresh Dashboard
      </button>
    </div>
  );
}
