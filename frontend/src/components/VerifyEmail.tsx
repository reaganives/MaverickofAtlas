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
        
        // Set success message
        setSuccessMessage(response.data.message);

        // Store the JWT token in localStorage (or another storage mechanism)
        localStorage.setItem('token', response.data.token);

        // Automatically log the user in and redirect to the home page
        setTimeout(() => navigate('/'), 2000);  // Redirect to home page after 2 seconds
      } catch (error) {
        console.error('Verification error:', error);
        if (error.response && error.response.status === 400) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage('Verification failed. Please try again.');
        }
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

