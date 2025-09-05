'use client'

import React, { forwardRef } from 'react'
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
            borderRadius: '24px',
            boxShadow: '0 0 30px rgba(255, 140, 0, 0.5), inset 0 0 30px rgba(255, 140, 0, 0.1)'
          }
        case 'ethiopian-spring':
          return {
            borderColor: '#FF6347',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderRadius: '18px',
            boxShadow: '0 0 15px rgba(255, 99, 71, 0.3), inset 0 0 15px rgba(255, 99, 71, 0.1)'
          }
        case 'classic-meskel':
          return {
            borderColor: '#CD853F',
            borderWidth: '5px',
            borderStyle: 'groove',
            borderRadius: '12px',
            boxShadow: '0 0 35px rgba(205, 133, 63, 0.4), inset 0 0 35px rgba(205, 133, 63, 0.1)'
          }
        case 'vibrant-garden':
          return {
            borderColor: '#FF4500',
            borderWidth: '4px',
            borderStyle: 'solid',
            borderRadius: '28px',
            boxShadow: '0 0 40px rgba(255, 69, 0, 0.6), inset 0 0 40px rgba(255, 69, 0, 0.1)'
          }
        case 'sunset-bloom':
          return {
            borderColor: '#FF7F50',
            borderWidth: '3px',
            borderStyle: 'ridge',
            borderRadius: '22px',
            boxShadow: '0 0 25px rgba(255, 127, 80, 0.4), inset 0 0 25px rgba(255, 127, 80, 0.1)'
          }
        case 'spring-celebration':
          return {
            borderColor: '#FF1493',
            borderWidth: '6px',
            borderStyle: 'double',
            borderRadius: '32px',
            boxShadow: '0 0 45px rgba(255, 20, 147, 0.5), inset 0 0 45px rgba(255, 20, 147, 0.1)'
          }
        case 'elegance':
          return {
            borderColor: '#DA70D6',
            borderWidth: '3px',
            borderStyle: 'solid',
            borderRadius: '20px',
            boxShadow: '0 0 25px rgba(218, 112, 214, 0.4), inset 0 0 25px rgba(218, 112, 214, 0.1)'
          }
        case 'blooming':
          return {
            borderColor: '#32CD32',
            borderWidth: '4px',
            borderStyle: 'solid',
            borderRadius: '26px',
            boxShadow: '0 0 30px rgba(50, 205, 50, 0.4), inset 0 0 30px rgba(50, 205, 50, 0.1)'
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
            fontFamily: "'Playfair Display', serif",
            textColor: '#8B4513',
            accentColor: '#FF6B35',
            backgroundColor: '#FFF8DC'
          }
        case 'yellow-garden':
          return {
            fontFamily: "'Dancing Script', cursive",
            textColor: '#2F4F2F',
            accentColor: '#FFD700',
            backgroundColor: '#F0FFF0'
          }
        case 'golden-sunrise':
          return {
            fontFamily: "'Pacifico', cursive",
            textColor: '#8B4513',
            accentColor: '#FF8C00',
            backgroundColor: '#FFFACD'
          }
        case 'ethiopian-spring':
          return {
            fontFamily: "'Lobster', cursive",
            textColor: '#228B22',
            accentColor: '#FF6347',
            backgroundColor: '#F0F8FF'
          }
        case 'classic-meskel':
          return {
            fontFamily: "'Cinzel', serif",
            textColor: '#B8860B',
            accentColor: '#CD853F',
            backgroundColor: '#F5F5DC'
          }
        case 'vibrant-garden':
          return {
            fontFamily: "'Fredoka One', cursive",
            textColor: '#8B0000',
            accentColor: '#FF4500',
            backgroundColor: '#FFE4B5'
          }
        case 'sunset-bloom':
          return {
            fontFamily: "'Righteous', cursive",
            textColor: '#8B4513',
            accentColor: '#FF7F50',
            backgroundColor: '#FFEBCD'
          }
        case 'spring-celebration':
          return {
            fontFamily: "'Bungee', cursive",
            textColor: '#2E8B57',
            accentColor: '#FF1493',
            backgroundColor: '#F0FFFF'
          }
        case 'floral-elegance':
          return {
            fontFamily: "'Playfair Display', serif",
            textColor: '#8B008B',
            accentColor: '#DA70D6',
            backgroundColor: '#F8F8FF'
          }
        case 'blooming-garden':
          return {
            fontFamily: "'Dancing Script', cursive",
            textColor: '#006400',
            accentColor: '#32CD32',
            backgroundColor: '#F0FFF0'
          }
        default:
          return {
            fontFamily: "'Playfair Display', serif",
            textColor: '#8B4513',
            accentColor: '#FF6B35',
            backgroundColor: '#FFF8DC'
          }
      }
    }

    const getTemplateStyle = (template: CardTemplate) => {
      const baseStyle = {
        backgroundImage: `url(${template.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f0f0f0'
      }

      const templateConfig = getTemplateConfig(template.id)

      const finalStyle = {
        ...baseStyle,
        ...templateConfig
      }

      // Debug logging
      console.log('ExportableCard template style:', {
        templateId: template.id,
        background: template.background,
        backgroundImage: finalStyle.backgroundImage,
        backgroundColor: finalStyle.backgroundColor
      })

      return finalStyle
    }

    // Preload the background image to ensure it's available
    React.useEffect(() => {
      if (template.background) {
        const img = new Image()
        img.src = template.background
        img.onload = () => {
          console.log('Background image loaded for export:', template.background)
        }
        img.onerror = () => {
          console.error('Failed to load background image for export:', template.background)
        }
      }
    }, [template.background])

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
      case 'classic':
        return {
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 81, 7, 0.8) 10px, transparent 10px),
            radial-gradient(circle at 75% 25%, rgba(255, 215, 0, 0.6) 8px, transparent 8px),
            radial-gradient(circle at 25% 75%, rgba(255, 140, 0, 0.7) 12px, transparent 12px),
            radial-gradient(circle at 75% 75%, rgba(255, 165, 0, 0.5) 9px, transparent 9px),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 15px, transparent 15px)
          `,
          backgroundSize: '80px 80px, 60px 60px, 90px 90px, 70px 70px, 100px 100px',
          backgroundColor: '#1a1a1a'
        }
      case 'vibrant':
        return {
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.6) 6px, transparent 6px),
            radial-gradient(circle at 80% 20%, rgba(255, 140, 0, 0.5) 8px, transparent 8px),
            radial-gradient(circle at 20% 80%, rgba(255, 165, 0, 0.7) 7px, transparent 7px),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 0, 0.4) 9px, transparent 9px),
            linear-gradient(30deg, transparent 30%, rgba(255, 215, 0, 0.3) 30%, rgba(255, 140, 0, 0.3) 70%, transparent 70%)
          `,
          backgroundSize: '50px 50px, 65px 65px, 55px 55px, 75px 75px, 30px 30px',
          backgroundColor: '#2d1b00'
        }
      case 'sunset':
        return {
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(255, 140, 0, 0.6) 0%, transparent 70%),
            radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.4) 8px, transparent 8px),
            radial-gradient(circle at 70% 70%, rgba(255, 165, 0, 0.5) 10px, transparent 10px),
            radial-gradient(circle at 20% 80%, rgba(255, 81, 7, 0.3) 6px, transparent 6px),
            linear-gradient(60deg, transparent 40%, rgba(255, 140, 0, 0.2) 40%, rgba(255, 215, 0, 0.2) 60%, transparent 60%)
          `,
          backgroundSize: '100% 100%, 60px 60px, 80px 80px, 50px 50px, 25px 25px',
          backgroundColor: '#1a0f00'
        }
      case 'celebration':
        return {
          backgroundImage: `
            radial-gradient(circle at 15% 15%, rgba(255, 215, 0, 0.5) 8px, transparent 8px),
            radial-gradient(circle at 85% 15%, rgba(255, 140, 0, 0.4) 10px, transparent 10px),
            radial-gradient(circle at 15% 85%, rgba(255, 165, 0, 0.6) 7px, transparent 7px),
            radial-gradient(circle at 85% 85%, rgba(255, 255, 0, 0.3) 9px, transparent 9px),
            radial-gradient(circle at 50% 20%, rgba(255, 81, 7, 0.4) 6px, transparent 6px),
            radial-gradient(circle at 50% 80%, rgba(255, 215, 0, 0.5) 8px, transparent 8px),
            linear-gradient(45deg, transparent 25%, rgba(255, 140, 0, 0.2) 25%, rgba(255, 215, 0, 0.2) 75%, transparent 75%)
          `,
          backgroundSize: '70px 70px, 85px 85px, 65px 65px, 90px 90px, 55px 55px, 75px 75px, 35px 35px',
          backgroundColor: '#0d0d0d'
        }
      case 'elegance':
        return {
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(218, 112, 214, 0.4) 6px, transparent 6px),
            radial-gradient(circle at 80% 30%, rgba(147, 0, 211, 0.3) 8px, transparent 8px),
            radial-gradient(circle at 30% 80%, rgba(186, 85, 211, 0.35) 7px, transparent 7px),
            radial-gradient(circle at 70% 70%, rgba(221, 160, 221, 0.25) 9px, transparent 9px),
            linear-gradient(30deg, transparent 30%, rgba(218, 112, 214, 0.2) 30%, rgba(147, 0, 211, 0.2) 70%, transparent 70%)
          `,
          backgroundSize: '50px 50px, 65px 65px, 55px 55px, 75px 75px, 30px 30px',
          backgroundColor: '#1a0a1a'
        }
      case 'blooming':
        return {
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(50, 205, 50, 0.5) 8px, transparent 8px),
            radial-gradient(circle at 75% 25%, rgba(34, 139, 34, 0.4) 10px, transparent 10px),
            radial-gradient(circle at 25% 75%, rgba(0, 100, 0, 0.6) 7px, transparent 7px),
            radial-gradient(circle at 75% 75%, rgba(144, 238, 144, 0.3) 9px, transparent 9px),
            radial-gradient(circle at 50% 50%, rgba(50, 205, 50, 0.2) 12px, transparent 12px),
            linear-gradient(60deg, transparent 40%, rgba(50, 205, 50, 0.2) 40%, rgba(34, 139, 34, 0.2) 60%, transparent 60%)
          `,
          backgroundSize: '60px 60px, 80px 80px, 70px 70px, 90px 90px, 100px 100px, 25px 25px',
          backgroundColor: '#0a1a0a'
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
          ...getTemplateStyle(template),
          ...getBorderConfig(template.id),
          // Ensure proper rendering for html2canvas
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          // Additional styles for better capture
          opacity: 1,
          visibility: 'visible',
          display: 'block',
          // Force background image to be visible
          backgroundImage: `url(${template.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        data-template={template.id}
        data-background={template.background}
        id="exportable-card"
      >
        {/* Static Decorative Elements - No animations for export */}
        <div className="absolute top-6 right-6">
          <div className="w-16 h-16 rounded-full overflow-hidden shadow-md opacity-80">
            <img 
              src={template.background} 
              alt={`${template.name} Background`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="absolute top-6 left-6">
          <div className="w-16 h-16 rounded-full overflow-hidden shadow-md opacity-70">
            <img 
              src={template.background} 
              alt={`${template.name} Background`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute bottom-6 right-6">
          <div className="text-xl">
            🎊
          </div>
        </div>

        <div className="absolute bottom-6 left-6">
          <div className="w-16 h-16 rounded-full overflow-hidden shadow-md opacity-60">
            <img 
              src={template.background} 
              alt={`${template.name} Background`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute top-1/2 left-6">
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-md opacity-50">
            <img 
              src={template.background} 
              alt={`${template.name} Background`}
              className="w-full h-full object-cover"
            />
          </div>
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

        {/* Additional static flower decorations */}
        <div className="absolute top-1/3 right-1/4">
          <div className="w-8 h-8 rounded-full overflow-hidden shadow-md opacity-40">
            <img 
              src={template.background} 
              alt={`${template.name} Background`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute bottom-1/3 left-1/3">
          <div className="w-8 h-8 rounded-full overflow-hidden shadow-md opacity-30">
            <img 
              src={template.background} 
              alt={`${template.name} Background`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute top-1/4 left-1/4">
          <div className="w-8 h-8 rounded-full overflow-hidden shadow-md opacity-20">
            <img 
              src={template.background} 
              alt={`${template.name} Background`}
              className="w-full h-full object-cover"
            />
          </div>
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
            <div 
              className="text-2xl font-amharic mb-6 text-shadow"
              style={{ 
                color: getTemplateConfig(template.id).accentColor,
                fontFamily: getTemplateConfig(template.id).fontFamily,
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
              }}
            >
              {card.amharicMessage}
            </div>
          )}

          {/* English Message */}
          <div 
            className="text-3xl font-bold mb-6 text-shadow"
            style={{ 
              color: getTemplateConfig(template.id).textColor,
              fontFamily: getTemplateConfig(template.id).fontFamily,
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            {card.message || 'Happy Ethiopian New Year!'}
          </div>

          {/* Name */}
          {card.name && (
            <div 
              className="text-2xl font-semibold text-shadow mb-4"
              style={{ 
                color: getTemplateConfig(template.id).accentColor,
                fontFamily: getTemplateConfig(template.id).fontFamily,
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
              }}
            >
              - {card.name}
            </div>
          )}

          {/* Year */}
          <div 
            className="absolute bottom-6 left-6 text-lg opacity-80"
            style={{ 
              color: getTemplateConfig(template.id).textColor,
              fontFamily: getTemplateConfig(template.id).fontFamily,
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
            }}
          >
            2024
          </div>
        </div>

      </div>
    )
  }
)

ExportableCard.displayName = 'ExportableCard'

export default ExportableCard
