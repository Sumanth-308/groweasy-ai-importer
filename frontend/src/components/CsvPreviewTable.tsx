interface CsvPreviewTableProps {
  filename: string;
  rowCount: number;
  headers: string[];
  preview: Record<string, string>[];
}

function CsvPreviewTable({
  filename,
  rowCount,
  headers,
  preview,
}: CsvPreviewTableProps) {
  return (
    <section className="card" aria-labelledby="csv-preview-heading">
      <h2 id="csv-preview-heading" className="card-title">
        CSV Preview
      </h2>
      <p className="card-description">
        A preview of the uploaded file before AI mapping is applied.
      </p>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-card-label">Uploaded File</span>
          <span className="stat-card-value">{filename}</span>
        </div>
        <div className="stat-card">
          <span className="stat-card-label">Total Rows</span>
          <span className="stat-card-value">{rowCount}</span>
        </div>
        <div className="stat-card">
          <span className="stat-card-label">AI Provider</span>
          <span className="stat-card-value">Gemini</span>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preview.map((row, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CsvPreviewTable;
