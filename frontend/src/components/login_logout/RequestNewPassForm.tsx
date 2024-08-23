import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RequestNewPassForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/reset-password', { email });
            if (response.data.success) {
                setMessage('If this email exists, you will receive a password reset link.');
            } else {
                setMessage('Unknown email. Please register an account.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className='w-full mb-40'>
        
        <div className="flex gap-12 items-center gap-28 w-full border border-dotted border-ivyPurple py-4 px-32">
        <h1 className="text-sm font-quicksand tracking-wider text-ivyPurple">Request Password Reset Link:</h1>
        <div className="flex">
            <form className="flex items-center gap-28" onSubmit={handleSubmit}>
                <label className="flex items-center gap-4 input input-bordered">
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input 
                        type="email" 
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="grow px-2 border border-ivyPurple/10"
                    />
                </label>
                <button type="submit" className='btn px-4 tracking-widest text-xs text-white bg-ivyPurple h-min py-1'>
                    Submit
                </button>
            </form>
        </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
        <p className='text-center text-xs  mt-4 font-quicksand tracking-wider text-ivyPurple'>Please enter the email address associated with your account.</p>
        {message && <p className="mt-4 text-green-500 text-center font-roboto ">{message}</p>}
        </div>
            <div className="mt-12 flex justify-center">
                <Link to="/register">
                    <button className='btn py-0.5 px-4 tracking-widest text-xs text-white font-quicksand bg-ivyPurple'>
                        Register for an account
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default RequestNewPassForm;
