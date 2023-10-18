import { create } from "zustand";

interface useProStore {
    isPro: boolean;
    setIsPro: (isPro: boolean) => void;
}

export const usePro = create<useProStore>((set) => ({
    isPro: false,
    setIsPro: (isPro: boolean) => set({ isPro })
}))