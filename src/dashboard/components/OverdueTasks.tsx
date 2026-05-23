'use client';

import React from 'react';
import { useVaultStore } from '../store/useVaultStore';

export function OverdueTasks() {
  const today = useVaultStore((s) => s.today);

  if (!today) {
    return <div className="dashboard-empty">No data loaded.</div>;
  }

  const { blockers, openLoops, deadlines } = today;
  const todayStr = new Date().toISOString().slice(0, 10);

  const overdueLoops = openLoops.filter((l) => l.due && l.due < todayStr);
  const overdueDeadlines = deadlines.filter((d) => d.deadline && d.deadline < todayStr);

  const hasAny = blockers.length > 0 || overdueLoops.length > 0 || overdueDeadlines.length > 0;

  if (!hasAny) {
    return <div className="dashboard-empty">Nothing overdue or blocked. Nice.</div>;
  }

  return (
    <div>
      {blockers.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <h3 style={{ fontSize: '0.85em', color: '#dc2626', margin: '0 0 6px 0' }}>
            Active Blockers
          </h3>
          {blockers.map((b, i) => (
            <div
              key={i}
              style={{
                padding: '6px 8px',
                marginBottom: 4,
                background: '#f9fafb',
                borderRadius: 4,
                fontSize: '0.85em',
                borderLeft: '3px solid #dc2626',
              }}
            >
              <strong>{b.blocker}</strong>
              <div style={{ color: '#6b7280', fontSize: '0.9em', marginTop: 2 }}>
                {b.org} &middot; Owner: {b.owner} &middot; ETA: {b.eta}
                {b.escalation && b.escalation !== 'No' && (
                  <span style={{ color: '#dc2626', marginLeft: 8 }}>
                    ⚠ {b.escalation}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {overdueLoops.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <h3 style={{ fontSize: '0.85em', color: '#d97706', margin: '0 0 6px 0' }}>
            Overdue Open Loops
          </h3>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Org</th>
                <th>Description</th>
                <th>Due</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {overdueLoops.map((l) => (
                <tr key={l.id}>
                  <td>{l.id}</td>
                  <td>
                    <span className={`badge badge-${l.org === 'WFC' ? 'verified' : l.org === 'LTC' ? 'new' : 'closed'}`}>
                      {l.org}
                    </span>
                  </td>
                  <td>{l.description}</td>
                  <td style={{ color: '#dc2626' }}>{l.due}</td>
                  <td>{l.age}d</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {overdueDeadlines.length > 0 && (
        <div>
          <h3 style={{ fontSize: '0.85em', color: '#dc2626', margin: '0 0 6px 0' }}>
            Missed Deadlines
          </h3>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Deadline</th>
                <th>Org</th>
                <th>Item</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {overdueDeadlines.map((d, i) => (
                <tr key={i}>
                  <td style={{ color: '#dc2626' }}>{d.deadline}</td>
                  <td>
                    <span className={`badge badge-${d.org === 'WFC' ? 'verified' : d.org === 'LTC' ? 'new' : 'closed'}`}>
                      {d.org}
                    </span>
                  </td>
                  <td>{d.item}</td>
                  <td>{d.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
