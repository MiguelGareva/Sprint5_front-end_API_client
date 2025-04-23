import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { AuthService } from '../services';
import { useApi } from '../hooks';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    region: '',
    specialty: '',
  });
  
  // Estado para validación del formulario
  const [errors, setErrors] = useState({});
  
  // Usar el hook personalizado para el registro
  const { loading, error, execute: register } = useApi(AuthService.register);

  // Opciones para selects
  const regionOptions = [
    { value: '', label: 'Selecciona una región' },
    { value: 'kanto', label: 'Kanto' },
    { value: 'johto', label: 'Johto' },
    { value: 'hoenn', label: 'Hoenn' },
    { value: 'sinnoh', label: 'Sinnoh' },
    { value: 'unova', label: 'Unova' },
    { value: 'kalos', label: 'Kalos' },
    { value: 'alola', label: 'Alola' },
    { value: 'galar', label: 'Galar' },
    { value: 'paldea', label: 'Paldea' },
  ];
  
  const specialtyOptions = [
    { value: '', label: 'Selecciona una especialidad' },
    { value: 'normal', label: 'Normal' },
    { value: 'fire', label: 'Fuego' },
    { value: 'water', label: 'Agua' },
    { value: 'grass', label: 'Planta' },
    { value: 'electric', label: 'Eléctrico' },
    { value: 'ice', label: 'Hielo' },
    { value: 'fighting', label: 'Lucha' },
    { value: 'poison', label: 'Veneno' },
    { value: 'ground', label: 'Tierra' },
    { value: 'flying', label: 'Volador' },
    { value: 'psychic', label: 'Psíquico' },
    { value: 'bug', label: 'Bicho' },
    { value: 'rock', label: 'Roca' },
    { value: 'ghost', label: 'Fantasma' },
    { value: 'dragon', label: 'Dragón' },
    { value: 'dark', label: 'Siniestro' },
    { value: 'steel', label: 'Acero' },
    { value: 'fairy', label: 'Hada' },
  ];

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Limpiar errores al cambiar un campo
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else {
      // Validación básica de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Email inválido';
      }
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    if (!formData.region) {
      newErrors.region = 'Selecciona una región';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const result = await register(formData);
      
      if (result) {
        // Redirigir al usuario a la página de login después del registro exitoso
        navigate('/login');
      }
    } catch (error) {
      console.error('Error de registro:', error);
    }
  };

  return (
    <div className="flex justify-center py-10">
      <div className="w-full max-w-2xl">
        <Card shadow="elevated">
          <Card.Header>
            <h1 className="text-2xl font-bold text-center">Registro de Entrenador</h1>
            <p className="text-center text-gray-500 mt-1">
              Únete a la Liga Pokémon y comienza tu aventura
            </p>
          </Card.Header>
          
          <Card.Body>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-app-error rounded-md">
                {error.message || 'Ha ocurrido un error al registrarse'}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="username"
                  name="username"
                  label="Nombre de Usuario"
                  value={formData.username}
                  onChange={handleChange}
                  error={errors.username}
                  required
                  fullWidth
                />
                
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  fullWidth
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  label="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                  fullWidth
                />
                
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirmar Contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  required
                  fullWidth
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  id="region"
                  name="region"
                  label="Región de Origen"
                  value={formData.region}
                  onChange={handleChange}
                  options={regionOptions}
                  error={errors.region}
                  required
                  fullWidth
                />
                
                <Select
                  id="specialty"
                  name="specialty"
                  label="Especialidad de Pokémon"
                  value={formData.specialty}
                  onChange={handleChange}
                  options={specialtyOptions}
                  helperText="Opcional: ¿En qué tipo te especializas?"
                  fullWidth
                />
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-app-primary rounded border-gray-300 focus:ring-app-primary"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-600">
                    Acepto los <a href="#" className="text-app-primary hover:underline">Términos y Condiciones</a> y la <a href="#" className="text-app-primary hover:underline">Política de Privacidad</a>
                  </label>
                </div>
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                fullWidth
              >
                {loading ? 'Registrando...' : 'Crear Cuenta'}
              </Button>
            </form>
          </Card.Body>
          
          <Card.Footer>
            <p className="text-center text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-app-primary hover:underline">
                Inicia Sesión
              </Link>
            </p>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default RegisterPage;