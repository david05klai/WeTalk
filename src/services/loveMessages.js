import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { generateLoveMessage } from "./gemini";

// Obtener mensaje de amor del día
export async function getTodayLoveMessage(userId, userName, partnerName) {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const messageRef = doc(db, "loveMessages", `${userId}_${today}`);
    
    console.log("🔍 Buscando mensaje en Firestore...");
    
    // Verificar si ya existe mensaje de hoy
    const messageSnap = await getDoc(messageRef);
    
    if (messageSnap.exists()) {
      console.log("✅ Mensaje encontrado en Firestore");
      return messageSnap.data().message;
    }
    
    console.log("⚡ Generando nuevo mensaje con IA...");
    // Si no existe, generar uno nuevo con IA
    const newMessage = await generateLoveMessage(userName, partnerName);
    
    console.log("💾 Guardando en Firestore...");
    // Guardar en Firestore
    await setDoc(messageRef, {
      userId,
      message: newMessage,
      date: today,
      createdAt: new Date().toISOString(),
      userName,
      partnerName
    });
    
    console.log("✅ Mensaje guardado exitosamente");
    return newMessage;
  } catch (error) {
    console.error("❌ Error obteniendo mensaje:", error);
    return `${partnerName}, cada día contigo es un regalo que atesoro ❤️`;
  }
}

// Generar nuevo mensaje (aunque ya exista uno hoy)
export async function generateNewLoveMessage(userId, userName, partnerName) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const messageRef = doc(db, "loveMessages", `${userId}_${today}`);
    
    console.log("⚡ Generando nuevo mensaje...");
    // Generar nuevo mensaje
    const newMessage = await generateLoveMessage(userName, partnerName);
    
    console.log("💾 Guardando nuevo mensaje...");
    // Actualizar en Firestore
    await setDoc(messageRef, {
      userId,
      message: newMessage,
      date: today,
      createdAt: new Date().toISOString(),
      userName,
      partnerName
    });
    
    console.log("✅ Nuevo mensaje guardado");
    return newMessage;
  } catch (error) {
    console.error("❌ Error generando nuevo mensaje:", error);
    throw error;
  }
}
