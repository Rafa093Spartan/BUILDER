// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import {
getAuth,
browserLocalPersistence,
setPersistence,
onAuthStateChanged // ✅ Asegurarse de importar esto
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Tu configuración Firebase
const firebaseConfig = {
apiKey: "AIzaSyDOi0okmp40FIYZjLfYv3lfQCCKe8v2M-A",
authDomain: "builder-45492.firebaseapp.com",
projectId: "builder-45492",
storageBucket: "builder-45492.appspot.com",
messagingSenderId: "723865915607",
appId: "1:723865915607:web:adda2b474af6d1aef32092",
measurementId: "G-R9SRF0HSLP",
};

// ✅ Inicializar Firebase
const app = initializeApp(firebaseConfig);

// ✅ Inicializar Auth con persistencia
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error al establecer persistencia:", error);
});

// ✅ Inicializar Firestore
const db = getFirestore(app);

// ✅ Exportar todo lo necesario
export { auth, db, onAuthStateChanged };
