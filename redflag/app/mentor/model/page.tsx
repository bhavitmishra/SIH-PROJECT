"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function QuestionnaireRunPage() {
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("23:59");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [scheduled, setScheduled] = useState(false);

  const router = useRouter();
  const handleSend = async () => {
    setStatusMsg(null);

    if (!deadlineDate || !deadlineTime) {
      setStatusMsg("Select a deadline date and time.");
      return;
    }

    const isoDeadline = new Date(
      `${deadlineDate}T${deadlineTime}:00`
    ).toISOString();

    try {
      setLoading(true);

      // TODO: wire this to your backend
      const res = await fetch("/api/questionnaire/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deadline: isoDeadline }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert("Questionnare sent successfully")
        
        
    }
    router.push("/mentor/dashboard")

      setScheduled(true);
      setStatusMsg(
        "Questionnaire sent. Predicted results will be ready when the deadline ends."
      );
    } catch (e: any) {
      setStatusMsg(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const formattedDeadline =
    deadlineDate && deadlineTime
      ? new Date(`${deadlineDate}T${deadlineTime}:00`).toLocaleString()
      : null;

  return (
    <div className="min-h-screen bg-gray-50 text-[#333] flex">
      {/* Sidebar */}

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
       

        {/* Body */}
        <div className="flex-1 p-4 md:p-8 space-y-6">
          {/* Pipeline summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm px-4 py-3">
              <div className="text-xs text-gray-500 mb-1">Step 1</div>
              <div className="text-sm font-semibold text-[#111]">
                Students ready
              </div>
              <p className="text-[11px] text-gray-600 mt-1">
                Base student records mapped.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm px-4 py-3">
              <div className="text-xs text-gray-500 mb-1">Step 2</div>
              <div className="text-sm font-semibold text-[#111]">
                Marks / attendance ingested
              </div>
              <p className="text-[11px] text-gray-600 mt-1">
                From webhook or manual upload.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm px-4 py-3">
              <div className="text-xs text-gray-500 mb-1">Step 3</div>
              <div className="text-sm font-semibold text-[#111]">
                Questionnaire
              </div>
              <p className="text-[11px] text-gray-600 mt-1">
                Deadline-based response window.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm px-4 py-3">
              <div className="text-xs text-gray-500 mb-1">Step 4</div>
              <div className="text-sm font-semibold text-[#111]">
                Predictions
              </div>
              <p className="text-[11px] text-gray-600 mt-1">
                Generated automatically when deadline ends.
              </p>
            </div>
          </div>

          {/* Main layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: deadline + send */}
            <section className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 md:p-6 space-y-4">
              <h2 className="text-base md:text-lg font-semibold text-[#111]">
                Set questionnaire deadline
              </h2>
              <p className="text-xs md:text-sm text-gray-600">
                After this deadline, responses are locked and the prediction run starts automatically.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-700">
                    Deadline date
                  </label>
                  <input
                    type="date"
                    value={deadlineDate}
                    onChange={(e) => setDeadlineDate(e.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/60"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-700">
                    Deadline time
                  </label>
                  <input
                    type="time"
                    value={deadlineTime}
                    onChange={(e) => setDeadlineTime(e.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/60"
                  />
                </div>
              </div>

              {formattedDeadline && (
                <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700">
                  Responses will close at{" "}
                  <span className="font-semibold text-[#111]">
                    {formattedDeadline}
                  </span>
                  .
                </div>
              )}

              <div className="pt-3 border-t border-gray-200 mt-4 space-y-2">
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={loading}
                  className="w-full rounded-xl border-[1.5px] border-gray-900 bg-gray-900 text-gray-50 text-sm font-semibold py-2.5 shadow-sm hover:brightness-110 disabled:opacity-60 disabled:hover:brightness-100"
                >
                  {loading
                    ? "Sending & scheduling..."
                    : "Send questionnaire & schedule prediction"}
                </button>

                {statusMsg && (
                  <p className="text-xs mt-1 text-gray-700">{statusMsg}</p>
                )}
              </div>
            </section>

            {/* Right: status card */}
            <section className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 md:p-6 space-y-4">
              <h2 className="text-base md:text-lg font-semibold text-[#111]">
                Prediction status
              </h2>

              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs md:text-sm text-gray-700">
                {scheduled ? (
                  <>
                    <div className="font-semibold text-[#111] mb-1">
                      Scheduled
                    </div>
                    <p>
                      Questionnaire has been sent. Predicted results will
                      be generated automatically once the deadline ends and
                      responses are locked.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="font-semibold text-[#111] mb-1">
                      Not scheduled
                    </div>
                    <p>
                      Set a deadline and send the questionnaire to start the
                      prediction cycle for this class.
                    </p>
                  </>
                )}
              </div>

              <div className="text-[11px] text-gray-500">
                Once the run completes, you’ll see a separate page / section
                with:
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Risk scores per student</li>
                  <li>Primary contributing factors</li>
                  <li>Shortlist of students needing urgent intervention</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}