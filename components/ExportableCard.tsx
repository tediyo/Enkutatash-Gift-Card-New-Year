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
            radial-gradient(circle at 15% 15%, rgba(255, 255, 255, 0.4) 8px, transparent 8px),
            radial-gradient(circle at 85% 25%, rgba(255, 255, 255, 0.3) 6px, transparent 6px),
            radial-gradient(circle at 25% 75%, rgba(255, 255, 255, 0.2) 10px, transparent 10px),
            radial-gradient(circle at 75% 85%, rgba(255, 255, 255, 0.3) 7px, transparent 7px),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 12px, transparent 12px)
          `,
          backgroundSize: '60px 60px, 45px 45px, 70px 70px, 50px 50px, 80px 80px'
        }
      case 'garden':
        return {
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.3) 5px, transparent 5px),
            radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.2) 7px, transparent 7px),
            radial-gradient(circle at 30% 80%, rgba(255, 255, 255, 0.25) 6px, transparent 6px),
            radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.15) 8px, transparent 8px),
            linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0.1) 60%, transparent 60%)
          `,
          backgroundSize: '40px 40px, 55px 55px, 45px 45px, 60px 60px, 25px 25px'
        }
      case 'sunrise':
        return {
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.4) 0%, transparent 60%),
            radial-gradient(circle at 20% 40%, rgba(255, 255, 255, 0.2) 6px, transparent 6px),
            radial-gradient(circle at 80% 60%, rgba(255, 255, 255, 0.25) 8px, transparent 8px),
            linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 30%, rgba(255, 255, 255, 0.1) 70%, transparent 70%)
          `,
          backgroundSize: '100% 100%, 50px 50px, 60px 60px, 20px 20px'
        }
      case 'spring':
        return {
          backgroundImage: `
            radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.3) 6px, transparent 6px),
            radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0.2) 8px, transparent 8px),
            radial-gradient(circle at 20% 90%, rgba(255, 255, 255, 0.25) 7px, transparent 7px),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.15) 9px, transparent 9px),
            radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.1) 10px, transparent 10px),
            radial-gradient(circle at 30% 60%, rgba(255, 255, 255, 0.2) 5px, transparent 5px)
          `,
          backgroundSize: '45px 45px, 55px 55px, 50px 50px, 65px 65px, 70px 70px, 40px 40px'
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
        {/* Decorative Elements - Yellow Flowers */}
        <div className="absolute top-6 right-6">
          <div className="text-3xl">
            🌼
          </div>
        </div>
        
        <div className="absolute top-6 left-6">
          <div className="text-2xl">
            🌻
          </div>
        </div>

        <div className="absolute bottom-6 right-6">
          <div className="text-xl">
            🌸
          </div>
        </div>

        <div className="absolute bottom-6 left-6">
          <div className="text-2xl">
            🌺
          </div>
        </div>

        <div className="absolute top-1/2 left-6">
          <div className="text-lg opacity-60">
            🌼
          </div>
        </div>

        <div className="absolute top-1/2 right-6">
          <div className="text-lg opacity-50">
            🌻
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
