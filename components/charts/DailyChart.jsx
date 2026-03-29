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
import { getWeatherIcon } from "@/lib/utils";

const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  const icon = getWeatherIcon(payload.code);

  return <image href={icon} x={cx - 12} y={cy - 25} width={24} height={24} />;
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }); // Mar 30
};

export default function DailyChart({ data }) {
  return (
    <div className="w-full h-100 p-4 pb-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">7 Day Forecast</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 40, left: 0, bottom: 20 }}
        >
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            stroke="#374151"
            tick={{ fontSize: 11 }}
            tickFormatter={formatDate}
            interval={0}
          />
          <YAxis stroke="#374151" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#3b82f6"
            dot={<CustomDot />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
