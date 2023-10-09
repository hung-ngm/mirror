interface PDFViewerProps {
    pdfUrl: string;
}

export const PDFViewer = ({ pdfUrl }: PDFViewerProps) => {
    return (
        <iframe
          src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
          className="w-full h-full"
        ></iframe>
    );
}

