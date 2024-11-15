"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import TaskProgressChart from "../components/TaskProgressChart";
import { getAllTodos, getImportantTodos } from "../api/todos"; // Deine API-Funktionen importieren

export default function DashboardPage() {
  const [todos, setTodos] = useState([]);
  const [importantTodos, setImportantTodos] = useState([]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchData = async () => {
      try {
        // Abrufen aller To-Dos
        const allTodos = await getAllTodos();
        setTodos(allTodos);

        // Abrufen der wichtigen To-Dos
        const important = await getImportantTodos();
        setImportantTodos(important);

        // Berechnung der aktiven Aufgaben
        // Filtere nur "offen" und "in Bearbeitung" Aufgaben
        const activeTasks = allTodos.filter(todo => 
          todo.status === "offen" || todo.status === "in Bearbeitung"
        ).length;
        setActiveTasksCount(activeTasks);

        // Berechnung des Fortschritts
        const completedTasks = allTodos.filter(todo => todo.status === "abgeschlossen").length;
        const totalTasks = allTodos.length;

        // Fortschritt in Prozent
        let calculatedProgress = 0;
        if (totalTasks > 0) {
          calculatedProgress = (completedTasks / totalTasks) * 100;
        }

        // Fortschritt auf 2 Dezimalstellen runden
        setProgress(calculatedProgress.toFixed(2)); // Hier wird der Fortschritt auf 2 Dezimalstellen gerundet
      } catch (error) {
        console.error("Fehler beim Laden der To-Dos:", error);
      }
    };

    fetchData();
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
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-slate-500 mb-2">Aktive Aufgaben</h3>
          <p className="text-gray-600">{activeTasksCount}</p> {/* Dynamischer Wert */}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-xl font-semibold text-slate-500 mb-2">Fortschritt</h3>
    <p className="text-gray-600 mb-2">{progress}%</p> {/* Dynamischer Fortschrittswert */}
    <div className="relative pt-1">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-teal-500 h-2 rounded-full"
          style={{ width: `${progress}%` }} // Fortschrittsbalken dynamisch
        ></div>
      </div>
    </div>
  </div>
      </div>

      {/* Widgets Abschnitt */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center space-y-4">
          <h3 className="text-xl font-semibold text-slate-500 mb-2">Aufgabe hinzufügen</h3>
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
        <h3 className="text-xl font-semibold text-slate-500 mb-2">Aufgaben-Fortschritt</h3>
        <div className="h-64 bg-white rounded-lg flex items-center justify-center">
          <TaskProgressChart />
        </div>
      </div>

      {/* To-Do-Liste Abschnitt */}
      <div className="mt-10 bg-white rounded-lg shadow p-6" data-aos="fade-up">
        <h3 className="text-xl font-semibold text-slate-500 mb-2">Wichtige Aufgaben</h3>
        <ul className="space-y-2">
          {importantTodos.length > 0 ? (
            importantTodos.map(todo => (
              <li key={todo.id} className="p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-700">
                  {/* Datum im leserlichen deutschen Format */}
                  {new Date(todo.due_date).toLocaleString('de-DE', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{" "}
                  {todo.title}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">Keine wichtigen Aufgaben</p>
          )}
        </ul>
      </div>
    </div>
  );
}
