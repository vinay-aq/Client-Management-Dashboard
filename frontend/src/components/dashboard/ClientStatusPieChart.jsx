import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ClientStatusPieChart({ stats }) {
  const data = [
    { name: "Active", value: stats?.activeClients || 0 },
    { name: "Inactive", value: stats?.inactiveClients || 0 },
    { name: "Pending", value: stats?.pendingClients || 0 },
    { name: "Suspended", value: stats?.suspendedClients || 0 },
  ];

  const COLORS = ["#00C49F", "#FF8042", "#FFBB28", "#FF4D4F"];
  return (
    <div
      style={{
        height: "400px",

        border: "1px solid #ddd",

        borderRadius: "8px",

        padding: "20px",
      }}
    >
      <h3>Client Status Distribution</h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ClientStatusPieChart;
