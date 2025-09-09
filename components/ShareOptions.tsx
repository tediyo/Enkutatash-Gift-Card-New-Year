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
  Smartphone,
  Send,
  Settings,
  Sparkles,
  Zap,
  Star,
  CheckCircle,
  ArrowDown,
  Loader2
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface ShareOptionsProps {
  cardDataUrl?: string
  cardName: string
  onDownload: (quality?: 'standard' | 'high' | 'ultra') => void
  cardMessage?: string
  amharicMessage?: string
  isDownloading?: boolean
}

export default function ShareOptions({ 
  cardDataUrl, 
  cardName, 
  onDownload, 
  cardMessage, 
  amharicMessage,
  isDownloading = false
}: ShareOptionsProps) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [selectedQuality, setSelectedQuality] = useState<'standard' | 'high' | 'ultra'>('high')
  const [showQualityMenu, setShowQualityMenu] = useState(false)
  const qualityMenuRef = useRef<HTMLDivElement>(null)

  // Close quality menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (qualityMenuRef.current && !qualityMenuRef.current.contains(event.target as Node)) {
        setShowQualityMenu(false)
      }
    }

    if (showQualityMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showQualityMenu])

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
      color: 'bg-yellow-500',
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
        window.open(whatsappUrl, '_blank')
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-yellow-600',
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
        window.open(facebookUrl, '_blank')
      }
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-yellow-400',
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
        window.open(twitterUrl, '_blank')
      }
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-yellow-700',
      action: () => {
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
        window.open(telegramUrl, '_blank')
      }
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-yellow-800',
      action: () => {
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(cardName)}&summary=${encodeURIComponent(shareText)}`
        window.open(linkedinUrl, '_blank')
      }
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-yellow-500',
      action: () => {
        // Instagram doesn't support direct URL sharing, so we copy the text
        navigator.clipboard.writeText(shareText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  ]

  const qualityOptions = [
    {
      name: 'Standard',
      value: 'standard' as const,
      description: '2x resolution, smaller file size',
      scale: 2,
      icon: Star,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      name: 'High',
      value: 'high' as const,
      description: '4x resolution, balanced quality',
      scale: 4,
      icon: Zap,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      name: 'Ultra',
      value: 'ultra' as const,
      description: '8x resolution, maximum quality',
      scale: 8,
      icon: Sparkles,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ]

  const utilityOptions = [
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-yellow-600',
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
      color: 'bg-yellow-500',
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
      color: 'bg-yellow-700',
      action: generateQRCode
    },
    {
      name: 'Native Share',
      icon: Smartphone,
      color: 'bg-yellow-800',
      action: handleNativeShare
    }
  ]

  return (
    <div className="space-y-3 md:space-y-4">
      <h3 className="mobile-h3 text-lg md:text-xl font-bold text-gray-800">Share Your Card</h3>
      
      <div className="mobile-controls flex flex-col sm:flex-row gap-3 md:gap-4">
        {/* Download Button */}
        <motion.button
          className={`group relative overflow-hidden ${
            isDownloading 
              ? 'bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 cursor-not-allowed' 
              : 'bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700'
          } text-white flex items-center justify-center mobile-button w-full sm:flex-1 h-12 px-8 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-green-500/25 border border-green-400/20`}
          onClick={() => !isDownloading && onDownload(selectedQuality)}
          disabled={isDownloading}
          whileHover={!isDownloading ? { 
            scale: 1.05,
            y: -2
          } : {}}
          whileTap={!isDownloading ? { scale: 0.95 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="hidden sm:inline relative z-10">
            {isDownloading ? 'Generating...' : `Download ${selectedQuality.charAt(0).toUpperCase() + selectedQuality.slice(1)}`}
          </span>
          <span className="sm:hidden relative z-10">
            {isDownloading ? 'Generating...' : 'Download'}
          </span>
        </motion.button>

        {/* Quality Selector */}
        <div className="relative w-full sm:flex-1" ref={qualityMenuRef}>
          <motion.button
            className="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700 text-white flex items-center justify-center gap-2 mobile-button w-full h-12 px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 border border-blue-400/20"
            onClick={() => setShowQualityMenu(!showQualityMenu)}
            whileHover={{ 
              scale: 1.05,
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              animate={{ rotate: showQualityMenu ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Settings className="w-5 h-5 relative z-10" />
            </motion.div>
            <span className="hidden sm:inline relative z-10">Quality</span>
            <span className="sm:hidden relative z-10">⚙️</span>
            <motion.div
              animate={{ y: showQualityMenu ? 2 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowDown className="w-4 h-4 relative z-10" />
            </motion.div>
          </motion.button>

          {/* Enhanced Quality Dropdown */}
          {showQualityMenu && (
            <motion.div
              className="absolute top-full left-0 mt-3 w-72 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 z-20 overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="w-4 h-4 text-gray-600" />
                  <h4 className="text-sm font-bold text-gray-800">Export Quality</h4>
                </div>
                <div className="space-y-2">
                  {qualityOptions.map((option, index) => {
                    const IconComponent = option.icon
                    const isSelected = selectedQuality === option.value
                    return (
                      <motion.button
                        key={option.value}
                        className={`w-full text-left p-3 rounded-xl transition-all duration-200 border-2 ${
                          isSelected
                            ? `${option.bgColor} ${option.borderColor} border-opacity-100 shadow-md`
                            : 'hover:bg-gray-50 text-gray-700 border-transparent hover:border-gray-200'
                        }`}
                        onClick={() => {
                          setSelectedQuality(option.value)
                          setShowQualityMenu(false)
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isSelected ? option.bgColor : 'bg-gray-100'}`}>
                            <IconComponent className={`w-4 h-4 ${isSelected ? option.color : 'text-gray-600'}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`font-semibold text-sm ${isSelected ? option.color : 'text-gray-800'}`}>
                                {option.name}
                              </span>
                              {isSelected && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                          </div>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Share Menu Toggle */}
        <motion.button
          className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white flex items-center justify-center gap-2 mobile-button w-full sm:flex-1 h-12 px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-yellow-500/25 border border-yellow-400/20"
          onClick={() => setShowShareMenu(!showShareMenu)}
          whileHover={{ 
            scale: 1.05,
            y: -2
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.div
            animate={{ 
              rotate: showShareMenu ? 180 : 0,
              scale: showShareMenu ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <Share2 className="w-5 h-5 relative z-10" />
          </motion.div>
          <span className="relative z-10">Share</span>
          <motion.div
            animate={{ y: showShareMenu ? 2 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowDown className="w-4 h-4 relative z-10" />
          </motion.div>
        </motion.button>

      </div>


      {/* Enhanced Share Options Menu */}
      <motion.div
        className={`overflow-hidden transition-all duration-500 ${
          showShareMenu ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <motion.div 
          className="mt-4 md:mt-6 space-y-6 md:space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: showShareMenu ? 1 : 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Social Media Platforms */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 md:p-6 border border-blue-200/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Share2 className="w-4 h-4 text-blue-600" />
              </div>
              <h4 className="text-sm md:text-base font-bold text-gray-800">Social Media</h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {socialMediaOptions.map((option, index) => (
                <motion.button
                  key={option.name}
                  className="group relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-5 rounded-xl transition-all duration-300 border-2 border-white/50 hover:border-blue-300 bg-white/80 hover:bg-white backdrop-blur-sm shadow-lg hover:shadow-xl mobile-touch-target"
                  onClick={option.action}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                  title={option.name === 'Copy Link' && copied ? 'Copied!' : option.name}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatDelay: 3,
                      delay: index * 0.2
                    }}
                  >
                    <option.icon className="w-6 h-6 md:w-7 md:h-7 text-gray-700 group-hover:text-blue-600 relative z-10" />
                  </motion.div>
                  <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-800 mt-2 relative z-10">
                    {option.name === 'Copy Link' && copied ? 'Copied!' : option.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Utility Options */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 md:p-6 border border-green-200/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Settings className="w-4 h-4 text-green-600" />
              </div>
              <h4 className="text-sm md:text-base font-bold text-gray-800">More Options</h4>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {utilityOptions.map((option, index) => (
                <motion.button
                  key={option.name}
                  className="group relative overflow-hidden flex flex-col items-center gap-2 p-4 md:p-5 rounded-xl transition-all duration-300 border-2 border-white/50 hover:border-green-300 bg-white/80 hover:bg-white backdrop-blur-sm shadow-lg hover:shadow-xl mobile-touch-target"
                  onClick={option.action}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: (index + socialMediaOptions.length) * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatDelay: 3,
                      delay: (index + socialMediaOptions.length) * 0.2
                    }}
                  >
                    <option.icon className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-green-600 relative z-10" />
                  </motion.div>
                  <span className="text-xs font-semibold text-gray-700 group-hover:text-green-800 relative z-10">
                    {option.name === 'Copy Link' && copied ? 'Copied!' : option.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
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
