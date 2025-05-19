import React, { useEffect, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonText, IonButton, IonLoading, IonIcon,
  IonButtons, IonModal, IonList, IonItem, IonLabel
} from "@ionic/react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
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
  const [requestText, setRequestText] = useState("");
  const [sending, setSending] = useState(false);
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

  // Carga notificaciones cuando abres el modal
  useEffect(() => {
    if (showNotifications && auth.currentUser) {
      const fetchNotifications = async () => {
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

  // Función para enviar solicitud
  const sendRequest = async () => {
    if (!requestText.trim()) {
      alert("Por favor, escribe tu solicitud.");
      return;
    }
    if (!auth.currentUser) {
      alert("Debes iniciar sesión para enviar una solicitud.");
      return;
    }
    try {
      setSending(true);
      await addDoc(collection(db, "requests"), {
        userId: auth.currentUser.uid,
        message: requestText.trim(),
        createdAt: serverTimestamp(),
      });
      alert("Solicitud enviada correctamente.");
      setRequestText("");
    } catch (error) {
      console.error("Error enviando solicitud:", error);
      alert("Error al enviar la solicitud. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

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

      <IonContent className="content-container" fullscreen>
        <IonText className="welcome-text">
          <h2>Bienvenido, {userName}</h2>
        </IonText>

        <div className="form-box">
          <div className="form-title">Crear Solicitud</div>
          <textarea
            placeholder="Escribe tu solicitud"
            className="form-textarea"
            rows={6}
            value={requestText}
            onChange={(e) => setRequestText(e.target.value)}
          />
          <IonButton
            className="send-button"
            onClick={sendRequest}
            disabled={sending}
            expand="block"
            color="warning"
          >
            {sending ? "Enviando..." : "Enviar"}
          </IonButton>
        </div>

        <IonButton
          expand="block"
          color="warning"
          onClick={() => history.push("/user-requests")}
          style={{ marginTop: "20px" }}
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
