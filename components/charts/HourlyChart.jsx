"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const formatTime = (time) => time;

export default function HourlyChart({ data }) {
  return (
    <div className="w-full h-100 p-4 pb-8 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Next 24 Hours</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            stroke="#374151"
            tick={{ fontSize: 10 }}
            interval={2}
            tickFormatter={formatTime}
          />
          <YAxis stroke="#374151" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#10b981"
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
