"use client";

import React, { FC, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"; // Import the shadcn Button
import { LogOut, User, ChevronDown } from "lucide-react";
import DZ from "@/public/sihlogo.jpeg"

// The new Logo component from your landing page
export const Logo = () => (
    <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
        <img src={DZ.src} alt="DZ" className="w-10 h-10"/>
        <span>DropZero</span>
    </div>
);

export const AppBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const adminMenuRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = !!session;
  

  // Effect to handle the dynamic background on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Effect to close the dropdown if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target as Node)) {
        setIsAdminMenuOpen(false);
      }
    };
    if (isAdminMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAdminMenuOpen]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        hasScrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent shadow-none'
      }`}
    >
      <nav className="container mx-5 py-2 flex justify-between items-center">
        <a href="/" aria-label="DropZero Home">
            <Logo />
        </a>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            // LOGGED-IN STATE
            <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </Button>
          ) : (
            // LOGGED-OUT STATE
            <>
              {/* === ADMIN DROPDOWN MENU === */}
              <div className="relative" ref={adminMenuRef}>
                <Button variant="ghost" onClick={() => setIsAdminMenuOpen((prev) => !prev)}>
                  Admin
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>

                {isAdminMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-20">
                    <button onClick={() => router.push('/admin/signin')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Log In
                    </button>
                    <button onClick={() => router.push('/admin/signup')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Sign Up
                    </button>
                  </div>
                )}
              </div>

              {/* === MENTOR LOGIN BUTTON === */}
              <Button onClick={() => router.push("/mentor/signin")}>
                <User className="w-4 h-4 mr-2" />
                Mentor Log In
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default AppBar;