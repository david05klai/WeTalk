import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../config/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Trophy, Flame, CheckCircle, MessageCircle, Heart, Sparkles, Clock, Star, Target, ArrowLeft, Upload, Eye, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allChallenges } from '../data/challengesData';
import './Challenges.css';

export default function Challenges() {
  const { currentUser, userProfile, getPartnerProfile } = useAuth();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coupleData, setCoupleData] = useState(null);
  const [currentBlock, setCurrentBlock] = useState(0); // Bloque actual desbloqueado
  const [responses, setResponses] = useState({}); // Respuestas del usuario
  const [partnerResponses, setPartnerResponses] = useState({}); // Respuestas de la pareja
  const [activeChallenge, setActiveChallenge] = useState(null); // Reto activo para responder
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadChallengesData();
  }, [userProfile]);

  async function loadChallengesData() {
    try {
      setLoading(true);
      
      const partnerData = await getPartnerProfile();
      if (!partnerData) {
        setLoading(false);
        return;
      }
      setPartner(partnerData);

      const coupleId = createCoupleId(currentUser.uid, partnerData.uid);
      const coupleRef = doc(db, 'couples_challenges', coupleId);
      const coupleSnap = await getDoc(coupleRef);

      if (coupleSnap.exists()) {
        const data = coupleSnap.data();
        setCoupleData(data);
        setCurrentBlock(data.currentBlock || 0);
        setResponses(data.responses?.[currentUser.uid] || {});
        setPartnerResponses(data.responses?.[partnerData.uid] || {});
      } else {
        // Crear documento inicial
        await setDoc(coupleRef, {
          currentBlock: 0,
          responses: {
            [currentUser.uid]: {},
            [partnerData.uid]: {}
          },
          createdAt: new Date().toISOString()
        });
        setCurrentBlock(0);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error cargando datos:', error);
      setLoading(false);
    }
  }

  function createCoupleId(uid1, uid2) {
    return [uid1, uid2].sort().join('_');
  }

  function getBlockChallenges() {
    const startIndex = currentBlock * 3;
    return allChallenges.slice(startIndex, startIndex + 3);
  }

  function canUnlockNextBlock() {
    const blockChallenges = getBlockChallenges();
    
    // Verificar que ambos usuarios completaron los 3 retos del bloque
    return blockChallenges.every(challenge => {
      const myResponse = responses[challenge.id];
      const partnerResponse = partnerResponses[challenge.id];
      return myResponse && partnerResponse;
    });
  }

  async function unlockNextBlock() {
    try {
      if (!partner) return;
      
      const coupleId = createCoupleId(currentUser.uid, partner.uid);
      const coupleRef = doc(db, 'couples_challenges', coupleId);
      
      const newBlock = currentBlock + 1;
      
      await updateDoc(coupleRef, {
        currentBlock: newBlock
      });

      setCurrentBlock(newBlock);
      alert('🎉 ¡Nuevo bloque de retos desbloqueado!');
    } catch (error) {
      console.error('Error desbloqueando bloque:', error);
      alert('Error al desbloquear nuevos retos');
    }
  }

  async function handleSubmitResponse(challengeId, response) {
    try {
      if (!partner) return;

      const coupleId = createCoupleId(currentUser.uid, partner.uid);
      const coupleRef = doc(db, 'couples_challenges', coupleId);

      const newResponses = {
        ...responses,
        [challengeId]: {
          value: response,
          completedAt: new Date().toISOString()
        }
      };

      await updateDoc(coupleRef, {
        [`responses.${currentUser.uid}`]: newResponses
      });

      setResponses(newResponses);
      setActiveChallenge(null);
      alert('✅ Respuesta enviada correctamente');

      // Recargar para ver si se puede desbloquear el siguiente bloque
      await loadChallengesData();
    } catch (error) {
      console.error('Error enviando respuesta:', error);
      alert('Error al enviar respuesta');
    }
  }

  async function handlePhotoUpload(challengeId, file) {
    try {
      if (!file || !partner) return;

      setUploadingPhoto(true);
      const coupleId = createCoupleId(currentUser.uid, partner.uid);
      const storageRef = ref(storage, `challenges/${coupleId}/${challengeId}_${currentUser.uid}_${Date.now()}`);
      
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      await handleSubmitResponse(challengeId, photoURL);
      setUploadingPhoto(false);
    } catch (error) {
      console.error('Error subiendo foto:', error);
      alert('Error al subir la foto');
      setUploadingPhoto(false);
    }
  }

  function getCategoryIcon(category) {
    switch(category) {
      case 'comunicacion': 
        return <MessageCircle size={20} color="#7f00ff" strokeWidth={2} />;
      case 'romance': 
        return <Heart size={20} color="#EC4899" strokeWidth={2} />;
      case 'diversion': 
        return <Sparkles size={20} color="#F59E0B" strokeWidth={2} />;
      default: 
        return <Target size={20} color="#7f00ff" strokeWidth={2} />;
    }
  }

  if (loading) {
    return (
      <div className="challenges-container">
        <div className="challenges-loading">
          <div className="spinner"></div>
          <p>Cargando retos...</p>
        </div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="challenges-container">
        <div className="challenges-header-top">
          <button className="back-btn-challenges" onClick={() => navigate('/app')}>
            <ArrowLeft size={24} />
          </button>
          <h1>Retos del Día</h1>
        </div>
        <div className="challenges-loading">
          <Target size={64} color="#888" strokeWidth={1.5} />
          <p style={{ fontSize: '18px', fontWeight: '600', marginTop: '20px' }}>
            Necesitas estar conectado con tu pareja
          </p>
          <button 
            className="btn primary" 
            onClick={() => navigate('/app/settings')}
            style={{ marginTop: '20px' }}
          >
            Ir a Configuración
          </button>
        </div>
      </div>
    );
  }

  const blockChallenges = getBlockChallenges();
  const canUnlock = canUnlockNextBlock();
  const totalBlocks = Math.ceil(allChallenges.length / 3);

  return (
    <div className="challenges-container">
      {/* Header */}
      <div className="challenges-header-top">
        <button className="back-btn-challenges" onClick={() => navigate('/app')}>
          <ArrowLeft size={24} />
        </button>
        <h1>Retos de Pareja</h1>
      </div>

      {/* Info de progreso */}
      <div className="challenges-header">
        <p className="partner-name-text">
          Completando retos con <strong>{partner.name}</strong>
        </p>
        <div className="progress-info">
          <div className="progress-stat">
            <Target size={20} color="#7f00ff" strokeWidth={2} />
            <span>Bloque {currentBlock + 1} de {totalBlocks}</span>
          </div>
          <div className="progress-stat">
            <CheckCircle size={20} color="#10B981" strokeWidth={2} />
            <span>{Object.keys(responses).length} completados</span>
          </div>
        </div>
      </div>

      {/* Lista de retos del bloque actual */}
      <div className="challenges-list">
        {blockChallenges.map((challenge) => {
          const myResponse = responses[challenge.id];
          const partnerResponse = partnerResponses[challenge.id];
          const bothCompleted = myResponse && partnerResponse;

          return (
            <div key={challenge.id} className={`challenge-card ${bothCompleted ? 'completed' : ''}`}>
              <div className="challenge-header-card">
                <div className="challenge-category-icon">
                  {getCategoryIcon(challenge.category)}
                </div>
                <div className="challenge-meta">
                  <span className="challenge-time">
                    <Clock size={14} />
                    {challenge.estimatedTime}
                  </span>
                </div>
              </div>

              <h3 className="challenge-title">{challenge.title}</h3>
              <p className="challenge-description">{challenge.description}</p>

              <div className="challenge-footer">
                <div className="challenge-points">
                  <Star size={18} color="#FFD700" fill="#FFD700" />
                  <span>{challenge.points} puntos</span>
                </div>

                <div className="challenge-actions">
                  {!myResponse ? (
                    <button
                      className="btn-complete"
                      onClick={() => setActiveChallenge(challenge)}
                    >
                      Responder
                    </button>
                  ) : (
                    <div className="completed-badge">
                      <CheckCircle size={18} strokeWidth={2.5} />
                      Completado
                    </div>
                  )}

                  {bothCompleted && (
                    <button
                      className="btn-view"
                      onClick={() => setActiveChallenge({ ...challenge, viewMode: true })}
                    >
                      <Eye size={18} />
                      Ver respuestas
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botón para desbloquear siguiente bloque */}
      {canUnlock && currentBlock < totalBlocks - 1 && (
        <div className="unlock-next-block">
          <div className="unlock-message">
            <Sparkles size={32} color="#7f00ff" />
            <h3>¡Completaron todos los retos del bloque!</h3>
            <p>Desbloquea los siguientes 3 retos</p>
          </div>
          <button className="btn-unlock" onClick={unlockNextBlock}>
            Desbloquear Siguiente Bloque
          </button>
        </div>
      )}

      {/* Mensaje final */}
      {currentBlock === totalBlocks - 1 && canUnlock && (
        <div className="all-completed-message">
          <Trophy size={48} color="#FFD700" strokeWidth={2} />
          <h3>¡Completaron todos los retos!</h3>
          <p>Han completado los {allChallenges.length} retos juntos. ¡Increíble! 🎉</p>
        </div>
      )}

      {/* Modal para responder */}
      {activeChallenge && !activeChallenge.viewMode && (
        <ResponseModal
          challenge={activeChallenge}
          onClose={() => setActiveChallenge(null)}
          onSubmit={handleSubmitResponse}
          onPhotoUpload={handlePhotoUpload}
          uploadingPhoto={uploadingPhoto}
        />
      )}

      {/* Modal para ver respuestas */}
      {activeChallenge && activeChallenge.viewMode && (
        <ViewResponsesModal
          challenge={activeChallenge}
          myResponse={responses[activeChallenge.id]}
          partnerResponse={partnerResponses[activeChallenge.id]}
          partnerName={partner.name}
          myName={userProfile.name}
          onClose={() => setActiveChallenge(null)}
        />
      )}
    </div>
  );
}

// Modal para responder reto
function ResponseModal({ challenge, onClose, onSubmit, onPhotoUpload, uploadingPhoto }) {
  const [textResponse, setTextResponse] = useState('');

  function handleSubmit() {
    if (!textResponse.trim()) {
      alert('Por favor escribe tu respuesta');
      return;
    }
    onSubmit(challenge.id, textResponse);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      onPhotoUpload(challenge.id, file);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal response-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{challenge.title}</h2>
        <p className="modal-subtitle">{challenge.description}</p>

        {challenge.responseType === 'photo' ? (
          <div className="photo-upload-area">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="photo-upload"
              style={{ display: 'none' }}
              disabled={uploadingPhoto}
            />
            <label htmlFor="photo-upload" className="photo-upload-label">
              <Upload size={32} color="#7f00ff" />
              <span>{uploadingPhoto ? 'Subiendo foto...' : 'Seleccionar Foto'}</span>
            </label>
          </div>
        ) : challenge.responseType === 'longText' ? (
          <textarea
            className="response-textarea"
            placeholder={challenge.placeholder}
            value={textResponse}
            onChange={(e) => setTextResponse(e.target.value)}
            rows={6}
          />
        ) : (
          <input
            type="text"
            className="response-input"
            placeholder={challenge.placeholder}
            value={textResponse}
            onChange={(e) => setTextResponse(e.target.value)}
          />
        )}

        {challenge.responseType !== 'photo' && (
          <button className="btn primary" onClick={handleSubmit} disabled={uploadingPhoto}>
            Enviar Respuesta
          </button>
        )}

        <button className="close-modal" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

// Modal para ver respuestas de ambos
function ViewResponsesModal({ challenge, myResponse, partnerResponse, partnerName, myName, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal view-responses-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{challenge.title}</h2>
        <p className="modal-subtitle">Respuestas de ambos</p>

        <div className="responses-container">
          {/* Mi respuesta */}
          <div className="response-box">
            <h3>Tu respuesta</h3>
            {challenge.responseType === 'photo' ? (
              <img src={myResponse.value} alt="Mi respuesta" className="response-photo" />
            ) : (
              <p className="response-text">{myResponse.value}</p>
            )}
          </div>

          {/* Respuesta de la pareja */}
          <div className="response-box">
            <h3>Respuesta de {partnerName}</h3>
            {challenge.responseType === 'photo' ? (
              <img src={partnerResponse.value} alt="Respuesta de pareja" className="response-photo" />
            ) : (
              <p className="response-text">{partnerResponse.value}</p>
            )}
          </div>
        </div>

        <button className="btn primary" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
