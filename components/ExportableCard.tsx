'use client'

import { forwardRef } from 'react'
import { GreetingCard, CardTemplate } from '@/app/page'

interface ExportableCardProps {
  card: GreetingCard
  template: CardTemplate
}

const ExportableCard = forwardRef<HTMLDivElement, ExportableCardProps>(
  ({ card, template }, ref) => {
    const getPatternStyle = (pattern: string) => {
      switch (pattern) {
        case 'meskel':
          return {
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.3) 2px, transparent 2px),
              radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
              radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.1) 3px, transparent 3px)
            `,
            backgroundSize: '30px 30px, 20px 20px, 40px 40px'
          }
        case 'cultural':
          return {
            backgroundImage: `
              linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.1) 25%),
              linear-gradient(-45deg, transparent 25%, rgba(255, 255, 255, 0.1) 25%),
              linear-gradient(45deg, rgba(255, 255, 255, 0.1) 75%, transparent 75%),
              linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 75%, transparent 75%)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }
        case 'sunrise':
          return {
            backgroundImage: `
              radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
              linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 30%, rgba(255, 255, 255, 0.1) 70%, transparent 70%)
            `,
            backgroundSize: '100% 100%, 15px 15px'
          }
        case 'flag':
          return {
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.1) 2px,
                rgba(255, 255, 255, 0.1) 4px
              )
            `
          }
        default:
          return {}
      }
    }

    return (
      <div
        ref={ref}
        className="w-96 h-[480px] relative overflow-hidden bg-white rounded-3xl shadow-2xl"
        style={{
          background: template.background,
          ...getPatternStyle(template.pattern),
          // Ensure proper rendering for html2canvas
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        {/* Decorative Elements */}
        <div className="absolute top-6 right-6">
          <div className="w-8 h-8 text-white opacity-60">
            ⭐
          </div>
        </div>
        
        <div className="absolute top-6 left-6">
          <div className="w-6 h-6 text-white opacity-70">
            🌺
          </div>
        </div>

        <div className="absolute bottom-6 right-6">
          <div className="w-5 h-5 text-white opacity-50">
            ❤️
          </div>
        </div>

        {/* Content */}
        <div className="p-10 h-full flex flex-col justify-center items-center text-center relative z-10">
          {/* Template Preview Icon */}
          <div className="text-5xl mb-6">
            {template.preview}
          </div>

          {/* Amharic Greeting */}
          {card.amharicMessage && (
            <div className="text-white text-2xl font-amharic mb-6 text-shadow">
              {card.amharicMessage}
            </div>
          )}

          {/* English Message */}
          <div className="text-white text-3xl font-bold mb-6 text-shadow">
            {card.message || 'Happy Ethiopian New Year!'}
          </div>

          {/* Name */}
          {card.name && (
            <div className="text-white text-2xl font-semibold text-shadow mb-4">
              - {card.name}
            </div>
          )}

          {/* Year */}
          <div className="absolute bottom-6 left-6 text-white text-lg opacity-80">
            2024
          </div>
        </div>

        {/* Border Decoration */}
        <div className="absolute inset-3 border-2 border-white border-opacity-30 rounded-2xl"></div>
      </div>
    )
  }
)

ExportableCard.displayName = 'ExportableCard'

export default ExportableCard
