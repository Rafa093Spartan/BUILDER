import React, { useEffect, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonText, IonButton, IonLoading
} from "@ionic/react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchName = async () => {
      if (auth.currentUser) {
        const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (docSnap.exists()) {
          setUserName(docSnap.data().fullName ?? "Usuario");
        }
      }
      setLoading(false);
    };
    fetchName();
  }, []);

  if (loading) {
    return <IonLoading isOpen message="Cargando..." />;
  }

  return (
    <IonPage className="home-page">
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Menú Principal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText>
          <h2>Bienvenido, {userName}</h2>
        </IonText>

        {/* Botones para crear solicitud y ver mis solicitudes */}
        <IonButton
          expand="block"
          color="warning"
          onClick={() => history.push("/create-request")}
          style={{ marginTop: "20px" }}
        >
          Crear Nueva Solicitud
        </IonButton>

        <IonButton
          expand="block"
          color="warning"
          onClick={() => history.push("/user-requests")}
          style={{ marginTop: "10px" }}
        >
          Ver Mis Solicitudes
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
