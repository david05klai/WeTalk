import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      navigate("/auth");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Error al cerrar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen">
      <h1 className="title">Configuración</h1>
      <p style={{ color: '#888', marginTop: '-15px' }}>Ajusta tu experiencia</p>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '15px', 
        width: '100%',
        maxWidth: '320px',
        marginTop: '30px'
      }}>
        {/* Botón de cerrar sesión */}
        <button
          onClick={() => setShowLogoutModal(true)}
          disabled={loading}
          style={{
            background: 'linear-gradient(135deg, #EF4444, #DC2626)',
            color: 'white',
            border: 'none',
            borderRadius: '14px',
            padding: '16px 20px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
            opacity: loading ? 0.6 : 1
          }}
          onMouseOver={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.5)';
            }
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.3)';
          }}
        >
          <LogOut size={20} />
          {loading ? "Cerrando..." : "Cerrar Sesión"}
        </button>

        <p style={{ 
          color: '#666', 
          fontSize: '14px', 
          textAlign: 'center',
          marginTop: '10px'
        }}>
          Más opciones próximamente...
        </p>
      </div>

      {/* Modal de confirmación */}
      {showLogoutModal && (
        <div 
          className="modal-overlay" 
          onClick={() => setShowLogoutModal(false)}
        >
          <div 
            className="modal" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '350px' }}
          >
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: '20px'
            }}>
              <AlertCircle size={64} color="#EF4444" />
              
              <h2 className="modal-title">¿Cerrar sesión?</h2>
              
              <p style={{ 
                color: '#888', 
                textAlign: 'center',
                fontSize: '15px',
                lineHeight: '1.6'
              }}>
                Tus datos están guardados. Podrás volver a iniciar sesión cuando quieras.
              </p>

              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '12px',
                width: '100%'
              }}>
                <button 
                  className="btn primary"
                  onClick={handleLogout}
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1
                  }}
                >
                  {loading ? "Cerrando..." : "Sí, cerrar sesión"}
                </button>
                
                <button 
                  className="close-modal"
                  onClick={() => setShowLogoutModal(false)}
                  disabled={loading}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}