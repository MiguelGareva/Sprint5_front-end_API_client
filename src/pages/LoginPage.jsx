import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { AuthService } from '../services';
import { useApi } from '../hooks';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  
  // Estado para validación del formulario
  const [errors, setErrors] = useState({});
  
  // Usar el hook personalizado para el login
  const { loading, error, execute: login } = useApi(AuthService.login);

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
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const result = await login(formData);
      
      if (result) {
        // Redirigir al usuario a la página principal después del login exitoso
        navigate('/');
      }
    } catch (error) {
      console.error('Error de login:', error);
    }
  };

  return (
    <div className="flex justify-center py-10">
      <div className="w-full max-w-md">
        <Card shadow="elevated">
          <Card.Header>
            <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>
            <p className="text-center text-gray-500 mt-1">
              Accede a tu cuenta de la Liga Pokémon
            </p>
          </Card.Header>
          
          <Card.Body>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-app-error rounded-md">
                {error.message || 'Ha ocurrido un error al iniciar sesión'}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
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
              
              <div className="flex justify-between items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-app-primary rounded border-gray-300 focus:ring-app-primary"
                  />
                  <span className="ml-2 text-sm text-gray-600">Recordarme</span>
                </label>
                
                <a href="#" className="text-sm text-app-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                fullWidth
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>
          </Card.Body>
          
          <Card.Footer>
            <p className="text-center text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="text-app-primary hover:underline">
                Regístrate
              </Link>
            </p>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;