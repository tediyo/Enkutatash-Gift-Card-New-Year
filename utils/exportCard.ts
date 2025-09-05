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

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#000000', // White background for better compatibility
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      logging: false, // Disable logging for cleaner output
      width: options.width || element.offsetWidth,
      height: options.height || element.offsetHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.offsetWidth,
      windowHeight: element.offsetHeight
    })

    // Restore original styles
    element.style.display = originalDisplay
    element.style.visibility = originalVisibility
    element.style.position = originalPosition

    const dataUrl = canvas.toDataURL(`image/${options.format}`, options.quality)
    
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
