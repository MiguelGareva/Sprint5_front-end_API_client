import { useState, useCallback } from 'react';

/**
 * Hook personalizado para manejar llamadas a la API con estados de carga y error
 * @param {Function} apiFunction - Función del servicio de API que devuelve una promesa
 * @returns {Object} - { data, loading, error, execute }
 */
const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Ejecuta la función de API con los parámetros proporcionados
   * @param {...any} params - Parámetros a pasar a la función de API
   * @returns {Promise} - Promesa con el resultado o error
   */
  const execute = useCallback(async (...params) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiFunction(...params);
      
      // La mayoría de las respuestas de API tienen un formato { data: ... }
      const result = response.data;
      setData(result);
      
      return result;
    } catch (err) {
      // Extraer el mensaje de error de la respuesta
      const errorMessage = 
        err.response?.data?.message || 
        err.response?.data?.error || 
        err.message || 
        'Error desconocido';
      
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return { data, loading, error, execute };
};

export default useApi;