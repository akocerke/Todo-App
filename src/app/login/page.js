"use client"; // Diese Direktive sorgt dafür, dass der Code im Client ausgeführt wird

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { login } from "../api/auth";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation"; // Router-Import von 'next/navigation' für Next.js 13+

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(""); // Für E-Mail oder Benutzername
  const [password, setPassword] = useState(""); // Passwort
  const [errorMessage, setErrorMessage] = useState(""); // Fehlermeldung

  const { login: authLogin } = useAuth(); // Login aus AuthContext
  const router = useRouter(); // Router-Instanz für Weiterleitung

  // Initialisieren von AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Formular-Submit-Handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // API-Login aufrufen
      const response = await login(identifier, password); // API-Login bleibt unverändert
      console.log("Login erfolgreich:", response);

      // Token und Benutzerinformationen aus der API-Antwort abrufen
      const { token, user } = response;

      console.log("Erhaltener Token:", token);
      console.log("User Role:", user);

      // Token und Benutzerinformationen im AuthContext setzen
      authLogin(token); // AuthContext-Login-Funktion verwenden

      // Weiterleitung nach erfolgreichem Login
      router.push("/dashboard"); // Weiterleitung zur Dashboard-Seite

      // Eingabefelder zurücksetzen
      setIdentifier("");
      setPassword("");
    } catch (error) {
      console.error("Fehler beim Login:", error);
      setErrorMessage(
        "Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <div
        className="max-w-md w-full bg-white shadow-lg rounded-lg p-6"
        data-aos="fade-up"
      >
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 pb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-600"
              placeholder="E-Mail oder Benutzername"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-600"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-400 text-white py-2 rounded hover:bg-teal-600 shadow-lg hover:shadow-xl transition duration-300"
          >
            Einloggen
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Noch keinen Account?{" "}
            <Link href="/register" className="text-teal-500 hover:text-teal-600">
              Registrieren
            </Link>
          </p>
        </form>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      </div>
    </div>
  );
}
