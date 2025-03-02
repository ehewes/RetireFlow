import { z } from "zod";

export const applicationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  dob: z.string().min(1, "Date of birth is required"),
  niNumber: z.string().min(1, "National Insurance Number is required"),
  yearsOfService: z.number().min(0, "Years of service cannot be negative"),
  currentSalary: z.number().min(0, "Current salary cannot be negative"),
  annuityType: z.string().min(1, "Annuity type is required"), 
  survivorBenefit: z.string().min(1, "Survivor benefit is required"),
  healthcare: z.string().min(1, "Healthcare option is required"), 
  retirementDate: z.string().min(1, "Retirement date is required"), 
  termsAgreed: z.boolean().refine((val) => val === true, "You must agree to the terms"),
});

// TypeScript type inferred from the schema
export type Application = z.infer<typeof applicationSchema>;