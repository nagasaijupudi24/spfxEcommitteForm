/* eslint-disable react/self-closing-comp */
import * as React from 'react';
import { useEffect } from 'react';

interface IAdobePdfViewerProps {
  clientId: string;
  fileUrl: string;
  height: number;
  defaultViewMode: string;
}

const AdobePdfViewer: React.FC<IAdobePdfViewerProps> = ({ clientId, fileUrl, height, defaultViewMode }) => {
    console.log("PDF ADOBE")
    useEffect(() => {
    const loadAdobeScript = () => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://documentservices.adobe.com/view-sdk/viewer.js';
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Adobe PDF Embed API script'));
        document.body.appendChild(script);
      });
    };

    const displayPDF = () => {
        console.log("PDF displayed")
        
      const adobeDC = window.AdobeDC;
      if (adobeDC && adobeDC.View) {
        new adobeDC.View({
          clientId,
          divId: 'adobe-pdf-viewer'
        }).previewFile({
          content: { location: { url: fileUrl } },
          metaData: { fileName: 'document.pdf' }
        }, {
          defaultViewMode,
          showAnnotationTools: false
        });
      } else {
        document.addEventListener('adobe_dc_view_sdk.ready', displayPDF);
      }
    };

    loadAdobeScript()
      .then(displayPDF)
      .catch(err => console.error(err));

    // Cleanup function to remove script when component unmounts
    return () => {
      const script = document.querySelector('script[src="https://documentservices.adobe.com/view-sdk/viewer.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [clientId, fileUrl, defaultViewMode]);

  return (
    <div id="adobe-pdf-viewer" style={{ height: `${height}px`, boxShadow: '2px 2px 6px 2px #dadada' }}></div>
  );
};

export default AdobePdfViewer;
