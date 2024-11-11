// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL:
    'http://localhost:5050/todo-api/', // Basis-URL für alle Anfragen
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api;
