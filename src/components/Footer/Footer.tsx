import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Sección de información */}
          <div className="footer-section">
            <h3>UnaHur Anti-Social Net</h3>
            <p>
              Plataforma de la Universidad Nacional de Hurlingham para conectar 
              a la comunidad universitaria de manera significativa.
            </p>
            <div className="flex flex-col items-center space-y-2">
              <p className="text-sm font-semibold mb-1">Seguinos en redes sociales:</p>
              <div className="flex space-x-3 text-lg"></div>
              <a href="https://www.facebook.com/UNAHUR" aria-label="Facebook">📘</a>
              <a href="https://x.com/unahurlingham" aria-label="Twitter">🐦</a>
              <a href="https://www.instagram.com/unahurlingham/" aria-label="Instagram">📷</a>
            </div>
          </div>
          {/* Sección de enlaces rápidos */}
          <div className="footer-section">
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/login">Iniciar Sesión</Link></li>
              <li><Link to="/register">Registrarse</Link></li>
              <li><Link to="/create-post">Crear Publicación</Link></li>
            </ul>
          </div>

          {/* Sección de información académica */}
          <div className="footer-section">
            <h4>Universidad</h4>
            <ul>
              <li><a href="https://unahur.edu.ar/" target="_blank" rel="noopener noreferrer">Sitio Oficial UNAHUR</a></li>
              <li><a href="https://unahur.edu.ar/oferta-academica/" target="_blank" rel="noopener noreferrer">Oferta académica</a></li>
              <li><a href="https://unahur.edu.ar/consultas-frecuentes/" target="_blank" rel="noopener noreferrer">Consultas frecuentes</a></li>
              <li><a href="https://unahur.edu.ar/institucional/#sedes/" target="_blank" rel="noopener noreferrer">Cómo llegar</a></li>
            </ul>
          </div>

          {/* Sección de contacto */}
          <div className="footer-section">
            <h4>Contacto</h4>
            <div className="contact-info">
              <p>📍 Origone 101, Villa Tesei, Hurlingham</p>
              <p>📞 (011) 1234-5678</p>
              <p>✉️ info@unahur.edu.ar</p>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="footer-divider"></div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>
            &copy; {currentYear} Universidad Nacional de Hurlingham - 
            Construcción de Interfaces de Usuario | 
            Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;