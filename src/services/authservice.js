import ApiService from './api';

const AuthService = {
  /**
   * Registra un nuevo usuario/entrenador
   * @param {Object} userData - Datos del usuario a registrar
   * @param {string} userData.name - Nombre completo
   * @param {string} userData.email - Correo electrónico
   * @param {string} userData.password - Contraseña
   * @param {string} userData.password_confirmation - Confirmación de contraseña
   * @returns {Promise} - Promesa con la respuesta
   */
  register: (userData) => {
    return ApiService.post('/register', userData);
  },

  /**
   * Inicia sesión de usuario
   * @param {Object} credentials - Credenciales de acceso
   * @param {string} credentials.email - Correo electrónico
   * @param {string} credentials.password - Contraseña
   * @returns {Promise} - Promesa con la respuesta
   */
  login: (credentials) => {
    return ApiService.post('/login', credentials).then(response => {
      // Guardar el token en el localStorage
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response;
    });
  },

  /**
   * Cierra la sesión actual
   * @returns {Promise} - Promesa con la respuesta
   */
  logout: () => {
    return ApiService.post('/logout').then(response => {
      // Eliminar el token del localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return response;
    });
  },

  /**
   * Obtiene información del usuario autenticado
   * @returns {Promise} - Promesa con la respuesta
   */
  getCurrentUser: () => {
    return ApiService.get('/user');
  },

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean} - True si está autenticado, false en caso contrario
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Obtiene el usuario actual desde el localStorage
   * @returns {Object|null} - Objeto de usuario o null si no está autenticado
   */
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default AuthService;