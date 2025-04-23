import { createBrowserRouter } from 'react-router-dom';

// Importación de páginas
import App from './App';
import Home from './pages/Home';
import PokemonPage from './pages/PokemonPage';
import PokemonDetailPage from './pages/PokemonDetailPage';
import TrainersPage from './pages/TrainersPage';
import TrainerDetailPage from './pages/TrainerDetailPage';
import BattlesPage from './pages/BattlesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'pokemon',
        element: <PokemonPage />,
      },
      {
        path: 'pokemon/:id',
        element: <PokemonDetailPage />,
      },
      {
        path: 'trainers',
        element: <TrainersPage />,
      },
      {
        path: 'trainers/:id',
        element: <TrainerDetailPage />,
      },
      {
        path: 'battles',
        element: <BattlesPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;