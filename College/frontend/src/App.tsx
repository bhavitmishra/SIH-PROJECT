import React, { useState, useMemo } from "react";

type Year = "FY" | "SY" | "TY" | "BE";
type Branch = "CSE" | "IT" | "ETC" | "MECH" | "CIVIL";

const SUBJECT_MAP: Record<Year, Record<Branch, string[]>> = {
  FY: {
    CSE: ["Maths I", "Physics", "Basic Electrical"],
    IT: ["Maths I", "Physics", "Programming Basics"],
    ETC: ["Maths I", "Physics", "Electronics I"],
    CIVIL: ["Maths I", "Physics", "Circuit Theory"],
    MECH: ["Maths I", "Physics", "Engineering Drawing"],
  },
  SY: {
    CSE: ["DSA", "OOP in Java", "COA"],
    IT: ["DSA", "OOP in Java", "DBMS"],
    ETC: ["Signals & Systems", "Digital Electronics"],
    CIVIL: ["Machines I", "Network Analysis"],
    MECH: ["Thermo", "Mechanics"],
  },
  TY: {
    CSE: ["OS", "DBMS", "CN"],
    IT: ["OS", "DBMS", "CN"],
    ETC: [
      "Microcontrollers",
      "Java Oops",
      "Computer Networks",
      "VLSI",
      "POM",
      "Digital Communtication",
    ],
    CIVIL: ["Power Systems"],
    MECH: ["Machine Design"],
  },
  BE: {
    CSE: ["ML", "Distributed Systems"],
    IT: ["ML", "Big Data"],
    ETC: ["VLSI"],
    CIVIL: ["Power Electronics"],
    MECH: ["Industrial Engineering"],
  },
};

export default function IetDavvTestPortal() {
  const [year, setYear] = useState<Year | "">("");
  const [branch, setBranch] = useState<Branch | "">("");
  const [subject, setSubject] = useState<string>("");

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const subjects = useMemo(() => {
    if (!year || !branch) return [];
    return SUBJECT_MAP[year]?.[branch] || [];
  }, [year, branch]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!year || !branch || !subject) {
      setMessage("⚠️ Select year, branch and subject first.");
      return;
    }

    if (!file) {
      setMessage("⚠️ Please select a file first.");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("year", year);
    formData.append("branch", branch);
    formData.append("subject", subject);

    try {
      const formValues = Object.fromEntries(formData)
console.log(formValues)
      
      const res = await fetch("http://localhost:3902/upload/attendance", {
        method: "POST",
        body: formData,
      });

      setMessage(
        res.ok
          ? "✅ File uploaded successfully!"
          : "❌ Upload failed. Check format or server."
      );
    } catch {
      setMessage("⚠️ Something went wrong while uploading.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">IET</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">IET DAVV</h1>
                <p className="text-xs text-gray-500">Academic Portal</p>
              </div>
            </div>
            
            <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
              Professor Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full mb-6">
            <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-semibold text-indigo-700">Assessment Management System</span>
          </div>
          
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Streamline Your
            <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Academic Records
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload test scores and attendance records effortlessly. Powered by intelligent analytics for comprehensive student performance tracking.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">5+</h3>
            <p className="text-sm text-gray-600">Branches</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🎓</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">4</h3>
            <p className="text-sm text-gray-600">Academic Years</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">3</h3>
            <p className="text-sm text-gray-600">File Formats</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">ML</h3>
            <p className="text-sm text-gray-600">Powered</p>
          </div>
        </div>

        {/* Main Upload Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-8">
            <h3 className="text-2xl font-bold text-white mb-2">Upload Academic Data</h3>
            <p className="text-indigo-100">Select class details and upload structured records</p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Year Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Academic Year
                </label>
                <div className="relative">
                  <select
                    value={year}
                    onChange={(e) => {
                      setYear(e.target.value as Year | "");
                      setSubject("");
                    }}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all appearance-none cursor-pointer text-gray-900 font-medium"
                  >
                    <option value="">Choose Year</option>
                    <option value="FY">First Year (FY)</option>
                    <option value="SY">Second Year (SY)</option>
                    <option value="TY">Third Year (TY)</option>
                    <option value="BE">Fourth Year (BE)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Branch Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Branch
                </label>
                <div className="relative">
                  <select
                    value={branch}
                    onChange={(e) => {
                      setBranch(e.target.value as Branch | "");
                      setSubject("");
                    }}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all appearance-none cursor-pointer text-gray-900 font-medium"
                  >
                    <option value="">Choose Branch</option>
                    <option value="CSE">Computer Science (CSE)</option>
                    <option value="IT">Information Technology (IT)</option>
                    <option value="ETC">Electronics (ETC)</option>
                    <option value="CIVIL">Civil Engineering (CIVIL)</option>
                    <option value="MECH">Mechanical (MECH)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Selection */}
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-semibold text-gray-700">
                Subject
              </label>
              <div className="relative">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={!year || !branch}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all appearance-none cursor-pointer text-gray-900 font-medium disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
                >
                  <option value="">
                    {year && branch ? "Choose Subject" : "Select year and branch first"}
                  </option>
                  {subjects.map((subj) => (
                    <option key={subj} value={subj}>
                      {subj}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-semibold text-gray-700">
                Upload File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors bg-gray-50">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <input
                    type="file"
                    accept=".txt,.csv,.xlsx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold cursor-pointer hover:bg-indigo-700 transition-colors inline-block mb-2"
                  >
                    Choose File
                  </label>
                  {file && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected: <span className="font-semibold text-indigo-600">{file.name}</span>
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-3">
                    Supported formats: .txt, .csv, .xlsx
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                <p className="text-xs font-semibold text-blue-900 mb-2">Expected Format:</p>
                <code className="text-xs text-blue-700 font-mono">
                  name | enroll | roll_no | marks | attendance | subject
                </code>
              </div>
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {uploading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Uploading...
                </span>
              ) : (
                "Upload & Process"
              )}
            </button>

            {message && (
              <div className={`mt-4 p-4 rounded-xl ${
                message.includes("✅") 
                  ? "bg-green-50 border border-green-200 text-green-800" 
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}>
                <p className="text-sm font-semibold text-center">{message}</p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Fast Processing</h4>
            <p className="text-sm text-gray-600">Instant upload and validation of academic records with real-time feedback</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Secure Storage</h4>
            <p className="text-sm text-gray-600">Enterprise-grade security for all student data and academic records</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📈</span>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Smart Analytics</h4>
            <p className="text-sm text-gray-600">ML-powered insights for dropout prediction and performance tracking</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2024 Institute of Engineering & Technology, DAVV</p>
            <p className="mt-1">Devi Ahilya Vishwavidyalaya, Indore</p>
          </div>
        </div>
      </footer>
    </div>


                                                                                                                                                                                                
  );
}