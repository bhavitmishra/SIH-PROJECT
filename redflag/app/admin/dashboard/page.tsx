"use client";

import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("addMentor");
  const [email, setEmail] = useState("");

  // Handle add mentor request
  const handleAddMentor = async () => {
    if (!email) return;
    try {
      await axios.post("/api/mailsender/", {
        email,

        adminId: session?.user?.adminId || "",
      });
      alert("Mentor added and email sent!");
      setEmail(""); // clear input
    } catch (error) {
      console.error(error);
      alert("Failed to add mentor.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="text-2xl font-bold text-red-500 p-6">RedFlag Admin</div>
        <nav className="flex-1">
          {[
            { id: "home", label: "Home" },
            { id: "viewMentors", label: "View Mentors" },
            { id: "addMentor", label: "Add Mentor" },
            { id: "reports", label: "Reports" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-6 py-3 hover:bg-red-50 ${
                activeTab === item.id
                  ? "bg-red-100 font-semibold text-red-600"
                  : "text-gray-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t">
          <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {/* Home */}
        <div className={activeTab === "home" ? "block" : "hidden"}>
          <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Admin ID:{" "}
            {
              // @ts-ignore
              session?.user?.adminId || "Not found"
            }
          </p>
        </div>

        {/* View Mentors */}
        <div className={activeTab === "viewMentors" ? "block" : "hidden"}>
          <h2 className="text-xl font-semibold">Mentors List</h2>
          <p className="mt-2 text-gray-600">Here you can see all mentors.</p>
        </div>

        {/* Add Mentor */}
        <div className={activeTab === "addMentor" ? "block" : "hidden"}>
          <div className="p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-red-600">
              Add New Mentor
            </h2>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                placeholder="example: mentor@school.edu.in"
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                onClick={handleAddMentor}
              >
                Add Mentor
              </button>
            </div>
          </div>
        </div>

        {/* Reports */}
        <div className={activeTab === "reports" ? "block" : "hidden"}>
          <h2 className="text-xl font-semibold">Reports</h2>
          <p className="mt-2 text-gray-600">
            Other reports and analytics here.
          </p>
        </div>
      </main>
    </div>
  );
}
