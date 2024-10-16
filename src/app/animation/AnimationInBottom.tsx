// AnimationInBottom.tsx
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimationInBottomProps {
    delay?: number;
    duration?: number;
    children: ReactNode;
    once?: boolean; // Menambahkan properti once
}

const AnimationInBottom: React.FC<AnimationInBottomProps> = ({ children, delay = 0, duration = 0.5, once = false }) => {
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration, delay }}
            variants={variants}
            // Menggunakan onAnimationComplete untuk mereset animasi jika sekali
            onAnimationComplete={() => {
                if (once) {
                    // Menyembunyikan elemen jika once=true
                    // Anda bisa menggunakan state jika perlu
                }
            }}
        >
            {children}
        </motion.div>
    );
};

export default AnimationInBottom;
