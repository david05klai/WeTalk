import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, AlertCircle, Copy, Check, Users, UserX } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [partnerCode, setPartnerCode] = useState('');
  const [partner, setPartner] = useState(null);
  const [copied, setCopied] = useState(false);
  const [connectLoading, setConnectLoading] = useState(false);
  const navigate = useNavigate();
  const { logout, userProfile, connectWithPartner, getPartnerProfile } = useAuth();

  useEffect(() => {
    loadPartner();
  }, [userProfile]);

  async function loadPartner() {
    const partnerData = await getPartnerProfile();
    setPartner(partnerData);
  }

  const handleConnect = async () => {
    if (!partnerCode || partnerCode.length < 6) {
      alert('Ingresa un código válido');
      return;
    }

    try {
      setConnectLoading(true);
      const result = await connectWithPartner(partnerCode);
      alert(`¡Conectado con ${result.name}! 🎉`);
      setPartnerCode('');
      loadPartner();
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setConnectLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(userProfile?.partnerCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        gap: '20px', 
        width: '100%',
        maxWidth: '400px',
        marginTop: '30px'
      }}>
        {/* Perfil del usuario */}
        <div style={{
          background: 'var(--card-bg)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h2 style={{ fontSize: '18px', marginBottom: '12px', color: '#fff' }}>Mi Perfil</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ color: '#888' }}><strong style={{ color: '#fff' }}>Nombre:</strong> {userProfile?.name}</p>
            <p style={{ color: '#888' }}><strong style={{ color: '#fff' }}>Email:</strong> {userProfile?.email}</p>
          </div>
        </div>

        {/* Código de conexión */}
        <div style={{
          background: 'var(--card-bg)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px', color: '#fff' }}>Tu Código de Conexión</h2>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>
            Comparte este código con tu pareja
          </p>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '16px',
            borderRadius: '12px',
            border: '2px dashed var(--primary)'
          }}>
            <span style={{
              flex: 1,
              fontSize: '28px',
              fontWeight: '700',
              color: 'var(--primary)',
              letterSpacing: '3px',
              textAlign: 'center'
            }}>
              {userProfile?.partnerCode || 'XXXXXX'}
            </span>
            <button
              onClick={copyCode}
              style={{
                padding: '12px',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        {/* Estado de conexión */}
        {partner ? (
          <div style={{
            background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(78, 205, 196, 0.05))',
            borderRadius: '16px',
            padding: '20px',
            border: '2px solid rgba(78, 205, 196, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <Users size={32} color="#4ECDC4" />
              <div>
                <h2 style={{ fontSize: '16px', marginBottom: '4px', color: '#fff' }}>Conectado con</h2>
                <p style={{ fontSize: '20px', fontWeight: '700', color: '#4ECDC4', margin: 0 }}>
                  {partner.name}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            background: 'var(--card-bg)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h2 style={{ fontSize: '18px', marginBottom: '8px', color: '#fff' }}>Conectar con Pareja</h2>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>
              Ingresa el código de tu pareja
            </p>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                placeholder="Código"
                value={partnerCode}
                onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  textAlign: 'center',
                  letterSpacing: '2px',
                  fontWeight: '600'
                }}
              />
              <button
                onClick={handleConnect}
                disabled={connectLoading || !partnerCode}
                style={{
                  padding: '14px 24px',
                  background: connectLoading || !partnerCode 
                    ? 'rgba(139, 92, 246, 0.3)' 
                    : 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: connectLoading || !partnerCode ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap',
                  opacity: connectLoading || !partnerCode ? 0.5 : 1
                }}
              >
                {connectLoading ? 'Conectando...' : 'Conectar'}
              </button>
            </div>
          </div>
        )}

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
            opacity: loading ? 0.6 : 1,
            marginTop: '20px'
          }}
        >
          <LogOut size={20} />
          {loading ? "Cerrando..." : "Cerrar Sesión"}
        </button>
      </div>

      {/* Modal de confirmación */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '350px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <AlertCircle size={64} color="#EF4444" />
              <h2 className="modal-title">¿Cerrar sesión?</h2>
              <p style={{ color: '#888', textAlign: 'center', fontSize: '15px', lineHeight: '1.6' }}>
                Tus datos están guardados. Podrás volver a iniciar sesión cuando quieras.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
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
                <button className="close-modal" onClick={() => setShowLogoutModal(false)} disabled={loading}>
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
