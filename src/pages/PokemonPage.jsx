import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonList from '../components/pokemon/PokemonList';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { PokemonService } from '../services';
import { useApi } from '../hooks';

function PokemonPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({ name: '', type: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Usar el hook personalizado para obtener los datos
  const { 
    data: pokemonData, 
    loading, 
    error, 
    execute: fetchPokemon 
  } = useApi(PokemonService.listPokemon);

  // Cargar los datos al montar el componente
  useEffect(() => {
    fetchPokemon({
      page: currentPage,
      limit: pageSize,
      ...searchParams
    });
  }, [currentPage, searchParams, fetchPokemon]);

  // Manejar la búsqueda
  const handleSearch = (filters) => {
    setSearchParams(filters);
    setCurrentPage(1); // Reiniciar a la primera página cuando se busca
  };

  // Manejar la paginación
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0); // Desplazarse hacia arriba al cambiar de página
  };

  // Extraer la información de paginación del resultado
  const totalItems = pokemonData?.total || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  // Adaptar la estructura de los datos de la API a nuestro componente
  const pokemons = pokemonData?.items || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold mb-2 md:mb-0">Pokémon</h1>
        <p className="text-gray-500">
          Mostrando {pokemons.length} de {totalItems} Pokémon
        </p>
      </div>

      <PokemonList 
        pokemons={pokemons}
        loading={loading}
        error={error?.message}
        onSearch={handleSearch}
      />

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
                
                // Mostrar solo un rango de páginas alrededor de la actual para no sobrecargar la UI
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

export default PokemonPage;