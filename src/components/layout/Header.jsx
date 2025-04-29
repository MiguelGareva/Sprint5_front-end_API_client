import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-pokemon-water text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Pokémon League
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-yellow-200 transition-colors">Home</Link></li>
            <li><Link to="/pokemon" className="hover:text-yellow-200 transition-colors">Pokémon</Link></li>
            <li><Link to="/trainers" className="hover:text-yellow-200 transition-colors">Entrenadores</Link></li>
            <li><Link to="/battles" className="hover:text-yellow-200 transition-colors">Batallas</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;