import { create } from "zustand";

export type Report = {
    id: string;
    userId: string;
    url: string;
    markdown: string;
}

interface useReportsStore {
    reports: Report[];
    setReports: (reports: Report[]) => void;
}

export const useReports = create<useReportsStore>((set) => ({
    reports: [],
    setReports: (reports: Report[]) => set({ reports }),
}))