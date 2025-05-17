import React, { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonButton, IonText, IonLabel, IonItem, IonToast
} from "@ionic/react";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { useHistory } from "react-router-dom";
import "./RecoverPassword.css";

const RecoverPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  const handleRecover = async () => {
    setError("");
    setMessage("");
    if (!email) {
      setError("Por favor, ingresa tu correo electrónico.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Email de recuperación enviado. Revisa tu bandeja.");
      setShowToast(true);
    } catch (e: any) {
      if (e.code === "auth/user-not-found") {
        setError("No existe ninguna cuenta con ese correo.");
      } else if (e.code === "auth/invalid-email") {
        setError("El formato del correo es inválido.");
      } else {
        setError("Error: " + e.message);
      }
    }
  };

  return (
    <IonPage className="recover-page">
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Recuperar Contraseña</IonTitle>
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
            className="recover-input"
          />
        </IonItem>

        {error && <IonText color="danger"><p className="error-text">{error}</p></IonText>}

        <IonButton expand="block" color="warning" onClick={handleRecover}>
          Enviar email de recuperación
        </IonButton>

        <IonButton fill="clear" expand="block" onClick={() => history.push("/login")}>
          Regresar a Iniciar Sesión
        </IonButton>

        <IonButton fill="clear" expand="block" onClick={() => history.push("/account-type")}>
          Cambiar tipo de cuenta
        </IonButton>

        <IonToast
          isOpen={showToast}
          message={message}
          duration={3000}
          color="success"
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default RecoverPassword;
