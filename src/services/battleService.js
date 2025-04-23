import ApiService from './api';

const BattleService = {
  /**
   * Obtiene una lista de batallas
   * @param {Object} params - Parámetros de paginación
   * @param {number} params.page - Número de página
   * @param {number} params.per_page - Elementos por página
   * @returns {Promise} - Promesa con la respuesta
   */
  getBattles: (params = {}) => {
    return ApiService.get('/battles', params);
  },

  /**
   * Obtiene los detalles de una batalla específica
   * @param {number} id - ID de la batalla
   * @returns {Promise} - Promesa con la respuesta
   */
  getBattle: (id) => {
    return ApiService.get(`/battles/${id}`);
  },

  /**
   * Crea una nueva batalla
   * @param {Object} battleData - Datos de la batalla
   * @param {number} battleData.trainer1_id - ID del primer entrenador
   * @param {number} battleData.trainer2_id - ID del segundo entrenador
   * @param {string} battleData.date - Fecha de la batalla (formato ISO)
   * @returns {Promise} - Promesa con la respuesta
   */
  createBattle: (battleData) => {
    return ApiService.post('/battles', battleData);
  },

  /**
   * Elimina una batalla
   * @param {number} id - ID de la batalla
   * @returns {Promise} - Promesa con la respuesta
   */
  deleteBattle: (id) => {
    return ApiService.delete(`/battles/${id}`);
  },

  /**
   * Simula una batalla sin guardar resultados
   * @param {Object} battleData - Datos de la batalla
   * @param {number} battleData.trainer1_id - ID del primer entrenador
   * @param {number} battleData.trainer2_id - ID del segundo entrenador
   * @returns {Promise} - Promesa con la respuesta
   */
  simulateBattle: (battleData) => {
    return ApiService.post('/battles/simulate', battleData);
  }
};

export default BattleService;