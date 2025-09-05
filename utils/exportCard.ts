import html2canvas from 'html2canvas'

export interface ExportOptions {
  format: 'png' | 'jpeg'
  quality: number
  width?: number
  height?: number
}

export const exportCard = async (
  elementId: string, 
  options: ExportOptions = { format: 'png', quality: 1 }
): Promise<string> => {
  const element = document.getElementById(elementId)
  
  if (!element) {
    throw new Error('Card element not found')
  }

  // Temporarily make the element visible for html2canvas
  const originalDisplay = element.style.display
  const originalVisibility = element.style.visibility
  const originalPosition = element.style.position
  
  element.style.display = 'block'
  element.style.visibility = 'visible'
  element.style.position = 'static'

  // Ensure the element is properly visible and styled
  element.style.visibility = 'visible'
  element.style.position = 'static'
  element.style.opacity = '1'
  element.style.transform = 'none'
  element.style.zIndex = '9999'
  
  // Force a reflow to ensure styles are applied
  element.offsetHeight

  // Ensure background image is fully loaded
  const backgroundUrl = element.getAttribute('data-background')
  if (backgroundUrl) {
    try {
      await new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          console.log('Background image loaded successfully:', backgroundUrl)
          resolve(true)
        }
        img.onerror = () => {
          console.warn('Failed to load background image:', backgroundUrl)
          resolve(false) // Don't reject, just continue
        }
        img.src = backgroundUrl
      })
    } catch (error) {
      console.warn('Error preloading background image:', error)
    }
  }

  // Wait for background images to load
  await new Promise(resolve => setTimeout(resolve, 1000))

  try {
    console.log('🚀 Starting simple html2canvas export...')
    
    const canvas = await html2canvas(element, {
      backgroundColor: null, // Keep original background
      scale: 4, // Much higher resolution for better quality
      useCORS: true,
      allowTaint: true,
      logging: false, // Disable logging for cleaner output
      width: options.width || element.offsetWidth,
      height: options.height || element.offsetHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.offsetWidth,
      windowHeight: element.offsetHeight,
      imageTimeout: 30000, // Increase timeout for images to load
      removeContainer: false, // Keep container for proper rendering
      foreignObjectRendering: false, // Disable this as it can cause issues
      pixelRatio: window.devicePixelRatio || 1, // Use device pixel ratio for crisp images
      letterRendering: true, // Better text rendering
      onclone: (clonedDoc) => {
        // Ensure fonts are loaded in cloned document
        const clonedElement = clonedDoc.getElementById(element.id)
        if (clonedElement) {
          clonedElement.style.fontFamily = getComputedStyle(element).fontFamily
        }
      }
    })

    console.log('✅ html2canvas export completed')
    console.log('📊 Canvas dimensions:', canvas.width, 'x', canvas.height)

    // Restore original styles
    element.style.display = originalDisplay
    element.style.visibility = originalVisibility
    element.style.position = originalPosition

    const dataUrl = canvas.toDataURL(`image/${options.format}`, options.quality)
    
    // Debug: Log canvas dimensions and data URL info
    console.log('📊 Final canvas dimensions:', canvas.width, 'x', canvas.height)
    console.log('📄 Data URL length:', dataUrl.length)
    console.log('🔗 Data URL preview:', dataUrl.substring(0, 100) + '...')
    
    // Validate the data URL
    if (!dataUrl || dataUrl === 'data:,') {
      throw new Error('Failed to generate image data')
    }

    return dataUrl
  } catch (error) {
    // Restore original styles even if there's an error
    element.style.display = originalDisplay
    element.style.visibility = originalVisibility
    element.style.position = originalPosition
    
    console.error('Error exporting card:', error)
    throw new Error(`Failed to export card: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const downloadCard = (dataUrl: string, filename: string) => {
  try {
    // Validate data URL
    if (!dataUrl || dataUrl === 'data:,') {
      throw new Error('Invalid image data')
    }

    const link = document.createElement('a')
    link.download = filename
    link.href = dataUrl
    link.style.display = 'none'
    
    document.body.appendChild(link)
    link.click()
    
    // Clean up after a short delay
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link)
      }
    }, 100)
    
    console.log('Download started:', filename)
  } catch (error) {
    console.error('Error downloading card:', error)
    throw new Error('Failed to download card')
  }
}

export const generateFilename = (name: string, format: string): string => {
  const timestamp = new Date().toISOString().split('T')[0]
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
  return `enkutatash_${cleanName}_${timestamp}.${format}`
}
