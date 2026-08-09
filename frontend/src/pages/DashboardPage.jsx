import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StatsCard from "../components/dashboard/StatsCard";
import { useEffect } from "react";
import { fetchDashboardStats } from "../features/dashboard/dashboardSlice";
import ClientsTable from "../components/clients/ClientsTable";
import ClientStatusPieChart from "../components/dashboard/ClientStatusPieChart";
import socket from "../services/socket";
import toast from "react-hot-toast";
import PageHeader from "../components/common/PageHeader";
import { AppCard } from "../components/common";

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
      toast.success("Dashboard updated");
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
      <PageHeader title="Dashboard" subtitle="Overview of the platform." />
      <div>
        <ClientStatusPieChart stats={stats} />
      </div>
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "24px",
          flexWrap: "wrap",
          marginTop:'1rem'
        }}
      >

        <AppCard title="Total Clients" value={stats?.totalClients} />
        <AppCard title="Lead Clients" value={stats?.leadClients} />
        <AppCard title="Contacted Clients" value={stats?.contactedClients} />
        <AppCard title="Qualified Clients" value={stats?.qualifiedClients} />
        <AppCard
          title="Proposal sent Clients"
          value={stats?.proposalSentClients}
        />
        <AppCard title="Approved Clients" value={stats?.approvedClients} />
        <AppCard title="Onboarded Clients" value={stats?.onboardedClients} />
        <AppCard title="Suspended Clients" value={stats?.suspendedClients} />
        <AppCard title="Archieved Clients" value={stats?.archievedClients} />
      </div>
      <div>
        <h3>Recent Clients</h3>
        <ClientsTable clients={stats?.recentClients} />
      </div>
    </>
  );
}

export default DashboardPage;
