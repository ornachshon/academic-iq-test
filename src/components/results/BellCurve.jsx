import React from "react";
import { AreaChart, Area, XAxis, YAxis, ReferenceLine, ResponsiveContainer } from "recharts";

export default function BellCurve({ score }) {
  // Generate bell curve data points
  const mean = 100;
  const sd = 15;
  const data = [];
  
  for (let x = 40; x <= 160; x += 2) {
    const z = (x - mean) / sd;
    const y = Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
    data.push({ iq: x, density: y });
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="bellGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5921B" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#F5921B" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="iq"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "#e5e7eb" }}
            ticks={[55, 70, 85, 100, 115, 130, 145]}
          />
          <YAxis hide />
          <Area
            type="monotone"
            dataKey="density"
            stroke="#F5921B"
            strokeWidth={2.5}
            fill="url(#bellGradient)"
          />
          <ReferenceLine
            x={score}
            stroke="#0C3547"
            strokeWidth={3}
            strokeDasharray="6 3"
            label={{
              value: `You: ${score}`,
              position: "top",
              fill: "#0C3547",
              fontWeight: 700,
              fontSize: 13,
            }}
          />
          <ReferenceLine
            x={100}
            stroke="#9ca3af"
            strokeWidth={1}
            strokeDasharray="3 3"
            label={{
              value: "Avg: 100",
              position: "insideTopRight",
              fill: "#9ca3af",
              fontSize: 11,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}