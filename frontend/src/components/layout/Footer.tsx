import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <motion.footer
            className="py-5 w-full flex px-4 pb-12 flex-col items-center justify-center bg-white text-black text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <div className="flex justify-between w-full text-xs mb-40">
                <div>
                    <ul className="list-none p-0 m-0 space-y-4 text-left text-ivyPurple">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">Terms of Service</a></li>
                        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="#" className="hover:underline">Member Rules</a></li>
                        <li><a href="#" className="hover:underline">FAQ</a></li>
                    </ul>
                </div>
                <div>
                    <ul className="list-none p-0 m-0 space-y-4 text-left text-ivyPurple">
                        <li><a href="#" className="hover:underline">Shopping Guide</a></li>
                        <li><a href="#" className="hover:underline">Shipping Information</a></li>
                        <li><a href="#" className="hover:underline">Delivery Schedule</a></li>
                        <li><a href="#" className="hover:underline">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <ul className="list-none p-0 m-0 space-y-4 text-left text-ivyPurple">
                        <li><a href="#" className="hover:underline">Instagram</a></li>
                        <li><a href="#" className="hover:underline">Facebook</a></li>
                        <li><a href="#" className="hover:underline">X / Twitter</a></li>
                        <li><a href="#" className="hover:underline">Maintenance Info</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-5 text-xs text-xs text-ivyPurple">
                <p>COPYRIGHT © MAVERICK OF ATLAS ALL RIGHTS RESERVED.</p>
            </div>
        </motion.footer>
    );
}




