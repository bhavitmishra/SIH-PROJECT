"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  Users, Settings, Bell, Shield, Activity, Mail,
  UserPlus, Megaphone, BarChart3, Building2
} from "lucide-react";

import AnimationWrapper from "@/components/ui/pageTransition";

/* ---------------- MAIN ADMIN DASHBOARD ---------------- */

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  // Temporary institute read
  const institute = {
    name: "Sunrise Public School",
    type: "School",
    levelName: "Class",
    levelCount: 12,
  };

  const [activeTab, setActiveTab] = useState("overview");
  const [email, setEmail] = useState("");
  const [mentor, setMentor] = useState([
    { id: 1, email: "mentor1@gmail.com" },
    { id: 2, email: "mentor2@gmail.com" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  /* ---------------- AUTO HIDE SUCCESS/FAIL MESSAGE ---------------- */
  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;

    if (message) {
      t1 = setTimeout(() => setShowMessage(false), 1800);
      t2 = setTimeout(() => setMessage(""), 2400);
    }
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [message]);

  /* ---------------- ADD MENTOR HANDLER ---------------- */
  const handleAddMentor = async () => {
    if (!email) return alert("Enter mentor email");

    setMentor(prev => [...prev, { id: Date.now(), email }]);
    setIsLoading(true);

    try {
      await axios.post("/api/mailsender/", {
        email,
        // @ts-ignore
        adminId: session?.user?.adminId,
      });
      setMessage("Mentor added successfully!");
      setShowMessage(true);
      setEmail("");
    } catch {
      setMessage("Failed to add mentor.");
      setShowMessage(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFormSubmit = (e: React.FormEvent) => { e.preventDefault(); handleAddMentor(); };

  /* ========================= UI START ========================= */

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">

      {/* ==================== SIDEBAR ==================== */}
      <aside className="w-64 bg-white shadow-lg flex flex-col border-r">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 text-indigo-600 text-xl font-bold">
            <Shield className="w-6 h-6" />
            Admin Panel
          </div>
        </div>

        {/* Institute Info */}
        <div className="px-6 py-4 border-b text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <Building2 className="w-4 h-4 text-indigo-500" />
            <span className="font-semibold">{institute.name}</span>
          </div>
          <p className="text-xs text-gray-500 ml-6">
            {institute.type} · {institute.levelName} System ({institute.levelCount} Levels)
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 text-sm">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "mentors", label: "Mentors", icon: Users },
            { id: "systemAlerts", label: "Alerts", icon: Bell },
            { id: "announcement", label: "Communicate", icon: Megaphone },
            { id: "settings", label: "Settings", icon: Settings }
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full gap-3 px-4 py-3 rounded-md mb-1 transition ${
                  activeTab === item.id
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="flex-1 overflow-y-auto p-6">
        <AnimationWrapper key={activeTab}>

          {/* ------------ OVERVIEW ------------ */}
          {activeTab === "overview" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
              <p className="text-gray-600 mb-6">Monitor overall system health & mentor performance</p>

              <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-6">
                <StatCard title="Total Mentors" value="23" icon={<Users className="w-8 h-8 text-indigo-500" />} />
                <StatCard title="Total Students" value="322" icon={<Activity className="w-8 h-8 text-green-500" />} />
                <StatCard title="System Alerts" value="23" icon={<Bell className="w-8 h-8 text-yellow-500" />} />
                <StatCard title="System Status" value="Healthy" icon={<Shield className="w-8 h-8 text-green-600" />} />
              </div>
            </div>
          )}

          {/* ------------ MENTORS ------------ */}
          {activeTab === "mentors" && (
            <div className="space-y-10">

              {/* FORM */}
              <div>
                <h2 className="text-2xl font-bold mb-2">Mentor Management</h2>
                <p className="text-gray-600 mb-6">Invite and manage mentors</p>

                <div className="p-6 bg-white border rounded-xl shadow-sm w-full max-w-md">
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Mentor&apos;s Email
                    </label>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        placeholder="mentor@institute.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md border-gray-300 pl-10 shadow-sm py-2.5"
                      />
                    </div>

                    <button
                      disabled={isLoading}
                      className="flex w-full justify-center items-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                      <UserPlus className="w-4 h-4" />
                      {isLoading ? "Adding Mentor..." : "Add Mentor"}
                    </button>
                  </form>
                </div>

                {message && (
                  <p className={`mt-3 text-sm ${message.includes("Failed") ? "text-red-600" : "text-green-600"} transition-opacity duration-500 ${showMessage ? "opacity-100" : "opacity-0"}`}>
                    {message}
                  </p>
                )}
              </div>

              {/* TABLE */}
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mentors List</h2>
                <p className="text-sm text-gray-500 mb-4">All registered mentors</p>

                <div className="w-full overflow-x-auto rounded-lg border bg-white">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 font-medium text-gray-500">ID</th>
                        <th className="px-6 py-3 font-medium text-gray-500">Email</th>
                        <th className="px-6 py-3 font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {mentor.map(m => (
                        <tr key={m.id} className="hover:bg-gray-50">
                          <td className="px-6 py-3 text-gray-600">{m.id}</td>
                          <td className="px-6 py-3 font-semibold">{m.email}</td>
                          <td className="px-6 py-3">
                            <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          )}

          {/* ------------ ALERTS ------------ */}
          {activeTab === "systemAlerts" && <AlertsUI />}

          {/* ------------ COMMUNICATION ------------ */}
          {activeTab === "announcement" && <AnnouncementUI />}

          {/* ------------ SETTINGS ------------ */}
          {activeTab === "settings" && (
            <div>
              <h2 className="text-2xl font-bold">Settings</h2>
              <p className="text-gray-600">Institute configuration & system preferences coming soon.</p>
            </div>
          )}

        </AnimationWrapper>
      </main>
    </div>
  );
}

/* ========= SMALL STAT CARD ========= */
const StatCard = ({ title, value, icon }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
    {icon}
  </div>
);

/* ========= PLACEHOLDER ALERT UI ========= */
const AlertsUI = () => (
  <div>
    <h2 className="text-2xl font-bold mb-2">System Alerts</h2>
    <p className="text-gray-600">Monitor alerts from mentors</p>
  </div>
);

/* ========= PLACEHOLDER COMMUNICATION UI ========= */
const AnnouncementUI = () => (
  <div>
    <h2 className="text-2xl font-bold mb-2">Communicate</h2>
    <p className="text-gray-600">Send announcements & messages</p>
  </div>
);
