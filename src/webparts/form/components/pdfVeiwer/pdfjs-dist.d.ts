declare module 'pdfjs-dist/build/pdf' {
    export * from 'pdfjs-dist';
  }
  
  declare module 'pdfjs-dist/build/pdf.worker.entry' {
    const pdfWorker: string;
    export default pdfWorker;
  }
  