"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("9f34f917-e63f-462a-a769-b5039f30a6f7");
    }, []);

    return null;
}