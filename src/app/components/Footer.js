"use client";
import Link from "next/link";
import { AiFillFacebook, AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();

  // Wähle eine Hintergrundklasse basierend auf dem aktuellen Pfad
  const footerBackgroundClass = (() => {
    switch (pathname) {
      case "/":
        return "bg-gradient-to-r from-blue-400 to-purple-600"; // Startseite
      case "/login":
        return "bg-gradient-to-r from-green-400 to-blue-500"; // Login-Seite
      case "/register":
        return "bg-gradient-to-r from-purple-500 to-pink-500"; // Registrierungsseite
      case "/logout":
        return "bg-gradient-to-r from-green-500 to-teal-800"; // Logout-Seite
        case "/dashboard":
          return "bg-gradient-to-r from-orange-700 to-lime-500"; // Dashboard-Seite
      case "/terms":
          return "bg-gradient-to-r from-yellow-400 to-red-600" // Nutzerbedingungen-Seite
      case "/privacypolicy":
          return "bg-gradient-to-r from-purple-600 to-blue-400"  // Datenschutz-Seite
      case "/imprint":
          return "bg-gradient-to-r from-blue-400 to-purple-600"  // Impressum-Seite
      default:
        return "bg-black bg-opacity-50"; // Standardfarbe für andere Seiten
    }
  })();

  return (
    <footer className={`${footerBackgroundClass} p-6 text-white relative`}>
      {/* Overlay für die Standardfarbe */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start relative z-10">
        <div className="mb-6 md:mb-0 md:w-1/3">
          <h3 className="text-lg font-bold">Kontakt</h3>
          <p className="text-sm">E-Mail: support@musterfirma.de</p>
          <p className="text-sm">Telefon: +49 123 456 789</p>
        </div>

        <div className="mb-6 md:mb-0 md:w-1/3">
          <h3 className="text-lg font-bold">Rechtliches</h3>
          <Link href="/privacypolicy" className="block text-sm hover:text-gray-300">
            Datenschutz
          </Link>
          <Link href="/terms" className="block text-sm hover:text-gray-300">
            Nutzungsbedingungen
          </Link>
          <Link href="/imprint" className="block text-sm hover:text-gray-300">
            Impressum
          </Link>
        </div>

        <div className="md:w-1/3 ">
          <h3 className="text-lg font-bold">Folge uns</h3>
          <div className="flex space-x-4 mt-2">
            <Link href="https://facebook.com" target="_blank" className="hover:text-gray-300">
              <AiFillFacebook className="h-6 w-6" />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="hover:text-gray-300">
              <AiFillTwitterCircle className="h-6 w-6" />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="hover:text-gray-300">
              <AiFillInstagram className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm relative z-10">
        <p>© 2024 ToDo APP. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
};
