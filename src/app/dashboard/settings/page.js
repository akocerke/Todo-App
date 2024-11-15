"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineMailLock } from "react-icons/md";
import { RiLockPasswordLine, RiEyeFill, RiEyeOffFill } from "react-icons/ri"; // Eye Icons von react-icons
import { toast } from "react-toastify";
import { getUserProfile, updateUsername, updateEmail, updatePassword } from "../../api/user"; 

export default function SettingsPage() {
  // Benutzerdaten
  const [userData, setUserData] = useState(null);

  // Passwortänderung
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // States für die Passwortsichtbarkeit
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    // Benutzerprofil beim Laden der Seite abrufen
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUserData(profile); // Benutzerdaten laden
      } catch (error) {
        console.error("Fehler beim Abrufen des Benutzerprofils:", error);
        toast.error("Fehler beim Abrufen des Benutzerprofils.");
      }
    };
    fetchUserProfile();
  }, []);

  // Funktion zum Bearbeiten des Benutzernamens
  const handleUsernameChange = async (e) => {
    e.preventDefault();
    try {
      await updateUsername(userData.username);
      toast.success("Benutzername wurde erfolgreich geändert.");
      
      // Nach erfolgreicher Änderung den neuesten Benutzername abrufen
      const updatedProfile = await getUserProfile();
      setUserData(updatedProfile); // Benutzername aktualisieren
    } catch (error) {
      console.error("Fehler beim Ändern des Benutzernamens:", error);
      toast.error("Fehler beim Ändern des Benutzernamens.");
    }
  };

  // Funktion zum Bearbeiten der E-Mail
  const handleEmailChange = async (e) => {
    e.preventDefault();
    try {
      await updateEmail(userData.email);
      toast.success("E-Mail-Adresse wurde erfolgreich geändert.");

      // Nach erfolgreicher Änderung die neuesten E-Mail-Daten abrufen
      const updatedProfile = await getUserProfile();
      setUserData(updatedProfile); // E-Mail aktualisieren
    } catch (error) {
      console.error("Fehler beim Ändern der E-Mail:", error);
      toast.error("Fehler beim Ändern der E-Mail.");
    }
  };

  // Funktion zum Ändern des Passworts
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Überprüfen, ob das neue Passwort und die Bestätigung übereinstimmen
    if (newPassword !== confirmNewPassword) {
      toast.error("Die neuen Passwörter stimmen nicht überein.");
      return;
    }

    // Überprüfen, ob das neue Passwort nicht leer ist
    if (newPassword.trim() === "") {
      toast.error("Das neue Passwort darf nicht leer sein.");
      return;
    }

    try {
      // API-Aufruf zum Ändern des Passworts
      await updatePassword(oldPassword, newPassword, confirmNewPassword);
      toast.success("Passwort wurde erfolgreich geändert.");
    } catch (error) {
      console.error("Fehler beim Ändern des Passworts:", error);
      toast.error("Fehler beim Ändern des Passworts.");
    }
  };

  // Wenn Benutzerdaten noch nicht geladen wurden, einen Ladezustand anzeigen
  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-slate-500 mb-4 uppercase">
            Einstellungen
          </h2>
          <p className="text-gray-600">Lade Benutzerdaten...</p>
        </div>
      </div>
    );
  }

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
          {/* Altes Passwort */}
          <div className="mb-4 relative">
            <label htmlFor="oldPassword" className="block text-gray-700 mb-2">
              Altes Passwort
            </label>
            <div className="relative">
              <input
                id="oldPassword"
                type={showOldPassword ? "text" : "password"} // Zeige das Passwort, wenn der State true ist
                className="w-full px-4 py-2 border rounded-md text-gray-500 pr-10" // Extra Platz für das Icon rechts
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                placeholder="Altes Passwort"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)} // Toggle Passwortsichtbarkeit
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showOldPassword ? <RiEyeOffFill /> : <RiEyeFill />}
              </button>
            </div>
          </div>

          {/* Neues Passwort */}
          <div className="mb-4 relative">
            <label htmlFor="newPassword" className="block text-gray-700 mb-2">
              Neues Passwort
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"} // Zeige das Passwort, wenn der State true ist
                className="w-full px-4 py-2 border rounded-md text-gray-500 pr-10" // Extra Platz für das Icon rechts
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Neues Passwort"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)} // Toggle Passwortsichtbarkeit
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showNewPassword ? <RiEyeOffFill /> : <RiEyeFill />}
              </button>
            </div>
          </div>

          {/* Neues Passwort bestätigen */}
          <div className="mb-4 relative">
            <label htmlFor="confirmNewPassword" className="block text-gray-700 mb-2">
              Neues Passwort bestätigen
            </label>
            <div className="relative">
              <input
                id="confirmNewPassword"
                type={showConfirmPassword ? "text" : "password"} // Zeige das Passwort, wenn der State true ist
                className="w-full px-4 py-2 border rounded-md text-gray-500 pr-10" // Extra Platz für das Icon rechts
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
                placeholder="Neues Passwort bestätigen"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle Passwortsichtbarkeit
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <RiEyeOffFill /> : <RiEyeFill />}
              </button>
            </div>
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
