import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { increaseApiLimit } from "@/lib/api-limit";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await increaseApiLimit();

        return new NextResponse(JSON.stringify({ success: true }), { status: 200 }); // OK

    } catch (error) {
        console.log("[INCREASE_API_LIMIT_ERROR]", error)
        return new NextResponse("Internal error", { status: 500 });
    }
}