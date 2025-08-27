
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const checkAuth = () => {
    const storedAuth = localStorage.getItem('guardian_auth');
    if (!storedAuth) return false;

    try {
      const authData = JSON.parse(storedAuth);
      const isExpired = Date.now() - authData.timestamp > 7 * 24 * 60 * 60 * 1000; // 7 days
      return authData.authenticated && !isExpired;
    } catch (error) {
      return false;
    }
  };

  return checkAuth() ? <Outlet /> : <Navigate to="/authentication-authorization" replace />;
};

export default PrivateRoute;
