import z from "zod";

export const questionFormSchema = z.object({
    name: z.string().min(1, "Nama wajib diisi").min(2, "Nama minimal 2 karakter"),
    question: z.string().min(1, "Pertanyaan wajib diisi").min(10, "Pertanyaan minimal 10 karakter"),
    conference: z.string().min(1, "Konferensi wajib diisi"),
});

export type QuestionFormSchema = z.infer<typeof questionFormSchema>