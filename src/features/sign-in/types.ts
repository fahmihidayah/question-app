import z from "zod";

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Kata sandi minimal 8 karakter" })
    // .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Kata sandi harus mengandung setidaknya satu angka" })
    // .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
