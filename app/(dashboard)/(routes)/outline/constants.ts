import * as z from "zod";

export const formSchema = z.object({
    task: z
        .string()
        .min(5, {
        message: "Topic must be at least 5 characters long",
        }),
    report_type: z.string(),
    agent: z.string(),
});
