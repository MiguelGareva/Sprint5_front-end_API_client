import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import Button from '../ui/Button';
import PokemonCard from '../pokemon/PokemonCard';

function TrainerDetail({ trainer, loading = false, error = null, onBack }) {
  // Función para determinar el color de fondo basado en el ranking
  const getRankColor = (rank) => {
    if (rank <= 10) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (rank <= 50) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Cargando información del entrenador...</p>
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

  if (!trainer) {
    return (
      <div className="bg-blue-50 text-blue-700 p-4 rounded-md">
        <p>No se encontró información para este entrenador.</p>
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

      {/* Cabecera del perfil */}
      <div className="relative rounded-xl overflow-hidden mb-8">
        <div className="h-40 bg-gradient-to-r from-app-primary to-app-secondary"></div>
        
        <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 px-6 flex items-end">
          <div className="mr-6">
            <div className="w-32 h-32 rounded-full bg-white p-1">
              <img 
                src={trainer.avatar || '/placeholder-trainer.png'} 
                alt={trainer.name} 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex-grow pb-4">
            <h1 className="text-3xl font-bold text-white shadow-sm">{trainer.name}</h1>
            
            <div className="flex items-center mt-1">
              {trainer.region && (
                <span className="text-white opacity-90 mr-4">
                  Región de {trainer.region}
                </span>
              )}
              
              {trainer.ranking && (
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getRankColor(trainer.ranking)}`}>
                  Rank #{trainer.ranking}
                </span>
              )}
              
              {trainer.specialty && (
                <Badge type={trainer.specialty.toLowerCase()} size="md" className="ml-3">
                  {trainer.specialty}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Espacio para compensar el avatar que sobresale */}
      <div className="h-16"></div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Estadísticas y medallas */}
        <div className="md:col-span-1">
          <Card className="mb-6">
            <Card.Header>
              <h2 className="text-xl font-bold">Estadísticas</h2>
            </Card.Header>
            <Card.Body>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-gray-500 text-sm mb-1">Combates</h3>
                  <p className="text-2xl font-bold">
                    {(trainer.wins || 0) + (trainer.losses || 0)}
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-gray-500 text-sm mb-1">Victorias</h3>
                  <p className="text-2xl font-bold text-app-success">{trainer.wins || 0}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-gray-500 text-sm mb-1">Derrotas</h3>
                  <p className="text-2xl font-bold text-app-error">{trainer.losses || 0}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-gray-500 text-sm mb-1">Ratio V/D</h3>
                  <p className="text-2xl font-bold">
                    {trainer.wins && trainer.losses 
                      ? (trainer.wins / (trainer.wins + trainer.losses) * 100).toFixed(1) + '%'
                      : 'N/A'
                    }
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Medallas */}
          {trainer.badges && trainer.badges.length > 0 && (
            <Card className="mb-6">
              <Card.Header>
                <h2 className="text-xl font-bold">Medallas</h2>
              </Card.Header>
              <Card.Body>
                <div className="grid grid-cols-4 gap-3">
                  {trainer.badges.map((badge, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 mb-2"></div>
                      <span className="text-xs text-center">{badge}</span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Biografía o información adicional */}
          {trainer.bio && (
            <Card>
              <Card.Header>
                <h2 className="text-xl font-bold">Biografía</h2>
              </Card.Header>
              <Card.Body>
                <p className="text-gray-700">{trainer.bio}</p>
              </Card.Body>
            </Card>
          )}
        </div>

        {/* Equipo Pokémon */}
        <div className="md:col-span-2">
          <Card>
            <Card.Header className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Equipo Pokémon</h2>
              <span className="text-sm text-gray-500">
                {trainer.pokemon?.length || 0} Pokémon
              </span>
            </Card.Header>
            <Card.Body>
              {!trainer.pokemon || trainer.pokemon.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Este entrenador no tiene Pokémon registrados.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trainer.pokemon.map((pokemon) => (
                    <Card key={pokemon.id} hoverable shadow="md" className="h-full">
                      <Card.Body>
                        <PokemonCard pokemon={pokemon} />
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Batallas recientes */}
      {trainer.battles && trainer.battles.length > 0 && (
        <Card className="mb-8">
          <Card.Header>
            <h2 className="text-xl font-bold">Batallas Recientes</h2>
          </Card.Header>
          <Card.Body>
            <div className="space-y-3">
              {trainer.battles.map((battle, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                    <div>
                      <p className="font-medium">{battle.opponent}</p>
                      <p className="text-xs text-gray-500">{battle.date}</p>
                    </div>
                  </div>
                  <Badge 
                    type={battle.result === 'victory' ? 'success' : battle.result === 'defeat' ? 'danger' : 'light'}
                  >
                    {battle.result === 'victory' ? 'Victoria' : battle.result === 'defeat' ? 'Derrota' : 'Empate'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default TrainerDetail;