import { db } from '../config/firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import { generateDailyChallenges } from './ai';

// Función auxiliar para retos de fallback
function getFallbackChallenges() {
  const allChallenges = [
    {
      title: "Mensaje sorpresa",
      description: "Envía un mensaje de voz de 30 segundos diciendo por qué amas a tu pareja",
      category: "comunicacion",
      points: 15,
      difficulty: "facil",
      estimatedTime: "5 minutos"
    },
    {
      title: "Cita virtual",
      description: "Hagan una videollamada de 20 minutos donde se cuenten cómo fue su día",
      category: "romance",
      points: 20,
      difficulty: "media",
      estimatedTime: "25 minutos"
    },
    {
      title: "Juego de fotos",
      description: "Envíense 3 fotos graciosas o memes que les recuerden al otro",
      category: "diversion",
      points: 10,
      difficulty: "facil",
      estimatedTime: "10 minutos"
    },
    {
      title: "Lista de gratitud",
      description: "Escribe 5 cosas que agradeces de tu pareja y compártelas",
      category: "comunicacion",
      points: 15,
      difficulty: "facil",
      estimatedTime: "10 minutos"
    },
    {
      title: "Plan sorpresa",
      description: "Planea una cita sorpresa para el fin de semana y comparte los detalles",
      category: "romance",
      points: 25,
      difficulty: "dificil",
      estimatedTime: "30 minutos"
    },
    {
      title: "Playlist compartido",
      description: "Creen juntos una playlist con 10 canciones que les gusten a ambos",
      category: "diversion",
      points: 15,
      difficulty: "media",
      estimatedTime: "20 minutos"
    },
    {
      title: "Pregunta profunda",
      description: "Hazle a tu pareja: '¿Cuál es tu mejor recuerdo conmigo?' y comparte el tuyo",
      category: "comunicacion",
      points: 20,
      difficulty: "media",
      estimatedTime: "15 minutos"
    },
    {
      title: "Carta de amor digital",
      description: "Escribe un mensaje largo expresando lo que sientes por tu pareja",
      category: "romance",
      points: 25,
      difficulty: "media",
      estimatedTime: "20 minutos"
    },
    {
      title: "Reto de baile",
      description: "Graben un video bailando juntos su canción favorita",
      category: "diversion",
      points: 20,
      difficulty: "media",
      estimatedTime: "15 minutos"
    }
  ];
  
  // Seleccionar 3 retos aleatorios
  const shuffled = allChallenges.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

// Obtener retos del día (genera nuevos si no existen)
export async function getDailyChallenges(coupleId) {
  const today = new Date().toISOString().split('T')[0];
  const challengeRef = doc(db, 'couples', coupleId, 'challenges', today);
  
  try {
    const challengeDoc = await getDoc(challengeRef);
    
    if (challengeDoc.exists()) {
      return challengeDoc.data();
    }
    
    // Si no hay retos hoy, generar nuevos con IA
    let newChallenges;
    
    try {
      newChallenges = await generateDailyChallenges();
    } catch (aiError) {
      console.error('Error generando con IA, usando fallback:', aiError);
      newChallenges = getFallbackChallenges();
    }
    
    const challengeData = {
      date: today,
      challenges: newChallenges,
      completed: [],
      pointsEarned: 0,
      createdAt: new Date().toISOString()
    };
    
    await setDoc(challengeRef, challengeData);
    return challengeData;
    
  } catch (error) {
    console.error('Error obteniendo retos:', error);
    
    // Retornar datos de emergencia sin guardar en Firebase
    return {
      date: today,
      challenges: getFallbackChallenges(),
      completed: [],
      pointsEarned: 0,
      createdAt: new Date().toISOString()
    };
  }
}

// Marcar reto como completado
export async function completeChallenge(coupleId, challengeIndex, completedBy) {
  const today = new Date().toISOString().split('T')[0];
  const challengeRef = doc(db, 'couples', coupleId, 'challenges', today);
  const coupleRef = doc(db, 'couples', coupleId);
  
  try {
    const challengeDoc = await getDoc(challengeRef);
    
    if (!challengeDoc.exists()) {
      throw new Error('No hay retos para hoy');
    }
    
    const data = challengeDoc.data();
    const challenge = data.challenges[challengeIndex];
    
    // Verificar que no esté ya completado
    if (data.completed.includes(challengeIndex)) {
      return { success: false, message: 'Reto ya completado' };
    }
    
    // Actualizar reto completado
    await updateDoc(challengeRef, {
      completed: arrayUnion(challengeIndex),
      pointsEarned: increment(challenge.points),
      [`challenges.${challengeIndex}.completedBy`]: completedBy,
      [`challenges.${challengeIndex}.completedAt`]: new Date().toISOString()
    });
    
    // Actualizar puntos totales de la pareja
    await updateDoc(coupleRef, {
      totalPoints: increment(challenge.points)
    });
    
    return { 
      success: true, 
      pointsEarned: challenge.points,
      message: `¡+${challenge.points} puntos! 🎉`
    };
    
  } catch (error) {
    console.error('Error completando reto:', error);
    throw error;
  }
}

// Obtener historial de retos completados (últimos 7 días)
export async function getChallengeHistory(coupleId, days = 7) {
  const history = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    const challengeRef = doc(db, 'couples', coupleId, 'challenges', dateString);
    const challengeDoc = await getDoc(challengeRef);
    
    if (challengeDoc.exists()) {
      history.push({
        date: dateString,
        ...challengeDoc.data()
      });
    }
  }
  
  return history;
}

// Obtener estadísticas de la pareja
export async function getChallengeStats(coupleId) {
  const coupleRef = doc(db, 'couples', coupleId);
  const coupleDoc = await getDoc(coupleRef);
  
  if (!coupleDoc.exists()) {
    return {
      totalPoints: 0,
      streak: 0,
      completedChallenges: 0
    };
  }
  
  const data = coupleDoc.data();
  return {
    totalPoints: data.totalPoints || 0,
    streak: data.streak || 0,
    completedChallenges: data.completedChallenges || 0
  };
}
