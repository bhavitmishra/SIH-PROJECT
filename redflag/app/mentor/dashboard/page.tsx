"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { studentsData } from "@/lib/studentData";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Upload,
  BarChart,
  Mail,
  ChevronsLeft,
  ChevronsRight,
  Home,
  Users,
  Calendar,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardHome from "@/components/mentorOverview";
import { DataImport } from "@/components/dataManage";
import AnimationWrapper from "@/components/ui/pageTransition";
import { Scheduling } from "@/components/scheduling";

const statusStyles: { [key: string]: string } = {
  "At Risk": "bg-red-100 text-red-800 border-red-200",
  Improving: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "On Track": "bg-green-100 text-green-800 border-green-200",
  New: "bg-blue-100 text-blue-800 border-blue-200",
};

export default function MentorDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // const Scheduling = () => {
  //   return (
  //     <div>
  //       <div className="p-6 text-2xl font-bold">
  //         Students Needing Attention
  //       </div>
  //       <div className="-mt-6 mx-6">These students are flagged for immediate review based on recent activity.</div>
  //       {studentNeedingAttention.map((student, idx) => (
  //         <Link href={`/mentor/students/${student.id}`} key={idx} className="no-underline">
  //           <div className="p-4">
  //             {/* This is the main Card component - it's the container */}
  //             <Card className="w-full max-w-4xl">
  //               {/* CardContent holds the main body of the card */}
  //               <CardContent>
  //                 <div className="space-y-3">
  //                   {/* --- Student 1 --- */}
  //                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
  //                     <div className="flex items-center gap-4">
  //                       {/* <Avatar>
  //                         <AvatarImage src="https://github.com/shadcn.png" alt="Priya Sharma" />
  //                         <AvatarFallback>PS</AvatarFallback>
  //                       </Avatar> */}
  //                       <div>
  //                         <p className="font-semibold">{student.name}</p>
  //                         <p className="text-sm text-gray-400">{student.email}</p>
  //                       </div>
  //                     </div>
  //                     <Badge variant="destructive">{student.issue}</Badge>
  //                   </div>
  //                 </div>
  //               </CardContent>
  //             </Card>
  //           </div>
  //         </Link>
  //       ))}
  //     </div>
  //   );
  // };

  const MyStudents = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    console.log(studentsData);
    const filteredStudents = studentsData
      .filter((student) => {
        // Filter by status
        if (activeFilter === "All") return true;
        return student.status === activeFilter;
      })
      .filter((student) => {
        // Filter by search term (case-insensitive)
        return student.name.toLowerCase().includes(searchTerm.toLowerCase());
      });

    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">My Students</CardTitle>
          </CardHeader>
          <CardContent>
            {/* --- 3. The "Control Panel" --- */}
            <div className="flex items-center justify-between mb-4 gap-4">
              {/* Search Bar */}
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search students by name..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-2">
                {["All", "At Risk", "Improving", "On Track"].map((status) => (
                  <Button
                    key={status}
                    variant={activeFilter === status ? "default" : "outline"}
                    onClick={() =>
                      status === "On Track"
                        ? setActiveFilter("good")
                        : setActiveFilter(status)
                    }
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>

            {/* --- 4. The "Smart Table" --- */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Average Marks</TableHead>
                    <TableHead>Summarizer</TableHead>
                    <TableHead>Fee Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs text-gray-500">
                          {student.id}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusStyles[student.status]}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{student.avg_attendance}%</TableCell>
                      <TableCell>{student.avg_marks}</TableCell>
                      <TableCell>{student.messages}</TableCell>
                      <TableCell>
                        {student.feeStatus.status ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Paid
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 border-red-200">
                            Overdue
                          </Badge>
                        )}
                        <div className="text-xs text-gray-500">
                          Last: {student.feeStatus.last_submission}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/mentor/students/${student.id}`}>
                          <Button variant="outline" size="sm">
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* A message to show if no students match the search/filter */}
            {filteredStudents.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No students found.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const AlertRules = () => {
    return (
      <div className="p-6">Alert rules configuration will appear here</div>
    );
  };

  const menuItems = [
    { id: "home", label: "Dashboard", icon: Home },
    { id: "students", label: "My Students", icon: Users },
    { id: "data", label: "Data Import", icon: Upload },
    { id: "scheduling", label: "Guidance Sessions", icon: Calendar },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* --- SIDEBAR --- */}
      <aside
        className={`bg-white shadow-lg flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-20" // 1. THE BOX ITSELF NOW SHRINKS
        }`}
      >
        <div className="flex items-center p-4 border-b h-16">
          <span
            className={`font-bold text-xl text-gray-800 overflow-hidden transition-all duration-300 ${
              isSidebarOpen ? "w-full opacity-100" : "w-0 opacity-0" // The title now fades and shrinks
            }`}
          >
            MentorSpace
          </span>
        </div>

        <nav className="flex-1 py-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 hover:bg-gray-100 transition-colors duration-200 ${
                // 2. SIMPLIFIED ACTIVE STATE
                activeTab === item.id
                  ? "bg-gray-100 font-semibold text-gray-900"
                  : "text-gray-600"
              } ${
                // 3. CENTER THE ICON WHEN COLLAPSED
                !isSidebarOpen && "justify-center"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span
                className={`whitespace-nowrap transition-all duration-200 ${
                  isSidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0" // The text now properly hides
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* --- SIDEBAR FOOTER --- */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-center mb-2"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <ChevronsLeft className="w-5 h-5" />
            ) : (
              <ChevronsRight className="w-5 h-5" />
            )}
          </Button>
          {/* <Button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="w-full justify-center"
                        variant="outline"
                    >
                        {isSidebarOpen ? <ChevronsLeft className="w-5 h-5" /> : <ChevronsRight className="w-5 h-5" />}
                    </Button> */}
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}

      <main className="flex-1 overflow-y-auto">
        <AnimationWrapper key={activeTab}>
          {activeTab === "home" && <DashboardHome />}
          {activeTab === "students" && <MyStudents />}
          {activeTab === "data" && <DataImport />}
          {activeTab === "scheduling" && <Scheduling />}
        </AnimationWrapper>
      </main>
    </div>
  );
}
