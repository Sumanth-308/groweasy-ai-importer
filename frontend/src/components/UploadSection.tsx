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
  return (
    <section className="card" aria-labelledby="upload-heading">
      <h2 id="upload-heading" className="card-title">
        Upload CSV
      </h2>
      <p className="card-description">
        Select a CSV file from your computer to begin the AI mapping process.
      </p>

      <div className="upload-actions">
        <div className="file-picker">
          <label className="file-picker-label">
            <input
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
              ↑
            </span>
            <span>
              <span className="file-picker-text">Choose CSV file</span>
              <span className="file-picker-hint">Only .csv files are supported</span>
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
