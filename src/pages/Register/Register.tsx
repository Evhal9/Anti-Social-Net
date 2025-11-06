import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContexts';
import Alert from '../../components/Alert/Alert';
import { createUser, getUsers } from '../../services/api';

const Register: React.FC = () => {
  const [nickName, setNickName] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useUser();
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const users = await getUsers();
      const existingUser = users.find(u => u.nickName === nickName);
      
      if (existingUser) {
        setError('El nombre de usuario ya está en uso');
        setIsLoading(false);
        return; 
      }
      
      const newUser = await createUser({
        nickName,
        password: "123456" 
      });

      setSuccess('¡Usuario creado! Redirigiendo al inicio...');

      setTimeout(() => {
        login(newUser);
        navigate('/');
      }, 2000);
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Error al crear el usuario. Intente más tarde.');
      setIsLoading(false); 
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="text-center">Registrarse</h2>
        <form onSubmit={handleSubmit}>

          <Alert message={error} type="error" onClose={() => setError(null)} />
          <Alert message={success} type="success" />

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
              type="email"
              className="form-control"
              placeholder="ejemplo123@gmail.com"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading || !!success}
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