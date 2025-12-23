import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DownloadPage() {
  const navigate = useNavigate();
  const [showIOSModal, setShowIOSModal] = useState(false);

  const handleAndroidDownload = () => {
    // Descarga directa del APK
    const link = document.createElement('a');
    link.href = '/downloads/WeTalk.apk';
    link.download = 'WeTalk.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleIOSInstructions = () => {
    setShowIOSModal(true);
  };

  const copyURL = () => {
    navigator.clipboard.writeText(window.location.origin);
    alert("✅ URL copiada! Ahora pégala en Safari.");
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'black',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative'
    }}>
      {/* Botón Volver */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: 'none',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '999px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        ← Volver
      </button>

      {/* Logo */}
      <img 
        src="/wetalklogo.svg" 
        alt="WeTalk" 
        style={{ width: '150px', marginBottom: '20px' }}
      />

      {/* Título */}
      <h1 style={{ 
        fontSize: '28px', 
        fontWeight: '600',
        marginBottom: '10px',
        textAlign: 'center'
      }}>
        Descarga WeTalk
      </h1>

      <p style={{
        fontSize: '16px',
        opacity: 0.7,
        marginBottom: '40px',
        textAlign: 'center',
        maxWidth: '400px'
      }}>
        Instala la app en tu dispositivo
      </p>

      {/* Botones */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        width: '260px'
      }}>
        {/* Botón Android - Descarga APK */}
        <button
          onClick={handleAndroidDownload}
          className="btn primary"
          style={{
            padding: '14px 0',
            borderRadius: '999px',
            fontSize: '16px',
            cursor: 'pointer',
            border: 'none',
            background: 'white',
            color: 'black',
            boxShadow: '0 6px 18px rgba(255, 255, 255, 0.25)',
            transition: 'all 0.25s ease'
          }}
        >
          📱 Descargar para Android
        </button>

        {/* Botón iOS - Instrucciones */}
        <button
          onClick={handleIOSInstructions}
          className="btn omit"
          style={{
            padding: '14px 0',
            borderRadius: '999px',
            fontSize: '16px',
            cursor: 'pointer',
            border: 'none',
            background: 'linear-gradient(135deg, #7f00ff, #b84dff)',
            color: 'white',
            boxShadow: '0 6px 18px rgba(183, 77, 255, 0.35)',
            transition: 'all 0.25s ease'
          }}
        >
          🍎 Instalar en iPhone
        </button>
      </div>

      {/* Mensaje de apoyo */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        background: 'rgba(127, 0, 255, 0.1)',
        borderRadius: '12px',
        border: '1px solid rgba(127, 0, 255, 0.3)',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '14px', marginBottom: '10px' }}>
          💜 ¿Te gusta WeTalk?
        </p>
        <p style={{ fontSize: '13px', opacity: 0.8 }}>
          Ayúdanos a llegar a Play Store y App Store compartiendo la app con tus amigos!
        </p>
      </div>

      {/* Modal iOS */}
      {showIOSModal && (
        <div
          onClick={() => setShowIOSModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#1a1a1a',
              borderRadius: '16px',
              padding: '30px',
              maxWidth: '400px',
              width: '100%',
              border: '1px solid #333'
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600' }}>
                Instalar en iPhone
              </h2>
              <button
                onClick={() => setShowIOSModal(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: 'white',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                ×
              </button>
            </div>

            {/* Instrucciones */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginBottom: '20px'
            }}>
              <div style={{
                padding: '12px',
                background: 'rgba(127, 0, 255, 0.1)',
                borderRadius: '8px',
                fontSize: '14px'
              }}>
                <strong>1.</strong> Abre <strong>Safari</strong> en tu iPhone
              </div>
              
              <div style={{
                padding: '12px',
                background: 'rgba(127, 0, 255, 0.1)',
                borderRadius: '8px',
                fontSize: '14px'
              }}>
                <strong>2.</strong> Ve a: <code style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>wetalk-lac.vercel.app</code>
              </div>
              
              <div style={{
                padding: '12px',
                background: 'rgba(127, 0, 255, 0.1)',
                borderRadius: '8px',
                fontSize: '14px'
              }}>
                <strong>3.</strong> Toca el botón <strong>Compartir</strong> (cuadrado con flecha)
              </div>
              
              <div style={{
                padding: '12px',
                background: 'rgba(127, 0, 255, 0.1)',
                borderRadius: '8px',
                fontSize: '14px'
              }}>
                <strong>4.</strong> Selecciona <strong>"Agregar a pantalla de inicio"</strong>
              </div>
            </div>

            {/* Botón copiar URL */}
            <button
              onClick={copyURL}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #7f00ff, #b84dff)',
                border: 'none',
                color: 'white',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              📋 Copiar URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}