"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Card() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(false);

  async function submitHandler(provider: string) {
    console.log(provider);

    setWarning(false);

    if (provider === "credentials") {
      if (email === "" || password === "") {
        setWarning(true);
        return;
      }
      signIn("credentials", {
        email,
        password,
        callbackUrl: "/mentor/dashboard",
      });
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-4 w-90 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-blue-500 font-extrabold text-3xl">
          Mentor Sign in
        </div>
        {warning && (
          <div className="text-red-600">Enter Correct Credentials</div>
        )}

        <div className="font-bold text-xl">Enter Credentials</div>

        <div className="flex flex-col gap-2 w-full">
          <input
            type="tel"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Phone Number"
            className="border border-gray-300 rounded p-2 w-full"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="border border-gray-300 rounded p-2 w-full"
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-3xl w-full hover:bg-blue-600"
            onClick={() => submitHandler("credentials")}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
