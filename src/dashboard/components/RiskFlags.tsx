'use client';

import React from 'react';
import { useVaultStore } from '../store/useVaultStore';

export function RiskFlags() {
  const today = useVaultStore((s) => s.today);

  if (!today || today.riskFlags.length === 0) {
    return <div className="dashboard-empty">No active risk flags.</div>;
  }

  return (
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>Risk</th>
          <th>Org</th>
          <th>Severity</th>
          <th>First Seen</th>
          <th>Mitigation</th>
        </tr>
      </thead>
      <tbody>
        {today.riskFlags.map((r, i) => (
          <tr key={i}>
            <td style={{ fontWeight: 500 }}>{r.risk}</td>
            <td>
              <span className={`badge ${r.org === 'WFC' ? 'badge-verified' : r.org === 'LTC' ? 'badge-new' : 'badge-closed'}`}>
                {r.org}
              </span>
            </td>
            <td>
              <span
                className={`severity-${r.severity.toLowerCase()}`}
                style={{
                  fontWeight: 700,
                  fontSize: '0.8em',
                  padding: '2px 8px',
                  borderRadius: 10,
                  background:
                    r.severity === 'HIGH'
                      ? '#fef2f2'
                      : r.severity === 'MEDIUM'
                      ? '#fffbeb'
                      : '#eff6ff',
                }}
              >
                {r.severity}
              </span>
            </td>
            <td style={{ fontSize: '0.85em' }}>{r.firstSeen}</td>
            <td style={{ fontSize: '0.85em' }}>{r.mitigation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
