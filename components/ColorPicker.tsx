'use client'

import { motion } from 'framer-motion'
import { Palette } from 'lucide-react'
import { useState } from 'react'

interface ColorPickerProps {
  label: string
  value: string
  onChange: (color: string) => void
}

const predefinedColors = [
  '#2C1810', // Dark brown
  '#8B4513', // Saddle brown
  '#8B0000', // Dark red
  '#4B0082', // Indigo
  '#006400', // Dark green
  '#8B008B', // Dark magenta
  '#1A1A1A', // Very dark gray
  '#4B0082', // Purple
  '#8B0000', // Maroon
  '#2F4F2F', // Dark slate gray
  '#FF6B35', // Orange red
  '#FFD700', // Gold
  '#FF8C00', // Dark orange
  '#32CD32', // Lime green
  '#FF1493', // Deep pink
  '#00CED1', // Dark turquoise
  '#9370DB', // Medium purple
  '#FF69B4', // Hot pink
  '#DC143C', // Crimson
  '#FF6347', // Tomato
  '#20B2AA', // Light sea green
  '#8A2BE2', // Blue violet
  '#FF4500', // Orange red
  '#2E8B57', // Sea green
  '#DAA520', // Goldenrod
  '#CD5C5C', // Indian red
  '#4682B4', // Steel blue
  '#D2691E', // Chocolate
  '#5F9EA0', // Cadet blue
  '#BC8F8F', // Rosy brown
  '#000000', // Black
  '#FFFFFF'  // White
]

export default function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false)

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      
      <div className="flex items-center gap-3">
        {/* Color Preview Button */}
        <motion.button
          type="button"
          className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200"
          style={{ backgroundColor: value }}
          onClick={() => setShowPicker(!showPicker)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Palette className="w-6 h-6 mx-auto text-white drop-shadow-lg" />
        </motion.button>

        {/* Color Value Display */}
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="input-field text-sm font-mono"
            placeholder="#000000"
          />
        </div>
      </div>

      {/* Color Palette */}
      <motion.div
        className={`overflow-hidden transition-all duration-300 ${
          showPicker ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-3 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Choose a Color</h4>
          <div className="grid grid-cols-8 gap-2">
            {predefinedColors.map((color) => (
              <motion.button
                key={color}
                className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                  value === color 
                    ? 'border-gray-800 scale-110 shadow-lg' 
                    : 'border-gray-300 hover:border-gray-500'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  onChange(color)
                  setShowPicker(false)
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={color}
              />
            ))}
          </div>
          
          {/* Custom Color Input */}
          <div className="mt-4 pt-3 border-t border-gray-300">
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Custom Color
            </label>
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
