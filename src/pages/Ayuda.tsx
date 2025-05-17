import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonList,
  IonItem,
  IonLabel
} from "@ionic/react";
import "./Ayuda.css";

const Ayuda: React.FC = () => {
  return (
    <IonPage className="Ayuda">
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Ayuda</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ayuda-content">
        <IonList>
          <IonItem>
            <IonLabel>
              <IonText className="ayuda-label">
                <strong>Empresa:</strong> Soluciones Digitales MX
              </IonText>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonText className="ayuda-label">
                <strong>Dirección:</strong> Av. Tecnológica #123, Col. Centro, CDMX
              </IonText>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonText className="ayuda-label">
                <strong>Correo:</strong> contacto@solucionesmx.com
              </IonText>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonText className="ayuda-label">
                <strong>Teléfono:</strong> +52 55 1234 5678
              </IonText>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <IonText className="ayuda-label">
                <strong>Soporte en línea:</strong> Disponible en horario laboral de 9:00 a 18:00 hrs
              </IonText>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Ayuda;
