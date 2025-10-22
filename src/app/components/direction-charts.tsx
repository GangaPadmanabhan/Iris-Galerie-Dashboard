import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export function DirectionCharts({ series }: { series: Array<{ date: string; revenue: number; orders: number }> }) {
  return (
    <div className="space-y-6">
      <div style={{ height: 320 }}>
        <ResponsiveContainer>
          <LineChart data={series} margin={{ top: 20, right: 24, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#1f2937" dot={false} />
            <Line type="monotone" dataKey="orders" stroke="#2563eb" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ height: 240 }}>
        <ResponsiveContainer>
          <BarChart data={series} margin={{ top: 10, right: 24, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" />
            <Bar dataKey="orders" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
