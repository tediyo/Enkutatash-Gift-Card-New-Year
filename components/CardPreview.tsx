'use client'

import { motion } from 'framer-motion'
import { Heart, Star, Flower } from 'lucide-react'
import { GreetingCard, CardTemplate } from '@/app/page'

interface CardPreviewProps {
  card: GreetingCard
  template: CardTemplate
}

export default function CardPreview({ card, template }: CardPreviewProps) {
  const getPatternStyle = (pattern: string) => {
    switch (pattern) {
      case 'meskel':
        return {
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.3) 2px, transparent 2px),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.1) 3px, transparent 3px)
          `,
          backgroundSize: '30px 30px, 20px 20px, 40px 40px'
        }
      case 'cultural':
        return {
          backgroundImage: `
            linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.1) 25%),
            linear-gradient(-45deg, transparent 25%, rgba(255, 255, 255, 0.1) 25%),
            linear-gradient(45deg, rgba(255, 255, 255, 0.1) 75%, transparent 75%),
            linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 75%, transparent 75%)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }
      case 'sunrise':
        return {
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
            linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 30%, rgba(255, 255, 255, 0.1) 70%, transparent 70%)
          `,
          backgroundSize: '100% 100%, 15px 15px'
        }
      case 'flag':
        return {
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.1) 2px,
              rgba(255, 255, 255, 0.1) 4px
            )
          `
        }
      default:
        return {}
    }
  }

  return (
    <motion.div
      className="greeting-card w-80 h-96 relative overflow-hidden"
      style={{
        background: template.background,
        ...getPatternStyle(template.pattern)
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-4 right-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-6 h-6 text-white opacity-60" />
        </motion.div>
      </div>
      
      <div className="absolute top-4 left-4">
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Flower className="w-5 h-5 text-white opacity-70" />
        </motion.div>
      </div>

      <div className="absolute bottom-4 right-4">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Heart className="w-4 h-4 text-white opacity-50" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-8 h-full flex flex-col justify-center items-center text-center relative z-10">
        {/* Template Preview Icon */}
        <div className="text-4xl mb-4">
          {template.preview}
        </div>

        {/* Amharic Greeting */}
        {card.amharicMessage && (
          <motion.div
            className="text-white text-lg font-amharic mb-4 text-shadow"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {card.amharicMessage}
          </motion.div>
        )}

        {/* English Message */}
        <motion.div
          className="text-white text-xl font-bold mb-4 text-shadow"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {card.message || 'Happy Ethiopian New Year!'}
        </motion.div>

        {/* Name */}
        {card.name && (
          <motion.div
            className="text-white text-lg font-semibold text-shadow"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            - {card.name}
          </motion.div>
        )}

        {/* Year */}
        <motion.div
          className="absolute bottom-4 left-4 text-white text-sm opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.5 }}
        >
          2024
        </motion.div>
      </div>

      {/* Border Decoration */}
      <div className="absolute inset-2 border-2 border-white border-opacity-30 rounded-2xl"></div>
    </motion.div>
  )
}
