interface ImportedRecord {
  name?: string;
  email?: string;
  mobile_without_country_code?: string;
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
  
}


function AiMappingTable({
  aiMapping,
}: AiMappingTableProps) {
  return (
    <>
<section className="card">
  <h2 className="card-title">📊 Import Summary</h2>

  <div className="stats-row">
    <div className="stat-card">
      <span className="stat-card-label">Imported</span>
      <span className="stat-card-value">
        {aiMapping.importedRecords.length}
      </span>
    </div>

    <div className="stat-card">
      <span className="stat-card-label">Skipped</span>
      <span className="stat-card-value">
        {aiMapping.skippedRecords.length}
      </span>
    </div>

    <div className="stat-card">
      <span className="stat-card-label">Total Processed</span>
      <span className="stat-card-value">
        {aiMapping.importedRecords.length +
          aiMapping.skippedRecords.length}
      </span>
    </div>
  </div>
</section>
<h2 id="ai-mapping-heading" className="card-title">
  🤖 AI Mapping Preview
</h2>

<p className="card-description">
  AI has intelligently mapped your uploaded CSV data to the ImportIQ CRM schema.
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
      <td>{item.mobile_without_country_code || "-"}</td>
      <td>{item.company || "-"}</td>
      <td>{item.crm_status || "-"}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </>
  );
}

export default AiMappingTable;
