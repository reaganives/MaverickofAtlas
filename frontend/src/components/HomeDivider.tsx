import { motion } from 'framer-motion';

export default function Banner() {
    return (
        <motion.div
            className="w-full flex justify-center items-center h-20 bg-ivyPurple mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }} // This ensures the animation happens only the first time it enters the viewport
        >
            <div className="flex justify-between text-white text-md font-poiret tracking-widest gap-12">
                <span>MAVERICK OF ATLAS</span>
                <span>MAVERICK OF ATLAS</span>
                <span>MAVERICK OF ATLAS</span>
                <span>MAVERICK OF ATLAS</span>
                <span>MAVERICK OF ATLAS</span>
                <span>MAVERICK OF ATLAS</span>
                <span>MAVERICK OF ATLAS</span>
                <span>MAVERICK OF ATLAS</span>
                <span>MAVERICK OF ATLAS</span>
                <span>MAVERICK OF ATLAS</span>
                <span>MAVERICK OF ATLAS</span>
                <span>MAVERICK OF ATLAS</span>
                <span>MAVERICK OF ATLAS</span>
                <span>MAVERICK OF ATLAS</span>
                <span>MAVERICK OF ATLAS</span>
            </div>
        </motion.div>
    );
}


