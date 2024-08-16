import { motion } from 'framer-motion';
import LoginFormHelper from "./LoginFormHelper";
import LoginForm from "./LoginForm";

export default function LoginFull() {
    return (
        <motion.div
            className="w-full flex flex-col mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .75, ease: "easeInOut" }}
        >
            <LoginForm />
            <LoginFormHelper />
        </motion.div>
    );
}
