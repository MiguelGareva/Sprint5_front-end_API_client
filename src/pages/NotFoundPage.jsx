import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-app-primary">404</h1>
        <h2 className="text-3xl font-bold mb-4">¡Página no encontrada!</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Parece que te has aventurado a una zona inexplorada. 
          Ni siquiera los Pokémon de tipo Psíquico pueden localizar esta página.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => navigate(-1)}>
            Volver atrás
          </Button>
          <Link to="/">
            <Button variant="outline">
              Ir al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;