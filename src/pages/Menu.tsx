import React, { useEffect, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonLoading
} from "@ionic/react";
import { auth, db } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import "./Menu.css";

const Menu: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData({});
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    history.replace("/login");
  };

  if (loading) {
    return <IonLoading isOpen message="Cargando datos..." />;
  }

  return (
    <IonPage className="menu-page">
      <IonHeader>
        <IonToolbar className="header-toolbar">
          <IonTitle>Menú</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonItem button onClick={() => history.push("/profile", { userData })}>
            <IonLabel>
              <h2>Perfil</h2>
              <p>Nombre: {userData?.fullName ?? "Desconocido"}</p>
              <p>Correo: {userData?.email ?? "No disponible"}</p>
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => history.push("/tarjetas")}>
            <IonLabel>
              <h2>Billetera</h2>
              <p>Consulta y gestiona tus transacciones y saldo.</p>
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => history.push("/version")}>
            <IonLabel>
              <h2>Versión</h2>
              <p>Revisa la versión actual de la aplicación.</p>
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => history.push("/ayuda")}>
            <IonLabel>
              <h2>Ayuda</h2>
              <p>Encuentra respuestas y soporte para cualquier duda.</p>
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => history.push("/about")}>
            <IonLabel>
              <h2>Nosotros</h2>
              <p>Conoce más sobre el equipo detrás de esta app.</p>
            </IonLabel>
          </IonItem>

          <IonItem button color="danger" onClick={handleLogout}>
            <IonLabel>
              <h2>Cerrar sesión</h2>
              <p>Salir de tu cuenta.</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Menu;
