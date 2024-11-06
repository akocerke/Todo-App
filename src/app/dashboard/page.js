// /dashboard/page.js
"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import TaskProgressChart from "../components/TaskProgressChart";

export default function DashboardPage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 rounded-lg">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-slate-500 mb-4 uppercase">Übersicht</h2>
        <p className="text-gray-600">
          Willkommen auf deinem Dashboard! Hier siehst du alle wichtigen
          Informationen.
        </p>
      </div>

      {/* Statistiken Abschnitt */}
      <div
        className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
        data-aos="fade-up"
      >
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-slate-500 mb-2">
            Aktive Aufgaben
          </h3>
          <p className="text-gray-600">0</p>{" "}
          {/* Dynamischer Wert für offene Aufgaben */}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-slate-500 mb-2">
            Fortschritt
          </h3>
          <p className="text-gray-600">0%</p>{" "}
          {/* Dynamischer Fortschrittswert */}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-slate-500 mb-2">
            Letzte Aktivität
          </h3>
          <p className="text-gray-600">Keine Aktivität</p>{" "}
          {/* Dynamisches Datum der letzten Aktivität */}
        </div>
      </div>

      {/* Widgets Abschnitt */}
      <div
        className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
        data-aos="fade-up"
      >
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center space-y-4">
          {/* Titel für den Bereich */}
          <h3 className="text-xl font-semibold text-slate-500 mb-2">
            Aufgabe hinzufügen
          </h3>

          {/* Button zum Hinzufügen einer Aufgabe */}
          <a
            href="/dashboard/tasks/#newtask"
            className="bg-purple-700 text-white hover:bg-purple-800 font-bold py-3 px-4 rounded shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <IoIosAddCircleOutline size={24} />
            <span>Aufgabe</span>
          </a>
        </div>
      </div>

      {/* Diagramme Abschnitt */}
      <div className="mt-10 bg-white rounded-lg shadow p-6" data-aos="fade-up">
        <h3 className="text-xl font-semibold text-slate-500 mb-2">
          Aufgaben-Fortschritt
        </h3>
        <div className="h-64 bg-white rounded-lg flex items-center justify-center">
          {/* Platzhalter für Diagramm */}
          <TaskProgressChart/>
        </div>
      </div>

      {/* To-Do-Liste Abschnitt */}
      <div className="mt-10 bg-white rounded-lg shadow p-6" data-aos="fade-up">
        <h3 className="text-xl font-semibold text-slate-500 mb-2">
          Wichtige Aufgaben
        </h3>
        <ul className="space-y-2">
          <li className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-700">Aufgabe 1</p>{" "}
            {/* Platzhalter für Aufgaben */}
          </li>
          <li className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-700">Aufgabe 2</p>
          </li>
          {/* Weitere Aufgaben */}
        </ul>
      </div>
    </div>
  );
}
