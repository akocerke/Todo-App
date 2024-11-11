// src/app/api/todos.js
import api from '../api/api';

// Alle To-Dos eines Benutzers abrufen
export const getAllTodos = async () => {
    try {
      // Lese den Token aus dem LocalStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Kein Token gefunden. Bitte melden Sie sich an.');
      }
  
      // Sende die Anfrage mit dem Token im Authorization-Header
      const response = await api.get('/todos/all', {
        headers: {
          Authorization: `Bearer ${token}`, // Setze den Token im Header
        },
      });
  
      return response.data; // Gibt die To-Dos zurück
    } catch (error) {
      console.error("Fehler beim Abrufen der To-Dos:", error);
      // Falls ein Fehler auftritt, werfen wir ihn weiter
      throw error.response ? error.response.data : 'Fehler beim Abrufen der To-Dos';
    }
  };

// Alle wichtigen To-Dos eines Benutzers abrufen
export const getImportantTodos = async () => {
    try {
      // Lese den Token aus dem LocalStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Kein Token gefunden. Bitte melden Sie sich an.');
      }
  
      // Sende die Anfrage mit dem Token im Authorization-Header
      const response = await api.get('/todos/important', {
        headers: {
          Authorization: `Bearer ${token}`, // Setze den Token im Header
        },
      });
  
      return response.data; // Gibt die wichtigen To-Dos zurück
    } catch (error) {
      console.error("Fehler beim Abrufen der wichtigen To-Dos:", error);
      // Falls ein Fehler auftritt, werfen wir ihn weiter
      throw error.response ? error.response.data : 'Fehler beim Abrufen der wichtigen To-Dos';
    }
  };

// Ein neues To-Do erstellen
export const createTodo = async (todoData) => {
    try {
      // Token aus dem localStorage holen
      const token = localStorage.getItem('token');
  
      if (!token) {
        throw new Error('Kein Token gefunden, bitte anmelden.');
      }
  
      // API-Anfrage mit dem Authorization Header
      const response = await api.post('/todos/create', todoData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Die Antwort des Servers zurückgeben
      return response.data;
    } catch (error) {
      console.error("Fehler beim Erstellen eines To-Dos:", error);
      throw error; // Fehler weiterwerfen, um im UI damit zu arbeiten
    }
  };

// To-Do aktualisieren
export const updateTodo = async (todoId, todoData) => {
    try {
      // Token aus dem localStorage holen
      const token = localStorage.getItem('token');
  
      if (!token) {
        throw new Error('Kein Token gefunden, bitte anmelden.');
      }
  
      // API-Anfrage zum Aktualisieren des To-Dos mit dem Authorization Header
      const response = await api.put('/todos/update', 
        {
          todoId,       // Die ID des To-Dos
          ...todoData   // Die neuen To-Do-Daten (z.B. title, description, status, etc.)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token im Header
          },
        }
      );
  
      // Gibt die Antwort des Servers zurück (z.B. die aktualisierten To-Dos)
      return response.data;
    } catch (error) {
      console.error("Fehler beim Aktualisieren des To-Dos:", error);
      throw error; // Fehler weiterwerfen, um im UI damit zu arbeiten
    }
  };


// Status eines To-Dos aktualisieren (z.B. erledigt oder nicht erledigt)
export const updateTodoStatus = async (todoId, status) => {
  try {
    // Token aus localStorage holen
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Kein Token gefunden, bitte anmelden.');
    }

    // Validierung des Status
    const validStatuses = ['offen', 'in Bearbeitung', 'abgeschlossen'];
    if (!validStatuses.includes(status)) {
      throw new Error('Ungültiger Status');
    }

    // API-Anfrage zum Aktualisieren des Status eines To-Dos mit dem Authorization Header
    const response = await api.put('/todos/status', 
      {
        todoId,  // Die ID des To-Dos
        status    // Der neue Status des To-Dos
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Token im Header
        },
      }
    );

    // Gibt die Antwort des Servers zurück (z.B. das aktualisierte To-Do mit dem neuen Status)
    return response.data;
  } catch (error) {
    console.error("Fehler beim Aktualisieren des To-Do-Status:", error);
    throw error; // Fehler weiterwerfen, um im UI damit zu arbeiten
  }
};

// Ein To-Do löschen
export const deleteTodo = async (todoId) => {
    try {
      // Token aus localStorage holen
      const token = localStorage.getItem('token');
  
      if (!token) {
        throw new Error('Kein Token gefunden, bitte anmelden.');
      }
  
      // Überprüfen, ob die To-Do-ID übergeben wurde
      if (!todoId) {
        throw new Error('To-Do ID fehlt');
      }
  
      // API-Anfrage zum Löschen des To-Dos mit dem Authorization Header
      const response = await api.delete('/todos/delete', {
        headers: {
          Authorization: `Bearer ${token}`, // Token im Header
        },
        data: {
          todoId,  // Die ID des To-Dos, das gelöscht werden soll
        },
      });
  
      // Gibt die Antwort des Servers zurück
      return response.data;
    } catch (error) {
      console.error("Fehler beim Löschen des To-Dos:", error);
      throw error; // Fehler weiterwerfen, um im UI damit zu arbeiten
    }
  };
