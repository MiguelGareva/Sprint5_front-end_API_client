/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
        // Colores de Pokémon existentes
          'pokemon-normal': '#A8A77A',
          'pokemon-fire': '#EE8130',
          'pokemon-water': '#6390F0',
          'pokemon-electric': '#F7D02C',
          'pokemon-grass': '#7AC74C',
          'pokemon-ice': '#96D9D6',
          'pokemon-fighting': '#C22E28',
          'pokemon-poison': '#A33EA1',
          'pokemon-ground': '#E2BF65',
          'pokemon-flying': '#A98FF3',
          'pokemon-psychic': '#F95587',
          'pokemon-bug': '#A6B91A',
          'pokemon-rock': '#B6A136',
          'pokemon-ghost': '#735797',
          'pokemon-dragon': '#6F35FC',
          'pokemon-dark': '#705746',
          'pokemon-steel': '#B7B7CE',
          'pokemon-fairy': '#D685AD',

           // Colores de la aplicación
        'app': {
            'primary': '#4A90E2',    // Azul principal
            'secondary': '#50E3C2',  // Verde-azulado secundario
            'accent': '#F5A623',     // Naranja acento
            'background': '#F9FAFB', // Fondo claro
            'card': '#FFFFFF',       // Fondo de tarjetas
            'text': '#333333',       // Texto principal
            'text-light': '#666666', // Texto secundario
            'border': '#E5E7EB',     // Bordes
            'error': '#E53E3E',      // Rojo para errores
            'success': '#38A169',    // Verde para éxito
          }
        },
        fontFamily: {
          'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
          'display': ['Poppins', 'ui-sans-serif', 'system-ui'],
          'mono': ['Roboto Mono', 'ui-monospace', 'monospace'],
        },
        boxShadow: {
          'card': '0 2px 4px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.05)',
          'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        borderRadius: {
          'pokeball': '50%',
        },
      },
    },
    plugins: [],
  }