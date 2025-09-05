'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface FlowerDecorationProps {
  src: string
  alt: string
  className?: string
  animation?: 'float' | 'rotate' | 'scale' | 'pulse' | 'sway'
  size?: 'small' | 'medium' | 'large'
  opacity?: number
}

const sizeClasses = {
  small: 'w-8 h-8',
  medium: 'w-12 h-12', 
  large: 'w-16 h-16'
}

const animations = {
  float: {
    animate: { y: [-5, 5, -5] },
    transition: { duration: 2, repeat: Infinity }
  },
  rotate: {
    animate: { rotate: 360 },
    transition: { duration: 20, repeat: Infinity, ease: "linear" }
  },
  scale: {
    animate: { scale: [1, 1.2, 1] },
    transition: { duration: 3, repeat: Infinity }
  },
  pulse: {
    animate: { scale: [0.8, 1.1, 0.8] },
    transition: { duration: 2.5, repeat: Infinity }
  },
  sway: {
    animate: { rotate: [0, 10, -10, 0] },
    transition: { duration: 4, repeat: Infinity }
  }
}

export default function FlowerDecoration({ 
  src, 
  alt, 
  className = '', 
  animation = 'float',
  size = 'medium',
  opacity = 1
}: FlowerDecorationProps) {
  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      style={{ opacity }}
      {...animations[animation]}
    >
      <Image
        src={src}
        alt={alt}
        width={64}
        height={64}
        className="w-full h-full object-cover rounded-full"
        style={{ 
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
          borderRadius: '50%'
        }}
      />
    </motion.div>
  )
}
