/**
 * Shared PDF generation utility.
 * Used by both the download route and the email service (for post-payment attachments).
 */

export async function generatePDF(content: string, title: string): Promise<Buffer> {
  const PDFDocument = (await import("pdfkit")).default
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 72, size: "LETTER" })
    const chunks: Buffer[] = []

    doc.on("data", (chunk: Buffer) => chunks.push(chunk))
    doc.on("end", () => resolve(Buffer.concat(chunks)))
    doc.on("error", reject)

    const lines = content.split("\n")

    // Document title
    doc.fontSize(16).font("Helvetica-Bold").text(title, { align: "center" })
    doc.moveDown(1.5)

    for (const line of lines) {
      const trimmed = line.trim()

      if (!trimmed) {
        doc.moveDown(0.5)
        continue
      }

      // Section headings: all-caps or starts with a number + period
      const isHeading = /^[A-Z\s]{5,}$/.test(trimmed) || /^\d+\.\s+[A-Z]/.test(trimmed)

      if (isHeading) {
        doc.moveDown(0.5)
        doc.fontSize(11).font("Helvetica-Bold").text(trimmed, { align: "left" })
        doc.moveDown(0.3)
      } else {
        doc.fontSize(10).font("Helvetica").text(trimmed, {
          align: "justify",
          lineGap: 2,
        })
        doc.moveDown(0.3)
      }
    }

    doc.end()
  })
}
