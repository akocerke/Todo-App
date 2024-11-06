"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoIosAddCircleOutline, IoIosWarning, IoIosBuild, IoIosCheckmarkCircle, IoIosCreate, IoIosTrash, IoIosEye, IoIosArrowDown, IoIosClose } from "react-icons/io";

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "This is the description for task 1",
      dueDate: "2024-11-20",
      status: "offen",
    },
    {
      id: 2,
      title: "Task 2",
      description: "This is the description for task 2",
      dueDate: "2024-11-21",
      status: "in Bearbeitung",
    },
    {
      id: 3,
      title: "Task 3",
      description: "This is the description for task 3",
      dueDate: "2024-11-22",
      status: "abgeschlossen",
    },
  ]);
  const [filterDate, setFilterDate] = useState("");
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      setTasks(tasks.map(task => task.id === editingTask.id ? { ...task, ...newTask } : task));
      setEditingTask(null);
    } else {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1, status: "offen" }]);
    }
    setNewTask({ title: "", description: "", dueDate: "" });
  };

  const handleEditTask = (task) => {
    setNewTask({ title: task.title, description: task.description, dueDate: task.dueDate });
    setEditingTask(task);
  
    // Scrollen zum Formular
    const element = document.getElementById("newtask");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks by due date
  const filteredTasks = tasks.filter((task) => {
    if (!filterDate) return true;
    return task.dueDate === filterDate;
  });

  // Group filtered tasks by status
  const tasksByStatus = {
    offen: filteredTasks.filter((task) => task.status === "offen"),
    inBearbeitung: filteredTasks.filter((task) => task.status === "in Bearbeitung"),
    abgeschlossen: filteredTasks.filter((task) => task.status === "abgeschlossen"),
  };

  const today = new Date().toISOString().split("T")[0];

  const closeDropdown = () => setDropdownOpen(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-6" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-slate-500 mb-4 uppercase">Aufgaben</h2>
        <p className="text-gray-600">Verwalte und organisiere deine Aufgaben.</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6" data-aos="fade-up" id="newtask">
        <h3 className="text-xl font-semibold text-slate-500 mb-4">
          {editingTask ? "Aufgabe bearbeiten" : "Neue Aufgabe erstellen"}
        </h3>
        <form onSubmit={handleTaskSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-500 mb-2">Titel</label>
            <input
              id="title"
              type="text"
              className="w-full px-4 py-2 border rounded-md text-gray-500"
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
              className="w-full px-4 py-2 border rounded-md text-gray-500"
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
              min={today}
              required
            />
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

      <div className="mb-6 mt-6 bg-white rounded-lg shadow p-6" data-aos="fade-up">
  <label htmlFor="filterDate" className="mr-2 text-gray-700">Filter nach Fälligkeitsdatum:</label>
  <input
    id="filterDate"
    type="date"
    className="px-4 py-2 border rounded-md text-gray-400"
    value={filterDate}
    onChange={(e) => setFilterDate(e.target.value)}
  />
  
  {/* Filter zurücksetzen Button */}
  {filterDate && (
    <button
      onClick={() => setFilterDate("")}
      className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
    >
      Filter zurücksetzen
    </button>
  )}
</div>


      <div data-aos="fade-up">
        {["offen", "inBearbeitung", "abgeschlossen"].map((status) => (
          <div key={status} className="mb-6">
            <h3 className="text-2xl font-semibold text-slate-500 capitalize mb-4">
              {status === "offen" ? "Offene Aufgaben" : status === "inBearbeitung" ? "In Bearbeitung" : "Abgeschlossene Aufgaben"}
            </h3>
            <div className="space-y-4">
              {tasksByStatus[status].map((task) => (
                <div key={task.id} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-semibold text-slate-500">{task.title}</h3>
                  <p className="text-gray-600 mt-2">{task.description}</p>
                  <p className="text-gray-500 mt-2">{task.dueDate}</p>

                  <p className="mt-3 p-1 text-white rounded text-center flex items-center justify-center gap-2 border-t-2 border-b-2">
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

                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="hidden sm:flex justify-between items-center w-full">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-700 w-full text-left py-2"
                      >
                        <IoIosCreate size={20} /> Bearbeiten
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="flex items-center gap-2 text-red-500 hover:text-red-700 w-full text-left py-2"
                      >
                        <IoIosTrash size={20} /> Löschen
                      </button>
                      <button
                        onClick={() => alert(`Details der Aufgabe: ${task.title}`)}
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 w-full text-left py-2"
                      >
                        <IoIosEye size={20} /> Details
                      </button>
                    </div>

                    <div className="sm:hidden w-full flex justify-between items-center">
                      <button
                        onClick={() => setDropdownOpen(dropdownOpen === task.id ? null : task.id)}
                        className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
                      >
                        <IoIosArrowDown size={20} />
                      </button>

                      {dropdownOpen === task.id && (
                        <div className="absolute bg-white shadow-md rounded mt-2 p-2 w-40">
                          <button
                            onClick={closeDropdown}
                            className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                          >
                            <IoIosClose size={20} />
                          </button>
                          <button
                            onClick={() => handleEditTask(task)}
                            className="flex items-center gap-2 text-blue-500 hover:text-blue-700 w-full text-left py-2"
                          >
                            <IoIosCreate size={20} /> Bearbeiten
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="flex items-center gap-2 text-red-500 hover:text-red-700 w-full text-left py-2"
                          >
                            <IoIosTrash size={20} /> Löschen
                          </button>
                          <button
                            onClick={() => alert(`Details der Aufgabe: ${task.title}`)}
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 w-full text-left py-2"
                          >
                            <IoIosEye size={20} /> Details
                          </button>
                        </div>
                      )}
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
