import { useState } from "react";
import Header from "./components/Header";
import UploadSection from "./components/UploadSection";
import CsvPreviewTable from "./components/CsvPreviewTable";
import AiMappingTable from "./components/AiMappingTable";
import SuccessMessage from "./components/SuccessMessage";

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
    <main className="dashboard">
      <Header />

      <UploadSection
        loading={loading}
        error={error}
        selectedFile={file}
        onFileChange={setFile}
        onUpload={handleUpload}
      />

      {result && (
        <div className="results">
          <CsvPreviewTable
            filename={result.filename}
            rowCount={result.rowCount}
            headers={result.headers}
            preview={result.preview}
          />

          <section className="card" aria-labelledby="ai-mapping-heading">
            <AiMappingTable
              aiMapping={result.aiMapping}
              onConfirmImport={handleImport}
            />

            {imported && <SuccessMessage />}
          </section>
        </div>
      )}

      <footer className="page-footer">
        © 2026 GrowEasy AI Importer • Built with React • Express • Gemini AI
      </footer>
    </main>
  );
}

export default App;
