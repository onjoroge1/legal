import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { Document, Packer, Paragraph, TextRun } from 'docx'

export const convertToPDF = async (content: string, title: string): Promise<Blob> => {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create()
  let page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  
  // Load the standard font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  
  // Set up the text
  const fontSize = 11
  const titleSize = 16
  const lineHeight = fontSize * 1.5
  const margin = 50
  const textWidth = width - 2 * margin
  let y = height - margin
  
  // Helper function to wrap text
  const wrapText = (text: string, font: typeof titleFont, fontSize: number, maxWidth: number): string[] => {
    const words = text.split(' ')
    const lines: string[] = []
    let currentLine = words[0]

    for (let i = 1; i < words.length; i++) {
      const word = words[i]
      const width = font.widthOfTextAtSize(currentLine + ' ' + word, fontSize)
      
      if (width < maxWidth) {
        currentLine += ' ' + word
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    }
    lines.push(currentLine)
    return lines
  }

  // Helper function to add text with proper spacing
  const addText = (text: string, options: {
    font: typeof titleFont,
    fontSize: number,
    isBold?: boolean,
    center?: boolean
  }) => {
    const lines = wrapText(text, options.font, options.fontSize, textWidth)
    
    for (const line of lines) {
      if (y < margin + lineHeight) {
        page = pdfDoc.addPage()
        y = height - margin
      }

      const textWidth = options.font.widthOfTextAtSize(line, options.fontSize)
      const x = options.center ? (width - textWidth) / 2 : margin

      page.drawText(line, {
        x,
        y,
        size: options.fontSize,
        font: options.font,
        color: rgb(0, 0, 0),
      })
      
      y -= lineHeight
    }
    
    // Add extra space after paragraphs
    y -= lineHeight / 2
  }

  // Add title
  addText(title.toUpperCase(), {
    font: titleFont,
    fontSize: titleSize,
    isBold: true,
    center: true
  })

  // Process content
  const paragraphs = content.split('\n').filter(line => line.trim() !== '')
  
  for (const paragraph of paragraphs) {
    // Handle special formatting
    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
      // Bold text
      addText(paragraph.replace(/\*\*/g, ''), {
        font: titleFont,
        fontSize: fontSize,
        isBold: true
      })
    } else if (paragraph.startsWith('#')) {
      // Headers
      const headerText = paragraph.replace(/^#+\s*/, '')
      addText(headerText.toUpperCase(), {
        font: titleFont,
        fontSize: fontSize + 2,
        isBold: true,
        center: true
      })
    } else {
      // Regular text
      addText(paragraph, {
        font: font,
        fontSize: fontSize
      })
    }
  }
  
  // Save the PDF
  const pdfBytes = await pdfDoc.save()
  return new Blob([pdfBytes], { type: 'application/pdf' })
}

export const convertToDOCX = async (content: string, title: string): Promise<Blob> => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: title.toUpperCase(),
              bold: true,
              size: 32, // ~16pt
            }),
          ],
          spacing: {
            after: 400,
          },
        }),
        ...content.split('\n').filter(line => line.trim() !== '').map(line => {
          if (line.startsWith('**') && line.endsWith('**')) {
            return new Paragraph({
              children: [
                new TextRun({
                  text: line.replace(/\*\*/g, ''),
                  bold: true,
                  size: 24, // ~12pt
                }),
              ],
              spacing: {
                before: 200,
                after: 200,
              },
            })
          } else if (line.startsWith('#')) {
            return new Paragraph({
              children: [
                new TextRun({
                  text: line.replace(/^#+\s*/, '').toUpperCase(),
                  bold: true,
                  size: 28, // ~14pt
                }),
              ],
              spacing: {
                before: 300,
                after: 200,
              },
            })
          } else {
            return new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  size: 24, // ~12pt
                }),
              ],
              spacing: {
                after: 200,
              },
            })
          }
        }),
      ],
    }],
  })

  const buffer = await Packer.toBlob(doc)
  return buffer
} 