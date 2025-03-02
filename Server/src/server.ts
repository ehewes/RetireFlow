import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { queryAssistant } from "./handlers/handleAssistant";
import mongoose from "mongoose";
import { handleApplication } from "./handlers/handleApplicationPost";
import { z } from "zod";
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3051;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const MONGODB_URI = "mongodb+srv://priz:AwOJmW4FxRbyIhzE@cluster0.shytj.mongodb.net/pensionDB?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

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
  
  const applicationSchema = z.object({
    fullName: z.string(),
    email: z.string(),
    dob: z.string(),
    niNumber: z.string(),
    yearsOfService: z.number(),
    currentSalary: z.number(),
    annuityType: z.string(),
    survivorBenefit: z.string(),
    healthcare: z.string(),
    retirementDate: z.string(),
    termsAgreed: z.boolean(),
  });


const assistantId = "asst_CsA1Zga8EZiFfp1lrByuCD0y";


app.use(cors()); 
app.use(express.json()); 

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req: express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

async function streamToString(stream: Readable): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    stream.on("error", (err) => reject(err));
  });
}

// Function to fetch file content from OpenAI
async function fetchFileContent(fileId: string): Promise<string> {
  const fileContentResponse = await openai.files.content(fileId);
  const fileContentStream = fileContentResponse.body as unknown as Readable;
  const fileContent = await streamToString(fileContentStream);
  return fileContent;
}

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

app.post("/api/chat", async (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const response = await queryAssistant(message);
    res.json({ response });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/test", (req: Request, res: Response) => {
    res.send("Server is working!");
  });

app.post("/api/upload", upload.single("file"), async (req: MulterRequest, res: Response) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const file = await openai.files.create({
      file: fs.createReadStream(req.file.path),
      purpose: "assistants",
    });

    try {
      fs.unlinkSync(req.file.path);
    } catch (unlinkError) {
      console.warn("Failed to delete temp file:", unlinkError);
    }

    res.json({ message: "File uploaded successfully", fileId: file.id });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Error uploading file" });
  }
});

app.get("/api/files", async (_req: Request, res: Response) => {
  try {
    const files = await openai.files.list();
    res.json(files);
  } catch (error) {
    console.error("List Files Error:", error);
    res.status(500).json({ error: "Error listing files" });
  }
});

app.delete("/api/files/:id", async (req: Request, res: Response) => {
  const fileId = req.params.id;
  if (!fileId) return res.status(400).json({ error: "File ID is required" });

  try {
    await openai.files.del(fileId);
    res.json({ message: `File ${fileId} deleted successfully` });
  } catch (error) {
    console.error("Delete File Error:", error);
    res.status(500).json({ error: "Error deleting file" });
  }
});

app.post("/api/append", async (req: Request, res: Response) => {
  const { fileId, newText } = req.body;
  if (!fileId || !newText) return res.status(400).json({ error: "File ID and text are required" });

  try {
    const existingFileContent = await fetchFileContent(fileId); 
    const newContent = existingFileContent + "\n" + newText;

    const tempFilePath = path.join(uploadDir, `${Date.now()}-upload.txt`);
    fs.writeFileSync(tempFilePath, newContent);

    const newFile = await openai.files.create({
      file: fs.createReadStream(tempFilePath),
      purpose: "assistants",
    });


    try {
      fs.unlinkSync(tempFilePath);
    } catch (unlinkError) {
      console.warn("Failed to delete temp file:", unlinkError);
    }

    await openai.files.del(fileId);
    res.json({ message: "File updated successfully", newFileId: newFile.id });
  } catch (error) {
    console.error("Append Error:", error);
    res.status(500).json({ error: "Error appending data" });
  }
});

