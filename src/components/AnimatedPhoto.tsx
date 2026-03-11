import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedPhotoProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  variant?: 'hero' | 'about' | 'default';
}

const AnimatedPhoto = ({ src, alt, className = '', containerClassName = '', variant = 'default' }: AnimatedPhotoProps) => {
  if (variant === 'hero') {
    return (
      <motion.div
        className={`relative ${containerClassName}`}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Outer rotating golden ring */}
        <motion.div
          className="absolute inset-[-12px] rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, hsl(24 80% 50% / 0.4), hsl(350 80% 50% / 0.3), hsl(24 80% 50% / 0.1), hsl(350 80% 50% / 0.4), hsl(24 80% 50% / 0.4))',
            borderRadius: '50%',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        {/* Inner pulsing glow */}
        <motion.div
          className="absolute inset-[-6px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(350 80% 60% / 0.15), transparent 70%)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Sparkle dots */}
        {[0, 90, 180, 270].map((deg) => (
          <motion.div
            key={deg}
            className="absolute w-2 h-2 rounded-full bg-elegant-400"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: '0 0',
            }}
            animate={{
              x: [Math.cos((deg * Math.PI) / 180) * 78, Math.cos(((deg + 10) * Math.PI) / 180) * 82, Math.cos((deg * Math.PI) / 180) * 78],
              y: [Math.sin((deg * Math.PI) / 180) * 78, Math.sin(((deg + 10) * Math.PI) / 180) * 82, Math.sin((deg * Math.PI) / 180) * 78],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: deg / 360 }}
          />
        ))}
        {/* Photo with gentle breathing */}
        <motion.img
          src={src}
          alt={alt}
          className={`relative z-10 ${className}`}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.06, transition: { duration: 0.3 } }}
        />
      </motion.div>
    );
  }

  if (variant === 'about') {
    return (
      <motion.div
        className={`relative ${containerClassName}`}
        initial={{ x: 80, opacity: 0, rotateY: 15 }}
        whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Decorative frame lines */}
        <motion.div
          className="absolute -top-3 -left-3 w-20 h-20 border-t-3 border-l-3 border-elegant-400 rounded-tl-2xl"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.7, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ borderTopWidth: '3px', borderLeftWidth: '3px' }}
        />
        <motion.div
          className="absolute -bottom-3 -right-3 w-20 h-20 border-b-3 border-r-3 border-rose-400 rounded-br-2xl"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.7, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ borderBottomWidth: '3px', borderRightWidth: '3px' }}
        />
        {/* Photo with hover tilt */}
        <motion.img
          src={src}
          alt={alt}
          className={`relative z-10 ${className}`}
          whileHover={{
            scale: 1.04,
            rotateY: -5,
            rotateX: 3,
            transition: { duration: 0.4 },
          }}
        />
        {/* Subtle shadow blob */}
        <motion.div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full bg-elegant-800/10 blur-xl z-0"
          animate={{ scaleX: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    );
  }

  // default
  return (
    <motion.div
      className={`relative ${containerClassName}`}
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`relative z-10 ${className}`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export default AnimatedPhoto;
