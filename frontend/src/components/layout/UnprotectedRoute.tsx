import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../../axiosConfig';

interface UnprotectedRouteProps {
  children: JSX.Element;
}

const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Make a request to the backend to check if the user is authenticated
        const response = await axios.get('/auth/check-auth');
        setIsAuthenticated(response.data.isAuthenticated); // This assumes the backend responds with `{ isAuthenticated: true/false }`
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  // If still determining authentication status, show a loading message
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If authenticated, redirect to the protected page (e.g., home or dashboard)
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If not authenticated, render the children (e.g., login form)
  return children;
};

export default UnprotectedRoute;

