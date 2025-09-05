'use client'

import { motion } from 'framer-motion'
import { Heart, Star, Flower } from 'lucide-react'
import { GreetingCard, CardTemplate } from '@/app/page'
import FlowerDecoration from './FlowerDecoration'

interface CardPreviewProps {
  card: GreetingCard
  template: CardTemplate
}

export default function CardPreview({ card, template }: CardPreviewProps) {
  // Debug logging
  console.log('CardPreview template:', template.id, template.background)
  console.log('CardPreview background URL:', `url(${template.background})`)
  const getPatternStyle = (pattern: string) => {
    switch (pattern) {
      case 'meskel':
        return {
          backgroundImage: `
            radial-gradient(circle at 15% 15%, rgba(255, 81, 7, 0.98) 8px, transparent 8px),
            radial-gradient(circle at 85% 25%, rgba(255, 215, 0, 0.6) 6px, transparent 6px),
            radial-gradient(circle at 25% 75%, rgba(255, 140, 0, 0.4) 10px, transparent 10px),
            radial-gradient(circle at 75% 85%, rgba(255, 165, 0, 0.5) 7px, transparent 7px),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 12px, transparent 12px)
          `,
          backgroundSize: '60px 60px, 45px 45px, 70px 70px, 50px 50px, 80px 80px',
          backgroundColor: '#000000'
        }
      case 'garden':
        return {
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.4) 5px, transparent 5px),
            radial-gradient(circle at 80% 30%, rgba(255, 140, 0, 0.3) 7px, transparent 7px),
            radial-gradient(circle at 30% 80%, rgba(255, 165, 0, 0.35) 6px, transparent 6px),
            radial-gradient(circle at 70% 70%, rgba(255, 255, 0, 0.25) 8px, transparent 8px),
            linear-gradient(45deg, transparent 40%, rgba(255, 215, 0, 0.2) 40%, rgba(255, 140, 0, 0.2) 60%, transparent 60%)
          `,
          backgroundSize: '40px 40px, 55px 55px, 45px 45px, 60px 60px, 25px 25px'
        }
      case 'sunrise':
        return {
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(255, 215, 0, 0.5) 0%, transparent 60%),
            radial-gradient(circle at 20% 40%, rgba(255, 140, 0, 0.3) 6px, transparent 6px),
            radial-gradient(circle at 80% 60%, rgba(255, 165, 0, 0.35) 8px, transparent 8px),
            linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.2) 30%, rgba(255, 140, 0, 0.2) 70%, transparent 70%)
          `,
          backgroundSize: '100% 100%, 50px 50px, 60px 60px, 20px 20px'
        }
      case 'spring':
        return {
          backgroundImage: `
            radial-gradient(circle at 10% 10%, rgba(255, 215, 0, 0.4) 6px, transparent 6px),
            radial-gradient(circle at 90% 20%, rgba(255, 140, 0, 0.3) 8px, transparent 8px),
            radial-gradient(circle at 20% 90%, rgba(255, 165, 0, 0.35) 7px, transparent 7px),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 0, 0.25) 9px, transparent 9px),
            radial-gradient(circle at 50% 30%, rgba(255, 215, 0, 0.2) 10px, transparent 10px),
            radial-gradient(circle at 30% 60%, rgba(255, 140, 0, 0.3) 5px, transparent 5px)
          `,
          backgroundSize: '45px 45px, 55px 55px, 50px 50px, 65px 65px, 70px 70px, 40px 40px'
        }
      default:
        return {}
    }
  }

  return (
    <motion.div
      className="greeting-card w-80 h-96 relative overflow-hidden"
      style={{
        backgroundImage: `url(${template.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f0f0f0', // Fallback background color
        ...getPatternStyle(template.pattern)
      }}
      data-template={template.id}
      data-background={template.background}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Decorative Elements - Template-based Flower Images + Emojis */}
      <div className="absolute top-4 right-4">
        <FlowerDecoration
          src={template.background}
          alt={`${template.name} Background`}
          animation="rotate"
          size="medium"
          opacity={0.8}
        />
      </div>
      
      <div className="absolute top-4 left-4">
        <FlowerDecoration
          src={template.background}
          alt={`${template.name} Background`}
          animation="float"
          size="medium"
          opacity={0.7}
        />
      </div>

      <div className="absolute bottom-4 right-4">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-lg"
        >
          🎊
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-4">
        <FlowerDecoration
          src={template.background}
          alt={`${template.name} Background`}
          animation="sway"
          size="medium"
          opacity={0.6}
        />
      </div>

      <div className="absolute top-1/2 left-4">
        <FlowerDecoration
          src={template.background}
          alt={`${template.name} Background`}
          animation="pulse"
          size="small"
          opacity={0.5}
        />
      </div>

      <div className="absolute top-1/2 right-4">
        <motion.div
          animate={{ scale: [1.1, 0.8, 1.1] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="text-lg opacity-50"
        >
          🍃
        </motion.div>
      </div>

      <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-lg opacity-70"
        >
          👑
        </motion.div>
      </div>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-sm opacity-60"
        >
          🥂
        </motion.div>
      </div>

      {/* Additional flower decorations - Template-based */}
      <div className="absolute top-1/3 right-1/4">
        <FlowerDecoration
          src={template.background}
          alt={`${template.name} Background`}
          animation="float"
          size="small"
          opacity={0.4}
        />
      </div>

      <div className="absolute bottom-1/3 left-1/3">
        <FlowerDecoration
          src={template.background}
          alt={`${template.name} Background`}
          animation="scale"
          size="small"
          opacity={0.3}
        />
      </div>

      {/* Semi-transparent overlay for text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-20 z-5"></div>

      {/* Content */}
      <div className="p-8 h-full flex flex-col justify-center items-center text-center relative z-10">
        {/* Template Preview Icon */}
        <div className="text-4xl mb-4">
          {template.preview}
        </div>

        {/* Debug Template Info */}
        <div className="text-xs text-white opacity-50 mb-2">
          Template: {template.id}
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
             {card.name}
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
