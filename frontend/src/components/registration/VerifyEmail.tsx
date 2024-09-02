import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';

const VerifyEmail = () => {
  const { token } = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await axios.get(`/auth/verify-email/${token}`);
        const { user } = response.data;

        if (user?._id) {
          setSuccessMessage('Verification successful! You are now logged in.');
          
          // Redirect to account page after 2 seconds
          setTimeout(() => navigate('/account'), 2000);
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





