import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
import { MenuIcon, XIcon } from '@heroicons/react/outline';  // Heroicons for modern icons

export default function MobileNavbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    <nav className="lg:hidden flex flex-row-reverse justify-between items-center bg-emerald-50 px-4 py-2 shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="font-poiret text-xl font-bold text-white bg-ivyPurple py-px px-2 tracking-wide">
        <a href="/">Maverick of Atlas</a>
      </div>

      {/* Hamburger Icon / Close Icon */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="text-ivyPurple focus:outline-none"
      >
        {isDropdownOpen ? (
          <XIcon className="h-6 w-6 text-ivyPurple" />
        ) : (
          <MenuIcon className="h-6 w-6 text-ivyPurple" />
        )}
      </button>

      {/* Dropdown Menu */}
      <div
        className={`${
          isDropdownOpen ? 'flex' : 'hidden'
        } absolute top-14 left-0 right-0 bg-white text-ivyPurple shadow-lg rounded-lg justify-end p-6 w-fit transition-transform transform ${
          isDropdownOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ease-in-out duration-300`}
      >
        <ul className="flex flex-col items-center space-y-4 w-fit font-quicksand">
          {isAuthenticated ? (
            <>
              <li className="w-full text-center hover:text-ivyPurple/50 transition-all">
                <a href="/account" className="w-full block py-2">Account</a>
              </li>
              <li
                onClick={handleLogout}
                className="w-full text-center hover:text-ivyPurple/50 transition-all cursor-pointer"
              >
                <a className="w-full block py-2">Logout</a>
              </li>
            </>
          ) : (
            <>
              <li className="w-full text-center hover:text-ivyPurple/50 transition-all">
                <a href="/register" className="w-full block py-2">Register</a>
              </li>
              <li className="w-full text-center hover:text-ivyPurple/50 transition-all">
                <a href="/login" className="w-full block py-2">Login</a>
              </li>
            </>
          )}
          <li
            onClick={handleRedirect}
            className="w-full text-center hover:text-ivyPurple/50 transition-all cursor-pointer"
          >
            <span className="w-full block py-2">Cart</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

