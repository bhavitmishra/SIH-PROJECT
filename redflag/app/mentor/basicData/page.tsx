"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function StudentUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setMessage(null);
  };

  const handleUpload = async () => {
    setMessage(null);

    if (!file) {
      setMessage("Please select a CSV or XLSX file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
    const res = await fetch("http://localhost:2025/api/basicData", {
        method: "POST",
        body: formData,
      });
      
      router.push("/mentor/model")
      // TODO: change this to your real backend URL if not using Next API routes
      

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload file.");
      }

      setMessage(
        data.message ||
          "Student data uploaded and processed successfully."
      );
    } catch (err: any) {
      setMessage(err.message || "Something went wrong while uploading.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-[#333] flex">
      {/* Sidebar */}


      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
       

        {/* Body */}
        <div className="flex-1 p-4 md:p-8 space-y-6">
          {/* Info banner */}
          <div className="rounded-xl border-[1.5px] border-gray-200 bg-gray-50 px-4 py-3 text-xs md:text-sm text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-2 shadow-sm">
            <div className="font-medium text-[#111]">
              Upload student master sheet.
            </div>
            <div className="text-gray-500">
              File should be in <span className="font-semibold">.csv</span>{" "}
              or <span className="font-semibold">.xlsx</span> format and
              follow the required column schema.
            </div>
          </div>

          {/* Layout: left info, right upload card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: schema explanation */}
            <section className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 md:p-6 space-y-4">
              <h2 className="text-base md:text-lg font-semibold text-[#111]">
                Expected File Structure
              </h2>
              <p className="text-xs md:text-sm text-gray-600">
                Each row in the CSV/XLSX will be converted to a{" "}
                <span className="font-mono text-gray-800">Student</span>{" "}
                record in the database.
              </p>

              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Required / optional columns:
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>
                    <span className="font-mono text-gray-800">
                      enroll_no
                    </span>{" "}
                    – required, unique per student.
                  </li>
                  <li>
                    <span className="font-mono text-gray-800">name</span> –{" "}
                    required, full name of student.
                  </li>
                  <li>
                    <span className="font-mono text-gray-800">email</span> –{" "}
                    optional, student email.
                  </li>
                  <li>
                    <span className="font-mono text-gray-800">
                      parentEmail
                    </span>{" "}
                    – optional, parent/guardian email.
                  </li>
                  <li>
                    <span className="font-mono text-gray-800">
                      parentPhone
                    </span>{" "}
                    – optional, parent contact number.
                  </li>
                  <li>
                    <span className="font-mono text-gray-800">
                      currentLevel
                    </span>{" "}
                    – optional, numeric level (class/semester).
                  </li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-xl p-4 bg-white">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Sample CSV (first rows)
                </p>
                <pre className="text-[11px] leading-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-x-auto">
                  {`enroll_no,name,email,parentEmail,parentPhone,currentLevel
23ETC1054,Ananya Sharma,ananya@college.ac.in,parent@mail.com,98xxxxxx12,3
23ETC1071,Rahul Verma,,,3`}
                </pre>
              </div>
            </section>

            {/* Right: upload card */}
            <section className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 md:p-6 flex flex-col justify-between gap-4">
              <div>
                <h2 className="text-base md:text-lg font-semibold text-[#111] mb-1">
                  Upload File
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mb-4">
                  Select the CSV or XLSX file exported from your institute
                  system or filled as per the template.
                </p>

                <div className="border-[1.5px] border-dashed border-gray-300 rounded-2xl bg-gray-50 px-4 py-6 flex flex-col items-center gap-3">
                  <div className="text-sm font-medium text-[#111]">
                    Choose file
                  </div>
                  <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={handleFileChange}
                    className="text-xs text-gray-600
                      file:mr-4 file:rounded-full file:border-0
                      file:bg-gray-900 file:text-gray-50 file:px-4 file:py-2
                      file:text-xs file:font-semibold
                      hover:file:brightness-110"
                  />
                  <div className="text-[11px] text-gray-500">
                    Max size: depends on server limits. Format: .csv or
                    .xlsx
                  </div>
                  {file && (
                    <div className="mt-1 text-xs text-gray-700">
                      Selected:{" "}
                      <span className="font-semibold">
                        {file.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploading || !file}
                  className="w-full rounded-xl border-[1.5px] border-gray-900 bg-gray-900 text-gray-50 text-sm font-semibold py-2.5 shadow-sm hover:brightness-110 disabled:opacity-60 disabled:hover:brightness-100"
                >
                  {uploading ? "Uploading..." : "Upload & Process"}
                </button>

                {message && (
                  <p className="text-xs text-gray-700 mt-1">{message}</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}