import { Document, Packer, Paragraph, TextRun } from 'docx';
import PDFDocument from 'pdfkit';

export const convertToPDF = (content: string, title: string): Promise<Blob> => {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const chunks: Uint8Array[] = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => {
      const result = new Blob(chunks, { type: 'application/pdf' });
      resolve(result);
    });

    // Add title
    doc.fontSize(20).text(title, { align: 'center' });
    doc.moveDown();

    // Add content
    doc.fontSize(12).text(content, {
      align: 'left',
      lineGap: 5
    });

    doc.end();
  });
};

export const convertToDOCX = async (content: string, title: string): Promise<Blob> => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: title,
              bold: true,
              size: 28,
            }),
          ],
          alignment: 'center',
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: content,
              size: 24,
            }),
          ],
        }),
      ],
    }],
  });

  const buffer = await Packer.toBlob(doc);
  return buffer;
}; 