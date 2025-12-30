import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Copy, Check, LogOut, Sparkles } from 'lucide-react';
import './ConnectPartner.css';

export default function ConnectPartner() {
  const navigate = useNavigate();
  const { userProfile, connectWithPartner, logout } = useAuth();
  const [partnerCode, setPartnerCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);

  // SOLO redirigir si ya tiene pareja conectada
  useEffect(() => {
    if (userProfile?.partnerId && userProfile?.partnerId !== null) {
      console.log('✅ Usuario ya tiene pareja, redirigiendo...');
      navigate('/app/home', { replace: true });
    }
  }, [userProfile?.partnerId, navigate]);

  const copyMyCode = () => {
    if (userProfile?.partnerCode) {
      navigator.clipboard.writeText(userProfile.partnerCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConnect = async () => {
    if (!partnerCode || partnerCode.length < 6) {
      setError('Ingresa un código válido');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const result = await connectWithPartner(partnerCode);
      alert(`¡Conectado con ${result.name}! 🎉`);
      navigate('/app/home', { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🔄 Botón presionado, navegando...');
    
    // Forzar navegación sin replace
    window.location.href = '/app/home';
  };

  if (!userProfile) {
    return (
      <div className="connect-page">
        <div style={{ color: 'white', textAlign: 'center' }}>Cargando...</div>
      </div>
    );
  }

  return (
    <div className="connect-page">
      {/* Partículas decorativas */}
      <div className="particles">
        <Sparkles className="particle particle-1" size={16} />
        <Sparkles className="particle particle-2" size={12} />
        <Sparkles className="particle particle-3" size={14} />
        <Sparkles className="particle particle-4" size={10} />
      </div>

      <div className="connect-container">
        {/* Header con corazón SVG */}
        <div className="connect-header">
          <div className="heart-container">
            <div className="heart-glow"></div>
            <svg className="heart-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <path 
                d="M50,85 C50,85 15,60 15,40 C15,25 25,15 35,15 C42,15 47,18 50,25 C53,18 58,15 65,15 C75,15 85,25 85,40 C85,60 50,85 50,85 Z" 
                fill="url(#heartGradient)"
                stroke="#ec4899"
                strokeWidth="2"
              />
            </svg>
          </div>
          <h1 className="connect-title">
            ¡Hola <span className="gradient-text">{userProfile.name}</span>!
          </h1>
          <p className="connect-subtitle">Conecta con tu pareja para comenzar tu historia</p>
        </div>

        {/* Mi Código */}
        <div className="code-card">
          <div className="card-header">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="code-card-title">Tu Código de Conexión</h3>
              <p className="code-card-description">Comparte este código con tu pareja</p>
            </div>
          </div>
          
          <div className="code-display-box">
            <div className="code-wrapper">
              <span className="code-text">{userProfile.partnerCode || 'XXXXXX'}</span>
              <div className="code-shimmer"></div>
            </div>
            <button className="code-copy-btn" onClick={copyMyCode}>
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        {/* Divider elegante */}
        <div className="divider">
          <div className="divider-line" />
          <div className="divider-circle">
            <span className="divider-text">o</span>
          </div>
          <div className="divider-line" />
        </div>

        {/* Botón para mostrar input */}
        {!showCodeInput ? (
          <button 
            className="connect-btn btn-code-input"
            onClick={() => setShowCodeInput(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 11l3 3L22 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Ya tengo el código de mi pareja
          </button>
        ) : (
          <div className="code-card code-input-section">
            <div className="card-header">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <h3 className="code-card-title">Código de tu Pareja</h3>
                <p className="code-card-description">Ingresa el código que te compartieron</p>
              </div>
            </div>
            
            {error && (
              <div className="error-message">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <line x1="15" y1="9" x2="9" y2="15" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="9" y1="9" x2="15" y2="15" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {error}
              </div>
            )}
            
            <input
              type="text"
              placeholder="XXXXXX"
              value={partnerCode}
              onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
              className="code-input"
              maxLength={8}
            />
            
            <button
              className="connect-btn btn-primary"
              onClick={handleConnect}
              disabled={loading || !partnerCode}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Conectando...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 2L11 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Conectar
                </>
              )}
            </button>
          </div>
        )}

        {/* Botones inferiores */}
        <button 
          className="connect-btn btn-secondary" 
          onClick={handleSkip}
          type="button"
        >
          Conectar después
        </button>

        <button 
          className="connect-btn btn-logout" 
          onClick={logout}
          type="button"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
