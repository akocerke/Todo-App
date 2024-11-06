// /app/dashboard/layout.js
"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-gradient-to-r from-orange-700 to-lime-500 min-h-screen flex flex-col items-center p-6 text-white">
      {/* Statischer Header mit AOS-Animation */}
      <div className="text-center mt-20" data-aos="fade-up">
        <h1 className="text-6xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg mb-8">Verwalte deine Aufgaben effizient.</p>
      </div>

      {/* Flexbox für Sidebar und Hauptinhalt */}
      <div className="flex flex-col lg:flex-row w-full max-w-6xl">
        <aside className="w-full lg:w-64 bg-gray-100 shadow-md rounded-lg p-4 mb-4 lg:mb-0 lg:mr-6" data-aos="fade-right">
          <h2 className="font-semibold text-xl text-gray-700 mb-4">Navigation</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className="text-purple-800 hover:text-purple-400 text-lg">Übersicht</Link>
            </li>
            <li>
              <Link href="/dashboard/tasks" className="text-purple-800 hover:text-purple-400 text-lg ">Aufgaben</Link>
            </li>
            <li>
              <Link href="/dashboard/settings" className="text-purple-800 hover:text-purple-400 text-lg ">Einstellungen</Link>
            </li>
          </ul>
        </aside>

        {/* Dynamischer Bereich mit AOS-Effekt */}
        <main className="flex-grow bg-white shadow-md rounded-lg p-4 sm:p-6" data-aos="fade-up">
          {children}
        </main>
      </div>
    </div>
  );
}
