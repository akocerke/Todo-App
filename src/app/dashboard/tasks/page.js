"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  IoIosAddCircleOutline,
  IoIosWarning,
  IoIosBuild,
  IoIosCheckmarkCircle,
  IoIosCreate,
  IoIosTrash,
  IoIosEye,
  IoIosArrowDown,
  IoIosClose,
} from "react-icons/io";
import { TfiReload } from "react-icons/tfi";
import { getAllTodos, createTodo, updateTodo, deleteTodo, updateTodoStatus } from "../../api/todos"; // API importieren

export default function TasksPage() {
  const [tasks, setTasks] = useState([]); // Anfangszustand als leer
  const [filterDate, setFilterDate] = useState("");
  const [filterImportant, setFilterImportant] = useState(false); // Zustand für den wichtigen Aufgabenfilter
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    isImportant: false,
  });
  const [editingTask, setEditingTask] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    loadTasks(); // Lade Aufgaben bei Initialisierung
  }, []);

  // Funktion zum Laden der Aufgaben
  const loadTasks = async () => {
    try {
      const fetchedTasks = await getAllTodos(); // Hole alle To-Dos
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Fehler beim Laden der Aufgaben:", error);
    }
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (editingTask) {
      try {
        // To-Do aktualisieren
        const updatedTask = await updateTodo(editingTask.id, newTask);
        setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
      } catch (error) {
        console.error("Fehler beim Aktualisieren des To-Dos:", error);
      }
      setEditingTask(null);
    } else {
      try {
        // Neues To-Do erstellen
        const createdTask = await createTodo(newTask);
        setTasks([...tasks, createdTask]);
      } catch (error) {
        console.error("Fehler beim Erstellen des To-Dos:", error);
      }
    }
    setNewTask({ title: "", description: "", dueDate: "", isImportant: false });
  };

  const handleEditTask = (task) => {
    setNewTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      isImportant: task.isImportant,
    });
    setEditingTask(task);

    // Scrollen zum Formular
    const element = document.getElementById("newtask");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTodo(id); // Lösche das To-Do über die API
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Fehler beim Löschen des To-Dos:", error);
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      const updatedTask = await updateTodoStatus(taskId, status); // Status des To-Dos aktualisieren
      setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    } catch (error) {
      console.error("Fehler beim Aktualisieren des To-Do-Status:", error);
    }
  };

  // Filter tasks by due date and importance
  const filteredTasks = tasks.filter((task) => {
    if (filterDate && task.dueDate !== filterDate) return false;
    if (filterImportant && !task.isImportant) return false;
    return true;
  });

  // Group filtered tasks by status
  const tasksByStatus = {
    offen: filteredTasks.filter((task) => task.status === "offen"),
    inBearbeitung: filteredTasks.filter(
      (task) => task.status === "in Bearbeitung"
    ),
    abgeschlossen: filteredTasks.filter(
      (task) => task.status === "abgeschlossen"
    ),
  };

  const today = new Date().toISOString().split("T")[0];

  const closeDropdown = () => setDropdownOpen(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-6" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-slate-500 mb-4 uppercase">
          Aufgaben
        </h2>
        <p className="text-gray-600">
          Verwalte und organisiere deine Aufgaben.
        </p>
      </div>

      <div
        className="bg-white rounded-lg shadow p-6"
        data-aos="fade-up"
        id="newtask"
      >
        <h3 className="text-xl font-semibold text-slate-500 mb-4">
          {editingTask ? "Aufgabe bearbeiten" : "Neue Aufgabe erstellen"}
        </h3>
        <form onSubmit={handleTaskSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-500 mb-2">
              Titel
            </label>
            <input
              id="title"
              type="text"
              className="w-full px-4 py-2 border rounded-md text-gray-500"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              required
              placeholder="Titel"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-500 mb-2">
              Beschreibung
            </label>
            <textarea
              id="description"
              className="w-full px-4 py-2 border rounded-md text-gray-500"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              required
              placeholder="Beschreibung"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-gray-500 mb-2">
              Fälligkeitsdatum
            </label>
            <input
              id="dueDate"
              type="date"
              className="w-full px-4 py-2 border rounded-md text-gray-400"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
              min={today}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="important"
              className="flex items-center text-gray-500"
            >
              <input
                type="checkbox"
                id="important"
                checked={newTask.isImportant}
                onChange={(e) =>
                  setNewTask({ ...newTask, isImportant: e.target.checked })
                }
                className="mr-2"
              />
              Wichtige Aufgabe
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white hover:bg-purple-800 font-bold py-3 px-4 rounded shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <IoIosAddCircleOutline size={24} />
            <span>{editingTask ? "Speichern" : "Hinzufügen"}</span>
          </button>
        </form>
      </div>

      <div
        className="mb-6 mt-6 bg-white rounded-lg shadow p-6"
        data-aos="fade-up"
      >
        <label htmlFor="filterDate" className="mr-2 text-gray-700">
          Filter nach Fälligkeitsdatum:
        </label>
        <input
          id="filterDate"
          type="date"
          className="px-4 py-2 border rounded-md text-gray-400"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        {/* Filter für wichtige Aufgaben */}
        <div className="mt-4 flex items-center">
          <label htmlFor="filterImportant" className="mr-2 text-gray-700">
            Nur wichtige Aufgaben:
          </label>
          <input
            id="filterImportant"
            type="checkbox"
            checked={filterImportant}
            onChange={() => setFilterImportant(!filterImportant)}
            className="mr-2"
          />
        </div>
      </div>

      {/* Aufgaben anzeigen */}
      <div className="flex flex-wrap gap-6">
        {Object.keys(tasksByStatus).map((status) => (
          <div
            key={status}
            className="flex-1 min-w-[300px] bg-white rounded-lg shadow p-4"
            data-aos="fade-up"
          >
            <h4 className="font-semibold text-slate-500 mb-4">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </h4>
            <div className="space-y-4">
              {tasksByStatus[status].map((task) => (
                <div
                  key={task.id}
                  className="flex justify-between items-start border-b py-3"
                >
                  <div>
                    <p className="font-semibold text-slate-500">{task.title}</p>
                    <p className="text-sm text-gray-500">{task.description}</p>
                    <p className="text-xs text-gray-400">{task.dueDate}</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-green-500"
                        onClick={() => handleStatusChange(task.id, "abgeschlossen")}
                      >
                        <IoIosCheckmarkCircle size={24} />
                      </button>
                      <button
                        className="text-yellow-500"
                        onClick={() => handleStatusChange(task.id, "in Bearbeitung")}
                      >
                        <IoIosBuild size={24} />
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <IoIosTrash size={24} />
                      </button>
                      <button
                        className="text-blue-500"
                        onClick={() => handleEditTask(task)}
                      >
                        <IoIosCreate size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
