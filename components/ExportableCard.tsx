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
    const getTemplateStyle = (template: CardTemplate) => {
      const baseStyle = {
        backgroundImage: `url(${template.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f0f0f0',
        imageRendering: 'auto',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)' // Force hardware acceleration
      }

      const templateConfig = getTemplateConfig(template.id)

      return {
        ...baseStyle,
        ...templateConfig
      }
    }

    const getBorderConfig = (templateId: string) => {
      switch (templateId) {
        case 'meskel-flowers':
          return {
            borderColor: '#FF6B35',
            borderWidth: '3px',
            borderStyle: 'solid',
            borderRadius: '16px',
            boxShadow: '0 0 20px rgba(255, 107, 53, 0.3), inset 0 0 20px rgba(255, 107, 53, 0.1)'
          }
        case 'yellow-garden':
          return {
            borderColor: '#FFD700',
            borderWidth: '4px',
            borderStyle: 'double',
            borderRadius: '20px',
            boxShadow: '0 0 25px rgba(255, 215, 0, 0.4), inset 0 0 25px rgba(255, 215, 0, 0.1)'
          }
        case 'golden-sunrise':
          return {
            borderColor: '#FF8C00',
            borderWidth: '3px',
            borderStyle: 'solid',
            borderRadius: '18px',
            boxShadow: '0 0 22px rgba(255, 140, 0, 0.35), inset 0 0 22px rgba(255, 140, 0, 0.1)'
          }
        case 'ethiopian-spring':
          return {
            borderColor: '#32CD32',
            borderWidth: '3px',
            borderStyle: 'solid',
            borderRadius: '15px',
            boxShadow: '0 0 18px rgba(50, 205, 50, 0.3), inset 0 0 18px rgba(50, 205, 50, 0.1)'
          }
        case 'classic-meskel':
          return {
            borderColor: '#DC143C',
            borderWidth: '4px',
            borderStyle: 'solid',
            borderRadius: '12px',
            boxShadow: '0 0 20px rgba(220, 20, 60, 0.4), inset 0 0 20px rgba(220, 20, 60, 0.1)'
          }
        case 'vibrant-garden':
          return {
            borderColor: '#FF1493',
            borderWidth: '3px',
            borderStyle: 'solid',
            borderRadius: '22px',
            boxShadow: '0 0 24px rgba(255, 20, 147, 0.35), inset 0 0 24px rgba(255, 20, 147, 0.1)'
          }
        case 'sunset-bloom':
          return {
            borderColor: '#FF6347',
            borderWidth: '3px',
            borderStyle: 'solid',
            borderRadius: '19px',
            boxShadow: '0 0 21px rgba(255, 99, 71, 0.3), inset 0 0 21px rgba(255, 99, 71, 0.1)'
          }
        case 'spring-celebration':
          return {
            borderColor: '#00CED1',
            borderWidth: '3px',
            borderStyle: 'solid',
            borderRadius: '17px',
            boxShadow: '0 0 19px rgba(0, 206, 209, 0.3), inset 0 0 19px rgba(0, 206, 209, 0.1)'
          }
        case 'floral-elegance':
          return {
            borderColor: '#9370DB',
            borderWidth: '4px',
            borderStyle: 'solid',
            borderRadius: '14px',
            boxShadow: '0 0 23px rgba(147, 112, 219, 0.4), inset 0 0 23px rgba(147, 112, 219, 0.1)'
          }
        case 'blooming-garden':
          return {
            borderColor: '#FF69B4',
            borderWidth: '3px',
            borderStyle: 'solid',
            borderRadius: '21px',
            boxShadow: '0 0 20px rgba(255, 105, 180, 0.3), inset 0 0 20px rgba(255, 105, 180, 0.1)'
          }
        default:
          return {
            borderColor: '#FF6B35',
            borderWidth: '3px',
            borderStyle: 'solid',
            borderRadius: '16px',
            boxShadow: '0 0 20px rgba(255, 107, 53, 0.3), inset 0 0 20px rgba(255, 107, 53, 0.1)'
          }
      }
    }

    const getTemplateConfig = (templateId: string) => {
      switch (templateId) {
        case 'meskel-flowers':
          return {
            color: '#2C1810',
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)',
            fontFamily: 'Georgia, serif'
          }
        case 'yellow-garden':
          return {
            color: '#8B4513',
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.9)',
            fontFamily: 'Times New Roman, serif'
          }
        case 'golden-sunrise':
          return {
            color: '#1A1A1A',
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.7)',
            fontFamily: 'Arial, sans-serif'
          }
        case 'ethiopian-spring':
          return {
            color: '#2F4F2F',
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)',
            fontFamily: 'Verdana, sans-serif'
          }
        case 'classic-meskel':
          return {
            color: '#8B0000',
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.9)',
            fontFamily: 'Georgia, serif'
          }
        case 'vibrant-garden':
          return {
            color: '#4B0082',
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)',
            fontFamily: 'Arial, sans-serif'
          }
        case 'sunset-bloom':
          return {
            color: '#8B0000',
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.7)',
            fontFamily: 'Times New Roman, serif'
          }
        case 'spring-celebration':
          return {
            color: '#006400',
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)',
            fontFamily: 'Verdana, sans-serif'
          }
        case 'floral-elegance':
          return {
            color: '#4B0082',
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.9)',
            fontFamily: 'Georgia, serif'
          }
        case 'blooming-garden':
          return {
            color: '#8B008B',
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)',
            fontFamily: 'Arial, sans-serif'
          }
        default:
          return {
            color: '#2C1810',
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)',
            fontFamily: 'Georgia, serif'
          }
      }
    }

    const templateStyle = getTemplateStyle(template)
    const borderConfig = getBorderConfig(template.id)
    const textConfig = getTemplateConfig(template.id)

    return (
      <div
        ref={ref}
        className="relative mobile-card-preview w-64 h-80 md:w-80 md:h-96 mx-auto"
        style={{
          ...templateStyle,
          ...borderConfig,
          position: 'relative',
          overflow: 'hidden',
          imageRendering: 'auto',
          textRendering: 'optimizeLegibility',
          fontDisplay: 'block'
        }}
        data-background={template.background}
      >
        {/* Background Overlay for better text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%)'
          }}
        />

        {/* Decorative Elements */}
        <FlowerDecoration 
          src="/images/flowers/EF.jpg" 
          alt="Ethiopian New Year Decoration"
          className="absolute top-4 right-4 opacity-60"
          animation="float"
          size="medium"
        />

        {/* Main Content */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-center items-center text-center">
          {/* Amharic Greeting */}
          {card.amharicMessage && (
            <div 
              className="mb-4 text-lg font-bold"
              style={{
                ...textConfig,
                color: card.amharicTextColor || textConfig.color,
                fontFamily: 'Arial, sans-serif',
                fontSize: '18px',
                lineHeight: '1.4'
              }}
            >
              {card.amharicMessage}
            </div>
          )}

          {/* English Message */}
          <div 
            className="mb-4 text-xl font-bold"
            style={{
              ...textConfig,
              color: card.textColor || textConfig.color,
              fontSize: '20px',
              lineHeight: '1.3'
            }}
          >
            {card.message}
          </div>

          {/* Name */}
          {card.name && (
            <div 
              className="text-lg font-semibold"
              style={{
                ...textConfig,
                color: card.nameTextColor || textConfig.color,
                fontSize: '16px',
                lineHeight: '1.2'
              }}
            >
              - {card.name}
            </div>
          )}

          {/* Year */}
          <div 
            className="mt-4 text-sm font-medium"
            style={{
              ...textConfig,
              fontSize: '14px',
              opacity: 0.8
            }}
          >
            {new Date().getFullYear()}
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-2 left-2 text-2xl opacity-60">🌺</div>
        <div className="absolute top-2 right-2 text-2xl opacity-60">🌺</div>
        <div className="absolute bottom-2 left-2 text-2xl opacity-60">🌺</div>
        <div className="absolute bottom-2 right-2 text-2xl opacity-60">🌺</div>
      </div>
    )
  }
)

ExportableCard.displayName = 'ExportableCard'

export default ExportableCard