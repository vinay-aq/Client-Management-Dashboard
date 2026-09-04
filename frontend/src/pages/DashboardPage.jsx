import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDashboardStats } from "../features/dashboard/dashboardSlice";
import ClientsTable from "../components/clients/ClientsTable";
import ClientStatusPieChart from "../components/dashboard/ClientStatusPieChart";
import socket from "../services/socket";
import toast from "react-hot-toast";
import PageHeader from "../components/common/PageHeader";
import {
  AppCard,
  CardSkeleton,
  ChartSkeleton,
  TableSkeleton,
} from "../components/common";

function DashboardPage() {
  const dispatch = useDispatch();
  const { stats, isFetchingStats, error } = useSelector(
    (state) => state.dashboard,
  );

  console.log("stats", stats);

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

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Overview of the platform." />
      {isFetchingStats ? (
        <>
          <ChartSkeleton />
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "24px",
              flexWrap: "wrap",
              marginTop: "1rem",
            }}
          >
            {Array.from({ length: 7 }).map((__dirname, index) => (
              <CardSkeleton key={index} />
            ))}
            <TableSkeleton />
          </div>
        </>
      ) : (
        <>
          {" "}
          <div>
            <ClientStatusPieChart stats={stats} />
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "24px",
              flexWrap: "wrap",
              marginTop: "1rem",
            }}
          >
            {stats &&
              stats.map((s) => (
                <AppCard title={s.label} value={s.count} sx={{ flex: 1 }} />
              ))}
          </div>
          <div>
            <h3>Recent Clients</h3>
            <ClientsTable clients={stats?.recentClients} />
          </div>
        </>
      )}
    </>
  );
}

export default DashboardPage;
