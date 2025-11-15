// import React, { useMemo } from 'react';
import '../styles/Login.css';
import Footer from '../components/Footer';
import ReportesPage from '../components/ReportesPage';
import '../styles/Dashboard.css';

function Dashboard() {
  return (
    <div className="app-container">
      <main className="app-main">
        <ReportesPage />
      </main>
    </div>
  )
}

export default Dashboard