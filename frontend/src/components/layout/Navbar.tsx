import { useEffect, useState } from 'react';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
import ShippingBanner from './ShippingBanner';

export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isHovered, setIsHovered] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('/auth/check-auth');
                setIsAuthenticated(response.data.isAuthenticated);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        checkAuthStatus();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('/auth/logout');
            setIsAuthenticated(false); 
            navigate('/login');
        } catch (error) {}
    };

    const handleRedirect = () => {
        navigate('/cart');
    };

    return (
        <div
            className="w-full items-center text-xs font-quicksand text-ivyPurple"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <ul className="flex justify-between items-center tracking-wide bg-emerald-50">
                <div className="flex gap-8">
                    <li className="font-poiret bg-ivyPurple text-white px-2 py-px tracking-wider">
                        <a href="/">Maverick of Atlas</a>
                    </li>
                    {/* <li className="py-px tracking-wide hover:text-ivyPurple/50 transition-all">
                        <a href="/about" className="bg-violet-200">About</a>
                    </li> */}
                </div>
                <div className="flex gap-8 items-center">
                    {isAuthenticated ? (
                        <>
                            <li className="hover:text-ivyPurple/80 hover:-translate-y-px transition-all cursor-pointer bg-orange-200 hover:shadow-xl shadow-white">
                                <a href="/account"> Account</a>
                            </li>
                            <div className="flex items-center">
                                <div className="bg-zinc-700 w-px h-3"></div>
                            </div>
                            <li className="hover:text-ivyPurple/80 transition-all mr-8 hover:-translate-y-px hover:shadow-xl shadow-white" onClick={handleLogout}>
                                <a href="/" className="bg-blue-200/80">Logout</a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="hover:text-ivyPurple/80 transition-all hover:-translate-y-p hover:shadow-xl shadow-white">
                                <a href="/register" className='bg-orange-200'>Register</a>
                            </li>
                            <div className="flex items-center">
                                <div className="bg-zinc-700 w-px h-3"></div>
                            </div>
                            <li className="hover:text-ivyPurple/80 transition-all mr-8 hover:-translate-y-px hover:shadow-xl shadow-white">
                                <a href="/login" className="bg-blue-200/80">Login</a>
                            </li>
                        </>
                    )}
                    <div className="flex gap-20">
                        <li
                            className="group flex hover:text-ivyPurple/80 transition-all gap-2 cursor-pointer bg-red-100 hover:-translate-y-px"
                            onClick={handleRedirect}
                        >
                            <span className="group-hover:text-ivyPurple/80 hover:-translate-y-px hover:shadow-xl shadow-white">Cart</span>
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
            <div className="fixed inset-x-0 top-6 pt-2 flex justify-center">
                <ShippingBanner isNavbarHovered={isHovered} />
            </div>
        </div>
    );
}