import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContexts';

interface ProtectedRouteProps {
 children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div className="container text-center">Cargando...</div>; // O simplemente 'null'
  }

 if (!user) {
  return <Navigate to="/login" replace />;
 }

 return <>{children}</>;
};

export default ProtectedRoute;