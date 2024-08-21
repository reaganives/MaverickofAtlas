import React, { useState } from 'react';
import axios from '../../axiosConfig';  // Ensure the path to your axios config is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';  // For navigation

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setErrorMessage(null); 
        setLoading(true); 
    
        try {
            const response = await axios.post('/auth/login', { email, password });
            console.log('Login successful:', response.data);

            // The server will handle setting the access token and refresh token in HttpOnly cookies
            // You no longer need to store anything in localStorage

            // Redirect to the homepage or another protected route
            navigate('/');
        } catch (error: any) {
            console.error('Error during login:', error);
            if (error.response && error.response.data.error.includes('verify')) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('Invalid email or password. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="flex justify-center gap-24 border py-4 px-12 border-ivyPurple border-dotted w-full">
                <label className="input input-bordered flex items-center gap-2">
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
                        type="text" 
                        className="grow px-2 border border-ivyPurple/10" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input
                        type={passwordVisible ? "text" : "password"}
                        className="grow px-2 border border-ivyPurple/10"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FontAwesomeIcon
                        icon={passwordVisible ? faEye : faEyeSlash}
                        className="cursor-pointer opacity-70"
                        onClick={togglePasswordVisibility}
                    />
                </label>

                <button className='btn py-0.5 px-4 tracking-widest text-xs text-white bg-ivyPurple' type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <div className="flex justify-between px-32">
                <a href="/request-new-password" className="text-xs hover:underline font-noto text-ivyPurple p-2 mt-2">
                    Forgot your password?
                </a>
            </div>
            {errorMessage && <p className="text-red-500 font-quicksand text-sm text-center">{errorMessage}</p>}
        </div>
    );
};

export default LoginForm;



