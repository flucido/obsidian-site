'use client';

import React, { useEffect } from 'react';
import { useVaultStore } from './store/useVaultStore';
import { DailySchedule } from './components/DailySchedule';
import { OverdueTasks } from './components/OverdueTasks';
import { PipelinePanel } from './components/PipelinePanel';
import { PriorityQueue } from './components/PriorityQueue';
import { RiskFlags } from './components/RiskFlags';
import { MetricsBar } from './components/MetricsBar';
import { QuickActions } from './components/QuickActions';
import { WeeklyPlan } from './components/WeeklyPlan';

export function App() {
  const { today, loading, error, refresh, lastRefreshed } = useVaultStore();

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refresh]);

  if (loading) {
    return <div className="dashboard-loading">Loading vault data&hellip;</div>;
  }

  if (error) {
    return (
      <div className="dashboard-loading" style={{ color: '#dc2626' }}>
        Error: {error}
        <br />
        <button className="quick-action-btn" style={{ marginTop: 12 }} onClick={refresh}>
          Retry
        </button>
      </div>
    );
  }

  const todayStr = today?.date || new Date().toISOString().slice(0, 10);

  return (
    <div>
      <div className="dashboard-header">
        <h1>Company Dashboard</h1>
        <span className="date-badge">
          {todayStr}
          {lastRefreshed && ` &middot; Updated ${lastRefreshed}`}
        </span>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel full-width">
          <MetricsBar />
        </div>
      </div>

      <div className="dashboard-grid" style={{ marginTop: 20 }}>
        <div className="dashboard-panel full-width">
          <QuickActions />
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <h2>Today&rsquo;s Priorities</h2>
          <PriorityQueue />
        </div>
        <div className="dashboard-panel">
          <h2>Pipeline</h2>
          <PipelinePanel />
        </div>
      </div>

      <div className="dashboard-grid" style={{ marginTop: 20 }}>
        <div className="dashboard-panel full-width">
          <h2>Weekly Plans</h2>
          <WeeklyPlan />
        </div>
      </div>

      <div className="dashboard-grid" style={{ marginTop: 20 }}>
        <div className="dashboard-panel">
          <h2>Daily Schedule</h2>
          <DailySchedule />
        </div>
        <div className="dashboard-panel">
          <h2>Overdue &amp; Blocked</h2>
          <OverdueTasks />
        </div>
      </div>

      {(today?.riskFlags && today.riskFlags.length > 0) && (
        <div className="dashboard-grid" style={{ marginTop: 20 }}>
          <div className="dashboard-panel full-width">
            <h2>Risk Flags</h2>
            <RiskFlags />
          </div>
        </div>
      )}

      {(today?.shipped && today.shipped.length > 0) && (
        <div className="dashboard-grid" style={{ marginTop: 20 }}>
          <div className="dashboard-panel full-width">
            <h2>Evening Reflection &mdash; What Shipped</h2>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Org</th>
                  <th>Item</th>
                  <th>Outcome</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {today.shipped.map((s, i) => (
                  <tr key={i}>
                    <td><span className={`badge badge-${s.org === 'WFC' ? 'verified' : s.org === 'LTC' ? 'new' : 'closed'}`}>{s.org}</span></td>
                    <td>{s.item}</td>
                    <td>{s.outcome}</td>
                    <td>{s.confidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {today.slipped.length > 0 && (
              <>
                <h3 style={{ marginTop: 16 }}>What Slipped</h3>
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Org</th>
                      <th>Item</th>
                      <th>Reason</th>
                      <th>New Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    {today.slipped.map((s, i) => (
                      <tr key={i}>
                        <td><span className={`badge badge-${s.org === 'WFC' ? 'verified' : s.org === 'LTC' ? 'new' : 'closed'}`}>{s.org}</span></td>
                        <td>{s.item}</td>
                        <td>{s.reason}</td>
                        <td>{s.newTarget}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            {today.wins.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <h3>Wins</h3>
                <ul style={{ margin: '4px 0', paddingLeft: 20 }}>
                  {today.wins.map((w, i) => (
                    <li key={i} style={{ fontSize: '0.9em' }}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {today.tomorrowFirst.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <h3>Tomorrow&rsquo;s First Attention</h3>
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Org</th>
                      <th>Item</th>
                    </tr>
                  </thead>
                  <tbody>
                    {today.tomorrowFirst.map((t, i) => (
                      <tr key={i}>
                        <td>{t.rank}</td>
                        <td><span className={`badge badge-${t.org === 'WFC' ? 'verified' : t.org === 'LTC' ? 'new' : 'closed'}`}>{t.org}</span></td>
                        <td>{t.item}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
