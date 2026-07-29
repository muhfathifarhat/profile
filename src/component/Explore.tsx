    import { motion } from 'framer-motion';

    export default function ExploreButton() {
    return (
        <div className="flex flex-col items-center pointer-events-none">
        <motion.p
            className="text-gray-400 text-[10px] tracking-widest uppercase font-mono font-thin"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
            SCROLL
        </motion.p>
        <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
            <motion.svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
            <path d="M12 5v14M5 12l7 7 7-7" />
            </motion.svg>
        </motion.div>
        </div>
    );
    }