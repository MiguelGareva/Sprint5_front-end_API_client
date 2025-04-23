import { useState } from 'react';
import TrainerCard from './TrainerCard';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

function TrainerList({ trainers = [], loading = false, error = null, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  
  // Opciones de regiones para el filtro
  const regionOptions = [
    { value: '', label: 'Todas las regiones' },
    { value: 'kanto', label: 'Kanto' },
    { value: 'johto', label: 'Johto' },
    { value: 'hoenn', label: 'Hoenn' },
    { value: 'sinnoh', label: 'Sinnoh' },
    { value: 'unova', label: 'Unova' },
    { value: 'kalos', label: 'Kalos' },
    { value: 'alola', label: 'Alola' },
    { value: 'galar', label: 'Galar' },
    { value: 'paldea', label: 'Paldea' },
  ];
  
  // Opciones de especialidades (basadas en tipos de Pokémon)
  const specialtyOptions = [
    { value: '', label: 'Todas las especialidades' },
    { value: 'normal', label: 'Normal' },
    { value: 'fire', label: 'Fuego' },
    { value: 'water', label: 'Agua' },
    { value: 'grass', label: 'Planta' },
    { value: 'electric', label: 'Eléctrico' },
    { value: 'ice', label: 'Hielo' },
    { value: 'fighting', label: 'Lucha' },
    { value: 'poison', label: 'Veneno' },
    { value: 'ground', label: 'Tierra' },
    { value: 'flying', label: 'Volador' },
    { value: 'psychic', label: 'Psíquico' },
    { value: 'bug', label: 'Bicho' },
    { value: 'rock', label: 'Roca' },
    { value: 'ghost', label: 'Fantasma' },
    { value: 'dragon', label: 'Dragón' },
    { value: 'dark', label: 'Siniestro' },
    { value: 'steel', label: 'Acero' },
    { value: 'fairy', label: 'Hada' },
  ];

  // Manejar búsqueda
  const handleSearch = () => {
    if (onSearch) {
      onSearch({ 
        name: searchTerm, 
        region: regionFilter, 
        specialty: specialtyFilter 
      });
    }
  };

  // Manejar reset de filtros
  const handleReset = () => {
    setSearchTerm('');
    setRegionFilter('');
    setSpecialtyFilter('');
    if (onSearch) {
      onSearch({ name: '', region: '', specialty: '' });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Panel de filtros */}
      <div className="lg:col-span-1">
        <Card>
          <Card.Header>
            <h2 className="text-lg font-bold">Filtros</h2>
          </Card.Header>
          <Card.Body className="space-y-4">
            <Input
              id="search"
              label="Buscar por nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ash, Misty, etc."
              fullWidth
            />
            
            <Select
              id="region"
              label="Filtrar por región"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              options={regionOptions}
              fullWidth
            />
            
            <Select
              id="specialty"
              label="Filtrar por especialidad"
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              options={specialtyOptions}
              fullWidth
            />
            
            <div className="flex flex-col space-y-2">
              <Button onClick={handleSearch} fullWidth>
                Buscar
              </Button>
              <Button variant="outline" onClick={handleReset} fullWidth>
                Limpiar filtros
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      
      {/* Lista de Entrenadores */}
      <div className="lg:col-span-3">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Cargando entrenadores...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-app-error p-4 rounded-md">
            <p>Error: {error}</p>
          </div>
        ) : trainers.length === 0 ? (
          <div className="bg-blue-50 text-blue-700 p-4 rounded-md">
            <p>No se encontraron entrenadores con los filtros aplicados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {trainers.map((trainer) => (
              <div key={trainer.id} className="h-full">
                <TrainerCard trainer={trainer} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrainerList;