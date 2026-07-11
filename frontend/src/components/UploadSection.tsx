import { useState } from "react";
interface UploadSectionProps {
  loading: boolean;
  error: string;
  selectedFile: File | null;
  onFileChange: (file: File | null) => void;
  onUpload: () => void;
}

function UploadSection({
  loading,
  error,
  selectedFile,
  onFileChange,
  onUpload,
}: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <section className="card" aria-labelledby="upload-heading">
      <h2 id="upload-heading" className="card-title">
  📂 Upload CSV File
</h2>
      <p className="card-description">
      Upload your customer CSV file to preview the data. AI will intelligently map your columns to the GrowEasy CRM schema before import.
      </p>

      <div className="upload-actions">
      <div
  className="file-picker"
  onDragOver={(e) => {
    e.preventDefault();
    setIsDragging(true);
  }}
  onDragLeave={() => setIsDragging(false)}
  onDrop={(e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile && droppedFile.name.toLowerCase().endsWith(".csv")) {
      onFileChange(droppedFile);
    }
  }}
>
<label
  className={`file-picker-label ${isDragging ? "drag-active" : ""}`}
>            <input
              type="file"
              accept=".csv"
              className="file-picker-input"
              onChange={(e) => {
                if (e.target.files?.length) {
                  onFileChange(e.target.files[0]);
                }
              }}
            />
            <span className="file-picker-icon" aria-hidden="true">
            📂

            </span>
            <span>
  <span className="file-picker-text">
    {isDragging
      ? "📥 Drop your CSV file here"
      : "📂 Choose a CSV file or drag & drop it here"}
  </span>

  <span className="file-picker-hint">
    {isDragging
      ? "Release to select the file"
      : "Supported format: .csv"}
  </span>
</span>
          </label>
        </div>

        {selectedFile && (
          <p className="selected-filename">
            <span className="selected-filename-label">📄 Selected file:</span>
            {selectedFile.name}
          </p>
        )}

        <button
          type="button"
          className="btn btn-primary"
          onClick={onUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload CSV"}
        </button>
      </div>

      {error && (
        <div className="alert alert-error" role="alert">
          {error}
        </div>
      )}
    </section>
  );
}

export default UploadSection;
