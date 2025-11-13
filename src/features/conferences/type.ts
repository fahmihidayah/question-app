import z from "zod";

export const questionFormSchema = z.object({
    title : z.string().min(6, "Judul minimal 6 karakter" ),
    description : z.string().min(1, "Deskripsi tidak boleh kosong"),
});

export type QuestionFormSchema = z.infer<typeof questionFormSchema>

export const conferenceFormSchema = z.object({
    title: z.string().min(6, "Judul minimal 6 karakter"),
    description: z.string().min(1, "Deskripsi tidak boleh kosong"),
});

export type ConferenceFormSchema = z.infer<typeof conferenceFormSchema>