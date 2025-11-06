import React from "react";
import "./AboutUs.css";
import unahur1 from "../../assets/unahur1.jpg";
import unahur2 from "../../assets/unahur2.jpg";
import unahur3 from "../../assets/unahur3.jpg";

const AboutUs: React.FC = () => { 
return (
    <section className="about-section">
      <div className="about-hero">
        <div className="overlay">
          <h2 className="hero-title">Sobre Nosotros</h2>
          <p className="hero-subtitle">
            Conectamos la comunidad de la Universidad Nacional de Hurlingham de manera diferente.
          </p>
        </div>
      </div>

      <div className="about-content">
        <p className="intro-text">
          <strong>UnaHur Anti-Social Net</strong> es una red creada por y para la comunidad de la{" "}
          <strong>Universidad Nacional de Hurlingham (UNaHur)</strong>. Nuestro propósito es ofrecer
          un espacio donde estudiantes, docentes y egresados puedan expresarse, compartir proyectos,
          aprender y construir vínculos reales sin las distracciones de las redes tradicionales.
        </p>

        <div className="about-cards">
          <div className="about-card fade-in">
            <img src={unahur1} alt="Edificio central UNaHur" className="card-img" />
            <h3>Nuestra Visión</h3>
            <p>
              Fomentar una comunidad universitaria conectada, colaborativa y comprometida con el
              conocimiento, el respeto y la educación pública.
            </p>
          </div>

          <div className="about-card fade-in delay-1">
            <img src={unahur2} alt="Edificio central UNaHur" className="card-img" />
            <h3>Nuestra Misión</h3>
            <p>
              Promover un entorno digital donde la comunicación y el aprendizaje estén en el
              centro, eliminando distracciones y priorizando la calidad de las interacciones.
            </p>
          </div>

          <div className="about-card fade-in delay-2">
            <img src={unahur3} alt="Edificio central UNaHur" className="card-img" />
            <h3>Nuestros Valores</h3>
            <p>
              Inclusión, respeto, participación y compromiso con la comunidad. Creemos que el
              conocimiento se fortalece cuando se comparte.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AboutUs;