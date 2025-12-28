import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbDLkbo4Hd0fy8dAaIcqmpnFwHQINccUs",
  authDomain: "wetalk-d4231.firebaseapp.com",
  projectId: "wetalk-d4231",
  storageBucket: "wetalk-d4231.firebasestorage.app",
  messagingSenderId: "842688848080",
  appId: "1:842688848080:web:7b50c46210c94c531e3ed5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
