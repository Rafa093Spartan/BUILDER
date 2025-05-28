import React, { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonText
} from "@ionic/react";
import { personOutline, constructOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./AccountType.css";

const AccountType: React.FC = () => {
  const history = useHistory();
  const [selected, setSelected] = useState<"usuario" | "proveedor">("usuario");

  const handleEnter = () => {
    history.push(selected === "usuario" ? "/login" : "/login-provider");
  };

  return (
    <IonPage className="account-type-page">
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <IonTitle className="custom-title">Crear cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="account-type-content">
        <div className="branding-container">
          <IonText className="title-text">Builder</IonText>
          <IonText className="subtitle-text">Crear Cuenta</IonText>
        </div>

        <IonIcon icon={personOutline} className="person-icon" />

        {/* TARJETA ÚNICA SEGÚN SELECCIÓN */}
        <div className="card-wrapper">
          {selected === "usuario" ? (
            <div className="card-box">
              <div className="user-icon-circle">
                <IonIcon icon={personOutline} className="user-icon" />
              </div>
              <h2 className="card-title">USUARIO</h2>
              <ul className="card-list">
                <li>Encuentra fácilmente profesionales certificados.</li>
                <li>Solicita servicios en pocos clics.</li>
                <li>Elige el proveedor que más te convenga.</li>
                <li>Pagos seguros y flexibles.</li>
                <li>Atención personalizada y soporte rápido.</li>
              </ul>
              <div className="button-container">
                <IonButton className="enter-button" onClick={handleEnter}>
                  ENTRAR
                </IonButton>
              </div>
            </div>
          ) : (
            <div className="card-box">
              <div className="user-icon-circle">
                <IonIcon icon={constructOutline} className="user-icon" />
              </div>
              <h2 className="card-title">PROVEEDOR</h2>
              <ul className="card-list">
                <li>Ofrece tus servicios a nuevos clientes.</li>
                <li>Recibe solicitudes personalizadas.</li>
                <li>Administra tus horarios y tarifas.</li>
                <li>Cobra de forma segura y sencilla.</li>
                <li>Soporte dedicado para tu crecimiento.</li>
              </ul>
              <div className="button-container">
                <IonButton className="enter-button" onClick={handleEnter}>
                  ENTRAR
                </IonButton>
              </div>
            </div>
          )}
        </div>

        {/* BOTONES DE SELECCIÓN */}
        <div className="toggle-buttons">
          <IonButton
            className={`toggle-button ${selected === "usuario" ? "selected" : ""}`}
            onClick={() => setSelected("usuario")}
          >
            USUARIO
          </IonButton>
          <IonButton
            className={`toggle-button ${selected === "proveedor" ? "selected" : ""}`}
            onClick={() => setSelected("proveedor")}
          >
            PROVEEDOR
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AccountType;
