import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContexts';
import { createUser, getUsers } from '../../services/api';

const Register: React.FC = () => {
  const [nickName, setNickName] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Verificar si el usuario ya existe
      const users = await getUsers();
      const existingUser = users.find(u => u.nickName === nickName);
      
      if (existingUser) {
        setError('El nombre de usuario ya está en uso');
        setIsLoading(false);
        return;
      }

      // Crear nuevo usuario
      const newUser = await createUser({
        nickName,
      });

      login(newUser);
      navigate('/');
    } catch (err) {
      setError('Error al crear el usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="text-center">Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nickName">Nombre de usuario *</label>
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
            <label htmlFor=""> Ingrese su mail</label>
            <input
              type="url"
              className="form-control"
              placeholder="ejemplo123@gmail.com"
            />
          </div>
          {error && <div className="text-error mb-1">{error}</div>}
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Creando...' : 'Registrarse'}
          </button>
        </form>
        <p className="text-center mt-1">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;