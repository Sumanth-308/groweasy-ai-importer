interface AiMappingItem {
  mapping: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
  };
  confidence: number | string;
}

interface AiMappingTableProps {
  aiMapping: AiMappingItem[];
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
              <th scope="col">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {aiMapping.map((item, index) => (
              <tr key={index}>
                <td>{item.mapping.name || "-"}</td>
                <td>{item.mapping.email || "-"}</td>
                <td>{item.mapping.phone || "-"}</td>
                <td>{item.mapping.company || "-"}</td>
                <td>
                  <span className={getConfidenceBadgeClass(item.confidence)}>
                    {formatConfidenceLabel(item.confidence)}
                  </span>
                </td>
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
