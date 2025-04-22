import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a la Liga Pokémon</h1>
        <p className="text-lg text-gray-600 mb-8">
          Explora información de Pokémon y entrenadores en nuestra plataforma
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/pokemon" className="btn btn-primary">
            Ver todos los Pokémon
          </Link>
          <Link to="/trainers" className="btn btn-secondary">
            Ver entrenadores
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;