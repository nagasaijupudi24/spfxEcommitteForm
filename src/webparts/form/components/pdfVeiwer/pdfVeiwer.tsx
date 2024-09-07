/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect, useRef } from 'react';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

// Set the worker source for pdfjs-dist
GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface PDFViewProps {
  pdfLink: string;
}

const PDFView: React.FC<PDFViewProps> = ({ pdfLink }) => {
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1.0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fetch the PDF document when the pdfLink changes
  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const loadingTask = getDocument(pdfLink);
        const pdf = await loadingTask.promise;
        console.log('PDF loaded:', pdf);
        console.log('Number of pages:', pdf.numPages);
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setPageNumber(1); // Reset to the first page
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchPDF();
  }, [pdfLink]);

  // Render the current page whenever pageNumber, pdfDoc, or scale changes
  useEffect(() => {
    const renderPage = async (pageNum: number) => {
      if (pdfDoc && canvasRef.current) {
        try {
          const page = await pdfDoc.getPage(pageNum);
          console.log('Rendering page:', pageNum);
          const viewport = page.getViewport({ scale });
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');

          if (context) {
            // Set the canvas dimensions based on the page viewport
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
              canvasContext: context,
              viewport,
            };

            // Render the page into the canvas
            await page.render(renderContext).promise;
          }
        } catch (error) {
          console.error('Error rendering page:', error);
        }
      }
    };

    renderPage(pageNumber);
  }, [pdfDoc, pageNumber, scale]);

  // Zoom in by increasing the scale
  const zoomIn = () => setScale((prevScale) => Math.min(prevScale + 0.1, 2.0));

  // Zoom out by decreasing the scale
  const zoomOut = () => setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));

  // Go to the previous page if not on the first page
  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPage) => prevPage - 1);
    }
  };

  // Go to the next page if not on the last page
  const goToNextPage = () => {
    if (numPages && pageNumber < numPages) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Toolbar for zoom and navigation */}
      <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', background: '#f4f4f4' }}>
        <div>
          <button onClick={zoomOut}>-</button>
          <button onClick={zoomIn}>+</button>
        </div>
        <div>
          <button onClick={goToPreviousPage} disabled={pageNumber <= 1}>
            Previous
          </button>
          <span>
            Page {pageNumber} of {numPages || 0}
          </span>
          <button onClick={goToNextPage} disabled={pageNumber >= (numPages || 1)}>
            Next
          </button>
        </div>
      </div>

      {/* PDF Canvas for rendering the page */}
      <div
        style={{
          flexGrow: 1,
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <canvas ref={canvasRef} style={{ border: '1px solid #ccc' }} />
      </div>
    </div>
  );
};

export default PDFView;
