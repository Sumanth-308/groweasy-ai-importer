import { Router } from "express";
import multer from "multer";
import Papa from "papaparse";
import { model } from "../gemini";
import { crmFields } from "../crm.schema";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "CSV file is required",
      });
    }

    const csvData = req.file.buffer.toString("utf-8");

    const result = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    });

    const sampleData = result.data.slice(0, 5);

    const prompt = `
    You are an AI CRM data mapping engine.
    
    Your task is to convert arbitrary CSV records into GrowEasy CRM records.
    
    Target CRM fields:
    ${crmFields.join(", ")}
    
    Column mapping hints:
    
    - name ← name, full_name, fullname, customer_name, client_name
    - email ← email, mail, email_id, contact_email
    - phone ← phone, mobile, mobile_number, phone_number, contact_number
    - company ← company, company_name, organization, organisation, employer
    
    Rules:
    1. Return ONLY valid JSON.
    2. Do NOT return markdown.
    3. Do NOT wrap the response in \`\`\`.
    4. Do NOT invent values.
    5. Use null for missing fields.
    6. Preserve original values.
    7. Match by meaning, not exact column names.
    8. For every mapped record, include a confidence level.
    
    Confidence:
    - "high" → almost certain
    - "medium" → likely correct
    - "low" → uncertain mapping
    
    Return EXACTLY this structure:
    
    [
      {
        "mapping": {
          "name": "John",
          "email": "john@test.com",
          "phone": null,
          "company": null
        },
        "confidence": "high"
      }
    ]
    
    CSV Sample:
    ${JSON.stringify(sampleData, null, 2)}
    `;
    const aiResponse = await model.generateContent(prompt);

    const text = aiResponse.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const aiMapping = JSON.parse(cleaned);

    res.json({
      filename: req.file.originalname,
      headers: result.meta.fields,
      rowCount: result.data.length,
      preview: sampleData,
      aiMapping,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      message: "AI processing failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;