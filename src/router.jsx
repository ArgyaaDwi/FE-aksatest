import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import CrudIndexPage from "./features/crud-non-api/CrudIndexPage";
import CrudCreatePage from "./features/crud-non-api/CrudCreatePage";
import CrudEditPage from "./features/crud-non-api/CrudEditPage";
import DivisionIndexPage from "./features/division/DivisionIndexPage";
import EmployeeIndexPage from "./features/employee/EmployeeIndexPage";
import EmployeeCreatePage from "./features/employee/EmployeeCreatePage";
import EmployeeUpdatePage from "./features/employee/EmployeeUpdatePage";
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

      <Route
        path="/divisions"
        element={
          <ProtectedRoute>
            <DivisionIndexPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <EmployeeIndexPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees/create"
        element={
          <ProtectedRoute>
            <EmployeeCreatePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees/edit/:id"
        element={
          <ProtectedRoute>
            <EmployeeUpdatePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
