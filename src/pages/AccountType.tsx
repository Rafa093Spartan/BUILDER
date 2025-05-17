import React from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonText
} from "@ionic/react";
import { personOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./AccountType.css";

const AccountType: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage className="account-type-page">
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Como deseas iniciar hoy</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding account-type-content">
        <IonText className="title-text">Builder</IonText>
        <IonIcon icon={personOutline} className="person-icon" />
        <IonText className="subtitle-text">Crear Cuenta</IonText>

        <div className="buttons-row">
          <IonButton color="warning" onClick={() => history.push("/login")}>
            Usuario
          </IonButton>
          <IonButton color="warning" onClick={() => history.push("/login-provider")}>
            Proveedor
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AccountType;
