/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
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
        },
      },
    },
    plugins: [],
  }