import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TrainerDetail from '../components/trainers/TrainerDetail';
import { TrainerService } from '../services';
import { useApi } from '../hooks';

function TrainerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Usar el hook personalizado para obtener los datos
  const { 
    data: trainer, 
    loading, 
    error, 
    execute: fetchTrainer 
  } = useApi(TrainerService.getTrainer);

  // Cargar los datos del entrenador al montar el componente
  useEffect(() => {
    if (id) {
      fetchTrainer(id);
    }
  }, [id, fetchTrainer]);

  // Manejar la navegación de regreso
  const handleBack = () => {
    navigate('/trainers');
  };

  return (
    <div>
      <TrainerDetail 
        trainer={trainer}
        loading={loading}
        error={error?.message}
        onBack={handleBack}
      />
    </div>
  );
}

export default TrainerDetailPage;