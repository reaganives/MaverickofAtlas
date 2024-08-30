import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import Logo from './Logo';

export default function LogoHome() {
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        // Check if the cookie exists
        const animationPlayed = Cookies.get('animationPlayed');

        if (!animationPlayed) {
            // If the cookie doesn't exist, show the animation and set the cookie
            setShowAnimation(true);
            Cookies.set('animationPlayed', 'true', { expires: 1 }); // Cookie expires in 1 day
        }
    }, []);

    return (
        <motion.div
            className="flex w-1/3 items-end justify-center gap-4"
            initial={{ opacity: showAnimation ? 0 : 1, scale: 1 }}  // Start with reduced opacity and scale if animation is to be shown
            animate={{ opacity: 1, scale: 1 }}  // Animate to full opacity and normal scale
            transition={{ duration: 1.75, delay: showAnimation ? 1.75 : 0 }}  // 1.75 seconds duration, with a delay if showing animation
        >
            <div>
                <Logo />
            </div>
            <div className='text-end'>
                <h1 className="text-2xl font-poiret tracking-wider text-ivyPurple">
                    MAVERICK OF ATLAS
                </h1>
            </div>
        </motion.div>
    );
}



