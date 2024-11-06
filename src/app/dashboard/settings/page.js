"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineMailLock } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

export default function SettingsPage() {
  // Benutzerdaten
  const [userData, setUserData] = useState({
    username: "Max Mustermann",
    email: "max@example.com",
  });

  // Passwortänderung
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Beispiel für das alte Passwort (in einer realen App würde dies von der Authentifizierung abhängen)
  const [currentPassword, setCurrentPassword] = useState("123456");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Funktion zum Bearbeiten des Benutzernamens
  const handleUsernameChange = (e) => {
    e.preventDefault();
    // Hier könnte ein API-Aufruf zum Speichern des Benutzernamens erfolgen
    console.log("Benutzername geändert:", userData.username);
  };

  // Funktion zum Bearbeiten der E-Mail
  const handleEmailChange = (e) => {
    e.preventDefault();
    // Hier könnte ein API-Aufruf zum Speichern der E-Mail-Adresse erfolgen
    console.log("E-Mail geändert:", userData.email);
  };

  // Funktion zum Ändern des Passworts
  const handlePasswordChange = (e) => {
    e.preventDefault();

    // Überprüfen, ob das alte Passwort korrekt ist
    if (oldPassword !== currentPassword) {
      alert("Das alte Passwort ist falsch.");
      return;
    }

    // Überprüfen, ob das neue Passwort und die Bestätigung übereinstimmen
    if (newPassword !== confirmNewPassword) {
      alert("Die neuen Passwörter stimmen nicht überein.");
      return;
    }

    // Überprüfen, ob das neue Passwort nicht leer ist
    if (newPassword.trim() === "") {
      alert("Das neue Passwort darf nicht leer sein.");
      return;
    }

    // Wenn alle Prüfungen bestanden sind, wird das Passwort geändert
    setCurrentPassword(newPassword); // In einer echten App würde hier ein API-Aufruf stattfinden
    alert("Passwort wurde erfolgreich geändert.");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 rounded-lg">
      <div className="text-center mb-6" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-slate-500 mb-4 uppercase">
          Einstellungen
        </h2>
        <p className="text-gray-600">
          Hier kannst du deine Einstellungen anpassen.
        </p>
      </div>

      {/* Benutzerdaten Abschnitt */}
      <div className="bg-white rounded-lg shadow p-6 mb-8" data-aos="fade-up">
        <h3 className="text-xl font-semibold text-slate-500 mb-4">
          Benutzerdaten
        </h3>

        {/* Benutzername ändern */}
        <form onSubmit={handleUsernameChange} className="mb-6">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Benutzername
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-2 border rounded-md text-gray-500"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white hover:bg-purple-800 font-bold py-3 px-4 rounded shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaUserEdit /> Benutzername ändern
          </button>
        </form>

        {/* E-Mail ändern */}
        <form onSubmit={handleEmailChange}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              E-Mail-Adresse
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded-md text-gray-500"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white hover:bg-purple-800 font-bold py-3 px-4 rounded shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MdOutlineMailLock /> E-Mail ändern
          </button>
        </form>
      </div>

      {/* Passwort ändern Abschnitt */}
      <div className="bg-white rounded-lg shadow p-6" data-aos="fade-up">
        <h3 className="text-xl font-semibold text-slate-500 mb-4">
          Passwort ändern
        </h3>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block text-gray-700 mb-2">
              Altes Passwort
            </label>
            <input
              id="oldPassword"
              type="password"
              className="w-full px-4 py-2 border rounded-md text-gray-500"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              placeholder="Altes Passwort"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 mb-2">
              Neues Passwort
            </label>
            <input
              id="newPassword"
              type="password"
              className="w-full px-4 py-2 border rounded-md text-gray-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Neues Passwort"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmNewPassword"
              className="block text-gray-700 mb-2"
            >
              Neues Passwort bestätigen
            </label>
            <input
              id="confirmNewPassword"
              type="password"
              className="w-full px-4 py-2 border rounded-md text-gray-500"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              placeholder="Neues Passwort bestätigen"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white hover:bg-purple-800 font-bold py-3 px-4 rounded shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <RiLockPasswordLine /> Passwort ändern
          </button>
        </form>
      </div>
    </div>
  );
}
