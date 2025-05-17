import React, { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonButton, IonText, IonLabel, IonItem
} from "@ionic/react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import "./Register.css";

const Register: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      setError("Por favor, complete todos los campos");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        fullName,
        email,
      });
      history.replace("/login");
    } catch (e: any) {
      if (e.code === "auth/weak-password") {
        setError("La contraseña es demasiado débil.");
      } else if (e.code === "auth/email-already-in-use") {
        setError("El correo ya está en uso.");
      } else {
        setError(e.message);
      }
    }
  };

  return (
    <IonPage className="register-page">
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Crear Cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Nombre completo</IonLabel>
          <IonInput
            value={fullName}
            onIonChange={e => setFullName(e.detail.value!)}
            className="register-input"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Correo electrónico</IonLabel>
          <IonInput
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
            type="email"
            className="register-input"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
            type="password"
            className="register-input"
          />
        </IonItem>
        {error && <IonText color="danger" className="error-text">{error}</IonText>}
        <IonButton expand="block" color="warning" onClick={handleRegister} className="register-button">
          Registrar
        </IonButton>
        <IonButton fill="clear" expand="block" onClick={() => history.goBack()}>
          ¿Ya tienes una cuenta? Inicia sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;
