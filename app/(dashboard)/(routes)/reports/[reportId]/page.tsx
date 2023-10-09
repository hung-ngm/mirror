"use client";

import { Heading } from "@/components/heading";
import { FileText } from "lucide-react";
import { PDFViewer } from "@/components/pdf-viewer";
import { redirect } from "next/navigation";
import { useReports } from "@/hooks/use-reports";

type ReportPageProps = {
    params: {
        reportId: string;
    }
}

const ReportPage = ({ params: { reportId }}: ReportPageProps) => {
    const { reports } = useReports();
    const report = reports[parseInt(reportId)];

    if (!report) {
        redirect("/reports");
    }

    return (
        <div className="h-screen mx-8 lg:mx-12 my:8 lg:my-12">
            <Heading
                title="Your report"
                description="View the detail of your report here"
                icon={FileText}
                iconColor="text-green-800"
                bgColor="bg-green-800/10"
            />
            
            {report && (
                <div className="h-full p-4 overflow-scroll">
                    <PDFViewer pdfUrl={report.url} />
                </div>
            )}
        </div>
    )
}

export default ReportPage;