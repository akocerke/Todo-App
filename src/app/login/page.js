"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function LoginPage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <div
        className="max-w-md w-full bg-white shadow-lg rounded-lg p-6"
        data-aos="fade-up"
      >
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Login
        </h1>
        <form>
          <div className="mb-4">
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-600"
              placeholder="E-Mail oder Benutzername"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-600"
              placeholder="Passwort"
            />
          </div>
          <button className="w-full bg-teal-400 text-white py-2 rounded hover:bg-teal-600 shadow-lg hover:shadow-xl transition duration-300">
            Einloggen
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Noch keinen Account?{" "}
            <Link
              href="/register"
              className="text-teal-500 hover:text-teal-600"
            >
              Registrieren
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
