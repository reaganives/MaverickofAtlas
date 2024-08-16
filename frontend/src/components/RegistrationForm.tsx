import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from '../axiosConfig';
import PersonalInfo from './PersonalInfo';
import AccountInfo from './AccountInfo';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState({ month: '', day: '', year: '' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);  // Success message for verification
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);  // Clear success message on new submission
    setLoading(true);

    const { year, month, day } = dob;

    if (password !== verifyPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const dobFormatted = `${year}-${month}-${day}`;

      const response = await axios.post('/auth/register', {
        name,
        dob: dobFormatted,
        email,
        password
      });

      // Instead of logging the user in, show a success message
      setSuccessMessage('Registration successful! Please check your email to verify your account.');
      setErrorMessage(null);

      // Optionally, navigate to a verification confirmation page after a delay
      setTimeout(() => navigate('/verify-email'), 3000);

    } catch (error: any) {
      console.error('Error during registration:', error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: .75, ease: "easeInOut" }}
    >
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col justify-center p-8 items-center border border-ivyPurple border-dotted'>
          <div className="flex justify-center py-4 px-12 gap-40">
            {/* Personal Info */}
            <PersonalInfo
              name={name}
              setName={setName}
              dob={dob}
              setDob={setDob}
            />

            {/* Account Info */}
            <AccountInfo
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              verifyPassword={verifyPassword}
              setVerifyPassword={setVerifyPassword}
            />
          </div>
        </div>
        <div className='flex flex-col items-center gap-4 justify-center'>
          <button
            type="submit"
            className='btn py-0.5 px-4 tracking-widest text-xs text-white bg-ivyPurple w-1/7 mt-12'
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}  {/* Success message */}
        </div>
      </form>
    </motion.div>
  );
};

export default RegistrationForm;
