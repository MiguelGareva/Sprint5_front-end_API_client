import SwaggerParser from '@apidevtools/swagger-parser';

/**
 * Clase para cargar y validar la documentación de la API
 */
class SwaggerApiConfig {
  constructor() {
    this.schema = null;
    this.loaded = false;
  }

  /**
   * Carga la documentación de la API desde un archivo YAML o JSON
   * @param {string} url - URL del archivo Swagger/OpenAPI
   * @returns {Promise<Object>} - El esquema de la API validado
   */
  async loadApiSpec(url) {
    try {
      // Validar y procesar el esquema
      this.schema = await SwaggerParser.validate(url);
      this.loaded = true;
      
      // Extraer info básica
      const { info, servers } = this.schema;
      const baseUrl = servers && servers.length > 0 ? servers[0].url : '';
      
      console.log(`API cargada: ${info.title} (v${info.version})`);
      console.log(`Servidor base: ${baseUrl}`);
      
      return this.schema;
    } catch (err) {
      console.error('Error al cargar la especificación de la API:', err);
      throw err;
    }
  }

  /**
   * Obtiene la URL base configurada en la documentación
   * @returns {string} - URL base de la API
   */
  getBaseUrl() {
    if (!this.loaded || !this.schema?.servers?.length) {
      return '';
    }
    
    // Por defecto usamos el primer servidor configurado
    return this.schema.servers[0].url;
  }

  /**
   * Obtiene información sobre un endpoint específico
   * @param {string} path - Ruta del endpoint (ej: '/pokemons')
   * @param {string} method - Método HTTP (get, post, etc.)
   * @returns {Object|null} - Información del endpoint o null si no existe
   */
  getEndpointInfo(path, method) {
    if (!this.loaded) return null;
    
    const lowercaseMethod = method.toLowerCase();
    const pathInfo = this.schema.paths[path];
    
    if (!pathInfo || !pathInfo[lowercaseMethod]) {
      return null;
    }
    
    return pathInfo[lowercaseMethod];
  }

  /**
   * Obtiene el esquema de una entidad específica
   * @param {string} schemaName - Nombre del esquema (ej: 'Pokemon')
   * @returns {Object|null} - Esquema de la entidad o null si no existe
   */
  getSchema(schemaName) {
    if (!this.loaded) return null;
    
    return this.schema.components?.schemas?.[schemaName] || null;
  }
}

// Instancia singleton
const apiConfig = new SwaggerApiConfig();

export default apiConfig;