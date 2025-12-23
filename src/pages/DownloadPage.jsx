import { useState, useEffect } from 'react';
import { Download, Apple, Smartphone, X, CheckCircle, Heart, Star } from 'lucide-react';

export default function DownloadPage() {
  const [showAndroidModal, setShowAndroidModal] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const APP_URL = window.location.origin;

  // Detectar si puede instalarse
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('✅ PWA lista para instalar');
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallAndroid = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          console.log('✅ Usuario instaló la app');
          setShowAndroidModal(false);
        }
        
        setDeferredPrompt(null);
      } catch (error) {
        console.error('Error al instalar:', error);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(APP_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Logo */}
        <img src="/logo.png" alt="WeTalk" style={styles.logo} />

        <h1 style={styles.title}>Descarga WeTalk</h1>

        <p style={styles.subtitle}>
          Instala nuestra app y mantente conectado con tu pareja
        </p>

        {/* Botones */}
        <div style={styles.buttons}>
          {/* Android */}
          <button onClick={() => setShowAndroidModal(true)} style={styles.btnPrimary}>
            <Smartphone size={20} />
            Descargar en Android
          </button>

          {/* iOS */}
          <button onClick={() => setShowIOSModal(true)} style={styles.btnOmit}>
            <Apple size={20} />
            Descargar en iPhone
          </button>
        </div>

        {/* Mensaje de apoyo */}
        <div style={styles.supportBox}>
          <Heart size={18} color="#ff6b9d" fill="#ff6b9d" />
          <p style={styles.supportText}>
            ¿Te gusta WeTalk? Apóyanos dejando una reseña para llegar a las tiendas oficiales
          </p>
        </div>
      </div>

      {/* ============================================
          MODAL ANDROID
          ============================================ */}
      {showAndroidModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAndroidModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowAndroidModal(false)} style={styles.closeBtn}>
              <X size={24} color="white" />
            </button>

            <h2 style={styles.modalTitle}>
              <Smartphone size={28} />
              Instalar en Android
            </h2>

            <div style={styles.steps}>
              <div style={styles.step}>
                <div style={styles.stepNumber}>1</div>
                <p style={styles.stepText}>
                  Abre esta página en <strong>Chrome</strong>
                </p>
              </div>

              <div style={styles.step}>
                <div style={styles.stepNumber}>2</div>
                <p style={styles.stepText}>
                  Toca los <strong>3 puntos (⋮)</strong> en la esquina superior derecha
                </p>
              </div>

              <div style={styles.step}>
                <div style={styles.stepNumber}>3</div>
                <p style={styles.stepText}>
                  Selecciona <strong>"Agregar a pantalla de inicio"</strong> o <strong>"Instalar app"</strong>
                </p>
              </div>

              <div style={styles.step}>
                <div style={styles.stepNumber}>4</div>
                <p style={styles.stepText}>
                  Confirma y ¡listo! WeTalk estará en tu pantalla de inicio 🎉
                </p>
              </div>

              {/* Botón de instalación rápida si está disponible */}
              {deferredPrompt && (
                <>
                  <div style={styles.divider}>o</div>
                  <button onClick={handleInstallAndroid} style={styles.quickInstallBtn}>
                    <Download size={20} />
                    Instalación Rápida
                  </button>
                  <p style={styles.quickInstallText}>
                    ⚡ Click aquí para instalar con un solo toque
                  </p>
                </>
              )}
            </div>

            {/* Apoyo Play Store */}
            <div style={styles.supportSection}>
              <Star size={20} color="#FFD700" fill="#FFD700" />
              <div>
                <p style={styles.supportTitle}>Ayúdanos a llegar a Play Store</p>
                <p style={styles.supportDesc}>
                  Con tu apoyo podremos publicar WeTalk en Google Play y llegar a más parejas
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================
          MODAL iOS
          ============================================ */}
      {showIOSModal && (
        <div style={styles.modalOverlay} onClick={() => setShowIOSModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowIOSModal(false)} style={styles.closeBtn}>
              <X size={24} color="white" />
            </button>

            <h2 style={styles.modalTitle}>
              <Apple size={28} />
              Instalar en iPhone
            </h2>

            <div style={styles.steps}>
              <div style={styles.step}>
                <div style={styles.stepNumber}>1</div>
                <div>
                  <p style={styles.stepText}>Copia esta URL:</p>
                  <div style={styles.urlBox}>
                    <input 
                      type="text" 
                      value={APP_URL}
                      readOnly
                      style={styles.urlInput}
                    />
                    <button onClick={handleCopy} style={styles.copyBtn}>
                      {copied ? <CheckCircle size={18} /> : 'Copiar'}
                    </button>
                  </div>
                </div>
              </div>

              <div style={styles.step}>
                <div style={styles.stepNumber}>2</div>
                <p style={styles.stepText}>
                  Abre la URL en <strong>Safari</strong> (no Chrome)
                </p>
              </div>

              <div style={styles.step}>
                <div style={styles.stepNumber}>3</div>
                <p style={styles.stepText}>
                  Toca el botón <strong>Compartir 📤</strong> en la barra inferior
                </p>
              </div>

              <div style={styles.step}>
                <div style={styles.stepNumber}>4</div>
                <p style={styles.stepText}>
                  Busca y selecciona <strong>"Añadir a pantalla de inicio"</strong>
                </p>
              </div>

              <div style={styles.step}>
                <div style={styles.stepNumber}>5</div>
                <p style={styles.stepText}>
                  Confirma y ¡listo! WeTalk estará en tu pantalla de inicio 🎉
                </p>
              </div>
            </div>

            {/* Apoyo App Store */}
            <div style={styles.supportSection}>
              <Star size={20} color="#FFD700" fill="#FFD700" />
              <div>
                <p style={styles.supportTitle}>Ayúdanos a llegar a App Store</p>
                <p style={styles.supportDesc}>
                  Con tu apoyo podremos publicar WeTalk en la App Store y llegar a más parejas
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  container: {
    maxWidth: '400px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '25px',
  },
  logo: {
    width: '150px',
    maxWidth: '80%',
  },
  title: {
    color: 'white',
    fontSize: '28px',
    fontWeight: '600',
    letterSpacing: '1px',
    margin: 0,
    textAlign: 'center',
  },
  subtitle: {
    color: '#888',
    textAlign: 'center',
    fontSize: '15px',
    maxWidth: '300px',
    lineHeight: '1.5',
    margin: 0,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    width: '260px',
  },
  btnPrimary: {
    padding: '14px 0',
    borderRadius: '999px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    border: 'none',
    background: 'white',
    color: 'black',
    boxShadow: '0 6px 18px rgba(255, 255, 255, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: '500',
  },
  btnOmit: {
    padding: '14px 0',
    borderRadius: '999px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    border: 'none',
    background: 'linear-gradient(135deg, #7f00ff, #b84dff)',
    color: 'white',
    boxShadow: '0 6px 18px rgba(183, 77, 255, 0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: '500',
  },
  supportBox: {
    background: 'rgba(255, 107, 157, 0.1)',
    border: '1px solid rgba(255, 107, 157, 0.3)',
    borderRadius: '16px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    maxWidth: '300px',
  },
  supportText: {
    color: '#ccc',
    fontSize: '13px',
    lineHeight: '1.5',
    margin: 0,
  },
  
  // MODAL
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    background: '#1a1a1a',
    borderRadius: '20px',
    padding: '30px',
    maxWidth: '420px',
    width: '100%',
    border: '1px solid #333',
    position: 'relative',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  closeBtn: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    transition: 'transform 0.2s ease',
  },
  modalTitle: {
    color: 'white',
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '25px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  steps: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '25px',
  },
  step: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  stepNumber: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #7f00ff, #b84dff)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    flexShrink: 0,
    marginTop: '2px',
  },
  stepText: {
    color: '#ccc',
    fontSize: '15px',
    margin: '4px 0 0 0',
    lineHeight: '1.5',
  },
  urlBox: {
    display: 'flex',
    gap: '8px',
    width: '100%',
    marginTop: '10px',
  },
  urlInput: {
    flex: 1,
    padding: '10px 12px',
    background: '#0f0f0f',
    border: '1px solid #333',
    borderRadius: '8px',
    color: 'white',
    fontSize: '13px',
    outline: 'none',
  },
  copyBtn: {
    padding: '10px 16px',
    background: 'linear-gradient(135deg, #7f00ff, #b84dff)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px',
    transition: 'all 0.25s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    whiteSpace: 'nowrap',
  },
  divider: {
    textAlign: 'center',
    color: '#666',
    fontSize: '14px',
    margin: '10px 0',
  },
  quickInstallBtn: {
    width: '100%',
    padding: '14px 0',
    borderRadius: '12px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    border: 'none',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: 'white',
    boxShadow: '0 6px 18px rgba(16, 185, 129, 0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: '600',
  },
  quickInstallText: {
    color: '#888',
    fontSize: '13px',
    textAlign: 'center',
    margin: '5px 0 0 0',
  },
  supportSection: {
    background: 'rgba(255, 215, 0, 0.1)',
    border: '1px solid rgba(255, 215, 0, 0.3)',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  supportTitle: {
    color: 'white',
    fontSize: '15px',
    fontWeight: '600',
    margin: '0 0 6px 0',
  },
  supportDesc: {
    color: '#aaa',
    fontSize: '13px',
    lineHeight: '1.5',
    margin: 0,
  },
};