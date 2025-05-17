import React, { useEffect, useState } from "react";
import { IonPage, IonContent, IonText, IonLoading } from "@ionic/react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const TestFirestore: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const docSnap = await getDoc(doc(db, "users", "testUser"));
      if (docSnap.exists()) {
        setFullName(docSnap.data().fullName);
      } else {
        setFullName("No se encontró documento");
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <IonLoading isOpen message="Cargando..." />;
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonText>Nombre recuperado de Firestore: {fullName}</IonText>
      </IonContent>
    </IonPage>
  );
};

export default TestFirestore;
