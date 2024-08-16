import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';

export default function NewsletterSignup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Set a timeout to display the component 4.2 seconds after page load
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 4200);

        // Cleanup the timer if the component unmounts
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <motion.div
            className="fixed bottom-12 right-12 bg-white/60 backdrop-blur-sm p-4 w-1/2 max-w-xs z-50 border-2 border-ivyPurple shadow-md"
            initial={{ y: 100, opacity: 0 }}  // Start off-screen
            animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}  // Slide up into position
            transition={{ type: 'spring', stiffness: 50 }}  // Adjust spring effect
            style={{ position: 'fixed', bottom: '3rem', right: '3rem' }}  // Ensure fixed positioning at bottom-right
        >
            {/* Close Button */}
            <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-ivyPurple/60 hover:text-ivyPurple transition-all"
            >
                <CloseIcon />
            </button>

            <h3 className="text-lg font-poiret tracking-widest mb-2 text-center text-ivyPurple pb-1">
                NEWSLETTER
            </h3>
            <form className="flex items-center justify-center overflow-hidden pb-1">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 px-4 bg-ivyPurple focus:outline-none text-white"
                />
                <button
                    type="submit"
                    className="bg-transparent px-4 text-ivyPurple hover:text-gray-700 flex items-center justify-center"
                >
                    <span className="text-2xl text-ivyPurple hover:text-ivyPurple/60 transition-all hover:translate-x-1 hover:scale-105">
                        <ChevronRightIcon sx={{ fontSize: 30 }} />
                    </span>
                </button>
            </form>
        </motion.div>
    );
}




