import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';

function TrainerCard({ trainer }) {
  // Función para determinar el color de fondo basado en el ranking
  const getRankColor = (rank) => {
    if (rank <= 10) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (rank <= 50) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (!trainer) return null;

  return (
    <Link to={`/trainers/${trainer.id}`} className="block h-full">
      <div className="h-full flex flex-col border rounded-lg overflow-hidden transition-transform hover:shadow-lg">
        {/* Header con imagen y ranking */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-app-primary to-app-secondary"></div>
          
          {/* Avatar */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-24 h-24 rounded-full bg-white p-1">
              <img 
                src={trainer.avatar || '/placeholder-trainer.png'} 
                alt={trainer.name} 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          
          {/* Ranking */}
          {trainer.ranking && (
            <div className="absolute top-3 right-3">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getRankColor(trainer.ranking)}`}>
                Rank #{trainer.ranking}
              </span>
            </div>
          )}
        </div>
        
        {/* Información del entrenador */}
        <div className="flex-grow pt-16 pb-4 px-4 text-center">
          <h3 className="text-lg font-bold mb-1">{trainer.name}</h3>
          {trainer.region && (
            <p className="text-sm text-gray-600 mb-3">Región de {trainer.region}</p>
          )}
          
          {/* Medallas o logros */}
          {trainer.badges && trainer.badges.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">Medallas</p>
              <div className="flex flex-wrap justify-center gap-1">
                {trainer.badges.slice(0, 8).map((badge, index) => (
                  <div 
                    key={index} 
                    className="w-6 h-6 rounded-full bg-gray-200"
                    title={badge}
                  />
                ))}
                {trainer.badges.length > 8 && (
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                    +{trainer.badges.length - 8}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Estadísticas básicas */}
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div>
              <p className="font-medium">{trainer.wins || 0}</p>
              <p className="text-xs text-gray-500">Victorias</p>
            </div>
            <div>
              <p className="font-medium">{trainer.losses || 0}</p>
              <p className="text-xs text-gray-500">Derrotas</p>
            </div>
            <div>
              <p className="font-medium">{trainer.pokemon?.length || 0}</p>
              <p className="text-xs text-gray-500">Pokémon</p>
            </div>
          </div>
        </div>
        
        {/* Footer con especialidad */}
        {trainer.specialty && (
          <div className="border-t px-4 py-2 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Especialidad:</span>
              <Badge type={trainer.specialty.toLowerCase()} size="sm">
                {trainer.specialty}
              </Badge>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

export default TrainerCard;