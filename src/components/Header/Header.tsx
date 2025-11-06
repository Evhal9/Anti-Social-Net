import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContexts';

const Header: React.FC = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="header">
            <div className="container">
                <nav className="nav">
                    <Link to="/" className="logo">
                        UnaHur Anti-Social Net
                    </Link>
                    <ul className="nav-links">
                        <li><Link to="/">Inicio</Link></li>
                        {user ? (
                            <>
                                <li><Link to="/profile">Mi Perfil</Link></li>
                                <li><Link to="/create-post">Crear Post</Link></li>
                                <li>
                                    <span>Hola, {user.nickName}</span>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="btn btn-danger">
                                        Cerrar Sesión
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/AboutUs">Nosotros</Link></li>
                                <li><Link to="/login">Iniciar Sesión</Link></li>
                                <li><Link to="/register" className="btn btn-primary">Registrarse</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;