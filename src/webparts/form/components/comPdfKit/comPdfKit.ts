// import React, { useEffect, useRef } from 'react';
// import ComPDFKitViewer from '@compdfkit_pdf_sdk/webviewer';
// // import styles from './PdfViewer.module.scss';

// const PdfViewer: React.FC<{ pdfUrl: string; license: string }> = ({ pdfUrl, license }) => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     let docViewer = null;

//     ComPDFKitViewer.init({
//       path: '/',
//       pdfUrl: pdfUrl,
//       license: license
//     }, containerRef.current).then((instance) => {
//       docViewer = instance.docViewer;
//       docViewer.addEvent('documentloaded', async () => {
//         console.log('ComPDFKit Web Demo loaded');
//       });
//     });
//   }, [pdfUrl, license]);

//   return <div ref={containerRef} className={styles.viewerContainer} />;
// };

// export default PdfViewer;
