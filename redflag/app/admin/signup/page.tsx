"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Mail, Key, User, School, Building2, Layers3 } from "lucide-react";

export default function AdminSignUpPage() {
  const [name, setName] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [type, setType] = useState("");
  const [levelName, setLevelName] = useState("");
  const [levelCount, setLevelCount] = useState<number | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    if (!name || !email || !password || !instituteName || !type || !levelName || !levelCount) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      // 1️⃣ Register the admin and institute at backend API (we will build later)
      await axios.post("/api/auth/register-admin", {
        name,
        email,
        password,
        instituteName,
        type,
        levelName,
        levelCount,
      });

      // 2️⃣ Direct Sign In
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/admin/dashboard",
      });

      if (result?.error) setError("Signup succeeded, but login failed.");
      else if (result?.url) window.location.href = result.url;

    } catch (err: any) {
      setError("Failed to create account. Email may already exist.");
    }

    setIsLoading(false);
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-lg shadow-lg border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Admin Account</CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">

          {/* ---------- FORM START ---------- */}
          <form onSubmit={handleSubmit} className="grid gap-4">

            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input placeholder="Full Name" className="pl-10" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input type="email" placeholder="admin@example.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            {/* Password */}
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input type="password" placeholder="Password" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="h-[1px] bg-gray-300 my-2" />

            {/* Institute Name */}
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input placeholder="Institute Name" className="pl-10" value={instituteName} onChange={(e) => setInstituteName(e.target.value)} />
            </div>

            {/* Institute Type */}
            <div className="relative">
              <School className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                className="w-full border rounded-md bg-white py-2.5 pl-10 pr-3 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select Institute Type</option>
                <option value="School">School</option>
                <option value="College">College</option>
                <option value="Coaching">Coaching</option>
                <option value="Polytechnic">Polytechnic</option>
              </select>
            </div>

            {/* Level Name */}
            <div className="relative">
              <Layers3 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                className="w-full border rounded-md bg-white py-2.5 pl-10 pr-3 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select Level Name</option>
                <option value="Class">School</option>
                <option value="Semester">College</option>
                <option value="Batch">Coaching</option>
              </select>
            </div>

            {/* Level Count */}
            <div>
              <Input type="number" placeholder="Total Levels (e.g. 12, 8)" 
                value={levelCount || ""} onChange={(e) => setLevelCount(Number(e.target.value))} />
            </div>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

          </form>
          {/* ---------- FORM END ---------- */}

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/admin/signin" className="underline">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
