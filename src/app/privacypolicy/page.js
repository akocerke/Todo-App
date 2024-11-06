"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PrivacyPolicy() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-400 min-h-screen flex flex-col items-center justify-center text-white p-6">
      {/* Hero-Bereich */}
      <div className="text-center mt-20" data-aos="fade-up">
        <h1 className="text-3xl font-bold mb-4">Datenschutzerklärung</h1>
        <p className="text-lg mb-8">
          Ihr Datenschutz ist uns wichtig. Hier erfahren Sie, wie wir Ihre
          Daten sammeln, nutzen und schützen.
        </p>
      </div>

      {/* Abschnitte zur Datenschutzerklärung */}
      <div
        className="mt-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-5"
        data-aos="fade-up"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="uppercase font-semibold mb-4 text-gray-600">
            Erfassung und Nutzung personenbezogener Daten
          </h2>
          <p className="text-gray-600">
            Wir sammeln personenbezogene Daten nur dann, wenn Sie uns diese
            freiwillig zur Verfügung stellen. Diese Daten verwenden wir, um
            Ihnen unsere Dienstleistungen anzubieten und unsere Plattform zu
            verbessern.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="uppercase font-semibold mb-4 text-gray-600">
            Cookies und Tracking-Technologien
          </h2>
          <p className="text-gray-600">
            Unsere Website verwendet Cookies und ähnliche Technologien, um die
            Nutzererfahrung zu verbessern. Sie haben die Möglichkeit, das
            Setzen von Cookies zu kontrollieren und anzupassen.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="uppercase font-semibold mb-4 text-gray-600">
            Datenspeicherung und -sicherheit
          </h2>
          <p className="text-gray-600">
            Ihre Daten werden sicher gespeichert und geschützt. Wir treffen
            alle notwendigen Maßnahmen, um die Sicherheit Ihrer Daten zu
            gewährleisten und sie vor unberechtigtem Zugriff zu schützen.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="uppercase font-semibold mb-4 text-gray-600">
            Ihre Rechte
          </h2>
          <p className="text-gray-600">
            Sie haben das Recht, Auskunft über Ihre gespeicherten Daten zu
            erhalten, diese zu berichtigen oder löschen zu lassen. Kontaktieren
            Sie uns, um Ihre Rechte wahrzunehmen.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="uppercase font-semibold mb-4 text-gray-600">
            Kontakt
          </h2>
          <p className="text-gray-600">
            Bei Fragen zur Datenschutzerklärung wenden Sie sich bitte an unseren
            Datenschutzbeauftragten unter{" "}
            <a href="mailto:datenschutz@beispiel.de" className="text-blue-600">
              datenschutz@beispiel.de
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
