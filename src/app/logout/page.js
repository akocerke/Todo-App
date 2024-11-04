"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export default function LoginPage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-teal-800 p-6">
      <div
        className="max-w-md w-full bg-white shadow-lg rounded-lg p-6"
        data-aos="fade-up"
      >
        <h1 className="text-4xl font-bold text-center">Logout</h1>
      </div>
    </div>
  );
}
