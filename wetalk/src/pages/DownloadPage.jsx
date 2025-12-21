import { useState } from 'react';
import { Download, Apple, Smartphone, X, CheckCircle } from 'lucide-react';

export default function DownloadPage() {
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('https://wetalk-parejas.netlify.app/');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <img src="/logo.png" alt="WeTalk" style={styles.logo} />
        <h1 style={styles.title}>WeTalk</h1>
        <p style={styles.subtitle}>Descarga la app y conecta con tu pareja</p>

        <div style={styles.downloadButtons}>
          <button 
            onClick={() => window.location.href = 'https://wetalk-parejas.netlify.app/'}
            style={styles.downloadBtn}
            className="download-btn-android"
          >
            <Smartphone size={24} />
            <div style={styles.btnText}>
              <span style={styles.btnLabel}>Instalar en</span>
              <span style={styles.btnPlatform}>Android</span>
            </div>
          </button>

          <button 
            onClick={() => setShowIOSModal(true)}
            style={styles.downloadBtn}
            className="download-btn-ios"
          >
            <Apple size={24} />
            <div style={styles.btnText}>
              <span style={styles.btnLabel}>Instalar en</span>
              <span style={styles.btnPlatform}>iPhone</span>
            </div>
          </button>
        </div>

        <div style={styles.info}>
          <p style={styles.infoText}>🔒 100% segura y gratuita</p>
          <p style={styles.infoText}>💜 Diseñada para fortalecer tu relación</p>
        </div>
      </div>

      {showIOSModal && (
        <div style={styles.modalOverlay} onClick={() => setShowIOSModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.closeBtn}
              onClick={() => setShowIOSModal(false)}
            >
              <X size={24} />
            </button>

            <div style={styles.modalHeader}>
              <Apple size={64} color="#fff" />
              <h2 style={styles.modalTitle}>Instalar en iPhone</h2>
              <p style={styles.modalSubtitle}>Sigue estos 3 sencillos pasos</p>
            </div>

            <div style={styles.steps}>
              <div style={styles.step}>
                <div style={styles.stepNumber}>1</div>
                <div style={styles.stepContent}>
                  <h3 style={styles.stepTitle}>Abre Safari</h3>
                  <p style={styles.stepText}>
                    Asegúrate de abrir este enlace en el navegador Safari
                  </p>
                </div>
              </div>

              <div style={styles.step}>
                <div style={styles.stepNumber}>2</div>
                <div style={styles.stepContent}>
                  <h3 style={styles.stepTitle}>Toca el botón Compartir</h3>
                  <p style={styles.stepText}>
                    Busca el ícono de compartir □↑ en la parte inferior
                  </p>
                </div>
              </div>

              <div style={styles.step}>
                <div style={styles.stepNumber}>3</div>
                <div style={styles.stepContent}>
                  <h3 style={styles.stepTitle}>Añadir a pantalla de inicio</h3>
                  <p style={styles.stepText}>
                    Selecciona "Añadir a pantalla de inicio" y confirma
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.urlCopy}>
              <input 
                type="text" 
                value="https://wetalk-parejas.netlify.app/"
                readOnly
                style={styles.urlInput}
              />
              <button 
                onClick={handleCopy}
                style={styles.copyButton}
              >
                {copied ? <CheckCircle size={20} /> : <Download size={20} />}
              </button>
            </div>

            <p style={styles.finalNote}>
              ✨ Una vez instalada, la app funcionará como cualquier app nativa
            </p>
          </div>
        </div>
      )}

      <style>{`
        .download-btn-android {
          background: linear-gradient(135deg, #34D399, #10B981);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 20px 30px;
          border-radius: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
          color: white;
        }

        .download-btn-android:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(16, 185, 129, 0.5);
        }

        .download-btn-android:active {
          transform: scale(0.98);
        }

        .download-btn-ios {
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 20px 30px;
          border-radius: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
          color: white;
        }

        .download-btn-ios:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(37, 99, 235, 0.5);
        }

        .download-btn-ios:active {
          transform: scale(0.98);
        }
      `}</style>
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
    maxWidth: '500px',
    width: '100%',
  },
  logo: {
    width: '120px',
  },
  title: {
    color: 'white',
    fontSize: '36px',
    fontWeight: '700',
    margin: '-10px 0 0 0',
  },
  subtitle: {
    color: '#888',
    fontSize: '16px',
    textAlign: 'center',
    marginTop: '-15px',
  },
  downloadButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    maxWidth: '320px',
    marginTop: '10px',
  },
  downloadBtn: {
    color: 'white',
  },
  btnText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '2px',
  },
  btnLabel: {
    fontSize: '13px',
    opacity: 0.9,
  },
  btnPlatform: {
    fontSize: '18px',
    fontWeight: '600',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '10px',
  },
  infoText: {
    color: '#666',
    fontSize: '14px',
    textAlign: 'center',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
    borderRadius: '24px',
    padding: '30px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    border: '1px solid #333',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
  },
  closeBtn: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'white',
    transition: 'all 0.3s ease',
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '30px',
  },
  modalTitle: {
    color: 'white',
    fontSize: '24px',
    fontWeight: '600',
    margin: 0,
  },
  modalSubtitle: {
    color: '#888',
    fontSize: '14px',
    margin: 0,
  },
  steps: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '25px',
  },
  step: {
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-start',
  },
  stepNumber: {
    background: 'linear-gradient(135deg, #7f00ff, #b84dff)',
    color: 'white',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: '700',
    flexShrink: 0,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 5px 0',
  },
  stepText: {
    color: '#aaa',
    fontSize: '14px',
    lineHeight: '1.5',
    margin: 0,
  },
  urlCopy: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    background: '#1a1a1a',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #2a2a2a',
  },
  urlInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: '#888',
    fontSize: '13px',
    outline: 'none',
  },
  copyButton: {
    background: 'linear-gradient(135deg, #7f00ff, #b84dff)',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 12px',
    cursor: 'pointer',
    color: 'white',
    transition: 'all 0.3s ease',
  },
  finalNote: {
    color: '#666',
    fontSize: '13px',
    textAlign: 'center',
    margin: 0,
    lineHeight: '1.5',
  },
};