import React from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonText
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./AgregarTarjetaSplash.css";

const AgregarTarjetaSplash: React.FC = () => {
  const history = useHistory();

  const handleContinuar = () => {
    history.push("/formulario-agregar-tarjeta");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Agregar Tarjeta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding splash-content">
        <IonText className="splash-text">
          <h2>¡Vamos a registrar tu bonoe!</h2>
          <p>Podrás añadir los datos de tu tarjeta de forma segura.</p>
        </IonText>
        <IonButton expand="block" color="warning" onClick={handleContinuar}>
          Comenzar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AgregarTarjetaSplash;
