"use client";

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import ReactMarkdown from 'react-markdown';
import Link from "next/link";

interface ReportCardProps {
    reportMarkdown: string;
    url: string;
}

export const ReportCard = ({ reportMarkdown, url }: ReportCardProps) => {
    return (
        <Link href={url} className="bg-white hover:bg-gray-200 hover:border-black rounded sm:w-full md:w-1/6 lg:w-1/10 mx-4 lg:mx-8 my-4 lg:my-8 h-auto max-h-1/2">
            <Card className="bg-white hover:bg-gray-200 p-1 h-full">
                <CardContent className="prose max-w-full p-3 text-xs h-full overflow-auto">
                    <ReactMarkdown>{reportMarkdown}</ReactMarkdown>
                </CardContent>
            </Card>
        </Link>
    )
}
