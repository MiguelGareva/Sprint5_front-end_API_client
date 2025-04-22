function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">&copy; {new Date().getFullYear()} Pokémon League. Todos los derechos reservados.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Términos de uso
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Política de privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contacto
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;