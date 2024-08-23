import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../../axiosConfig';  // Ensure axios is configured properly

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Attempt to refresh the token first
        await axios.post('/auth/refresh-token');
        console.log('Token refreshed successfully.');

        // After refreshing the token, check if the user is authenticated
        const response = await axios.get('/auth/check-auth');
        console.log('Auth Check Response:', response.data);
        setIsAuthenticated(response.data.isAuthenticated); // Backend should respond with `{ isAuthenticated: true/false }`
      } catch (error) {
        console.error('Error during auth check or token refresh:', error);

        // If token refresh fails or check-auth fails, set as unauthenticated
        setIsAuthenticated(false); // Assume unauthenticated if token refresh or auth check fails
      }
    };

    checkAuthStatus();
  }, []);

  // Add log to see the state of isAuthenticated
  console.log('isAuthenticated State:', isAuthenticated);

  // If authentication status is still being determined, show a loading message
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    console.log('Redirecting to login');
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children components (protected content)
  return <>{children}</>;
};

export default ProtectedRoute;



