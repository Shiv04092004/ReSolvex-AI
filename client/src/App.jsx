import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SubmitComplaint from './pages/SubmitComplaint';
import MyComplaints from './pages/MyComplaints';
import ComplaintDetails from './pages/ComplaintDetails';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MeshBackground from './components/ParticleBackground';

import { useState } from 'react';

const ProtectedLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="main-content">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="page-container">
          {children}
        </div>
      </div>
    </>
  );
};

const AppRoutes = () => {
  const userInfo = localStorage.getItem('userInfo');

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
      <Route path="/submit" element={<ProtectedLayout><SubmitComplaint /></ProtectedLayout>} />
      <Route path="/my-complaints" element={<ProtectedLayout><MyComplaints /></ProtectedLayout>} />
      <Route path="/complaint/:id" element={<ProtectedLayout><ComplaintDetails /></ProtectedLayout>} />
      
      {/* Default Route */}
      <Route path="/" element={userInfo ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <MeshBackground />
        <div className="neural-pulse-overlay"></div>
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
