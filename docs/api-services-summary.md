# Resumen de Servicios de API y Ejemplos de Uso

## Estructura de Archivos

En la implementación de los servicios para interactuar con la API Pokémon, hemos creado la siguiente estructura:

```
src/
  ├── services/
  │   ├── api.js            # Servicio base para peticiones HTTP
  │   ├── authService.js    # Servicio para autenticación
  │   ├── pokemonService.js # Servicio para Pokémon
  │   ├── trainerService.js # Servicio para entrenadores
  │   ├── battleService.js  # Servicio para batallas
  │   └── index.js          # Archivo barrel para exportaciones
  │
  └── hooks/
      └── useApi.js         # Hook personalizado para llamadas a la API
```

## Configuración Base

El servicio base (`api.js`) configura Axios con:

- URL base de la API
- Headers comunes
- Interceptores para:
  - Agregar el token de autenticación
  - Manejar errores (especialmente 401 Unauthorized)

## Servicios Implementados

Hemos implementado los siguientes servicios:

1. **AuthService**: Manejo de autenticación (registro, login, logout)
2. **PokemonService**: Operaciones con Pokémon (listar, crear, actualizar, asignar, etc.)
3. **TrainerService**: Operaciones con entrenadores (listar, crear, rankings, etc.)
4. **BattleService**: Operaciones con batallas (listar, crear, simular, etc.)

## Hooks Personalizados

El hook `useApi` facilita el uso de los servicios, proporcionando:

- Estado de carga (`loading`)
- Manejo de errores (`error`)
- Almacenamiento de datos (`data`)
- Función para ejecutar la petición (`execute`)

## Ejemplos de Uso

### Ejemplo 1: Autenticación

```jsx
import React, { useState } from 'react';
import { AuthService } from '../services';
import useApi from '../hooks/useApi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, execute: login } = useApi(AuthService.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      // Redireccionar al dashboard o página principal
      window.location.href = '/dashboard';
    } catch (err) {
      // El error ya está manejado por el hook useApi
      console.error('Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>
    </form>
  );
};

export default LoginPage;
```

### Ejemplo 2: Listado de Pokémon

```jsx
import React, { useEffect, useState } from 'react';
import { PokemonService } from '../services';
import useApi from '../hooks/useApi';

const PokemonList = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  
  const { data, loading, error, execute: fetchPokemons } = useApi(PokemonService.getPokemons);

  useEffect(() => {
    loadPokemons();
  }, [page, typeFilter]); // Recargar cuando cambien estos valores

  const loadPokemons = () => {
    const filters = {
      page,
      per_page: 12,
      type: typeFilter || undefined,
      search: searchTerm || undefined
    };
    
    fetchPokemons(filters);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reiniciar a primera página
    loadPokemons();
  };

  if (loading && !data) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  const pokemons = data?.data || [];
  const pagination = data?.meta;

  return (
    <div>
      <h1>Listado de Pokémon</h1>
      
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre..."
        />
        
        <select 
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">Todos los tipos</option>
          <option value="Fire">Fuego</option>
          <option value="Water">Agua</option>
          <option value="Grass">Planta</option>
          {/* Agregar más tipos */}
        </select>
        
        <button type="submit">Buscar</button>
      </form>
      
      <div className="pokemon-grid">
        {pokemons.map(pokemon => (
          <div key={pokemon.id} className="pokemon-card">
            <h3>{pokemon.name}</h3>
            <p>Tipo: {pokemon.type}</p>
            <p>Nivel: {pokemon.level}</p>
            <button onClick={() => /* Navegar a detalles */}>
              Ver detalles
            </button>
          </div>
        ))}
      </div>
      
      {pagination && (
        <div className="pagination">
          <button 
            disabled={page === 1} 
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </button>
          <span>Página {page} de {pagination.last_page}</span>
          <button 
            disabled={page === pagination.last_page} 
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
```

### Ejemplo 3: Detalles de un Entrenador

```jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TrainerService } from '../services';
import useApi from '../hooks/useApi';

const TrainerDetail = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const { data, loading, error, execute: fetchTrainer } = useApi(TrainerService.getTrainer);
  
  useEffect(() => {
    fetchTrainer(id);
  }, [id, fetchTrainer]);
  
  if (loading && !data) return <div>Cargando información del entrenador...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No se encontró el entrenador</div>;
  
  const trainer = data.data;
  const pokemons = trainer.pokemons || [];
  
  return (
    <div>
      <h1>{trainer.name}</h1>
      <p>Email: {trainer.email}</p>
      <p>Puntos: {trainer.points}</p>
      <p>Rango: {data.rank}</p>
      
      <h2>Pokémon ({pokemons.length})</h2>
      {pokemons.length === 0 ? (
        <p>Este entrenador no tiene Pokémon asignados.</p>
      ) : (
        <div className="pokemon-list">
          {pokemons.map(pokemon => (
            <div key={pokemon.id} className="pokemon-item">
              <h3>{pokemon.name}</h3>
              <p>Tipo: {pokemon.type}</p>
              <p>Nivel: {pokemon.level}</p>
              <div>
                <strong>Estadísticas:</strong>
                <ul>
                  <li>HP: {pokemon.stats.hp}</li>
                  <li>Ataque: {pokemon.stats.attack}</li>
                  <li>Defensa: {pokemon.stats.defense}</li>
                  <li>Velocidad: {pokemon.stats.speed}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainerDetail;
```

