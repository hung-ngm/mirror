import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { getReports } from "@/lib/report";

export async function GET(
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const reports = await getReports();

        return new NextResponse(JSON.stringify({ reports }), { status: 200 }); // OK

    } catch (error) {
        console.log("[GET_REPORTS_ERROR]", error)
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}