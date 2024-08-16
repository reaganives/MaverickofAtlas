import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';  // Ensure axios is configured properly

const VerifyEmail = () => {
  const { token } = useParams();  // Extract the token from the URL
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await axios.get(`/auth/verify-email/${token}`);
        
        // Ensure both token and userId are stored in localStorage
        const { token: authToken, user } = response.data;
        
        if (authToken && user?._id) {
          // Store both token and userId in localStorage
          localStorage.setItem('token', authToken);
          localStorage.setItem('userId', user._id);

          // Set success message
          setSuccessMessage('Verification successful! You are now logged in.');
          
          // Redirect to home page after 2 seconds
          setTimeout(() => navigate('/'), 2000);
        } else {
          setErrorMessage('Verification failed. Invalid token or missing user data.');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setErrorMessage('Verification failed. Please try again.');
      }
    };

    verifyAccount();
  }, [token, navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {successMessage ? (
        <p className="text-green-500">{successMessage}</p>
      ) : (
        <p className="text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default VerifyEmail;



