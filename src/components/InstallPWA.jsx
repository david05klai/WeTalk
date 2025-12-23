import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Detectar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Si ya cerró el banner en esta sesión, no mostrarlo
    if (sessionStorage.getItem('installBannerClosed')) {
      return;
    }

    // Capturar el evento de instalación
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Mostrar banner después de 3 segundos
      setTimeout(() => {
        setShowBanner(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          console.log('✅ Usuario instaló la app');
        }
        
        setDeferredPrompt(null);
        setShowBanner(false);
      } catch (error) {
        console.error('Error al instalar:', error);
      }
    }
  };

  const handleViewInstructions = () => {
    setShowBanner(false);
    navigate('/download'); // ← ARREGLADO: Ahora sí va a /download
  };

  const handleClose = () => {
    setShowBanner(false);
    sessionStorage.setItem('installBannerClosed', 'true');
  };

  // Si ya está instalada o no hay banner, no mostrar nada
  if (isInstalled || !showBanner) {
    return null;
  }

  return (
    <div style={styles.banner}>
      <button onClick={handleClose} style={styles.closeBtn}>
        <X size={20} color="white" />
      </button>

      <div style={styles.content}>
        <div style={styles.icon}>
          <Download size={24} color="white" />
        </div>
        
        <div style={styles.text}>
          <div style={styles.title}>Instalar WeTalk</div>
          <div style={styles.subtitle}>Agregar a pantalla de inicio</div>
        </div>

        <div style={styles.buttons}>
          {deferredPrompt ? (
            <button onClick={handleInstall} style={styles.installBtn}>
              Instalar
            </button>
          ) : (
            <button onClick={handleViewInstructions} style={styles.instructionsBtn}>
              Ver cómo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  banner: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
    borderTop: '1px solid #333',
    padding: '16px 20px',
    zIndex: 999,
    boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.5)',
    animation: 'slideUp 0.4s ease',
  },
  closeBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s ease',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  icon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #7f00ff, #b84dff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  text: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '2px',
  },
  subtitle: {
    color: '#888',
    fontSize: '13px',
  },
  buttons: {
    display: 'flex',
    gap: '8px',
  },
  installBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.25s ease',
    whiteSpace: 'nowrap',
  },
  instructionsBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #7f00ff, #b84dff)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.25s ease',
    whiteSpace: 'nowrap',
  },
};