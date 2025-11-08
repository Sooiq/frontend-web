// src/App.tsx
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import ForecastDashboard from "./pages/ForecastDashboard";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Settings from "./pages/Settings";
import Stocks from "./pages/Stocks";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Welcome from "./pages/Welcome";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing user session (e.g., from localStorage)
    const storedUser = localStorage.getItem("user");
    if (!storedUser) navigate("/welcome");
  }, [navigate]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Authentication Routes (no layout) */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />

        {/* Dashboard Routes (with layout) */}
        <Route
          path="/dashboard"
          element={
            <Layout title="Dashboard">
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/news"
          element={
            <Layout title="News">
              <News />
            </Layout>
          }
        />
        <Route
          path="/newsarticle"
          element={
            <Layout title="News">
              <NewsArticle />
            </Layout>
          }
        />
        <Route
          path="/forecast/dashboard"
          element={
            <Layout title="Forecast / Dashboard">
              <ForecastDashboard />
            </Layout>
          }
        />
        <Route
          path="/forecast/stocks"
          element={
            <Layout title="Forecast / Stocks">
              <Stocks />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout title="Settings">
              <Settings />
            </Layout>
          }
        />
        {/* Add a redirect for the base /forecast route */}
        <Route
          path="/forecast"
          element={<Navigate to="/forecast/dashboard" replace />}
        />
        {/* Redirect root to signup for now */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
