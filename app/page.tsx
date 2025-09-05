'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Flower, Heart, Star, Sparkles } from 'lucide-react'
import CardPreview from '@/components/CardPreview'
import TemplatePicker from '@/components/TemplatePicker'
import TextInput from '@/components/TextInput'
import CountdownTimer from '@/components/CountdownTimer'
import ShareOptions from '@/components/ShareOptions'
import ExportableCard from '@/components/ExportableCard'
import { exportCard, downloadCard, generateFilename } from '@/utils/exportCard'

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
    name: 'Meskel Flowers',
    preview: '🌺',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6B35 100%)',
    pattern: 'meskel'
  },
  {
    id: 'cultural-pattern',
    name: 'Cultural Pattern',
    preview: '🏛️',
    background: 'linear-gradient(135deg, #DA1212 0%, #FCDD09 50%, #078930 100%)',
    pattern: 'cultural'
  },
  {
    id: 'golden-sunrise',
    name: 'Golden Sunrise',
    preview: '☀️',
    background: 'linear-gradient(135deg, #FF6B35 0%, #FCDD09 100%)',
    pattern: 'sunrise'
  },
  {
    id: 'ethiopian-flag',
    name: 'Ethiopian Pride',
    preview: '🇪🇹',
    background: 'linear-gradient(135deg, #078930 0%, #FCDD09 25%, #DA1212 50%, #FCDD09 75%, #078930 100%)',
    pattern: 'flag'
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
  const [isGenerating, setIsGenerating] = useState(false)
  const [cardDataUrl, setCardDataUrl] = useState<string>('')
  const exportableCardRef = useRef<HTMLDivElement>(null)

  const handleTemplateChange = (templateId: string) => {
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

  const handleDownload = async () => {
    if (!exportableCardRef.current) return
    
    setIsGenerating(true)
    try {
      const dataUrl = await exportCard('exportable-card', {
        format: 'png',
        quality: 1
      })
      
      const filename = generateFilename(currentCard.name || 'enkutatash', 'png')
      downloadCard(dataUrl, filename)
      
      // Update card data URL for sharing
      setCardDataUrl(dataUrl)
    } catch (error) {
      console.error('Error downloading card:', error)
      alert('Failed to download card. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen cultural-pattern">
      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 text-6xl opacity-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            🌺
          </motion.div>
          <motion.div
            className="absolute top-20 right-20 text-4xl opacity-30"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ⭐
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-1/4 text-5xl opacity-25"
            animate={{ x: [-20, 20, -20] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🌸
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
                  onDownload={handleDownload}
                />
              </div>

              {/* Right Side - Preview */}
              <div className="flex flex-col items-center gap-6">
                <CardPreview
                  card={currentCard}
                  template={selectedTemplate}
                />
                
                {/* Hidden exportable card for download */}
                <div id="exportable-card" className="hidden">
                  <ExportableCard
                    ref={exportableCardRef}
                    card={currentCard}
                    template={selectedTemplate}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
