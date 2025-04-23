import { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Select from '../ui/Select';
import { TrainerService, PokemonService, BattleService } from '../../services';
import { useApi } from '../../hooks';

function BattleSimulator() {
  // Estados para los entrenadores y sus Pokémon
  const [trainer1, setTrainer1] = useState(null);
  const [trainer2, setTrainer2] = useState(null);
  const [trainer1Id, setTrainer1Id] = useState('');
  const [trainer2Id, setTrainer2Id] = useState('');
  const [selectedPokemon1, setSelectedPokemon1] = useState([]);
  const [selectedPokemon2, setSelectedPokemon2] = useState([]);
  const [battleType, setBattleType] = useState('friendly');
  const [battleResult, setBattleResult] = useState(null);
  
  // Usar los hooks personalizados para cargar datos
  const { data: trainers, loading: loadingTrainers, execute: fetchTrainers } = useApi(TrainerService.listTrainers);
  const { data: trainer1Data, loading: loadingTrainer1, execute: fetchTrainer1 } = useApi(TrainerService.getTrainer);
  const { data: trainer2Data, loading: loadingTrainer2, execute: fetchTrainer2 } = useApi(TrainerService.getTrainer);
  const { loading: simulatingBattle, error: battleError, execute: simulateBattle } = useApi(BattleService.simulateBattle);

  // Cargar la lista de entrenadores al montar el componente
  useEffect(() => {
    fetchTrainers({ limit: 100 }); // Cargar más entrenadores para tener una buena selección
  }, [fetchTrainers]);

  // Cargar los datos de los entrenadores cuando se seleccionan
  useEffect(() => {
    if (trainer1Id) {
      fetchTrainer1(trainer1Id);
    }
  }, [trainer1Id, fetchTrainer1]);

  useEffect(() => {
    if (trainer2Id) {
      fetchTrainer2(trainer2Id);
    }
  }, [trainer2Id, fetchTrainer2]);

  // Actualizar el estado de los entrenadores cuando se cargan los datos
  useEffect(() => {
    if (trainer1Data) {
      setTrainer1(trainer1Data);
      setSelectedPokemon1([]); // Resetear Pokémon seleccionados al cambiar de entrenador
    }
  }, [trainer1Data]);

  useEffect(() => {
    if (trainer2Data) {
      setTrainer2(trainer2Data);
      setSelectedPokemon2([]); // Resetear Pokémon seleccionados al cambiar de entrenador
    }
  }, [trainer2Data]);

  // Función para manejar la selección de Pokémon
  const handlePokemonSelect = (pokemonId, trainerId, isChecked) => {
    if (trainerId === trainer1Id) {
      if (isChecked) {
        // Añadir el Pokémon a la selección
        setSelectedPokemon1(prev => [...prev, pokemonId]);
      } else {
        // Eliminar el Pokémon de la selección
        setSelectedPokemon1(prev => prev.filter(id => id !== pokemonId));
      }
    } else {
      if (isChecked) {
        setSelectedPokemon2(prev => [...prev, pokemonId]);
      } else {
        setSelectedPokemon2(prev => prev.filter(id => id !== pokemonId));
      }
    }
  };

  // Validar si se puede iniciar la batalla
  const canStartBattle = () => {
    return (
      trainer1 && 
      trainer2 && 
      selectedPokemon1.length > 0 && 
      selectedPokemon2.length > 0 && 
      trainer1Id !== trainer2Id
    );
  };

  // Manejar la simulación de batalla
  const handleSimulateBattle = async () => {
    if (!canStartBattle()) return;

    const battleData = {
      trainer1Id,
      trainer2Id,
      pokemon1: selectedPokemon1,
      pokemon2: selectedPokemon2,
      type: battleType
    };

    try {
      const result = await simulateBattle(battleData);
      setBattleResult(result);
    } catch (error) {
      console.error('Error al simular batalla:', error);
    }
  };

  // Reiniciar el simulador
  const handleReset = () => {
    setBattleResult(null);
    setSelectedPokemon1([]);
    setSelectedPokemon2([]);
  };

  // Opciones para tipo de batalla
  const battleTypeOptions = [
    { value: 'friendly', label: 'Amistoso' },
    { value: 'league', label: 'Liga oficial' },
    { value: 'tournament', label: 'Torneo' }
  ];

  return (
    <div>
      <Card>
        <Card.Header>
          <h2 className="text-xl font-bold">Simulador de Batallas</h2>
          <p className="text-gray-500 text-sm mt-1">
            Selecciona dos entrenadores y sus Pokémon para simular una batalla
          </p>
        </Card.Header>
        <Card.Body>
          {battleResult ? (
            // Mostrar el resultado de la batalla
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Resultado de la Batalla</h3>
                
                <div className="flex justify-center items-center gap-8 my-4">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-2">
                      {trainer1?.avatar && (
                        <img 
                          src={trainer1.avatar} 
                          alt={trainer1.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      )}
                    </div>
                    <p className="font-medium">{trainer1?.name}</p>
                  </div>
                  
                  <div className="text-2xl font-bold">
                    {battleResult.score?.trainer1 || 0} - {battleResult.score?.trainer2 || 0}
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-2">
                      {trainer2?.avatar && (
                        <img 
                          src={trainer2.avatar} 
                          alt={trainer2.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      )}
                    </div>
                    <p className="font-medium">{trainer2?.name}</p>
                  </div>
                </div>
                
                <Badge 
                  type={
                    battleResult.winner === trainer1Id ? 'success' :
                    battleResult.winner === trainer2Id ? 'success' :
                    'light'
                  }
                  size="lg"
                  className="mt-2"
                >
                  {battleResult.winner === trainer1Id ? `Ganador: ${trainer1?.name}` :
                   battleResult.winner === trainer2Id ? `Ganador: ${trainer2?.name}` :
                   'Empate'}
                </Badge>
              </div>
              
              {/* Detalles de la batalla */}
              {battleResult.rounds && battleResult.rounds.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Resumen de la batalla</h3>
                  
                  {battleResult.rounds.map((round, index) => (
                    <div key={index} className="bg-white border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <Badge>Ronda {index + 1}</Badge>
                        <span className="text-sm">
                          {round.winner === trainer1Id ? `Ganador: ${trainer1?.name}` :
                           round.winner === trainer2Id ? `Ganador: ${trainer2?.name}` :
                           'Sin resultado'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-100 mr-2">
                            {round.pokemon1?.image && (
                              <img 
                                src={round.pokemon1.image} 
                                alt={round.pokemon1.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            )}
                          </div>
                          <span className="font-medium capitalize">{round.pokemon1?.name}</span>
                        </div>
                        
                        <span className="text-sm text-gray-500">vs</span>
                        
                        <div className="flex items-center">
                          <span className="font-medium capitalize">{round.pokemon2?.name}</span>
                          <div className="w-10 h-10 rounded-full bg-gray-100 ml-2">
                            {round.pokemon2?.image && (
                              <img 
                                src={round.pokemon2.image} 
                                alt={round.pokemon2.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex justify-center gap-4 mt-6">
                <Button onClick={handleReset}>
                  Nueva Simulación
                </Button>
              </div>
            </div>
          ) : (
            // Formulario para configurar la batalla
            <div className="space-y-6">
              {/* Tipo de batalla */}
              <div>
                <Select
                  id="battleType"
                  label="Tipo de Batalla"
                  value={battleType}
                  onChange={(e) => setBattleType(e.target.value)}
                  options={battleTypeOptions}
                />
              </div>
              
              {/* Selección de entrenadores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Entrenador 1 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entrenador 1
                  </label>
                  
                  <Select
                    id="trainer1"
                    value={trainer1Id}
                    onChange={(e) => setTrainer1Id(e.target.value)}
                    options={[
                      { value: '', label: 'Seleccionar entrenador' },
                      ...(trainers?.items || []).map(trainer => ({
                        value: trainer.id,
                        label: trainer.name
                      }))
                    ]}
                    disabled={loadingTrainers}
                  />
                  
                  {loadingTrainer1 ? (
                    <div className="mt-4 text-center text-gray-500">
                      Cargando información...
                    </div>
                  ) : trainer1 ? (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Selecciona Pokémon:</h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {trainer1.pokemon?.map(pokemon => (
                          <div key={pokemon.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`pokemon1-${pokemon.id}`}
                              checked={selectedPokemon1.includes(pokemon.id)}
                              onChange={(e) => handlePokemonSelect(pokemon.id, trainer1Id, e.target.checked)}
                              className="h-4 w-4 text-app-primary rounded border-gray-300 focus:ring-app-primary"
                            />
                            <label htmlFor={`pokemon1-${pokemon.id}`} className="ml-2 flex items-center">
                              <div className="w-8 h-8 rounded-full bg-gray-100 mr-2">
                                {pokemon.image && (
                                  <img 
                                    src={pokemon.image} 
                                    alt={pokemon.name}
                                    className="w-full h-full rounded-full object-cover"
                                  />
                                )}
                              </div>
                              <span className="capitalize">{pokemon.name}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
                
                {/* Entrenador 2 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entrenador 2
                  </label>
                  
                  <Select
                    id="trainer2"
                    value={trainer2Id}
                    onChange={(e) => setTrainer2Id(e.target.value)}
                    options={[
                      { value: '', label: 'Seleccionar entrenador' },
                      ...(trainers?.items || []).map(trainer => ({
                        value: trainer.id,
                        label: trainer.name
                      }))
                    ]}
                    disabled={loadingTrainers}
                  />
                  
                  {loadingTrainer2 ? (
                    <div className="mt-4 text-center text-gray-500">
                      Cargando información...
                    </div>
                  ) : trainer2 ? (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Selecciona Pokémon:</h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {trainer2.pokemon?.map(pokemon => (
                          <div key={pokemon.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`pokemon2-${pokemon.id}`}
                              checked={selectedPokemon2.includes(pokemon.id)}
                              onChange={(e) => handlePokemonSelect(pokemon.id, trainer2Id, e.target.checked)}
                              className="h-4 w-4 text-app-primary rounded border-gray-300 focus:ring-app-primary"
                            />
                            <label htmlFor={`pokemon2-${pokemon.id}`} className="ml-2 flex items-center">
                              <div className="w-8 h-8 rounded-full bg-gray-100 mr-2">
                                {pokemon.image && (
                                  <img 
                                    src={pokemon.image} 
                                    alt={pokemon.name}
                                    className="w-full h-full rounded-full object-cover"
                                  />
                                )}
                              </div>
                              <span className="capitalize">{pokemon.name}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              
              {/* Botón para iniciar la batalla */}
              <div className="flex justify-center mt-6">
                <Button
                  disabled={!canStartBattle() || simulatingBattle}
                  onClick={handleSimulateBattle}
                  size="lg"
                >
                  {simulatingBattle ? 'Simulando...' : 'Iniciar Batalla'}
                </Button>
              </div>
              
              {/* Mostrar errores */}
              {battleError && (
                <div className="mt-4 p-3 bg-red-50 text-app-error rounded-md">
                  {battleError.message || 'Ha ocurrido un error al simular la batalla'}
                </div>
              )}
              
              {/* Validaciones */}
              {trainer1Id === trainer2Id && trainer1Id && (
                <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 rounded-md">
                  Un entrenador no puede luchar contra sí mismo. Por favor, selecciona dos entrenadores diferentes.
                </div>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default BattleSimulator;