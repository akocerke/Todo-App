"use client";
import Link from "next/link";
import { useState } from "react";
import { CiLogin, CiHome, CiLogout } from "react-icons/ci";
import { AiOutlineUserAdd } from "react-icons/ai";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black bg-opacity-50 p-4 shadow-lg text-white sm:p-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-2xl font-bold" href={"/"}>ToDo APP</Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-grow justify-center">
          <Link href="/" className="flex items-center mx-2 hover:text-gray-300">
            <CiHome className="mr-1 text-gray-200 hover:text-gray-300" /> Home
          </Link>
        </div>

        {/* Navigation links on the left side */}
        <div className="hidden md:flex">
          <Link
            href="/login"
            className="flex items-center mx-2 hover:text-gray-300"
          >
            <CiLogin className="mr-1 text-gray-200 hover:text-gray-300" /> Login
          </Link>
          <Link
            href="/register"
            className="flex items-center mx-2 hover:text-gray-300"
          >
            <AiOutlineUserAdd className="mr-1 text-gray-200 hover:text-gray-300" />{" "}
            Register
          </Link>
          <Link
            href="/logout"
            className="flex items-center mx-2 hover:text-gray-300"
          >
            <CiLogout className="mr-1 text-gray-200 hover:text-gray-300" />{" "}
            Logout
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? (
              // "X" Icon für das Schließen
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
              // Hamburger-Menü Icon für das Öffnen
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
        <div className="md:hidden mt-4 space-y-2 text-left">
          <Link
            href="/"
            className="flex items-center mx-2 hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            <CiHome className="mr-1 text-gray-200 hover:text-gray-300" /> Home
          </Link>
          <Link
            href="/login"
            className="flex items-center mx-2 hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            <CiLogin className="mr-1 text-gray-200 hover:text-gray-300" /> Login
          </Link>
          <Link
            href="/register"
            className="flex items-center mx-2 hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            <AiOutlineUserAdd className="mr-1 text-gray-200 hover:text-gray-300" />{" "}
            Register
          </Link>
          <Link
            href="/logout"
            className="flex items-center mx-2 hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            <CiLogout className="mr-1 text-gray-200 hover:text-gray-300" />{" "}
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};
