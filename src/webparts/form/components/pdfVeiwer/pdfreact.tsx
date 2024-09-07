/* eslint-disable react/self-closing-comp */
import * as React from 'react';
import * as pdfjsLib from 'pdfjs-dist';

export interface IPdfViewerProps {
  pdfUrl: string;
}

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const PdfViewer: React.FC<IPdfViewerProps> = ({ pdfUrl }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [pdf, setPdf] = React.useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [scale, setScale] = React.useState(1.1); // Default scale set to 1.1

  React.useEffect(() => {
    const container = containerRef.current;
    if (container) {
      try {
        const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
        loadingTask.promise.then((loadedPdf) => {
          setPdf(loadedPdf);
        }).catch(error => {
          console.error('Error loading PDF:', error);
        });
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    }
  }, [pdfUrl]);

  const renderPage = (pageNum: number) => {
    const container = containerRef.current;
    if (container && pdf) {
      pdf.getPage(pageNum).then((page) => {
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (context) {
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          container.innerHTML = '';  // Clear previous page
          container.appendChild(canvas);

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          page.render(renderContext);
        } else {
          console.error("Failed to get canvas context");
        }
      }).catch(error => {
        console.error('Error rendering page:', error);
      });
    }
  };

  React.useEffect(() => {
    if (pdf) {
      renderPage(currentPage);
    }
  }, [pdf, currentPage, scale]);

  const nextPage = () => {
    if (pdf && currentPage < pdf.numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const zoomIn = () => {
    setScale(scale + 0.2);
  };

  const zoomOut = () => {
    if (scale > 0.4) {
      setScale(scale - 0.2);
    }
  };

  return (
    <div style={{ width: '100%', maxHeight: '80vh', overflow: 'auto', border: '1px solid black', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous Page</button>
        <button onClick={nextPage} disabled={pdf && currentPage === pdf.numPages ? true : undefined}>Next Page</button>
        <button onClick={zoomOut}>Zoom Out</button>
        <button onClick={zoomIn}>Zoom In</button>
        <span>Page {currentPage} of {pdf?.numPages}</span>
      </div>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
      ></div>
    </div>
  );
};

export default PdfViewer;
