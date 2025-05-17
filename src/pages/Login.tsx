import React, { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonButton, IonText, IonLabel, IonItem
} from "@ionic/react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.replace("/menu");
    } catch (e: any) {
      if (e.code === "auth/user-not-found") {
        setError("No hay ninguna cuenta registrada con este correo electrónico.");
      } else if (e.code === "auth/wrong-password") {
        setError("La contraseña es incorrecta.");
      } else {
        setError(e.message);
      }
    }
  };

  return (
    <IonPage className="login-page">
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Correo electrónico</IonLabel>
          <IonInput
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
            type="email"
            required
            className="login-input"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
            type="password"
            required
            className="login-input"
          />
        </IonItem>
        {error && <IonText color="danger" className="error-text">{error}</IonText>}
        <IonButton expand="block" color="warning" onClick={handleLogin} className="login-button">
          Iniciar sesión
        </IonButton>
        <IonButton fill="clear" expand="block" onClick={() => history.push("/register")}>
          ¿No tienes una cuenta? Regístrate
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
