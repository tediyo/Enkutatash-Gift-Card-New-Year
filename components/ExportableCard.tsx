'use client'

import { forwardRef } from 'react'
import { GreetingCard, CardTemplate } from '@/app/page'
import FlowerDecoration from './FlowerDecoration'

interface ExportableCardProps {
  card: GreetingCard
  template: CardTemplate
}

const ExportableCard = forwardRef<HTMLDivElement, ExportableCardProps>(
  ({ card, template }, ref) => {
    // Debug logging
    console.log('ExportableCard template:', template.id, template.background)
    console.log('ExportableCard background URL:', `url(${template.background})`)
      const getPatternStyle = (pattern: string) => {
    switch (pattern) {
      case 'meskel':
        return {
          backgroundImage: `
            radial-gradient(circle at 15% 15%, rgba(255, 81, 7, 0.98) 8px, transparent 8px),
            radial-gradient(circle at 85% 25%, rgba(255, 215, 0, 0.6) 6px, transparent 6px),
            radial-gradient(circle at 25% 75%, rgba(255, 140, 0, 0.4) 10px, transparent 10px),
            radial-gradient(circle at 75% 85%, rgba(255, 165, 0, 0.5) 7px, transparent 7px),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 12px, transparent 12px)
          `,
          backgroundSize: '60px 60px, 45px 45px, 70px 70px, 50px 50px, 80px 80px'
        }
      case 'garden':
        return {
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.4) 5px, transparent 5px),
            radial-gradient(circle at 80% 30%, rgba(255, 140, 0, 0.3) 7px, transparent 7px),
            radial-gradient(circle at 30% 80%, rgba(255, 165, 0, 0.35) 6px, transparent 6px),
            radial-gradient(circle at 70% 70%, rgba(255, 255, 0, 0.25) 8px, transparent 8px),
            linear-gradient(45deg, transparent 40%, rgba(255, 215, 0, 0.2) 40%, rgba(255, 140, 0, 0.2) 60%, transparent 60%)
          `,
          backgroundSize: '40px 40px, 55px 55px, 45px 45px, 60px 60px, 25px 25px'
        }
      case 'sunrise':
        return {
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(255, 215, 0, 0.5) 0%, transparent 60%),
            radial-gradient(circle at 20% 40%, rgba(255, 140, 0, 0.3) 6px, transparent 6px),
            radial-gradient(circle at 80% 60%, rgba(255, 165, 0, 0.35) 8px, transparent 8px),
            linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.2) 30%, rgba(255, 140, 0, 0.2) 70%, transparent 70%)
          `,
          backgroundSize: '100% 100%, 50px 50px, 60px 60px, 20px 20px'
        }
      case 'spring':
        return {
          backgroundImage: `
            radial-gradient(circle at 10% 10%, rgba(255, 215, 0, 0.4) 6px, transparent 6px),
            radial-gradient(circle at 90% 20%, rgba(255, 140, 0, 0.3) 8px, transparent 8px),
            radial-gradient(circle at 20% 90%, rgba(255, 165, 0, 0.35) 7px, transparent 7px),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 0, 0.25) 9px, transparent 9px),
            radial-gradient(circle at 50% 30%, rgba(255, 215, 0, 0.2) 10px, transparent 10px),
            radial-gradient(circle at 30% 60%, rgba(255, 140, 0, 0.3) 5px, transparent 5px)
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
          backgroundImage: `url(${template.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#f0f0f0', // Fallback background color
          ...getPatternStyle(template.pattern),
          // Ensure proper rendering for html2canvas
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
        data-template={template.id}
        data-background={template.background}
      >
        {/* Decorative Elements - Template-based Flower Images + Emojis */}
        <div className="absolute top-6 right-6">
          <FlowerDecoration
            src={template.background}
            alt={`${template.name} Background`}
            animation="rotate"
            size="large"
            opacity={0.8}
          />
        </div>
        
        <div className="absolute top-6 left-6">
          <FlowerDecoration
            src={template.background}
            alt={`${template.name} Background`}
            animation="float"
            size="large"
            opacity={0.7}
          />
        </div>

        <div className="absolute bottom-6 right-6">
          <div className="text-xl">
            🎊
          </div>
        </div>

        <div className="absolute bottom-6 left-6">
          <FlowerDecoration
            src={template.background}
            alt={`${template.name} Background`}
            animation="sway"
            size="large"
            opacity={0.6}
          />
        </div>

        <div className="absolute top-1/2 left-6">
          <FlowerDecoration
            src={template.background}
            alt={`${template.name} Background`}
            animation="pulse"
            size="medium"
            opacity={0.5}
          />
        </div>

        <div className="absolute top-1/2 right-6">
          <div className="text-lg opacity-50">
            🍃
          </div>
        </div>

        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="text-xl opacity-70">
            👑
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="text-lg opacity-60">
            🥂
          </div>
        </div>

        {/* Additional flower decorations - Template-based */}
        <div className="absolute top-1/3 right-1/4">
          <FlowerDecoration
            src={template.background}
            alt={`${template.name} Background`}
            animation="float"
            size="small"
            opacity={0.4}
          />
        </div>

        <div className="absolute bottom-1/3 left-1/3">
          <FlowerDecoration
            src={template.background}
            alt={`${template.name} Background`}
            animation="scale"
            size="small"
            opacity={0.3}
          />
        </div>

        <div className="absolute top-1/4 left-1/4">
          <FlowerDecoration
            src={template.background}
            alt={`${template.name} Background`}
            animation="pulse"
            size="small"
            opacity={0.2}
          />
        </div>

        {/* Semi-transparent overlay for text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20 z-5"></div>

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
