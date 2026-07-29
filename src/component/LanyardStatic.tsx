    import { motion } from 'motion/react';

    interface LanyardStaticProps {
    image?: string;
    className?: string;
    /** Panjang tali dalam px. Default 64px (setara h-16). */
    strapHeight?: number;
    /** Lebar card foto dalam px. Default 160px (setara w-40). */
    cardWidth?: number;
    /** Tinggi card foto dalam px. Default 208px (setara h-52). */
    cardHeight?: number;
    }

    export default function LanyardStatic({
    image = '/assets/Profile-Lanyard.png',
    className = '',
    strapHeight = 64,
    cardWidth = 160,
    cardHeight = 208,
    }: LanyardStaticProps) {
    return (
        <div className={`relative flex flex-col items-center ${className}`}>
        <motion.div
            className="flex flex-col items-center"
            style={{ transformOrigin: 'top center' }}
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
            {/* Tali/strap — panjang diatur lewat prop strapHeight (px) */}
            <div className="w-2.5 bg-[#1c1c1c] rounded-full" style={{ height: strapHeight }} />

            {/* Clip penghubung */}
            <div className="w-5 h-5 rounded-full border-[3px] border-black bg-white -mt-1" />
            <div className="w-1.5 h-4 bg-[#1c1c1c] -mt-1" />

            {/* Card foto persegi — ukuran diatur lewat prop cardWidth/cardHeight (px) */}
            <div
            className="rounded-2xl border-[5px] border-[#d1d1d1] overflow-hidden bg-gray-200 shadow-xl mt-1"
            style={{ width: cardWidth, height: cardHeight }}
            >
            <img
                src={image}
                alt="Profile badge"
                className="w-full h-full object-cover"
                draggable={false}
            />
            </div>
        </motion.div>
        </div>
    );
    }