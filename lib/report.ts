import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export const saveReport = async (reportUrl: string) => {
    const { userId } = auth();

    if (!userId) {
        return;
    }

    await prismadb.userReport.create({
        data: { userId: userId, url: reportUrl }
    });
}

export const getReportById = async (reportId: string) => {
    const { userId } = auth();

    if (!userId) {
        return;
    }

    const report = await prismadb.userReport.findUnique({
        where: { id: reportId }
    });

    return report;
}

export const getReports = async () => {
    const { userId } = auth();

    if (!userId) {
        return;
    }

    const reports = await prismadb.userReport.findMany({
        where: { userId: userId }
    });

    return reports;
}

export const convertPdfUrlToMd = (url: string): string => {
    return url.replace('.pdf', '.md');
};