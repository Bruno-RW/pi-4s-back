import { z } from "zod";

// ---------- FORM ICON STYLE ---------- //
export const iconStyle = {
  className: "self-center text-default-400",
  size: 20
} as const;



//? ---------- LOGIN ---------- ?//
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



//? ---------- GENERAL DATA ---------- ?//
export const generalFormSchema = z.object({
  deduplicationId:      z.string().uuid(), // Automatically added
  devEui:               z.string().max(16).nullable(),
  deviceName:           z.string().max(100).nullable(),
  emw_rain_lvl:         z.number().nullable(),
  emw_avg_wind_speed:   z.number().int().nullable(),
  emw_gust_wind_speed:  z.number().int().nullable(),
  emw_wind_direction:   z.number().int().nullable(),
  emw_temperature:      z.number().nullable(),
  emw_humidity:         z.number().nullable(),
  emw_luminosity:       z.bigint().nullable(),
  emw_uv:               z.number().nullable(),
  emw_solar_radiation:  z.number().nullable(),
  emw_atm_pres:         z.number().nullable(),
  internal_temperature: z.number().nullable(),
  internal_humidity:    z.number().nullable(),
  time:                 z.date(), // Automatically added
  deviceInfo:           z.any().nullable(), // JSON
  rxInfo:               z.any().nullable(), // JSON
});
export type generalFormData = z.infer<typeof generalFormSchema>;

export const secondaryFormSchema = z.object({
  deduplicationId:  z.string().uuid(), // Automatically added
  devEui:           z.string().max(16).nullable(),
  deviceName:       z.string().max(100).nullable(),
  noise:            z.number().nullable(),
  temperature:      z.number().nullable(),
  voltage:          z.number().nullable(),
  humidity:         z.number().nullable(),
  pm2_5:            z.number().nullable(),
  time:             z.date(), // Automatically added
  deviceInfo:       z.any().nullable(), // JSON
  rxInfo:           z.any().nullable(), // JSON
});
export type secondaryFormData = z.infer<typeof secondaryFormSchema>;



//! ---------- MASTER USER ---------- !//
export const userFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(5, "Name must have atleast 5 characters")
    .max(70, "Name must be shorter than 70 characters")
    .transform(value =>
      value
        .split(' ') // Split the name into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Transform each word
        .join(' ') // Join the transformed words back into a string
    ),

  type: z
    .string()
    .min(1, "Type is required")
    .max(1),

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

  confirmPassword: z
    .string()
    .trim()
    .min(1, "Password confirmation is required")
    .min(8, "Password confirmation must have atleast 8 characters")
    .max(30, "Password confirmation must be shorter than 30 characters")
})
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
  message: "Password does not match",
  path: ["confirmPassword"]
});
export type userFormData = z.infer<typeof userFormSchema>;

export const editUserFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(5, "Name must have atleast 5 characters")
    .max(70, "Name must be shorter than 70 characters")
    .transform(value =>
      value
        .split(' ') // Split the name into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Transform each word
        .join(' ') // Join the transformed words back into a string
    ),

  type: z
    .string()
    .min(1, "Type is required")
    .max(1),

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
    .max(30, "Password must be shorter than 30 characters")
    .optional(),

  confirmPassword: z
    .string()
    .trim()
    .max(30, "Password confirmation must be shorter than 30 characters")
    .optional()
})
  .refine(({ password, confirmPassword }) => {
    // Check if password and confirmPassword are non-empty when editing
    const isEditing = !!password || !!confirmPassword;

    // Only apply validation if editing and at least one of the fields is non-empty
    if (isEditing && (!password || !confirmPassword)) return true;

    return (password === confirmPassword);
  }, {
  message: "Password does not match",
  path: ["confirmPassword"]
});