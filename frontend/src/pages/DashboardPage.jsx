import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StatsCard from "../components/dashboard/StatsCard";
import { useEffect } from "react";
import { fetchDashboardStats } from "../features/dashboard/dashboardSlice";
import ClientsTable from "../components/clients/ClientsTable";
import ClientStatusPieChart from "../components/dashboard/ClientStatusPieChart";
import socket from "../services/socket";
import toast from "react-hot-toast";

function DashboardPage() {
  const dispatch = useDispatch();
  const { stats, isFetchingStats, error } = useSelector(
    (state) => state.dashboard,
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  useEffect(() => {
    async function handleRefetchDashboardData() {
      await dispatch(fetchDashboardStats());
      toast.success("Dashboard updated")
    }

    socket.on("dashboard_stats_updated", handleRefetchDashboardData);

    return () => {
      socket.off("dashboard_stats_updated");
    };
  });

  if (isFetchingStats) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <>
      <h1>Dashboard</h1>
      <div
        style={{
          marginBottom: "40px",
        }}
      >
        <ClientStatusPieChart stats={stats} />
      </div>
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <StatsCard title="Total Clients" value={stats?.totalClients} />
        <StatsCard title="Active Clients" value={stats?.activeClients} />
        <StatsCard title="Inactive Clients" value={stats?.inactiveClients} />
        <StatsCard title="Pending Clients" value={stats?.pendingClients} />
        <StatsCard title="Suspended Clients" value={stats?.suspendedClients} />
      </div>
      <div>
        <h3>Recent Clients</h3>
        <ClientsTable clients={stats?.recentClients} />
      </div>
    </>
  );
}

export default DashboardPage;
