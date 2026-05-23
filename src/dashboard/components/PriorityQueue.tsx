'use client';

import React from 'react';
import { useVaultStore } from '../store/useVaultStore';

export function PriorityQueue() {
  const today = useVaultStore((s) => s.today);

  if (!today || today.priorities.length === 0) {
    return <div className="dashboard-empty">No priorities set. Run morning standup to populate.</div>;
  }

  return (
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Org</th>
          <th>Item</th>
          <th>Urgency</th>
          <th>Impact</th>
          <th>Owner</th>
          <th>Est.</th>
        </tr>
      </thead>
      <tbody>
        {today.priorities.map((p) => (
          <tr key={p.rank}>
            <td style={{ fontWeight: 700 }}>{p.rank}</td>
            <td>
              <span className={`badge ${p.org === 'WFC' ? 'badge-verified' : p.org === 'LTC' ? 'badge-new' : 'badge-closed'}`}>
                {p.org}
              </span>
            </td>
            <td>{p.item}</td>
            <td>
              <span className={`severity-${p.urgency.toLowerCase()}`} style={{ fontWeight: 600, fontSize: '0.8em' }}>
                {p.urgency}
              </span>
            </td>
            <td>
              <span style={{ fontSize: '0.8em' }}>{p.impact}</span>
            </td>
            <td style={{ fontSize: '0.85em' }}>{p.owner}</td>
            <td style={{ fontSize: '0.8em', color: '#6b7280' }}>{p.estTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
