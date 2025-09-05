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
    const targetDate = new Date('2024-09-11T00:00:00').getTime()

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

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 mb-8">
      <h3 className="text-xl text-white text-shadow mb-4">Time until Enkutatash 2024</h3>
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
    </div>
  )
}
