import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ShippingBanner() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        isVisible && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 2, duration: 2 }}  // 3-second delay, 1-second fade-in duration
            >
                <p className="font-novo font-light tracking-widest text-ivyPurple text-xs transition-all duration-300 hover:opacity-0 cursor-default">
                    Free Shipping on all orders over $150
                </p>
            </motion.div>
        )
    );
}


