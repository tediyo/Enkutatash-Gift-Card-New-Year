'use client'

import { motion } from 'framer-motion'
import { 
  Share2, 
  MessageCircle, 
  Mail, 
  Download, 
  Copy, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  QrCode,
  Smartphone
} from 'lucide-react'
import { useState } from 'react'

interface ShareOptionsProps {
  cardDataUrl?: string
  cardName: string
  onDownload: () => void
  cardMessage?: string
  amharicMessage?: string
}

export default function ShareOptions({ 
  cardDataUrl, 
  cardName, 
  onDownload, 
  cardMessage, 
  amharicMessage 
}: ShareOptionsProps) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `🎉 ${cardMessage || 'Happy Ethiopian New Year!'} ${amharicMessage ? `\n\n${amharicMessage}` : ''}\n\nCheck out my beautiful Enkutatash greeting card! ${shareUrl}`

  // Generate QR Code
  const generateQRCode = () => {
    if (qrCodeUrl) {
      setShowQRCode(true)
      return
    }
    
    const qrCodeData = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`
    setQrCodeUrl(qrCodeData)
    setShowQRCode(true)
  }

  // Native Share API
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cardName} - Enkutatash Greeting Card`,
          text: shareText,
          url: shareUrl
        })
      } catch (err) {
        console.log('Native share cancelled or failed:', err)
      }
    } else {
      // Fallback to copy link
      try {
        await navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy link:', err)
      }
    }
  }

  const socialMediaOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500',
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
        window.open(whatsappUrl, '_blank')
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
        window.open(facebookUrl, '_blank')
      }
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-blue-400',
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
        window.open(twitterUrl, '_blank')
      }
    },
    {
      name: 'Telegram',
      icon: Share2,
      color: 'bg-blue-500',
      action: () => {
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
        window.open(telegramUrl, '_blank')
      }
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700',
      action: () => {
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(cardName)}&summary=${encodeURIComponent(shareText)}`
        window.open(linkedinUrl, '_blank')
      }
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-pink-500',
      action: () => {
        // Instagram doesn't support direct URL sharing, so we copy the text
        navigator.clipboard.writeText(shareText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  ]

  const utilityOptions = [
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600',
      action: () => {
        const subject = `${cardName} - Happy Ethiopian New Year!`
        const body = `Wishing you a wonderful Enkutatash!\n\n${shareText}`
        const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.open(mailtoUrl)
      }
    },
    {
      name: 'Copy Link',
      icon: Copy,
      color: 'bg-gray-500',
      action: async () => {
        try {
          await navigator.clipboard.writeText(shareUrl)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (err) {
          console.error('Failed to copy link:', err)
        }
      }
    },
    {
      name: 'QR Code',
      icon: QrCode,
      color: 'bg-purple-500',
      action: generateQRCode
    },
    {
      name: 'Native Share',
      icon: Smartphone,
      color: 'bg-indigo-500',
      action: handleNativeShare
    }
  ]

  return (
    <div className="space-y-3 md:space-y-4">
      <h3 className="mobile-h3 text-lg md:text-xl font-bold text-gray-800">Share Your Card</h3>
      
      <div className="mobile-controls flex flex-col sm:flex-row gap-2 md:gap-3">
        {/* Download Button */}
        <motion.button
          className="mobile-control-button bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2 mobile-button px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={onDownload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Download</span>
          <span className="sm:hidden">Download</span>
        </motion.button>

        {/* Share Menu Toggle */}
        <motion.button
          className="mobile-control-button bg-yellow-500 hover:bg-yellow-600 text-white flex items-center justify-center gap-2 mobile-button px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
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
          showShareMenu ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-3 md:mt-4 space-y-4 md:space-y-6">
          {/* Social Media Platforms */}
          <div>
            <h4 className="mobile-h4 text-sm md:text-sm font-semibold text-gray-700 mb-2 md:mb-3">Social Media</h4>
            <div className="mobile-share-grid grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
              {socialMediaOptions.map((option, index) => (
                <motion.button
                  key={option.name}
                  className={`mobile-share-button flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-200 ${option.color} text-white hover:opacity-90 mobile-touch-target`}
                  onClick={option.action}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <option.icon className="mobile-share-icon w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs font-medium">
                    {option.name === 'Copy Link' && copied ? 'Copied!' : option.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Utility Options */}
          <div>
            <h4 className="mobile-h4 text-sm md:text-sm font-semibold text-gray-700 mb-2 md:mb-3">More Options</h4>
            <div className="mobile-share-grid grid grid-cols-2 gap-2 md:gap-3">
              {utilityOptions.map((option, index) => (
                <motion.button
                  key={option.name}
                  className={`mobile-share-button flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-200 ${option.color} text-white hover:opacity-90 mobile-touch-target`}
                  onClick={option.action}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + socialMediaOptions.length) * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <option.icon className="mobile-share-icon w-4 h-4" />
                  <span className="text-xs md:text-sm font-medium">
                    {option.name === 'Copy Link' && copied ? 'Copied!' : option.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* QR Code Modal */}
      {showQRCode && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 md:p-4 z-50 mobile-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="mobile-modal bg-white rounded-xl md:rounded-2xl p-4 md:p-6 max-w-xs md:max-w-sm w-full text-center mobile-modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h3 className="mobile-modal-title text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4">QR Code</h3>
            {qrCodeUrl && (
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-3 md:mb-4 rounded-lg"
              />
            )}
            <p className="mobile-modal-text text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
              Scan this QR code to view the greeting card
            </p>
            <button
              onClick={() => setShowQRCode(false)}
              className="btn-primary w-full mobile-button"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Enhanced Social Media Preview */}
      {cardDataUrl && (
        <motion.div
          className="mt-6 p-4 bg-gradient-to-r from-ethiopian-red/10 to-ethiopian-gold/10 rounded-xl border border-ethiopian-red/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Share Preview</h4>
          <div className="flex items-center gap-4">
            <img
              src={cardDataUrl}
              alt="Card preview"
              className="w-20 h-20 rounded-lg object-cover shadow-lg"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 mb-1">
                {cardName || 'Enkutatash Greeting Card'}
              </p>
              <p className="text-xs text-gray-600 mb-2">
                {cardMessage || 'Happy Ethiopian New Year!'}
              </p>
              <p className="text-xs text-ethiopian-red font-medium">
                Tap any platform above to share
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
