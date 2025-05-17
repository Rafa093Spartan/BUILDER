import React, { useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonLoading } from "@ionic/react";
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
      </IonContent>
    </IonPage>
  );
};

export default Home;