app.post("/api/post_application", async (req: Request, res: Response) => {
  const applicationData = req.body;

  if (!applicationData || Object.keys(applicationData).length === 0) {
    return res.status(400).json({ error: "Application data is required" });
  }

  try {
    // Parse and validate application data
    const parsedData = {
      ...applicationData,
      yearsOfService: Number(applicationData.yearsOfService),
      currentSalary: Number(applicationData.currentSalary),
    };
    const validatedData = applicationSchema.parse(parsedData);

    // Save to MongoDB
    const newApplication = new ApplicationModel({
      ...validatedData,
      submissionDate: new Date().toISOString().split("T")[0],
      status: "Processing",
    });
    await newApplication.save();

    // Generate text representation of the application
    const applicationText = `
Application ID: ${newApplication._id}
Full Name: ${newApplication.fullName}
Email: ${newApplication.email}
DOB: ${newApplication.dob}
NI Number: ${newApplication.niNumber}
Years of Service: ${newApplication.yearsOfService}
Current Salary: ${newApplication.currentSalary}
Annuity Type: ${newApplication.annuityType}
Survivor Benefit: ${newApplication.survivorBenefit}
Healthcare: ${newApplication.healthcare}
Retirement Date: ${newApplication.retirementDate}
Terms Agreed: ${newApplication.termsAgreed}
Submission Date: ${newApplication.submissionDate}
Status: ${newApplication.status}
    `.trim();

    // Define temporary file path
    const tempFilePath = path.join(uploadDir, `application_${newApplication._id}.txt`);
    
    // Write application text to temporary file
    fs.writeFileSync(tempFilePath, applicationText);

    // Upload file to OpenAI
    const file = await openai.files.create({
      file: fs.createReadStream(tempFilePath),
      purpose: "assistants",
    });

    // Add file to vector store
    const vectorStoreId = "vs_67c322ecefe48191979e37c4f88ca178";
    await openai.beta.vectorStores.files.create(vectorStoreId, { file_id: file.id });

    // Clean up temporary file
    try {
      fs.unlinkSync(tempFilePath);
    } catch (unlinkError) {
      console.warn("Failed to delete temporary file:", unlinkError);
    }

    // Send success response
    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: newApplication,
    });
  } catch (error: any) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors,
      });
    }
    // Handle other errors (MongoDB, OpenAI, etc.)
    console.error("Application Processing Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/get_applications", async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.email;
    if (!userEmail) {
      return res.status(400).json({ error: "Email is required" });
    }
    const applications = await ApplicationModel.find({ email: userEmail });
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/delete_application/:id", async (req: Request, res: Response) => {
  try {
    const applicationId = req.params.id;
    const userEmail = req.query.email;
    if (!userEmail) {
      return res.status(400).json({ error: "Email is required" });
    }
    const application = await ApplicationModel.findOne({ _id: applicationId, email: userEmail });
    if (!application) {
      return res.status(404).json({ error: "Application not found or you don’t have permission to delete it" });
    }
    await ApplicationModel.deleteOne({ _id: applicationId });
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/get_application_pdf/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    // Step 1: Retrieve the application from MongoDB
    const application = await ApplicationModel.findById(id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Step 2: Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]); // Page size: 600pt width, 800pt height
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    const lineHeight = fontSize * 1.2;
    let y = page.getHeight() - 50; // Start 50pt from the top

    // Step 3: Define the fields to include in the PDF (matches the text representation)
    const fields = [
      { label: "Application ID:", value: application._id.toString() },
      { label: "Full Name:", value: application.fullName },
      { label: "Email:", value: application.email },
      { label: "DOB:", value: application.dob },
      { label: "NI Number:", value: application.niNumber },
      { label: "Years of Service:", value: application.yearsOfService.toString() },
      { label: "Current Salary:", value: application.currentSalary.toString() },
      { label: "Annuity Type:", value: application.annuityType },
      { label: "Survivor Benefit:", value: application.survivorBenefit },
      { label: "Healthcare:", value: application.healthcare },
      { label: "Retirement Date:", value: application.retirementDate },
      { label: "Terms Agreed:", value: application.termsAgreed.toString() },
      { label: "Submission Date:", value: application.submissionDate },
      { label: "Status:", value: application.status },
    ];

    // Step 4: Draw each field on the PDF
    for (const field of fields) {
      page.drawText(`${field.label} ${field.value}`, {
        x: 50, // 50pt left margin
        y: y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0), // Black text
      });
      y -= lineHeight; // Move down for the next line
    }

    // Step 5: Save the PDF and send it as a response
    const pdfBytes = await pdfDoc.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="application_${id}.pdf"`);
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`[server]: Running at http://localhost:${port}`);
});