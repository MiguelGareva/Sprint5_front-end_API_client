import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

function Home() {
  // Datos de ejemplo para la página de inicio
  const featuredPokemon = [
    { id: 25, name: 'Pikachu', image: '/pikachu.png', types: ['Electric'] },
    { id: 6, name: 'Charizard', image: '/charizard.png', types: ['Fire', 'Flying'] },
    { id: 150, name: 'Mewtwo', image: '/mewtwo.png', types: ['Psychic'] },
  ];
  
  const topTrainers = [
    { id: 1, name: 'Red', ranking: 1, region: 'Kanto', wins: 120, losses: 5 },
    { id: 2, name: 'Blue', ranking: 2, region: 'Kanto', wins: 110, losses: 15 },
    { id: 3, name: 'Cynthia', ranking: 3, region: 'Sinnoh', wins: 105, losses: 10 },
  ];
  
  const recentBattles = [
    { id: 1, trainer1: 'Red', trainer2: 'Blue', winner: 'Red', date: '2025-04-22' },
    { id: 2, trainer1: 'Cynthia', trainer2: 'Leon', winner: 'Cynthia', date: '2025-04-21' },
  ];

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-app-primary to-app-secondary rounded-xl overflow-hidden">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                Bienvenido a la Liga Pokémon
              </h1>
              <p className="text-white/90 text-lg mb-6">
                Explora información sobre Pokémon, entrenadores y batallas en la liga oficial.
                Descubre estadísticas, movimientos y mucho más.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/pokemon">
                  <Button size="lg">Explorar Pokémon</Button>
                </Link>
                <Link to="/trainers">
                  <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                    Ver Entrenadores
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="/pokemon-league-logo.png" 
                alt="Liga Pokémon" 
                className="max-w-full h-auto object-contain" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pokémon Destacados */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Pokémon Destacados</h2>
          <Link to="/pokemon" className="text-app-primary hover:underline">
            Ver todos &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredPokemon.map(pokemon => (
            <Card key={pokemon.id} hoverable shadow="card" className="h-full">
              <Card.Body>
                <Link to={`/pokemon/${pokemon.id}`} className="block">
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
                      <Badge key={type} type={type.toLowerCase()}>
                        {type}
                      </Badge>
                    ))}
                  </div>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </section>

      {/* Entrenadores Top y Batallas Recientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Entrenadores */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Top Entrenadores</h2>
            <Link to="/trainers" className="text-app-primary hover:underline">
              Ver todos &rarr;
            </Link>
          </div>
          
          <Card>
            <Card.Body className="p-0">
              <div className="divide-y">
                {topTrainers.map((trainer, index) => (
                  <Link 
                    key={trainer.id} 
                    to={`/trainers/${trainer.id}`}
                    className="flex items-center p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 mr-4 flex items-center justify-center font-bold text-gray-600">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{trainer.name}</h3>
                      <p className="text-sm text-gray-500">
                        {trainer.region} • {trainer.wins} victorias
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <Badge type="primary" rounded="full">#{trainer.ranking}</Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </Card.Body>
          </Card>
        </section>

        {/* Batallas Recientes */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Batallas Recientes</h2>
            <Link to="/battles" className="text-app-primary hover:underline">
              Ver todas &rarr;
            </Link>
          </div>
          
          <Card>
            <Card.Body className="p-0">
              <div className="divide-y">
                {recentBattles.map((battle) => (
                  <Link 
                    key={battle.id} 
                    to={`/battles/${battle.id}`}
                    className="block p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">
                        {new Date(battle.date).toLocaleDateString('es-ES', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <Badge type={battle.winner === battle.trainer1 ? 'water' : 'fire'} size="sm">
                        {battle.winner} ganó
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-pokemon-water mr-2"></div>
                        <span className="font-medium">{battle.trainer1}</span>
                      </div>
                      <div className="text-sm text-gray-500 mx-2">VS</div>
                      <div className="flex items-center">
                        <span className="font-medium">{battle.trainer2}</span>
                        <div className="w-8 h-8 rounded-full bg-pokemon-fire ml-2"></div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card.Body>
          </Card>
        </section>
      </div>

      {/* CTA Banner */}
      <div className="bg-gray-100 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-6">
            <h2 className="text-xl font-bold mb-2">¿Eres un entrenador?</h2>
            <p className="text-gray-600">
              Regístrate en nuestra plataforma para comenzar a seguir tus estadísticas y participar en batallas.
            </p>
          </div>
          <Link to="/register">
            <Button variant="primary" size="lg">
              Registrarse Ahora
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;