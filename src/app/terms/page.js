"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function TermsOfUse() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-red-600 min-h-screen flex flex-col items-center justify-center text-white p-6">
      {/* Hero-Bereich */}
      <div className="text-center mt-20" data-aos="fade-up">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Nutzungsbedingungen</h1>
        <p className="text-lg sm:text-xl mb-8">
          Hier erfahren Sie die Bedingungen, unter denen Sie unsere Dienste und
          Inhalte nutzen dürfen.
        </p>
      </div>

      {/* Abschnitte für Nutzungsbedingungen */}
      <div
        className="mt-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-5"
        data-aos="fade-up"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="uppercase font-semibold mb-4 text-gray-600">
            Allgemeine Bedingungen
          </h2>
          <p className="text-gray-600">
            Mit der Nutzung unserer Website erklären Sie sich mit diesen
            Bedingungen einverstanden. Wir behalten uns das Recht vor, die
            Nutzungsbedingungen jederzeit zu ändern.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="uppercase font-semibold mb-4 text-gray-600">
            Verbotene Aktivitäten
          </h2>
          <p className="text-gray-600">
            Nutzer dürfen unsere Plattform nicht für illegale Zwecke oder
            zur Verbreitung unerwünschter Inhalte nutzen. Verstöße können
            zum Ausschluss führen.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="uppercase font-semibold mb-4 text-gray-600">
            Haftungsbeschränkung
          </h2>
          <p className="text-gray-600">
            Wir übernehmen keine Haftung für Schäden, die durch die Nutzung
            unserer Dienste entstehen, es sei denn, diese beruhen auf Vorsatz
            oder grober Fahrlässigkeit.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="uppercase font-semibold mb-4 text-gray-600">
            Änderungen der Nutzungsbedingungen
          </h2>
          <p className="text-gray-600">
            Wir behalten uns das Recht vor, diese Nutzungsbedingungen
            regelmäßig zu aktualisieren. Es liegt in Ihrer Verantwortung,
            die Bedingungen regelmäßig zu überprüfen.
          </p>
        </div>
      </div>
    </div>
  );
}
