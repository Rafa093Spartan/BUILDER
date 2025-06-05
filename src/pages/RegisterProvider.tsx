import React, { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonButton, IonText, IonLabel, IonItem, IonTextarea, IonIcon
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import "./RegisterProvider.css";

const RegisterProvider: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [services, setServices] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const validatePassword = (password: string) => password.length >= 8;

  const handleRegister = async () => {
    setError("");
    if (!fullName || !email || !password || !confirmPassword || !services) {
      setError("Por favor, completa todos los campos obligatorios.");
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
      await setDoc(doc(db, "providers", userCredential.user.uid), {
        fullName,
        email,
        phone,
        services: services.split(",").map(s => s.trim()),
        description,
        role: "provider",
        createdAt: new Date(),
        rating: 0,
        completedJobs: 0
      });
      history.replace("/login-provider");
    } catch (e: any) {
      setError("Error: " + e.message);
    }
  };

  return (
    <IonPage className="register-page">
      <IonHeader>
        <IonToolbar className="register-toolbar">
          <IonTitle>Registro Proveedor</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem className="register-item">
          <IonLabel position="floating">Nombre completo</IonLabel>
          <IonInput value={fullName} onIonChange={e => setFullName(e.detail.value!)} className="register-input" />
        </IonItem>
        <IonItem className="register-item">
          <IonLabel position="floating">Correo electrónico</IonLabel>
          <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} className="register-input" />
        </IonItem>
        <IonItem className="register-item">
          <IonLabel position="floating">Teléfono</IonLabel>
          <IonInput type="tel" value={phone} onIonChange={e => setPhone(e.detail.value!)} className="register-input" />
        </IonItem>
        <IonItem className="register-item">
          <IonLabel position="floating">Servicios (separados por coma)</IonLabel>
          <IonInput value={services} onIonChange={e => setServices(e.detail.value!)} className="register-input" />
        </IonItem>
        <IonItem className="register-item">
          <IonLabel position="floating">Descripción</IonLabel>
          <IonTextarea value={description} onIonChange={e => setDescription(e.detail.value!)} rows={4} />
        </IonItem>
        <IonItem className="register-item">
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            type={showPassword ? "text" : "password"}
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
            className="register-input"
          />
          <IonButton fill="clear" slot="end" onClick={() => setShowPassword(!showPassword)}>
            <IonIcon icon={showPassword ? eyeOff : eye} />
          </IonButton>
        </IonItem>
        <IonItem className="register-item">
          <IonLabel position="floating">Confirmar contraseña</IonLabel>
          <IonInput
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onIonChange={e => setConfirmPassword(e.detail.value!)}
            className="register-input"
          />
          <IonButton fill="clear" slot="end" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            <IonIcon icon={showConfirmPassword ? eyeOff : eye} />
          </IonButton>
        </IonItem>

        {error && <IonText color="danger"><p className="error-text">{error}</p></IonText>}

        <IonButton expand="block" color="warning" onClick={handleRegister} className="register-button">
          Registrar proveedor
        </IonButton>

        <IonButton fill="clear" expand="block" onClick={() => history.push("/login-provider")}>
          ¿Ya tienes una cuenta? Inicia sesión como proveedor
        </IonButton>

        <IonButton fill="clear" expand="block" onClick={() => history.push("/account-type")}>
          Cambiar tipo de cuenta
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RegisterProvider;
