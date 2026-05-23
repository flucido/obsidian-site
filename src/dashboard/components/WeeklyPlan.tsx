'use client';

import React from 'react';
import { useVaultStore } from '../store/useVaultStore';
import type { WeeklyPlan as WeeklyPlanData } from '../types';

function riskBadgeClass(risk: string): string {
  const r = risk.toUpperCase();
  if (r === 'HIGH') return 'badge-closed';
  if (r === 'MEDIUM') return 'badge-review';
  return 'badge-verified';
}

function WeeklyPlanSection({ plan }: { plan: WeeklyPlanData }) {
  const hasProjects = plan.activeProjects.length > 0;
  const hasGoals = plan.deliveryGoals.length > 0;
  const hasBlockers = plan.blockers.length > 0;
  const hasRisks = plan.risks.length > 0;

  const sectionLabel: React.CSSProperties = {
    fontSize: '0.72em',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#9ca3af',
    marginBottom: 4,
    marginTop: 12,
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3 style={{ fontSize: '0.85em', margin: '0 0 10px 0', color: '#6b7280' }}>
        {plan.org}
        {plan.weekOf && (
          <span style={{ fontWeight: 400, marginLeft: 6 }}>&middot; Week of {plan.weekOf}</span>
        )}
      </h3>

      {!hasProjects && !hasGoals && (
        <div className="dashboard-empty">
          No weekly plan data.
        </div>
      )}

      {hasProjects && (
        <>
          <div style={sectionLabel}>Active Projects</div>
          <table className="dashboard-table" style={{ marginBottom: 8 }}>
            <thead>
              <tr>
                <th>Project</th>
                <th>Client</th>
                <th>Milestone / Stage</th>
                <th>Status</th>
                <th>Risk</th>
                <th>Next Checkpoint</th>
              </tr>
            </thead>
            <tbody>
              {plan.activeProjects.map((p, i) => (
                <tr key={i}>
                  <td>{p.project}</td>
                  <td>{p.client}</td>
                  <td>{p.milestone}</td>
                  <td>{p.status}</td>
                  <td>
                    {p.risk ? (
                      <span className={`badge ${riskBadgeClass(p.risk)}`}>{p.risk}</span>
                    ) : '—'}
                  </td>
                  <td>{p.nextCheckpoint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {hasGoals && (
        <>
          <div style={sectionLabel}>This Week&rsquo;s Goals</div>
          <ul style={{ margin: '0 0 8px 0', paddingLeft: 18 }}>
            {plan.deliveryGoals.map((g, i) => (
              <li
                key={i}
                style={{
                  fontSize: '0.85em',
                  color: g.checked ? '#9ca3af' : 'inherit',
                  textDecoration: g.checked ? 'line-through' : 'none',
                  marginBottom: 3,
                }}
              >
                {g.text}
              </li>
            ))}
          </ul>
        </>
      )}

      {hasBlockers && (
        <>
          <div style={{ ...sectionLabel, color: '#dc2626' }}>Blockers</div>
          <table className="dashboard-table" style={{ marginBottom: 8 }}>
            <thead>
              <tr>
                <th>Blocker</th>
                <th>Project</th>
                <th>Impact</th>
                <th>Owner</th>
                <th>ETA</th>
              </tr>
            </thead>
            <tbody>
              {plan.blockers.map((b, i) => (
                <tr key={i}>
                  <td>{b.blocker}</td>
                  <td>{b.project}</td>
                  <td>{b.impact}</td>
                  <td>{b.owner}</td>
                  <td>{b.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {hasRisks && (
        <>
          <div style={sectionLabel}>Risk Register</div>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Risk</th>
                <th>Severity</th>
                <th>Mitigation</th>
              </tr>
            </thead>
            <tbody>
              {plan.risks.map((r, i) => (
                <tr key={i}>
                  <td>{r.project}</td>
                  <td>{r.risk}</td>
                  <td>
                    <span className={`badge ${riskBadgeClass(r.severity)}`}>
                      {r.severity}
                    </span>
                  </td>
                  <td>{r.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export function WeeklyPlan() {
  const wfcPlan = useVaultStore((s) => s.wfcWeeklyPlan);
  const ltcPlan = useVaultStore((s) => s.ltcWeeklyPlan);

  return (
    <div>
      {wfcPlan && <WeeklyPlanSection plan={wfcPlan} />}
      {ltcPlan && <WeeklyPlanSection plan={ltcPlan} />}
    </div>
  );
}
