import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

function BattleDetail({ battle, loading = false, error = null, onBack }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Cargando información de la batalla...</p>
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

  if (!battle) {
    return (
      <div className="bg-blue-50 text-blue-700 p-4 rounded-md">
        <p>No se encontró información para esta batalla.</p>
        <Button variant="outline" className="mt-4" onClick={onBack}>
          Volver
        </Button>
      </div>
    );
  }

  // Determinar el tipo de batalla para colores y etiquetas
  const getBattleTypeInfo = (type) => {
    switch (type) {
      case 'league':
        return {
          label: 'Liga oficial',
          badge: 'water',
          color: 'border-pokemon-water'
        };
      case 'tournament':
        return {
          label: 'Torneo',
          badge: 'fire',
          color: 'border-pokemon-fire'
        };
      default:
        return {
          label: 'Amistoso',
          badge: 'normal',
          color: 'border-pokemon-normal'
        };
    }
  };

  const typeInfo = getBattleTypeInfo(battle.type);

  return (
    <div>
      {/* Navegación */}
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack}>
          &larr; Volver a la lista
        </Button>
      </div>

      {/* Información de la batalla */}
      <Card className={`overflow-hidden border-t-4 ${typeInfo.color} mb-8`}>
        <Card.Header>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                {battle.trainer1.name} vs {battle.trainer2.name}
              </h1>
              <div className="flex items-center gap-3">
                <Badge type={typeInfo.badge}>
                  {typeInfo.label}
                </Badge>
                <span className="text-gray-500">
                  {new Date(battle.date).toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Badge 
                type={
                  battle.winner === battle.trainer1.id ? 'success' :
                  battle.winner === battle.trainer2.id ? 'success' :
                  'light'
                }
                size="lg"
              >
                {battle.winner === battle.trainer1.id ? `Ganador: ${battle.trainer1.name}` :
                 battle.winner === battle.trainer2.id ? `Ganador: ${battle.trainer2.name}` :
                 'Empate'}
              </Badge>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 mb-6">
            {/* Entrenador 1 */}
            <div className="md:col-span-5">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 mr-4">
                    {battle.trainer1.avatar && (
                      <img 
                        src={battle.trainer1.avatar} 
                        alt={battle.trainer1.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <Link to={`/trainers/${battle.trainer1.id}`} className="hover:underline">
                      <h3 className="text-lg font-bold">{battle.trainer1.name}</h3>
                    </Link>
                    {battle.trainer1.region && (
                      <p className="text-gray-500">Región de {battle.trainer1.region}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Pokémon utilizados</span>
                  <span className="text-sm text-gray-500">{battle.trainer1.pokemon.length} Pokémon</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {battle.trainer1.pokemon.map((pokemon, index) => (
                    <Link key={index} to={`/pokemon/${pokemon.id}`}>
                      <div className="bg-white rounded p-2 flex items-center hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-full bg-gray-100 mr-2">
                          {pokemon.image && (
                            <img 
                              src={pokemon.image} 
                              alt={pokemon.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          )}
                        </div>
                        <span className="text-sm font-medium capitalize">{pokemon.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Puntuación central */}
            <div className="md:col-span-1 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold">
                {battle.score?.trainer1 || 0}
              </div>
              <div className="text-lg my-2">VS</div>
              <div className="text-3xl font-bold">
                {battle.score?.trainer2 || 0}
              </div>
            </div>
            
            {/* Entrenador 2 */}
            <div className="md:col-span-5">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 mr-4">
                    {battle.trainer2.avatar && (
                      <img 
                        src={battle.trainer2.avatar} 
                        alt={battle.trainer2.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <Link to={`/trainers/${battle.trainer2.id}`} className="hover:underline">
                      <h3 className="text-lg font-bold">{battle.trainer2.name}</h3>
                    </Link>
                    {battle.trainer2.region && (
                      <p className="text-gray-500">Región de {battle.trainer2.region}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Pokémon utilizados</span>
                  <span className="text-sm text-gray-500">{battle.trainer2.pokemon.length} Pokémon</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {battle.trainer2.pokemon.map((pokemon, index) => (
                    <Link key={index} to={`/pokemon/${pokemon.id}`}>
                      <div className="bg-white rounded p-2 flex items-center hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-full bg-gray-100 mr-2">
                          {pokemon.image && (
                            <img 
                              src={pokemon.image} 
                              alt={pokemon.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          )}
                        </div>
                        <span className="text-sm font-medium capitalize">{pokemon.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Detalles de la batalla y movimientos */}
      {battle.rounds && battle.rounds.length > 0 && (
        <Card>
          <Card.Header>
            <h2 className="text-xl font-bold">Desarrollo de la Batalla</h2>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              {battle.rounds.map((round, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-4 py-2">
                  <div className="flex items-center mb-2">
                    <Badge type="primary" className="mr-2">Ronda {index + 1}</Badge>
                    <span className="text-sm text-gray-500">
                      {round.winner 
                        ? `Ganador: ${round.winner === battle.trainer1.id ? battle.trainer1.name : battle.trainer2.name}`
                        : 'Sin resultado'
                      }
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Pokémon del entrenador 1 */}
                    <div className="bg-gray-50 rounded-lg p-3 flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 mr-3">
                        {round.pokemon1?.image && (
                          <img 
                            src={round.pokemon1.image} 
                            alt={round.pokemon1.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{round.pokemon1?.name || 'Desconocido'}</p>
                        <div className="flex gap-1 mt-1">
                          {round.pokemon1?.types?.map((type) => (
                            <Badge key={type} type={type.toLowerCase()} size="sm">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Pokémon del entrenador 2 */}
                    <div className="bg-gray-50 rounded-lg p-3 flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 mr-3">
                        {round.pokemon2?.image && (
                          <img 
                            src={round.pokemon2.image} 
                            alt={round.pokemon2.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{round.pokemon2?.name || 'Desconocido'}</p>
                        <div className="flex gap-1 mt-1">
                          {round.pokemon2?.types?.map((type) => (
                            <Badge key={type} type={type.toLowerCase()} size="sm">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Movimientos de la ronda */}
                  {round.moves && round.moves.length > 0 && (
                    <div className="mt-3 bg-white rounded-lg border p-3">
                      <h4 className="text-sm font-medium mb-2">Movimientos</h4>
                      <div className="space-y-2">
                        {round.moves.map((move, moveIndex) => (
                          <div key={moveIndex} className="text-sm">
                            <span className="font-medium">{move.pokemon}</span> usó{' '}
                            <span className="italic">{move.move}</span>
                            {move.effect && (
                              <span className="text-gray-500"> - {move.effect}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Comentarios o notas adicionales */}
      {battle.comments && (
        <Card className="mt-6">
          <Card.Header>
            <h2 className="text-xl font-bold">Comentarios</h2>
          </Card.Header>
          <Card.Body>
            <p className="text-gray-700">{battle.comments}</p>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default BattleDetail;