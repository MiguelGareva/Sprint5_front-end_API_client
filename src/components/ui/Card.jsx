function Card({ 
    children, 
    className = "", 
    hoverable = false, 
    shadow = "default" 
  }) {
    // Clases básicas para todas las tarjetas
    const baseClasses = "bg-white rounded-lg overflow-hidden";
    
    // Diferentes niveles de sombra
    const shadowClasses = {
      none: "",
      default: "shadow",
      md: "shadow-md",
      lg: "shadow-lg",
      card: "shadow-card"
    };
    
    // Efecto al pasar el mouse
    const hoverClasses = hoverable 
      ? "transition-transform duration-200 hover:-translate-y-1 hover:shadow-elevated" 
      : "";
    
    return (
      <div className={`
        ${baseClasses}
        ${shadowClasses[shadow]}
        ${hoverClasses}
        ${className}
      `}>
        {children}
      </div>
    );
  }
  
  // Componentes adicionales para crear una API más expresiva
  Card.Header = function CardHeader({ children, className = "" }) {
    return (
      <div className={`px-6 py-4 border-b border-app-border ${className}`}>
        {children}
      </div>
    );
  };
  
  Card.Body = function CardBody({ children, className = "" }) {
    return (
      <div className={`px-6 py-4 ${className}`}>
        {children}
      </div>
    );
  };
  
  Card.Footer = function CardFooter({ children, className = "" }) {
    return (
      <div className={`px-6 py-4 border-t border-app-border ${className}`}>
        {children}
      </div>
    );
  };
  
  export default Card;