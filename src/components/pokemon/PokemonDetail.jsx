import Badge from '../ui/Badge';
import Card from '../ui/Card';
import Button from '../ui/Button';
import PokemonStats from './PokemonStats';

function PokemonDetail({ pokemon, loading = false, error = null, onBack }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Cargando información del Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-app-error p-4 rounded-md">
        <p>Error: {error}</p>
        <Button variant="outline" className="mt-4" onClick={onBack}>
          Volver
        </Button>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="bg-blue-50 text-blue-700 p-4 rounded-md">
        <p>No se encontró información para este Pokémon.</p>
        <Button variant="outline" className="mt-4" onClick={onBack}>
          Volver
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Navegación */}
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack}>
          &larr; Volver a la lista
        </Button>
      </div>

      {/* Información principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Imagen y datos básicos */}
        <Card className="md:col-span-1">
          <Card.Body>
            <div className="bg-gray-100 rounded-lg p-6 flex justify-center mb-4">
              <img 
                src={pokemon.image || '/placeholder-pokemon.png'} 
                alt={pokemon.name} 
                className="w-64 h-64 object-contain"
              />
            </div>
            
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold capitalize mb-1">{pokemon.name}</h1>
              <p className="text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</p>
            </div>

            <div className="flex justify-center gap-2 mb-4">
              {pokemon.types?.map(type => (
                <Badge key={type} type={type.toLowerCase()} size="lg">
                  {type}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <h3 className="text-sm text-gray-500">Altura</h3>
                <p className="font-medium">{pokemon.height ? `${pokemon.height / 10} m` : 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Peso</h3>
                <p className="font-medium">{pokemon.weight ? `${pokemon.weight / 10} kg` : 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Habilidad</h3>
                <p className="font-medium capitalize">{pokemon.abilities?.[0] || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Habilidad Oculta</h3>
                <p className="font-medium capitalize">{pokemon.abilities?.[1] || 'Ninguna'}</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Estadísticas */}
        <Card className="md:col-span-1">
          <Card.Header>
            <h2 className="text-xl font-bold">Estadísticas</h2>
          </Card.Header>
          <Card.Body>
            {pokemon.stats ? (
              <PokemonStats stats={pokemon.stats} types={pokemon.types || []} />
            ) : (
              <p className="text-gray-500">No hay estadísticas disponibles</p>
            )}
          </Card.Body>
        </Card>
      </div>

      {/* Movimientos */}
      {pokemon.moves && pokemon.moves.length > 0 && (
        <Card className="mb-8">
          <Card.Header>
            <h2 className="text-xl font-bold">Movimientos</h2>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {pokemon.moves.slice(0, 20).map((move, index) => (
                <div key={index} className="bg-gray-100 rounded p-2 text-center">
                  <span className="text-sm capitalize">{move}</span>
                </div>
              ))}
            </div>
            {pokemon.moves.length > 20 && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Y {pokemon.moves.length - 20} movimientos más...
              </p>
            )}
          </Card.Body>
        </Card>
      )}

      {/* Evoluciones (si están disponibles) */}
      {pokemon.evolutions && pokemon.evolutions.length > 0 && (
        <Card className="mb-8">
          <Card.Header>
            <h2 className="text-xl font-bold">Cadena Evolutiva</h2>
          </Card.Header>
          <Card.Body>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {pokemon.evolutions.map((evolution, index) => (
                <div key={index} className="flex items-center">
                  <div className="text-center">
                    <img 
                      src={evolution.image || '/placeholder-pokemon.png'}
                      alt={evolution.name}
                      className="w-24 h-24 object-contain mx-auto"
                    />
                    <p className="text-sm font-medium capitalize mt-2">{evolution.name}</p>
                  </div>
                  
                  {index < pokemon.evolutions.length - 1 && (
                    <div className="mx-4 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default PokemonDetail;