import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { getReportById } from "@/lib/report";

export async function GET(
    req: NextRequest, { params }: { params: { reportId: string } } 
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        const { reportId } = params;
        const report = await getReportById(reportId);

        return new NextResponse(JSON.stringify({ report }), { status: 200 }); // OK

    } catch (error) {
        console.log("[GET_REPORT_ERROR]", error)
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}