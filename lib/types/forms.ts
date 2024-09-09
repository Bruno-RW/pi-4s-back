import { z } from "zod";

export const iconStyle = {
  className: "self-center text-default-400",
  size: 20
} as const;

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "E-mail is required")
    .min(10, "E-mail must have atleast 10 characters")
    .max(70, "E-mail must be shorter than 70 characters")
    .email("Invalid e-mail")
    .toLowerCase(),

  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(8, "Password must have atleast 8 characters")
    .max(30, "Password must be shorter than 30 characters"),
});
export type loginFormData = z.infer<typeof loginFormSchema>;