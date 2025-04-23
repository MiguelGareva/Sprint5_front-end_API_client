import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BattleDetail from '../components/battles/BattleDetail';
import { BattleService } from '../services';
import { useApi } from '../hooks';

function BattleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Usar el hook personalizado para obtener los datos
  const { 
    data: battle, 
    loading, 
    error, 
    execute: fetchBattle 
  } = useApi(BattleService.getBattle);

  // Cargar los datos del Pokémon al montar el componente
  useEffect(() => {
    if (id) {
      fetchBattle(id);
    }
  }, [id, fetchBattle]);

  // Manejar la navegación de regreso
  const handleBack = () => {
    navigate('/battles');
  };

  return (
    <div>
      <BattleDetail 
        battle={battle}
        loading={loading}
        error={error?.message}
        onBack={handleBack}
      />
    </div>
  );
}

export default BattleDetailPage;