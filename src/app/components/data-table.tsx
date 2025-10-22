import React from "react";

export function DataTable({ rows }: { rows: Array<Record<string, any>> }) {
  if (!rows || rows.length === 0) {
    return <div className="text-sm text-slate-500">No data</div>;
  }
  const cols = Object.keys(rows[0]);
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c} className="text-left font-medium p-2 border-b">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-slate-50">
              {cols.map((c) => (
                <td key={c} className="p-2 border-b whitespace-nowrap">{String(r[c])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
