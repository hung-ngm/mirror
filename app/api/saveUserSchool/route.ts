import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { saveUserSchool } from "@/lib/personalize";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { studentType, studyArea, purpose } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!studentType) {
            return new NextResponse("Report url is required", { status: 400 });
        }

        if (!studyArea) {
            return new NextResponse("Study area is required", { status: 400 });
        }

        if (!purpose) {
            return new NextResponse("Purpose is required", { status: 400 });
        }

        await saveUserSchool(studentType, studyArea, purpose);
        return new NextResponse(JSON.stringify({ success: true }), { status: 200 }); // OK

    } catch (error) {
        console.log("[SAVE_USER_SCHOOL_ERROR]", error)
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}