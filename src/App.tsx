// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
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
        {/* Redirect root to signup for now */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
