"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Imprint() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-600 min-h-screen flex flex-col items-center justify-center text-white p-6">
      {/* Hero-Bereich */}
      <div className="text-center mt-20" data-aos="fade-up">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Impressum</h1>
        <p className="text-lg mb-8">
          Rechtliche Informationen und Angaben gemäß § 5 TMG.
        </p>
      </div>

      {/* Impressum-Details */}
      <div
        className="mt-20 max-w-4xl mx-auto grid grid-cols-1 gap-10 p-5"
        data-aos="fade-up"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="uppercase font-semibold mb-4 text-gray-600">
            Anbieter
          </h2>
          <p className="text-gray-600">
            Musterfirma GmbH <br />
            Musterstraße 1 <br />
            12345 Musterstadt
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="uppercase font-semibold mb-4 text-gray-600">
            Kontakt
          </h2>
          <p className="text-gray-600">
            Telefon: +49 123 456789 <br />
            E-Mail:{" "}
            <a href="mailto:info@musterfirma.de" className="text-blue-600">
              info@musterfirma.de
            </a>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="uppercase font-semibold mb-4 text-gray-600">
            Vertreten durch
          </h2>
          <p className="text-gray-600">
            Geschäftsführer: Max Mustermann, Maria Musterfrau
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="uppercase font-semibold mb-4 text-gray-600">
            USt-IdNr. und Handelsregister
          </h2>
          <p className="text-gray-600">
            Umsatzsteuer-Identifikationsnummer: DE123456789 <br />
            Handelsregister: HRB 987654, Amtsgericht Musterstadt
          </p>
        </div>
      </div>
    </div>
  );
}
