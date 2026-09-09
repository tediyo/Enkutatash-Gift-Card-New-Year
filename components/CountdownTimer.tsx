'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { PartyPopper } from 'lucide-react'
import Fireworks from './Fireworks'
import CelebrationEffects, { CelebrationEffectsHandle } from './CelebrationEffects'

interface CountdownTimerProps {
  onClose?: () => void
}

export default function CountdownTimer({ onClose }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isPast, setIsPast] = useState(false)
  const [isHolidayToday, setIsHolidayToday] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const celebrationRef = useRef<CelebrationEffectsHandle | null>(null)

  useEffect(() => {
    // Target date: September 11, 2026, 00:00:00 (12:00 AM Midnight - Ethiopian New Year 2019 E.C.)
    const targetDate = new Date('2026-09-11T00:00:00').getTime()
    const holidayEndDate = new Date('2026-09-12T00:00:00').getTime()

    const calculateTime = () => {
      const now = new Date().getTime()
      const difference = Math.abs(targetDate - now)
      const isPastDate = now > targetDate
      const isToday = now >= targetDate && now < holidayEndDate

      setIsPast(isPastDate)
      setIsHolidayToday(isToday)

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ]

  const isNewYear = !isPast && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0
  const isAlmostNewYear = !isPast && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes <= 5
  const isCelebrating = isHolidayToday || isNewYear

  // Trigger fireworks and celebration effects
  useEffect(() => {
    if (isCelebrating) {
      setShowFireworks(true)
    } else if (isAlmostNewYear) {
      setShowFireworks(true)
    } else {
      setShowFireworks(false)
    }
  }, [isCelebrating, isAlmostNewYear])

  const handleManualCelebration = () => {
    if (celebrationRef.current) {
      celebrationRef.current.launchCannons()
      celebrationRef.current.triggerBurst(undefined, undefined, 80)
    }
  }

  return (
    <>
      {/* High-Performance Adey Abeba Petals & Confetti Cannon Dispersion System */}
      <CelebrationEffects ref={celebrationRef} isActive={isCelebrating} intensity="high" />

      {/* Sparkle Fireworks */}
      <Fireworks isActive={showFireworks} />

      <motion.div 
        className="relative bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 sm:p-8 mb-8 border-4 border-yellow-500 shadow-lg shadow-yellow-500/25 max-w-2xl mx-auto"
        animate={isCelebrating ? {
          boxShadow: [
            '0 0 20px rgba(255, 215, 0, 0.35)',
            '0 0 45px rgba(255, 215, 0, 0.65)',
            '0 0 20px rgba(255, 215, 0, 0.35)'
          ]
        } : isAlmostNewYear ? {
          scale: [1, 1.02, 1],
          boxShadow: [
            '0 0 20px rgba(255, 215, 0, 0.25)',
            '0 0 40px rgba(255, 215, 0, 0.5)',
            '0 0 20px rgba(255, 215, 0, 0.25)'
          ]
        } : {}}
        transition={{ duration: 1.5, repeat: isCelebrating || isAlmostNewYear ? Infinity : 0 }}
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white text-xl p-1 rounded-full hover:bg-white/10 transition-colors"
            title="Close countdown"
            aria-label="Close countdown"
          >
            ✕
          </button>
        )}

        {/* Title */}
        <motion.h3 
          className="text-xl md:text-2xl text-green-400 text-shadow font-bold mb-2 text-center"
          animate={isNewYear || isCelebrating ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1.5, repeat: isCelebrating ? Infinity : 0 }}
        >
          {isCelebrating
            ? '🎉 Happy Ethiopian New Year 2019! 🎉'
            : isPast 
            ? 'Days since Enkutatash 2026' 
            : 'Time until Enkutatash 2026'}
        </motion.h3>
        
        {/* Date & Subtext Details */}
        <div className="text-center mb-4 space-y-0.5">
          <p className="text-green-400 text-shadow font-semibold text-sm md:text-base">
            September 11, 2026 at 12:00 AM | መስከረም 1፣ 2019 ዓ.ም.
          </p>
          <p className="text-green-400 text-shadow font-semibold text-sm md:text-base">
            Ethiopia New Year
          </p>
          {isPast && !isCelebrating && (
            <p className="text-green-400 text-shadow text-xs md:text-sm font-semibold mt-1">
              {timeLeft.days > 0 ? `${timeLeft.days} day${timeLeft.days === 1 ? '' : 's'} ago` : 'Today!'}
            </p>
          )}
          {isCelebrating && (
            <motion.p 
              className="text-yellow-200 text-sm md:text-base font-bold mt-1.5 drop-shadow font-amharic"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              እንኳን ለአዲሱ 2019 ዓ.ም. በዓል በሰላም አደረሳችሁ!
            </motion.p>
          )}
        </div>
        
        {/* White Digit Cards with Bold Red Numbers */}
        <div className="flex justify-center gap-3 sm:gap-4 flex-wrap my-4">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              className="text-center min-w-[70px] sm:min-w-[85px]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="countdown-number text-3xl sm:text-4xl md:text-5xl font-extrabold text-ethiopian-red bg-white rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-lg flex items-center justify-center">
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-green-400 text-shadow text-xs sm:text-sm font-bold mt-2">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom Amharic Blessing */}
        <div className="text-center mt-4">
          <p className="text-green-400 text-shadow text-xs md:text-sm font-semibold font-amharic">
            እንኳን ለአዲሱ ዓመት በዓል አደረሰዎ!
          </p>
        </div>

        {/* Action Button When Celebrating */}
        {isCelebrating && (
          <div className="mt-4 pt-2 text-center">
            <motion.button
              onClick={handleManualCelebration}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-300 hover:to-red-600 text-white font-extrabold text-sm sm:text-base py-2.5 px-6 rounded-full shadow-lg border-2 border-yellow-200 inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <PartyPopper className="w-5 h-5 text-yellow-200" />
              <span>✨ መልካም አዲስ ዓመት! / Happy New Year! 🌼</span>
            </motion.button>
          </div>
        )}
      </motion.div>
    </>
  )
}
