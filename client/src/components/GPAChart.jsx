import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const GPAChart = ({ students }) => {
  const data = students.map((s) => {
    const total = s.subjects.reduce((sum, sub) => sum + sub.grade, 0);
    const gpa = s.subjects.length ? (total / s.subjects.length).toFixed(2) : 0;
    return { name: s.name, GPA: parseFloat(gpa) };
  });

  const getColor = (gpa) => {
    if (gpa >= 85) return "#22c55e";
    if (gpa >= 70) return "#eab308";
    return "#ef4444";
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-lg mt-10">
      <h2 className="text-xl font-bold text-indigo-300 mb-6">📊 GPA Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            angle={-20}
            textAnchor="end"
          />
          <YAxis domain={[0, 100]} tick={{ fill: "#9ca3af" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Bar dataKey="GPA" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getColor(entry.GPA)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GPAChart;
