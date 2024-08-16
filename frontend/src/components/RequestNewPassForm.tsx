import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/reset-password', { email });
            if (response.data.success) {
                setMessage('If this email exists, you will receive a password reset link.');
            } else {
                setMessage('An error occurred. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="font-bold text-xl mb-4">Reset Password</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <label className="flex flex-col">
                    <span className="text-gray-700">Email</span>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="p-2 border border-gray-300 rounded"
                    />
                </label>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Submit
                </button>
            </form>
            {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
    );
};

export default ResetPasswordForm;
