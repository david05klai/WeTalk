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

    // Si ya cerró el banner en esta sesión, no mostrarlo
    if (sessionStorage.getItem('installBannerClosed') === 'true') {
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

    // SIEMPRE mostrar banner en móviles después de 3 segundos
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setTimeout(() => {
        if (!isInstalled && sessionStorage.getItem('installBannerClosed') !== 'true') {
          setShowBanner(true);
        }
      }, 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, [isInstalled]);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // Si no hay prompt, redirigir a la página de descarga
      window.location.href = '/download';
      return;
    }

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
    // Guardar en localStorage para no volver a mostrar en esta sesión
    sessionStorage.setItem('installBannerClosed', 'true');
  };

  // Si ya está instalada, no mostrar nada
  if (isInstalled) {
    return null;
  }

  // Si no hay prompt pero el usuario está en móvil, mostrar banner informativo
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (!showBanner && !isMobile) {
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
            <h3 style={styles.title}>
              {deferredPrompt ? 'Instalar WeTalk' : '📱 Instalar App'}
            </h3>
            <p style={styles.subtitle}>
              {deferredPrompt 
                ? 'Acceso rápido desde tu pantalla de inicio'
                : 'Ver instrucciones de instalación'
              }
            </p>
          </div>

          <button onClick={handleInstall} style={styles.installBtn}>
            {deferredPrompt ? 'Instalar' : 'Ver cómo'}
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