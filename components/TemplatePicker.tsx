'use client'

import { motion } from 'framer-motion'
import { CardTemplate } from '@/app/page'

interface TemplatePickerProps {
  templates: CardTemplate[]
  selectedTemplate: string
  onTemplateChange: (templateId: string) => void
}

export default function TemplatePicker({ 
  templates, 
  selectedTemplate, 
  onTemplateChange 
}: TemplatePickerProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-green-800">Choose Template</h3>
      <div className="grid grid-cols-2 gap-4">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            className={`template-card p-4 rounded-xl border-2 transition-all duration-300 ${
              selectedTemplate === template.id
                ? 'border-green-500 bg-green-50 shadow-lg'
                : 'border-green-200 bg-white hover:border-green-400'
            }`}
            onClick={() => onTemplateChange(template.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div 
              className="w-full h-20 rounded-lg mb-3 relative overflow-hidden"
              style={{ 
                backgroundImage: `url(${template.background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Subtle overlay for better visibility */}
              <div className="absolute inset-0 bg-black bg-opacity-10"></div>
              
              {/* Pattern overlay */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: template.pattern === 'meskel' 
                    ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 2px, transparent 2px)'
                    : template.pattern === 'garden'
                    ? 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 3px, transparent 3px)'
                    : template.pattern === 'sunrise'
                    ? 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)'
                    : 'radial-gradient(circle at 10% 10%, rgba(255,255,255,0.2) 2px, transparent 2px)',
                  backgroundSize: '15px 15px'
                }}
              />
              
              {/* Template icon */}
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                {template.preview}
              </div>
              
              {/* Selection indicator */}
              {selectedTemplate === template.id && (
                <motion.div
                  className="absolute top-2 right-2 w-6 h-6 bg-ethiopian-red rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}
            </div>
            
            <h4 className="font-semibold text-gray-800 text-sm text-center">
              {template.name}
            </h4>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
