"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
type Subject = {
  id: string;
  name: string;
  code: string;
  credit: number | "";
};

export default function ClassSetupPage() {
  const [className, setClassName] = useState("");
  const [level, setLevel] = useState<number | "">("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [form, setForm] = useState<Subject>({
    id: "",
    name: "",
    code: "",
    credit: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const totalCredits = subjects.reduce(
    (sum, s) => sum + (typeof s.credit === "number" ? s.credit : 0),
    0
  );

  const handleSubjectChange = (
    field: keyof Subject,
    value: string | number
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]:
        field === "credit"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleAddSubject = () => {
    setMessage(null);

    if (!form.name.trim() || !form.code.trim()) {
      setMessage("Subject name and code are required.");
      return;
    }

    const creditValue =
      typeof form.credit === "number" ? form.credit : 0;
    if (creditValue < 0) {
      setMessage("Credit must be a positive number.");
      return;
    }

    const newSubject: Subject = {
      ...form,
      id: crypto.randomUUID(),
      credit: creditValue,
    };

    setSubjects((prev) => [...prev, newSubject]);
    setForm({
      id: "",
      name: "",
      code: "",
      credit: "",
    });
  };

  const handleRemoveSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSave = async () => {
    setMessage(null);

    if (!className.trim() || !level || subjects.length === 0) {
      setMessage(
        "Class name, level and at least one subject are required."
      );
      return;
    }

    try {
      setLoading(true);

      // TODO: point this to your actual API
      router.push("/mentor/basicData")

      

      setMessage("Configuration saved successfully.");
    } catch (err: any) {
      setMessage(err.message || "Something went wrong while saving.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 text-[#333] flex">
      {/* Sidebar */}
     
      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 md:px-8">
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-[#111]">
              Class & Subject Configuration
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              Set up your class, level and subjects. This configuration will
              be used when importing marks and attendance.
            </p>
          </div>
          <button className="px-3 py-1.5 text-xs md:text-sm rounded-full border border-gray-300 bg-gray-50 text-gray-800 hover:brightness-110">
            Log out
          </button>
        </header>

        {/* Page body */}
        <div className="flex-1 p-4 md:p-8 space-y-6">
          {/* Info banner */}
          <div className="rounded-xl border-[1.5px] border-gray-200 bg-gray-50 px-4 py-3 text-xs md:text-sm text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-2 shadow-sm">
            <div className="font-medium text-[#111]">
              Configure class once, reuse for imports.
            </div>
            <div className="text-gray-500">
              Levels can be classes (1–12) or semesters (1–8), depending on
              your institute type.
            </div>
          </div>

          {/* Summary row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm px-5 py-4">
              <div className="text-xs text-gray-500 mb-1">
                Class / Section
              </div>
              <div className="text-base font-semibold text-[#111] truncate">
                {className || "Not set"}
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="e.g. CSE 3rd Year, Class 9A"
                  className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/60"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm px-5 py-4">
              <div className="text-xs text-gray-500 mb-1">
                Level / Semester
              </div>
              <div className="text-base font-semibold text-[#111]">
                {level || "Not set"}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={level === "" ? "" : level}
                  onChange={(e) =>
                    setLevel(
                      e.target.value === ""
                        ? ""
                        : Number(e.target.value)
                    )
                  }
                  placeholder="e.g. 3"
                  className="w-24 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/60"
                />
                <span className="text-xs text-gray-500">
                  Example: Class 9 → 9, Semester 3 → 3
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm px-5 py-4">
              <div className="text-xs text-gray-500 mb-1">
                Subjects & Credits
              </div>
              <div className="text-base font-semibold text-[#111]">
                {subjects.length} subjects
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Total credits:{" "}
                <span className="font-semibold text-[#111]">
                  {totalCredits}
                </span>
              </div>
            </div>
          </div>

          {/* Main layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: subject form */}
            <section className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 md:p-6">
              <h2 className="text-base md:text-lg font-semibold text-[#111] mb-1">
                Add Subject
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mb-4">
                Add all subjects taught in this class / level. You can review
                them on the right and save when done.
              </p>

              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-700">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      handleSubjectChange("name", e.target.value)
                    }
                    placeholder="e.g. Computer Networks"
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/60"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-700">
                    Subject Code
                  </label>
                  <input
                    type="text"
                    value={form.code}
                    onChange={(e) =>
                      handleSubjectChange("code", e.target.value)
                    }
                    placeholder="e.g. CS301"
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/60"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-700">
                    Credit (optional)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.credit === "" ? "" : form.credit}
                    onChange={(e) =>
                      handleSubjectChange("credit", e.target.value)
                    }
                    placeholder="e.g. 4"
                    className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/60"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="w-full mt-2 rounded-xl border-[1.5px] border-gray-900 bg-gray-900 text-gray-50 text-sm font-semibold py-2.5 shadow-sm hover:brightness-110"
                >
                  Add Subject to List
                </button>

                {message && (
                  <p className="text-xs mt-2 text-gray-700">
                    {message}
                  </p>
                )}
              </div>
            </section>

            {/* Right: subjects list + save */}
            <section className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 md:p-6 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-base md:text-lg font-semibold text-[#111]">
                    Subjects for this Class
                  </h2>
                  <p className="text-xs md:text-sm text-gray-500">
                    Review subjects and remove any incorrect entries.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={loading}
                  className="rounded-xl border-[1.5px] border-gray-900 bg-gray-900 text-gray-50 text-xs md:text-sm font-semibold px-4 py-2 shadow-sm hover:brightness-110 disabled:opacity-60 disabled:hover:brightness-100"
                >
                  {loading ? "Saving..." : "Save Configuration"}
                </button>
              </div>

              <div className="flex-1 overflow-auto border border-gray-200 rounded-xl">
                {subjects.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-xs md:text-sm text-gray-500 py-8">
                    No subjects added yet. Use the form on the left.
                  </div>
                ) : (
                  <table className="w-full text-xs md:text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-3 py-2 font-medium text-gray-600">
                          Name
                        </th>
                        <th className="text-left px-3 py-2 font-medium text-gray-600">
                          Code
                        </th>
                        <th className="text-left px-3 py-2 font-medium text-gray-600">
                          Credit
                        </th>
                        <th className="px-3 py-2" />
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subj) => (
                        <tr
                          key={subj.id}
                          className="border-b border-gray-100 last:border-0"
                        >
                          <td className="px-3 py-2 text-[#333]">
                            {subj.name}
                          </td>
                          <td className="px-3 py-2 text-gray-600">
                            {subj.code}
                          </td>
                          <td className="px-3 py-2 text-gray-600">
                            {subj.credit || "-"}
                          </td>
                          <td className="px-3 py-2 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveSubject(subj.id)
                              }
                              className="text-xs text-gray-600 hover:text-gray-900 hover:brightness-110"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}