import { useState } from "react";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [imported, setImported] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setImported(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = () => {
    setImported(true);
  };

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>GrowEasy AI CSV Importer</h1>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          if (e.target.files?.length) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <br />
      <br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload CSV"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 20 }}>
          {error}
        </p>
      )}

      {result && (
        <>
          <section style={{ marginTop: 30 }}>
            <h2>CSV Preview</h2>

            <p>
              <b>File:</b> {result.filename}
            </p>

            <p>
              <b>Total Rows:</b> {result.rowCount}
            </p>

            <table
              border={1}
              cellPadding={8}
              style={{
                borderCollapse: "collapse",
                width: "100%",
              }}
            >
              <thead>
                <tr>
                  {result.headers.map((header: string) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {result.preview.map((row: any, index: number) => (
                  <tr key={index}>
                    {result.headers.map((header: string) => (
                      <td key={header}>
                        {row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section style={{ marginTop: 40 }}>
            <h2>AI Mapping Preview</h2>

            <table
              border={1}
              cellPadding={8}
              style={{
                borderCollapse: "collapse",
                width: "100%",
              }}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>Confidence</th>
                </tr>
              </thead>

              <tbody>
                {result.aiMapping.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{item.mapping.name || "-"}</td>
                    <td>{item.mapping.email || "-"}</td>
                    <td>{item.mapping.phone || "-"}</td>
                    <td>{item.mapping.company || "-"}</td>
                    <td>{item.confidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <br />

            <button onClick={handleImport}>
              Confirm Import
            </button>

            {imported && (
              <p style={{ marginTop: 15 }}>
                Import confirmed successfully.
              </p>
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default App;