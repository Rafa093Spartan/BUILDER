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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const validatePassword = (pass: string) => {
    return pass.length >= 8;
  };

  const handleRegister = async () => {
    setError("");

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (!validatePassword(password)) {
      setError("La contraseña debe tener mínimo 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", userCredential.user.uid), {
        fullName,
        email
      });

      history.replace("/login");
    } catch (e: any) {
      if (e.code === "auth/weak-password") {
        setError("La contraseña es demasiado débil.");
      } else if (e.code === "auth/email-already-in-use") {
        setError("El correo ya está en uso.");
      } else if (e.code === "auth/invalid-email") {
        setError("El formato del correo es inválido.");
      } else {
        setError("Error: " + e.message);
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
          <IonInput value={fullName} onIonChange={e => setFullName(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Correo electrónico</IonLabel>
          <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Confirmar contraseña</IonLabel>
          <IonInput type="password" value={confirmPassword} onIonChange={e => setConfirmPassword(e.detail.value!)} />
        </IonItem>

        {error && <IonText color="danger"><p className="error-text">{error}</p></IonText>}

        <IonButton expand="block" color="warning" onClick={handleRegister}>
          Registrar
        </IonButton>

        <IonButton fill="clear" expand="block" onClick={() => history.replace("/account-type")}>
          Cambiar tipo de perfil
        </IonButton>

        <IonButton fill="clear" expand="block" onClick={() => history.push("/login")}>
          ¿Ya tienes una cuenta? Inicia sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;
