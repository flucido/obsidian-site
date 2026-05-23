'use client';

import React from 'react';
import { useVaultStore } from '../store/useVaultStore';

export function DailySchedule() {
  const today = useVaultStore((s) => s.today);

  if (!today || today.calendarBlocks.length === 0) {
    return <div className="dashboard-empty">No schedule data. Run morning standup to populate.</div>;
  }

  return (
    <div>
      {today.calendarBlocks.map((block, i) => (
        <div key={i} className="time-block">
          <span className="time">{block.time}</span>
          <span className="badge badge-closed">{block.block}</span>
          <span className="focus">{block.focus}</span>
        </div>
      ))}
    </div>
  );
}
