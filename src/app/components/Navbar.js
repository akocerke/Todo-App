"use client";
import Link from "next/link";
import { useState } from "react";
import { CiLogin, CiHome, CiLogout, CiSettings } from "react-icons/ci";
import { AiOutlineUserAdd } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Importiere useAuth, um den Auth-Status zu nutzen

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth(); // Hole den Auth-Status und die Logout-Funktion

  // Wähle eine Hintergrundklasse basierend auf dem aktuellen Pfad
  const navbarBackgroundClass = (() => {
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
      case "/dashboard/tasks":
        return "bg-gradient-to-r from-orange-700 to-lime-500"; // Dashboard-Tasks-Seite
      case "/dashboard/settings":
        return "bg-gradient-to-r from-orange-700 to-lime-500"; // Dashboard-Einstellungen-Seite
      case "/terms":
        return "bg-gradient-to-r from-yellow-400 to-red-600"; // Nutzerbedingungen-Seite
      case "/privacypolicy":
        return "bg-gradient-to-r from-purple-600 to-blue-400"; // Datenschutz-Seite
      case "/imprint":
        return "bg-gradient-to-r from-blue-400 to-purple-600"; // Impressum-Seite
      default:
        return "bg-black bg-opacity-50"; // Standardfarbe für andere Seiten
    }
  })();

  return (
    <nav
      className={`${navbarBackgroundClass} fixed top-0 left-0 w-full p-4 shadow-lg text-white sm:p-6`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-2xl font-bold" href={"/"}>
          ToDo APP
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-grow justify-center">
          <Link href="/" className="flex items-center mx-2 hover:text-gray-300">
            <CiHome className="mr-1 text-gray-200 hover:text-gray-300" /> Home
          </Link>
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="flex items-center mx-2 hover:text-gray-300"
            >
              <CiSettings className="mr-1 text-gray-200 hover:text-gray-300" />{" "}
              Dashboard
            </Link>
          )}
        </div>

        {/* Navigation links on the left side */}
        <div className="hidden md:flex">
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="flex items-center mx-2 hover:text-gray-300"
              >
                <CiLogin className="mr-1 text-gray-200 hover:text-gray-300" />{" "}
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center mx-2 hover:text-gray-300"
              >
                <AiOutlineUserAdd className="mr-1 text-gray-200 hover:text-gray-300" />{" "}
                Register
              </Link>
            </>
          ) : (
            <Link
              href="/logout"
              onClick={() => logout()}
              className="flex items-center mx-2 hover:text-gray-300"
            >
              <CiLogout className="mr-1 text-gray-200 hover:text-gray-300" />{" "}
              Logout
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          className={`${navbarBackgroundClass} md:hidden mt-4 space-y-2 text-left`}
        >
          <Link
            href="/"
            className="flex items-center mx-2 hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            <CiHome className="mr-1 text-gray-200 hover:text-gray-300" /> Home
          </Link>
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="flex items-center mx-2 hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              <CiSettings className="mr-1 text-gray-200 hover:text-gray-300" />
              Dashboard
            </Link>
          )}
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="flex items-center mx-2 hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                <CiLogin className="mr-1 text-gray-200 hover:text-gray-300" />{" "}
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center mx-2 hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                <AiOutlineUserAdd className="mr-1 text-gray-200 hover:text-gray-300" />{" "}
                Register
              </Link>
            </>
          ) : (
            <Link
              href="/logout"
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex items-center mx-2 hover:text-gray-300"
            >
              <CiLogout className="mr-1 text-gray-200 hover:text-gray-300" />{" "}
              Logout
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
