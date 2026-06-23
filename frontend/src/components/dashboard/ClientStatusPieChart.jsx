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
  { name: "Lead", value: stats?.leadClients || 0 },
  { name: "Contacted", value: stats?.contactedClients || 0 },
  { name: "Qualified", value: stats?.qualifiedClients || 0 },
  { name: "Proposal Sent", value: stats?.proposalSentClients || 0 },
  { name: "Approved", value: stats?.approvedClients || 0 },
  { name: "Onboarded", value: stats?.onboardedClients || 0 },
  { name: "Suspended", value: stats?.suspendedClients || 0 },
  { name: "Archived", value: stats?.archievedClients || 0 },
];

const COLORS = [
  "#00C49F", // Lead
  "#FF8042", // Contacted
  "#FFBB28", // Qualified
  "#0088FE", // Proposal Sent
  "#8884D8", // Approved
  "#82CA9D", // Onboarded
  "#FF4D4F", // Suspended
  "#A0AEC0", // Archived
];
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
