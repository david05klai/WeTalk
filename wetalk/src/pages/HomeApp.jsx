import { useState, useEffect } from "react";
import { Heart, Target, Calendar, Camera, BookOpen, Gamepad2, Star, Bell, AlertCircle, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeApp() {
  const [showModal, setShowModal] = useState(false);
  const [showAdvice, setShowAdvice] = useState(false);
  const [todayMood, setTodayMood] = useState(null);
  const [shouldAskMood, setShouldAskMood] = useState(true);
  const [showMoodIcon, setShowMoodIcon] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const navigate = useNavigate();

  const moods = [
    { 
      emoji: "😊", 
      name: "Feliz", 
      color: "#FFD700",
      advice: "¡Qué bien! Aprovecha esta energía para compartir momentos especiales con tu pareja.",
      tip: "Hoy es un buen día para expresar tu amor y gratitud."
    },
    { 
      emoji: "😔", 
      name: "Triste", 
      color: "#6B7280",
      advice: "Está bien sentirse así. Habla con tu pareja, el apoyo mutuo fortalece la relación.",
      tip: "La comunicación abierta es clave en los momentos difíciles."
    },
    { 
      emoji: "😰", 
      name: "Ansioso/a", 
      color: "#EF4444",
      advice: "Respira profundo. Comparte tus preocupaciones, la comunicación reduce la ansiedad.",
      tip: "Recuerda: juntos pueden superar cualquier desafío."
    },
    { 
      emoji: "😍", 
      name: "Enamorado/a", 
      color: "#EC4899",
      advice: "¡Hermoso sentimiento! Exprésalo sin miedo. El amor crece cuando se comparte.",
      tip: "Un mensaje cariñoso puede alegrar el día de tu pareja."
    },
    { 
      emoji: "😤", 
      name: "Frustrado/a", 
      color: "#F97316",
      advice: "Es normal sentir frustración. Tómate un momento antes de hablar.",
      tip: "La paciencia y el respeto son fundamentales en toda relación."
    },
  ];

  const features = [
    { 
      id: "love-messages", 
      icon: Heart, 
      title: "Mensajes de Amor", 
      description: "Envía un mensaje dulce diario",
      color: "#EC4899",
      gradient: "linear-gradient(135deg, #EC4899, #F472B6)"
    },
    { 
      id: "challenges", 
      icon: Target, 
      title: "Retos de Pareja", 
      description: "Completa retos juntos",
      color: "#8B5CF6",
      gradient: "linear-gradient(135deg, #8B5CF6, #A78BFA)"
    },
    { 
      id: "calendar", 
      icon: Calendar, 
      title: "Fechas Importantes", 
      description: "Nunca olvides un momento",
      color: "#3B82F6",
      gradient: "linear-gradient(135deg, #3B82F6, #60A5FA)"
    },
    { 
      id: "gallery", 
      icon: Camera, 
      title: "Galería de Recuerdos", 
      description: "Momentos especiales juntos",
      color: "#F59E0B",
      gradient: "linear-gradient(135deg, #F59E0B, #FBBF24)"
    },
    { 
      id: "diary", 
      icon: BookOpen, 
      title: "Diario Compartido", 
      description: "Escribe sus historias",
      color: "#10B981",
      gradient: "linear-gradient(135deg, #10B981, #34D399)"
    },
    { 
      id: "games", 
      icon: Gamepad2, 
      title: "Juegos de Pareja", 
      description: "Diviértanse juntos",
      color: "#EF4444",
      gradient: "linear-gradient(135deg, #EF4444, #F87171)"
    },
    { 
      id: "wishlist", 
      icon: Star, 
      title: "Buzón de Deseos", 
      description: "Sueños por cumplir",
      color: "#F59E0B",
      gradient: "linear-gradient(135deg, #FBBF24, #FCD34D)"
    },
    { 
      id: "reminders", 
      icon: Bell, 
      title: "Recordatorios", 
      description: "Detalles que importan",
      color: "#06B6D4",
      gradient: "linear-gradient(135deg, #06B6D4, #22D3EE)"
    },
    { 
      id: "stats", 
      icon: TrendingUp, 
      title: "Estadísticas", 
      description: "Tu relación en números",
      color: "#8B5CF6",
      gradient: "linear-gradient(135deg, #6366F1, #818CF8)"
    },
  ];

  useEffect(() => {
    const savedMood = localStorage.getItem("todayMood");
    const savedDate = localStorage.getItem("moodDate");
    const adviceRead = localStorage.getItem("adviceRead");
    const today = new Date().toDateString();

    if (savedMood && savedDate === today) {
      setTodayMood(JSON.parse(savedMood));
      setShouldAskMood(false);
      
      if (adviceRead === "true") {
        setShowMoodIcon(true);
      } else {
        setShowAdvice(true);
      }
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
    <div className="home-header">
      
      <h1 className="title">WeTalk</h1>
      <p className="subtitle">Tu espacio de conexión 💜</p>
    </div>

      {shouldAskMood && (
        <div className="mood-section">
          <button 
            className="mood-compact-btn" 
            onClick={() => setShowModal(true)}
          >
            <span className="mood-icon">💭</span>
            <div className="mood-text-container">
              <span className="mood-label">¿Cómo te sientes hoy?</span>
              <span className="mood-sublabel">Toca para contarnos</span>
            </div>
          </button>
        </div>
      )}

      <button 
        className="sos-button"
        onClick={() => setActiveFeature('sos')}
      >
        <AlertCircle size={24} />
        <span>Modo SOS</span>
        <span className="sos-subtitle">¿Necesitas ayuda?</span>
      </button>

      <div className="features-grid">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <div 
              key={feature.id}
              className="feature-card"
              onClick={() => setActiveFeature(feature.id)}
              style={{ background: feature.gradient }}
            >
              <IconComponent size={32} color="white" strokeWidth={2.5} />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          );
        })}
      </div>

      {showMoodIcon && todayMood && (
        <div className="floating-mood" onClick={() => setShowAdvice(true)}>
          <span className="floating-emoji">{todayMood.emoji}</span>
          <span className="floating-label">Ver consejo</span>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">¿Cómo te sientes hoy?</h2>
            <p className="modal-subtitle">Selecciona tu estado de ánimo</p>
            
            <div className="moods">
              {moods.map((mood) => (
                <button
                  key={mood.name}
                  className="mood-btn"
                  onClick={() => handleMoodSelect(mood)}
                  style={{ borderLeft: `4px solid ${mood.color}` }}
                >
                  <span className="mood-emoji">{mood.emoji}</span>
                  <span className="mood-name-text">{mood.name}</span>
                </button>
              ))}
            </div>

            <button className="close-modal" onClick={() => setShowModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {showAdvice && todayMood && (
        <div className="modal-overlay">
          <div className="modal advice-modal" onClick={(e) => e.stopPropagation()}>
            <div 
              className="mood-badge-modal" 
              style={{ background: `linear-gradient(135deg, ${todayMood.color}, ${todayMood.color}99)` }}
            >
              <span className="mood-emoji-big">{todayMood.emoji}</span>
              <h2 className="mood-name-big">{todayMood.name}</h2>
            </div>

            <div className="advice-content">
              <h3>💜 Consejo del día</h3>
              <p>{todayMood.advice}</p>
            </div>

            <div className="tip-content">
              <span className="tip-icon">💡</span>
              <p>{todayMood.tip}</p>
            </div>

            <button className="btn primary" onClick={handleAdviceClose}>
              ¡Listo!
            </button>
          </div>
        </div>
      )}

      {activeFeature && (
        <FeatureModal 
          featureId={activeFeature} 
          onClose={() => setActiveFeature(null)} 
        />
      )}
    </div>
  );
}



// ============================================
// COMPONENTE DE MODAL DE FUNCIONES
// ============================================

function FeatureModal({ featureId, onClose }) {
  if (featureId === 'sos') {
    return <SOSMode onClose={onClose} />;
  }

  if (featureId === 'love-messages') {
    return <LoveMessages onClose={onClose} />;
  }

  if (featureId === 'challenges') {
    return <Challenges onClose={onClose} />;
  }

  // Para las demás funciones (pronto las implementaremos)
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal feature-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">En desarrollo</h2>
        <p className="modal-subtitle">Esta función estará disponible pronto 🚀</p>
        <button className="btn primary" onClick={onClose}>
          Volver
        </button>
      </div>
    </div>
  );
}

// ============================================
// 🆘 MODO SOS
// ============================================

function SOSMode({ onClose }) {
  const [step, setStep] = useState('menu');
  const [breathCount, setBreathCount] = useState(0);
  const [pauseMinutes, setPauseMinutes] = useState(null);

  const breathExercise = () => {
    setStep('breathing');
    setBreathCount(0);
  };

  const startPause = (minutes) => {
    setPauseMinutes(minutes);
    setStep('pause');
    setTimeout(() => {
      alert(`✅ Tiempo cumplido. ¿Están listos para hablar con calma?`);
      setStep('menu');
    }, minutes * 60 * 1000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal sos-modal" onClick={(e) => e.stopPropagation()}>
        {step === 'menu' && (
          <>
            <div className="sos-header">
              <AlertCircle size={48} color="#EF4444" />
              <h2 className="modal-title">Modo SOS 🆘</h2>
              <p className="modal-subtitle">Respira, todo tiene solución</p>
            </div>

            <div className="sos-options">
              <button className="sos-option" onClick={breathExercise}>
                <span className="sos-emoji">🫁</span>
                <div>
                  <strong>Ejercicio de Respiración</strong>
                  <p>Cálmate con respiración guiada</p>
                </div>
              </button>

              <button className="sos-option" onClick={() => setStep('tips')}>
                <span className="sos-emoji">💬</span>
                <div>
                  <strong>Frases para Comunicar</strong>
                  <p>Cómo expresarte sin atacar</p>
                </div>
              </button>

              <button className="sos-option" onClick={() => setStep('pause-select')}>
                <span className="sos-emoji">⏸️</span>
                <div>
                  <strong>Tomar una Pausa</strong>
                  <p>Tiempo para reflexionar</p>
                </div>
              </button>

              <button className="sos-option" onClick={() => setStep('reconciliation')}>
                <span className="sos-emoji">🤝</span>
                <div>
                  <strong>Iniciar Reconciliación</strong>
                  <p>Mensajes para hacer las paces</p>
                </div>
              </button>
            </div>

            <button className="btn secondary" onClick={onClose}>
              Cerrar
            </button>
          </>
        )}

        {step === 'breathing' && (
          <BreathingExercise onComplete={() => setStep('menu')} />
        )}

        {step === 'tips' && (
          <CommunicationTips onBack={() => setStep('menu')} />
        )}

        {step === 'pause-select' && (
          <>
            <h2 className="modal-title">¿Cuánto tiempo necesitan?</h2>
            <p className="modal-subtitle">Tómense un tiempo para calmarse</p>
            
            <div className="pause-options">
              <button className="pause-btn" onClick={() => startPause(5)}>
                5 minutos
              </button>
              <button className="pause-btn" onClick={() => startPause(15)}>
                15 minutos
              </button>
              <button className="pause-btn" onClick={() => startPause(30)}>
                30 minutos
              </button>
            </div>

            <button className="btn secondary" onClick={() => setStep('menu')}>
              Volver
            </button>
          </>
        )}

        {step === 'pause' && (
          <>
            <h2 className="modal-title">⏸️ Pausa Activa</h2>
            <p className="pause-text">
              Tómense {pauseMinutes} minutos para calmarse.<br/>
              Respiren, piensen en lo que quieren decir.<br/>
              Los notificaremos cuando termine el tiempo.
            </p>
            <div className="pause-timer">
              ⏱️ {pauseMinutes} min
            </div>
            <button className="btn secondary" onClick={() => setStep('menu')}>
              Cancelar pausa
            </button>
          </>
        )}

        {step === 'reconciliation' && (
          <ReconciliationMessages onBack={() => setStep('menu')} />
        )}
      </div>
    </div>
  );
}

function BreathingExercise({ onComplete }) {
  const [phase, setPhase] = useState('inhale');
  const [count, setCount] = useState(4);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (cycles >= 3) {
      setTimeout(onComplete, 2000);
      return;
    }

    const timer = setInterval(() => {
      setCount(prev => {
        if (prev === 1) {
          if (phase === 'inhale') {
            setPhase('hold');
            return 4;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return 4;
          } else {
            setCycles(c => c + 1);
            setPhase('inhale');
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, cycles, onComplete]);

  const phaseText = {
    inhale: 'Inhala profundamente',
    hold: 'Mantén el aire',
    exhale: 'Exhala lentamente'
  };

  return (
    <div className="breathing-container">
      <div className={`breathing-circle ${phase}`}>
        <span className="breath-count">{count}</span>
      </div>
      <h3 className="breath-text">{phaseText[phase]}</h3>
      <p className="breath-cycle">Ciclo {cycles + 1} de 3</p>
    </div>
  );
}

function CommunicationTips({ onBack }) {
  const tips = [
    '"Me siento _____ cuando _____"',
    '"Necesito que entiendas que _____"',
    '"¿Podemos hablar de _____ con calma?"',
    '"Esto me duele porque _____"',
    '"Te amo, pero necesito que _____"',
    '"Entiendo tu punto, pero yo siento _____"'
  ];

  return (
    <>
      <h2 className="modal-title">💬 Frases para Comunicar</h2>
      <p className="modal-subtitle">Usa estas frases para expresarte mejor</p>
      
      <div className="tips-list">
        {tips.map((tip, i) => (
          <div key={i} className="tip-item">
            <span className="tip-number">{i + 1}</span>
            <p>{tip}</p>
          </div>
        ))}
      </div>

      <div className="sos-reminder">
        <strong>Recuerda:</strong> Habla desde el "yo", no desde el "tú". 
        Evita culpar, mejor expresa cómo te sientes.
      </div>

      <button className="btn primary" onClick={onBack}>
        Volver
      </button>
    </>
  );
}

function ReconciliationMessages({ onBack }) {
  const messages = [
    "Siento mucho lo que pasó. ¿Podemos hablar?",
    "Te amo y no quiero pelear. Hablemos con calma.",
    "Lamento si te lastimé. No era mi intención.",
    "Sé que ambos estamos molestos, pero podemos solucionarlo.",
    "Eres importante para mí. No quiero que esto nos separe.",
  ];

  const copyMessage = (msg) => {
    navigator.clipboard.writeText(msg);
    alert("✅ Mensaje copiado. Ahora envíaselo 💜");
  };

  return (
    <>
      <h2 className="modal-title">🤝 Mensajes de Reconciliación</h2>
      <p className="modal-subtitle">Copia y envía uno de estos mensajes</p>
      
      <div className="reconciliation-list">
        {messages.map((msg, i) => (
          <div key={i} className="reconciliation-item" onClick={() => copyMessage(msg)}>
            <p>{msg}</p>
            <span className="copy-icon">📋</span>
          </div>
        ))}
      </div>

      <button className="btn primary" onClick={onBack}>
        Volver
      </button>
    </>
  );
}

// ============================================
// 💌 MENSAJES DE AMOR
// ============================================

function LoveMessages({ onClose }) {
  const [todayMessage, setTodayMessage] = useState(null);

  const messages = [
    "Cada día contigo es un regalo que atesoro 💝",
    "Tu sonrisa ilumina mis días más oscuros ☀️",
    "Gracias por amarme tal como soy 💜",
    "Contigo, el amor se siente como magia ✨",
    "Eres mi lugar favorito en el mundo 🌍",
    "No necesito más, te tengo a ti 💕",
    "Mi corazón late más fuerte cuando estás cerca 💗",
    "Eres la mejor decisión que he tomado 🎯",
    "Tu amor me hace mejor persona cada día 🌱",
    "Enamorarme de ti fue lo más fácil que he hecho 😍"
  ];

  useEffect(() => {
    const saved = localStorage.getItem("todayLoveMessage");
    const savedDate = localStorage.getItem("loveMessageDate");
    const today = new Date().toDateString();

    if (saved && savedDate === today) {
      setTodayMessage(saved);
    } else {
      const random = messages[Math.floor(Math.random() * messages.length)];
      setTodayMessage(random);
      localStorage.setItem("todayLoveMessage", random);
      localStorage.setItem("loveMessageDate", today);
    }
  }, []);

  const copyMessage = () => {
    navigator.clipboard.writeText(todayMessage);
    alert("✅ Mensaje copiado! Ahora envíaselo a tu pareja 💜");
  };

  const newMessage = () => {
    const random = messages[Math.floor(Math.random() * messages.length)];
    setTodayMessage(random);
    localStorage.setItem("todayLoveMessage", random);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal love-modal" onClick={(e) => e.stopPropagation()}>
        <div className="love-header">
          <Heart size={48} color="#EC4899" fill="#EC4899" />
          <h2 className="modal-title">Mensaje de Amor del Día</h2>
        </div>

        <div className="love-message-card">
          <p className="love-message-text">{todayMessage}</p>
        </div>

        <div className="love-buttons">
          <button className="btn primary" onClick={copyMessage}>
            📋 Copiar Mensaje
          </button>
          <button className="btn secondary" onClick={newMessage}>
            🔄 Otro Mensaje
          </button>
        </div>

        <button className="close-modal" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

// ============================================
// 🎯 RETOS DE PAREJA
// ============================================

function Challenges({ onClose }) {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [completedToday, setCompletedToday] = useState(false);

  const challenges = [
    { emoji: "🎤", text: "Envía un audio de 30 seg diciendo lo que amas de tu pareja", points: 10 },
    { emoji: "💌", text: "Escribe una carta de amor a mano (o digital) y envíasela", points: 15 },
    { emoji: "📸", text: "Tómense una selfie juntos y guárdenla en Recuerdos", points: 5 },
    { emoji: "🍽️", text: "Planea una cita sorpresa para esta semana", points: 20 },
    { emoji: "🎁", text: "Dale un detalle pequeño sin motivo", points: 10 },
    { emoji: "💬", text: "Pregúntale sobre su día y ESCUCHA activamente", points: 5 },
    { emoji: "🤗", text: "Dale un abrazo de 20 segundos (aumenta la oxitocina)", points: 5 },
    { emoji: "☕", text: "Prepárale su bebida favorita sin que lo pida", points: 10 },
    { emoji: "📱", text: "No uses el celular durante 1 hora estando juntos", points: 15 },
    { emoji: "🌟", text: "Dile 3 cosas que admiras de él/ella", points: 10 }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("todayChallenge");
    const savedDate = localStorage.getItem("challengeDate");
    const completed = localStorage.getItem("challengeCompleted");
    const today = new Date().toDateString();

    if (saved && savedDate === today) {
      setCurrentChallenge(JSON.parse(saved));
      setCompletedToday(completed === "true");
    } else {
      const random = challenges[Math.floor(Math.random() * challenges.length)];
      setCurrentChallenge(random);
      localStorage.setItem("todayChallenge", JSON.stringify(random));
      localStorage.setItem("challengeDate", today);
      localStorage.removeItem("challengeCompleted");
    }
  }, []);

  const completeChallenge = () => {
    const totalPoints = parseInt(localStorage.getItem("totalPoints") || "0");
    localStorage.setItem("totalPoints", (totalPoints + currentChallenge.points).toString());
    localStorage.setItem("challengeCompleted", "true");
    setCompletedToday(true);
    alert(`🎉 ¡Reto completado! +${currentChallenge.points} puntos`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal challenge-modal" onClick={(e) => e.stopPropagation()}>
        <div className="challenge-header">
          <Target size={48} color="#8B5CF6" />
          <h2 className="modal-title">Reto del Día</h2>
          <div className="challenge-points">
            🏆 {localStorage.getItem("totalPoints") || "0"} puntos totales
          </div>
        </div>

        {currentChallenge && (
          <div className="challenge-card">
            <span className="challenge-emoji">{currentChallenge.emoji}</span>
            <p className="challenge-text">{currentChallenge.text}</p>
            <div className="challenge-reward">
              +{currentChallenge.points} puntos
            </div>
          </div>
        )}

        {!completedToday ? (
          <button className="btn primary" onClick={completeChallenge}>
            ✅ Marcar como completado
          </button>
        ) : (
          <div className="challenge-completed">
            <span className="check-icon">✅</span>
            <p>¡Reto completado hoy!</p>
            <p className="challenge-next">Vuelve mañana para un nuevo reto</p>
          </div>
        )}

        <button className="close-modal" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}