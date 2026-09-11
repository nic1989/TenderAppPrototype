import { z } from "zod";

const urlRegex = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gi;

export const profileSchema = z.object({
  companyName: z.string().min(1, { message: "Company Name is required" }).min(3, { message: "Minimum 3 characters required." }),
  turnover: z.number({ message: "Turnover is required" }).gt(0, { message: "Turnover must be greater than 0" }),
  experience: z.number({ message: "Experience is required" }).gt(0, { message: "Experience must be greater than 0" }),
  certifications: z.string(),
  documents: z.string(),
  employeeCount: z.number({ message: "Employee count is required" }).gt(0, { message: "Employee count must be greater than 0" }),
  gstNumber: z.string().min(1, { message: "GST Number is required" }),
  panNumber: z.string().min(1, { message: "PAN Number is required" }),
  industry: z.string().optional(),
  website: z.string()
    .transform((val) => {
      if (!val || val.trim() === "") return "";

      const trimmed = val.trim();
      if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
        return "https://" + trimmed;
      }

      return trimmed;
    })
    .pipe(
      z.string().refine((val) => {
        if (val === "") return true;
        return urlRegex.test(val)
      }, { message: "Please enter a valid website URL" })
    )
});

export type ProfileFormData = z.infer<typeof profileSchema>;