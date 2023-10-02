import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { checkApiLimit } from "@/lib/api-limit";

export async function GET() {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const freeTrial = await checkApiLimit();
        return new NextResponse(JSON.stringify({ freeTrial }), { status: 200 }); // OK

    } catch (error) {
        console.log("[INCREASE_API_LIMIT_ERROR]", error)
        return new NextResponse("Internal error", { status: 500 });
    }
}