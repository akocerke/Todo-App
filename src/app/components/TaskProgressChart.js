import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function TaskProgressChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Referenz für das Chart-Objekt

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Zerstöre das alte Diagramm, falls es existiert
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Erstelle ein neues Diagramm
    chartInstance.current = new Chart(ctx, {
      type: "doughnut", // Diagrammtyp auf Doughnut geändert
      data: {
        labels: ["Erledigte Aufgaben", "Offene Aufgaben"], // Beispiel-Kategorien
        datasets: [
          {
            label: "Aufgaben-Fortschritt",
            data: [60, 40], // Beispiel-Daten: 60% erledigte Aufgaben, 40% offene Aufgaben
            backgroundColor: ["#13fa02", "#f0f2f0"], // Farben für die Sektoren
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
        },
      },
    });
    
    // Cleanup: Zerstört das Diagramm, wenn die Komponente unmountet
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Nur beim ersten Rendern ausführen

  return (
    <div className="h-64 bg-white">
      {/* Chart.js Canvas für das Doughnut-Diagramm */}
      <canvas ref={chartRef} className="h-full w-full p-4" />
    </div>
  );
}
