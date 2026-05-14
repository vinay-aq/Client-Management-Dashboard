import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ClientsPage from "../pages/ClientsPage";
import ProtectedRoute from "./ProtectedRoute";
import ClientDetailsPage from "../pages/ClientDetailsPage";
import CreateClientPage from "../pages/CreateClientPage";
import EditClientPage from "../pages/EditClientPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
            <ProtectedRoute>
              <CreateClientPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clients/:id/edit"
          element={
            <ProtectedRoute>
              <EditClientPage />
            </ProtectedRoute>
          }
        />

        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
