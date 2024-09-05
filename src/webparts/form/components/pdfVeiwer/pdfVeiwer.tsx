// import * as React from 'react';
// import * as pdfjsLib from 'pdfjs-dist';
// import 'pdfjs-dist/web/pdf_viewer.css';
// // import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
// // Set up the worker source
// pdfjsLib.GlobalWorkerOptions.workerSrc = '/workers/pdf.worker.min.js'; 
// interface IPdfViewerProps {
//   pdfUrl: string;
// }

// const PdfViewer: React.FC<IPdfViewerProps> = ({ pdfUrl }) => {
//   const viewerRef = React.useRef<HTMLDivElement | null>(null);
//   const [numPages, setNumPages] = React.useState<number>(0);
//   const [pageNum, setPageNum] = React.useState<number>(1);

//   React.useEffect(() => {
//     if (viewerRef.current) {
//       const container = viewerRef.current;
//       const scale = 1.5;

//       const renderPage = (pdf: any, pageNum: number) => {
//         pdf.getPage(pageNum).then((page: any) => {
//           const viewport = page.getViewport({ scale });
//           const canvas = document.createElement('canvas');
//           const context = canvas.getContext('2d');
//           if (context) {
//             canvas.height = viewport.height;
//             canvas.width = viewport.width;

//             container.innerHTML = ''; // Clear previous content
//             container.appendChild(canvas);

//             const renderContext = {
//               canvasContext: context,
//               viewport,
//             };
//             page.render(renderContext).promise.then(() => {
//               console.log(`Page ${pageNum} rendered successfully`);
//             }).catch((error: any) => {
//               console.error('Error rendering page:', error);
//             });
//           } else {
//             console.error('Canvas context is null');
//           }
//         }).catch((error: any) => {
//           console.error('Error getting page:', error);
//         });
//       };

//       const loadPdf = async () => {
//         try {
//           console.log('Loading PDF from URL:', pdfUrl);
//           const loadingTask = pdfjsLib.getDocument(pdfUrl);
//           const pdf = await loadingTask.promise;
//           setNumPages(pdf.numPages);
//           renderPage(pdf, pageNum);
//         } catch (error) {
//           console.error('Error loading PDF:', error);
//         }
//       };

//       loadPdf().catch((error) => {
//         console.error('Error in loadPdf function:', error);
//       });
//     }
//   }, [pdfUrl, pageNum]);

//   return (
//     <div>
//       <h1>PDF Viewer</h1>
//       <div ref={viewerRef} className="pdfViewer"></div>
//       <div className="controls">
//         <button
//           disabled={pageNum <= 1}
//           onClick={() => setPageNum(pageNum - 1)}
//         >
//           Previous
//         </button>
//         <button
//           disabled={pageNum >= numPages}
//           onClick={() => setPageNum(pageNum + 1)}
//         >
//           Next
//         </button>
//         <p>
//           Page {pageNum} of {numPages}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PdfViewer;
