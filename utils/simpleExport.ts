// Alternative simple export method
export const simpleExportCard = async (element: HTMLElement, scale: number = 4): Promise<string> => {
  // Create a canvas element
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  if (!ctx) {
    throw new Error('Could not get canvas context')
  }

  // Set canvas size with higher resolution
  const scaleFactor = scale // Use provided scale
  canvas.width = element.offsetWidth * scaleFactor
  canvas.height = element.offsetHeight * scaleFactor

  // Scale the context
  ctx.scale(scaleFactor, scaleFactor)

  // Create a temporary container to render the element
  const tempContainer = document.createElement('div')
  tempContainer.style.cssText = `
    position: absolute;
    top: -10000px;
    left: -10000px;
    width: ${element.offsetWidth}px;
    height: ${element.offsetHeight}px;
    background: white;
  `

  // Clone the element
  const clonedElement = element.cloneNode(true) as HTMLElement
  clonedElement.style.cssText = element.style.cssText
  clonedElement.style.position = 'static'
  clonedElement.style.transform = 'none'
  
  tempContainer.appendChild(clonedElement)
  document.body.appendChild(tempContainer)

  try {
    // Use html2canvas on the temporary container
    const html2canvas = (await import('html2canvas')).default
    const canvasResult = await html2canvas(tempContainer, {
      backgroundColor: '#ffffff',
      scale: scale, // Use provided scale
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight,
      pixelRatio: window.devicePixelRatio || 1,
      letterRendering: true,
      imageTimeout: 45000
    })

    return canvasResult.toDataURL('image/png', 1)
  } finally {
    // Clean up
    document.body.removeChild(tempContainer)
  }
}

// Fallback method using canvas API directly
export const canvasExportCard = (element: HTMLElement, scale: number = 4): string => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  if (!ctx) {
    throw new Error('Could not get canvas context')
  }

  // Set canvas size with higher resolution
  const scaleFactor = scale // Use provided scale
  canvas.width = element.offsetWidth * scaleFactor
  canvas.height = element.offsetHeight * scaleFactor

  // Scale the context
  ctx.scale(scaleFactor, scaleFactor)

  // Fill with white background
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, element.offsetWidth, element.offsetHeight)

  // Draw a simple card
  ctx.fillStyle = '#ff6b35'
  ctx.fillRect(20, 20, element.offsetWidth - 40, element.offsetHeight - 40)
  
  // Add text
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 24px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('Happy Ethiopian New Year!', element.offsetWidth / 2, element.offsetHeight / 2)
  
  ctx.font = '16px Arial'
  ctx.fillText('Enkutatash 2024', element.offsetWidth / 2, element.offsetHeight / 2 + 40)

  return canvas.toDataURL('image/png', 1)
}