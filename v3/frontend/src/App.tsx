import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import {  useSelector, useDispatch } from "react-redux";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import { RootState } from "./redux/store";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { logout , setCredentials} from "./redux/authSlice";

function PrivateRoute({ children, requiredRole = null }: { children: React.ReactNode; requiredRole?: string | null }) {
  const { token, user } = useSelector((state: RootState) => state.auth);
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (token) {
        try {
          // Verify token with backend
          dispatch(setCredentials({ token, user }));
        } catch (error) {
          // If token is invalid, logout
          dispatch(logout());
        }
      }
    };

    verifyToken();
  }, [dispatch]);

  return (
    
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminDashboard />
              
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminOrders />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute requiredRole="user">
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute requiredRole="user">
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute requiredRole="user">
              <Profile />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    
  );
}

export default App;
