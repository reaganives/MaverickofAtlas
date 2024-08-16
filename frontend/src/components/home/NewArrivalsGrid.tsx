import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ViewAll from './ViewAll';

const items = [
    { name: 'Item 1', imageUrl: '/photos/newarrivals/Blue_OCBD.webp' },
    { name: 'Item 2', imageUrl: '/photos/newarrivals/Green_OCBD.webp' },
    { name: 'Item 3', imageUrl: '/photos/newarrivals/Chambray_OCBD.webp' },
    { name: 'Item 4', imageUrl: '/photos/newarrivals/LightBlue_OCBD.webp' },
    { name: 'Item 5', imageUrl: '/photos/newarrivals/Ecru_OCBD.webp' },
    { name: 'Item 6', imageUrl: '/photos/newarrivals/Blue_Stripe_OCBD.webp' },
    { name: 'Item 7', imageUrl: '/photos/newarrivals/Blue_OCBD.webp' },
    { name: 'Item 8', imageUrl: '/photos/newarrivals/Green_OCBD.webp' },
    { name: 'Item 9', imageUrl: '/photos/newarrivals/Chambray_OCBD.webp' },
    { name: 'Item 10', imageUrl: '/photos/newarrivals/LightBlue_OCBD.webp' },
    { name: 'Item 11', imageUrl: '/photos/newarrivals/Ecru_OCBD.webp' },
    { name: 'Item 12', imageUrl: '/photos/newarrivals/Blue_Stripe_OCBD.webp' },
];

export default function ItemGrid() {
    return (
        <motion.div
            className="w-full flex flex-col justify-center mb-20"
            initial={{ x: -175, opacity: 0 }}  // Slightly less negative value  // Start off-screen at the bottom
            animate={{ x: 0, opacity: 1 }}  // Animate to its normal position
            transition={{ type: 'spring', stiffness: 70 }}  // Smooth spring effect with a delay
        >
            <div className="text-xs font-semibold tracking-wide font-noto text-ivyPurple mb-4">
                NEW ARRIVALS
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <Link to="/productpage">
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className=" object-cover mb-2 hover:ring-4 ring-black cursor-pointer"
                            />
                        </Link>
                        {/* Optionally, you can add item names below the images */}
                        {/* <span className="text-xs text-gray-600">{item.name}</span> */}
                    </div>
                ))}
            </div>
            <div className='text-end mt-8'>
                <ViewAll />
            </div>
        </motion.div>
    );
}



