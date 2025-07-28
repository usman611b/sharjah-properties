// File: admin-panel/src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import PropertyList from './pages/PropertyList';
import AddProperty from './pages/AddProperty';
import EditProperty from './pages/EditProperty';
import Consultations from './pages/Consultations';

import Login from './pages/Login';
import Sidebar from './components/sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastProvider } from './context/ToastContext';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsAuthenticated(!!token && isLoggedIn);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <ToastProvider>
      <div className="flex">
        <Sidebar onLogout={handleLogout} />
        <div className="flex-1 lg:ml-64 p-4 lg:p-6 bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/properties" element={
              <ProtectedRoute>
                <PropertyList />
              </ProtectedRoute>
            } />
            <Route path="/properties/add" element={
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            } />
            <Route path="/properties/edit/:id" element={
              <ProtectedRoute>
                <EditProperty />
              </ProtectedRoute>
            } />
            <Route path="/consultations" element={
              <ProtectedRoute>
                <Consultations />
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </ToastProvider>
  );
};

export default App;
