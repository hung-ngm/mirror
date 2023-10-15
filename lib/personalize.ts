import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export const saveUserSchool = async (
    studentType: string,
    studyArea: string,
    purpose: string
) => {
    const { userId } = auth();

    if (!userId) {
        return;
    }

    const userSchool = await prismadb.userSchool.findUnique({
        where: {
            userId
        }
    }) 

    if (userSchool) {
        await prismadb.userSchool.update({
            where: { userId: userId },
            data: { studentType, studyArea, purpose }
        })
    } else {
        await prismadb.userSchool.create({
            data: { userId, studentType, studyArea, purpose }
        })
    }
}

export const saveUserWork = async (
    userFunction: string,
    companySize: string,
    role: string,
    purpose: string
) => {
    const { userId } = auth();

    if (!userId) {
        return;
    }

    const userWork = await prismadb.userWork.findUnique({
        where: {
            userId
        }
    }) 

    if (userWork) {
        await prismadb.userWork.update({
            where: { userId: userId },
            data: { function: userFunction, companySize, role, purpose }
        })
    } else {
        await prismadb.userWork.create({
            data: { userId, function: userFunction, companySize, role, purpose }
        })
    }
}

export const getUserSchool = async () => {
    const { userId } = auth();

    if (!userId) {
        return;
    }

    const userSchool = await prismadb.userSchool.findUnique({
        where: { userId: userId }
    });

    return userSchool
}

export const getUserWork = async () => {
    const { userId } = auth();

    if (!userId) {
        return;
    }

    const userWork = await prismadb.userSchool.findUnique({
        where: { userId: userId }
    });

    return userWork;
}