import { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link } from 'react-router-dom'; // Import Link for dynamic routing

export default function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);  // Explicitly type hoveredItem

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
        setHoveredItem(null);
    };

    const handleItemMouseEnter = (item: string) => {  // Explicitly type the item as a string
        setHoveredItem(item); // Set the hovered item to trigger the second dropdown
    };

    return (
        <div
            className="relative w-fit"
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
                    <ul className="flex pt-4 flex-col text-black gap-2 text-xs font-noto text-ivyPurple tracking-widest transition-all shadow-lg">
                        {/* Shirts Category */}
                        <li
                            className="py-2 hover:bg-orange-200 cursor-pointer relative flex items-center"
                            onMouseEnter={() => handleItemMouseEnter('Shirts')}
                        >
                            <span className="flex items-center w-full">
                                <ArrowRightIcon sx={{ fontSize: 16 }} />
                                <span className="ml-1">Shirts</span>
                            </span>
                            {hoveredItem === 'Shirts' && (
                            <div className="absolute top-0 left-full w-full h-full bg-white z-20 shadow-lg">
                                <div className='bg-white'>
                                    <ul className="flex flex-col w-full h-full gap-2 bg-white">
                                        <li className="py-2 bg-white hover:bg-orange-200 flex items-center">
                                            <Link to="/oxford-cotton-button-downs" className="flex items-center w-full">
                                            <ArrowRightIcon sx={{ fontSize: 16 }} />
                                            <span className="ml-1 text-xs">Oxfords</span>
                                            </Link>
                                        </li>
                                        <li className="py-2 bg-white hover:bg-orange-200 flex items-center">
                                            <Link to="/short-sleeve-button-downs" className="flex items-center w-full">
                                            <ArrowRightIcon sx={{ fontSize: 16 }} />
                                            <span className="ml-1">Short Sleeve</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            )}
                        </li>
                        
                        {/* Jackets & Outerwear Category */}
                        <li
                            className="py-2 hover:bg-orange-200 cursor-pointer relative flex items-center"
                            onMouseEnter={() => handleItemMouseEnter('Jackets & Outerwear')}
                        >
                            <span className="flex items-center w-full">
                                <ArrowRightIcon sx={{ fontSize: 16 }} />
                                <span className="ml-1">Jackets & Outerwear</span>
                            </span>
                            {hoveredItem === 'Jackets & Outerwear' && (
                                <div className="absolute top-0 left-full w-full h-full bg-white z-20 shadow-lg">
                                    <div className='bg-white'>
                                        <ul className="flex flex-col w-full h-full gap-2 bg-white">
                                            <li className="py-2 bg-white hover:bg-orange-200 cursor-pointer flex items-center">
                                                <Link to="/anoraks" className="flex items-center w-full">
                                                <ArrowRightIcon sx={{ fontSize: 16 }} />
                                                <span className="ml-1">Anoraks</span>
                                                </Link>
                                            </li>
                                            <li className="py-2 bg-white hover:bg-orange-200 cursor-pointer flex items-center">
                                                <Link to="/S-22-jackets" className="flex items-center w-full">
                                                <ArrowRightIcon sx={{ fontSize: 16 }} />
                                                <span className="ml-1">Vintage S-22</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* Accessories Category */}
                        <li
                            className="py-2 hover:bg-orange-200 cursor-pointer relative flex items-center"
                            onMouseEnter={() => handleItemMouseEnter('Accessories')}
                        >
                            <span className="flex items-center w-full">
                                <ArrowRightIcon sx={{ fontSize: 16 }} />
                                <span className="ml-1">Accessories</span>
                            </span>
                            {hoveredItem === 'Accessories' && (
                                <div className="absolute top-0 left-full w-full h-full bg-white z-20 shadow-lg">
                                <div className='bg-white'>
                                    <ul className="flex flex-col w-full h-full gap-2 bg-white">
                                        <li className="py-2 bg-white hover:bg-orange-200 flex items-center">
                                            <Link to="/belts" className="flex items-center w-full">
                                            <ArrowRightIcon sx={{ fontSize: 16 }} />
                                            <span className="ml-1 text-xs">Belts</span>
                                            </Link>
                                        </li>
                                        <li className="py-2 bg-white hover:bg-orange-200 flex items-center">
                                            <Link to="/socks" className="flex items-center w-full">
                                            <ArrowRightIcon sx={{ fontSize: 16 }} />
                                            <span className="ml-1">Socks</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            )}
                        </li>

                        {/* New Arrivals */}
                        <li
                            className="py-2 hover:bg-orange-200 cursor-pointer relative flex items-center"
                            onMouseEnter={() => handleItemMouseEnter('New Arrivals')}
                        >
                            <Link to="/new-arrivals" className="flex items-center w-full">
                                <ArrowRightIcon sx={{ fontSize: 16 }} />
                                <span className="ml-1">New Arrivals</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}


