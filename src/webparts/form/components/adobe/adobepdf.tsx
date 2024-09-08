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
          showAnnotationTools: false,
          showDownloadPDF: false,
          showPrintPDF: false,
          showZoomControls: false,
          showNavigationControls: false,
          showPageControls: false
        });

        // Use MutationObserver to ensure elements are available for manipulation
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
              // Hide Adobe logo
              const adobeLogo = document.querySelector('.adobe-logo-selector') as HTMLElement;
              if (adobeLogo) {
                adobeLogo.style.display = 'none';
              }
              
              // Move right bar to top
              const rightBar = document.querySelector('.adobe-right-bar-selector') as HTMLElement;
              if (rightBar) {
                rightBar.style.position = 'absolute';
                rightBar.style.top = '0';
                rightBar.style.right = '0';
                rightBar.style.zIndex = '9999'; // Ensure it's above other elements
              }
            }
          });
        });

        // Observe the body for changes to ensure elements are available
        observer.observe(document.body, { childList: true, subtree: true });

        // Disconnect observer after a certain period
        setTimeout(() => observer.disconnect(), 5000); // Adjust time as necessary
      } else {
        document.addEventListener('adobe_dc_view_sdk.ready', displayPDF);
      }
    };

    loadAdobeScript()
      .then(() => {
        displayPDF();
      })
      .catch(err => console.error(err));

    return () => {
      // Cleanup function to remove script and observer when component unmounts
      const script = document.querySelector('script[src="https://documentservices.adobe.com/view-sdk/viewer.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [clientId, fileUrl, defaultViewMode]);

  return (
    <div id="adobe-pdf-viewer" style={{ height: `${height}px`, position: 'relative', boxShadow: '2px 2px 6px 2px #dadada' }}></div>
  );
};

export default AdobePdfViewer;
