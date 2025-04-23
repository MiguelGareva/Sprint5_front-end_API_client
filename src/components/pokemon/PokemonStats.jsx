import Badge from '../ui/Badge';

function PokemonStats({ stats, types = [] }) {
  // Función para calcular el porcentaje de la barra de estadísticas
  // Las estadísticas base de Pokémon suelen ir de 0 a 255,
  // pero usaremos un máximo de 150 para que las barras sean más representativas visualmente
  const calculatePercentage = (value) => {
    const max = 150;
    return Math.min(100, (value / max) * 100);
  };

  // Obtener el tipo principal para el color de las barras
  const primaryType = types[0]?.toLowerCase() || 'normal';

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {types.map(type => (
          <Badge key={type} type={type.toLowerCase()}>
            {type}
          </Badge>
        ))}
      </div>

      <h3 className="text-lg font-bold mb-2">Estadísticas Base</h3>
      
      <div className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.name} className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm font-medium capitalize">{stat.name}</span>
              <span className="text-sm font-medium">{stat.value}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-pokemon-${primaryType} rounded-full`}
                style={{ width: `${calculatePercentage(stat.value)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Radar chart o gráfico de araña (opcional) */}
      {/* Aquí podrías agregar una visualización más avanzada como un chart */}
      
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <h4 className="text-sm font-medium mb-1">Total</h4>
        <div className="text-2xl font-bold">
          {stats.reduce((sum, stat) => sum + stat.value, 0)}
        </div>
      </div>
    </div>
  );
}

export default PokemonStats;