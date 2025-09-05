'use client'

import { useState } from 'react'
import { exportCard, downloadCard, generateFilename } from '@/utils/exportCard'

export default function ExportTest() {
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<string>('')

  const testExport = async () => {
    setIsTesting(true)
    setTestResult('')
    
    try {
      // Create a simple test element
      const testDiv = document.createElement('div')
      testDiv.id = 'test-export-element'
      testDiv.style.cssText = `
        width: 200px;
        height: 200px;
        background: linear-gradient(45deg, #ff6b35, #f7931e);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: bold;
        border-radius: 10px;
        position: absolute;
        top: -1000px;
        left: -1000px;
      `
      testDiv.textContent = 'Test Card'
      
      document.body.appendChild(testDiv)
      
      // Wait for element to be rendered
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Test export
      const dataUrl = await exportCard('test-export-element', {
        format: 'png',
        quality: 1
      })
      
      // Clean up
      document.body.removeChild(testDiv)
      
      if (dataUrl && dataUrl.length > 100) {
        setTestResult('✅ Export test successful! Data URL length: ' + dataUrl.length)
        
        // Test download
        const filename = generateFilename('test', 'png')
        downloadCard(dataUrl, filename)
        
        setTimeout(() => {
          setTestResult(prev => prev + '\n✅ Download test completed!')
        }, 1000)
      } else {
        setTestResult('❌ Export failed: Invalid data URL')
      }
      
    } catch (error) {
      setTestResult('❌ Export test failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
      console.error('Export test error:', error)
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Export Test</h3>
      <button
        onClick={testExport}
        disabled={isTesting}
        className="btn-primary mb-4"
      >
        {isTesting ? 'Testing...' : 'Test Export Functionality'}
      </button>
      
      {testResult && (
        <div className="text-sm font-mono bg-white p-3 rounded border">
          <pre>{testResult}</pre>
        </div>
      )}
    </div>
  )
}
