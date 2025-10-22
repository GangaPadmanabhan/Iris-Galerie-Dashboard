"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { KPIGrid } from "@/components/kpi-grid";
import { DateRangePicker } from "@/components/date-range-picker";
import { DirectionCharts } from "@/components/direction-charts";
import { DataTable } from "@/components/data-table";

type Kpi = { label: string; value: number | string; delta: number };
type SeriesRow = { date: string; revenue: number; orders: number };

export default function Page() {
  const [unit, setUnit] = useState("iris.Global");
  const [from, setFrom] = useState<string>(dayjs().subtract(6, "day").format("YYYY-MM-DD"));
  const [to, setTo] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [data, setData] = useState<{ kpis: Kpi[]; series: SeriesRow[]; table: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const qs = new URLSearchParams({ unit, from, to });
      const res = await fetch(`/api/metrics?${qs}`);
      const json = await res.json();
      setData(json);
      setLoading(false);
    }
    load();
  }, [unit, from, to]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Daily Direction</h1>
          <div className="text-sm text-slate-600">KPI dashboard — demo with mock data</div>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-3">
          <select
            className="px-3 py-2 border rounded"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="iris.Global">iris.Global</option>
            <option value="iris.France">iris.France</option>
            <option value="iris.Germany">iris.Germany</option>
          </select>

          <DateRangePicker
            from={from}
            to={to}
            setFrom={(v) => setFrom(v)}
            setTo={(v) => setTo(v)}
          />

          <button
            onClick={() => (window.location.href = `/api/export?unit=${unit}&from=${from}&to=${to}`)}
            className="px-3 py-2 rounded bg-slate-800 text-white"
          >
            Export CSV
          </button>
        </div>
      </header>

      <main className="space-y-6">
        {loading ? (
          <div className="text-sm text-slate-500">Loading...</div>
        ) : (
          <>
            <KPIGrid items={data?.kpis ?? []} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white rounded p-4 shadow-sm">
                <DirectionCharts series={data?.series ?? []} />
              </div>

              <div className="bg-white rounded p-4 shadow-sm">
                <DataTable rows={data?.table ?? []} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
