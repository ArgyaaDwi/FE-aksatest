import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import CrudIndexPage from "./features/crud-non-api/CrudIndexPage";
import CrudCreatePage from "./features/crud-non-api/CrudCreatePage";
import CrudEditPage from "./features/crud-non-api/CrudEditPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/items"
        element={
          <ProtectedRoute>
            <CrudIndexPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/items/create"
        element={
          <ProtectedRoute>
            <CrudCreatePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/items/:id/edit"
        element={
          <ProtectedRoute>
            <CrudEditPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
