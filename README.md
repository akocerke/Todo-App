# To-Do Listen App

Eine einfache To-Do-Listen-App, die es Benutzern ermöglicht, ihre Aufgaben zu verwalten. Die App unterstützt Benutzerregistrierung, Anmeldung und verwendet JWT (JSON Web Tokens) für die Authentifizierung. Entwickelt mit Next.js, Tailwind CSS und einer MySQL-Datenbank.

## Features

- **Benutzerregistrierung und -anmeldung:** Benutzer können Konten erstellen und sich anmelden.
- **Aufgaben verwalten:** Aufgaben können hinzugefügt, gelöscht und aktualisiert werden.
- **JWT-Authentifizierung:** Sicherstellung der Benutzersitzung mithilfe von JSON Web Tokens.
- **Responsives Design:** Benutzeroberfläche, die auf verschiedenen Geräten gut aussieht, dank Tailwind CSS.

## Technologien

- **Frontend:** Next.js
- **Styling:** Tailwind CSS
- **Backend:** Express.js
- **Datenbank:** MySQL
- **Authentifizierung:** JWT (JSON Web Tokens) mit bcrypt für Passwort-Hashing

## Dashboard

### 1. Übersicht

Die Übersicht bietet eine Zusammenfassung wichtiger Informationen, damit der Benutzer schnell einen Überblick über seinen Status und relevante Daten erhält.

**Inhalte für die Übersicht:**

- **Statistiken:**
  - Anzahl der aktiven Aufgaben (z. B. "5 offene Aufgaben").
  - Fortschritt in Prozent für abgeschlossene Aufgaben oder Projekte.
  - Letzte Aktivität (z. B. "Du hast zuletzt am 3. November 2 Aufgaben abgeschlossen").

- **Widgets:**
  - Schnelle Links oder Buttons zu häufig genutzten Funktionen, wie "Neue Aufgabe hinzufügen".

- **Diagramme:**
  - Grafische Darstellungen von Daten (z. B. Balkendiagramme für wöchentliche oder monatliche Fortschritte).

- **To-Do-Liste:**
  - Eine schnelle Übersicht über die wichtigsten Aufgaben.

### 2. Aufgaben

In der Aufgabenansicht können Benutzer ihre Aufgaben verwalten. Hier kannst du Funktionen zur Erstellung, Bearbeitung und Löschung von Aufgaben anbieten.

**Inhalte für die Aufgaben:**

- **Aufgabenliste:**
  - Eine vollständige Liste aller Aufgaben mit Status (offen, in Bearbeitung, abgeschlossen).

- **Such- und Filterfunktionen:**
  - Ermögliche den Benutzern, Aufgaben nach Fälligkeitsdatum zu filtern.

- **Aufgabenerstellung:**
  - Ein Formular zur Erstellung neuer Aufgaben erstellen, das die folgenden Felder umfasst:

    - **Titel**: Ein Textfeld für den Titel der Aufgabe.
    - **Beschreibung**: Ein Textbereich für eine detaillierte Beschreibung.
    - **Fälligkeitsdatum**: Ein Datumsfeld, um das Fälligkeitsdatum auszuwählen.

- **Aufgabendetails:**
  - Möglichkeit, Aufgaben zu bearbeiten, Details anzusehen.

### 3. Einstellungen

In den Einstellungen können Benutzer ihre Kontoinformationen und Präferenzen anpassen.

**Inhalte für die Einstellungen:**

- **Benutzerdaten:**
  - Anzeige und Bearbeitung von Benutzerdaten wie Benutzername und E-Mail-Adresse.

- **Passwortänderung:**
  - Möglichkeit zur Änderung des Passworts.

## Weiterführende Implementierung

Hier sind einige zusätzliche Funktionen und Überlegungen, die du in Betracht ziehen könntest:

- **Benachrichtigungen:** 
  - E-Mail-Benachrichtigungen für anstehende Fälligkeitstermine oder Erinnerungen.
  
- **Tags oder Kategorien für Aufgaben:**
  - Ermögliche das Kategorisieren von Aufgaben, um die Organisation zu verbessern.

- **Dark Mode:** 
  - Implementiere einen Dark Mode für die App.

- **API-Schutz:** 
  - Stelle sicher, dass deine API-Routen gesichert sind, damit nur authentifizierte Benutzer Zugriff auf die Ressourcen haben.

- **Optimierung der Benutzeroberfläche:** 
  - Füge Animationen und Übergänge hinzu, um die Benutzererfahrung zu verbessern.
