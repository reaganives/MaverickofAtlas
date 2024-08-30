import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ShippingBannerProps {
    isNavbarHovered: boolean;
}

export default function ShippingBanner({ isNavbarHovered }: ShippingBannerProps) {
    const [isVisible, setIsVisible] = useState(false);  // Start as not visible

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY === 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);  // Make it visible after a 2-second delay
        }, 2000);

        return () => clearTimeout(timer);  // Clear timeout if the component is unmounted
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}  // Start with opacity 0
            animate={{ opacity: isNavbarHovered ? 0 : isVisible ? 1 : 0 }}  // Handle hover and visibility
            transition={{ duration: 0.5 }}  // Smooth transition for both fade-in and fade-out
            className="transition-opacity duration-500"
        >
            <p className="font-novo font-light tracking-wide text-ivyPurple text-xs transition-all duration-300 text-center">
                This is a demo site created by <span className='font-semibold italic'>Reagan Ives</span>. All products are for demonstration purposes only.
            </p>
        </motion.div>
    );
}






