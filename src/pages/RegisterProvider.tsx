import React, { useState, useRef } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonButton, IonText, IonItem, IonTextarea, IonIcon
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
  const [showServiceOptions, setShowServiceOptions] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const predefinedServices = ["Carpintería", "Pintor", "Albañil", "Mantenimiento", "Herrero"];
  const inputRef = useRef<HTMLIonInputElement>(null);

  const validatePassword = (password: string) => password.length >= 8;

  const addService = (service: string) => {
    const current = services.split(",").map(s => s.trim()).filter(Boolean);
    if (!current.includes(service)) {
      const updated = [...current, service];
      setServices(updated.join(", "));
    }
    setShowServiceOptions(false);
  };

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
        <IonItem>
          <IonInput
            className="register-input"
            type="text"
            label="Nombre completo"
            labelPlacement="floating"
            placeholder="Ej: Juan Pérez"
            value={fullName}
            onIonChange={e => setFullName(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonInput
            className="register-input"
            type="email"
            label="Correo electrónico"
            labelPlacement="floating"
            placeholder="Ej: correo@ejemplo.com"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonInput
            className="register-input"
            type={showPassword ? "text" : "password"}
            label="Contraseña"
            labelPlacement="floating"
            placeholder="Mínimo 8 caracteres"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
          />
          <IonButton
            fill="clear"
            slot="end"
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle-button"
          >
            <IonIcon icon={showPassword ? eye : eyeOff} size="small" />
          </IonButton>
        </IonItem>

        <IonItem>
          <IonInput
            className="register-input"
            type={showConfirmPassword ? "text" : "password"}
            label="Confirmar contraseña"
            labelPlacement="floating"
            placeholder="Repite la contraseña"
            value={confirmPassword}
            onIonChange={e => setConfirmPassword(e.detail.value!)}
          />
          <IonButton
            fill="clear"
            slot="end"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="password-toggle-button"
          >
            <IonIcon icon={showConfirmPassword ? eye : eyeOff} size="small" />
          </IonButton>
        </IonItem>

        <IonItem>
          <IonInput
            className="register-input"
            type="tel"
            label="Teléfono"
            labelPlacement="floating"
            placeholder="Ej: 6121234567"
            value={phone}
            onIonChange={e => setPhone(e.detail.value!)}
          />
        </IonItem>

        <div className="services-input-wrapper">
          <IonItem>
            <IonInput
              className="register-input"
              label="Servicios (separados por coma)"
              labelPlacement="floating"
              placeholder="Ej: Carpintería, Herrería"
              value={services}
              ref={inputRef}
              onIonChange={e => setServices(e.detail.value!)}
              onFocus={() => setShowServiceOptions(true)}
              onBlur={() => setTimeout(() => setShowServiceOptions(false), 150)}
            />
          </IonItem>

          {showServiceOptions && (
            <div className="services-dropdown">
              {predefinedServices.map((service, index) => (
                <div key={index} className="services-option" onClick={() => addService(service)}>
                  {service}
                </div>
              ))}
              <div className="services-option services-cancel" onClick={() => setShowServiceOptions(false)}>
                Cancelar selección
              </div>
            </div>
          )}
        </div>

        <IonItem>
          <IonTextarea
            className="register-input"
            label="Descripción"
            labelPlacement="floating"
            placeholder="Breve descripción de tus servicios"
            value={description}
            onIonChange={e => setDescription(e.detail.value!)}
            rows={4}
            autoGrow
          />
        </IonItem>

        {error && (
          <IonText color="danger">
            <p className="error-text">{error}</p>
          </IonText>
        )}

        <button className="register-button" onClick={handleRegister}>
          Registrar proveedor
        </button>

        <IonButton fill="clear" expand="block" className="flat-text-button" onClick={() => history.push("/login-provider")}>
          ¿Ya tienes una cuenta? Inicia sesión como proveedor
        </IonButton>

        <IonButton fill="clear" expand="block" className="flat-text-button" onClick={() => history.push("/account-type")}>
          Cambiar tipo de cuenta
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RegisterProvider;
