import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ClientsPage from "../pages/ClientsPage";

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/"  element={<LoginPage/>}/>        
            <Route path="/clients" element={<ClientsPage/>}/>        
        </Routes>
    </BrowserRouter>);
}

export default AppRoutes;
