'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Fireworks from './Fireworks'

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isPast, setIsPast] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)

  useEffect(() => {
    // Target date: September 11, 2025, 1:00 AM
    const targetDate = new Date('2025-09-11T01:00:00').getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = Math.abs(targetDate - now)
      const isPastDate = now > targetDate

      setIsPast(isPastDate)

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

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

  // Check if we're in the special fireworks window (September 11, 2025, 1:00 AM to September 12, 2025, 1:00 AM)
  const isInFireworksWindow = () => {
    const now = new Date()
    const startDate = new Date('2025-09-11T01:00:00')
    const endDate = new Date('2025-09-12T01:00:00')
    
    return now >= startDate && now < endDate
  }

  // Trigger fireworks when it's the special day and time window
  useEffect(() => {
    if (isNewYear || isInFireworksWindow()) {
      setShowFireworks(true)
      // Stop fireworks after 30 seconds if it's the exact moment
      if (isNewYear) {
        const timer = setTimeout(() => {
          setShowFireworks(false)
        }, 30000)
        return () => clearTimeout(timer)
      }
    } else {
      setShowFireworks(false)
    }
  }, [isNewYear, timeLeft])

  // Show gentle fireworks when very close (within 5 minutes)
  useEffect(() => {
    if (isAlmostNewYear && !isNewYear) {
      setShowFireworks(true)
      // Stop gentle fireworks after 10 seconds
      const timer = setTimeout(() => {
        setShowFireworks(false)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [isAlmostNewYear, isNewYear])

  return (
    <>
      <Fireworks isActive={showFireworks} />
      <motion.div 
        className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 mb-8 border-4 border-yellow-500 shadow-lg shadow-yellow-500/25"
        animate={isAlmostNewYear ? {
          scale: [1, 1.02, 1],
          boxShadow: [
            '0 0 20px rgba(255, 215, 0, 0.25)',
            '0 0 40px rgba(255, 215, 0, 0.5)',
            '0 0 20px rgba(255, 215, 0, 0.25)'
          ]
        } : {}}
        transition={{ duration: 1, repeat: isAlmostNewYear ? Infinity : 0 }}
      >
      <motion.h3 
        className="text-xl md:text-2xl text-white text-shadow mb-4 text-center"
        animate={isNewYear ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: isNewYear ? Infinity : 0 }}
      >
        {isNewYear ? '🎉 Happy Ethiopian New Year! 🎉' : 
         isPast ? 'Days since Enkutatash 2025' : 'Time until Enkutatash 2025'}
      </motion.h3>
      
       <div className="text-center mb-4">
         <p className="text-white text-sm md:text-base opacity-90">
           September 11, 2025 at 1:00 AM | መስከረም 1፣ 2018 ዓ.ም.        </p>
           <p className="text-white text-sm md:text-base opacity-90">
           Ethiopia New Year        </p>
         {/* <p className="text-white text-xs md:text-sm opacity-75 mt-1">
           🎆 Fireworks: 1:00 AM - 12:00 PM        </p> */}
         {isPast && (
           <p className="text-white text-xs md:text-sm opacity-75 mt-1">
             {timeLeft.days > 0 ? `${timeLeft.days} day${timeLeft.days === 1 ? '' : 's'} ago` : 'Today!'}
           </p>
         )}
       </div>
      
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
      
      <div className="text-center mt-4">
        <p className="text-white text-xs md:text-sm opacity-75">
          {isPast ? 'እንኳን ለአዲሱ ዓመት በዓል አደረሰዎ!' : 'እንኳን ለአዲሱ ዓመት በዓል አደረሰዎ!'}
        </p>
      </div>
      </motion.div>
    </>
  )
}
