import React, { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonButton, IonText, IonItem, IonIcon
} from "@ionic/react";
import { auth, db } from "../firebaseConfig";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { eye, eyeOff } from "ionicons/icons";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Por favor, completa ambos campos.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const providerDoc = await getDoc(doc(db, "providers", uid));
      if (providerDoc.exists()) {
        history.replace("/provider/dashboard");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        history.replace("/tabs/menu");
        return;
      }

      setError("No se encontró el perfil asociado a esta cuenta.");
      await auth.signOut();

    } catch (e: any) {
      if (e.code === "auth/user-not-found") {
        setError("No hay ninguna cuenta registrada con este correo electrónico.");
      } else if (e.code === "auth/wrong-password") {
        setError("La contraseña es incorrecta.");
      } else if (e.code === "auth/invalid-email") {
        setError("El formato del correo es inválido.");
      } else {
        setError("Error: " + e.message);
      }
    }
  };

  const handleRecoverPassword = async () => {
    setError("");
    if (!email) {
      setError("Por favor, ingresa tu correo electrónico para recuperar la contraseña.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Se ha enviado un correo para restablecer la contraseña.");
    } catch (e: any) {
      setError("Error al enviar correo: " + e.message);
    }
  };

  return (
    <IonPage className="login-page">
      <IonHeader>
        <IonToolbar className="login-toolbar">
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            className="login-input"
            type="email"
            label="Correo electrónico"
            labelPlacement="floating"
            placeholder="Ej: correo@ejemplo.com"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
            required
          />
        </IonItem>

        <IonItem>
          <IonInput
            className="login-input"
            type={showPassword ? "text" : "password"}
            label="Contraseña"
            labelPlacement="floating"
            placeholder="Mínimo 8 caracteres"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
            required
          />
          <IonButton
            fill="clear"
            slot="end"
            onClick={() => setShowPassword(prev => !prev)}
            className="password-toggle-button"
          >
            <IonIcon icon={showPassword ? eye : eyeOff} size="small" />
          </IonButton>
        </IonItem>

        {error && (
          <IonText color="danger">
            <p className="error-text">{error}</p>
          </IonText>
        )}

        <button className="login-button" onClick={handleLogin}>
          Iniciar sesión
        </button>

        <IonButton fill="clear" expand="block" className="flat-text-button" onClick={() => history.push("/register")}>
          ¿No tienes una cuenta? Regístrate
        </IonButton>

        <IonButton fill="clear" expand="block" className="flat-text-button" onClick={handleRecoverPassword}>
          ¿Olvidaste tu contraseña?
        </IonButton>

        <IonButton fill="clear" expand="block" className="flat-text-button" onClick={() => history.push("/account-type")}>
          Cambiar tipo de cuenta
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
