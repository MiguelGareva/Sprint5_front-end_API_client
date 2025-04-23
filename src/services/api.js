import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para agregar el token de autenticación a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si el error es 401 (Unauthorized), redirigir al login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // Aquí podrías redireccionar al login o disparar un evento
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Funciones de utilidad para manejar peticiones
const ApiService = {
  /**
   * Realiza una petición GET
   * @param {string} url - URL relativa al baseURL
   * @param {Object} params - Parámetros de consulta (query params)
   * @returns {Promise} - Promesa con la respuesta
   */
  get: (url, params = {}) => {
    return api.get(url, { params });
  },

  /**
   * Realiza una petición POST
   * @param {string} url - URL relativa al baseURL
   * @param {Object} data - Datos a enviar en el cuerpo de la petición
   * @returns {Promise} - Promesa con la respuesta
   */
  post: (url, data = {}) => {
    return api.post(url, data);
  },

  /**
   * Realiza una petición PUT
   * @param {string} url - URL relativa al baseURL
   * @param {Object} data - Datos a enviar en el cuerpo de la petición
   * @returns {Promise} - Promesa con la respuesta
   */
  put: (url, data = {}) => {
    return api.put(url, data);
  },

  /**
   * Realiza una petición DELETE
   * @param {string} url - URL relativa al baseURL
   * @returns {Promise} - Promesa con la respuesta
   */
  delete: (url) => {
    return api.delete(url);
  }
};

export default ApiService;