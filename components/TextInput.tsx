'use client'

import { motion } from 'framer-motion'
import ColorPicker from './ColorPicker'

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (!maxLength || newValue.length <= maxLength) {
      onChange(newValue)
    }
  }

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {maxLength && (
          <span className="text-gray-500 ml-2">
            ({value.length}/{maxLength})
          </span>
        )}
      </label>
      
      {multiline ? (
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`input-field resize-none h-24 ${fontFamily === 'amharic' ? 'font-amharic' : ''}`}
          style={{ fontFamily: fontFamily === 'amharic' ? 'Abyssinica SIL, serif' : 'inherit' }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`input-field ${fontFamily === 'amharic' ? 'font-amharic' : ''}`}
          style={{ fontFamily: fontFamily === 'amharic' ? 'Abyssinica SIL, serif' : 'inherit' }}
        />
      )}
      
      {/* Character count for multiline inputs */}
      {multiline && maxLength && (
        <div className="text-right text-xs text-gray-500">
          {value.length}/{maxLength} characters
        </div>
      )}

      {/* Color Picker */}
      {showColorPicker && onTextColorChange && (
        <ColorPicker
          label="Text Color"
          value={textColor}
          onChange={onTextColorChange}
        />
      )}
    </motion.div>
  )
}
