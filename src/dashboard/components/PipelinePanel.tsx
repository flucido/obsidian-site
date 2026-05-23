'use client';

import React from 'react';
import { useVaultStore } from '../store/useVaultStore';
import type { PipelineLead } from '../types';

function stageBadgeClass(stage: string): string {
  const s = stage.toLowerCase();
  if (s.includes('draft')) return 'badge-drafting';
  if (s.includes('verif')) return 'badge-verified';
  if (s.includes('qualif')) return 'badge-qualified';
  if (s.includes('new')) return 'badge-new';
  if (s.includes('proposal')) return 'badge-proposal';
  if (s.includes('won') || s.includes('active')) return 'badge-won';
  if (s.includes('closed') || s.includes('lost')) return 'badge-closed';
  if (s.includes('review') || s.includes('negotiation')) return 'badge-review';
  return 'badge-closed';
}

function PipelineTable({ leads, orgLabel }: { leads: PipelineLead[]; orgLabel: string }) {
  if (leads.length === 0) {
    return (
      <div>
        <h3 style={{ fontSize: '0.85em', margin: '0 0 8px 0', color: '#6b7280' }}>
          {orgLabel} &middot; 0 leads
        </h3>
        <div className="dashboard-empty">No active leads in pipeline.</div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: orgLabel === 'WFC' ? 16 : 0 }}>
      <h3 style={{ fontSize: '0.85em', margin: '0 0 8px 0', color: '#6b7280' }}>
        {orgLabel} &middot; {leads.length} lead{leads.length !== 1 ? 's' : ''}
      </h3>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Lead</th>
            <th>Stage</th>
            <th>Confidence</th>
            <th>Next Action</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => (
            <tr key={i}>
              <td>
                <span className="lead-link">{lead.lead}</span>
                {lead.practiceType && (
                  <div style={{ fontSize: '0.75em', color: '#9ca3af' }}>
                    {lead.practiceType}
                  </div>
                )}
                {lead.district && (
                  <div style={{ fontSize: '0.75em', color: '#9ca3af' }}>
                    {lead.district}
                  </div>
                )}
              </td>
              <td>
                <span className={`badge ${stageBadgeClass(lead.stage)}`}>
                  {lead.stage}
                </span>
              </td>
              <td>
                <span style={{
                  fontSize: '0.8em',
                  fontWeight: 600,
                  color:
                    lead.confidence === 'HIGH'
                      ? '#16a34a'
                      : lead.confidence === 'MEDIUM'
                      ? '#d97706'
                      : '#6b7280',
                }}>
                  {lead.confidence}
                </span>
              </td>
              <td style={{ fontSize: '0.85em', maxWidth: 180 }}>{lead.nextAction}</td>
              <td style={{ fontSize: '0.85em' }}>{lead.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PipelinePanel() {
  const wfcPipeline = useVaultStore((s) => s.wfcPipeline);
  const ltcPipeline = useVaultStore((s) => s.ltcPipeline);

  const totalLeads = wfcPipeline.length + ltcPipeline.length;
  if (totalLeads === 0) {
    return <div className="dashboard-empty">No pipeline data loaded.</div>;
  }

  return (
    <div>
      <PipelineTable leads={wfcPipeline} orgLabel="WFC" />
      <PipelineTable leads={ltcPipeline} orgLabel="LTC" />
    </div>
  );
}
