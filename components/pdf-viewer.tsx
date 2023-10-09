interface PDFViewerProps {
    pdfUrl: string;
}

export const PDFViewer = ({ pdfUrl }: PDFViewerProps) => {
    return (
        <iframe
          src={pdfUrl}
          className="w-full h-full"
        ></iframe>
    );
}

