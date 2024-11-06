"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoIosAddCircleOutline, IoIosWarning, IoIosBuild, IoIosCheckmarkCircle } from "react-icons/io";

// Beispiel-Daten für Aufgaben
const initialTasks = [
  {
    id: 1,
    title: "Projektmeeting vorbereiten",
    description: "Erstelle eine Präsentation für das Meeting.",
    dueDate: "2024-11-10",
    status: "offen",
  },
  {
    id: 2,
    title: "Code-Review durchführen",
    description: "Review den neuesten Pull Request.",
    dueDate: "2024-11-12",
    status: "in Bearbeitung",
  },
  {
    id: 3,
    title: "Marketing-Kampagne starten",
    description: "Die neue Kampagne in die sozialen Netzwerke posten.",
    dueDate: "2024-11-15",
    status: "abgeschlossen",
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filterDate, setFilterDate] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  // Initialisiere AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Funktion zum Erstellen einer neuen Aufgabe
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, { ...newTask, id: tasks.length + 1, status: "offen" }]);
    setNewTask({ title: "", description: "", dueDate: "" }); // Formular zurücksetzen
  };

  // Filtere Aufgaben nach Fälligkeitsdatum
  const filteredTasks = tasks.filter((task) => {
    if (!filterDate) return true;
    return task.dueDate === filterDate;
  });

  // Aktuelles Datum im Format YYYY-MM-DD für das min-Attribut
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="text-center mb-6" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-slate-500 mb-4 uppercase">
          Aufgaben
        </h2>
        <p className="text-gray-600">Verwalte und organisiere deine Aufgaben.</p>
      </div>

      {/* Filter nach Fälligkeitsdatum */}
      <div className="mb-6" data-aos="fade-up">
        <label htmlFor="filterDate" className="mr-2 text-gray-700">
          Filter nach Fälligkeitsdatum:
        </label>
        <input
          id="filterDate"
          type="date"
          className="px-4 py-2 border rounded-md"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {/* Aufgabenliste */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" data-aos="fade-up">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-slate-500">{task.title}</h3>
            <p className="text-gray-600 mt-2">{task.description}</p>
            <p className="text-gray-500 mt-2">{task.dueDate}</p>

            {/* Status mit Icon */}
            <p className="mt-3 p-1 text-white rounded text-center flex items-center justify-center gap-2 border-t-2 border-b-2 ">
              {task.status === "offen" && (
                <>
                  <IoIosWarning className="text-yellow-500" />
                  <span className="text-yellow-500">Offen</span>
                </>
              )}
              {task.status === "in Bearbeitung" && (
                <>
                  <IoIosBuild className="text-blue-500" />
                  <span className="text-blue-500">In Bearbeitung</span>
                </>
              )}
              {task.status === "abgeschlossen" && (
                <>
                  <IoIosCheckmarkCircle className="text-green-500" />
                  <span className="text-green-500">Abgeschlossen</span>
                </>
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Formular zur Erstellung neuer Aufgaben */}
      <div className="bg-white rounded-lg shadow p-6" data-aos="fade-up" id="newtask">
        <h3 className="text-xl font-semibold text-slate-500 mb-4">Neue Aufgabe erstellen</h3>
        <form onSubmit={handleTaskSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-500 mb-2">Titel</label>
            <input
              id="title"
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
              placeholder="Titel"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-500 mb-2">Beschreibung</label>
            <textarea
              id="description"
              className="w-full px-4 py-2 border rounded-md"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              required
              placeholder="Beschreibung"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-gray-500 mb-2">Fälligkeitsdatum</label>
            <input
              id="dueDate"
              type="date"
              className="w-full px-4 py-2 border rounded-md text-gray-400"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              min={today} // Nur zukünftige Daten ab dem aktuellen Tag möglich
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white hover:bg-purple-800 font-bold py-3 px-4 rounded shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <IoIosAddCircleOutline size={24} />
            <span>Aufgabe hinzufügen</span>
          </button>
        </form>
      </div>
    </div>
  );
}
