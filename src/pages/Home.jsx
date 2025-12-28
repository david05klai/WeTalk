import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="logo-container">
            <div className="logo-glow"></div>
            <Heart className="logo-heart" size={80} strokeWidth={2} />
            <Sparkles className="logo-sparkle logo-sparkle-1" size={20} />
            <Sparkles className="logo-sparkle logo-sparkle-2" size={16} />
          </div>
          
          <h1 className="home-title">
            We<span className="title-highlight">Talk</span>
          </h1>
          
          <p className="home-description">
            Fortalece tu relación con la persona que más amas
          </p>
        </div>

        {/* Features */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <MessageCircle size={24} />
            </div>
            <h3 className="feature-title">Comunicación</h3>
            <p className="feature-text">Chat privado para hablar libremente</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Heart size={24} />
            </div>
            <h3 className="feature-title">Conexión</h3>
            <p className="feature-text">Comparte momentos especiales juntos</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Sparkles size={24} />
            </div>
            <h3 className="feature-title">Crecimiento</h3>
            <p className="feature-text">Actividades para fortalecer su vínculo</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="cta-section">
          <button className="cta-button" onClick={() => navigate("/auth")}>
            <span>Comenzar ahora</span>
            <ArrowRight size={20} />
          </button>
          
          <p className="cta-subtitle">
            Únete a miles de parejas que fortalecen su relación
          </p>
        </div>
      </div>

      {/* Background Effects */}
      <div className="bg-gradient gradient-1"></div>
      <div className="bg-gradient gradient-2"></div>
      <div className="bg-gradient gradient-3"></div>
    </div>
  );
}