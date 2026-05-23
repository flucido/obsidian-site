'use client';

import React, { useMemo } from 'react';
import { useVaultStore } from '../store/useVaultStore';

export function MetricsBar() {
  const wfcPipeline = useVaultStore((s) => s.wfcPipeline);
  const ltcPipeline = useVaultStore((s) => s.ltcPipeline);
  const leads = useVaultStore((s) => s.leads);

  const totalLeads = leads.length;
  const wfcCount = leads.filter((l) => l.org === 'WFC').length;
  const ltcCount = leads.filter((l) => l.org === 'LTC').length;
  const approvedCount = leads.filter((l) => l.status === 'approved').length;
  const reviewCount = leads.filter((l) => l.status === 'review').length;

  const wfcPipelineCount = wfcPipeline.length;
  const wfcPipelineValue = useMemo(() => {
    const val = wfcPipelineCount * 3500;
    return val >= 1000 ? `$${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}K` : `$${val}`;
  }, [wfcPipelineCount]);
  const wfcMRR = useMemo(() => {
    const mrr = wfcPipelineCount * 150;
    return `$${(mrr / 1000).toFixed(mrr % 1000 === 0 ? 0 : 1)}K/mo`;
  }, [wfcPipelineCount]);

  const ltcPipelineValue = useMemo(() => {
    if (ltcPipeline.length === 0) return '$0';
    let low = 0, high = 0;
    for (const l of ltcPipeline) {
      const stage = l.stage.toLowerCase();
      if (stage.includes('qualif')) { low += 50000; high += 75000; }
      else if (stage.includes('new')) { low += 5000; high += 15000; }
    }
    if (low === high) return `$${(low / 1000).toFixed(0)}K`;
    return `$${Math.round(low / 1000)}-${Math.round(high / 1000)}K`;
  }, [ltcPipeline]);

  const draftingLeads = [...wfcPipeline, ...ltcPipeline].filter(
    (l) => l.stage.toLowerCase().includes('draft')
  ).length;

  const metrics = [
    { label: 'Total Leads', value: String(totalLeads) },
    { label: 'WFC Leads', value: String(wfcCount) },
    { label: 'LTC Leads', value: String(ltcCount) },
    { label: 'Approved', value: String(approvedCount) },
    { label: 'In Review', value: String(reviewCount) },
    { label: 'Drafting', value: String(draftingLeads) },
    { label: 'WFC Pipeline', value: wfcPipelineValue },
    { label: 'LTC Pipeline', value: ltcPipelineValue },
    { label: 'WFC Est. MRR', value: wfcMRR },
  ];

  return (
    <div className="metrics-bar">
      {metrics.map((m) => (
        <div key={m.label} className="metric-card">
          <div className="metric-value">{m.value}</div>
          <div className="metric-label">{m.label}</div>
        </div>
      ))}
    </div>
  );
}
