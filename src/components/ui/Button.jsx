function Button({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false, 
    disabled = false, 
    onClick,
    type = 'button',
    className = ''
  }) {
    // Definimos las clases base
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    // Variantes de color
    const variantClasses = {
      primary: "bg-app-primary text-white hover:bg-blue-600 focus:ring-blue-500",
      secondary: "bg-app-secondary text-white hover:bg-teal-600 focus:ring-teal-500",
      success: "bg-app-success text-white hover:bg-green-600 focus:ring-green-500",
      danger: "bg-app-error text-white hover:bg-red-600 focus:ring-red-500",
      outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-app-primary",
      ghost: "bg-transparent text-app-primary hover:bg-blue-50 focus:ring-blue-500",
    };
    
    // Tamaños
    const sizeClasses = {
      sm: "text-xs py-1 px-3",
      md: "text-sm py-2 px-4",
      lg: "text-base py-3 px-6",
    };
    
    // Si está deshabilitado
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
    
    // Si es de ancho completo
    const widthClasses = fullWidth ? "w-full" : "";
    
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
          ${baseClasses}
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${disabledClasses}
          ${widthClasses}
          ${className}
        `}
      >
        {children}
      </button>
    );
  }
  
  export default Button;