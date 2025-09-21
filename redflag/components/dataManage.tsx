"use client";

import { useState } from "react";
import JSZip from "jszip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, BarChart2, Mail, FileCheck2, Loader2 } from "lucide-react";

// This is the component for your "Data Import" page
export function DataImport() {
  // --- 1. All the state and logic lives here ---
  const [attendanceFile, setAttendanceFile] = useState<File | null>(null);
  const [marksFile, setMarksFile] = useState<File | null>(null);
  const [feesFile, setFeesFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "attendance" | "marks" | "fees"
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (type === "attendance") setAttendanceFile(file);
    if (type === "marks") setMarksFile(file);
    if (type === "fees") setFeesFile(file);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!attendanceFile || !marksFile || !feesFile) {
      setMessage("⚠️ Please select all three files before uploading.");
      return;
    }
    setUploading(true);
    setMessage("");
    try {
      const zip = new JSZip();
      zip.file(attendanceFile.name, attendanceFile);
      zip.file(marksFile.name, marksFile);
      zip.file(feesFile.name, feesFile);
      const blob = await zip.generateAsync({ type: "blob" });
      const formData = new FormData();
      formData.append("file", new File([blob], "student_data.zip", { type: "application/zip" }));
      const res = await fetch("http://localhost:3333/ietwebhook/attendance", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setMessage("✅ Files uploaded successfully!");
        setAttendanceFile(null);
        setMarksFile(null);
        setFeesFile(null);
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

  // --- 2. A small, reusable component for each upload card ---
  const UploadCard = ({ icon, title, description, file, type, buttonText, buttonColor }) => (
    <Card className="text-center">
      <CardContent className="p-6">
        <div className={`mx-auto w-fit p-3 rounded-full ${buttonColor.replace('bg-', 'bg-opacity-10 ')}`}>
          {icon}
        </div>
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
        
        {/* The main trick: The label acts as our custom button */}
        <label htmlFor={type} className={`mt-6 inline-block w-full text-white py-2.5 rounded-lg cursor-pointer ${buttonColor} hover:opacity-90`}>
          {file ? (
            <div className="flex items-center justify-center gap-2">
              <FileCheck2 className="w-4 h-4" />
              <span>{file.name}</span>
            </div>
          ) : (
            buttonText
          )}
        </label>
        {/* The actual file input is hidden */}
        <input id={type} type="file" className="sr-only" accept=".csv,.xlsx" onChange={(e) => handleFileChange(e, type)} />
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Data Import</h1>
          <p className="text-gray-600 mt-2">Upload the latest files to keep student data up-to-date.</p>
      </div>

      {/* --- 3. The main UI layout --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <UploadCard 
          icon={<Upload className="w-6 h-6 text-blue-600" />}
          title="Attendance Data"
          description="Upload student attendance records"
          file={attendanceFile}
          type="attendance"
          buttonText="Upload CSV"
          buttonColor="bg-blue-600"
        />
        <UploadCard 
          icon={<BarChart2 className="w-6 h-6 text-green-600" />}
          title="Assessment Scores"
          description="Import test results and grades"
          file={marksFile}
          type="marks"
          buttonText="Upload CSV"
          buttonColor="bg-green-600"
        />
        <UploadCard 
          icon={<Mail className="w-6 h-6 text-purple-600" />}
          title="Fee Payment Data"
          description="Track payment status"
          file={feesFile}
          type="fees"
          buttonText="Upload CSV"
          buttonColor="bg-purple-600"
        />
      </div>

      {/* --- 4. The final action button --- */}
      <div className="mt-8 max-w-5xl mx-auto">
        <Button
            onClick={handleUpload}
            disabled={!attendanceFile || !marksFile || !feesFile || uploading}
            className="w-full text-lg py-6"
            size="lg"
        >
            {uploading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {uploading ? "Processing Files..." : "Upload All Files to Server"}
        </Button>
        {message && <p className={`mt-4 text-sm text-center ${message.includes('failed') || message.includes('wrong') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
      </div>
    </div>
  );
}