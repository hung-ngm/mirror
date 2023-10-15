import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { getUserSchool } from "@/lib/personalize";

export async function GET(
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userWork = await getUserSchool();

        return new NextResponse(JSON.stringify({ userWork }), { status: 200 }); // OK

    } catch (error) {
        console.log("[GET_USER_WORK_ERROR]", error)
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}