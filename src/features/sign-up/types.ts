import z from "zod";

export const signUpFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nama minimal 2 karakter" })
    .max(50, { message: "Nama maksimal 50 karakter" }),
  email: z
    .string()
    .email({ message: "Format email tidak valid" }),
  password: z
    .string()
    .min(8, { message: "Kata sandi minimal 8 karakter" })
    .regex(/[0-9]/, { message: "Kata sandi harus mengandung setidaknya satu angka" })
    .regex(/[a-z]/, { message: "Kata sandi harus mengandung setidaknya satu huruf kecil" })
    .regex(/[A-Z]/, { message: "Kata sandi harus mengandung setidaknya satu huruf besar" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Konfirmasi kata sandi wajib diisi" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Konfirmasi kata sandi tidak cocok",
  path: ["confirmPassword"],
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;