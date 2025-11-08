// src/App.tsx
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import ForecastDashboard from "./pages/ForecastDashboard";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Settings from "./pages/Settings";
import Stocks from "./pages/Stocks";

import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Welcome from "./pages/Welcome";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          {/* Authentication Routes (no layout) */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />

          {/* Protected Dashboard Routes (with layout) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout title="Dashboard">
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/news"
            element={
              <ProtectedRoute>
                <Layout title="News">
                  <News />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/newsarticle"
            element={
              <ProtectedRoute>
                <Layout title="News">
                  <NewsArticle />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/forecast/dashboard"
            element={
              <ProtectedRoute>
                <Layout title="Forecast / Dashboard">
                  <ForecastDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/forecast/stocks"
            element={
              <ProtectedRoute>
                <Layout title="Forecast / Stocks">
                  <Stocks />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout title="Settings">
                  <Settings />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* Add a redirect for the base /forecast route */}
          <Route
            path="/forecast"
            element={<Navigate to="/forecast/dashboard" replace />}
          />
          {/* Redirect root to login for now */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
