'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Target date: September 18, 2025, 1:00 AM
    const targetDate = new Date('2025-09-18T01:00:00').getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ]

  const isNewYear = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 mb-8">
      <motion.h3 
        className="text-xl md:text-2xl text-white text-shadow mb-4 text-center"
        animate={isNewYear ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: isNewYear ? Infinity : 0 }}
      >
        {isNewYear ? '🎉 Happy Ethiopian New Year! 🎉' : 'Time until Enkutatash 2025'}
      </motion.h3>
      
      {!isNewYear && (
        <div className="text-center mb-4">
          <p className="text-white text-sm md:text-base opacity-90">
            September 18, 2025 at 1:00 AM
          </p>
        </div>
      )}
      
      <div className="flex justify-center gap-4 flex-wrap">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            className="text-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="countdown-number">
              {unit.value.toString().padStart(2, '0')}
            </div>
            <div className="text-white text-sm font-semibold mt-2">
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>
      
      {!isNewYear && (
        <div className="text-center mt-4">
          <p className="text-white text-xs md:text-sm opacity-75">
            እንኳን ለአዲሱ ዓመት በዓል አደረሰዎ!
          </p>
        </div>
      )}
    </div>
  )
}
