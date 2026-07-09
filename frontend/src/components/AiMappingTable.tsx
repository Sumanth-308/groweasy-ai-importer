interface ImportedRecord {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  city?: string;
  crm_status?: string;
}

interface AiMappingResponse {
  importedRecords: ImportedRecord[];
  skippedRecords: any[];
}

interface AiMappingTableProps {
  aiMapping: AiMappingResponse;
  onConfirmImport: () => void;
}

function getConfidenceBadgeClass(confidence: number | string): string {
  const level = String(confidence).toLowerCase();

  if (level === "high") return "badge badge-high";
  if (level === "medium") return "badge badge-medium";
  if (level === "low") return "badge badge-low";
  return "badge badge-default";
}

function formatConfidenceLabel(confidence: number | string): string {
  const level = String(confidence).toLowerCase();

  if (level === "high") return "🟢 High";
  if (level === "medium") return "🟠 Medium";
  if (level === "low") return "🔴 Low";
  return String(confidence);
}

function AiMappingTable({ aiMapping, onConfirmImport }: AiMappingTableProps) {
  return (
    <>
    <section className="card">
  <h2>Import Summary</h2>

  <p>
    <strong>Imported Records:</strong>{" "}
    {aiMapping.importedRecords.length}
  </p>

  <p>
    <strong>Skipped Records:</strong>{" "}
    {aiMapping.skippedRecords.length}
  </p>

  <p>
    <strong>Total Processed:</strong>{" "}
    {aiMapping.importedRecords.length +
      aiMapping.skippedRecords.length}
  </p>
</section>
      <h2 id="ai-mapping-heading" className="card-title">
        AI Mapping Preview
      </h2>
      <p className="card-description">
        Review how AI mapped your CSV columns to CRM fields before confirming.
      </p>

      <div className="table-wrapper">
        <table className="data-table" aria-labelledby="ai-mapping-heading">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Company</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
  {aiMapping.importedRecords.map((item, index) => (
    <tr key={index}>
      <td>{item.name || "-"}</td>
      <td>{item.email || "-"}</td>
      <td>{item.phone || "-"}</td>
      <td>{item.company || "-"}</td>
      <td>{item.crm_status || "-"}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>

      <button
        type="button"
        className="btn btn-primary btn-block"
        onClick={onConfirmImport}
      >
        Confirm Import
      </button>
    </>
  );
}

export default AiMappingTable;
