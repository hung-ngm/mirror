import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { checkSubscription } from "@/lib/subscription";

export async function GET() {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const isPro = await checkSubscription();
        return new NextResponse(JSON.stringify({ isPro }), { status: 200 }); // OK

    } catch (error) {
        console.log("[CHECK_SUBSCRIPTION_ERROR]", error)
        return new NextResponse("Internal error", { status: 500 });
    }
}