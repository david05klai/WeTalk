import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Heart,
  Target,
  Calendar,
  Camera,
  BookOpen,
  Gamepad2,
  Star,
  Bell,
  TrendingUp,
  Users,
  AlertCircle,
  MessageCircle,
  Smile,
  Frown,
  Meh,
  HeartCrack,
  Zap,
  Copy,
  Check
} from "lucide-react";
import "./HomeApp.css";

// 🧹 Función para limpiar localStorage corrupto
function cleanCorruptedLocalStorage() {
  try {
    const keys = ['todayMood', 'moodDate', 'adviceRead'];
    keys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value && key === 'todayMood') {
        try {
          const parsed = JSON.parse(value);
          if (!parsed.iconName || typeof parsed.iconName !== 'string') {
            throw new Error('Invalid mood structure');
          }
        } catch {
          console.log(`🧹 Limpiando ${key} corrupto`);
          localStorage.removeItem(key);
        }
      }
    });
  } catch (error) {
    console.error('Error en limpieza:', error);
  }
}

// Ejecutar limpieza al cargar
cleanCorruptedLocalStorage();

export default function HomeApp() {
  const [showModal, setShowModal] = useState(false);
  const [showAdvice, setShowAdvice] = useState(false);
  const [todayMood, setTodayMood] = useState(null);
  const [shouldAskMood, setShouldAskMood] = useState(true);
  const [showMoodIcon, setShowMoodIcon] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const { userProfile, getPartnerProfile } = useAuth();
  const partner = getPartnerProfile();
  const navigate = useNavigate();

  // Mapeo de iconos para moods
  const iconMap = {
    Smile,
    Frown,
    Zap,
    Heart,
    HeartCrack,
    Meh
  };

  // Moods guardamos solo iconName
  const moods = [
    {
      iconName: "Smile",
      name: "Feliz",
      color: "#10B981",
      advice: "¡Qué bien! Aprovecha esta energía para compartir momentos especiales con tu pareja.",
      tip: "Hoy es un buen día para expresar tu amor y gratitud."
    },
    {
      iconName: "Frown",
      name: "Triste",
      color: "#6B7280",
      advice: "Está bien sentirse así. Habla con tu pareja, el apoyo mutuo fortalece la relación.",
      tip: "La comunicación abierta es clave en los momentos difíciles."
    },
    {
      iconName: "Zap",
      name: "Ansioso",
      color: "#EF4444",
      advice: "Respira profundo. Comparte tus preocupaciones, la comunicación reduce la ansiedad.",
      tip: "Recuerda: juntos pueden superar cualquier desafío."
    },
    {
      iconName: "Heart",
      name: "Enamorado",
      color: "#EC4899",
      advice: "¡Hermoso sentimiento! Exprésalo sin miedo. El amor crece cuando se comparte.",
      tip: "Un mensaje cariñoso puede alegrar el día de tu pareja."
    },
    {
      iconName: "HeartCrack",
      name: "Frustrado",
      color: "#F97316",
      advice: "Es normal sentir frustración. Tómate un momento antes de hablar.",
      tip: "La paciencia y el respeto son fundamentales en toda relación."
    },
  ];

  const features = [
    {
      id: "love-messages",
      Icon: Heart,
      title: "Mensajes de Amor",
      description: "Envía un mensaje dulce",
      gradient: "linear-gradient(135deg, #EC4899, #F472B6)"
    },
    {
      id: "challenges",
      Icon: Target,
      title: "Retos de Pareja",
      description: "Completa retos juntos",
      gradient: "linear-gradient(135deg, #8B5CF6, #A78BFA)"
    },
    {
      id: "calendar",
      Icon: Calendar,
      title: "Fechas Importantes",
      description: "Nunca olvides un momento",
      gradient: "linear-gradient(135deg, #3B82F6, #60A5FA)"
    },
    {
      id: "gallery",
      Icon: Camera,
      title: "Galería",
      description: "Momentos especiales",
      gradient: "linear-gradient(135deg, #F59E0B, #FBBF24)"
    },
    {
      id: "diary",
      Icon: BookOpen,
      title: "Diario Compartido",
      description: "Escribe sus historias",
      gradient: "linear-gradient(135deg, #10B981, #34D399)"
    },
    {
      id: "games",
      Icon: Gamepad2,
      title: "Juegos",
      description: "Diviértanse juntos",
      gradient: "linear-gradient(135deg, #EF4444, #F87171)"
    },
    {
      id: "wishlist",
      Icon: Star,
      title: "Buzón de Deseos",
      description: "Sueños por cumplir",
      gradient: "linear-gradient(135deg, #FBBF24, #FCD34D)"
    },
    {
      id: "reminders",
      Icon: Bell,
      title: "Recordatorios",
      description: "Detalles importantes",
      gradient: "linear-gradient(135deg, #06B6D4, #22D3EE)"
    },
    {
      id: "stats",
      Icon: TrendingUp,
      title: "Estadísticas",
      description: "Tu relación en números",
      gradient: "linear-gradient(135deg, #6366F1, #818CF8)"
    },
  ];

  useEffect(() => {
    try {
      const savedMood = localStorage.getItem("todayMood");
      const savedDate = localStorage.getItem("moodDate");
      const adviceRead = localStorage.getItem("adviceRead");
      const today = new Date().toDateString();

      if (savedMood) {
        try {
          const mood = JSON.parse(savedMood);
          
          if (!mood.iconName || !mood.name || !mood.color) {
            console.log("🧹 Limpiando datos corruptos de mood...");
            localStorage.removeItem("todayMood");
            localStorage.removeItem("moodDate");
            localStorage.removeItem("adviceRead");
            return;
          }

          if (savedDate === today) {
            setTodayMood(mood);
            setShouldAskMood(false);

            if (adviceRead === "true") {
              setShowMoodIcon(true);
            } else {
              setShowAdvice(true);
            }
          } else {
            console.log("🧹 Limpiando mood de días anteriores...");
            localStorage.removeItem("todayMood");
            localStorage.removeItem("moodDate");
            localStorage.removeItem("adviceRead");
          }
        } catch (parseError) {
          console.log("🧹 Error parseando mood, limpiando...");
          localStorage.removeItem("todayMood");
          localStorage.removeItem("moodDate");
          localStorage.removeItem("adviceRead");
        }
      }
    } catch (error) {
      console.error("❌ Error general cargando mood:", error);
      localStorage.removeItem("todayMood");
      localStorage.removeItem("moodDate");
      localStorage.removeItem("adviceRead");
    }
  }, []);

  const handleMoodSelect = (mood) => {
    const today = new Date().toDateString();
    localStorage.setItem("todayMood", JSON.stringify(mood));
    localStorage.setItem("moodDate", today);
    localStorage.removeItem("adviceRead");

    setTodayMood(mood);
    setShouldAskMood(false);
    setShowModal(false);
    setShowAdvice(true);
  };

  const handleAdviceClose = () => {
    localStorage.setItem("adviceRead", "true");
    setShowAdvice(false);
    setShowMoodIcon(true);
  };

  return (
    <div className="screen home-screen">
      {/* Header Profesional */}
      <div className="home-header-new">
        <div className="user-info">
          <h1 className="user-greeting">Hola, {userProfile?.name || "Usuario"}</h1>
          {partner ? (
            <div className="partner-status">
              <Users size={16} />
              <span>Conectado con {partner.name}</span>
            </div>
          ) : (
            <div className="partner-status disconnected">
              <Users size={16} />
              <span>Sin pareja conectada</span>
            </div>
          )}
        </div>
        <div className="points-badge">
          <Star size={18} />
          <span>{userProfile?.points || 0}</span>
        </div>
      </div>

      {/* Botón de Mood */}
      {shouldAskMood && (
        <div className="mood-card-new" onClick={() => setShowModal(true)}>
          <div className="mood-card-icon">
            <MessageCircle size={28} strokeWidth={2} />
          </div>
          <div className="mood-card-content">
            <h3 className="mood-card-title">¿Cómo te sientes hoy?</h3>
            <p className="mood-card-subtitle">Toca para contarnos</p>
          </div>
        </div>
      )}

      {/* Botón SOS */}
      <button className="sos-card-new" onClick={() => setActiveFeature('sos')}>
        <div className="sos-card-icon">
          <AlertCircle size={28} strokeWidth={2} />
        </div>
        <div className="sos-card-content">
          <h3 className="sos-card-title">Modo SOS</h3>
          <p className="sos-card-subtitle">¿Necesitas ayuda?</p>
        </div>
      </button>

      {/* Grid de funciones */}
      <div className="features-grid-new">
        {features.map((feature, index) => {
          const IconComponent = feature.Icon;
          if (!IconComponent) return null;
          
          return (
            <div
              key={feature.id}
              className="feature-card-new"
              onClick={() => setActiveFeature(feature.id)}
              style={{
                background: feature.gradient,
                animationDelay: `${index * 0.05}s`
              }}
            >
              <div className="feature-icon-wrapper">
                <IconComponent size={36} color="white" strokeWidth={2.5} />
              </div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-description">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Icono flotante de mood */}
      {showMoodIcon && todayMood && todayMood.iconName && iconMap[todayMood.iconName] && (
        <div className="floating-mood-new" onClick={() => setShowAdvice(true)}>
          {(() => {
            const MoodIcon = iconMap[todayMood.iconName];
            return <MoodIcon size={24} color="white" />;
          })()}
          <span>Ver consejo</span>
        </div>
      )}

      {/* Modal de selección de mood */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal mood-modal-new" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">¿Cómo te sientes hoy?</h2>
            <p className="modal-subtitle">Selecciona tu estado de ánimo</p>

            <div className="moods-grid-new">
              {moods.map((mood) => {
                const MoodIcon = iconMap[mood.iconName];
                if (!MoodIcon) return null;
                
                return (
                  <button
                    key={mood.name}
                    className="mood-btn-new"
                    onClick={() => handleMoodSelect(mood)}
                    style={{ borderColor: mood.color }}
                  >
                    <MoodIcon size={32} color={mood.color} strokeWidth={2} />
                    <span>{mood.name}</span>
                  </button>
                );
              })}
            </div>

            <button className="close-modal" onClick={() => setShowModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal de consejo */}
      {showAdvice && todayMood && todayMood.iconName && iconMap[todayMood.iconName] && (
        <div className="modal-overlay" onClick={handleAdviceClose}>
          <div className="modal advice-modal-new" onClick={(e) => e.stopPropagation()}>
            <div
              className="advice-badge"
              style={{ background: `linear-gradient(135deg, ${todayMood.color}, ${todayMood.color}99)` }}
            >
              {(() => {
                const MoodIcon = iconMap[todayMood.iconName];
                return <MoodIcon size={48} color="white" strokeWidth={2} />;
              })()}
              <h2>{todayMood.name}</h2>
            </div>

            <div className="advice-content-new">
              <h3>Consejo del día</h3>
              <p>{todayMood.advice}</p>
            </div>

            <div className="tip-content-new">
              <div className="tip-icon-new">
                <Star size={20} color="#b84dff" />
              </div>
              <p>{todayMood.tip}</p>
            </div>

            <button className="btn primary" onClick={handleAdviceClose}>
              Listo
            </button>
          </div>
        </div>
      )}

      {/* Modales */}
      {activeFeature && activeFeature !== 'sos' && activeFeature !== 'love-messages' && activeFeature !== 'challenges' && (
        <div className="modal-overlay" onClick={() => setActiveFeature(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">En desarrollo</h2>
            <p className="modal-subtitle">Esta función estará disponible pronto</p>
            <button className="btn primary" onClick={() => setActiveFeature(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {activeFeature === 'sos' && <SOSMode onClose={() => setActiveFeature(null)} />}
      {activeFeature === 'love-messages' && <LoveMessages onClose={() => setActiveFeature(null)} />}
      {activeFeature === 'challenges' && <Challenges onClose={() => setActiveFeature(null)} />}
    </div>
  );
}

function SOSMode({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <AlertCircle size={48} color="#EF4444" />
          <h2 className="modal-title">Modo SOS</h2>
          <p className="modal-subtitle">Funcionalidad en desarrollo</p>
        </div>
        <button className="btn primary" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

// 🔥 LOVE MESSAGES CON FIRESTORE
function LoveMessages({ onClose }) {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const { userProfile, getPartnerProfile } = useAuth();
  const [partner, setPartner] = useState(null);

  useEffect(() => {
    loadPartner();
  }, []);

  const loadPartner = async () => {
    const partnerData = await getPartnerProfile();
    setPartner(partnerData);
    loadTodayMessage(partnerData);
  };

  const loadTodayMessage = async (partnerData) => {
    try {
      setLoading(true);
      
      const { getTodayLoveMessage } = await import("../services/loveMessages");
      
      const userId = userProfile?.uid || "guest";
      const userName = userProfile?.name || "Usuario";
      const partnerName = partnerData?.name || "tu amor";
      
      const todayMessage = await getTodayLoveMessage(userId, userName, partnerName);
      
      setMessage(todayMessage);
      setLoading(false);
    } catch (error) {
      console.error("Error cargando mensaje:", error);
      setMessage("Cada día contigo es un regalo que atesoro ❤️");
      setLoading(false);
    }
  };

  const copyMessage = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal love-modal-new" onClick={(e) => e.stopPropagation()}>
        <div className="love-header-new">
          <Heart size={48} color="#EC4899" strokeWidth={2} />
          <h2 className="modal-title">Mensaje de Amor del Día</h2>
          <p className="modal-subtitle">Generado especialmente para ti ✨</p>
        </div>

        {loading ? (
          <div className="love-message-card-new" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
              <div style={{
                width: '40px', height: '40px',
                border: '4px solid rgba(255,255,255,0.3)',
                borderTop: '4px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ color: 'white', margin: 0 }}>Generando tu mensaje...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="love-message-card-new">
              <p>{message}</p>
            </div>

            <p style={{ color: '#888', fontSize: '13px', textAlign: 'center', margin: '10px 0' }}>
              ✨ Mañana tendrás un nuevo mensaje
            </p>

            <button 
              className="btn primary" 
              onClick={copyMessage} 
              disabled={loading}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
              <span>{copied ? "¡Copiado!" : "Copiar Mensaje"}</span>
            </button>
          </>
        )}

        <button className="close-modal" onClick={onClose}>
          Cerrar
        </button>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function Challenges({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <Target size={48} color="#8B5CF6" strokeWidth={2} />
          <h2 className="modal-title">Reto del Día</h2>
        </div>
        <p className="modal-subtitle">Funcionalidad en desarrollo</p>
        <button className="btn primary" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
