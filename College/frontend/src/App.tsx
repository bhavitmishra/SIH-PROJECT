import { useState } from "react";

export default function FileUploader() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3902/upload/attendance", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("✅ File uploaded successfully!");
      } else {
        setMessage("❌ Upload failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed rounded-2xl shadow-md max-w-md mx-auto bg-white">
      <h2 className="text-xl font-semibold">Upload Student Data</h2>

      <input
        type="file"
        accept=".txt ,.csv,.xlsx"
        onChange={handleFileChange}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full 
                   file:border-0 file:text-sm file:font-semibold 
                   file:bg-blue-50 file:text-blue-700 
                   hover:file:bg-blue-100"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
}
