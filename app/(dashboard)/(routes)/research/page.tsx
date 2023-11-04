"use client"

import { PenSquare } from "lucide-react";
import { formSchema as researchReportFormSchema } from "./constants";
import MirrorScriptsPage from '@/components/ui/mirrorscripts-page';

const ResearchReportPage = () => {
    return (
        <MirrorScriptsPage
            title="Research Report - Your AI Research Assistant"
            description="Supercharge your research writing."
            formSchema={researchReportFormSchema}
            defaultFormValues={{
                task: "",
                report_type: "research_report",
                agent: "Auto Agent",
            }}
            icons={PenSquare}
            pageDescription="This page generates a research report"
        />
    )
}

export default ResearchReportPage;
