import { useState, useEffect } from 'react';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);
    let timeoutId;

    const handleMouseEnter = () => {
        clearTimeout(timeoutId); // Clear the timeout to prevent the dropdown from closing
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setIsOpen(false);
        }, 150); // Delay the closing by 150ms
    };

    useEffect(() => {
        return () => {
            clearTimeout(timeoutId); // Clean up the timeout if the component unmounts
        };
    }, []);

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex items-center w-fit text-xs font-semibold tracking-widest cursor-pointer font-quicksand text-ivyPurple mb-4">
                <button className="mr-2">
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
                <span className="cursor-pointer">SHOP CATEGORIES</span>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 w-48 bg-white shadow-lg z-10">
                    <ul className="flex pt-4 flex-col text-black gap-2 text-xs font-noto text-ivyPurple tracking-widest transition-all">
                        <li className="py-2 hover:bg-orange-200 cursor-pointer"><a href=""><ArrowRightIcon sx={{ fontSize: 16 }} /><span className="ml-1">Shirts</span></a></li>
                        <li className="py-2 hover:bg-orange-200 cursor-pointer"><a href=""><ArrowRightIcon sx={{ fontSize: 16 }} /><span className="ml-1">Jackets & Outerwear</span></a></li>
                        <li className="py-2 hover:bg-orange-200 cursor-pointer"><a href=""><ArrowRightIcon sx={{ fontSize: 16 }} /><span className="ml-1">Accesories</span></a></li>
                        <li className="py-2 hover:bg-orange-200 cursor-pointer"><a href=""><ArrowRightIcon sx={{ fontSize: 16 }} /><span className="ml-1">New Arrivals</span></a></li>
                    </ul>
                </div>
            )}
        </div>
    );
}








