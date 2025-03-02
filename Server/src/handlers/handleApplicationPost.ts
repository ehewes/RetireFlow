import { Request, Response } from "express";
import { applicationSchema } from "../schemas/application.schema"; // Adjust path
import mongoose from "mongoose";
import { z } from "zod";

// Define Mongoose schema and model
const ApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: String, required: true },
  niNumber: { type: String, required: true },
  yearsOfService: { type: Number, required: true },
  currentSalary: { type: Number, required: true },
  annuityType: { type: String, required: true },
  survivorBenefit: { type: String, required: true },
  healthcare: { type: String, required: true },
  retirementDate: { type: String, required: true },
  termsAgreed: { type: Boolean, required: true },
  submissionDate: { type: String, default: () => new Date().toISOString().split("T")[0] },
  status: { type: String, default: "Processing" },
});

const ApplicationModel = mongoose.model("Application", ApplicationSchema);

export const handleApplication = async (req: Request, res: Response) => {
  try {
    // Parse and validate incoming data
    const rawData = {
      ...req.body,
      yearsOfService: Number(req.body.yearsOfService), // Convert to number
      currentSalary: Number(req.body.currentSalary),   // Convert to number
    };

    const validatedData = applicationSchema.parse(rawData);

    // Add server-managed fields
    const applicationData = {
      ...validatedData,
      submissionDate: new Date().toISOString().split("T")[0], // Current date
      status: "Processing",
    };

    // Save to MongoDB
    const newApplication = new ApplicationModel(applicationData);
    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: newApplication,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }
    console.error("Error saving application:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};