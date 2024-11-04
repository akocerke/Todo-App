"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function RegisterPage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-6">
      <div
        className="max-w-md w-full bg-white shadow-lg rounded-lg p-6"
        data-aos="fade-up"
      >
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
          Registrieren
        </h1>
        <form>
          <div className="mb-4">
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-600"
              placeholder="Benutzername"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-600"
              placeholder="E-Mail"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-600"
              placeholder="Password"
            />
          </div>
          <button className="w-full bg-fuchsia-600 text-white py-2 rounded hover:bg-fuchsia-800 transition duration-300 shadow-lg hover:shadow-xl">
            Registrieren
          </button>
        </form>
      </div>
    </div>
  );
}
