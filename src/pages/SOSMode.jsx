import { useState, useRef, useEffect } from 'react';
import { chatWithAssistant, generateReconciliationPhrase } from '../services/ai';
import './SOSMode.css';

// ===== ICONOS SVG PERSONALIZADOS =====
const CommunicationIcon = ({ size = 20, color = "#FF6B9D" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const JealousyIcon = ({ size = 20, color = "#FF6B9D" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M8 8l8 8M16 8l-8 8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DistanceIcon = ({ size = 20, color = "#FF6B9D" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
);

const TrustIcon = ({ size = 20, color = "#FF6B9D" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AnxietyIcon = ({ size = 20, color = "#FF6B9D" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ReconciliationIcon = ({ size = 20, color = "#FF6B9D" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SendIcon = ({ size = 20, color = "#FF6B9D" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={color}/>
  </svg>
);

const BackIcon = ({ size = 24, color = "#FFFFFF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M12 19l-7-7 7-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BotIcon = ({ size = 32, color = "#FF6B9D" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="8" width="16" height="12" rx="2" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="9" cy="13" r="1.5" fill={color}/>
    <circle cx="15" cy="13" r="1.5" fill={color}/>
    <path d="M9 17h6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 8V5M8 5h8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

function SOSMode() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hola, soy tu asistente de WeTalk. Estoy aquí para ayudarte con cualquier problema en tu relación. ¿Qué está pasando?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const messagesEndRef = useRef(null);

  const categories = [
    { id: 'communication', label: 'Comunicación', Icon: CommunicationIcon },
    { id: 'jealousy', label: 'Celos', Icon: JealousyIcon },
    { id: 'distance', label: 'Distancia', Icon: DistanceIcon },
    { id: 'trust', label: 'Confianza', Icon: TrustIcon },
    { id: 'anxiety', label: 'Ansiedad', Icon: AnxietyIcon },
    { id: 'reconciliation', label: 'Reconciliación', Icon: ReconciliationIcon }
  ];

  const quickMessages = [
    { label: 'Mensaje de Perdón', action: 'apology', color: '#FFC3A0' },
    { label: 'Reconciliación', action: 'reconciliation', color: '#FF8CC6' },
    { label: 'Ejercicio de Calma', action: 'breathing', color: '#4ECDC4' }
  ];

  // Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enviar mensaje
  const handleSendMessage = async (customMessage = null) => {
    const messageToSend = customMessage || inputMessage.trim();
    
    if (!messageToSend) return;

    const userMessage = {
      role: 'user',
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      let contextMessage = messageToSend;
      if (selectedCategory) {
        const category = categories.find(c => c.id === selectedCategory);
        contextMessage = `[Contexto: ${category.label}] ${messageToSend}`;
      }

      const aiResponse = await chatWithAssistant(contextMessage, conversationHistory);

      const assistantMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      
      const errorMessage = {
        role: 'assistant',
        content: 'Lo siento, tuve un problema. ¿Puedes intentar de nuevo?',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Mensajes rápidos
  const handleQuickMessage = async (action) => {
    setLoading(true);

    try {
      if (action === 'apology') {
        const phrase = await generateReconciliationPhrase('Quiero pedir perdón a mi pareja');
        handleSendMessage(`Ayúdame a mejorar esta frase de disculpa: "${phrase}"`);
      } else if (action === 'reconciliation') {
        const phrase = await generateReconciliationPhrase('Quiero reconciliarme con mi pareja');
        handleSendMessage(`Dame consejos para usar esta frase: "${phrase}"`);
      } else if (action === 'breathing') {
        const breathingMessage = {
          role: 'assistant',
          content: `Hagamos un ejercicio de respiración juntos:

1. Inhala profundamente por 4 segundos
2. Mantén el aire por 4 segundos
3. Exhala lentamente por 6 segundos
4. Repite 5 veces

Respira conmigo. Cuando termines, cuéntame cómo te sientes.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, breathingMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Seleccionar categoría
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    const category = categories.find(c => c.id === categoryId);
    
    const categoryMessage = {
      role: 'assistant',
      content: `Entiendo que estás pasando por un problema de ${category.label.toLowerCase()}. Cuéntame más sobre ello, estoy aquí para ayudarte.`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, categoryMessage]);
  };

  return (
    <div className="sos-container">
      {/* Header */}
      <header className="sos-header">
        <button className="sos-back" onClick={() => window.history.back()}>
          <BackIcon />
        </button>
        <div className="sos-title">
          <BotIcon size={28} />
          <div>
            <h1>Modo SOS</h1>
            <p>Asistente WeTalk</p>
          </div>
        </div>
      </header>

      {/* Categorías */}
      <div className="sos-categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => handleCategorySelect(cat.id)}
          >
            <cat.Icon size={16} color={selectedCategory === cat.id ? "#FFFFFF" : "#FF6B9D"} />
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Chat */}
      <div className="sos-chat">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.role === 'assistant' && (
              <div className="message-avatar">
                <BotIcon size={24} />
              </div>
            )}
            <div className="message-bubble">
              <p>{msg.content}</p>
              <span className="message-time">
                {msg.timestamp.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="message assistant">
            <div className="message-avatar">
              <BotIcon size={24} />
            </div>
            <div className="message-bubble loading">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Mensajes Rápidos */}
      <div className="sos-quick-messages">
        {quickMessages.map((qm, index) => (
          <button
            key={index}
            className="quick-message-btn"
            style={{ borderColor: qm.color }}
            onClick={() => handleQuickMessage(qm.action)}
            disabled={loading}
          >
            {qm.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="sos-input-container">
        <input
          type="text"
          className="sos-input"
          placeholder="Escribe tu mensaje..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={loading}
        />
        <button
          className="sos-send-btn"
          onClick={() => handleSendMessage()}
          disabled={loading || !inputMessage.trim()}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

export default SOSMode;
