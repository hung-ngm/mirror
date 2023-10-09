"use client";

import axios from "axios";
import Link from "next/link";
import { Heading } from "@/components/heading";
import { FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { convertPdfUrlToMd } from "@/lib/report";
import { ReportCard } from "@/components/report-card";
import { useReports } from "@/hooks/use-reports";
import { Report } from "@/hooks/use-reports";

const ReportsPage =  () => {
    const router = useRouter();
    const { reports, setReports } = useReports();

    const fetchReports = async () => {
        const getReportsResponse = await axios.get("/api/getReports");
        const reports = getReportsResponse.data.reports;
        const reportsWithMarkdown: Report[] = await Promise.all(reports.map(async (report: Report) => {
            const response = await axios.get(convertPdfUrlToMd(report.url), { responseType: 'text' });
            return { ...report, markdown: response.data.substring(0, 200) };
        }));
        setReports(reportsWithMarkdown);
        console.log(reportsWithMarkdown);

    }

    useEffect(() => {
        fetchReports();
    }, [])    


    return (
        <div>
            <Heading
                title="Your reports"
                description="View your reports here"
                icon={FileText}
                iconColor="text-green-800"
                bgColor="bg-green-800/10"
            />
            <div className="px-4 lg:px-8 flex flex-wrap justify-start">
                {reports.map((report, index) => (
                    <ReportCard key={report.id} reportMarkdown={report.markdown} url={`/reports/${index}`} />
                ))}
                
            </div>
        </div>
    )
};

export default ReportsPage;
