"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Für das Weiterleiten zur Startseite
import { logout } from "../api/auth"; // Importiere die logout-Funktion
import AOS from "aos";
import "aos/dist/aos.css";

export default function LogoutPage() {
  const [message, setMessage] = useState(""); // Für Erfolgs-/Fehlermeldung
  const [errorMessage, setErrorMessage] = useState(""); // Für Fehler
  const router = useRouter(); // Um den Benutzer nach dem Logout weiterzuleiten

  useEffect(() => {
    AOS.init({ duration: 1000 });
    handleLogout(); // Logout-Funktion beim Laden der Seite ausführen
  }, []);

  // Logout durchführen
  const handleLogout = async () => {
    try {
      const response = await logout(); // Aufruf der logout API
      setMessage(response.message || "Erfolgreich ausgeloggt!");
      localStorage.removeItem("token"); // Entferne den Token aus dem localStorage
      setTimeout(() => {
        router.push("/"); // Weiterleitung zur Startseite nach 2 Sekunden
      }, 2000); // Verzögerung von 2 Sekunden für die Erfolgsmeldung
    } catch (error) {
      setErrorMessage("Fehler beim Logout. Bitte versuche es erneut.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-teal-800 p-6">
      <div
        className="max-w-md w-full bg-white shadow-lg rounded-lg p-6"
        data-aos="fade-up"
      >
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-800">
          Logout
        </h1>
        {/* Erfolgs- oder Fehlermeldung */}
        {message && (
          <div className="text-green-500 text-center mt-4">
            {message}{" "}
            <span className="text-blue-500 cursor-pointer" onClick={() => router.push("/")}>
              Zur Startseite
            </span>
          </div>
        )}

        {errorMessage && (
          <div className="text-red-500 text-center mt-4">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
