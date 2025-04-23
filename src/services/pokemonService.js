import ApiService from './api';

const PokemonService = {
  /**
   * Obtiene una lista de pokémon con filtros opcionales
   * @param {Object} filters - Filtros para la búsqueda
   * @param {string} filters.type - Filtrar por tipo de pokémon
   * @param {string} filters.status - Filtrar por estado (available/captured)
   * @param {string} filters.search - Término de búsqueda para el nombre
   * @param {number} filters.page - Número de página
   * @param {number} filters.per_page - Elementos por página
   * @returns {Promise} - Promesa con la respuesta
   */
  getPokemons: (filters = {}) => {
    return ApiService.get('/pokemons', filters);
  },

  /**
   * Obtiene los detalles de un pokémon específico
   * @param {number} id - ID del pokémon
   * @returns {Promise} - Promesa con la respuesta
   */
  getPokemon: (id) => {
    return ApiService.get(`/pokemons/${id}`);
  },

  /**
   * Crea un nuevo pokémon
   * @param {Object} pokemonData - Datos del pokémon
   * @param {string} pokemonData.name - Nombre del pokémon
   * @param {string} pokemonData.type - Tipo del pokémon
   * @param {number} pokemonData.level - Nivel del pokémon
   * @param {Object} pokemonData.stats - Estadísticas del pokémon
   * @param {number} [pokemonData.trainer_id] - ID del entrenador (opcional)
   * @returns {Promise} - Promesa con la respuesta
   */
  createPokemon: (pokemonData) => {
    return ApiService.post('/pokemons', pokemonData);
  },

  /**
   * Actualiza un pokémon existente
   * @param {number} id - ID del pokémon
   * @param {Object} pokemonData - Datos a actualizar
   * @param {number} pokemonData.level - Nivel del pokémon
   * @param {number} [pokemonData.trainer_id] - ID del entrenador (opcional)
   * @returns {Promise} - Promesa con la respuesta
   */
  updatePokemon: (id, pokemonData) => {
    return ApiService.put(`/pokemons/${id}`, pokemonData);
  },

  /**
   * Obtiene una lista de pokémon disponibles (no asignados)
   * @param {Object} params - Parámetros de paginación
   * @param {number} params.page - Número de página
   * @param {number} params.per_page - Elementos por página
   * @returns {Promise} - Promesa con la respuesta
   */
  getAvailablePokemons: (params = {}) => {
    return ApiService.get('/pokemon-list-available', params);
  },

  /**
   * Asigna un pokémon a un entrenador
   * @param {number} pokemonId - ID del pokémon
   * @param {number} trainerId - ID del entrenador
   * @returns {Promise} - Promesa con la respuesta
   */
  assignToTrainer: (pokemonId, trainerId) => {
    return ApiService.post(`/pokemons/${pokemonId}/trainers/${trainerId}`);
  },

  /**
   * Libera un pokémon de un entrenador
   * @param {number} pokemonId - ID del pokémon
   * @param {number} trainerId - ID del entrenador
   * @returns {Promise} - Promesa con la respuesta
   */
  releaseFromTrainer: (pokemonId, trainerId) => {
    return ApiService.delete(`/pokemons/${pokemonId}/trainers/${trainerId}`);
  },

  /**
   * Transfiere un pokémon a otro entrenador
   * @param {number} pokemonId - ID del pokémon
   * @param {number} newTrainerId - ID del nuevo entrenador
   * @returns {Promise} - Promesa con la respuesta
   */
  transferPokemon: (pokemonId, newTrainerId) => {
    return ApiService.post(`/pokemons/${pokemonId}/transfer/${newTrainerId}`);
  }
};

export default PokemonService;