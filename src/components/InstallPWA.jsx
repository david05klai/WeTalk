import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detectar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Capturar el evento de instalación (SOLO ANDROID/CHROME)
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Detectar si se instaló
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowBanner(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Mostrar el prompt nativo
    deferredPrompt.prompt();

    // Esperar la respuesta del usuario
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('✅ PWA instalada correctamente');
    } else {
      console.log('❌ Usuario canceló la instalación');
    }

    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleClose = () => {
    setShowBanner(false);
  };

  // No mostrar nada si ya está instalada o no hay prompt disponible
  if (isInstalled || !showBanner) {
    return null;
  }

  return (
    <>
      {/* BANNER INFERIOR */}
      <div style={styles.banner}>
        <div style={styles.content}>
          <div style={styles.icon}>
            <Download size={24} />
          </div>
          
          <div style={styles.text}>
            <h3 style={styles.title}>Instalar WeTalk</h3>
            <p style={styles.subtitle}>Acceso rápido desde tu pantalla de inicio</p>
          </div>

          <button onClick={handleInstall} style={styles.installBtn}>
            Instalar
          </button>

          <button onClick={handleClose} style={styles.closeBtn}>
            <X size={20} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
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
    padding: '16px',
    zIndex: 9999,
    animation: 'slideUp 0.4s ease-out',
    boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.5)',
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  icon: {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #7f00ff, #b84dff)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    flexShrink: 0,
  },
  text: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 4px 0',
  },
  subtitle: {
    color: '#888',
    fontSize: '13px',
    margin: 0,
  },
  installBtn: {
    background: 'linear-gradient(135deg, #7f00ff, #b84dff)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(127, 0, 255, 0.4)',
    flexShrink: 0,
  },
  closeBtn: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#888',
    border: 'none',
    borderRadius: '8px',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flexShrink: 0,
  },
};