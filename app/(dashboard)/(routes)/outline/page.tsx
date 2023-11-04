"use client"

import { MenuSquare } from "lucide-react";
import { formSchema as researchReportFormSchema } from "./constants";
import MirrorScriptsPage from '@/components/ui/mirrorscripts-page';

const OutlineReportPage = () => {
    return (
        <MirrorScriptsPage
            title="Outline Report - Your AI Research Assistant"
            description="Supercharge your research writing."
            formSchema={researchReportFormSchema}
            defaultFormValues={{
                task: "",
                report_type: "outline_report",
                agent: "Auto Agent",
            }}
            icons={MenuSquare}
            pageDescription="This page generates an outline report"
        />
    )
}

export default OutlineReportPage;
