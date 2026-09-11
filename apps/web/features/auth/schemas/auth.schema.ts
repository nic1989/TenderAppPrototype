import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string()
    .min(6, "Password must contain at least 6 characters")
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(3, "Name must contain at least 3 characters"),
  email: z.email("Enter a valid email address"),
  password: z.string().min(6, "Password must contain at least 6 characters")
});

export type RegisterFormData = z.infer<typeof registerSchema>;