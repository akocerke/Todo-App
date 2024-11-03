"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LoginPage() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6"  data-aos="fade-up">
                <h1 className="text-4xl font-bold text-center mb-6">Login</h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Benutzername</label>
                        <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-600" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Passwort</label>
                        <input type="password" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-600" />
                    </div>
                    <button className="w-full bg-teal-400 text-white py-2 rounded hover:bg-teal-600 transition duration-300">Einloggen</button>
                </form>
            </div>
        </div>
    );
}
