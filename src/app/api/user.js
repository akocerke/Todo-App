// src/app/api/user.js
import api from '../api/api';

// Benutzerprofil abrufen
export const getUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Kein Token gefunden. Bitte melden Sie sich an.');
      }
  
      // Sende die Anfrage mit dem Token im Authorization-Header
      const response = await api.get('/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`, // Token im Header hinzufügen
        },
      });
  
      return response.data; // Gibt die Benutzerdaten zurück
    } catch (error) {
      console.error("Fehler beim Abrufen des Benutzerprofils:", error);
      throw error.response ? error.response.data : 'Fehler beim Abrufen des Benutzerprofils';
    }
  };

// Benutzername aktualisieren
export const updateUsername = async (newUsername) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Kein Token gefunden. Bitte melden Sie sich an.');
      }
  
      const response = await api.put('/users/username', { newUsername }, {
        headers: {
          Authorization: `Bearer ${token}`, // Token im Header hinzufügen
        },
      });
  
      return response.data; // Erfolgreiche Antwort mit den neuen Benutzerdaten
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Benutzernamens:", error);
      throw error.response ? error.response.data : 'Fehler beim Aktualisieren des Benutzernamens';
    }
  };

  // E-Mail-Adresse aktualisieren
export const updateEmail = async (newEmail) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Kein Token gefunden. Bitte melden Sie sich an.');
      }
  
      const response = await api.put('/users/email', { newEmail }, {
        headers: {
          Authorization: `Bearer ${token}`, // Token im Header hinzufügen
        },
      });
  
      return response.data; // Erfolgreiche Antwort mit den neuen Benutzerdaten
    } catch (error) {
      console.error("Fehler beim Aktualisieren der E-Mail-Adresse:", error);
      throw error.response ? error.response.data : 'Fehler beim Aktualisieren der E-Mail-Adresse';
    }
  };

  
  // Passwort aktualisieren
export const updatePassword = async (oldPassword, newPassword, confirmPassword) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Kein Token gefunden. Bitte melden Sie sich an.');
      }
  
      // Überprüfen, ob das neue Passwort und die Bestätigung übereinstimmen
      if (newPassword !== confirmPassword) {
        throw new Error('Das neue Passwort und die Bestätigung stimmen nicht überein');
      }
  
      const response = await api.put('/users/password', { oldPassword, newPassword, confirmPassword }, {
        headers: {
          Authorization: `Bearer ${token}`, // Token im Header hinzufügen
        },
      });
  
      return response.data; // Erfolgreiche Antwort, z. B. "Passwort erfolgreich geändert"
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Passworts:", error);
      throw error.response ? error.response.data : 'Fehler beim Aktualisieren des Passworts';
    }
  };
  
