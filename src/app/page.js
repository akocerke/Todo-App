"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-600 min-h-screen flex flex-col items-center justify-center text-white p-6">
      {/* Hero-Bereich */}
      <div className="text-center mt-20" data-aos="fade-up">
        <h1 className="text-6xl font-bold mb-4">Willkommen zur To-Do-App!</h1>
        <p className="text-lg mb-8">
          Organisiere deine Aufgaben einfach und effizient.
        </p>
        <a
          href="/login"
          className="bg-purple-700 text-white hover:bg-purple-800 hover:text-white py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Jetzt loslegen
        </a>
      </div>

      {/* Funktionen Abschnitt */}
      <div
        className="mt-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 p-5"
        data-aos="fade-up"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="uppercase font-semibold mb-4 text-gray-600">
          Benutzeroberfläche
          </h2>
          <p className="text-gray-600">
            Eine benutzerfreundliche Oberfläche, die es dir ermöglicht, deine
            Aufgaben im Handumdrehen zu verwalten.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
  <h2 className="uppercase font-semibold mb-4 text-gray-600">Datenverfügbarkeit</h2>
  <p className="text-gray-600">
    Greife auf deine Aufgaben von überall zu und verwalte sie einfach, solange du mit dem Internet verbunden bist.
  </p>
</div>

        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="uppercase  font-semibold mb-4 text-gray-600">
            Aufgaben verwalten
          </h2>
          <p className="text-gray-600">
            Füge deine Aufgaben hinzu, aktualisiere sie oder lösche sie, um
            deine To-Do-Liste effizient zu verwalten.
          </p>
        </div>
      </div>
    </div>
  );
}
