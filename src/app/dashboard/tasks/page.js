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
} from "react-icons/io";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTodoStatus,
} from "../../api/todos";
import { toast } from "react-toastify"; 

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterImportant, setFilterImportant] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: "",
    is_important: false,
  });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const fetchedTasks = await getAllTodos();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Fehler beim Laden der Aufgaben:", error);
      toast.error("Fehler beim Laden der Aufgaben.");
    }
  };

  const formatDateForInput = (date) => {
    return date ? date.split("T")[0] : "";  // Nur das Datum im Format 'yyyy-MM-dd'
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = formatDateForInput(newTask.due_date);
    const taskToSubmit = { ...newTask, due_date: formattedDate };
  
    if (editingTask) {
      try {
        const updatedTask = await updateTodo(editingTask.id, taskToSubmit);
        // Anstatt das Update manuell zu machen, ruf die Aufgaben neu ab
        loadTasks();
        toast.success("Aufgabe erfolgreich aktualisiert!");
      } catch (error) {
        console.error("Fehler beim Aktualisieren des To-Dos:", error);
        toast.error("Fehler beim Aktualisieren der Aufgabe.");
      }
      setEditingTask(null);
    } else {
      try {
        const createdTask = await createTodo(taskToSubmit);
        // Auch hier ruf einfach die Aufgaben neu ab
        loadTasks();
        toast.success("Neue Aufgabe erfolgreich hinzugefügt!");
      } catch (error) {
        console.error("Fehler beim Erstellen des To-Dos:", error);
        toast.error("Fehler beim Erstellen der Aufgabe.");
      }
    }
  
    setNewTask({
      title: "",
      description: "",
      due_date: "",
      is_important: false,
    });
  };
  

  const handleEditTask = (task) => {
    setNewTask({
      title: task.title,
      description: task.description,
      due_date: formatDateForInput(task.due_date), // Formatieren für das Eingabefeld
      is_important: task.is_important,
    });
    setEditingTask(task);

    const element = document.getElementById("newtask");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTodo(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      toast.success("Aufgabe erfolgreich gelöscht!");
    } catch (error) {
      console.error("Fehler beim Löschen des To-Dos:", error);
      toast.error("Fehler beim Löschen der Aufgabe.");
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      const updatedTask = await updateTodoStatus(taskId, status);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      const statusMessage = status === "abgeschlossen" ? "Aufgabe als erledigt markiert!" : "Aufgabe in Bearbeitung.";
      toast[status === "abgeschlossen" ? "success" : "info"](statusMessage);
    } catch (error) {
      console.error("Fehler beim Aktualisieren des To-Do-Status:", error);
      toast.error("Fehler beim Aktualisieren des Status.");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterDate && task.due_date !== filterDate) return false;
    if (filterImportant && !task.is_important) return false;
    return true;
  });

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
            <label htmlFor="due_date" className="block text-gray-500 mb-2">
              Fälligkeitsdatum
            </label>
            <input
              id="due_date"
              type="date"
              className="w-full px-4 py-2 border rounded-md text-gray-400"
              value={newTask.due_date}
              onChange={(e) =>
                setNewTask({ ...newTask, due_date: e.target.value })
              }
              min={today}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="is_important"
              className="flex items-center text-gray-500"
            >
              <input
                type="checkbox"
                id="is_important"
                checked={newTask.is_important}
                onChange={(e) =>
                  setNewTask({ ...newTask, is_important: e.target.checked })
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(tasksByStatus).map((status) => (
          <div
            key={status}
            className="bg-white rounded-lg shadow p-4"
            data-aos="fade-up"
          >
            <h4 className="font-semibold text-slate-500 mb-4">
              {status === "offen"
                ? "Offene Aufgaben"
                : status === "inBearbeitung"
                ? "In Bearbeitung"
                : "Abgeschlossene Aufgaben"}
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
                    <p className="text-xs text-gray-400">{new Date(task.due_date).toLocaleString('de-DE', {
                    day: '2-digit',
                    month: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{" "}</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-green-500"
                        onClick={() =>
                          handleStatusChange(task.id, "abgeschlossen")
                        }
                      >
                        <IoIosCheckmarkCircle size={24} />
                      </button>
                      <button
                        className="text-yellow-500"
                        onClick={() =>
                          handleStatusChange(task.id, "in Bearbeitung")
                        }
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
