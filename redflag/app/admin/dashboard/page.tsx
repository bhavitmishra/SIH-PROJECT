"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Users, Settings, Upload, BarChart3, Bell, Shield, Activity, TrendingUp, Mail, AlertCircle, UserPlus, Calendar, Filter, Send, Megaphone } from 'lucide-react';
import { useRouter } from "next/navigation";
import AnimationWrapper from "@/components/ui/pageTransition"

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("overview");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const router = useRouter();

  // -------------- Temporary for ui ---------------//

    const [mentor, setMentor] = useState([
      {
        id: 1,
        email: "mentor1@gmail.com"
      },
      {
        id: 2,
        email: "mentor2@gmail.com"
      }
    ]);

      // to auto hide message after 2.5 seconds with fade out effect
  useEffect(() => {

    let visibilityTimer: NodeJS.Timeout;
    let messageTimer: NodeJS.Timeout;

    if(message){
      visibilityTimer = setTimeout(() => {
        setShowMessage(false);
      }, 2000)

      messageTimer = setTimeout(() => {
        setMessage("");
      },2500)
    }

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(messageTimer);
    }

  }, [message]);

  // Handle add mentor request
  const handleAddMentor = async () => {
    if (!email){
      alert('Please enter email address');
      return;
    }

    // -------------- Temporary for ui ---------------//
    const newMentor = {
      id: Date.now(), // temporary id
      email
    }

    setMentor((currentMentor) => [...currentMentor, newMentor]);

    setIsLoading(true);
    setMessage("");
    setShowMessage(false);
    try {
      await axios.post("/api/mailsender/", {
        email,
        // @ts-ignore
        adminId: session?.user?.adminId,
      });
      setMessage("Mentor added successfully!");
      setShowMessage(true);
      setEmail(""); // clear input
    } catch (error) {
      console.error(error);
      setMessage("Failed to add mentor. Please try again.");
      setShowMessage(true);
    } finally {
      setIsLoading(false);
      setEmail(""); // clear input
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddMentor();
  }

    return (

      <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}

      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="text-2xl font-bold text-red-500 p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Admin Panel
          </div>
        </div>

        <nav className="flex-1 py-4">
          {[
            { id: "overview", label: "Dashboard Overview", icon: BarChart3 },
            { id: "mentors", label: "Mentor Management", icon: Users },
            { id: "systemAlerts", label: "System Alerts", icon: Bell },
            { id: "announcement", label: "Alert Dispatcher", icon: Megaphone },
          ].map(item => {
            
            const Icon = item.icon;
            return (
              <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-6 py-3 hover:bg-red-50 flex items-center gap-3 transition-colors ${
                  activeTab === item.id
                    ? "bg-red-100 font-semibold text-red-600 border-r-3 border-red-600"
                    : "text-gray-700"
                }`}
              >

                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </aside>
        
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">

          <AnimationWrapper key={activeTab}>
        {/* system overview */}

        <div className={activeTab === "overview" ? 'block' : 'hidden'}>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-2">Monitor overall system health and mentor performance</p>
          </div>
        

        <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Mentors</p>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                  <p className="text-sm text-green-600"> active</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">322</p>
                  <p className="text-sm text-gray-500">Across all mentors</p>
                </div>
                <Activity className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">System Alerts</p>
                  <p className="text-2xl font-bold text-yellow-600">23</p>
                  <p className="text-sm text-gray-500">This month</p>
                </div>
                <Bell className="w-8 h-8 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">System Health</p>
                  <p className="text-2xl font-bold text-green-600">Operational</p>
                  <p className="text-sm text-gray-500">Updated 2 hours ago</p>
                </div>
                <Shield className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>
          </div>

          {/* Mentor Management */}
          <div className={`space-y-10 ${activeTab==='mentors' ? 'block' : 'hidden'}`}> {/* Added a wrapper for consistent spacing */}

  {/* Add Mentor Form */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Mentor Management</h2>
              <p className="text-gray-600 mb-6">Manage mentors and monitor their performance</p>
              
              <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-md">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="mentorEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Mentor's Email Address
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        id="mentorEmail"
                        name="mentorEmail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="mentor@school.edu.in"
                        className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5"
                      />
                    </div>
                  </div>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="flex w-full justify-center items-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{isLoading ? "Adding Mentor..." : "Add Mentor"}</span>
                  </button>
                </form>
              </div>
              {message && (
                <p className={`mt-4 text-sm ${message.includes('Failed') ? 'text-red-600' : 'text-green-600'} transition-opacity duration-500 ease-out ${showMessage ? "opacity-100" : 'opacity-0'}`}>{message}</p>
              )}
            </div>

            {/* Mentor List Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-800">Mentors List</h2>
              <p className="mt-1 text-sm text-gray-500">A complete list of all registered mentors.</p>
              
              {/* New container forces rounded corners on the table */}
              <div className="mt-4 w-full overflow-x-auto rounded-lg border border-gray-200">
                {mentor.length === 0 ? (
                  <p className="p-6 text-center text-gray-500">No mentors have been added yet.</p>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="whitespace-nowrap px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th scope="col" className="whitespace-nowrap px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="whitespace-nowrap px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {mentor.map((m) => (
                        <tr key={m.id} className="hover:bg-gray-50">
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-500">{m.id}</td>
                          <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-800">{m.email}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <button className="font-medium text-red-600 hover:text-red-800">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
        </div>
                {/* System Alerts & Insights */}

        <div className={activeTab === "systemAlerts" ? "block" : "hidden"}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold">System Alerts</h2>
            <p className="text-gray-600">Monitor system-wide alerts and mentor responsiveness</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                Unactioned Alerts
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <p className="font-medium text-red-800">Dr. Anjali Mehta</p>
                  <p className="text-sm text-red-600">4 high-risk student alerts pending for 2+ days</p>
                  <button className="text-xs text-blue-600 hover:underline mt-1">Send Escalation</button>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800">Prof. Raj Kumar</p>
                  <p className="text-sm text-yellow-600">1 moderate-risk alert pending</p>
                  <button className="text-xs text-blue-600 hover:underline mt-1">Send Reminder</button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Alert Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alert Escalation Time</label>
                  <select defaultValue="48 hours" className="w-full px-3 py-2 border rounded-lg">
                    <option>24 hours</option>
                    <option>48 hours</option>
                    <option>72 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notification</label>
                  <select defaultValue="Real-time" className="w-full px-3 py-2 border rounded-lg">
                    <option>Daily Summary</option>
                    <option>Real-time</option>
                    <option>Weekly Summary</option>
                  </select>
                </div>
                <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                  Update Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Announcements Section */}
        <div className={activeTab === 'announcement' ? 'block' : 'hidden'}>
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-900">Dispatch Center</h2>
    <p className="text-gray-600">Create targeted, personalized, and scheduled communications.</p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-sm border max-w-3xl">
    <form className="space-y-6">

      {/* --- 1. The Targeting System --- */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          1. Who gets this message?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Option 1 */}
          <button type="button" className="flex flex-col items-center justify-center p-3 border-2 border-indigo-600 rounded-lg bg-indigo-50 text-indigo-700">
            <Users className="w-6 h-6 mb-1" />
            <span className="text-sm font-semibold">All Mentors</span>
          </button>
          {/* Option 2 */}
          <button type="button" className="flex flex-col items-center justify-center p-3 border border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:bg-gray-50">
            <Users className="w-6 h-6 mb-1" />
            <span className="text-sm font-semibold">All Students</span>
          </button>
          {/* Option 3 - THE WOW FEATURE */}
          <button type="button" className="flex flex-col items-center justify-center p-3 border border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:bg-gray-50">
            <Filter className="w-6 h-6 mb-1" />
            <span className="text-sm font-semibold">Smart Filter</span>
          </button>
        </div>
      </div>

      {/* --- 2. The Message Composer --- */}
      <div>
        <label htmlFor="announcementTitle" className="block text-sm font-semibold text-gray-800 mb-2">
          2. What's the message?
        </label>
        <input
          id="announcementTitle"
          type="text"
          placeholder="e.g., Upcoming Deadline for Reports"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
        />
        <textarea
          id="announcementContent"
          rows={5}
          placeholder="Write your announcement here..."
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
        ></textarea>
        {/* Dynamic Tags */}
        <div className="mt-2 text-xs text-gray-500">
          Add personal touch:
          <button type="button" className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">{`{name}`}</button>
          <button type="button" className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">{`{role}`}</button>
        </div>
      </div>
      
      {/* --- 3. The Action Buttons --- */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t">
        <button type="button" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
          <Calendar className="w-4 h-4" />
          Schedule
        </button>
        <button type="submit" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
          <Send className="w-4 h-4" />
          Send Now
        </button>
      </div>

    </form>
  </div>
</div>
                </AnimationWrapper>
      </main>

      </div>
    )
}