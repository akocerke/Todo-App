"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Token dekodieren, um Benutzerinformationen zu extrahieren
  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1])); // Token-Dekodierung
    } catch (error) {
      console.error('Token konnte nicht dekodiert werden:', error);
      return null;
    }
  };

  // Login-Funktion
  const login = (token) => {
    localStorage.setItem('accessToken', token); // Token im LocalStorage speichern
    const decodedToken = decodeToken(token); // Token dekodieren

    if (decodedToken) {
      setUser(decodedToken); // Benutzerinformationen setzen
      setIsAuthenticated(true); // Authentifizierungsstatus auf true setzen
    }
  };

  // Logout-Funktion
  const logout = () => {
    localStorage.removeItem('accessToken'); // Token entfernen
    setUser(null); // Benutzer zurücksetzen
    setIsAuthenticated(false); // Authentifizierungsstatus zurücksetzen
  };

  // Beim Laden der App prüfen, ob ein Token existiert und validieren
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setUser(decodedToken);
        setIsAuthenticated(true);
      } else {
        logout(); // Token ungültig -> Logout durchführen
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
