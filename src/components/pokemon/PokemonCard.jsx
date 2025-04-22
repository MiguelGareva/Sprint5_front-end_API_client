import { Link } from 'react-router-dom';

function PokemonCard({ pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className="block">
      <div className="pokemon-card">
        <div className="relative">
          <img 
            src={pokemon.image || '/placeholder-pokemon.png'} 
            alt={pokemon.name} 
            className="w-full h-48 object-contain mb-2"
          />
        </div>
        <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
        <div className="flex gap-2 mt-2">
          {pokemon.types?.map(type => (
            <span 
              key={type} 
              className={`px-2 py-1 rounded text-xs text-white bg-pokemon-${type.toLowerCase()}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard;