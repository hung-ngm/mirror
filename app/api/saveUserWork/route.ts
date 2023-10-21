import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { saveUserWork } from "@/lib/personalize";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { function: userFunction, companySize, role, purpose } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!userFunction) {
            return new NextResponse("User function is required", { status: 400 });
        }

        if (!companySize) {
            return new NextResponse("Company size is required", { status: 400 });
        }

        if (!role) {
            return new NextResponse("Role is required", { status: 400 });
        }

        if (!purpose) {
            return new NextResponse("Purpose is required", { status: 400 });
        }

        await saveUserWork(userFunction, companySize, role, purpose);
        return new NextResponse(JSON.stringify({ success: true }), { status: 200 }); // OK

    } catch (error) {
        console.log("[SAVE_USER_WORK_ERROR]", error)
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}