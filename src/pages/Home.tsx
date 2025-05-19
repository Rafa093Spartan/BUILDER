import React, { useEffect, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonText, IonButton, IonLoading, IonIcon,
  IonButtons, IonModal, IonList, IonItem, IonLabel
} from "@ionic/react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import { notificationsOutline } from "ionicons/icons";
import "./Home.css";

interface Notification {
  id: string;
  message: string;
  applicantName: string;
}

const Home: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
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

  // Simulación: Cargar notificaciones cuando se abra modal
  useEffect(() => {
    if (showNotifications && auth.currentUser) {
      // Aquí deberías hacer consulta Firestore a "notifications" o "applications" relacionadas
      // Ejemplo básico (simulado):
      const fetchNotifications = async () => {
        // Ejemplo: colección "applications" donde userId es el actual
        const q = query(collection(db, "applications"), where("userId", "==", auth.currentUser!.uid));
        const querySnapshot = await getDocs(q);
        const notifs: Notification[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          notifs.push({
            id: doc.id,
            message: data.message ?? "Nueva postulación",
            applicantName: data.applicantName ?? "Desconocido"
          });
        });
        setNotifications(notifs);
      };

      fetchNotifications();
    }
  }, [showNotifications]);

  if (loading) {
    return <IonLoading isOpen message="Cargando..." />;
  }

  return (
    <IonPage className="home-page">
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Menú Principal</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowNotifications(true)}>
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonText>
          <h2>Bienvenido, {userName}</h2>
        </IonText>

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

        {/* Modal de Notificaciones */}
        <IonModal isOpen={showNotifications} onDidDismiss={() => setShowNotifications(false)}>
          <IonHeader>
            <IonToolbar color="warning">
              <IonTitle>Notificaciones</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowNotifications(false)}>Cerrar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {notifications.length === 0 ? (
              <IonText style={{ padding: 20 }}>No hay notificaciones.</IonText>
            ) : (
              <IonList>
                {notifications.map((notif) => (
                  <IonItem key={notif.id}>
                    <IonLabel>
                      <h3>{notif.applicantName}</h3>
                      <p>{notif.message}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
