import React from 'react';
import { Navigate } from 'react-router-dom';

interface UnprotectedRouteProps {
  children: JSX.Element;
}

const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  // If the token exists, redirect to a protected page (e.g., dashboard or home)
  if (token) {
    return <Navigate to="/" />;  // You can change the redirect route as needed
  }

  // If no token, render the children (e.g., login form)
  return children;
};

export default UnprotectedRoute;
