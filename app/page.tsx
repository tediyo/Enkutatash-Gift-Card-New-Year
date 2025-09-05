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
import { simpleExportCard, canvasExportCard } from '@/utils/simpleExport'

export interface GreetingCard {
  id: string
  template: string
  name: string
  message: string
  amharicMessage?: string
  textColor?: string
  amharicTextColor?: string
  nameTextColor?: string
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
    amharicMessage: amharicGreetings[0],
    textColor: '#2C1810',
    amharicTextColor: '#2C1810',
    nameTextColor: '#2C1810'
  })
  const [showCardCreator, setShowCardCreator] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [cardDataUrl, setCardDataUrl] = useState<string>('')
  const exportableCardRef = useRef<HTMLDivElement>(null)

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

  const handleTextColorChange = (textColor: string) => {
    setCurrentCard(prev => ({
      ...prev,
      textColor
    }))
  }

  const handleAmharicTextColorChange = (amharicTextColor: string) => {
    setCurrentCard(prev => ({
      ...prev,
      amharicTextColor
    }))
  }

  const handleNameTextColorChange = (nameTextColor: string) => {
    setCurrentCard(prev => ({
      ...prev,
      nameTextColor
    }))
  }

  const selectedTemplate = templates.find(t => t.id === currentCard.template) || templates[0]

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
      img.src = src
    })
  }

  const handleDownload = async () => {
    if (!exportableCardRef.current) {
      console.warn('Card preview not ready. Please wait a moment and try again.')
      return
    }
    
    setIsGenerating(true)
    try {
      console.log('Starting card export...')
      
      // Preload the background image to ensure it's available
      const selectedTemplate = templates.find(t => t.id === currentCard.template) || templates[0]
      if (selectedTemplate.background) {
        try {
          await preloadImage(selectedTemplate.background)
          console.log('Background image preloaded successfully')
          
          // Additional wait to ensure the image is fully rendered
          await new Promise(resolve => setTimeout(resolve, 500))
        } catch (error) {
          console.warn('Failed to preload background image:', error)
        }
      }
      
      // Wait longer to ensure background images are fully loaded
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      let dataUrl: string
      
      try {
        // Try the main export method first
        dataUrl = await exportCard('exportable-card', {
          format: 'png',
          quality: 1
        })
        console.log('Main export method successful')
      } catch (mainError) {
        console.warn('Main export failed, trying alternative method:', mainError)
        
        try {
          // Try the simple export method
          dataUrl = await simpleExportCard(exportableCardRef.current)
          console.log('Alternative export method successful')
        } catch (altError) {
          console.warn('Alternative export failed, using canvas fallback:', altError)
          
          // Use canvas fallback
          dataUrl = canvasExportCard(exportableCardRef.current)
          console.log('Canvas fallback successful')
        }
      }
      
      if (!dataUrl || dataUrl.length < 100) {
        throw new Error('Failed to generate valid image data')
      }
      
      console.log('Card exported successfully, data URL length:', dataUrl.length)
      
      const filename = generateFilename(currentCard.name || 'enkutatash', 'png')
      downloadCard(dataUrl, filename)
      
      // Update card data URL for sharing
      setCardDataUrl(dataUrl)
      
      console.log('Card downloaded successfully!')
      
    } catch (error) {
      console.error('Error downloading card:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      console.error(`Failed to download card: ${errorMessage}`)
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
        {/* Background Elements - Ethiopian New Year Emojis */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 mobile-bg-element text-4xl md:text-6xl opacity-30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            🎉
          </motion.div>
          <motion.div
            className="absolute top-20 right-20 mobile-bg-element-small text-3xl md:text-5xl opacity-40"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌺
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-1/4 mobile-bg-element text-4xl md:text-6xl opacity-35"
            animate={{ x: [-20, 20, -20] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🎊
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-1/4 mobile-bg-element-small text-3xl md:text-4xl opacity-25"
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            🌸
          </motion.div>
          <motion.div
            className="absolute bottom-1/3 right-10 mobile-bg-element-small text-2xl md:text-3xl opacity-30"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            🌻
          </motion.div>
          <motion.div
            className="absolute top-1/3 left-1/3 mobile-bg-element-small text-3xl md:text-4xl opacity-20"
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 4.5, repeat: Infinity }}
          >
            🍃
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-1/2 mobile-bg-element-small text-2xl md:text-3xl opacity-25"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            👑
          </motion.div>
          <motion.div
            className="absolute bottom-1/2 right-1/3 mobile-bg-element-small text-xl md:text-2xl opacity-30"
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🥂
          </motion.div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 text-center">
          <motion.h1 
            className="mobile-hero-title text-6xl md:text-8xl font-bold text-white text-shadow-lg mb-2 md:mb-3"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Enkutatash
          </motion.h1>
          
          <motion.h2 
            className="mobile-hero-title text-4xl md:text-6xl font-bold text-green-400 text-shadow-lg mb-4 md:mb-6 font-amharic"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            እንኳንታታሽ
          </motion.h2>
          
          <motion.p 
            className="mobile-hero-subtitle text-2xl md:text-3xl text-green-400 text-shadow mb-2 md:mb-4 font-amharic"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            እንኳን ለአዲሱ ዓመት በዓል አደረሰዎ!
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
            className="mobile-hero-cta bg-green-500 hover:bg-green-600 text-white text-lg md:text-xl px-6 md:px-8 py-3 md:py-4 mt-6 md:mt-8 flex items-center gap-2 md:gap-3 mx-auto mobile-button rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => setShowCardCreator(true)}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
            <span className="hidden sm:inline">Create Your Greeting Card</span>
            <span className="sm:hidden">Create Card</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Card Creator Modal */}
      {showCardCreator && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 md:p-4 z-50 mobile-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-2xl md:rounded-1xl p-4 md:p-8 max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto mobile-modal-content border-4 border-green-500 shadow-3lg shadow-green-500/25"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-4 md:mb-6 mobile-modal-header">
              <h2 className="mobile-h2 text-2xl md:text-3xl font-bold text-ethiopian-green">Create Your Greeting Card</h2>
              <button
                onClick={() => setShowCardCreator(false)}
                className="text-gray-500 hover:text-gray-700 text-xl md:text-2xl mobile-touch-target"
              >
                ×
              </button>
            </div>

            <div className="mobile-form-grid grid md:grid-cols-2 gap-4 md:gap-8 mobile-modal-body">
              {/* Left Side - Controls */}
              <div className="mobile-form-section space-y-4 md:space-y-6">
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
                  showColorPicker={true}
                  textColor={currentCard.nameTextColor || '#2C1810'}
                  onTextColorChange={handleNameTextColorChange}
                />

                <TextInput
                  label="English Message"
                  value={currentCard.message}
                  onChange={handleMessageChange}
                  placeholder="Enter your greeting message"
                  multiline
                  showColorPicker={true}
                  textColor={currentCard.textColor || '#2C1810'}
                  onTextColorChange={handleTextColorChange}
                />

                <TextInput
                  label="Amharic Message"
                  value={currentCard.amharicMessage || ''}
                  onChange={handleAmharicMessageChange}
                  placeholder="Enter Amharic greeting"
                  multiline
                  fontFamily="amharic"
                  showColorPicker={true}
                  textColor={currentCard.amharicTextColor || '#2C1810'}
                  onTextColorChange={handleAmharicTextColorChange}
                />

                <ShareOptions
                  cardDataUrl={cardDataUrl}
                  cardName={currentCard.name || 'Enkutatash Greeting Card'}
                  onDownload={handleDownload}
                  cardMessage={currentCard.message}
                  amharicMessage={currentCard.amharicMessage}
                />
              </div>

              {/* Right Side - Preview */}
              <div className="mobile-portrait-stack flex flex-col items-center gap-4 md:gap-6">
                <CardPreview
                  key={`preview-${currentCard.template}`}
                  card={currentCard}
                  template={selectedTemplate}
                />
                
                {/* Hidden exportable card for download */}
                <div id="exportable-card" className="hidden">
                  <ExportableCard
                    key={`export-${currentCard.template}`}
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
