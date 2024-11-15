import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { getAllTodos } from "../api/todos"; // Importiere deine API-Funktion zum Abrufen der To-Dos
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importiere das datalabels Plugin

export default function TaskProgressChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Referenz für das Chart-Objekt
  const [progressData, setProgressData] = useState({ completed: 0, open: 0, inProgress: 0 }); // Zustand für die Fortschrittsdaten
  const [noTodosMessage, setNoTodosMessage] = useState(""); // Zustand für die Nachricht, wenn keine To-Dos vorhanden sind
  const [loading, setLoading] = useState(true); // Zustand für den Ladezustand

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ruft alle To-Dos ab
        const todos = await getAllTodos();

        // Überprüfen, ob keine To-Dos vorhanden sind
        if (!todos || todos.length === 0) {
          setNoTodosMessage("Keine To-Dos vorhanden."); // Zeige eine Nachricht an
          setProgressData({ completed: 0, open: 0, inProgress: 0 });
        } else {
          // Berechne die Anzahl der erledigten, offenen und in Bearbeitung Aufgaben
          const completed = todos.filter(todo => todo.status === "abgeschlossen").length;
          const open = todos.filter(todo => todo.status === "offen").length;
          const inProgress = todos.filter(todo => todo.status === "in Bearbeitung").length;

          // Setze die Fortschrittsdaten
          setProgressData({
            completed,  // Anzahl der erledigten Aufgaben
            open,       // Anzahl der offenen Aufgaben
            inProgress, // Anzahl der in Bearbeitung befindlichen Aufgaben
          });
          setNoTodosMessage(""); // Keine Nachricht, wenn To-Dos vorhanden sind
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der To-Dos:", error);
      } finally {
        setLoading(false); // Ladezustand beenden
      }
    };

    fetchData(); // API-Daten abrufen

  }, []); // Nur beim ersten Rendern ausführen, leerer Array bedeutet nur beim Mounten

  // Das Diagramm nur anzeigen, wenn die Daten geladen sind und keine Fehlermeldung existiert
  useEffect(() => {
    if (loading || noTodosMessage) return; // Verhindert das Erstellen des Diagramms, wenn Daten noch geladen werden oder keine To-Dos existieren

    // Zerstöre das alte Diagramm, falls es existiert
    const ctx = chartRef.current.getContext("2d");
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Erstelle das neue Diagramm
    chartInstance.current = new Chart(ctx, {
      type: "doughnut", // Diagrammtyp
      data: {
        labels: ["Erledigte Aufgaben", "Offene Aufgaben", "In Bearbeitung"], // Neue Label für in Bearbeitung
        datasets: [
          {
            label: "Aufgaben-Fortschritt",
            data: [progressData.completed, progressData.open, progressData.inProgress], // Neue Daten für in Bearbeitung
            backgroundColor: ["#13fa02", "#f0f2f0", "#ffcc00"], // Hinzufügen einer Farbe für "In Bearbeitung"
            borderColor: "rgba(255, 255, 255, 0.5)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true, // Stellt sicher, dass das Diagramm gut skaliert
        plugins: {
          legend: {
            position: "top", // Legende oben
            labels: {
              font: {
                size: 14, // Schriftgröße der Legende
                family: "Inter, sans-serif", // Schriftart
                weight: "400", // Schriftgewicht der Legende
              },
            },
          },
          tooltip: {
            bodyFont: {
              size: 14, // Schriftgröße im Tooltip
            },
          },
          // Hier fügen wir das plugin-datalabels hinzu, um die Zahlen im Diagramm anzuzeigen
          datalabels: {
            display: true,  // Zeigt die Datenlabels an
            color: '#595959',  // Textfarbe
            formatter: (value) => value,  // Die Zahl wird direkt angezeigt
            font: {
              weight: 'bold',
              size: 16,  // Größe der Zahl im Diagramm
            },
            anchor: 'center', // Position der Zahl im Sektor (zentriert)
            align: 'center', // Textausrichtung
          },
        },
      },
      plugins: [ChartDataLabels], // Das Plugin für Datenlabels aktivieren
    });

    // Cleanup: Zerstöre das Diagramm, wenn die Komponente unmountet
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [progressData, loading, noTodosMessage]); // Abhängigkeiten auf `progressData`, `loading`, und `noTodosMessage`

  return (
    <div className="h-64 bg-white">
      {/* Wenn keine To-Dos vorhanden sind, zeige eine Nachricht an */}
      {noTodosMessage ? (
        <p className="text-center text-red-500">{noTodosMessage}</p>
      ) : loading ? (
        <p className="text-center text-gray-500">Lädt...</p>
      ) : (
        <canvas ref={chartRef} className="h-full w-full p-4" />
      )}
    </div>
  );
}
