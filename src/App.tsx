// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import NewsArticle from './pages/NewsArticle';
import ForecastDashboard from "./pages/ForecastDashboard";
import Stocks from "./pages/Stocks";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";

const App: React.FC = () => {
  return (
    <BrowserRouter>
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
        
        {/* Add a redirect for the base /forecast route */}
        <Route 
          path="/forecast" 
          element={<Navigate to="/forecast/dashboard" replace />} 
        />
        {/* Redirect root to signup for now */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
