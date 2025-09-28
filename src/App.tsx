// src/App.tsx
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import User from './pages/User';
import { useSelector } from 'react-redux';
import type { ReactNode } from 'react';
import type { RootState } from './redux';
import DashboardLayout from './layout/DashboardLayout';

interface PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
     <Routes>
      <Route path="/login" element={<Login />} />

      {/* Protected Dashboard */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="users" element={<User />} />
        <Route path="videos" element={<div>Videos Page</div>} />
        <Route path="uploads" element={<div>Uploads Page</div>} />
        <Route index element={<Navigate to="users" replace />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
