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

    res.json({
      filename: req.file.originalname,
      headers: result.meta.fields,
      rowCount: result.data.length,
      preview: sampleData,
    });

  } catch (error) {
    console.error("Upload Error:", error);

    res.status(500).json({
      message: "CSV processing failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.post("/import", async (req, res) => {
  let records: any[] = [];

  try {
    records = req.body.records;

    if (!records || !Array.isArray(records)) {
      return res.status(400).json({
        message: "Records are required",
      });
    }

    const prompt = `
You are an AI CRM data mapping engine.

Your task:
Convert CSV records into GrowEasy CRM format.

Target CRM fields:
${crmFields.join(", ")}

Rules:
1. Return ONLY valid JSON.
2. Do not return markdown.
3. Do not wrap JSON in code blocks.
4. Do not invent data.
5. Use null when information is unavailable.
6. Map fields based on meaning, not exact column names.
7. Preserve original values where possible.
8. Skip a record ONLY if both email and phone are missing.
9. Normalize dates into YYYY-MM-DD format when possible.
10. Handle multiple emails and phone numbers intelligently.

Allowed crm_status examples:
Active, Inactive, Pending, New, Contacted

Return format:

{
  "importedRecords": [
    {
      "name": "",
      "email": "",
      "country_code": "",
      "mobile_without_country_code": "",
      "company": "",
      "city": "",
      "state": "",
      "country": "",
      "lead_owner": null,
      "crm_status": "",
      "crm_note": null,
      "data_source": "CSV Import",
      "possession_time": null,
      "description": null
    }
  ],
  "skippedRecords": []
}

Input CSV records:

${JSON.stringify(records, null, 2)}
`;

    const aiResponse = await model.generateContent(prompt);

    const text = aiResponse.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const aiMapping = JSON.parse(cleaned);

    res.json({
      aiMapping,
    });

  } catch (error: any) {
    if (error?.status === 429) {
      return res.json({
        aiMapping: {
          importedRecords: records.map((record: any) => ({
            name:
              record.customer_name ??
              record.full_name ??
              record.name ??
              record.Name ??
              record["Full Name"] ??
              record.client_name ??
              "",
    
            email:
              record.primary_email ??
              record.email ??
              record.Email ??
              record.email_address ??
              record["Email Address"] ??
              "",
    
            phone:
              record.mobile_number ??
              record.mobile ??
              record.phone ??
              record.Phone ??
              record.Contact ??
              record.contact ??
              record["Mobile Number"] ??
              "",
    
            company:
              record.organization ??
              record.company ??
              record.Company ??
              record.company_name ??
              "",
    
            city:
              record.city ??
              record.City ??
              record.location ??
              "",
    
            state: record.state ?? record.State ?? "",
    
            country: record.country ?? record.Country ?? "",
    
            country_code: "",
    
            mobile_without_country_code:
              record.mobile_number ??
              record.mobile ??
              record.phone ??
              "",
    
            lead_owner: null,
    
            crm_status:
              record.status ??
              record.crm_status ??
              "Active",
    
            crm_note: null,
    
            data_source: "CSV Import",
    
            possession_time:
              record.created_date ??
              record.date ??
              null,
    
            description:
              `${record.department ?? ""} ${record.designation ?? ""}`.trim() || null,
          })),
          skippedRecords: [],
        },
        fallback: true,
      });
    }
    
    return res.status(500).json({
      message: "AI import failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
      }
    });
    
    export default router;