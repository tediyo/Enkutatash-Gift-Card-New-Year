'use client'

import { motion } from 'framer-motion'
import { Share2, MessageCircle, Mail, Copy } from 'lucide-react'
import { useState } from 'react'

interface ShareOptionsProps {
  cardDataUrl?: string
  cardName: string
}

export default function ShareOptions({ cardDataUrl, cardName }: ShareOptionsProps) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `Check out my beautiful Enkutatash greeting card! ${shareUrl}`

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
        window.open(whatsappUrl, '_blank')
      }
    },
    {
      name: 'Telegram',
      icon: Share2,
      action: () => {
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
        window.open(telegramUrl, '_blank')
      }
    },
    {
      name: 'Email',
      icon: Mail,
      action: () => {
        const subject = 'Happy Ethiopian New Year!'
        const body = `Wishing you a wonderful Enkutatash!\n\n${shareText}`
        const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.open(mailtoUrl)
      }
    },
    {
      name: 'Copy Link',
      icon: Copy,
      action: async () => {
        try {
          await navigator.clipboard.writeText(shareUrl)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (err) {
          console.error('Failed to copy link:', err)
        }
      }
    }
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">Share Your Card</h3>
      
      <div className="flex flex-wrap gap-3">
        {/* Share Menu Toggle */}
        <motion.button
          className="btn-primary flex items-center gap-2"
          onClick={() => setShowShareMenu(!showShareMenu)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 className="w-4 h-4" />
          Share
        </motion.button>
      </div>

      {/* Share Options Menu */}
      <motion.div
        className={`overflow-hidden transition-all duration-300 ${
          showShareMenu ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="grid grid-cols-2 gap-3 mt-4">
          {shareOptions.map((option, index) => (
            <motion.button
              key={option.name}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              onClick={option.action}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <option.icon className="w-5 h-5 text-ethiopian-red" />
              <span className="text-sm font-medium text-gray-700">
                {option.name === 'Copy Link' && copied ? 'Copied!' : option.name}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Social Media Preview */}
      {cardDataUrl && (
        <motion.div
          className="mt-6 p-4 bg-gray-50 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Preview</h4>
          <div className="flex items-center gap-3">
            <img
              src={cardDataUrl}
              alt="Card preview"
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">
                {cardName || 'Enkutatash Greeting Card'}
              </p>
              <p className="text-xs text-gray-600">
                Happy Ethiopian New Year!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
