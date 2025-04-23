function Badge({ 
    children, 
    type = 'normal', 
    size = 'md',
    rounded = 'md',
    className = '' 
  }) {
    // Colores por tipo de Pokémon
    const typeClasses = {
      // Tipos de Pokémon
      normal: "bg-pokemon-normal text-white",
      fire: "bg-pokemon-fire text-white",
      water: "bg-pokemon-water text-white",
      grass: "bg-pokemon-grass text-white",
      electric: "bg-pokemon-electric text-black",
      ice: "bg-pokemon-ice text-black",
      fighting: "bg-pokemon-fighting text-white",
      poison: "bg-pokemon-poison text-white",
      ground: "bg-pokemon-ground text-black",
      flying: "bg-pokemon-flying text-white",
      psychic: "bg-pokemon-psychic text-white",
      bug: "bg-pokemon-bug text-white",
      rock: "bg-pokemon-rock text-white",
      ghost: "bg-pokemon-ghost text-white",
      dragon: "bg-pokemon-dragon text-white",
      dark: "bg-pokemon-dark text-white",
      steel: "bg-pokemon-steel text-black",
      fairy: "bg-pokemon-fairy text-black",
      
      // Colores adicionales para UI general
      primary: "bg-app-primary text-white",
      secondary: "bg-app-secondary text-white",
      success: "bg-app-success text-white",
      warning: "bg-amber-500 text-white",
      danger: "bg-app-error text-white",
      info: "bg-blue-400 text-white",
      light: "bg-gray-200 text-gray-800",
      dark: "bg-gray-800 text-white",
    };
    
    // Tamaños
    const sizeClasses = {
      sm: "text-xs px-1.5 py-0.5",
      md: "text-sm px-2 py-1",
      lg: "text-base px-3 py-1.5",
    };
    
    // Bordes redondeados
    const roundedClasses = {
      none: "rounded-none",
      sm: "rounded",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };
  
    return (
      <span className={`
        inline-flex items-center justify-center font-medium
        ${typeClasses[type]}
        ${sizeClasses[size]}
        ${roundedClasses[rounded]}
        ${className}
      `}>
        {children}
      </span>
    );
  }
  
  export default Badge;