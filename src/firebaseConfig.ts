// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración copiada desde Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDOi0okmp40FIYZjLfYv3lfQCCKe8v2M-A",
  authDomain: "builder-45492.firebaseapp.com",
  projectId: "builder-45492",
  storageBucket: "builder-45492.appspot.com",
  messagingSenderId: "723865915607",
  appId: "1:723865915607:web:adda2b474af6d1aef32092",
  measurementId: "G-R9SRF0HSLP",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa servicios que vas a usar
export const auth = getAuth(app);
export const db = getFirestore(app);

// Opcional, solo si quieres usar Analytics (no recomendado en Ionic web a menos que sepas para qué)
