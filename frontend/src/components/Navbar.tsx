import React, { useEffect, useState } from 'react';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import { useNavigate } from 'react-router-dom';
import ShippingBanner from './ShippingBanner';

export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);  // Track authentication state
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the token exists in localStorage to determine if the user is logged in
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);  // Set to true if token exists, false otherwise
    }, []);

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');
        setIsAuthenticated(false);  // Update authentication state
        navigate('/login');  // Redirect to login page
    };

    const handleRedirect = () => {
        navigate('/cart');
    };

    return (
        <div className="w-full items-center text-xs font-noto text-ivyPurple">
            <ul className="flex justify-between items-center tracking-wide bg-emerald-50">
                <div className="flex gap-8">
                    <li className="font-poiret bg-ivyPurple text-white px-2 py-px tracking-wider">
                        <a href="/">Maverick of Atlas</a>
                    </li>
                    <li className="py-px tracking-wide hover:text-ivyPurple/50 transition-all">
                        <a href="/about" className="bg-violet-200">About</a>
                    </li>
                </div>
                <div className="flex gap-8 items-center">
                    {/* Conditionally render Login/Logout based on authentication state */}
                    {isAuthenticated ? (
                        <>
                        <li className="hover:text-ivyPurple/50 transition-all cursor-pointer bg-orange-200">
                            <a href="/account"> Account</a>
                        </li>
                        <div className="flex items-center">
                                <div className="bg-zinc-700 w-px h-3"></div>
                        </div>
                        <li className="hover:text-ivyPurple/50 transition-all mr-8" onClick={handleLogout}>
                                <a href="/" className="bg-blue-200/80">Logout</a>
                        </li>
                        </>
                        
                    ) : (
                        <>
                            <li className="hover:text-ivyPurple/50 transition-all">
                                <a href="/register" className='bg-orange-200'>Register</a>
                            </li>
                            <div className="flex items-center">
                                <div className="bg-zinc-700 w-px h-3"></div>
                            </div>
                            <li className="hover:text-ivyPurple/50 transition-all mr-8">
                                <a href="/login" className="bg-blue-200/80">Login</a>
                            </li>
                        </>
                    )}

                    <div className="flex gap-20">
                        <li
                            className="group flex hover:text-ivyPurple/50 transition-all gap-2 cursor-pointer bg-red-100"
                            onClick={handleRedirect}
                        >
                            <span className="group-hover:text-ivyPurple/50">Cart</span>
                            <span
                                className="group-hover:cursor-pointer group-hover:text-ivyPurple/50 group-hover:rotate-[-12deg] group-hover:scale-105 group-hover:-translate-y-px transition-all"
                            >
                                <CheckroomIcon sx={{ fontSize: 15 }} />
                            </span>
                        </li>
                    </div>
                </div>
            </ul>

            {/* Centered and Fixed Shipping Banner */}
            <div className="fixed inset-x-0 top-8 flex justify-center">
                <ShippingBanner />
            </div>
        </div>
    );
}




