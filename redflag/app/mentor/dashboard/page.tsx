"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import JSZip from "jszip";

export default function MentorDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("home");

  // explicit file slots
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
      formData.append(
        "file",
        new File([blob], "student_data.zip", { type: "application/zip" })
      );

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

  const DashboardHome = () => (
    <div className="p-6 space-y-4">
      <div>
        Welcome, Mentor {session?.user?.name}
        <h1 className="mt-2 text-gray-600">
          Your Email: {session?.user?.email}
        </h1>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">
            Attendance File
          </label>
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={(e) => handleFileChange(e, "attendance")}
          />
          {attendanceFile && (
            <p className="text-xs text-gray-600">{attendanceFile.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Marks File</label>
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={(e) => handleFileChange(e, "marks")}
          />
          {marksFile && (
            <p className="text-xs text-gray-600">{marksFile.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fees File</label>
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={(e) => handleFileChange(e, "fees")}
          />
          {feesFile && <p className="text-xs text-gray-600">{feesFile.name}</p>}
        </div>

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload All"}
        </button>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </div>
    </div>
  );

  const MyStudents = () => (
    <div className="p-6">Here you can view all your assigned students</div>
  );

  const Reports = () => (
    <div className="p-6">Performance and risk reports will appear here</div>
  );

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "students", label: "My Students" },
    { id: "reports", label: "Reports" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="text-2xl font-bold text-blue-500 p-6">
          RedFlag Mentor
        </div>
        <nav className="flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-6 py-3 hover:bg-blue-50 ${
                activeTab === item.id
                  ? "bg-blue-100 font-semibold text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t">
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === "home" && <DashboardHome />}
        {activeTab === "students" && <MyStudents />}
        {activeTab === "reports" && <Reports />}
      </main>
    </div>
  );
}
