import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordForm = () => {
  const { token } = useParams<{ token: string }>();  // Extract the token from the URL and type it
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check that password and confirm password match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      // Call the backend to reset the password, passing token in URL
      const response = await axios.patch(`http://localhost:4000/api/auth/reset-password/${token}`, {
        password,
        confirmPassword
      });

      if (response.data.success) {
        setSuccessMessage('Password reset successful. Redirecting...');
        // Redirect after a short delay
        setTimeout(() => navigate('/login'), 3000);  // Redirect to login page
      } else {
        setErrorMessage(response.data.message || 'Failed to reset password');
      }
    } catch (error: unknown) {
      // Handle server or network errors
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='flex flex-col gap-6 w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg'>
      <h2 className="text-2xl font-noto font-semibold tracking-wider text-ivyPurple border-b border-ivyPurple pb-2 mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-ivyPurple">New Password:</label>
          <input
            type="password"
            value={password}
            placeholder='Enter new password'
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-3 py-2 border border-ivyPurple/30 rounded-md focus:outline-none focus:border-ivyPurple focus:ring-1 focus:ring-ivyPurple"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-ivyPurple">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            placeholder='Confirm new password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="px-3 py-2 border border-ivyPurple/30 rounded-md focus:outline-none focus:border-ivyPurple focus:ring-1 focus:ring-ivyPurple"
          />
        </div>
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}
        <button type="submit" className='btn py-2 px-4 tracking-widest text-xs text-white bg-ivyPurple w-full rounded-md mt-4'>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;






