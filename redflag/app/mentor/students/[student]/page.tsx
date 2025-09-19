"use client";

import { useState } from "react";
import { useParams } from 'next/navigation';
import { studentsData } from "@/lib/studentData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input"; 
import { 
    AlertTriangle, ThumbsUp, ThumbsDown, Mail, Check, Clock, MessageSquare, 
    BarChart2, TrendingUp, TrendingDown, Calendar as CalendarIcon, 
    Bot
} from "lucide-react";
import { 
    ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, 
    BarChart, Bar, AreaChart, Area 
} from 'recharts';

// --- Fake History Data for Charts ---
const attendanceHistory = [
    { month: 'Apr', attendance: 85 }, { month: 'May', attendance: 82 }, { month: 'Jun', attendance: 78 },
    { month: 'Jul', attendance: 75 }, { month: 'Aug', attendance: 70 }, { month: 'Sep', attendance: 72 },
];
// Static recent activity for the demo
const recentActivity = [
    { date: 'September 18, 2025', description: 'Scored 45% on Physics Mid-term', type: 'alert' },
    { date: 'September 15, 2025', description: 'Missed scheduled check-in with mentor', type: 'warning' },
    { date: 'September 10, 2025', description: 'Fee payment reminder sent', type: 'info' },
];

export default function StudentProfilePage() {
    const params = useParams();
    // Your folder is likely named [student], so we use params.student
    // If you rename it to [studentId], you would use params.studentId
    const studentId = params.student as string; 

    // 1. FIND THE STUDENT EFFICIENTLY
    const student = studentsData.find(s => s.id === studentId);

    const [meetingDate, setMeetingDate] = useState<Date>();
    const [feedback, setFeedback] = useState<'good' | 'bad' | null>(null);

    // If no student is found for the ID, show a clean message.
    if (!student) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <Card className="p-8 text-center">
                    <CardTitle>Student Not Found</CardTitle>
                    <CardDescription>Could not find a student with ID: {studentId}</CardDescription>
                </Card>
            </div>
        );
    }

    const handleTimeChange = (timeValue: string) => {
        const [hours, minutes] = timeValue.split(':').map(Number);
        const newDate = meetingDate ? new Date(meetingDate) : new Date();
        newDate.setHours(hours, minutes, 0, 0);
        setMeetingDate(newDate);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* --- 1. THE URGENT ALERT --- */}
            <Alert className="mb-6 border-l-4 border-red-500 bg-red-50 flex items-center justify-between">
                <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div className="ml-3">
                        <AlertTitle className="font-bold text-red-800">High Risk Detected</AlertTitle>
                        <AlertDescription className="text-red-700">
                            Our system predicts this student is at a high risk of falling behind.
                        </AlertDescription>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-gray-600 hidden md:block">Is this accurate?</p>
                    <Button 
                        size="icon" 
                        variant={feedback === 'good' ? 'default' : 'outline'} 
                        className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                        onClick={() => setFeedback('good')}
                    >
                        <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button 
                        size="icon" 
                        variant={feedback === 'bad' ? 'destructive' : 'outline'} 
                        className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
                        onClick={() => setFeedback('bad')}
                    >
                        <ThumbsDown className="h-4 w-4" />
                    </Button>
                </div>
            </Alert>

            {/* --- Profile Header & Scheduling --- */}
            <div className="flex items-center justify-between mb-8">
                {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-30"> */}
    
    {/* --- Left Side: Student Info --- */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
                        <p className="text-gray-500">Student ID: {student.id}</p>
                    </div>

                    {/* --- Right Side: AI Summarizer --- */}
                    <Alert className="md:max-w-lg bg-blue-50 border-blue-200 text-blue-800 -ml-120">
                        <Bot className="h-4 w-4" stroke="#2563EB" />
                        <AlertTitle className="font-semibold">AI Summary</AlertTitle>
                        <AlertDescription>
                            {student.messages}
                        </AlertDescription>
                    </Alert>
{/* 
                    </div> */}
                
                <Popover>
                    <PopoverTrigger asChild>
                        <Button>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {meetingDate ? meetingDate.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Schedule Meeting'}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={meetingDate} onSelect={setMeetingDate} initialFocus />
                        <div className="p-3 border-t">
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input type="time" className="pl-10" disabled={!meetingDate} onChange={(e) => handleTimeChange(e.target.value)} />
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* --- Main Content Column --- */}
                <div className="lg:col-span-2 space-y-6">
                    {/* --- THE "WOW" CHARTS --- */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Subject Performance</CardTitle>
                            <CardDescription>Marks distribution across different subjects.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={student.subjects}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="subject_name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="marks" fill="#8884d8" />
                                    <Bar dataKey="attendance" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Attendance History</CardTitle>
                            <CardDescription>Overall attendance trend for the last 6 months.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={attendanceHistory}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis domain={[50, 100]} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="attendance" stroke="#8884d8" fill="#8884d8" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* --- Summarizer & Notes --- */}
                    
                    <Card>
                        <CardHeader><CardTitle>My Private Notes</CardTitle></CardHeader>
                        <CardContent>
                            <Textarea placeholder="Log interactions, observations, and next steps..." />
                            <Button className="w-full mt-3">Save Note</Button>
                        </CardContent>
                    </Card>
                </div>

                {/* --- Sidebar Column --- */}
                <div className="space-y-6">
                    {/* --- THE KEY VITALS --- */}
                    <Card>
                        <CardHeader><CardTitle>Key Metrics</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-gray-50 rounded-md">
                                <p className="text-sm font-medium text-gray-500">Avg. Attendance</p>
                                <p className="text-2xl font-bold">{student.avg_attendance.toFixed(1)}%</p>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-md">
                                <p className="text-sm font-medium text-gray-500">Avg. Marks</p>
                                <p className="text-2xl font-bold">{student.avg_marks.toFixed(1)}%</p>
                            </div>
                            <div className="col-span-2 text-center p-3 bg-gray-50 rounded-md">
                                <p className="text-sm font-medium text-gray-500">Fee Status</p>
                                {student.feeStatus.status ? (
                                    <Badge className="bg-green-100 text-green-800">Paid</Badge>
                                ) : (
                                    <Badge variant="destructive">Overdue</Badge>
                                )}
                                <p className="text-xs text-gray-400 mt-1">Last on: {student.feeStatus.last_submission}</p>
                            </div>
                        </CardContent>
                    </Card>
                    {/* --- Recent Activity --- */}
                    <Card>
                        <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
                        <CardContent>
                            <div className="space-y-4 text-sm">
                                {recentActivity.map((activity, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className={`p-2 rounded-full h-fit ${activity.type === 'alert' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                                            {activity.type === 'alert' ? <TrendingDown className="w-4 h-4 text-red-600"/> : <Clock className="w-4 h-4 text-yellow-600"/>}
                                        </div>
                                        <div>
                                            <p className="font-medium">{activity.description}</p>
                                            <p className="text-xs text-gray-500">{activity.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
