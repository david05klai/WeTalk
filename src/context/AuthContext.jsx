import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp 
} from "firebase/firestore";
import { auth, googleProvider, db } from "../config/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Generar código de pareja único
  const generatePartnerCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  // ===== FUNCIONES CON FIRESTORE =====

  // Guardar perfil del usuario en Firestore
  const saveUserProfile = async (uid, profile) => {
    try {
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, {
        ...profile,
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      console.log("✅ Perfil guardado en Firestore");
    } catch (error) {
      console.error("❌ Error guardando perfil:", error);
    }
  };

  // Cargar perfil del usuario desde Firestore
  const loadUserProfile = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data();
      }
      return null;
    } catch (error) {
      console.error("❌ Error cargando perfil:", error);
      return null;
    }
  };

  // Obtener perfil de la pareja
  const getPartnerProfile = async () => {
    if (!userProfile || !userProfile.partnerId) return null;
    
    try {
      const partnerRef = doc(db, "users", userProfile.partnerId);
      const partnerSnap = await getDoc(partnerRef);
      
      if (partnerSnap.exists()) {
        return partnerSnap.data();
      }
      return null;
    } catch (error) {
      console.error("❌ Error obteniendo pareja:", error);
      return null;
    }
  };

  // Buscar usuario por código de pareja
  const findUserByPartnerCode = async (partnerCode) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("partnerCode", "==", partnerCode));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        return { uid: userDoc.id, ...userDoc.data() };
      }
      return null;
    } catch (error) {
      console.error("❌ Error buscando usuario:", error);
      return null;
    }
  };

  // ===== REGISTRO Y LOGIN =====

  // Registro con email
  const registerWithEmail = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;

    const profile = {
      uid: newUser.uid,
      name,
      email: newUser.email,
      partnerCode: generatePartnerCode(),
      partnerId: null,
      points: 0,
      activities: [],
      createdAt: new Date().toISOString()
    };

    await saveUserProfile(newUser.uid, profile);
    setUserProfile(profile);

    return newUser;
  };

  // Login con email
  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedUser = userCredential.user;

      const profile = await loadUserProfile(loggedUser.uid);
      if (profile) {
        setUserProfile(profile);
      } else {
        // Si no existe perfil, crear uno básico
        const newProfile = {
          uid: loggedUser.uid,
          name: loggedUser.email.split('@')[0],
          email: loggedUser.email,
          partnerCode: generatePartnerCode(),
          partnerId: null,
          points: 0,
          activities: [],
          createdAt: new Date().toISOString()
        };
        await saveUserProfile(loggedUser.uid, newProfile);
        setUserProfile(newProfile);
      }

      return loggedUser;
    } catch (error) {
      console.error("❌ Error en loginWithEmail:", error);
      throw error;
    }
  };

  // Login con Google
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const googleUser = result.user;

    let profile = await loadUserProfile(googleUser.uid);

    if (!profile) {
      profile = {
        uid: googleUser.uid,
        name: googleUser.displayName,
        email: googleUser.email,
        partnerCode: generatePartnerCode(),
        partnerId: null,
        points: 0,
        activities: [],
        createdAt: new Date().toISOString()
      };
      await saveUserProfile(googleUser.uid, profile);
    }

    setUserProfile(profile);
    return googleUser;
  };

  // ===== CONECTAR CON PAREJA =====

  const connectWithPartner = async (partnerCode) => {
    if (!user || !userProfile) {
      throw new Error("Debes estar logueado");
    }

    if (partnerCode === userProfile.partnerCode) {
      throw new Error("No puedes usar tu propio código");
    }

    const partner = await findUserByPartnerCode(partnerCode);

    if (!partner) {
      throw new Error("Código no encontrado");
    }

    if (partner.partnerId && partner.partnerId !== user.uid) {
      throw new Error("Esta persona ya tiene pareja");
    }

    // Actualizar ambos perfiles en Firestore
    const updatedUserProfile = { ...userProfile, partnerId: partner.uid };
    const updatedPartnerProfile = { ...partner, partnerId: user.uid };

    await saveUserProfile(user.uid, updatedUserProfile);
    await saveUserProfile(partner.uid, updatedPartnerProfile);

    setUserProfile(updatedUserProfile);

    return partner;
  };

  // ===== ACTUALIZAR DATOS =====

  // Actualizar puntos
  const updatePoints = async (points) => {
    if (!user || !userProfile) return;

    const updatedProfile = {
      ...userProfile,
      points: (userProfile.points || 0) + points
    };

    await saveUserProfile(user.uid, updatedProfile);
    setUserProfile(updatedProfile);
  };

  // Agregar actividad
  const addActivity = async (activity) => {
    if (!user || !userProfile) return;

    const newActivity = {
      id: Date.now(),
      ...activity,
      timestamp: new Date().toISOString()
    };

    const updatedProfile = {
      ...userProfile,
      activities: [newActivity, ...(userProfile.activities || [])]
    };

    await saveUserProfile(user.uid, updatedProfile);
    setUserProfile(updatedProfile);
  };

  // Cerrar sesión
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserProfile(null);
  };

  // ===== EFECTOS =====

  // Escuchar cambios de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        const profile = await loadUserProfile(currentUser.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    userProfile,
    getPartnerProfile,
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    connectWithPartner,
    updatePoints,
    addActivity,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
