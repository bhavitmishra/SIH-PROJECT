"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import axios from "axios";

export default function OnboardingPage() {
  const [instituteName, setInstituteName] = useState("");
  const [type, setType] = useState("");
  const [levelName, setLevelName] = useState("");
  const [levelCount, setLevelCount] = useState<number | undefined>(undefined);

  const handleSubmit = async () => {
    if (!instituteName || !type || !levelName || !levelCount) {
      return alert("Please fill all fields");
    }

    await axios.post("http://localhost:2025/api/institute/setup", {
      instituteName,
      type,
      levelName,
      levelCount,
    });

    window.location.href = "/admin/dashboard";
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="max-w-md w-full p-2">
        <CardHeader>
          <CardTitle className="text-xl text-center">Institute Setup</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div>
            <Label>Institute Name</Label>
            <Input placeholder="Blue Bells School" value={instituteName} onChange={(e) => setInstituteName(e.target.value)} />
          </div>

          <div>
            <Label>Institute Type</Label>
            <Select onValueChange={setType}>
              <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="School">School</SelectItem>
                <SelectItem value="College">College</SelectItem>
                <SelectItem value="Coaching">Coaching</SelectItem>
                <SelectItem value="Polytechnic">Polytechnic</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Level Name (Class/Semester/Batch)</Label>
            <Select onValueChange={setType}>
              <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="School">Class</SelectItem>
                <SelectItem value="College">Semester</SelectItem>
                <SelectItem value="Coaching">Batch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Total Number of Levels</Label>
            <Input type="number" placeholder="e.g. 12" onChange={(e) => setLevelCount(Number(e.target.value))} />
          </div>

          <Button className="mt-2 w-full" onClick={handleSubmit}>
            Save & Continue
          </Button>

        </CardContent>
      </Card>
    </main>
  );
}
