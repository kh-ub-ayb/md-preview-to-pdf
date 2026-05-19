export const exportPDF = (
  elementId: string,
  filename: string = 'markdown-preview.pdf',
  setExporting?: (state: boolean) => void
): void => {
  if (setExporting) setExporting(true);
  
  const element = document.getElementById(elementId);
  if (!element) {
    if (setExporting) setExporting(false);
    return;
  }

  const opt: any = {
    margin: [15, 15, 15, 15], // generous A4 margins: top, left, bottom, right
    filename: filename,
    image: { type: 'jpeg', quality: 1.0 },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      logging: false,
      scrollY: 0,
      windowWidth: element.scrollWidth // prevents mobile styling if window is resized
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] }
  };

  // @ts-ignore
  import('html2pdf.js').then((html2pdfModule) => {
    const html2pdf = html2pdfModule.default || html2pdfModule;
    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        if (setExporting) setExporting(false);
      })
      .catch((err: any) => {
        console.error('Error exporting PDF:', err);
        if (setExporting) setExporting(false);
      });
  });
};
