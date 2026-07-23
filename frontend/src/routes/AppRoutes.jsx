import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AppLayout from "@/components/layout/AppLayout.jsx";

import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import Dashboard from "@/pages/Dashboard.jsx";
import Falecidos from "@/pages/Falecidos.jsx";
import NovoFalecido from "@/pages/NovoFalecido.jsx";
import FalecidoDetalhes from "@/pages/FalecidoDetalhes.jsx";
import Responsaveis from "@/pages/Responsaveis.jsx";
import NovoResponsavel from "@/pages/NovoResponsavel.jsx";
import ResponsavelDetalhes from "@/pages/ResponsavelDetalhes.jsx";
import Jazigos from "@/pages/Jazigos.jsx";
import NovoJazigo from "@/pages/NovoJazigo.jsx";
import JazigoDetalhes from "@/pages/JazigoDetalhes.jsx";
import Sepultamentos from "@/pages/Sepultamentos.jsx";
import NovoSepultamento from "@/pages/NovoSepultamento.jsx";
import Relatorios from "@/pages/Relatorios.jsx";
import AdminUsuarios from "@/pages/AdminUsuarios.jsx";
import NotFound from "@/pages/NotFound.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/falecidos" element={<Falecidos />} />
        <Route path="/falecidos/novo" element={<NovoFalecido />} />
        <Route path="/falecidos/:id" element={<FalecidoDetalhes />} />

        <Route path="/responsaveis" element={<Responsaveis />} />
        <Route path="/responsaveis/novo" element={<NovoResponsavel />} />
        <Route path="/responsaveis/:id" element={<ResponsavelDetalhes />} />

        <Route path="/jazigos" element={<Jazigos />} />
        <Route path="/jazigos/novo" element={<NovoJazigo />} />
        <Route path="/jazigos/:id" element={<JazigoDetalhes />} />

        <Route path="/sepultamentos" element={<Sepultamentos />} />
        <Route path="/sepultamentos/novo" element={<NovoSepultamento />} />

        <Route path="/relatorios" element={<Relatorios />} />

        <Route
          path="/admin/usuarios"
          element={
            <AdminRoute>
              <AdminUsuarios />
            </AdminRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
