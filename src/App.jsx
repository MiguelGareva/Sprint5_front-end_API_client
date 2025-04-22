import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import TrainerList from './pages/TrainerList';
import TrainerDetail from './pages/TrainerDetail';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
            <Route path="/trainers" element={<TrainerList />} />
            <Route path="/trainers/:id" element={<TrainerDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;