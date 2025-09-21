"use client";

import { useState } from "react";
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { studentsData as allStudents, studentNeedingAttention } from "@/lib/studentData";
import { Calendar as CalendarIcon, Check, ChevronsUpDown, Trash2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "recharts";

// A simplified type for our scheduled students
type ScheduledStudent = {
  id: string;
  name: string;
  email: string;
  meetingDate?: Date;
};

export const Scheduling = () => {
  const [scheduledStudents, setScheduledStudents] = useState<ScheduledStudent[]>(studentNeedingAttention);
  const [currentlyScheduling, setCurrentlyScheduling] = useState<ScheduledStudent | null>(null);

  // No changes needed for adding/removing students
  const addStudentToQueue = (studentId: string) => {
    if (scheduledStudents.find(s => s.id === studentId)) return;
    const studentToAdd = allStudents.find(s => s.id === studentId);
    if (studentToAdd) {
      setScheduledStudents(prev => [...prev, { id: studentToAdd.id, name: studentToAdd.name, email: studentToAdd.credentials.email }]);
    }
  };

  const removeStudentFromQueue = (studentId: string) => {
    setScheduledStudents(prev => prev.filter(s => s.id !== studentId));
  };

  // This function now ONLY updates the date part
  const updateMeetingDate = (studentId: string, date: Date | undefined) => {
    setScheduledStudents(prev =>
      prev.map(s => {
        if (s.id === studentId && date) {
          const newDate = s.meetingDate ? new Date(s.meetingDate) : new Date();
          newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
          return { ...s, meetingDate: newDate };
        }
        return s;
      })
    );
  };

  // NEW: A function for the flexible time input
  const handleTimeChange = (studentId: string, timeValue: string) => {
    const [hours, minutes] = timeValue.split(':').map(Number);
    setScheduledStudents(prev =>
      prev.map(s => {
        if (s.id === studentId && s.meetingDate) {
          const newDate = new Date(s.meetingDate);
          newDate.setHours(hours, minutes, 0, 0);
          return { ...s, meetingDate: newDate };
        }
        return s;
      })
    );
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Guidance Sessions</CardTitle>
          <CardDescription>Add students to the counselling queue and schedule sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* --- THE STUDENT SEARCH BAR IS BACK --- */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Add Student to Queue</h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-full max-w-sm justify-between">
                  Select a student...
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput placeholder="Search student..." />
                  <CommandEmpty>No student found.</CommandEmpty>
                  <CommandGroup>
                    {allStudents.map((student) => (
                      <CommandItem
                        key={student.id}
                        onSelect={() => addStudentToQueue(student.id)}
                      >
                        <Check className={cn("mr-2 h-4 w-4", scheduledStudents.find(s => s.id === student.id) ? "opacity-100" : "opacity-0")} />
                        {student.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* --- THE COUNSELLING QUEUE --- */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Counselling Queue ({scheduledStudents.length})</h3>
            {scheduledStudents.length > 0 ? (
              scheduledStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Popover open={currentlyScheduling?.id === student.id} onOpenChange={(isOpen) => !isOpen && setCurrentlyScheduling(null)}>
                      <PopoverTrigger asChild>
                        <Button variant={student.meetingDate ? "secondary" : "default"} size="sm" onClick={() => setCurrentlyScheduling(student)}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {student.meetingDate 
                            // THE DISPLAY IS NOW FIXED
                            ? student.meetingDate.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }) 
                            : 'Schedule Meeting'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={student.meetingDate}
                          onSelect={(date) => updateMeetingDate(student.id, date)}
                          initialFocus
                        />
                        {/* THE FLEXIBLE TIME INPUT */}
                        <div className="p-3 border-t">
                          <Label className="text-sm font-medium mb-2 text-center block">Select a Time</Label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                type="time"
                                className="pl-10"
                                disabled={!student.meetingDate}
                                onChange={(e) => handleTimeChange(student.id, e.target.value)}
                            />
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button variant="ghost" size="icon" onClick={() => removeStudentFromQueue(student.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No students have been added to the queue yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};