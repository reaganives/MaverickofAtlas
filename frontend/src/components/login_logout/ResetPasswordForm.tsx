import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordForm = () => {
  const { token } = useParams();  // Extract the token from the URL
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
    } catch (error) {
      // Handle server or network errors
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;




