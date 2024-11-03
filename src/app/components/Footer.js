"use client";
import Link from "next/link";
import { AiFillFacebook, AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";

export const Footer = () => {
  return (
    <footer className="bg-opacity-50 bg-gradient-to-r from-blue-400 to-purple-600 p-6 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        <div className="mb-6 md:mb-0 md:w-1/3">
          <h3 className="text-lg font-bold">Kontakt</h3>
          <p className="text-sm">E-Mail: support@todoapp.com</p>
          <p className="text-sm">Telefon: +49 123 456 789</p>
        </div>

        <div className="mb-6 md:mb-0 md:w-1/3">
          <h3 className="text-lg font-bold">Rechtliches</h3>
          <Link href="/privacy" className="block text-sm hover:text-gray-300">
            Datenschutz
          </Link>
          <Link href="/terms" className="block text-sm hover:text-gray-300">
            Nutzungsbedingungen
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
      
      <div className="mt-6 text-center text-sm">
        <p>© 2024 ToDo APP. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
};
