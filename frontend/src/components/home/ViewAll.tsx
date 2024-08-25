import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function ViewAll() {
    return (
        <div className='flex justify-end'>
            <Link to="/new-arrivals"> {/* Add the Link component */}
                <button className="group font-noto font-light tracking-wider py-1 px-2 text-xs text-white bg-ivyPurple transition-all hover:bg-white hover:text-ivyPurple border border-ivyPurple flex items-center space-x-1">
                    <span>VIEW ALL</span>
                    <span className="flex items-center group-hover:translate-x-0.5 transition">
                        <ArrowRightIcon sx={{ fontSize: 16 }} />
                    </span>
                </button>
            </Link>
        </div>
    );
}


