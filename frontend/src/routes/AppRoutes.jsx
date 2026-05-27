import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ClientsPage from "../pages/ClientsPage";
import ProtectedRoute from "./ProtectedRoute";
import ClientDetailsPage from "../pages/ClientDetailsPage";
import CreateClientPage from "../pages/CreateClientPage";
import EditClientPage from "../pages/EditClientPage";
import { PERMISSIONS } from "../utils/permissions";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import Navbar from "../components/layout/Navbar";
import AppLayout from "../components/layout/AppLayout";
import DashboardPage from "../pages/DashboardPage";
import AdminUserPage from "../pages/AdminUserPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <ClientsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients/:id"
            element={
              <ProtectedRoute>
                <ClientDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients/createClient"
            element={
              <ProtectedRoute allowedRoles={PERMISSIONS.CREATE_CLIENT}>
                <CreateClientPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/clients/:id/edit"
            element={
              <ProtectedRoute allowedRoles={PERMISSIONS.EDIT_CLIENT}>
                <EditClientPage />
              </ProtectedRoute>
            }
          />
           <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={PERMISSIONS.MANAGER_USERS}>
                <AdminUserPage />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
