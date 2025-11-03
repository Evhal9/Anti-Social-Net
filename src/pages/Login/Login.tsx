import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContexts';
import { getUsers } from '../../services/api';
import { FIXED_PASSWORD } from '../../utils/constants';
import Alert from '../../components/Alert/Alert';

const Login: React.FC = () => {
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (password !== FIXED_PASSWORD) {
      setError('Contraseña incorrecta. Use "123456"');
      setIsLoading(false);
      return;
    }

    try {
      const users = await getUsers();
      const user = users.find(u => u.nickName === nickName);
      
      if (user) {
        login(user);
        navigate('/');
      } else {
        setError('Usuario no encontrado');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nickName">Nombre de usuario</label>
            <input
              type="text"
              id="nickName"
              className="form-control"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Use 123456"
              required
            />
          </div>
          <Alert 
            message={error} 
            type="error" 
            onClose={() => setError(null)} 
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>
        <p className="text-center mt-1">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;