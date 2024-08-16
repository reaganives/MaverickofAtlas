import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');  // Get the token from localStorage

  if (!token) {
    // If no token, redirect to the login page
    return <Navigate to="/" />;
  }

  // If the token exists, render the children components (the protected content)
  return <>{children}</>;
};

export default ProtectedRoute;
