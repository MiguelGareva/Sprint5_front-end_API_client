import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PokemonDetail from '../components/pokemon/PokemonDetail';
import { PokemonService } from '../services';
import { useApi } from '../hooks';

function PokemonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Usar el hook personalizado para obtener los datos
  const { 
    data: pokemon, 
    loading, 
    error, 
    execute: fetchPokemon 
  } = useApi(PokemonService.getPokemon);

  // Cargar los datos del Pokémon al montar el componente
  useEffect(() => {
    if (id) {
      fetchPokemon(id);
    }
  }, [id, fetchPokemon]);

  // Manejar la navegación de regreso
  const handleBack = () => {
    navigate('/pokemon');
  };

  return (
    <div>
      <PokemonDetail 
        pokemon={pokemon}
        loading={loading}
        error={error?.message}
        onBack={handleBack}
      />
    </div>
  );
}

export default PokemonDetailPage;