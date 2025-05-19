import React from "react";
import {
  IonPage, IonHeader, IonToolbar, IonContent,
  IonTitle, IonButton
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage className="home-page">
      <IonHeader>
        <IonToolbar className="header-toolbar">
          <IonTitle className="header-title">Menu Principal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-container" fullscreen>
        <div className="form-box">
          <div className="form-title">crear solicitud</div>
          <textarea
            placeholder="escribe tu solicitud"
            className="form-textarea"
            rows={6}
          />
          <IonButton className="send-button" onClick={() => {}}>
            enviar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