### Ejemplo 4: Simular una Batalla

```jsx
import React, { useState, useEffect } from 'react';
import { TrainerService, BattleService } from '../services';
import useApi from '../hooks/useApi';

const BattleSimulator = () => {
  const [trainer1Id, setTrainer1Id] = useState('');
  const [trainer2Id, setTrainer2Id] = useState('');
  
  // Cargar lista de entrenadores
  const { data: trainersData, loading: loadingTrainers, execute: fetchTrainers } = useApi(TrainerService.getTrainers);
  
  // Simular batalla
  const { 
    data: battleResult, 
    loading: simulating, 
    error: simulationError, 
    execute: simulateBattle 
  } = useApi(BattleService.simulateBattle);
  
  useEffect(() => {
    fetchTrainers({ per_page: 50 }); // Cargar hasta 50 entrenadores
  }, [fetchTrainers]);
  
  const handleSimulate = async (e) => {
    e.preventDefault();
    if (!trainer1Id || !trainer2Id) {
      alert('Selecciona dos entrenadores para la batalla');
      return;
    }
    
    if (trainer1Id === trainer2Id) {
      alert('No puedes simular una batalla contra el mismo entrenador');
      return;
    }
    
    try {
      await simulateBattle({ trainer1_id: trainer1Id, trainer2_id: trainer2Id });
    } catch (err) {
      // Error ya manejado por el hook
    }
  };
  
  const trainers = trainersData?.data || [];
  
  return (
    <div>
      <h1>Simulador de Batallas</h1>
      
      {loadingTrainers ? (
        <p>Cargando entrenadores...</p>
      ) : (
        <form onSubmit={handleSimulate}>
          <div>
            <label>Entrenador 1:</label>
            <select 
              value={trainer1Id} 
              onChange={(e) => setTrainer1Id(e.target.value)}
              required
            >
              <option value="">Selecciona un entrenador</option>
              {trainers.map(trainer => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.name} (Puntos: {trainer.points})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label>Entrenador 2:</label>
            <select 
              value={trainer2Id} 
              onChange={(e) => setTrainer2Id(e.target.value)}
              required
            >
              <option value="">Selecciona un entrenador</option>
              {trainers.map(trainer => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.name} (Puntos: {trainer.points})
                </option>
              ))}
            </select>
          </div>
          
          <button type="submit" disabled={simulating}>
            {simulating ? 'Simulando...' : 'Simular Batalla'}
          </button>
        </form>
      )}
      
      {simulationError && (
        <div className="error">
          Error: {simulationError}
        </div>
      )}
      
      {battleResult && (
        <div className="battle-result">
          <h2>Resultado de la Simulación</h2>
          {battleResult.data.winner ? (
            <div>
              <p>
                <strong>Ganador:</strong> {battleResult.data.winner.name} 
                (Puntos ganados: {battleResult.data.points_awarded})
              </p>
              <p><strong>Perdedor:</strong> {battleResult.data.loser.name}</p>
            </div>
          ) : (
            <p>¡Empate! Ningún entrenador ganó puntos.</p>
          )}
          
          <h3>Detalles de la Batalla</h3>
          <p>{battleResult.data.details}</p>
          
          <button onClick={() => window.location.reload()}>
            Nueva Simulación
          </button>
        </div>
      )}
    </div>
  );
};

export default BattleSimulator;
```

## Consideraciones y Mejores Prácticas

1. **Manejo de Tokens**: El token de autenticación se almacena en localStorage y se incluye automáticamente en todas las peticiones.

2. **Paginación**: Se ha tenido en cuenta la paginación en todos los servicios que manejan listas.

3. **Filtrado**: Se pueden aplicar filtros en las peticiones que lo soportan.

4. **Manejo de Errores**: Implementado tanto a nivel global (interceptor) como en el hook personalizado.

5. **Estructura Modular**: Cada servicio está enfocado en una entidad específica, facilitando el mantenimiento.

6. **Facilidad de Uso**: El hook `useApi` simplifica el uso de los servicios en los componentes.

## Próximos Pasos

Una vez completada la implementación de los servicios, podemos continuar con:

1. Creación de componentes reutilizables para mostrar datos de Pokémon, entrenadores y batallas.
2. Implementación de las páginas principales de la aplicación.
3. Configuración de rutas con React Router.
4. Desarrollo de un sistema de gestión de estado global si es necesario (Context API/Redux).