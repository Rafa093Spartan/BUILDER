import React from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonText
} from "@ionic/react";
import { personOutline, constructOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./AccountType.css";

const AccountType: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage className="account-type-page">
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Crear cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding account-type-content">
        <div className="branding-container">
          <IonText className="title-text">Builder</IonText>
          <IonText className="subtitle-text">Crear Cuenta</IonText>
        </div>

        <IonIcon icon={personOutline} className="person-icon" />

        <div className="account-block">
          <div className="account-row">
            <IonIcon icon={personOutline} className="row-icon" />
            <IonButton
              className="row-button"
              color="warning"
              onClick={() => history.push("/login")}
            >
              Usuario
            </IonButton>
          </div>

          <hr className="divider" />

          <div className="account-row">
            <IonIcon icon={constructOutline} className="row-icon" />
            <IonButton
              className="row-button"
              color="warning"
              onClick={() => history.push("/login-provider")}
            >
              Proveedor
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AccountType;
