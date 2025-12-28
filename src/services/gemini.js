import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializar Gemini con tu API Key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Modelo a usar (Gemini 2.0 Flash - el más rápido y gratis)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// ===== FUNCIÓN 1: Generar Mensaje de Amor Diario =====
export async function generateLoveMessage(userName, partnerName) {
  try {
    const prompt = `Eres un escritor romántico experto. Genera un mensaje de amor único, hermoso y emotivo para una pareja.

Usuario: ${userName}
Pareja: ${partnerName}

Requisitos:
- Debe ser diferente cada vez que se genere
- Máximo 2 líneas
- Debe incluir el nombre de ${partnerName}
- Debe ser romántico pero no cursi
- Incluye un emoji al final
- En español

Genera SOLO el mensaje, sin comillas ni explicaciones.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const message = response.text().trim();
    
    return message;
  } catch (error) {
    console.error("Error generando mensaje de amor:", error);
    return `${partnerName}, eres la razón por la que sonrío cada día ❤️`;
  }
}

// ===== FUNCIÓN 2: Chat del Asistente SOS =====
export async function chatWithAssistant(userMessage, conversationHistory = []) {
  try {
    const systemPrompt = `Eres un asistente de relaciones de pareja empático y profesional. Tu nombre es "Asistente WeTalk".

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

Usuario dice: ${userMessage}`;

    const chat = model.startChat({
      history: conversationHistory,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(systemPrompt);
    const response = result.response;
    const aiMessage = response.text().trim();
    
    return aiMessage;
  } catch (error) {
    console.error("Error en chat con asistente:", error);
    return "Lo siento, tuve un problema al procesar tu mensaje. ¿Puedes intentar de nuevo?";
  }
}

// ===== FUNCIÓN 3: Generar Frase de Reconciliación =====
export async function generateReconciliationPhrase(situation) {
  try {
    const prompt = `Genera una frase sincera y efectiva para reconciliarse con tu pareja después de una pelea.

Situación: ${situation}

Requisitos:
- Debe ser honesta y vulnerable
- Debe mostrar empatía
- Debe ayudar a iniciar una conversación constructiva
- Máximo 2 líneas
- En español
- Sin comillas

Genera SOLO la frase.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const phrase = response.text().trim();
    
    return phrase;
  } catch (error) {
    console.error("Error generando frase:", error);
    return "Lamento cómo te hice sentir. ¿Podemos hablar sobre lo que pasó?";
  }
}
