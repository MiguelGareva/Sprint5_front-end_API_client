// src/pages/BattlesPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { BattleService } from '../services';
import { useApi } from '../hooks';

function BattlesPage() {
  const [searchParams, setSearchParams] = useState({ trainer: '', type: '', outcome: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Usar el hook personalizado para obtener los datos
  const { 
    data: battleData, 
    loading, 
    error, 
    execute: fetchBattles 
  } = useApi(BattleService.listBattles);

  // Cargar los datos al montar el componente
  useEffect(() => {
    fetchBattles({
      page: currentPage,
      limit: pageSize,
      ...searchParams
    });
  }, [currentPage, searchParams, fetchBattles]);

  // Manejar la búsqueda
  const handleSearch = () => {
    setCurrentPage(1); // Reiniciar a la primera página cuando se busca
    fetchBattles({
      page: 1,
      limit: pageSize,
      ...searchParams
    });
  };

  // Manejar reset de filtros
  const handleReset = () => {
    setSearchParams({ trainer: '', type: '', outcome: '' });
    setCurrentPage(1);
    fetchBattles({
      page: 1,
      limit: pageSize
    });
  };

  // Manejar la paginación
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0); // Desplazarse hacia arriba al cambiar de página
  };

  // Opciones para filtro
  const typeOptions = [
    { value: '', label: 'Todos los tipos' },
    { value: 'league', label: 'Liga oficial' },
    { value: 'friendly', label: 'Amistoso' },
    { value: 'tournament', label: 'Torneo' }
  ];

  const outcomeOptions = [
    { value: '', label: 'Todos los resultados' },
    { value: 'win', label: 'Victoria' },
    { value: 'loss', label: 'Derrota' },
    { value: 'draw', label: 'Empate' }
  ];

  // Extraer la información de paginación del resultado
  const totalItems = battleData?.total || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  // Adaptar la estructura de los datos de la API a nuestro componente
  const battles = battleData?.items || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold mb-2 md:mb-0">Batallas</h1>
        <p className="text-gray-500">
          Mostrando {battles.length} de {totalItems} Batallas
        </p>
      </div>

      {/* Filtros */}
      <Card className="mb-6">
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              id="trainer"
              label="Buscar por entrenador"
              value={searchParams.trainer}
              onChange={(e) => setSearchParams(prev => ({ ...prev, trainer: e.target.value }))}
              placeholder="Nombre del entrenador"
              fullWidth
            />
            
            <Select
              id="type"
              label="Tipo de batalla"
              value={searchParams.type}
              onChange={(e) => setSearchParams(prev => ({ ...prev, type: e.target.value }))}
              options={typeOptions}
              fullWidth
            />
            
            <Select
              id="outcome"
              label="Resultado"
              value={searchParams.outcome}
              onChange={(e) => setSearchParams(prev => ({ ...prev, outcome: e.target.value }))}
              options={outcomeOptions}
              fullWidth
            />
            
            <div className="flex items-end gap-2">
              <Button onClick={handleSearch} className="flex-grow">
                Buscar
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Limpiar
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Lista de Batallas */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Cargando batallas...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-app-error p-4 rounded-md">
          <p>Error: {error.message}</p>
        </div>
      ) : battles.length === 0 ? (
        <div className="bg-blue-50 text-blue-700 p-4 rounded-md">
          <p>No se encontraron batallas con los filtros aplicados.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {battles.map((battle) => (
            <Card key={battle.id} className="overflow-hidden">
              <div className="border-l-4 border-app-primary">
                <div className="px-6 py-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <div className="flex items-center gap-3 mb-2 md:mb-0">
                      <Badge 
                        type={
                          battle.type === 'league' ? 'water' : 
                          battle.type === 'tournament' ? 'fire' : 
                          'normal'
                        }
                      >
                        {battle.type === 'league' ? 'Liga oficial' : 
                         battle.type === 'tournament' ? 'Torneo' : 
                         'Amistoso'}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(battle.date).toLocaleDateString('es-ES', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <Link to={`/battles/${battle.id}`}>
                      <Button variant="outline" size="sm">
                        Ver detalles
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Entrenador 1 */}
                    <div className="flex flex-col items-center text-center">
                      <Link to={`/trainers/${battle.trainer1.id}`} className="hover:underline">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-gray-200 mb-2">
                            {battle.trainer1.avatar && (
                              <img 
                                src={battle.trainer1.avatar} 
                                alt={battle.trainer1.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            )}
                          </div>
                          <h3 className="font-medium">{battle.trainer1.name}</h3>
                        </div>
                      </Link>
                      <div className="mt-2">
                        {battle.trainer1.pokemon.slice(0, 3).map((pokemon, idx) => (
                          <span 
                            key={idx} 
                            className="inline-block w-8 h-8 rounded-full bg-gray-100 mx-1"
                            title={pokemon.name}
                          >
                            {pokemon.image && (
                              <img 
                                src={pokemon.image} 
                                alt={pokemon.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            )}
                          </span>
                        ))}
                        {battle.trainer1.pokemon.length > 3 && (
                          <span className="inline-block w-8 h-8 rounded-full bg-gray-100 mx-1 text-xs flex items-center justify-center">
                            +{battle.trainer1.pokemon.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Resultado */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold">
                        {battle.score?.trainer1 || 0} : {battle.score?.trainer2 || 0}
                      </div>
                      <Badge 
                        type={
                          battle.winner === battle.trainer1.id ? 'success' :
                          battle.winner === battle.trainer2.id ? 'danger' :
                          'light'
                        }
                        className="mt-2"
                      >
                        {battle.winner === battle.trainer1.id ? 'Victoria Izquierda' :
                         battle.winner === battle.trainer2.id ? 'Victoria Derecha' :
                         'Empate'}
                      </Badge>
                    </div>
                    
                    {/* Entrenador 2 */}
                    <div className="flex flex-col items-center text-center">
                      <Link to={`/trainers/${battle.trainer2.id}`} className="hover:underline">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-gray-200 mb-2">
                            {battle.trainer2.avatar && (
                              <img 
                                src={battle.trainer2.avatar} 
                                alt={battle.trainer2.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            )}
                          </div>
                          <h3 className="font-medium">{battle.trainer2.name}</h3>
                        </div>
                      </Link>
                      <div className="mt-2">
                        {battle.trainer2.pokemon.slice(0, 3).map((pokemon, idx) => (
                          <span 
                            key={idx} 
                            className="inline-block w-8 h-8 rounded-full bg-gray-100 mx-1"
                            title={pokemon.name}
                          >
                            {pokemon.image && (
                              <img 
                                src={pokemon.image} 
                                alt={pokemon.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            )}
                          </span>
                        ))}
                        {battle.trainer2.pokemon.length > 3 && (
                          <span className="inline-block w-8 h-8 rounded-full bg-gray-100 mx-1 text-xs flex items-center justify-center">
                            +{battle.trainer2.pokemon.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Paginación */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!hasPrevPage}
            >
              Anterior
            </Button>
            
            <div className="flex items-center space-x-1">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                
                // Mostrar solo un rango de páginas alrededor de la actual
                if (
                  pageNumber === 1 || 
                  pageNumber === totalPages || 
                  (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                ) {
                  return (
                    <Button
                      key={pageNumber}
                      variant={pageNumber === currentPage ? 'primary' : 'outline'}
                      onClick={() => handlePageChange(pageNumber)}
                      className="w-10 h-10 p-0"
                    >
                      {pageNumber}
                    </Button>
                  );
                } else if (
                  pageNumber === currentPage - 3 || 
                  pageNumber === currentPage + 3
                ) {
                  // Mostrar puntos suspensivos para páginas omitidas
                  return <span key={pageNumber} className="px-1">...</span>;
                }
                
                return null;
              })}
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasNextPage}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BattlesPage;