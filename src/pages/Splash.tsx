import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonSpinner,
  IonText,
  IonToast
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { auth, onAuthStateChanged } from '../firebaseConfig';

const Splash: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ logoutMessage?: string }>();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Splash: Usuario detectado");
        history.replace('/tabs');
      } else {
        console.log("Splash: No hay usuario");
        history.replace('/account-type');
      }
    });

    return () => unsubscribe();
  }, [history]);

  useEffect(() => {
    if (location.state?.logoutMessage) {
      setMessage(location.state.logoutMessage);
      setShowToast(true);
    }
  }, [location]);

  return (
    <IonPage>
      <IonContent
        fullscreen
        className="ion-text-center ion-justify-content-center ion-align-items-center"
      >
        <IonSpinner name="crescent" color="warning" />
        <IonText color="warning">
          <p>Cargando...</p>
        </IonText>
        <IonToast
          isOpen={showToast}
          message={message}
          duration={2000}
          color="success"
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Splash;
