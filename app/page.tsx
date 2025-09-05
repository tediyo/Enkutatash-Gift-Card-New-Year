'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Flower, Heart, Star, Sparkles } from 'lucide-react'
import CardPreview from '@/components/CardPreview'
import TemplatePicker from '@/components/TemplatePicker'
import TextInput from '@/components/TextInput'
import CountdownTimer from '@/components/CountdownTimer'
import ShareOptions from '@/components/ShareOptions'

export interface GreetingCard {
  id: string
  template: string
  name: string
  message: string
  amharicMessage?: string
}

export interface CardTemplate {
  id: string
  name: string
  preview: string
  background: string
  pattern: string
}

const templates: CardTemplate[] = [
  {
    id: 'meskel-flowers',
    name: 'Meskel Daisies',
    preview: '🌼',
    background: '/images/flowers/backgrounds/EF.jpg',
    pattern: 'meskel'
  },
  {
    id: 'yellow-garden',
    name: 'Yellow Garden',
    preview: '🌻',
    background: '/images/flowers/backgrounds/EF5.jpg',
    pattern: 'garden'
  },
  {
    id: 'golden-sunrise',
    name: 'Golden Sunrise',
    preview: '🌅',
    background: '/images/flowers/backgrounds/FR3.jpg',
    pattern: 'sunrise'
  },
  {
    id: 'ethiopian-spring',
    name: 'Ethiopian Spring',
    preview: '🌸',
    background: '/images/flowers/backgrounds/FW2.webp',
    pattern: 'spring'
  },
  {
    id: 'classic-meskel',
    name: 'Classic Meskel',
    preview: '🌺',
    background: '/images/flowers/backgrounds/F4.jpg',
    pattern: 'classic'
  },
  {
    id: 'vibrant-garden',
    name: 'Vibrant Garden',
    preview: '🌻',
    background: '/images/flowers/backgrounds/f5.jpg',
    pattern: 'vibrant'
  },
  {
    id: 'sunset-bloom',
    name: 'Sunset Bloom',
    preview: '🌅',
    background: '/images/flowers/backgrounds/f6.jpg',
    pattern: 'sunset'
  },
  {
    id: 'spring-celebration',
    name: 'Spring Celebration',
    preview: '🌸',
    background: '/images/flowers/backgrounds/f7.jpg',
    pattern: 'celebration'
  },
  {
    id: 'floral-elegance',
    name: 'Floral Elegance',
    preview: '🌹',
    background: '/images/flowers/backgrounds/f8.jpg',
    pattern: 'elegance'
  },
  {
    id: 'blooming-garden',
    name: 'Blooming Garden',
    preview: '🌺',
    background: '/images/flowers/backgrounds/f9.jpg',
    pattern: 'blooming'
  }
]

const amharicGreetings = [
  'እንኳን ለአዲሱ ዓመት በዓል አደረሰዎ!',
  'ለአዲሱ ዓመት በዓል አደረሰዎ!',
  'እንኳን ለአዲሱ ዓመት!',
  'ለአዲሱ ዓመት በዓል!'
]

export default function Home() {
  const [currentCard, setCurrentCard] = useState<GreetingCard>({
    id: '1',
    template: 'meskel-flowers',
    name: '',
    message: 'Happy Ethiopian New Year!',
    amharicMessage: amharicGreetings[0]
  })
  const [showCardCreator, setShowCardCreator] = useState(false)
  const [cardDataUrl, setCardDataUrl] = useState<string>('')

  const handleTemplateChange = (templateId: string) => {
    console.log('Template changing to:', templateId)
    const newTemplate = templates.find(t => t.id === templateId)
    console.log('New template data:', newTemplate)
    setCurrentCard(prev => ({
      ...prev,
      template: templateId
    }))
  }

  const handleNameChange = (name: string) => {
    setCurrentCard(prev => ({
      ...prev,
      name
    }))
  }

  const handleMessageChange = (message: string) => {
    setCurrentCard(prev => ({
      ...prev,
      message
    }))
  }

  const handleAmharicMessageChange = (amharicMessage: string) => {
    setCurrentCard(prev => ({
      ...prev,
      amharicMessage
    }))
  }

  const selectedTemplate = templates.find(t => t.id === currentCard.template) || templates[0]


  return (
    <div className="min-h-screen cultural-pattern">
      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Elements - Ethiopian New Year Emojis */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 text-6xl opacity-30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            🎉
          </motion.div>
          <motion.div
            className="absolute top-20 right-20 text-5xl opacity-40"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌺
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-1/4 text-6xl opacity-35"
            animate={{ x: [-20, 20, -20] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🎊
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-1/4 text-4xl opacity-25"
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            🌸
          </motion.div>
          <motion.div
            className="absolute bottom-1/3 right-10 text-3xl opacity-30"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            🌻
          </motion.div>
          <motion.div
            className="absolute top-1/3 left-1/3 text-4xl opacity-20"
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 4.5, repeat: Infinity }}
          >
            🍃
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-1/2 text-3xl opacity-25"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            👑
          </motion.div>
          <motion.div
            className="absolute bottom-1/2 right-1/3 text-2xl opacity-30"
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🥂
          </motion.div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-white text-shadow-lg mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Enkutatash
          </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-3xl text-white text-shadow mb-4 font-amharic"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            እንኳን ለአዲሱ ዓመት በዓል አደረሰዎ!
          </motion.p>
          
          <motion.p 
            className="text-xl text-white text-shadow mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Create beautiful Ethiopian New Year greeting cards
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <CountdownTimer />
          </motion.div>

          {/* CTA Button */}
          <motion.button
            className="btn-primary text-xl px-8 py-4 mt-8 flex items-center gap-3 mx-auto"
            onClick={() => setShowCardCreator(true)}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-6 h-6" />
            Create Your Greeting Card
          </motion.button>
        </div>
      </motion.div>

      {/* Card Creator Modal */}
      {showCardCreator && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-ethiopian-red">Create Your Greeting Card</h2>
              <button
                onClick={() => setShowCardCreator(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Side - Controls */}
              <div className="space-y-6">
                <TemplatePicker
                  templates={templates}
                  selectedTemplate={currentCard.template}
                  onTemplateChange={handleTemplateChange}
                />

                <TextInput
                  label="Your Name"
                  value={currentCard.name}
                  onChange={handleNameChange}
                  placeholder="Enter your name"
                />

                <TextInput
                  label="English Message"
                  value={currentCard.message}
                  onChange={handleMessageChange}
                  placeholder="Enter your greeting message"
                  multiline
                />

                <TextInput
                  label="Amharic Message"
                  value={currentCard.amharicMessage || ''}
                  onChange={handleAmharicMessageChange}
                  placeholder="Enter Amharic greeting"
                  multiline
                  fontFamily="amharic"
                />

                <ShareOptions
                  cardDataUrl={cardDataUrl}
                  cardName={currentCard.name || 'Enkutatash Greeting Card'}
                />
              </div>

              {/* Right Side - Preview */}
              <div className="flex flex-col items-center gap-6">
                <CardPreview
                  key={`preview-${currentCard.template}`}
                  card={currentCard}
                  template={selectedTemplate}
                />
                
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
