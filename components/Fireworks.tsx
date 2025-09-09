'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FireworkProps {
  x: number
  y: number
  delay: number
  color: string
}

const Firework = ({ x, y, delay, color }: FireworkProps) => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    angle: (i * 30) * (Math.PI / 180),
    distance: 60 + Math.random() * 40
  }))

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 0] }}
      transition={{ 
        duration: 2,
        delay: delay,
        ease: "easeOut"
      }}
    >
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
            left: 0,
            top: 0
          }}
          initial={{ 
            x: 0, 
            y: 0,
            opacity: 1
          }}
          animate={{
            x: Math.cos(particle.angle) * particle.distance,
            y: Math.sin(particle.angle) * particle.distance,
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 1.5,
            delay: delay + 0.2,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Central burst */}
      <motion.div
        className="absolute w-4 h-4 rounded-full"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
          left: -8,
          top: -8
        }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 0] }}
        transition={{
          duration: 0.8,
          delay: delay,
          ease: "easeOut"
        }}
      />
    </motion.div>
  )
}

interface FireworksProps {
  isActive: boolean
}

export default function Fireworks({ isActive }: FireworksProps) {
  const [fireworks, setFireworks] = useState<Array<{
    id: number
    x: number
    y: number
    delay: number
    color: string
  }>>([])

  const colors = [
    '#FF6B35', // Ethiopian red
    '#FFD700', // Gold
    '#FF1493', // Deep pink
    '#00CED1', // Dark turquoise
    '#9370DB', // Medium purple
    '#FF69B4', // Hot pink
    '#32CD32', // Lime green
    '#FF8C00', // Dark orange
    '#FF6347', // Tomato
    '#20B2AA'  // Light sea green
  ]

  useEffect(() => {
    if (!isActive) {
      setFireworks([])
      return
    }

    const createFirework = () => {
      const newFirework = {
        id: Date.now() + Math.random(),
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
        y: Math.random() * 300 + 100, // Keep fireworks in upper area
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      }
      
      setFireworks(prev => [...prev, newFirework])
      
      // Remove firework after animation completes
      setTimeout(() => {
        setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id))
      }, 3000)
    }

    // Create initial fireworks
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createFirework(), i * 200)
    }

    // Continue creating fireworks
    const interval = setInterval(() => {
      createFirework()
    }, 800)

    return () => clearInterval(interval)
  }, [isActive])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {fireworks.map((firework) => (
        <Firework
          key={firework.id}
          x={firework.x}
          y={firework.y}
          delay={firework.delay}
          color={firework.color}
        />
      ))}
      
      {/* Celebration overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/10 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Floating emojis */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ 
            y: 0, 
            opacity: 0,
            scale: 0,
            rotate: 0
          }}
          animate={{ 
            y: -200,
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: 360
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 3
          }}
        >
          {['🎉', '🎊', '✨', '🌟', '💫', '🎆', '🎇', '🥳'][Math.floor(Math.random() * 8)]}
        </motion.div>
      ))}
    </div>
  )
}
