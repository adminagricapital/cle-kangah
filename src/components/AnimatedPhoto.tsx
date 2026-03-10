import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedPhotoProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  variant?: 'hero' | 'about' | 'default';
}

const heroContainerProps = {
  initial: { scale: 0.8, opacity: 0, rotate: -5 },
  animate: { scale: 1, opacity: 1, rotate: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

const aboutContainerProps = {
  initial: { x: 60, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 0.7, ease: 'easeOut' as const },
};

const defaultContainerProps = {
  initial: { y: 20, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const AnimatedPhoto = ({ src, alt, className = '', containerClassName = '', variant = 'default' }: AnimatedPhotoProps) => {
  const isHero = variant === 'hero';
  const containerProps = variant === 'hero' ? heroContainerProps : variant === 'about' ? aboutContainerProps : defaultContainerProps;

  return (
    <motion.div className={`relative ${containerClassName}`} {...containerProps}>
      {isHero && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent, hsl(24 9.8% 10% / 0.3), transparent, hsl(350 80% 50% / 0.3), transparent)',
              padding: '4px',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-[-8px] rounded-full border-2 border-elegant-400/30"
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}
      <motion.img
        src={src}
        alt={alt}
        className={`relative z-10 ${className}`}
        whileHover={{ scale: variant === 'hero' ? 1.03 : 1.05 }}
        transition={{ duration: 0.4 }}
        {...(isHero ? { animate: { scale: [1, 1.03, 1] }, transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const } } : {})}
      />
    </motion.div>
  );
};

export default AnimatedPhoto;
