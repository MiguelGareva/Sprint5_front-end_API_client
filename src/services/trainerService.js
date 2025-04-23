import ApiService from './api';

const TrainerService = {
  /**
   * Obtiene una lista de entrenadores
   * @param {Object} params - Parámetros de paginación
   * @param {number} params.page - Número de página
   * @param {number} params.per_page - Elementos por página
   * @returns {Promise} - Promesa con la respuesta
   */
  getTrainers: (params = {}) => {
    return ApiService.get('/trainers', params);
  },

  /**
   * Obtiene los detalles de un entrenador específico
   * @param {number} id - ID del entrenador
   * @returns {Promise} - Promesa con la respuesta
   */
  getTrainer: (id) => {
    return ApiService.get(`/trainers/${id}`);
  },

  /**
   * Crea un nuevo entrenador
   * @param {Object} trainerData - Datos del entrenador
   * @param {string} trainerData.name - Nombre del entrenador
   * @param {string} trainerData.email - Email del entrenador
   * @returns {Promise} - Promesa con la respuesta
   */
  createTrainer: (trainerData) => {
    return ApiService.post('/trainers', trainerData);
  },

  /**
   * Actualiza un entrenador existente
   * @param {number} id - ID del entrenador
   * @param {Object} trainerData - Datos a actualizar
   * @param {string} trainerData.name - Nombre del entrenador
   * @param {string} trainerData.email - Email del entrenador
   * @returns {Promise} - Promesa con la respuesta
   */
  updateTrainer: (id, trainerData) => {
    return ApiService.put(`/trainers/${id}`, trainerData);
  },

  /**
   * Elimina un entrenador
   * @param {number} id - ID del entrenador
   * @returns {Promise} - Promesa con la respuesta
   */
  deleteTrainer: (id) => {
    return ApiService.delete(`/trainers/${id}`);
  },

  /**
   * Actualiza los puntos de un entrenador (solo admin)
   * @param {number} trainerId - ID del entrenador
   * @param {number} pointsChange - Cantidad de puntos a agregar/quitar
   * @returns {Promise} - Promesa con la respuesta
   */
  updatePoints: (trainerId, pointsChange) => {
    return ApiService.post(`/trainers/${trainerId}/points`, { points_change: pointsChange });
  },

  /**
   * Obtiene el ranking de entrenadores (público)
   * @returns {Promise} - Promesa con la respuesta
   */
  getRanking: () => {
    return ApiService.get('/trainers/ranking');
  },

  /**
   * Obtiene los mejores N entrenadores
   * @param {number} count - Número de entrenadores a obtener
   * @returns {Promise} - Promesa con la respuesta
   */
  getTopTrainers: (count = 10) => {
    return ApiService.get(`/trainers/top/${count}`);
  },

  /**
   * Obtiene entrenadores con puntos similares
   * @param {number} trainerId - ID del entrenador de referencia
   * @param {number} range - Rango de puntos a considerar
   * @returns {Promise} - Promesa con la respuesta
   */
  getSimilarTrainers: (trainerId, range = 30) => {
    return ApiService.get(`/trainers/${trainerId}/similar/${range}`);
  },

  /**
   * Obtiene estadísticas mensuales de rankings
   * @returns {Promise} - Promesa con la respuesta
   */
  getMonthlyStats: () => {
    return ApiService.get('/trainers/stats/monthly');
  }
};

export default TrainerService;