// src/App.tsx
import React from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
// When you're ready, you'll add 'react-router-dom' here
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    // For now, we'll just render the Dashboard
    <Layout>
      <Dashboard />
    </Layout>
    
    /* // When you add routing:
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/news" element={<div>News Page</div>} />
          <Route path="/forecast" element={<div>Forecast Page</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
    */
  );
};

export default App;