import Groq from "groq-sdk";

// Inicializar Groq con la API Key de Vite
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

// ===== FUNCIÓN 1: Generar Mensaje de Amor Diario =====
export async function generateLoveMessage(userName, partnerName, forceNew = false) {
  try {
    const timestamp = Date.now();
    const randomSeed = Math.random().toString(36).substring(7);
    const styles = ['tierno', 'apasionado', 'poético', 'divertido', 'profundo'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    
    console.log("📤 Enviando request a Groq...");
    
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{
        role: "system",
        content: "Eres un escritor romántico experto."
      }, {
        role: "user",
        content: `Genera un mensaje de amor ÚNICO y COMPLETAMENTE DIFERENTE para una pareja.

Usuario: ${userName}
Pareja: ${partnerName}
Estilo: ${randomStyle}
Seed: ${randomSeed}
${forceNew ? 'IMPORTANTE: Este es un mensaje NUEVO, debe ser totalmente diferente a cualquier mensaje anterior.' : ''}

Requisitos:
- Debe ser absolutamente único y original
- Máximo 2 líneas (150 caracteres)
- Debe incluir el nombre de ${partnerName}
- Debe ser romántico pero auténtico
- NO uses emojis
- En español
- Varía el tono y las palabras cada vez

Genera SOLO el mensaje, sin comillas ni explicaciones.`
      }],
      temperature: 0.9,
      max_tokens: 150
    });
    
    console.log("📥 Respuesta recibida de Groq ✅");
    
    let message = response.choices[0].message.content.trim();
    message = message.replace(/^["']|["']$/g, '');
    
    console.log(`✨ Mensaje generado (estilo: ${randomStyle}):`, message);
    
    return message;
  } catch (error) {
    console.error("❌ Error generando mensaje de amor:", error);
    return `${partnerName}, eres la razón por la que sonrío cada día`;
  }
}

// ===== FUNCIÓN 2: Chat del Asistente SOS =====
export async function chatWithAssistant(userMessage, conversationHistory = []) {
  try {
    console.log("📤 Enviando mensaje al asistente...");
    
    const messages = [
      {
        role: "system",
        content: `Eres un asistente de relaciones de pareja empático y profesional. Tu nombre es "Asistente WeTalk".

Tu objetivo:
- Ayudar a las personas con problemas de pareja
- Dar consejos de comunicación
- Ofrecer apoyo emocional
- Sugerir soluciones prácticas
- Ser comprensivo y no juzgar

Reglas:
- Responde en español
- Sé breve (máximo 4-5 líneas)
- Sé empático y cálido
- Haz preguntas para entender mejor
- Da consejos prácticos y concretos
- NO uses emojis`
      },
      ...conversationHistory,
      {
        role: "user",
        content: userMessage
      }
    ];
    
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: messages,
      temperature: 0.8,
      max_tokens: 500
    });
    
    const aiMessage = response.choices[0].message.content.trim();
    
    console.log("📥 Respuesta del asistente recibida ✅");
    
    return aiMessage;
  } catch (error) {
    console.error("❌ Error en chat con asistente:", error);
    return "Lo siento, tuve un problema al procesar tu mensaje. ¿Puedes intentar de nuevo?";
  }
}

// ===== FUNCIÓN 3: Generar Frase de Reconciliación =====
export async function generateReconciliationPhrase(situation) {
  try {
    const randomSeed = Math.random().toString(36).substring(7);
    
    console.log("📤 Generando frase de reconciliación...");
    
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{
        role: "system",
        content: "Eres un consejero de parejas experto."
      }, {
        role: "user",
        content: `Genera una frase sincera y efectiva para reconciliarse con tu pareja después de una pelea.

Situación: ${situation}
Seed: ${randomSeed}

Requisitos:
- Debe ser honesta y vulnerable
- Debe mostrar empatía
- Debe ayudar a iniciar una conversación constructiva
- Máximo 2 líneas
- En español
- Sin comillas
- NO uses emojis
- Debe ser única y personal

Genera SOLO la frase.`
      }],
      temperature: 0.8,
      max_tokens: 150
    });
    
    let phrase = response.choices[0].message.content.trim();
    phrase = phrase.replace(/^["']|["']$/g, '');
    
    console.log("📥 Frase generada ✅");
    
    return phrase;
  } catch (error) {
    console.error("❌ Error generando frase:", error);
    return "Lamento cómo te hice sentir. ¿Podemos hablar sobre lo que pasó?";
  }
}

// Agregar al final del archivo ai.js

export async function generateDailyChallenges() {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{
        role: "system",
        content: `Eres un experto en relaciones de pareja. Genera exactamente 3 retos diarios para parejas en formato JSON.

CATEGORÍAS:
1. Comunicación (10-15 puntos)
2. Romance (15-20 puntos)
3. Diversión (10-15 puntos)

REQUISITOS:
- Retos realistas y ejecutables en 1 día
- Creativos pero no incómodos
- Variados (físicos, emocionales, digitales)
- En español
- Diferentes dificultades

FORMATO JSON EXACTO:
[
  {
    "title": "Título corto del reto",
    "description": "Descripción clara de qué hacer",
    "category": "comunicacion|romance|diversion",
    "points": número,
    "difficulty": "facil|media|dificil",
    "estimatedTime": "X minutos"
  }
]`
      }, {
        role: "user",
        content: "Genera 3 retos únicos y creativos para hoy."
      }],
      temperature: 1.1,
      max_tokens: 500
    });

    const content = response.choices[0].message.content.trim();
    
    // Extraer JSON del contenido
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No se pudo parsear el JSON de los retos');
    }
    
    const challenges = JSON.parse(jsonMatch[0]);
    
    // Validar estructura
    if (!Array.isArray(challenges) || challenges.length !== 3) {
      throw new Error('Formato de retos inválido');
    }
    
    return challenges;
    
  } catch (error) {
    console.error('Error generando retos con IA:', error);
    
    // Fallback: retos predefinidos si falla la IA
    return [
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
      }
    ];
  }
}
