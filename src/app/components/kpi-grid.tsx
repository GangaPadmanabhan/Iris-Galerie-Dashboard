import React from "react";

export function KPIGrid({ items }: { items: Array<{ label: string; value: number | string; delta: number }> }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {items.map((k, i) => (
        <div key={i} className="bg-white rounded p-4 shadow-sm">
          <div className="text-sm text-slate-500">{k.label}</div>
          <div className="text-2xl font-semibold mt-1">{typeof k.value === "number" ? Intl.NumberFormat().format(k.value) : k.value}</div>
          <div className={`mt-1 text-sm ${k.delta >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            {k.delta >= 0 ? "+" : ""}
            {k.delta.toFixed(1)}%
          </div>
        </div>
      ))}
    </div>
  );
}
