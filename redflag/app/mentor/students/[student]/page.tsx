"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Check, TrendingDown, Clock, MessageSquare, BarChart2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useParams } from 'next/navigation';
import  { studentNeedingAttention } from '@/lib/studentData'


export default function StudentProfilePage() {

    const params = useParams();
    const studentID = params.student;

  return (
    <>
        {studentNeedingAttention.map((student) => (
            student.id === studentID && (
                <div className="p-6 bg-gray-50 min-h-screen" key={student.id}>
      {/* --- 1. Profile Header --- */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
                            <p className="text-gray-500">Student ID: {student.id}</p>
                        </div>
                        </div>
                        <Button>
                        <Mail className="w-4 h-4 mr-2" />
                        Contact Student
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                        {/* --- 2. Key Metrics --- */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
                                <Check className="w-4 h-4 text-gray-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-yellow-600">{student.metrics.attendance}</div>
                                <p className="text-xs text-gray-500">-5% from last month</p>
                            </CardContent>
                            </Card>
                            <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
                                <BarChart2 className="w-4 h-4 text-gray-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-600">{student.metrics.grade}</div>
                                <p className="text-xs text-gray-500">Trending downwards</p>
                            </CardContent>
                            </Card>
                            <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                                <Clock className="w-4 h-4 text-gray-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{student.metrics.pendingReports}</div>
                                <p className="text-xs text-gray-500">Due this Friday</p>
                            </CardContent>
                            </Card>
                        </div>

                        {/* --- 3. Grade Trend Chart (The "Wow" Factor) --- */}
                        <Card>
                            <CardHeader>
                            <CardTitle>Grade Performance Trend</CardTitle>
                            <CardDescription>Visualizing the student's academic progress over the last 6 months.</CardDescription>
                            </CardHeader>
                            <CardContent>
                            <div className="w-full h-64">
                                <ResponsiveContainer>
                                <LineChart data={student.gradeHistory}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="grade" stroke="#8884d8" strokeWidth={2} />
                                </LineChart>
                                </ResponsiveContainer>
                            </div>
                            </CardContent>
                        </Card>
                        </div>

                        <div className="space-y-6">
                        {/* --- 4. Recent Activity Feed --- */}
                        <Card>
                            <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <div className="space-y-4 text-sm">
                                <div className="flex gap-3">
                                <div className="p-2 bg-red-100 rounded-full h-fit"><TrendingDown className="w-4 h-4 text-red-600"/></div>
                                <div>
                                    <p className="font-medium">Scored 52% on Physics Test</p>
                                    <p className="text-xs text-gray-500">September 15, 2025</p>
                                </div>
                                </div>
                                <div className="flex gap-3">
                                <div className="p-2 bg-yellow-100 rounded-full h-fit"><Clock className="w-4 h-4 text-yellow-600"/></div>
                                <div>
                                    <p className="font-medium">Missed Scheduled Check-in</p>
                                    <p className="text-xs text-gray-500">September 12, 2025</p>
                                </div>
                                </div>
                                <div className="flex gap-3">
                                <div className="p-2 bg-blue-100 rounded-full h-fit"><MessageSquare className="w-4 h-4 text-blue-600"/></div>
                                <div>
                                    <p className="font-medium">Mentor report submitted</p>
                                    <p className="text-xs text-gray-500">September 8, 2025</p>
                                </div>
                                </div>
                            </div>
                            </CardContent>
                        </Card>
                        
                        {/* --- 5. Mentor's Private Notes --- */}
                        <Card>
                            <CardHeader>
                            <CardTitle>My Private Notes</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <Textarea placeholder="Keep track of your thoughts, plans, and interactions with this student..." />
                            <Button className="w-full mt-3">Save Note</Button>
                            </CardContent>
                        </Card>
                        </div>
                    </div>
                    </div>
                )
        ))}
    </>
  );
}