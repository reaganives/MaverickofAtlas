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
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setLoading(true);

        if (password !== verifyPassword) {
            setErrorMessage("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const dobString = `${dob.year}-${dob.month}-${dob.day}`; 
            const response = await axios.post('/auth/register', {
                name,
                dob: dobString,
                email,
                password
            });

            localStorage.setItem('token', response.data.token);

            navigate('/');
        } catch (error: any) {
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
                <button 
                    type="submit"
                    className='btn py-0.5 px-4 tracking-widest text-xs text-white bg-ivyPurple w-1/7 mt-12'
                    disabled={loading}
                >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </form>
        </motion.div>
    );
};

export default RegistrationForm;