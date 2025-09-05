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

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      width: options.width,
      height: options.height,
      ...(options.format === 'jpeg' && { 
        backgroundColor: '#ffffff' // White background for JPEG
      })
    })

    return canvas.toDataURL(`image/${options.format}`, options.quality)
  } catch (error) {
    console.error('Error exporting card:', error)
    throw new Error('Failed to export card')
  }
}

export const downloadCard = (dataUrl: string, filename: string) => {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const generateFilename = (name: string, format: string): string => {
  const timestamp = new Date().toISOString().split('T')[0]
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
  return `enkutatash_${cleanName}_${timestamp}.${format}`
}
