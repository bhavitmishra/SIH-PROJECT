"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function MentorDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("home");

  const DashboardHome = () => (
    <div className="p-6">
      Welcome, Mentor {session?.user?.name}
      <h1 className="mt-2 text-gray-600">Your Email: {session?.user?.email}</h1>
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
