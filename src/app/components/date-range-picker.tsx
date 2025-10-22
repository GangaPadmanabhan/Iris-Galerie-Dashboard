import React from "react";

export function DateRangePicker({
  from,
  to,
  setFrom,
  setTo,
}: {
  from: string;
  to: string;
  setFrom: (v: string) => void;
  setTo: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="px-2 py-1 border rounded"
      />
      <span className="text-sm text-slate-500">to</span>
      <input
        type="date"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="px-2 py-1 border rounded"
      />
    </div>
  );
}
