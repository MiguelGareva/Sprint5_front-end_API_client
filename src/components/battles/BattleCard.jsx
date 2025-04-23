import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';

function BattleCard({ battle }) {
  if (!battle) return null;

  // Función para determinar el color basado en el tipo de batalla
  const getBattleTypeColor = (type) => {
    switch (type) {
      case 'league': return 'border-pokemon-water';
      case 'tournament': return 'border-pokemon-fire';
      default: return 'border-pokemon-normal';
    }
  };

  // Función para mostrar la etiqueta del tipo de batalla
  const getBattleTypeLabel = (type) => {
    switch (type) {
      case 'league': return { label: 'Liga oficial', type: 'water' };
      case 'tournament': return { label: 'Torneo', type: 'fire' };
      default: return { label: 'Amistoso', type: 'normal' };
    }
  };

  const typeColor = getBattleTypeColor(battle.type);
  const typeLabel = getBattleTypeLabel(battle.type);

  return (
    <Link to={`/battles/${battle.id}`} className="block">
      <div className={`border rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${typeColor} border-l-4`}>
        <div className="p-4">
          {/* Encabezado con tipo y fecha */}
          <div className="flex justify-between items-center mb-3">
            <Badge type={typeLabel.type}>
              {typeLabel.label}
            </Badge>
            <span className="text-sm text-gray-500">
              {new Date(battle.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>

          {/* Entrenadores y resultado */}
          <div className="flex items-center justify-between">
            {/* Entrenador 1 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 mb-1">
                {battle.trainer1.avatar && (
                  <img 
                    src={battle.trainer1.avatar} 
                    alt={battle.trainer1.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                )}
              </div>
              <span className="text-sm font-medium text-center">{battle.trainer1.name}</span>
            </div>

            {/* Resultado */}
            <div className="flex flex-col items-center px-4">
              <div className="text-lg font-bold">
                {battle.score?.trainer1 || 0} - {battle.score?.trainer2 || 0}
              </div>
              <Badge 
                type={
                  battle.winner === battle.trainer1.id ? 'success' :
                  battle.winner === battle.trainer2.id ? 'danger' :
                  'light'
                }
                size="sm"
                className="mt-1"
              >
                {battle.winner === battle.trainer1.id ? 'Victoria izq.' :
                 battle.winner === battle.trainer2.id ? 'Victoria der.' :
                 'Empate'}
              </Badge>
            </div>

            {/* Entrenador 2 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 mb-1">
                {battle.trainer2.avatar && (
                  <img 
                    src={battle.trainer2.avatar} 
                    alt={battle.trainer2.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                )}
              </div>
              <span className="text-sm font-medium text-center">{battle.trainer2.name}</span>
            </div>
          </div>
          
          {/* Pokémon utilizados (vista miniatura) */}
          <div className="mt-3 pt-3 border-t flex justify-between">
            <div className="flex">
              {battle.trainer1.pokemon?.slice(0, 3).map((pokemon, index) => (
                <div 
                  key={`t1-${index}`} 
                  className="w-6 h-6 rounded-full bg-gray-100 -ml-1 first:ml-0"
                  title={pokemon.name}
                  style={{ zIndex: 3 - index }}
                >
                  {pokemon.image && (
                    <img 
                      src={pokemon.image} 
                      alt={pokemon.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  )}
                </div>
              ))}
              {battle.trainer1.pokemon?.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-gray-100 -ml-1 flex items-center justify-center text-xs" style={{ zIndex: 0 }}>
                  +{battle.trainer1.pokemon.length - 3}
                </div>
              )}
            </div>
            
            <div className="flex">
              {battle.trainer2.pokemon?.slice(0, 3).map((pokemon, index) => (
                <div 
                  key={`t2-${index}`} 
                  className="w-6 h-6 rounded-full bg-gray-100 -mr-1 last:mr-0"
                  title={pokemon.name}
                  style={{ zIndex: 3 - index }}
                >
                  {pokemon.image && (
                    <img 
                      src={pokemon.image} 
                      alt={pokemon.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  )}
                </div>
              )).reverse()}
              {battle.trainer2.pokemon?.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-gray-100 -mr-1 flex items-center justify-center text-xs" style={{ zIndex: 0 }}>
                  +{battle.trainer2.pokemon.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BattleCard;