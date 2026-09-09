'use client'

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

export interface CelebrationEffectsHandle {
  triggerBurst: (x?: number, y?: number, count?: number) => void
  launchCannons: () => void
}

interface CelebrationEffectsProps {
  isActive: boolean
  intensity?: 'low' | 'medium' | 'high'
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  type: 'petal' | 'confetti' | 'sparkle' | 'daisy'
  color: string
  size: number
  rotation: number
  rotationSpeed: number
  opacity: number
  fadeSpeed: number
  gravity: number
  drag: number
  wobble: number
  wobbleSpeed: number
}

const ETHIOPIAN_COLORS = [
  '#078930', // Ethiopian Green
  '#FCDD09', // Ethiopian Yellow
  '#DA1212', // Ethiopian Red
  '#FFD700', // Meskel Gold
  '#FFA500', // Warm Amber
  '#FF6B35', // Cultural Orange
  '#FFFFFF'  // White accent
]

const CelebrationEffects = forwardRef<CelebrationEffectsHandle, CelebrationEffectsProps>(
  ({ isActive, intensity = 'high' }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const particlesRef = useRef<Particle[]>([])
    const animationFrameRef = useRef<number | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Helper to spawn a flower petal (Adey Abeba petal)
    const createPetal = (x: number, y: number, vx?: number, vy?: number): Particle => {
      return {
        x,
        y,
        vx: vx !== undefined ? vx : (Math.random() - 0.5) * 4,
        vy: vy !== undefined ? vy : Math.random() * 2 + 1,
        type: 'petal',
        color: Math.random() > 0.3 ? '#FFD700' : '#FFA500',
        size: Math.random() * 8 + 6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
        opacity: Math.random() * 0.4 + 0.6,
        fadeSpeed: Math.random() * 0.003 + 0.001,
        gravity: 0.03,
        drag: 0.99,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.06 + 0.02
      }
    }

    // Helper to spawn a full miniature Adey Abeba (Meskel daisy)
    const createDaisy = (x: number, y: number, vx?: number, vy?: number): Particle => {
      return {
        x,
        y,
        vx: vx !== undefined ? vx : (Math.random() - 0.5) * 5,
        vy: vy !== undefined ? vy : Math.random() * 2 - 1,
        type: 'daisy',
        color: '#FFD700',
        size: Math.random() * 10 + 10,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 3,
        opacity: 0.9,
        fadeSpeed: Math.random() * 0.004 + 0.002,
        gravity: 0.04,
        drag: 0.985,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.05 + 0.02
      }
    }

    // Helper to spawn a confetti ribbon
    const createConfetti = (x: number, y: number, vx?: number, vy?: number): Particle => {
      return {
        x,
        y,
        vx: vx !== undefined ? vx : (Math.random() - 0.5) * 8,
        vy: vy !== undefined ? vy : (Math.random() - 0.5) * 8,
        type: 'confetti',
        color: ETHIOPIAN_COLORS[Math.floor(Math.random() * ETHIOPIAN_COLORS.length)],
        size: Math.random() * 8 + 5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        fadeSpeed: Math.random() * 0.006 + 0.003,
        gravity: 0.12,
        drag: 0.97,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.1 + 0.05
      }
    }

    // Helper to spawn sparkles
    const createSparkle = (x: number, y: number): Particle => {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 6 + 2
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        type: 'sparkle',
        color: ETHIOPIAN_COLORS[Math.floor(Math.random() * ETHIOPIAN_COLORS.length)],
        size: Math.random() * 3 + 2,
        rotation: 0,
        rotationSpeed: 0,
        opacity: 1,
        fadeSpeed: Math.random() * 0.02 + 0.015,
        gravity: 0.05,
        drag: 0.96,
        wobble: 0,
        wobbleSpeed: 0
      }
    }

    // Dispersed burst at coordinates
    const triggerBurst = (x?: number, y?: number, count = 70) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const originX = x ?? canvas.width / 2
      const originY = y ?? canvas.height / 3

      const newParticles: Particle[] = []

      // Add confetti explosion
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 12 + 3
        const vx = Math.cos(angle) * speed
        const vy = Math.sin(angle) * speed - 2 // upward bias
        newParticles.push(createConfetti(originX, originY, vx, vy))
      }

      // Add dispersing Adey Abeba petals and daisies
      for (let i = 0; i < Math.floor(count * 0.4); i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 7 + 2
        const vx = Math.cos(angle) * speed
        const vy = Math.sin(angle) * speed - 3
        newParticles.push(createPetal(originX, originY, vx, vy))
      }

      for (let i = 0; i < Math.floor(count * 0.15); i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 6 + 1
        const vx = Math.cos(angle) * speed
        const vy = Math.sin(angle) * speed - 2
        newParticles.push(createDaisy(originX, originY, vx, vy))
      }

      // Add sparkles
      for (let i = 0; i < Math.floor(count * 0.3); i++) {
        newParticles.push(createSparkle(originX, originY))
      }

      particlesRef.current.push(...newParticles)
    }

    // High-velocity confetti cannons from bottom-left & bottom-right
    const launchCannons = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const newParticles: Particle[] = []

      // Left Cannon (fires up and right toward center)
      for (let i = 0; i < 45; i++) {
        const angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.4
        const speed = Math.random() * 14 + 10
        const vx = Math.cos(angle) * speed
        const vy = Math.sin(angle) * speed
        newParticles.push(createConfetti(0, canvas.height * 0.85, vx, vy))
        if (i % 2 === 0) {
          newParticles.push(createPetal(0, canvas.height * 0.85, vx * 0.8, vy * 0.8))
        }
      }

      // Right Cannon (fires up and left toward center)
      for (let i = 0; i < 45; i++) {
        const angle = (-3 * Math.PI) / 4 + (Math.random() - 0.5) * 0.4
        const speed = Math.random() * 14 + 10
        const vx = Math.cos(angle) * speed
        const vy = Math.sin(angle) * speed
        newParticles.push(createConfetti(canvas.width, canvas.height * 0.85, vx, vy))
        if (i % 2 === 0) {
          newParticles.push(createPetal(canvas.width, canvas.height * 0.85, vx * 0.8, vy * 0.8))
        }
      }

      particlesRef.current.push(...newParticles)
    }

    useImperativeHandle(ref, () => ({
      triggerBurst,
      launchCannons
    }))

    // Setup Canvas and Animation loop
    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const updateDimensions = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      updateDimensions()
      window.addEventListener('resize', updateDimensions)

      // Continuous gentle petal/confetti rainfall if active
      if (isActive) {
        // Initial grand opening cannon launch
        launchCannons()
        triggerBurst(canvas.width * 0.5, canvas.height * 0.28, 80)

        const intervalDelay = intensity === 'high' ? 900 : intensity === 'medium' ? 1400 : 2200
        intervalRef.current = setInterval(() => {
          if (!canvas) return
          // Drop gentle Adey Abeba petals from top
          const dropCount = intensity === 'high' ? 4 : 2
          for (let i = 0; i < dropCount; i++) {
            particlesRef.current.push(createPetal(Math.random() * canvas.width, -10))
          }

          // Random intermittent cannon burst
          if (Math.random() > 0.45) {
            const randomX = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1
            const randomY = Math.random() * (canvas.height * 0.4) + canvas.height * 0.15
            triggerBurst(randomX, randomY, 40)
          } else if (Math.random() > 0.6) {
            launchCannons()
          }
        }, intervalDelay)
      }

      let lastTime = performance.now()

      const render = (time: number) => {
        const dt = Math.min((time - lastTime) / 16.66, 2)
        lastTime = time

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const activeParticles: Particle[] = []

        for (let i = 0; i < particlesRef.current.length; i++) {
          const p = particlesRef.current[i]

          // Physics update
          p.vx *= Math.pow(p.drag, dt)
          p.vy = (p.vy + p.gravity * dt) * Math.pow(p.drag, dt)
          p.wobble += p.wobbleSpeed * dt
          p.x += (p.vx + Math.sin(p.wobble) * 1.5) * dt
          p.y += p.vy * dt
          p.rotation += p.rotationSpeed * dt
          p.opacity -= p.fadeSpeed * dt

          if (p.opacity <= 0 || p.y > canvas.height + 50) {
            continue // drop dead particle
          }

          activeParticles.push(p)

          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate((p.rotation * Math.PI) / 180)
          ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity))

          if (p.type === 'confetti') {
            // Drawn as fluttering ribbon rectangle
            ctx.fillStyle = p.color
            const scaleY = Math.cos(p.wobble)
            ctx.fillRect(-p.size / 2, (-p.size * scaleY) / 2, p.size, p.size * scaleY * 1.6)
          } else if (p.type === 'petal') {
            // Drawn as Adey Abeba petal (elongated teardrop)
            ctx.fillStyle = p.color
            ctx.beginPath()
            ctx.moveTo(0, -p.size)
            ctx.quadraticCurveTo(p.size * 0.6, 0, 0, p.size)
            ctx.quadraticCurveTo(-p.size * 0.6, 0, 0, -p.size)
            ctx.fill()
          } else if (p.type === 'daisy') {
            // Drawn as mini Adey Abeba flower (6 petals + orange center)
            const petalCount = 8
            const petalLength = p.size * 0.6
            ctx.fillStyle = '#FFD700'
            for (let j = 0; j < petalCount; j++) {
              const angle = (j * 2 * Math.PI) / petalCount
              ctx.save()
              ctx.rotate(angle)
              ctx.beginPath()
              ctx.ellipse(0, -petalLength, p.size * 0.25, petalLength, 0, 0, Math.PI * 2)
              ctx.fill()
              ctx.restore()
            }
            // Center disk
            ctx.beginPath()
            ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2)
            ctx.fillStyle = '#FF6B35'
            ctx.fill()
          } else if (p.type === 'sparkle') {
            // Drawn as 4-point star sparkle
            ctx.fillStyle = p.color
            ctx.shadowBlur = 8
            ctx.shadowColor = p.color
            ctx.beginPath()
            for (let s = 0; s < 4; s++) {
              ctx.rotate(Math.PI / 2)
              ctx.lineTo(p.size * 2, 0)
              ctx.lineTo(p.size * 0.5, p.size * 0.5)
            }
            ctx.fill()
          }

          ctx.restore()
        }

        particlesRef.current = activeParticles
        animationFrameRef.current = requestAnimationFrame(render)
      }

      animationFrameRef.current = requestAnimationFrame(render)

      return () => {
        window.removeEventListener('resize', updateDimensions)
        if (intervalRef.current) clearInterval(intervalRef.current)
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        particlesRef.current = []
      }
    }, [isActive, intensity])

    if (!isActive) return null

    return (
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
        style={{ width: '100vw', height: '100vh' }}
        aria-hidden="true"
      />
    )
  }
)

CelebrationEffects.displayName = 'CelebrationEffects'

export default CelebrationEffects
