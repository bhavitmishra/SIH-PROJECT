"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

// Define props for icon components for type safety
interface IconProps {
  className?: string;
}

// Icon for the "Log in" / "Log out" button
const UserIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="red"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

// Logo component
const RedFlagLogo: FC = () => (
  <svg
    width="150"
    height="45"
    viewBox="0 0 200 60"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="RedFlag Logo"
  >
    <defs>
      <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#FF4C4C", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#C10000", stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    {/* Flag icon */}
    <path d="M10 10 L10 50 L40 35 L70 50 L70 10 Z" fill="url(#redGradient)" />

    {/* Brand text */}
    <text
      x="85"
      y="40"
      fontFamily="Inter, sans-serif"
      fontSize="30"
      fontWeight="600"
      fill="#1F2937"
    >
      RedFlag
    </text>
  </svg>
);

// The main AppBar component
export const AppBar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const isLoggedIn = !!session;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-10">
          <a href="/" aria-label="RedFlag Home">
            <RedFlagLogo />
          </a>
        </div>

        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center space-x-2 px-5 py-2.5 font-semibold text-red-500 border-2 border-red-500 rounded-full hover:bg-blue-50 transition-colors duration-200"
            >
              <UserIcon className="w-5 h-5" />
              <span>Log out</span>
            </button>
          ) : (
            <div className="flex flex-row gap-2">
              <button
                onClick={() => router.push("/admin/signin")}
                className="flex items-center space-x-2 px-5 py-2.5 font-semibold text-red-500 border-2 border-red-500 rounded-full hover:bg-blue-50 transition-colors duration-200"
              >
                <UserIcon className="w-5 h-5" />
                <span>Admin Log in</span>
              </button>
              <button
                onClick={() => router.push("/mentor/signin")}
                className="flex items-center space-x-2 px-5 py-2.5 font-semibold text-red-500 border-2 border-red-500 rounded-full hover:bg-blue-50 transition-colors duration-200"
              >
                <UserIcon className="w-5 h-5" />
                <span>Mentor Log in</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default AppBar;
