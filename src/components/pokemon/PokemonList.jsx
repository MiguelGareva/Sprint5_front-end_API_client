// src/components/pokemon/PokemonList.jsx
import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

function PokemonList({ pokemons = [], loading = false, error = null, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  
  // Opciones de tipos de Pokémon para el filtro
  const typeOptions = [
    { value: '', label: 'Todos los tipos' },
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
      onSearch({ name: searchTerm, type: typeFilter });
    }
  };

  // Manejar reset de filtros
  const handleReset = () => {
    setSearchTerm('');
    setTypeFilter('');
    if (onSearch) {
      onSearch({ name: '', type: '' });
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
              placeholder="Pikachu, Charizard, etc."
              fullWidth
            />
            
            <Select
              id="type"
              label="Filtrar por tipo"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              options={typeOptions}
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
      
      {/* Lista de Pokémon */}
      <div className="lg:col-span-3">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Cargando Pokémon...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-app-error p-4 rounded-md">
            <p>Error: {error}</p>
          </div>
        ) : pokemons.length === 0 ? (
          <div className="bg-blue-50 text-blue-700 p-4 rounded-md">
            <p>No se encontraron Pokémon con los filtros aplicados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {pokemons.map((pokemon) => (
              <div key={pokemon.id} className="h-full">
                <Card hoverable shadow="card" className="h-full">
                  <Card.Body>
                    <PokemonCard pokemon={pokemon} />
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonList;