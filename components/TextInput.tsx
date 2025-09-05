'use client'

import { motion } from 'framer-motion'
import { Palette, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface TextInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  multiline?: boolean
  fontFamily?: string
  maxLength?: number
  showColorPicker?: boolean
  textColor?: string
  onTextColorChange?: (color: string) => void
}

const predefinedColors = [
  '#2C1810', '#8B4513', '#8B0000', '#4B0082', '#006400', '#8B008B',
  '#1A1A1A', '#4B0082', '#8B0000', '#2F4F2F', '#FF6B35', '#FFD700',
  '#FF8C00', '#32CD32', '#FF1493', '#00CED1', '#9370DB', '#FF69B4',
  '#DC143C', '#FF6347', '#20B2AA', '#8A2BE2', '#FF4500', '#2E8B57',
  '#DAA520', '#CD5C5C', '#4682B4', '#D2691E', '#5F9EA0', '#BC8F8F',
  '#000000', '#FFFFFF'
]

export default function TextInput({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  multiline = false,
  fontFamily = 'inherit',
  maxLength,
  showColorPicker = false,
  textColor = '#2C1810',
  onTextColorChange
}: TextInputProps) {
  const [showColorPalette, setShowColorPalette] = useState(false)
  const colorPickerRef = useRef<HTMLDivElement>(null)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (!maxLength || newValue.length <= maxLength) {
      onChange(newValue)
    }
  }

  // Close color palette when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPalette(false)
      }
    }

    if (showColorPalette) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showColorPalette])

  return (
    <motion.div
      className="space-y-2 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      ref={colorPickerRef}
    >
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {maxLength && (
          <span className="text-gray-500 ml-2">
            ({value.length}/{maxLength})
          </span>
        )}
      </label>
      
      {/* Input with inline color picker */}
      <div className="relative">
        {multiline ? (
          <textarea
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`input-field resize-none h-24 pr-16 ${fontFamily === 'amharic' ? 'font-amharic' : ''}`}
            style={{ fontFamily: fontFamily === 'amharic' ? 'Abyssinica SIL, serif' : 'inherit' }}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`input-field pr-16 ${fontFamily === 'amharic' ? 'font-amharic' : ''}`}
            style={{ fontFamily: fontFamily === 'amharic' ? 'Abyssinica SIL, serif' : 'inherit' }}
          />
        )}
        
        {/* Inline Color Picker Button */}
        {showColorPicker && onTextColorChange && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <motion.button
              type="button"
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm"
              onClick={() => setShowColorPalette(!showColorPalette)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className="w-5 h-5 rounded border border-gray-300"
                style={{ backgroundColor: textColor }}
              />
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showColorPalette ? 'rotate-180' : ''}`} />
            </motion.button>
          </div>
        )}
      </div>
      
      {/* Character count for multiline inputs */}
      {multiline && maxLength && (
        <div className="text-right text-xs text-gray-500">
          {value.length}/{maxLength} characters
        </div>
      )}

      {/* Inline Color Palette */}
      {showColorPicker && onTextColorChange && showColorPalette && (
        <motion.div
          className="absolute z-10 mt-2 p-4 bg-white rounded-lg border border-gray-200 shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="grid grid-cols-8 gap-2 mb-3">
            {predefinedColors.map((color) => (
              <motion.button
                key={color}
                className={`w-8 h-8 rounded border-2 transition-all duration-200 ${
                  textColor === color 
                    ? 'border-gray-800 scale-110 shadow-md' 
                    : 'border-gray-300 hover:border-gray-500'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  onTextColorChange(color)
                  setShowColorPalette(false)
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={color}
              />
            ))}
          </div>
          
          {/* Custom Color Input */}
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={textColor}
              onChange={(e) => onTextColorChange(e.target.value)}
              className="w-10 h-8 rounded border border-gray-300 cursor-pointer"
            />
            <span className="text-sm text-gray-600 font-medium">Custom Color</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
