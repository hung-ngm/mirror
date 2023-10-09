import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { saveReport } from "@/lib/report";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const { reportUrl } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!reportUrl) {
            return new NextResponse("Report url is required", { status: 400 });
        }

        await saveReport(reportUrl);
        return new NextResponse(JSON.stringify({ success: true }), { status: 200 }); // OK

    } catch (error) {
        console.log("[SAVE_REPORT_ERROR]", error)
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}