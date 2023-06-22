import React from 'react';
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AttendancesConsult from './AttendancesConsult';
import Dashboard from './Dashboard';
import FormAttendances from './FormScreen';
import Home from './Home';
import UsersScreen from './UsersScreen';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UsersScreen" element={<UsersScreen />} />
        <Route path="/FormAttendances" element={<FormAttendances />} />
        <Route path="/AttendancesReport" element={<AttendancesConsult />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        {/* Outras rotas */}
      </Routes>
    </Router>
  </React.StrictMode>
);
