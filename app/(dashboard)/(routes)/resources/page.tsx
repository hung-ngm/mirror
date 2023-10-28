"use client"

import { Library } from "lucide-react";
import { formSchema as researchReportFormSchema } from "./constants";
import MirrorScriptsPage from '@/components/ui/mirrorscripts-page';

const ResourceReportPage = () => {
    return (
        <MirrorScriptsPage
            title="Research Report - Your AI Research Assistant"
            description="Supercharge your research writing."
            formSchema={researchReportFormSchema}
            defaultFormValues={{
                task: "",
                report_type: "resource_report",
                agent: "Auto Agent",
            }}
            icons={Library}
        />
    )
}

export default ResourceReportPage;
