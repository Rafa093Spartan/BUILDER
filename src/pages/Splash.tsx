import React, { useEffect } from "react";
import { IonPage, IonContent, IonSpinner, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebaseConfig";
import "./Splash.css";

const Splash: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (auth.currentUser) {
        history.replace("/menu");
      } else {
        history.replace("/account-type");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <IonPage className="splash-page">
      <IonContent fullscreen className="splash-content">
        <IonSpinner name="crescent" color="warning" />
        <IonText color="warning" className="loading-text">Cargando...</IonText>
      </IonContent>
    </IonPage>
  );
};

export default Splash;
