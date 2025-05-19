import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText } from "@ionic/react";
import "./Version.css";

const Version: React.FC = () => {
  return (
    <IonPage className="version-page">
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Versión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding version-content">
        <IonText className="version-text">Versión ALPHA-BETA-0.01</IonText>
      </IonContent>
    </IonPage>
  );
};

export default Version;
