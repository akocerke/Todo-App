"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Um den Benutzer nach erfolgreicher Registrierung weiterzuleiten
import AOS from "aos";
import "aos/dist/aos.css";
import { CiLogin } from "react-icons/ci";
import { signup } from "../api/auth"; // Importiere deine signup Funktion
import Link from "next/link"; // Für den Link zur Login-Seite

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Für Fehlerbehandlung
  const [successMessage, setSuccessMessage] = useState(""); // Erfolgsnachricht
  const [passwordError, setPasswordError] = useState(""); // Fehlernachricht für das Passwort
  const router = useRouter(); // Für das Weiterleiten des Benutzers nach der Registrierung

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Überprüfen, ob das Passwort mindestens 8 Zeichen lang ist
    if (password.length < 8) {
      setPasswordError("Das Passwort muss mindestens 8 Zeichen lang sein.");
      return; // Verhindert das Absenden des Formulars
    }

    // Setze die Fehlernachricht zurück, falls der Benutzer es erneut versucht
    setErrorMessage("");

    try {
      // Rufe die signup Funktion auf, um den Benutzer zu registrieren
      const response = await signup(username, email, password);

      // Bei erfolgreicher Registrierung, setze die Erfolgsnachricht
      if (response?.message) {
        setSuccessMessage(response.message);
      }
    } catch (error) {
      // Fehlerbehandlung
      setErrorMessage(
        error?.response?.data?.message ||
          "Fehler bei der Registrierung. Bitte versuche es erneut."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-6">
      <div
        className="max-w-md w-full bg-white shadow-lg rounded-lg p-6"
        data-aos="fade-up"
      >
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 pb-6">
          Registrieren
        </h1>

        {errorMessage && (
          <div className="text-red-500 text-center">{errorMessage}</div>
        )}

        {successMessage && (
          <div className="text-green-700 text-center mb-4 mt-6">
            {successMessage}
            <br />
            <Link
              href="/login"
              className="text-purple-500 hover:text-purple-800 pt-4 flex justify-center items-center"
            >
              <p className="text-gray-600 mr-2 hover:text-gray-800">Logge dich hier ein</p>
              <CiLogin className="text-purple-500 hover:text-purple-800" />
              Login
            </Link>
          </div>
        )}

        {!successMessage && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-600"
                placeholder="Benutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-600"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-600"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8} // Mindestlänge für das Passwort
              />
              {passwordError && (
                <div className="text-red-600 text-sm mt-2">{passwordError}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-fuchsia-600 text-white py-2 rounded hover:bg-fuchsia-800 transition duration-300 shadow-lg hover:shadow-xl"
            >
              Registrieren
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
